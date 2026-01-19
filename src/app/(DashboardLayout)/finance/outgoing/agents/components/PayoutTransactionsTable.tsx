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
  IconBuildingBank,
  IconWallet,
  IconCash
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface PayoutTransaction {
  id: string;
  date: string;
  payoutId: string;
  agent: {
    name: string;
    avatar: string;
  };
  amount: number;
  method: 'bank_transfer' | 'wallet' | 'cash';
  status: 'processing' | 'paid' | 'failed' | 'reversed';
  reference: string;
}

interface PayoutTransactionsTableProps {
  onRowClick: (transaction: PayoutTransaction) => void;
}

const PayoutTransactionsTable: React.FC<PayoutTransactionsTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');

  // Mock data
  const mockTransactions: PayoutTransaction[] = [
    {
      id: '1',
      date: '2024-01-15',
      payoutId: 'PO-2024-0142',
      agent: {
        name: 'Ahmed Bello',
        avatar: 'AB'
      },
      amount: 2025000,
      method: 'bank_transfer',
      status: 'paid',
      reference: 'BANK-123456789'
    },
    {
      id: '2',
      date: '2024-01-15',
      payoutId: 'PO-2024-0143',
      agent: {
        name: 'Fatima Ibrahim',
        avatar: 'FI'
      },
      amount: 1440000,
      method: 'wallet',
      status: 'processing',
      reference: 'WAL-987654321'
    },
    {
      id: '3',
      date: '2024-01-14',
      payoutId: 'PO-2024-0144',
      agent: {
        name: 'Chukwu Okafor',
        avatar: 'CO'
      },
      amount: 1260000,
      method: 'bank_transfer',
      status: 'failed',
      reference: 'BANK-456789123'
    },
    {
      id: '4',
      date: '2024-01-14',
      payoutId: 'PO-2024-0145',
      agent: {
        name: 'Aisha Yusuf',
        avatar: 'AY'
      },
      amount: 1710000,
      method: 'cash',
      status: 'reversed',
      reference: 'CASH-789123456'
    },
    {
      id: '5',
      date: '2024-01-13',
      payoutId: 'PO-2024-0146',
      agent: {
        name: 'Tunde Adekunle',
        avatar: 'TA'
      },
      amount: 1125000,
      method: 'bank_transfer',
      status: 'paid',
      reference: 'BANK-321654987'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      date: `2024-01-${12 - (i % 10)}`,
      payoutId: `PO-2024-${1400 + i + 6}`,
      agent: {
        name: `Agent ${i + 6}`,
        avatar: `A${i + 6}`
      },
      amount: 800000 + (i * 100000),
      method: ['bank_transfer', 'wallet', 'cash'][i % 3] as 'bank_transfer' | 'wallet' | 'cash',
      status: ['processing', 'paid', 'failed', 'reversed'][i % 4] as 'processing' | 'paid' | 'failed' | 'reversed',
      reference: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    }))
  ];

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(transaction => {
      const matchesSearch = searchQuery === '' || 
        transaction.payoutId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.agent.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
      const matchesMethod = methodFilter === 'all' || transaction.method === methodFilter;
      
      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [mockTransactions, searchQuery, statusFilter, methodFilter]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredTransactions, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'processing': return 'info';
      case 'failed': return 'error';
      case 'reversed': return 'warning';
      default: return 'default';
    }
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

  const handleExport = () => {
    const headers = [
      'Date',
      'Payout ID',
      'Agent',
      'Amount (₦)',
      'Method',
      'Status',
      'Reference'
    ];

    const rows = paginatedTransactions.map(item => [
      item.date,
      item.payoutId,
      item.agent.name,
      item.amount.toString(),
      item.method,
      item.status,
      item.reference
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'payout-transactions.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Payout Transactions (Audit)">
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
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="reversed">Reversed</MenuItem>
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
              <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
              <MenuItem value="wallet">Wallet</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
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
                <TableCell>Payout ID</TableCell>
                <TableCell>Agent</TableCell>
                <TableCell align="right">Amount (₦)</TableCell>
                <TableCell>Method</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(transaction)}
                >
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(transaction.date).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                      {transaction.payoutId}
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
                        {transaction.agent.avatar}
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>
                        {transaction.agent.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      ₦{transaction.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getMethodIcon(transaction.method)}
                      <Chip
                        size="small"
                        label={transaction.method.replace('_', ' ')}
                        color={getMethodColor(transaction.method) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      color={getStatusColor(transaction.status) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {transaction.reference}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(transaction);
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
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

export default PayoutTransactionsTable;
