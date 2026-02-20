'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import {
  MoreVertical,
  Check,
  X,
  User,
  Building,
  Briefcase,
} from 'lucide-react';
import { useKYCRecords, useKYCApprove, useKYCReject, type KYCRecord, type KYCQuery } from '@/hooks/useKYC';
import { KYCTableRowsSkeleton } from './KYCSkeletonLoader';

interface KYCTableProps {
  onUserClick: (user: KYCRecord) => void;
  filters?: KYCQuery;
}

const KYCTable: React.FC<KYCTableProps> = ({ onUserClick, filters = {} }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRecord, setSelectedRecord] = useState<KYCRecord | null>(null);
  const [mounted, setMounted] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: kycData, isLoading, error } = useKYCRecords({
    ...filters,
    page: page + 1,
    limit: rowsPerPage,
  });

  const approveMutation = useKYCApprove();
  const rejectMutation = useKYCReject();

  const records = kycData?.data || [];
  const total = kycData?.pagination?.total || 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED': return 'success';
      case 'PENDING': return 'warning';
      case 'IN_PROGRESS': return 'info';
      case 'REJECTED': return 'error';
      default: return 'default';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'SPROUT': return '#10B981';
      case 'BLOOM': return '#3B82F6';
      case 'THRIVE': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'INDIVIDUAL': return <User size={16} />;
      case 'ENTERPRISE': return <Building size={16} />;
      case 'AGENT': return <Briefcase size={16} />;
      default: return <User size={16} />;
    }
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'INDIVIDUAL': return '#3B82F6';
      case 'ENTERPRISE': return '#10B981';
      case 'AGENT': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, record: KYCRecord) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecord(null);
  };

  const handleApprove = async () => {
    if (selectedRecord) {
      try {
        await approveMutation.mutateAsync(selectedRecord.userId);
        handleMenuClose();
      } catch (error) {
        console.error('Failed to approve KYC:', error);
      }
    }
  };

  const handleRejectClick = () => {
    setRejectDialogOpen(true);
  };

  const handleReject = async () => {
    if (selectedRecord && rejectionReason.trim()) {
      try {
        await rejectMutation.mutateAsync({
          userId: selectedRecord.userId,
          payload: { rejectionReason: rejectionReason.trim() }
        });
        setRejectDialogOpen(false);
        setRejectionReason('');
        handleMenuClose();
      } catch (error) {
        console.error('Failed to reject KYC:', error);
      }
    }
  };

  
  // Show skeleton on first render and during loading to prevent hydration mismatch
  if (!mounted || isLoading) {
    return (
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Tier</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Limits</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <KYCTableRowsSkeleton count={rowsPerPage} />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Failed to load KYC records</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Tier</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Limits</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
                <TableRow
                  key={record.userId}
                  hover
                  onClick={() => onUserClick(record)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {record.userDetails?.name 
                          ? record.userDetails.name.slice(0, 2).toUpperCase()
                          : record.userId.slice(0, 2).toUpperCase()
                        }
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {record.userDetails?.name || `User ${record.userId.slice(0, 8)}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {record.userDetails?.email || record.userDetails?.phone || `ID: ${record.userId.slice(-6)}`}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getUserTypeIcon(record.userType)}
                      <Chip
                        label={record.userType}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: getUserTypeColor(record.userType),
                          color: getUserTypeColor(record.userType),
                          fontWeight: 500,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.currentTier}
                      variant="filled"
                      size="small"
                      sx={{
                        bgcolor: getTierColor(record.currentTier) + '15',
                        color: getTierColor(record.currentTier),
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.status.replace('_', ' ').toUpperCase()}
                      variant="outlined"
                      size="small"
                      color={getStatusColor(record.status) as any}
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        Daily: ₦{record.limits.dailyWithdrawal.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Max: ₦{record.limits.maxWalletBalance.toLocaleString()}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontSize="0.875rem">
                      {new Date(record.updatedAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuOpen(e, record);
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
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} KYC records`}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {(selectedRecord?.status === 'PENDING' || selectedRecord?.status === 'IN_PROGRESS') && (
          <MenuItem onClick={handleApprove}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Check size={16} />
              <Typography variant="body2">Approve KYC</Typography>
            </Stack>
          </MenuItem>
        )}
        {(selectedRecord?.status === 'PENDING' || selectedRecord?.status === 'IN_PROGRESS') && (
          <MenuItem onClick={handleRejectClick}>
            <Stack direction="row" spacing={1} alignItems="center">
              <X size={16} />
              <Typography variant="body2">Reject KYC</Typography>
            </Stack>
          </MenuItem>
        )}
      </Menu>

      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reject KYC Application</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please provide a reason for rejecting this KYC application. The user will be notified of this reason.
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Rejection Reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter the reason for rejection..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleReject} 
            variant="contained" 
            color="error"
            disabled={!rejectionReason.trim() || rejectMutation.isPending}
          >
            {rejectMutation.isPending ? 'Rejecting...' : 'Reject KYC'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default KYCTable;
