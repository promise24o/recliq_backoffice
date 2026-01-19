'use client'
import React, { useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  Avatar,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Box,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  LinearProgress
} from '@mui/material';
import { 
  IconEye, 
  IconSearch,
  IconFilter,
  IconDownload,
  IconAlertTriangle, 
  IconClock,
  IconRefresh,
  IconArrowRight,
  IconArrowBackUp,
  IconUser,
  IconBuilding,
  IconPackage,
  IconFileText,
  IconX,
  IconCheck
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface FailedPendingRefund {
  id: string;
  referenceId: string;
  originalTransaction: {
    id: string;
    type: 'user_payment' | 'enterprise_payment';
    user?: {
      name: string;
      email: string;
    };
    enterprise?: {
      name: string;
      email: string;
    };
    pickupId?: string;
    invoiceId?: string;
  };
  amount: number;
  type: 'refund' | 'reversal';
  status: 'failed' | 'pending';
  duration: string;
  retryCount: number;
  reason: string;
  action: string;
  providerReference: string;
  failureReason?: string;
}

interface FailedPendingRefundsProps {
  onRowClick?: (refund: FailedPendingRefund) => void;
}

const FailedPendingRefunds: React.FC<FailedPendingRefundsProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data
  const refunds: FailedPendingRefund[] = [
    {
      id: '1',
      referenceId: 'REF-2024-0004',
      originalTransaction: {
        id: 'TXN-2024-0150',
        type: 'enterprise_payment',
        enterprise: {
          name: 'Global Industries',
          email: 'accounts@global.com'
        },
        invoiceId: 'INV-2024-0150'
      },
      amount: 120000,
      type: 'refund',
      status: 'failed',
      duration: '2 hours',
      retryCount: 2,
      reason: 'Service not delivered',
      action: 'Retry',
      providerReference: 'PROV-REF-004',
      failureReason: 'Provider timeout'
    },
    {
      id: '2',
      referenceId: 'REV-2024-0005',
      originalTransaction: {
        id: 'TXN-2024-0151',
        type: 'user_payment',
        user: {
          name: 'Mike Johnson',
          email: 'mike.johnson@email.com'
        },
        pickupId: 'PCK-2024-0151'
      },
      amount: 45000,
      type: 'reversal',
      status: 'pending',
      duration: '1 day',
      retryCount: 0,
      reason: 'System error',
      action: 'Approve',
      providerReference: 'PROV-REV-005'
    },
    {
      id: '3',
      referenceId: 'REF-2024-0006',
      originalTransaction: {
        id: 'TXN-2024-0152',
        type: 'user_payment',
        user: {
          name: 'Alice Wilson',
          email: 'alice.wilson@email.com'
        },
        pickupId: 'PCK-2024-0152'
      },
      amount: 30000,
      type: 'refund',
      status: 'failed',
      duration: '4 hours',
      retryCount: 3,
      reason: 'Pickup failed',
      action: 'Contact Support',
      providerReference: 'PROV-REF-006',
      failureReason: 'Account blocked'
    },
    {
      id: '4',
      referenceId: 'REV-2024-0007',
      originalTransaction: {
        id: 'TXN-2024-0153',
        type: 'enterprise_payment',
        enterprise: {
          name: 'Tech Solutions Ltd',
          email: 'billing@techsolutions.com'
        },
        invoiceId: 'INV-2024-0153'
      },
      amount: 85000,
      type: 'reversal',
      status: 'pending',
      duration: '2 days',
      retryCount: 0,
      reason: 'Duplicate payment',
      action: 'Investigate',
      providerReference: 'PROV-REV-007'
    },
    {
      id: '5',
      referenceId: 'REF-2024-0008',
      originalTransaction: {
        id: 'TXN-2024-0154',
        type: 'user_payment',
        user: {
          name: 'David Brown',
          email: 'david.brown@email.com'
        },
        pickupId: 'PCK-2024-0154'
      },
      amount: 55000,
      type: 'refund',
      status: 'failed',
      duration: '30 mins',
      retryCount: 1,
      reason: 'Dispute resolved',
      action: 'Retry',
      providerReference: 'PROV-REF-008',
      failureReason: 'Insufficient funds'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 6}`,
      referenceId: `${['REF', 'REV'][i % 2]}-2024-${1000 + i + 6}`,
      originalTransaction: {
        id: `TXN-2024-${1400 + i + 6}`,
        type: ['user_payment', 'enterprise_payment'][i % 2] as 'user_payment' | 'enterprise_payment',
        user: i % 2 === 0 ? {
          name: `User ${i + 6}`,
          email: `user${i + 6}@email.com`
        } : undefined,
        enterprise: i % 2 === 1 ? {
          name: `Enterprise ${i + 6}`,
          email: `billing@enterprise${i + 6}.com`
        } : undefined,
        pickupId: i % 2 === 0 ? `PCK-2024-${1400 + i + 6}` : undefined,
        invoiceId: i % 2 === 1 ? `INV-2024-${1400 + i + 6}` : undefined
      },
      amount: 20000 + (i * 5000),
      type: ['refund', 'reversal'][i % 2] as 'refund' | 'reversal',
      status: ['failed', 'pending'][i % 2] as 'failed' | 'pending',
      duration: `${(i % 4) + 1} ${i % 2 === 0 ? 'hours' : 'days'}`,
      retryCount: i % 2 === 0 ? Math.floor(Math.random() * 3) + 1 : 0,
      reason: ['Pickup failed', 'Duplicate payment', 'Dispute resolved', 'System error', 'Service not delivered'][i % 5],
      action: ['Retry', 'Approve', 'Contact Support', 'Investigate'][i % 4],
      providerReference: `PROV-${['REF', 'REV'][i % 2]}-${(i + 6).toString().padStart(3, '0')}`,
      failureReason: i % 2 === 0 ? ['Provider timeout', 'Account blocked', 'Insufficient funds', 'Bank error'][i % 4] : undefined
    }))
  ];

  const filteredRefunds = useMemo(() => {
    return refunds.filter(refund => {
      const matchesSearch = searchQuery === '' || 
        refund.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        refund.originalTransaction.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || refund.status === statusFilter;
      const matchesType = typeFilter === 'all' || refund.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [refunds, searchQuery, statusFilter, typeFilter]);

  const paginatedRefunds = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredRefunds.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredRefunds, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredRefunds.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    if (status === 'failed') return 'error';
    if (status === 'pending') return 'warning';
    return 'default';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'failed') return <IconAlertTriangle size={16} />;
    if (status === 'pending') return <IconClock size={16} />;
    return null;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'refund': return 'error';
      case 'reversal': return 'warning';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'refund': return <IconArrowBackUp size={16} />;
      case 'reversal': return <IconRefresh size={16} />;
      default: return null;
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'user_payment': return <IconUser size={16} />;
      case 'enterprise_payment': return <IconBuilding size={16} />;
      default: return null;
    }
  };

  const getSourceColor = (type: string) => {
    switch (type) {
      case 'user_payment': return 'primary';
      case 'enterprise_payment': return 'success';
      default: return 'default';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Retry': return 'warning';
      case 'Approve': return 'success';
      case 'Contact Support': return 'info';
      case 'Investigate': return 'error';
      default: return 'primary';
    }
  };

  const getDurationColor = (duration: string) => {
    const value = parseInt(duration);
    const unit = duration.includes('hour') ? 'hour' : 'day';
    
    if (unit === 'hour' && value >= 4) return 'error';
    if (unit === 'hour' && value >= 2) return 'warning';
    if (unit === 'day' && value >= 2) return 'error';
    if (unit === 'day' && value >= 1) return 'warning';
    return 'success';
  };

  const handleExport = () => {
    const headers = [
      'Reference ID',
      'Original Transaction',
      'Source',
      'Amount (₦)',
      'Type',
      'Status',
      'Duration',
      'Retry Count',
      'Reason',
      'Action',
      'Provider Reference',
      'Failure Reason'
    ];

    const rows = paginatedRefunds.map(item => [
      item.referenceId,
      item.originalTransaction.id,
      item.originalTransaction.type.replace('_', ' '),
      item.amount.toString(),
      item.type,
      item.status,
      item.duration,
      item.retryCount.toString(),
      item.reason,
      item.action,
      item.providerReference,
      item.failureReason || 'N/A'
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'failed-pending-refunds.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Failed & Pending Refunds">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search reference or transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={16} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="refund">Refund</MenuItem>
              <MenuItem value="reversal">Reversal</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flex: 1 }} />

          <Button
            variant="outlined"
            size="small"
            startIcon={<IconDownload size={16} />}
            onClick={handleExport}
          >
            Export CSV
          </Button>
        </Stack>

        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 1400 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 140 }}>Reference ID</TableCell>
                <TableCell sx={{ minWidth: 180 }}>Original Transaction</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Source</TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>Amount (₦)</TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>Type</TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>Status</TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>Duration</TableCell>
                <TableCell align="center" sx={{ minWidth: 120 }}>Retry Count</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Reason</TableCell>
                <TableCell align="center" sx={{ minWidth: 120 }}>Action</TableCell>
                <TableCell sx={{ minWidth: 140 }}>Provider Reference</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Failure Reason</TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRefunds.map((refund) => (
                <TableRow
                  key={refund.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick?.(refund)}
                >
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                      {refund.referenceId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                        {refund.originalTransaction.id}
                      </Typography>
                      {refund.originalTransaction.pickupId && (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconPackage size={12} />
                          <Typography variant="caption" color="text.secondary">
                            {refund.originalTransaction.pickupId}
                          </Typography>
                        </Stack>
                      )}
                      {refund.originalTransaction.invoiceId && (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconFileText size={12} />
                          <Typography variant="caption" color="text.secondary">
                            {refund.originalTransaction.invoiceId}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getSourceIcon(refund.originalTransaction.type)}
                      <Chip
                        size="small"
                        label={refund.originalTransaction.type.replace('_', ' ')}
                        color={getSourceColor(refund.originalTransaction.type) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700} color="error.main">
                      ₦{refund.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getTypeIcon(refund.type)}
                      <Chip
                        size="small"
                        label={refund.type.charAt(0).toUpperCase() + refund.type.slice(1)}
                        color={getTypeColor(refund.type) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getStatusIcon(refund.status)}
                      <Chip
                        size="small"
                        label={refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                        color={getStatusColor(refund.status) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={refund.duration}
                      color={getDurationColor(refund.duration) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {refund.status === 'failed' ? (
                      <Stack spacing={1} alignItems="center">
                        <Typography variant="body2" fontWeight={600}>
                          {refund.retryCount}/3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(refund.retryCount / 3) * 100}
                          sx={{
                            width: 40,
                            height: 4,
                            borderRadius: 2,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: refund.retryCount >= 3 ? 'error.main' : 'warning.main',
                            },
                          }}
                        />
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        -
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {refund.reason}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                      <Typography
                        variant="caption"
                        color={getActionColor(refund.action) + '.main' as any}
                        fontWeight={600}
                      >
                        {refund.action}
                      </Typography>
                      <IconArrowRight size={14} />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {refund.providerReference}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {refund.failureReason || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {refund.status === 'failed' && refund.retryCount >= 3 && (
                        <Tooltip title="Max retries reached">
                          <IconAlertTriangle size={16} color="orange" />
                        </Tooltip>
                      )}
                      {refund.status === 'pending' && (
                        <Tooltip title="Pending approval">
                          <IconClock size={16} color="blue" />
                        </Tooltip>
                      )}
                      <Tooltip title="View details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowClick?.(refund);
                          }}
                        >
                          <IconEye size={16} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredRefunds.length)} of {filteredRefunds.length} refunds
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>

        {/* Summary */}
        <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, mt: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Failed & Pending Refunds Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Issues</Typography>
              <Typography variant="caption" fontWeight={600}>{filteredRefunds.length}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Failed Refunds</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {filteredRefunds.filter(r => r.status === 'failed').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Pending Refunds</Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {filteredRefunds.filter(r => r.status === 'pending').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Max Retries Reached</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {filteredRefunds.filter(r => r.status === 'failed' && r.retryCount >= 3).length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Amount Affected</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                ₦{filteredRefunds.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default FailedPendingRefunds;
