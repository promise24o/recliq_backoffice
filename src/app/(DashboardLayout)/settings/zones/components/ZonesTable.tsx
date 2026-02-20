'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TablePagination,
  Menu,
  MenuItem,
  Stack,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
} from '@mui/material';
import {
  Eye,
  MoreVertical,
  Search,
  Play,
  Pause,
  Scissors,
  Merge,
  MapPin,
} from 'lucide-react';
import type { Zone, ZoneStatus, CoverageLevel } from '../types';
import {
  getStatusColor,
  getStatusLabel,
  getCoverageColor,
  getCoverageLabel,
  getSLAColor,
  getSLALabel,
  getDemandColor,
  getDemandLabel,
  nigerianCities,
} from '../mockData';

interface ZonesTableProps {
  zones: Zone[];
  onViewZone: (zoneId: string) => void;
}

const ZonesTable: React.FC<ZonesTableProps> = ({
  zones,
  onViewZone,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterStatus, setFilterStatus] = useState<ZoneStatus | ''>('');
  const [filterCoverage, setFilterCoverage] = useState<CoverageLevel | ''>('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, zone: Zone) => {
    setAnchorEl(event.currentTarget);
    setSelectedZone(zone);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedZone(null);
  };

  const handleView = () => {
    if (selectedZone) {
      onViewZone(selectedZone.id);
    }
    handleMenuClose();
  };

  const filteredZones = zones.filter((zone) => {
    if (filterCity && zone.city !== filterCity) return false;
    if (filterStatus && zone.status !== filterStatus) return false;
    if (filterCoverage && zone.coverageLevel !== filterCoverage) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        zone.id.toLowerCase().includes(search) ||
        zone.name.toLowerCase().includes(search) ||
        zone.city.toLowerCase().includes(search) ||
        zone.description.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const paginatedZones = filteredZones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="600" mb={2}>
          Zones
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField
            size="small"
            placeholder="Search zones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>City</InputLabel>
            <Select value={filterCity} label="City" onChange={(e) => setFilterCity(e.target.value)}>
              <MenuItem value="">All Cities</MenuItem>
              {nigerianCities.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} label="Status" onChange={(e) => setFilterStatus(e.target.value as ZoneStatus | '')}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Coverage</InputLabel>
            <Select value={filterCoverage} label="Coverage" onChange={(e) => setFilterCoverage(e.target.value as CoverageLevel | '')}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Zone Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Coverage</TableCell>
              <TableCell>Active Agents</TableCell>
              <TableCell>Pricing Rule</TableCell>
              <TableCell>SLA Tier</TableCell>
              <TableCell>Pickups/Day</TableCell>
              <TableCell>SLA %</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedZones.map((zone) => (
              <TableRow key={zone.id} hover sx={{ cursor: 'pointer' }} onClick={() => onViewZone(zone.id)}>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" fontWeight="600">{zone.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{zone.id} • {zone.boundary.areaKm2} km²</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <MapPin size={14} color="#6B7280" />
                    <Typography variant="body2">{zone.city}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Chip
                      label={getCoverageLabel(zone.coverageLevel)}
                      size="small"
                      sx={{ bgcolor: getCoverageColor(zone.coverageLevel) + '15', color: getCoverageColor(zone.coverageLevel), fontSize: '0.7rem', fontWeight: 600 }}
                    />
                    <LinearProgress
                      variant="determinate"
                      value={100 - zone.coverageGapPercent}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        bgcolor: '#f1f5f9',
                        '& .MuiLinearProgress-bar': { bgcolor: getCoverageColor(zone.coverageLevel) },
                      }}
                    />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">
                    {zone.activeAgents}
                    <Typography component="span" variant="caption" color="text.secondary"> / {zone.totalAgents}</Typography>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap sx={{ maxWidth: 160 }}>
                    {zone.pricingRuleName || '—'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getSLALabel(zone.slaTier)}
                    size="small"
                    sx={{ bgcolor: getSLAColor(zone.slaTier) + '15', color: getSLAColor(zone.slaTier), fontSize: '0.7rem', fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">{zone.avgPickupsPerDay}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    color={zone.performance.slaCompliancePercent >= 90 ? '#10B981' : zone.performance.slaCompliancePercent >= 75 ? '#F59E0B' : '#EF4444'}
                  >
                    {zone.performance.slaCompliancePercent}%
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(zone.status)}
                    size="small"
                    sx={{ bgcolor: getStatusColor(zone.status) + '15', color: getStatusColor(zone.status), fontSize: '0.7rem', fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, zone);
                    }}
                  >
                    <MoreVertical size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredZones.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} zones`}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { minWidth: 200, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' } }}
      >
        <MenuItem onClick={handleView}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Eye size={16} />
            <Typography variant="body2">View Details</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Play size={16} />
            <Typography variant="body2">Activate</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Pause size={16} />
            <Typography variant="body2">Deactivate</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Scissors size={16} />
            <Typography variant="body2">Split Zone</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Merge size={16} />
            <Typography variant="body2">Merge Zone</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default ZonesTable;
