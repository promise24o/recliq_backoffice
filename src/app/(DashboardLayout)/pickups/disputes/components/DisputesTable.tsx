'use client'
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
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem,
  TablePagination,
  TextField,
  InputAdornment,
  Stack,
  CardContent
} from '@mui/material';
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Download, 
  AlertTriangle,
  Clock,
  User,
  MapPin,
  Calendar
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { Dispute } from '../types';

interface DisputesTableProps {
  disputes: Dispute[];
  onRowClick: (dispute: Dispute) => void;
  onExport: (disputes: Dispute[]) => void;
}

const DisputesTable: React.FC<DisputesTableProps> = ({ disputes, onRowClick, onExport }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

  // Filter disputes based on search
  const filteredDisputes = disputes.filter(dispute =>
    dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispute.relatedId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispute.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispute.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispute.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, dispute: Dispute) => {
    setAnchorEl(event.currentTarget);
    setSelectedDispute(dispute);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDispute(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'error';
      case 'under_review':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'escalated':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return '#ef4444';
      case 'high':
        return '#f59e0b';
      case 'medium':
        return '#06b6d4';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getDisputeTypeLabel = (type: string) => {
    switch (type) {
      case 'weight_disagreement':
        return 'Weight Disagreement';
      case 'missing_damaged':
        return 'Missing/Damaged';
      case 'payout_mismatch':
        return 'Payout Mismatch';
      case 'agent_no_show':
        return 'Agent No-Show';
      case 'dropoff_rejection':
        return 'Drop-off Rejection';
      case 'suspicious_behavior':
        return 'Suspicious Behavior';
      default:
        return type;
    }
  };

  const getRaisedByIcon = (raisedBy: string) => {
    switch (raisedBy) {
      case 'user':
        return <User size={16} />;
      case 'agent':
        return <User size={16} />;
      case 'system':
        return <AlertTriangle size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const getRaisedByLabel = (raisedBy: string) => {
    switch (raisedBy) {
      case 'user':
        return 'User';
      case 'agent':
        return 'Agent';
      case 'system':
        return 'System';
      default:
        return raisedBy;
    }
  };

  const getOpenDurationColor = (duration: number) => {
    if (duration >= 72) return '#ef4444';
    if (duration >= 48) return '#f59e0b';
    if (duration >= 24) return '#06b6d4';
    return '#10b981';
  };

  const paginatedDisputes = filteredDisputes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardCard title="Disputes">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            ⚖️ Fast, fair resolution • Click rows for detailed conflict analysis
          </Typography>
        </Box>
        
        {/* Controls */}
        <Stack direction="row" spacing={2} mb={3} alignItems="center">
          <TextField
            placeholder="Search disputes..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color="#6b7280" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <IconButton onClick={() => onExport(filteredDisputes)}>
            <Download size={20} />
          </IconButton>
        </Stack>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Dispute ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Pickup/Drop-off ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Dispute Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Raised By</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>City/Zone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Agent</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Open Duration</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDisputes.map((dispute) => (
                <TableRow
                  key={dispute.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(dispute)}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#ef4444' }}>
                        <AlertTriangle size={16} color="white" />
                      </Avatar>
                      <Typography variant="body2" fontWeight="500">
                        {dispute.id}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" fontWeight="500">
                        {dispute.relatedId}
                      </Typography>
                      <Chip
                        label={dispute.relatedType}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.6rem' }}
                      />
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 150 }}>
                      {getDisputeTypeLabel(dispute.disputeType)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={dispute.status.replace('_', ' ').toUpperCase()}
                      size="small"
                      color={getStatusColor(dispute.status) as any}
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getRaisedByIcon(dispute.raisedBy)}
                      <Typography variant="caption" color="text.secondary">
                        {getRaisedByLabel(dispute.raisedBy)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">
                        {dispute.city}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {dispute.zone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" fontWeight="500">
                        {dispute.agentName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {dispute.agentPhone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" fontWeight="500">
                        {dispute.userName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {dispute.userPhone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Clock size={16} color={getOpenDurationColor(dispute.openDuration)} />
                      <Typography 
                        variant="body2" 
                        fontWeight="500"
                        color={getOpenDurationColor(dispute.openDuration)}
                      >
                        {dispute.openDuration}h
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={dispute.priority.toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: `${getPriorityColor(dispute.priority)}15`,
                        color: getPriorityColor(dispute.priority),
                        fontSize: '0.7rem',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(e, dispute);
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
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredDisputes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count} disputes`
          }
        />

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              if (selectedDispute) {
                onRowClick(selectedDispute);
              }
              handleMenuClose();
            }}
          >
            <Eye size={16} style={{ marginRight: 8 }} />
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (selectedDispute) {
                onExport([selectedDispute]);
              }
              handleMenuClose();
            }}
          >
            <Download size={16} style={{ marginRight: 8 }} />
            Export Dispute
          </MenuItem>
          <MenuItem
            onClick={() => {
              // Handle escalate action
              handleMenuClose();
            }}
          >
            <AlertTriangle size={16} style={{ marginRight: 8 }} />
            Escalate to Compliance
          </MenuItem>
        </Menu>
      </CardContent>
    </DashboardCard>
  );
};

export default DisputesTable;
