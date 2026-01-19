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
  IconWallet,
  IconUser,
  IconBuilding
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface PaymentData {
  id: string;
  date: string;
  paymentId: string;
  source: 'user' | 'enterprise';
  payer: {
    name: string;
    avatar: string;
    email: string;
  };
  amount: number;
  method: 'card' | 'transfer' | 'ussd' | 'wallet';
  status: 'successful' | 'pending' | 'failed' | 'reversed' | 'timeout';
  provider: string;
  providerRef: string;
  attemptCount: number;
  linkedEntity: {
    type: 'pickup' | 'invoice';
    id: string;
  };
}

interface PaymentStatusTableProps {
  onRowClick: (payment: PaymentData) => void;
}

const PaymentStatusTable: React.FC<PaymentStatusTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');

  // Mock data
  const mockPayments: PaymentData[] = [
    {
      id: '1',
      date: '2024-01-15',
      paymentId: 'PAY-2024-0142',
      source: 'user',
      payer: {
        name: 'Aisha Bello',
        avatar: 'AB',
        email: 'aisha.bello@email.com'
      },
      amount: 7500,
      method: 'card',
      status: 'successful',
      provider: 'Flutterwave',
      providerRef: 'FLW-123456789',
      attemptCount: 1,
      linkedEntity: {
        type: 'pickup',
        id: 'PU-2024-0142'
      }
    },
    {
      id: '2',
      date: '2024-01-15',
      paymentId: 'PAY-2024-0143',
      source: 'enterprise',
      payer: {
        name: 'Dangote Group',
        avatar: 'DNG',
        email: 'finance@dangote.com'
      },
      amount: 8500000,
      method: 'transfer',
      status: 'pending',
      provider: 'Paystack',
      providerRef: 'BANK-987654321',
      attemptCount: 1,
      linkedEntity: {
        type: 'invoice',
        id: 'INV-2024-0143'
      }
    },
    {
      id: '3',
      date: '2024-01-14',
      paymentId: 'PAY-2024-0144',
      source: 'user',
      payer: {
        name: 'Chukwu Okafor',
        avatar: 'CO',
        email: 'chukwu.okafor@email.com'
      },
      amount: 5000,
      method: 'ussd',
      status: 'failed',
      provider: 'GTBank USSD',
      providerRef: 'USSD-456789123',
      attemptCount: 3,
      linkedEntity: {
        type: 'pickup',
        id: 'PU-2024-0144'
      }
    },
    {
      id: '4',
      date: '2024-01-14',
      paymentId: 'PAY-2024-0145',
      source: 'enterprise',
      payer: {
        name: 'Shoprite Nigeria',
        avatar: 'SRN',
        email: 'accounts@shoprite.ng'
      },
      amount: 3200000,
      method: 'transfer',
      status: 'reversed',
      provider: 'Zenith Bank',
      providerRef: 'BANK-789123456',
      attemptCount: 1,
      linkedEntity: {
        type: 'invoice',
        id: 'INV-2024-0145'
      }
    },
    {
      id: '5',
      date: '2024-01-13',
      paymentId: 'PAY-2024-0146',
      source: 'user',
      payer: {
        name: 'Fatima Ibrahim',
        avatar: 'FI',
        email: 'fatima.ibrahim@email.com'
      },
      amount: 3000,
      method: 'wallet',
      status: 'timeout',
      provider: 'Flutterwave',
      providerRef: 'WAL-321654987',
      attemptCount: 2,
      linkedEntity: {
        type: 'pickup',
        id: 'PU-2024-0146'
      }
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      date: `2024-01-${12 - (i % 10)}`,
      paymentId: `PAY-2024-${1400 + i + 6}`,
      source: ['user', 'enterprise'][i % 2] as 'user' | 'enterprise',
      payer: {
        name: i % 2 === 0 ? `User ${i + 6}` : `Enterprise Client ${i + 6}`,
        avatar: i % 2 === 0 ? `U${i + 6}` : `EC${i + 6}`,
        email: i % 2 === 0 ? `user${i + 6}@email.com` : `client${i + 6}@enterprise.com`
      },
      amount: i % 2 === 0 ? 3000 + (i * 500) : 1000000 + (i * 200000),
      method: ['card', 'transfer', 'ussd', 'wallet'][i % 4] as 'card' | 'transfer' | 'ussd' | 'wallet',
      status: ['successful', 'pending', 'failed', 'reversed', 'timeout'][i % 5] as 'successful' | 'pending' | 'failed' | 'reversed' | 'timeout',
      provider: ['Flutterwave', 'Paystack', 'GTBank USSD', 'Zenith Bank'][i % 4],
      providerRef: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      attemptCount: Math.floor(Math.random() * 3) + 1,
      linkedEntity: {
        type: i % 2 === 0 ? 'pickup' : 'invoice',
        id: i % 2 === 0 ? `PU-2024-${1400 + i + 6}` : `INV-2024-${1400 + i + 6}`
      }
    }))
  ];

  const filteredPayments = useMemo(() => {
    return mockPayments.filter(payment => {
      const matchesSearch = searchQuery === '' || 
        payment.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.payer.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || payment.source === sourceFilter;
      const matchesProvider = providerFilter === 'all' || payment.provider === providerFilter;
      const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
      
      return matchesSearch && matchesStatus && matchesSource && matchesProvider && matchesMethod;
    });
  }, [mockPayments, searchQuery, statusFilter, sourceFilter, providerFilter, methodFilter]);

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
      case 'reversed': return 'info';
      case 'timeout': return 'error';
      default: return 'default';
    }
  };

  const getSourceIcon = (source: string) => {
    return source === 'user' ? <IconUser size={16} /> : <IconBuilding size={16} />;
  };

  const getSourceColor = (source: string) => {
    return source === 'user' ? 'primary' : 'success';
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
      'Payment ID',
      'Source',
      'Payer',
      'Amount (₦)',
      'Method',
      'Status',
      'Provider'
    ];

    const rows = paginatedPayments.map(item => [
      item.date,
      item.paymentId,
      item.source,
      item.payer.name,
      item.amount.toString(),
      item.method,
      item.status,
      item.provider
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'payment-status.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Payment Status">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search payment ID or payer..."
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
              <MenuItem value="reversed">Reversed</MenuItem>
              <MenuItem value="timeout">Timeout</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Source</InputLabel>
            <Select
              value={sourceFilter}
              label="Source"
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <MenuItem value="all">All Sources</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="enterprise">Enterprise</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Provider</InputLabel>
            <Select
              value={providerFilter}
              label="Provider"
              onChange={(e) => setProviderFilter(e.target.value)}
            >
              <MenuItem value="all">All Providers</MenuItem>
              <MenuItem value="Flutterwave">Flutterwave</MenuItem>
              <MenuItem value="Paystack">Paystack</MenuItem>
              <MenuItem value="GTBank USSD">GTBank USSD</MenuItem>
              <MenuItem value="Zenith Bank">Zenith Bank</MenuItem>
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
              <MenuItem value="transfer">Transfer</MenuItem>
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
                <TableCell>Payment ID</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Payer</TableCell>
                <TableCell align="right">Amount (₦)</TableCell>
                <TableCell>Method</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Provider</TableCell>
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
                    <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                      {payment.paymentId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getSourceIcon(payment.source)}
                      <Chip
                        size="small"
                        label={payment.source}
                        color={getSourceColor(payment.source) as any}
                        variant="outlined"
                      />
                    </Stack>
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
                        {payment.payer.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {payment.payer.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {payment.payer.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      ₦{payment.amount.toLocaleString()}
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
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      color={getStatusColor(payment.status) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {payment.provider}
                    </Typography>
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

export default PaymentStatusTable;
