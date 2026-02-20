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
  Play,
  Pause,
  Copy,
  Archive,
} from 'lucide-react';
import type { PricingRule, WasteType, PricingScope, RuleStatus } from '../types';
import {
  getWasteTypeColor,
  getWasteTypeLabel,
  getScopeColor,
  getScopeLabel,
  getStatusColor,
  getStatusLabel,
  getPickupModeLabel,
  getPickupModeColor,
  getPriorityColor,
  getPriorityLabel,
  formatRate,
} from '../mockData';

interface PricingRulesTableProps {
  rules: PricingRule[];
  onViewRule: (ruleId: string) => void;
}

const PricingRulesTable: React.FC<PricingRulesTableProps> = ({
  rules,
  onViewRule,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRule, setSelectedRule] = useState<PricingRule | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWasteType, setFilterWasteType] = useState<WasteType | ''>('');
  const [filterScope, setFilterScope] = useState<PricingScope | ''>('');
  const [filterStatus, setFilterStatus] = useState<RuleStatus | ''>('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, rule: PricingRule) => {
    setAnchorEl(event.currentTarget);
    setSelectedRule(rule);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRule(null);
  };

  const handleView = () => {
    if (selectedRule) {
      onViewRule(selectedRule.id);
    }
    handleMenuClose();
  };

  const filteredRules = rules.filter((rule) => {
    if (filterWasteType && rule.wasteType !== filterWasteType) return false;
    if (filterScope && rule.scope !== filterScope) return false;
    if (filterStatus && rule.status !== filterStatus) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        rule.id.toLowerCase().includes(search) ||
        rule.name.toLowerCase().includes(search) ||
        (rule.city || '').toLowerCase().includes(search)
      );
    }
    return true;
  });

  const paginatedRules = filteredRules.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="600" mb={2}>
          Pricing Rules
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField
            size="small"
            placeholder="Search rules..."
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
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Waste Type</InputLabel>
            <Select value={filterWasteType} label="Waste Type" onChange={(e) => setFilterWasteType(e.target.value as WasteType | '')}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="plastic">Plastic</MenuItem>
              <MenuItem value="metal">Metal</MenuItem>
              <MenuItem value="paper">Paper</MenuItem>
              <MenuItem value="glass">Glass</MenuItem>
              <MenuItem value="e_waste">E-Waste</MenuItem>
              <MenuItem value="organic">Organic</MenuItem>
              <MenuItem value="textile">Textile</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Scope</InputLabel>
            <Select value={filterScope} label="Scope" onChange={(e) => setFilterScope(e.target.value as PricingScope | '')}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="global">Global</MenuItem>
              <MenuItem value="city">City</MenuItem>
              <MenuItem value="zone">Zone</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} label="Status" onChange={(e) => setFilterStatus(e.target.value as RuleStatus | '')}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
              <MenuItem value="paused">Paused</MenuItem>
              <MenuItem value="retired">Retired</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rule Name</TableCell>
              <TableCell>Scope</TableCell>
              <TableCell>Waste Type</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell>User Price</TableCell>
              <TableCell>Agent Payout</TableCell>
              <TableCell>Margin</TableCell>
              <TableCell>Effective</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRules.map((rule) => (
              <TableRow key={rule.id} hover>
                <TableCell sx={{ maxWidth: 200 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" fontWeight="600" noWrap>
                      {rule.name}
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        {rule.id}
                      </Typography>
                      <Chip
                        label={`v${rule.version}`}
                        size="small"
                        sx={{ fontSize: '0.6rem', height: 16 }}
                      />
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Chip
                      label={getScopeLabel(rule.scope)}
                      size="small"
                      sx={{ bgcolor: getScopeColor(rule.scope) + '15', color: getScopeColor(rule.scope), fontSize: '0.7rem', fontWeight: 600 }}
                    />
                    {rule.city && (
                      <Typography variant="caption" color="text.secondary">
                        {rule.city}{rule.zone ? ` / ${rule.zone}` : ''}
                      </Typography>
                    )}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getWasteTypeLabel(rule.wasteType)}
                    size="small"
                    sx={{ bgcolor: getWasteTypeColor(rule.wasteType) + '15', color: getWasteTypeColor(rule.wasteType), fontSize: '0.7rem', fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={getPickupModeLabel(rule.pickupMode)}
                    size="small"
                    sx={{ bgcolor: getPickupModeColor(rule.pickupMode) + '15', color: getPickupModeColor(rule.pickupMode), fontSize: '0.65rem' }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600" color="#10B981">
                    {formatRate(rule.userPricePerKg)}/kg
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600" color="#F59E0B">
                    {formatRate(rule.agentPayoutPerKg)}/kg
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600" color="#8B5CF6">
                    {rule.platformMarginPercent}%
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">
                    {new Date(rule.effectiveStart).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(rule.status)}
                    size="small"
                    sx={{ bgcolor: getStatusColor(rule.status) + '15', color: getStatusColor(rule.status), fontSize: '0.7rem', fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, rule);
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
        count={filteredRules.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} rules`}
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
            <Typography variant="body2">Pause Rule</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Copy size={16} />
            <Typography variant="body2">Duplicate Rule</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Archive size={16} />
            <Typography variant="body2">Retire Rule</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default PricingRulesTable;
