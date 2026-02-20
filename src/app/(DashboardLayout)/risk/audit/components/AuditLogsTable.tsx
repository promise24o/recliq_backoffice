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
  Download,
  Copy,
  Clock,
  User,
  Cpu,
} from 'lucide-react';
import type { AuditLog, ActorType, ActionType, EntityType, RiskLevel } from '../types';
import {
  getActorTypeColor,
  getActionTypeColor,
  getEntityTypeColor,
  getRiskLevelColor,
  getActionTypeLabel,
  getEntityTypeLabel,
  getRiskLevelLabel,
  formatTimestamp,
} from '../mockData';

interface AuditLogsTableProps {
  logs: AuditLog[];
  onViewLog: (logId: string) => void;
}

const AuditLogsTable: React.FC<AuditLogsTableProps> = ({
  logs,
  onViewLog,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActorType, setFilterActorType] = useState<ActorType | ''>('');
  const [filterActionType, setFilterActionType] = useState<ActionType | ''>('');
  const [filterEntityType, setFilterEntityType] = useState<EntityType | ''>('');
  const [filterRiskLevel, setFilterRiskLevel] = useState<RiskLevel | ''>('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, log: AuditLog) => {
    setAnchorEl(event.currentTarget);
    setSelectedLog(log);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLog(null);
  };

  const handleView = () => {
    if (selectedLog) {
      onViewLog(selectedLog.id);
    }
    handleMenuClose();
  };

  const filteredLogs = logs.filter(log => {
    if (filterActorType && log.actor.type !== filterActorType) return false;
    if (filterActionType && log.actionType !== filterActionType) return false;
    if (filterEntityType && log.entityType !== filterEntityType) return false;
    if (filterRiskLevel && log.riskLevel !== filterRiskLevel) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        log.id.toLowerCase().includes(search) ||
        log.actor.name.toLowerCase().includes(search) ||
        log.actionLabel.toLowerCase().includes(search) ||
        log.entityId.toLowerCase().includes(search) ||
        log.entityLabel.toLowerCase().includes(search) ||
        log.changeSummary.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const paginatedLogs = filteredLogs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      {/* Header & Filters */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="600" mb={2}>
          Audit Logs
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField
            size="small"
            placeholder="Search logs..."
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
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Actor</InputLabel>
            <Select
              value={filterActorType}
              label="Actor"
              onChange={(e) => setFilterActorType(e.target.value as ActorType | '')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="system">System</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Action Type</InputLabel>
            <Select
              value={filterActionType}
              label="Action Type"
              onChange={(e) => setFilterActionType(e.target.value as ActionType | '')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="create">Create</MenuItem>
              <MenuItem value="update">Update</MenuItem>
              <MenuItem value="delete">Delete</MenuItem>
              <MenuItem value="approve">Approve</MenuItem>
              <MenuItem value="reject">Reject</MenuItem>
              <MenuItem value="override">Override</MenuItem>
              <MenuItem value="payout">Payout</MenuItem>
              <MenuItem value="reversal">Reversal</MenuItem>
              <MenuItem value="adjustment">Adjustment</MenuItem>
              <MenuItem value="resolve">Resolve</MenuItem>
              <MenuItem value="escalate">Escalate</MenuItem>
              <MenuItem value="enforce">Enforce</MenuItem>
              <MenuItem value="permission_change">Permission Change</MenuItem>
              <MenuItem value="login">Login</MenuItem>
              <MenuItem value="export">Export</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Entity</InputLabel>
            <Select
              value={filterEntityType}
              label="Entity"
              onChange={(e) => setFilterEntityType(e.target.value as EntityType | '')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pickup">Pickup</MenuItem>
              <MenuItem value="payout">Payout</MenuItem>
              <MenuItem value="contract">Contract</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="agent">Agent</MenuItem>
              <MenuItem value="enterprise">Enterprise</MenuItem>
              <MenuItem value="dispute">Dispute</MenuItem>
              <MenuItem value="fraud_flag">Fraud Flag</MenuItem>
              <MenuItem value="pricing">Pricing</MenuItem>
              <MenuItem value="role">Role</MenuItem>
              <MenuItem value="system_config">System Config</MenuItem>
              <MenuItem value="report">Report</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Risk Level</InputLabel>
            <Select
              value={filterRiskLevel}
              label="Risk Level"
              onChange={(e) => setFilterRiskLevel(e.target.value as RiskLevel | '')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Actor</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Entity</TableCell>
              <TableCell>Change Summary</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Risk</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLogs.map((log) => (
              <TableRow key={log.id} hover>
                <TableCell sx={{ minWidth: 160 }}>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Clock size={12} color="#6B7280" />
                      <Typography variant="caption" fontWeight="600">
                        {new Date(log.timestamp).toLocaleDateString('en-NG')}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(log.timestamp).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {log.actor.type === 'admin' ? <User size={14} color={getActorTypeColor('admin')} /> : <Cpu size={14} color={getActorTypeColor('system')} />}
                    <Box>
                      <Typography variant="body2" fontWeight="500" noWrap sx={{ maxWidth: 130 }}>
                        {log.actor.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {log.actor.role}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getActionTypeLabel(log.actionType)}
                    size="small"
                    sx={{
                      bgcolor: getActionTypeColor(log.actionType) + '15',
                      color: getActionTypeColor(log.actionType),
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Chip
                      label={getEntityTypeLabel(log.entityType)}
                      size="small"
                      sx={{
                        bgcolor: getEntityTypeColor(log.entityType) + '15',
                        color: getEntityTypeColor(log.entityType),
                        fontSize: '0.65rem',
                        height: 20
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 120 }}>
                      {log.entityId}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ maxWidth: 250 }}>
                  <Typography variant="body2" noWrap>
                    {log.changeSummary}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" color="text.secondary">
                    {log.ipAddress}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getRiskLevelLabel(log.riskLevel)}
                    size="small"
                    sx={{
                      bgcolor: getRiskLevelColor(log.riskLevel) + '15',
                      color: getRiskLevelColor(log.riskLevel),
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, log);
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
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredLogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count} events`
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
            <Copy size={16} />
            <Typography variant="body2">Copy Event ID</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Download size={16} />
            <Typography variant="body2">Export Event</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default AuditLogsTable;
