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
  Tooltip,
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
  AlertTriangle,
  Clock,
  CheckCircle,
  ExternalLink,
  Flag,
  MapPin,
  Calendar,
  DollarSign,
  Shield,
} from 'lucide-react';
import type { RiskDispute, DisputeSeverity, DisputeStatus, DisputeCategory } from '../types';
import {
  getSeverityColor,
  getStatusColor,
  getCategoryColor,
  getCategoryLabel,
  getSeverityLabel,
  getStatusLabel,
  formatCurrency,
} from '../mockData';

interface RiskDisputesTableProps {
  disputes: RiskDispute[];
  onViewDispute: (disputeId: string) => void;
}

const RiskDisputesTable: React.FC<RiskDisputesTableProps> = ({
  disputes,
  onViewDispute,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDispute, setSelectedDispute] = useState<RiskDispute | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<DisputeSeverity | ''>('');
  const [filterStatus, setFilterStatus] = useState<DisputeStatus | ''>('');
  const [filterCategory, setFilterCategory] = useState<DisputeCategory | ''>('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, dispute: RiskDispute) => {
    setAnchorEl(event.currentTarget);
    setSelectedDispute(dispute);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDispute(null);
  };

  const handleView = () => {
    if (selectedDispute) {
      onViewDispute(selectedDispute.id);
    }
    handleMenuClose();
  };

  const filteredDisputes = disputes.filter(dispute => {
    if (filterSeverity && dispute.severity !== filterSeverity) return false;
    if (filterStatus && dispute.status !== filterStatus) return false;
    if (filterCategory && dispute.category !== filterCategory) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        dispute.id.toLowerCase().includes(search) ||
        dispute.disputeId.toLowerCase().includes(search) ||
        dispute.title.toLowerCase().includes(search) ||
        dispute.city.toLowerCase().includes(search) ||
        dispute.parties.some(p => p.name.toLowerCase().includes(search))
      );
    }
    return true;
  });

  const paginatedDisputes = filteredDisputes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getSeverityIcon = (severity: DisputeSeverity) => {
    switch (severity) {
      case 'critical': return <AlertTriangle size={14} />;
      case 'high': return <Flag size={14} />;
      case 'medium': return <Shield size={14} />;
      default: return <Shield size={14} />;
    }
  };

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      {/* Header & Filters */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="600" mb={2}>
          Risk Disputes
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField
            size="small"
            placeholder="Search disputes..."
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
              onChange={(e) => setFilterSeverity(e.target.value as DisputeSeverity | '')}
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
              onChange={(e) => setFilterStatus(e.target.value as DisputeStatus | '')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="investigating">Investigating</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="referred">Referred</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filterCategory}
              label="Category"
              onChange={(e) => setFilterCategory(e.target.value as DisputeCategory | '')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="weight_manipulation">Weight Manipulation</MenuItem>
              <MenuItem value="payout_abuse">Payout Abuse</MenuItem>
              <MenuItem value="agent_misconduct">Agent Misconduct</MenuItem>
              <MenuItem value="enterprise_sla">Enterprise SLA</MenuItem>
              <MenuItem value="system_error">System Error</MenuItem>
              <MenuItem value="fraud">Fraud</MenuItem>
              <MenuItem value="compliance_breach">Compliance Breach</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Risk Case ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Financial Exposure</TableCell>
              <TableCell>Parties</TableCell>
              <TableCell>City / Zone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Days Open</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDisputes.map((dispute) => (
              <TableRow key={dispute.id} hover>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" fontWeight="600">
                      {dispute.id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {dispute.disputeId}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getCategoryLabel(dispute.category)}
                    size="small"
                    sx={{
                      bgcolor: getCategoryColor(dispute.category) + '15',
                      color: getCategoryColor(dispute.category),
                      fontSize: '0.7rem',
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getSeverityIcon(dispute.severity)}
                    label={getSeverityLabel(dispute.severity)}
                    size="small"
                    sx={{
                      bgcolor: getSeverityColor(dispute.severity) + '15',
                      color: getSeverityColor(dispute.severity),
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600" color={getSeverityColor(dispute.severity)}>
                    {formatCurrency(dispute.financialExposure)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    {dispute.parties.slice(0, 2).map((party) => (
                      <Typography key={party.id} variant="caption" noWrap sx={{ maxWidth: 150 }}>
                        {party.name}
                      </Typography>
                    ))}
                    {dispute.parties.length > 2 && (
                      <Typography variant="caption" color="text.secondary">
                        +{dispute.parties.length - 2} more
                      </Typography>
                    )}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <MapPin size={12} color="#6B7280" />
                    <Typography variant="body2">
                      {dispute.city}, {dispute.zone}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(dispute.status)}
                    size="small"
                    sx={{
                      bgcolor: getStatusColor(dispute.status) + '15',
                      color: getStatusColor(dispute.status),
                      fontSize: '0.7rem',
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    color={dispute.daysOpen > 7 ? '#EF4444' : dispute.daysOpen > 3 ? '#F59E0B' : 'text.primary'}
                  >
                    {dispute.daysOpen === 0 ? 'Closed' : `${dispute.daysOpen}d`}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, dispute);
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
        count={filteredDisputes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count} disputes`
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
            <Flag size={16} />
            <Typography variant="body2">Flag for Audit</Typography>
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

export default RiskDisputesTable;
