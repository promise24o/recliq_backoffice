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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField
} from '@mui/material';
import { 
  IconEye, 
  IconSearch,
  IconFilter,
  IconDownload,
  IconCheck,
  IconX,
  IconClock,
  IconBuildingBank,
  IconDeviceMobile,
  IconShield,
  IconAlertTriangle,
  IconRefresh
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface WithdrawalData {
  id: string;
  date: string;
  user: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
    kycStatus: 'verified' | 'pending' | 'unverified';
  };
  amount: number;
  method: 'bank' | 'mobile_money';
  bankInfo: {
    bankName: string;
    accountNumber: string;
    verified: boolean;
  };
  status: 'requested' | 'processing' | 'paid' | 'failed' | 'held';
  requestedAt: string;
}

interface WithdrawalRequestsTableProps {
  onRowClick: (withdrawal: WithdrawalData) => void;
}

const WithdrawalRequestsTable: React.FC<WithdrawalRequestsTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [holdDialogOpen, setHoldDialogOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalData | null>(null);
  const [holdReason, setHoldReason] = useState('');

  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length <= 4) return accountNumber;
    return accountNumber.slice(0, 2) + '*'.repeat(accountNumber.length - 4) + accountNumber.slice(-2);
  };

  // Mock data - using deterministic data to avoid hydration issues
  const mockWithdrawals: WithdrawalData[] = [
    {
      id: '1',
      date: '2024-01-15',
      user: {
        name: 'John Doe',
        avatar: 'JD',
        email: 'john.doe@email.com',
        phone: '+234-801-234-5678',
        kycStatus: 'verified'
      },
      amount: 50000,
      method: 'bank',
      bankInfo: {
        bankName: 'GTBank',
        accountNumber: '0123456789',
        verified: true
      },
      status: 'requested',
      requestedAt: '2024-01-15 09:30:00'
    },
    {
      id: '2',
      date: '2024-01-15',
      user: {
        name: 'Jane Smith',
        avatar: 'JS',
        email: 'jane.smith@email.com',
        phone: '+234-802-345-6789',
        kycStatus: 'verified'
      },
      amount: 75000,
      method: 'mobile_money',
      bankInfo: {
        bankName: 'MTN Mobile Money',
        accountNumber: '2348023456789',
        verified: true
      },
      status: 'processing',
      requestedAt: '2024-01-15 10:15:00'
    },
    {
      id: '3',
      date: '2024-01-14',
      user: {
        name: 'Mike Johnson',
        avatar: 'MJ',
        email: 'mike.johnson@email.com',
        phone: '+234-803-456-7890',
        kycStatus: 'pending'
      },
      amount: 120000,
      method: 'bank',
      bankInfo: {
        bankName: 'Zenith Bank',
        accountNumber: '9876543210',
        verified: false
      },
      status: 'paid',
      requestedAt: '2024-01-14 14:20:00'
    },
    {
      id: '4',
      date: '2024-01-14',
      user: {
        name: 'Sarah Williams',
        avatar: 'SW',
        email: 'sarah.williams@email.com',
        phone: '+234-804-567-8901',
        kycStatus: 'verified'
      },
      amount: 30000,
      method: 'mobile_money',
      bankInfo: {
        bankName: 'Airtel Money',
        accountNumber: '2348045678901',
        verified: true
      },
      status: 'failed',
      requestedAt: '2024-01-14 16:45:00'
    },
    {
      id: '5',
      date: '2024-01-13',
      user: {
        name: 'David Brown',
        avatar: 'DB',
        email: 'david.brown@email.com',
        phone: '+234-805-678-9012',
        kycStatus: 'unverified'
      },
      amount: 45000,
      method: 'bank',
      bankInfo: {
        bankName: 'Access Bank',
        accountNumber: '1112223334',
        verified: false
      },
      status: 'held',
      requestedAt: '2024-01-13 11:30:00'
    },
    // Add more deterministic mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      date: `2024-01-${12 - (i % 10)}`,
      user: {
        name: `User ${i + 6}`,
        avatar: `U${i + 6}`,
        email: `user${i + 6}@email.com`,
        phone: `+234-80${i + 6}-${100 + i}-${200 + i}`,
        kycStatus: ['verified', 'pending', 'unverified'][i % 3] as 'verified' | 'pending' | 'unverified'
      },
      amount: 25000 + (i * 5000),
      method: ['bank', 'mobile_money'][i % 2] as 'bank' | 'mobile_money',
      bankInfo: {
        bankName: ['GTBank', 'Zenith Bank', 'Access Bank', 'First Bank', 'UBA', 'MTN Mobile Money', 'Airtel Money'][i % 7],
        accountNumber: `123456789${i.toString().padStart(1, '0')}`,
        verified: i % 3 !== 2
      },
      status: ['requested', 'processing', 'paid', 'failed', 'held'][i % 5] as 'requested' | 'processing' | 'paid' | 'failed' | 'held',
      requestedAt: `2024-01-${12 - (i % 10)} ${9 + (i % 8)}:${30 + (i % 30)}:00`
    }))
  ];

  const filteredWithdrawals = useMemo(() => {
    return mockWithdrawals.filter(withdrawal => {
      const matchesSearch = searchQuery === '' || 
        withdrawal.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        withdrawal.user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || withdrawal.status === statusFilter;
      const matchesMethod = methodFilter === 'all' || withdrawal.method === methodFilter;
      
      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [mockWithdrawals, searchQuery, statusFilter, methodFilter]);

  const paginatedWithdrawals = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredWithdrawals.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredWithdrawals, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredWithdrawals.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'requested': return 'warning';
      case 'processing': return 'info';
      case 'failed': return 'error';
      case 'held': return 'error';
      default: return 'default';
    }
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

  const getDurationColor = (duration: string) => {
    const value = parseInt(duration);
    const unit = duration.includes('hour') ? 'hour' : 'day';
    
    if (unit === 'hour' && value >= 4) return 'error';
    if (unit === 'hour' && value >= 2) return 'warning';
    if (unit === 'day' && value >= 3) return 'error';
    if (unit === 'day' && value >= 1) return 'warning';
    return 'success';
  };

  const handleApproveWithdrawal = (withdrawal: WithdrawalData) => {
    // Approve withdrawal logic would be implemented here
    console.log(`Approving withdrawal for ${withdrawal.user.name}`);
  };

  const handleHoldWithdrawal = (withdrawal: WithdrawalData) => {
    setSelectedWithdrawal(withdrawal);
    setHoldDialogOpen(true);
  };

  const confirmHoldWithdrawal = () => {
    if (selectedWithdrawal && holdReason) {
      // Hold withdrawal logic would be implemented here
      console.log(`Holding withdrawal for ${selectedWithdrawal.user.name}. Reason: ${holdReason}`);
      setHoldDialogOpen(false);
      setHoldReason('');
      setSelectedWithdrawal(null);
    }
  };

  const handleRetryWithdrawal = (withdrawal: WithdrawalData) => {
    // Retry withdrawal logic would be implemented here
    console.log(`Retrying withdrawal for ${withdrawal.user.name}`);
  };

  const handleExport = () => {
    const headers = [
      'Date',
      'User',
      'Amount (₦)',
      'Method',
      'Bank (Masked)',
      'Status',
      'Requested At'
    ];

    const rows = paginatedWithdrawals.map(item => [
      item.date,
      item.user.name,
      item.amount.toString(),
      item.method,
      `${item.bankInfo.bankName} • ${maskAccountNumber(item.bankInfo.accountNumber)}`,
      item.status,
      item.requestedAt
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'withdrawal-requests.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Withdrawal Requests">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search user name or email..."
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
              <MenuItem value="requested">Requested</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="held">Held</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Method</InputLabel>
            <Select
              value={methodFilter}
              label="Method"
              onChange={(e) => setMethodFilter(e.target.value)}
            >
              <MenuItem value="all">All Methods</MenuItem>
              <MenuItem value="bank">Bank Transfer</MenuItem>
              <MenuItem value="mobile_money">Mobile Money</MenuItem>
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
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="right">Amount (₦)</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Bank (Masked)</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Requested At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWithdrawals.map((withdrawal) => (
                <TableRow
                  key={withdrawal.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(withdrawal)}
                >
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(withdrawal.date).toLocaleDateString()}
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
                        <Typography variant="caption" color="text.secondary">
                          {withdrawal.user.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
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
                    <Chip
                      size="small"
                      label={withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                      color={getStatusColor(withdrawal.status) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {withdrawal.requestedAt}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="View details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowClick(withdrawal);
                          }}
                        >
                          <IconEye size={16} />
                        </IconButton>
                      </Tooltip>
                      {withdrawal.status === 'requested' && (
                        <>
                          <Tooltip title="Approve withdrawal">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApproveWithdrawal(withdrawal);
                              }}
                            >
                              <IconCheck size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hold withdrawal">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleHoldWithdrawal(withdrawal);
                              }}
                            >
                              <IconX size={16} />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      {withdrawal.status === 'failed' && (
                        <Tooltip title="Retry withdrawal">
                          <IconButton
                            size="small"
                            color="warning"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRetryWithdrawal(withdrawal);
                            }}
                          >
                            <IconRefresh size={16} />
                          </IconButton>
                        </Tooltip>
                      )}
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
      </Box>

      {/* Hold Withdrawal Dialog */}
      <Dialog open={holdDialogOpen} onClose={() => setHoldDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Hold Withdrawal</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            User: {selectedWithdrawal?.user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Amount: ₦{selectedWithdrawal?.amount?.toLocaleString()}
          </Typography>
          <MuiTextField
            label="Reason for holding withdrawal"
            multiline
            rows={4}
            fullWidth
            value={holdReason}
            onChange={(e) => setHoldReason(e.target.value)}
            placeholder="Please provide a reason for holding this withdrawal..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHoldDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={confirmHoldWithdrawal} 
            variant="contained" 
            color="error"
            disabled={!holdReason.trim()}
          >
            Hold Withdrawal
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardCard>
  );
};

export default WithdrawalRequestsTable;
