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
  IconBuildingBank,
  IconWallet,
  IconCash
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FailedHeldPayout {
  id: string;
  payoutId: string;
  agent: {
    name: string;
    avatar: string;
  };
  amount: number;
  method: 'bank_transfer' | 'wallet' | 'cash';
  type: 'failed' | 'held';
  duration: string;
  retryCount: number;
  reason: string;
  action: string;
  reference: string;
}

interface FailedHeldPayoutsProps {
  onRowClick?: (payout: FailedHeldPayout) => void;
}

const FailedHeldPayouts: React.FC<FailedHeldPayoutsProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  // Mock data
  const payouts: FailedHeldPayout[] = [
    {
      id: '1',
      payoutId: 'PO-2024-0147',
      agent: {
        name: 'Aisha Yusuf',
        avatar: 'AY'
      },
      amount: 1710000,
      method: 'bank_transfer',
      type: 'failed',
      duration: '2 hours',
      retryCount: 3,
      reason: 'Account blocked',
      action: 'Contact Agent',
      reference: 'BANK-123456789'
    },
    {
      id: '2',
      payoutId: 'PO-2024-0148',
      agent: {
        name: 'Tunde Adekunle',
        avatar: 'TA'
      },
      amount: 1125000,
      method: 'wallet',
      type: 'held',
      duration: '1 day',
      retryCount: 0,
      reason: 'Compliance review',
      action: 'Review',
      reference: 'WAL-987654321'
    },
    {
      id: '3',
      payoutId: 'PO-2024-0149',
      agent: {
        name: 'Chukwu Okafor',
        avatar: 'CO'
      },
      amount: 1260000,
      method: 'cash',
      type: 'failed',
      duration: '30 mins',
      retryCount: 1,
      reason: 'Insufficient balance',
      action: 'Retry',
      reference: 'CASH-456789123'
    },
    {
      id: '4',
      payoutId: 'PO-2024-0150',
      agent: {
        name: 'Fatima Ibrahim',
        avatar: 'FI'
      },
      amount: 1440000,
      method: 'bank_transfer',
      type: 'held',
      duration: '3 days',
      retryCount: 0,
      reason: 'Dispute investigation',
      action: 'Investigate',
      reference: 'BANK-789123456'
    },
    {
      id: '5',
      payoutId: 'PO-2024-0151',
      agent: {
        name: 'Ahmed Bello',
        avatar: 'AB'
      },
      amount: 2025000,
      method: 'wallet',
      type: 'failed',
      duration: '4 hours',
      retryCount: 2,
      reason: 'Network timeout',
      action: 'Retry',
      reference: 'WAL-321654987'
    },
    {
      id: '6',
      payoutId: 'PO-2024-0152',
      agent: {
        name: 'Grace Nwankwo',
        avatar: 'GN'
      },
      amount: 980000,
      method: 'bank_transfer',
      type: 'held',
      duration: '2 days',
      retryCount: 0,
      reason: 'KYC verification pending',
      action: 'Verify',
      reference: 'BANK-567891234'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 7}`,
      payoutId: `PO-2024-${1400 + i + 7}`,
      agent: {
        name: `Agent ${i + 7}`,
        avatar: `A${i + 7}`
      },
      amount: 800000 + (i * 100000),
      method: ['bank_transfer', 'wallet', 'cash'][i % 3] as 'bank_transfer' | 'wallet' | 'cash',
      type: ['failed', 'held'][i % 2] as 'failed' | 'held',
      duration: `${(i % 4) + 1} ${i % 2 === 0 ? 'hours' : 'days'}`,
      retryCount: i % 2 === 0 ? Math.floor(Math.random() * 3) + 1 : 0,
      reason: ['Account blocked', 'Compliance review', 'Insufficient balance', 'Dispute investigation', 'Network timeout', 'KYC verification pending'][i % 6],
      action: ['Contact Agent', 'Review', 'Retry', 'Investigate', 'Verify'][i % 5],
      reference: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    }))
  ];

  const filteredPayouts = useMemo(() => {
    return payouts.filter(payout => {
      const matchesSearch = searchQuery === '' || 
        payout.payoutId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payout.agent.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === 'all' || payout.type === typeFilter;
      const matchesAction = actionFilter === 'all' || payout.action === actionFilter;
      
      return matchesSearch && matchesType && matchesAction;
    });
  }, [payouts, searchQuery, typeFilter, actionFilter]);

  const paginatedPayouts = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredPayouts.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredPayouts, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredPayouts.length / rowsPerPage);

  const getTypeColor = (type: string) => {
    if (type === 'failed') return 'error';
    if (type === 'held') return 'warning';
    return 'default';
  };

  const getTypeIcon = (type: string) => {
    if (type === 'failed') return <IconAlertTriangle size={16} />;
    if (type === 'held') return <IconClock size={16} />;
    return null;
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer': return <IconBuildingBank size={16} />;
      case 'wallet': return <IconWallet size={16} />;
      case 'cash': return <IconCash size={16} />;
      default: return null;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'bank_transfer': return 'primary';
      case 'wallet': return 'success';
      case 'cash': return 'warning';
      default: return 'default';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Retry': return 'warning';
      case 'Contact Agent': return 'info';
      case 'Review': return 'warning';
      case 'Investigate': return 'error';
      case 'Verify': return 'info';
      default: return 'primary';
    }
  };

  const getDurationColor = (duration: string) => {
    const value = parseInt(duration);
    const unit = duration.includes('hour') ? 'hour' : 'day';
    
    if (unit === 'hour' && value >= 4) return 'error';
    if (unit === 'hour' && value >= 2) return 'warning';
    if (unit === 'day' && value >= 3) return 'error';
    if (unit === 'day' && value >= 1) return 'warning';
    return 'success';
  };

  const handleExport = () => {
    const headers = [
      'Payout ID',
      'Agent',
      'Amount (₦)',
      'Method',
      'Type',
      'Duration',
      'Retry Count',
      'Reason',
      'Action',
      'Reference'
    ];

    const rows = paginatedPayouts.map(item => [
      item.payoutId,
      item.agent.name,
      item.amount.toString(),
      item.method,
      item.type,
      item.duration,
      item.retryCount.toString(),
      item.reason,
      item.action,
      item.reference
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'failed-held-payouts.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Failed / Held Payouts">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search payout ID or agent..."
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
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="held">Held</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Action</InputLabel>
            <Select
              value={actionFilter}
              label="Action"
              onChange={(e) => setActionFilter(e.target.value)}
            >
              <MenuItem value="all">All Actions</MenuItem>
              <MenuItem value="Retry">Retry</MenuItem>
              <MenuItem value="Contact Agent">Contact Agent</MenuItem>
              <MenuItem value="Review">Review</MenuItem>
              <MenuItem value="Investigate">Investigate</MenuItem>
              <MenuItem value="Verify">Verify</MenuItem>
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
                <TableCell sx={{ minWidth: 140 }}>Payout ID</TableCell>
                <TableCell sx={{ minWidth: 180 }}>Agent</TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>Amount (₦)</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Method</TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>Type</TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>Duration</TableCell>
                <TableCell align="center" sx={{ minWidth: 120 }}>Retry Count</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Reason</TableCell>
                <TableCell align="center" sx={{ minWidth: 120 }}>Action</TableCell>
                <TableCell sx={{ minWidth: 140 }}>Reference</TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPayouts.map((payout) => (
                <TableRow
                  key={payout.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick?.(payout)}
                >
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                      {payout.payoutId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                          fontSize: '0.875rem',
                          fontWeight: 600
                        }}
                      >
                        {payout.agent.avatar}
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>
                        {payout.agent.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700} color="error.main">
                      ₦{payout.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getMethodIcon(payout.method)}
                      <Chip
                        size="small"
                        label={payout.method.replace('_', ' ')}
                        color={getMethodColor(payout.method) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getTypeIcon(payout.type)}
                      <Chip
                        size="small"
                        label={payout.type.charAt(0).toUpperCase() + payout.type.slice(1)}
                        color={getTypeColor(payout.type) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={payout.duration}
                      color={getDurationColor(payout.duration) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {payout.type === 'failed' ? (
                      <Stack spacing={1} alignItems="center">
                        <Typography variant="body2" fontWeight={600}>
                          {payout.retryCount}/3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(payout.retryCount / 3) * 100}
                          sx={{
                            width: 40,
                            height: 4,
                            borderRadius: 2,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: payout.retryCount >= 3 ? 'error.main' : 'warning.main',
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
                      {payout.reason}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                      <Typography
                        variant="caption"
                        color={getActionColor(payout.action) + '.main' as any}
                        fontWeight={600}
                      >
                        {payout.action}
                      </Typography>
                      <IconArrowRight size={14} />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {payout.reference}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {payout.type === 'failed' && payout.retryCount >= 3 && (
                        <Tooltip title="Max retries reached">
                          <IconAlertTriangle size={16} color="orange" />
                        </Tooltip>
                      )}
                      {payout.type === 'held' && (
                        <Tooltip title="Payout on hold">
                          <IconClock size={16} color="blue" />
                        </Tooltip>
                      )}
                      <Tooltip title="View details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowClick?.(payout);
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredPayouts.length)} of {filteredPayouts.length} payouts
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
            Failed & Held Payouts Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Issues</Typography>
              <Typography variant="caption" fontWeight={600}>{filteredPayouts.length}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Failed Payouts</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {filteredPayouts.filter(p => p.type === 'failed').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Held Payouts</Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {filteredPayouts.filter(p => p.type === 'held').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Max Retries Reached</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {filteredPayouts.filter(p => p.type === 'failed' && p.retryCount >= 3).length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Amount Affected</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                ₦{filteredPayouts.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default FailedHeldPayouts;
