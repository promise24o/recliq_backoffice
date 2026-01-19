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
  IconDeviceMobile,
  IconShield,
  IconX,
  IconCheck
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FailedHeldWithdrawal {
  id: string;
  withdrawalId: string;
  user: {
    name: string;
    avatar: string;
    kycStatus: 'verified' | 'pending' | 'unverified';
  };
  amount: number;
  method: 'bank' | 'mobile_money';
  type: 'failed' | 'held';
  duration: string;
  retryCount: number;
  reason: string;
  action: string;
  reference: string;
  bankInfo: {
    bankName: string;
    accountNumber: string;
    verified: boolean;
  };
}

interface FailedHeldWithdrawalsProps {
  onRowClick?: (withdrawal: FailedHeldWithdrawal) => void;
}

const FailedHeldWithdrawals: React.FC<FailedHeldWithdrawalsProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  // Mock data
  const withdrawals: FailedHeldWithdrawal[] = [
    {
      id: '1',
      withdrawalId: 'WD-2024-0147',
      user: {
        name: 'Sarah Williams',
        avatar: 'SW',
        kycStatus: 'verified'
      },
      amount: 30000,
      method: 'mobile_money',
      type: 'failed',
      duration: '2 hours',
      retryCount: 3,
      reason: 'Insufficient balance',
      action: 'Retry',
      reference: 'AIRTEL-123456789',
      bankInfo: {
        bankName: 'Airtel Money',
        accountNumber: '2348045678901',
        verified: true
      }
    },
    {
      id: '2',
      withdrawalId: 'WD-2024-0148',
      user: {
        name: 'David Brown',
        avatar: 'DB',
        kycStatus: 'unverified'
      },
      amount: 45000,
      method: 'bank',
      type: 'held',
      duration: '1 day',
      retryCount: 0,
      reason: 'KYC verification pending',
      action: 'Verify KYC',
      reference: 'BANK-987654321',
      bankInfo: {
        bankName: 'Access Bank',
        accountNumber: '1112223334',
        verified: false
      }
    },
    {
      id: '3',
      withdrawalId: 'WD-2024-0149',
      user: {
        name: 'Mike Johnson',
        avatar: 'MJ',
        kycStatus: 'verified'
      },
      amount: 75000,
      method: 'bank',
      type: 'failed',
      duration: '30 mins',
      retryCount: 1,
      reason: 'Bank server error',
      action: 'Retry',
      reference: 'GTBANK-456789123',
      bankInfo: {
        bankName: 'GTBank',
        accountNumber: '0123456789',
        verified: true
      }
    },
    {
      id: '4',
      withdrawalId: 'WD-2024-0150',
      user: {
        name: 'Jane Smith',
        avatar: 'JS',
        kycStatus: 'pending'
      },
      amount: 60000,
      method: 'mobile_money',
      type: 'held',
      duration: '3 days',
      retryCount: 0,
      reason: 'Compliance review',
      action: 'Investigate',
      reference: 'MTN-789123456',
      bankInfo: {
        bankName: 'MTN Mobile Money',
        accountNumber: '2348023456789',
        verified: true
      }
    },
    {
      id: '5',
      withdrawalId: 'WD-2024-0151',
      user: {
        name: 'John Doe',
        avatar: 'JD',
        kycStatus: 'verified'
      },
      amount: 50000,
      method: 'bank',
      type: 'failed',
      duration: '4 hours',
      retryCount: 2,
      reason: 'Account blocked',
      action: 'Contact User',
      reference: 'ZENITH-321654987',
      bankInfo: {
        bankName: 'Zenith Bank',
        accountNumber: '9876543210',
        verified: true
      }
    },
    {
      id: '6',
      withdrawalId: 'WD-2024-0152',
      user: {
        name: 'Alice Wilson',
        avatar: 'AW',
        kycStatus: 'unverified'
      },
      amount: 25000,
      method: 'mobile_money',
      type: 'held',
      duration: '2 days',
      retryCount: 0,
      reason: 'Suspicious activity',
      action: 'Investigate',
      reference: 'GLO-567891234',
      bankInfo: {
        bankName: 'Glo Mobile Money',
        accountNumber: '2348056789012',
        verified: false
      }
    },
    // Add more deterministic mock data for pagination
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 7}`,
      withdrawalId: `WD-2024-${1400 + i + 7}`,
      user: {
        name: `User ${i + 7}`,
        avatar: `U${i + 7}`,
        kycStatus: ['verified', 'pending', 'unverified'][i % 3] as 'verified' | 'pending' | 'unverified'
      },
      amount: 20000 + (i * 5000),
      method: ['bank', 'mobile_money'][i % 2] as 'bank' | 'mobile_money',
      type: ['failed', 'held'][i % 2] as 'failed' | 'held',
      duration: `${(i % 4) + 1} ${i % 2 === 0 ? 'hours' : 'days'}`,
      retryCount: i % 2 === 0 ? Math.floor(Math.random() * 3) + 1 : 0,
      reason: ['Insufficient balance', 'KYC verification pending', 'Bank server error', 'Compliance review', 'Account blocked', 'Suspicious activity'][i % 6],
      action: ['Retry', 'Verify KYC', 'Contact User', 'Investigate'][i % 4],
      reference: `REF-${(i + 1).toString().padStart(6, '0')}`,
      bankInfo: {
        bankName: ['GTBank', 'Zenith Bank', 'Access Bank', 'First Bank', 'UBA', 'MTN Mobile Money', 'Airtel Money', 'Glo Mobile Money'][i % 8],
        accountNumber: `987654321${i.toString().padStart(1, '0')}`,
        verified: i % 3 !== 2
      }
    }))
  ];

  const filteredWithdrawals = useMemo(() => {
    return withdrawals.filter(withdrawal => {
      const matchesSearch = searchQuery === '' || 
        withdrawal.withdrawalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        withdrawal.user.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === 'all' || withdrawal.type === typeFilter;
      const matchesAction = actionFilter === 'all' || withdrawal.action === actionFilter;
      
      return matchesSearch && matchesType && matchesAction;
    });
  }, [withdrawals, searchQuery, typeFilter, actionFilter]);

  const paginatedWithdrawals = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredWithdrawals.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredWithdrawals, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredWithdrawals.length / rowsPerPage);

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
      case 'bank': return <IconBuildingBank size={16} />;
      case 'mobile_money': return <IconDeviceMobile size={16} />;
      default: return null;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'bank': return 'primary';
      case 'mobile_money': return 'success';
      default: return 'default';
    }
  };

  const getKycColor = (status: string) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'unverified': return 'error';
      default: return 'default';
    }
  };

  const getKycIcon = (status: string) => {
    switch (status) {
      case 'verified': return <IconCheck size={14} />;
      case 'pending': return <IconClock size={14} />;
      case 'unverified': return <IconX size={14} />;
      default: return null;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Retry': return 'warning';
      case 'Contact User': return 'info';
      case 'Verify KYC': return 'warning';
      case 'Investigate': return 'error';
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

  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length <= 4) return accountNumber;
    return accountNumber.slice(0, 2) + '*'.repeat(accountNumber.length - 4) + accountNumber.slice(-2);
  };

  const handleExport = () => {
    const headers = [
      'Withdrawal ID',
      'User',
      'Amount (₦)',
      'Method',
      'Type',
      'Duration',
      'Retry Count',
      'Reason',
      'Action',
      'Reference',
      'Bank Details'
    ];

    const rows = paginatedWithdrawals.map(item => [
      item.withdrawalId,
      item.user.name,
      item.amount.toString(),
      item.method,
      item.type,
      item.duration,
      item.retryCount.toString(),
      item.reason,
      item.action,
      item.reference,
      `${item.bankInfo.bankName} • ${maskAccountNumber(item.bankInfo.accountNumber)}`
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'failed-held-withdrawals.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Failed / Held Withdrawals">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search withdrawal ID or user..."
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
              <MenuItem value="Contact User">Contact User</MenuItem>
              <MenuItem value="Verify KYC">Verify KYC</MenuItem>
              <MenuItem value="Investigate">Investigate</MenuItem>
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
                <TableCell sx={{ minWidth: 140 }}>Withdrawal ID</TableCell>
                <TableCell sx={{ minWidth: 180 }}>User</TableCell>
                <TableCell align="right" sx={{ minWidth: 120 }}>Amount (₦)</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Method</TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>Type</TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>Duration</TableCell>
                <TableCell align="center" sx={{ minWidth: 120 }}>Retry Count</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Reason</TableCell>
                <TableCell align="center" sx={{ minWidth: 120 }}>Action</TableCell>
                <TableCell sx={{ minWidth: 140 }}>Reference</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Bank Details</TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWithdrawals.map((withdrawal) => (
                <TableRow
                  key={withdrawal.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick?.(withdrawal)}
                >
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                      {withdrawal.withdrawalId}
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
                        {withdrawal.user.avatar}
                      </Avatar>
                      <Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" fontWeight={600}>
                            {withdrawal.user.name}
                          </Typography>
                          <Chip
                            size="small"
                            icon={getKycIcon(withdrawal.user.kycStatus)}
                            label={withdrawal.user.kycStatus.charAt(0).toUpperCase() + withdrawal.user.kycStatus.slice(1)}
                            color={getKycColor(withdrawal.user.kycStatus) as any}
                            variant="outlined"
                          />
                        </Stack>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700} color="error.main">
                      ₦{withdrawal.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getMethodIcon(withdrawal.method)}
                      <Chip
                        size="small"
                        label={withdrawal.method.replace('_', ' ')}
                        color={getMethodColor(withdrawal.method) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getTypeIcon(withdrawal.type)}
                      <Chip
                        size="small"
                        label={withdrawal.type.charAt(0).toUpperCase() + withdrawal.type.slice(1)}
                        color={getTypeColor(withdrawal.type) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={withdrawal.duration}
                      color={getDurationColor(withdrawal.duration) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {withdrawal.type === 'failed' ? (
                      <Stack spacing={1} alignItems="center">
                        <Typography variant="body2" fontWeight={600}>
                          {withdrawal.retryCount}/3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(withdrawal.retryCount / 3) * 100}
                          sx={{
                            width: 40,
                            height: 4,
                            borderRadius: 2,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: withdrawal.retryCount >= 3 ? 'error.main' : 'warning.main',
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
                      {withdrawal.reason}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                      <Typography
                        variant="caption"
                        color={getActionColor(withdrawal.action) + '.main' as any}
                        fontWeight={600}
                      >
                        {withdrawal.action}
                      </Typography>
                      <IconArrowRight size={14} />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {withdrawal.reference}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      <Typography variant="body2" fontWeight={600}>
                        {withdrawal.bankInfo.bankName}
                      </Typography>
                      <Typography variant="caption" fontFamily="monospace">
                        {maskAccountNumber(withdrawal.bankInfo.accountNumber)}
                      </Typography>
                      {withdrawal.bankInfo.verified ? (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <IconShield size={12} color="green" />
                          <Typography variant="caption" color="success.main">
                            Verified
                          </Typography>
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <IconAlertTriangle size={12} color="orange" />
                          <Typography variant="caption" color="warning.main">
                            Not Verified
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {withdrawal.type === 'failed' && withdrawal.retryCount >= 3 && (
                        <Tooltip title="Max retries reached">
                          <IconAlertTriangle size={16} color="orange" />
                        </Tooltip>
                      )}
                      {withdrawal.type === 'held' && (
                        <Tooltip title="Withdrawal on hold">
                          <IconClock size={16} color="blue" />
                        </Tooltip>
                      )}
                      <Tooltip title="View details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowClick?.(withdrawal);
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredWithdrawals.length)} of {filteredWithdrawals.length} withdrawals
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
            Failed & Held Withdrawals Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Issues</Typography>
              <Typography variant="caption" fontWeight={600}>{filteredWithdrawals.length}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Failed Withdrawals</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {filteredWithdrawals.filter(w => w.type === 'failed').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Held Withdrawals</Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {filteredWithdrawals.filter(w => w.type === 'held').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Max Retries Reached</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {filteredWithdrawals.filter(w => w.type === 'failed' && w.retryCount >= 3).length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Amount Affected</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                ₦{filteredWithdrawals.reduce((sum, w) => sum + w.amount, 0).toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default FailedHeldWithdrawals;
