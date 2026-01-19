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
  Pagination
} from '@mui/material';
import { 
  IconEye, 
  IconSearch,
  IconFilter,
  IconDownload,
  IconCreditCard,
  IconBuildingBank,
  IconDeviceMobile,
  IconWallet
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface PaymentData {
  id: string;
  date: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  paymentId: string;
  method: 'card' | 'transfer' | 'ussd' | 'wallet';
  amount: number;
  purpose: string;
  status: 'successful' | 'pending' | 'failed';
  providerRef: string;
  linkedTransaction: string;
}

interface UserPaymentsTableProps {
  onRowClick: (payment: PaymentData) => void;
}

const UserPaymentsTable: React.FC<UserPaymentsTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');

  // Mock data
  const mockPayments: PaymentData[] = [
    {
      id: '1',
      date: '2024-01-15',
      user: {
        name: 'Aisha Bello',
        avatar: 'AB',
        email: 'aisha.bello@email.com'
      },
      paymentId: 'PAY-2024-0142',
      method: 'card',
      amount: 7500,
      purpose: 'Pickup service fee',
      status: 'successful',
      providerRef: 'FLW-123456789',
      linkedTransaction: 'PU-2024-0142'
    },
    {
      id: '2',
      date: '2024-01-15',
      user: {
        name: 'Chukwu Okafor',
        avatar: 'CO',
        email: 'chukwu.okafor@email.com'
      },
      paymentId: 'PAY-2024-0143',
      method: 'transfer',
      amount: 12000,
      purpose: 'Priority pickup',
      status: 'successful',
      providerRef: 'BANK-987654321',
      linkedTransaction: 'PU-2024-0143'
    },
    {
      id: '3',
      date: '2024-01-14',
      user: {
        name: 'Fatima Ibrahim',
        avatar: 'FI',
        email: 'fatima.ibrahim@email.com'
      },
      paymentId: 'PAY-2024-0144',
      method: 'ussd',
      amount: 5000,
      purpose: 'Pickup service fee',
      status: 'pending',
      providerRef: 'USSD-456789123',
      linkedTransaction: 'PU-2024-0144'
    },
    {
      id: '4',
      date: '2024-01-14',
      user: {
        name: 'Tunde Adekunle',
        avatar: 'TA',
        email: 'tunde.adekunle@email.com'
      },
      paymentId: 'PAY-2024-0145',
      method: 'wallet',
      amount: 3000,
      purpose: 'Penalty - no-show',
      status: 'failed',
      providerRef: 'WAL-789123456',
      linkedTransaction: 'PU-2024-0145'
    },
    {
      id: '5',
      date: '2024-01-13',
      user: {
        name: 'Mariam Yusuf',
        avatar: 'MY',
        email: 'mariam.yusuf@email.com'
      },
      paymentId: 'PAY-2024-0146',
      method: 'card',
      amount: 8500,
      purpose: 'Priority pickup',
      status: 'successful',
      providerRef: 'FLW-321654987',
      linkedTransaction: 'PU-2024-0146'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      date: `2024-01-${12 - (i % 10)}`,
      user: {
        name: `User ${i + 6}`,
        avatar: `U${i + 6}`,
        email: `user${i + 6}@email.com`
      },
      paymentId: `PAY-2024-${1400 + i + 6}`,
      method: ['card', 'transfer', 'ussd', 'wallet'][i % 4] as 'card' | 'transfer' | 'ussd' | 'wallet',
      amount: 3000 + (i * 500),
      purpose: ['Pickup service fee', 'Priority pickup', 'Penalty - no-show', 'Penalty - late cancellation'][i % 4],
      status: ['successful', 'pending', 'failed'][i % 3] as 'successful' | 'pending' | 'failed',
      providerRef: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      linkedTransaction: `PU-2024-${1400 + i + 6}`
    }))
  ];

  const filteredPayments = useMemo(() => {
    return mockPayments.filter(payment => {
      const matchesSearch = searchQuery === '' || 
        payment.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.purpose.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
      
      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [mockPayments, searchQuery, statusFilter, methodFilter]);

  const paginatedPayments = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredPayments.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredPayments, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'successful': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <IconCreditCard size={16} />;
      case 'transfer': return <IconBuildingBank size={16} />;
      case 'ussd': return <IconDeviceMobile size={16} />;
      case 'wallet': return <IconWallet size={16} />;
      default: return null;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'card': return 'primary';
      case 'transfer': return 'success';
      case 'ussd': return 'warning';
      case 'wallet': return 'info';
      default: return 'default';
    }
  };

  const handleExport = () => {
    const headers = [
      'Date',
      'User',
      'Payment ID',
      'Method',
      'Amount (₦)',
      'Purpose',
      'Status',
      'Provider Ref'
    ];

    const rows = paginatedPayments.map(item => [
      item.date,
      item.user.name,
      item.paymentId,
      item.method,
      item.amount.toString(),
      item.purpose,
      item.status,
      item.providerRef
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'user-payments.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="User Payments">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search user, payment ID, or purpose..."
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
              <MenuItem value="successful">Successful</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
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
              <MenuItem value="card">Card</MenuItem>
              <MenuItem value="transfer">Bank Transfer</MenuItem>
              <MenuItem value="ussd">USSD</MenuItem>
              <MenuItem value="wallet">Wallet</MenuItem>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Payment ID</TableCell>
                <TableCell>Method</TableCell>
                <TableCell align="right">Amount (₦)</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPayments.map((payment) => (
                <TableRow
                  key={payment.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(payment)}
                >
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(payment.date).toLocaleDateString()}
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
                        {payment.user.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {payment.user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {payment.user.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                      {payment.paymentId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getMethodIcon(payment.method)}
                      <Typography variant="body2">
                        {payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      ₦{payment.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {payment.purpose}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      color={getStatusColor(payment.status) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(payment);
                        }}
                      >
                        <IconEye size={16} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredPayments.length)} of {filteredPayments.length} entries
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
    </DashboardCard>
  );
};

export default UserPaymentsTable;
