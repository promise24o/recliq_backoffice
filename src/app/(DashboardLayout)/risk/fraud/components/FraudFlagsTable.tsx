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
} from '@mui/material';
import {
  Eye,
  MoreVertical,
  Search,
  Flag,
  Lock,
  ExternalLink,
  MapPin,
  Bookmark,
} from 'lucide-react';
import type { FraudFlag, FraudSeverity, FraudStatus, FraudType, EntityType } from '../types';
import {
  getSeverityColor,
  getStatusColor,
  getFraudTypeColor,
  getEntityTypeColor,
  getSeverityLabel,
  getStatusLabel,
  getFraudTypeLabel,
  getEntityTypeLabel,
  formatCurrency,
} from '../mockData';

interface FraudFlagsTableProps {
  flags: FraudFlag[];
  onViewFlag: (flagId: string) => void;
}

const FraudFlagsTable: React.FC<FraudFlagsTableProps> = ({
  flags,
  onViewFlag,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFlag, setSelectedFlag] = useState<FraudFlag | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<FraudSeverity | ''>('');
  const [filterStatus, setFilterStatus] = useState<FraudStatus | ''>('');
  const [filterType, setFilterType] = useState<FraudType | ''>('');
  const [filterEntity, setFilterEntity] = useState<EntityType | ''>('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, flag: FraudFlag) => {
    setAnchorEl(event.currentTarget);
    setSelectedFlag(flag);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFlag(null);
  };

  const handleView = () => {
    if (selectedFlag) {
      onViewFlag(selectedFlag.id);
    }
    handleMenuClose();
  };

  const filteredFlags = flags.filter(flag => {
    if (filterSeverity && flag.severity !== filterSeverity) return false;
    if (filterStatus && flag.status !== filterStatus) return false;
    if (filterType && flag.fraudType !== filterType) return false;
    if (filterEntity && flag.entity.type !== filterEntity) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        flag.id.toLowerCase().includes(search) ||
        flag.entity.name.toLowerCase().includes(search) ||
        flag.entity.id.toLowerCase().includes(search) ||
        flag.title.toLowerCase().includes(search) ||
        flag.city.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const paginatedFlags = filteredFlags.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return '#EF4444';
    if (score >= 60) return '#F59E0B';
    return '#10B981';
  };

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      {/* Header & Filters */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="600" mb={2}>
          Fraud Flags
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField
            size="small"
            placeholder="Search flags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 220 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              )
            }}
          />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Severity</InputLabel>
            <Select
              value={filterSeverity}
              label="Severity"
              onChange={(e) => setFilterSeverity(e.target.value as FraudSeverity | '')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value as FraudStatus | '')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="investigating">Investigating</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="cleared">Cleared</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Fraud Type</InputLabel>
            <Select
              value={filterType}
              label="Fraud Type"
              onChange={(e) => setFilterType(e.target.value as FraudType | '')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="weight_fraud">Weight Fraud</MenuItem>
              <MenuItem value="payout_abuse">Payout Abuse</MenuItem>
              <MenuItem value="identity_farming">Identity Farming</MenuItem>
              <MenuItem value="location_spoofing">Location Spoofing</MenuItem>
              <MenuItem value="collusion">Collusion</MenuItem>
              <MenuItem value="system_abuse">System Abuse</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Entity Type</InputLabel>
            <Select
              value={filterEntity}
              label="Entity Type"
              onChange={(e) => setFilterEntity(e.target.value as EntityType | '')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="agent">Agent</MenuItem>
              <MenuItem value="enterprise">Enterprise</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flag ID</TableCell>
              <TableCell>Entity</TableCell>
              <TableCell>Fraud Type</TableCell>
              <TableCell align="center">Risk Score</TableCell>
              <TableCell>Financial Exposure</TableCell>
              <TableCell>City / Zone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Days Open</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFlags.map((flag) => (
              <TableRow key={flag.id} hover>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" fontWeight="600">
                      {flag.id}
                    </Typography>
                    <Chip
                      label={getSeverityLabel(flag.severity)}
                      size="small"
                      sx={{
                        bgcolor: getSeverityColor(flag.severity) + '15',
                        color: getSeverityColor(flag.severity),
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        height: 20
                      }}
                    />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" fontWeight="500">
                      {flag.entity.name}
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Chip
                        label={getEntityTypeLabel(flag.entity.type)}
                        size="small"
                        sx={{
                          bgcolor: getEntityTypeColor(flag.entity.type) + '15',
                          color: getEntityTypeColor(flag.entity.type),
                          fontSize: '0.65rem',
                          height: 20
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {flag.entity.id}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getFraudTypeLabel(flag.fraudType)}
                    size="small"
                    sx={{
                      bgcolor: getFraudTypeColor(flag.fraudType) + '15',
                      color: getFraudTypeColor(flag.fraudType),
                      fontSize: '0.7rem',
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={flag.riskScore}
                    size="small"
                    sx={{
                      bgcolor: getRiskScoreColor(flag.riskScore) + '15',
                      color: getRiskScoreColor(flag.riskScore),
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      minWidth: 40
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600" color={getSeverityColor(flag.severity)}>
                    {formatCurrency(flag.financialExposure)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <MapPin size={12} color="#6B7280" />
                    <Typography variant="body2">
                      {flag.city}, {flag.zone}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(flag.status)}
                    size="small"
                    sx={{
                      bgcolor: getStatusColor(flag.status) + '15',
                      color: getStatusColor(flag.status),
                      fontSize: '0.7rem',
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    color={flag.daysOpen > 7 ? '#EF4444' : flag.daysOpen > 3 ? '#F59E0B' : 'text.primary'}
                  >
                    {flag.daysOpen === 0 ? 'Closed' : `${flag.daysOpen}d`}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, flag);
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
        count={filteredFlags.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count} flags`
        }
      />

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            minWidth: 200,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }
        }}
      >
        <MenuItem onClick={handleView}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Eye size={16} />
            <Typography variant="body2">View Details</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Lock size={16} />
            <Typography variant="body2">Restrict Account</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Bookmark size={16} />
            <Typography variant="body2">Add to Watchlist</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={2} alignItems="center">
            <ExternalLink size={16} />
            <Typography variant="body2">Escalate to Legal</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default FraudFlagsTable;
