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
  IconUsers,
  IconBriefcase,
  IconCheck,
  IconClock,
  IconX,
  IconAlertTriangle
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface BalanceData {
  id: string;
  source: string;
  provider: string;
  balance: number;
  status: 'reconciled' | 'pending' | 'error';
  lastUpdated: string;
  variance: number;
  internalLedgerBalance: number;
  providerReportedBalance: number;
  pendingTransactions: number;
  walletType?: string;
  purpose?: string;
}

interface PlatformBalanceTableProps {
  onRowClick: (balance: BalanceData) => void;
}

const PlatformBalanceTable: React.FC<PlatformBalanceTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');

  // Mock data
  const balanceData: BalanceData[] = [
    {
      id: '1',
      source: 'User Wallets',
      provider: 'Paystack',
      balance: 45200000,
      status: 'reconciled',
      lastUpdated: '2024-01-15 14:30:00',
      variance: 0,
      internalLedgerBalance: 45200000,
      providerReportedBalance: 45200000,
      pendingTransactions: 0,
      walletType: 'user'
    },
    {
      id: '2',
      source: 'Agent Wallets',
      provider: 'Flutterwave',
      balance: 31800000,
      status: 'pending',
      lastUpdated: '2024-01-15 14:25:00',
      variance: 150000,
      internalLedgerBalance: 31800000,
      providerReportedBalance: 31950000,
      pendingTransactions: 12,
      walletType: 'agent'
    },
    {
      id: '3',
      source: 'Enterprise Escrow',
      provider: 'Bank Escrow',
      balance: 28500000,
      status: 'reconciled',
      lastUpdated: '2024-01-15 13:45:00',
      variance: 0,
      internalLedgerBalance: 28500000,
      providerReportedBalance: 28500000,
      pendingTransactions: 0,
      walletType: 'enterprise'
    },
    {
      id: '4',
      source: 'Subscription Balances',
      provider: 'Paystack',
      balance: 22950000,
      status: 'error',
      lastUpdated: '2024-01-15 12:30:00',
      variance: -50000,
      internalLedgerBalance: 22950000,
      providerReportedBalance: 22900000,
      pendingTransactions: 5,
      walletType: 'subscription'
    },
    {
      id: '5',
      source: 'Operational Reserves',
      provider: 'Manual Settlements',
      balance: 6450000,
      status: 'pending',
      lastUpdated: '2024-01-15 11:20:00',
      variance: 25000,
      internalLedgerBalance: 6450000,
      providerReportedBalance: 6475000,
      pendingTransactions: 3,
      purpose: 'operational'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      source: ['User Wallets', 'Agent Wallets', 'Enterprise Escrow', 'Subscription Balances', 'Operational Reserves'][i % 5],
      provider: ['Paystack', 'Flutterwave', 'Bank Escrow', 'Manual Settlements'][i % 4],
      balance: 10000000 + (i * 1000000),
      status: ['reconciled', 'pending', 'error'][i % 3] as 'reconciled' | 'pending' | 'error',
      lastUpdated: `2024-01-${15 - (i % 10)} ${14 - (i % 8)}:${30 + (i % 30)}:00`,
      variance: i % 3 === 0 ? 0 : (i % 2 === 0 ? 50000 : -25000) * (i + 1),
      internalLedgerBalance: 10000000 + (i * 1000000),
      providerReportedBalance: 10000000 + (i * 1000000) + (i % 3 === 0 ? 0 : (i % 2 === 0 ? 50000 : -25000) * (i + 1)),
      pendingTransactions: i % 5,
      walletType: ['user', 'agent', 'enterprise', 'subscription'][i % 4],
      purpose: i % 5 === 4 ? 'operational' : undefined
    }))
  ];

  const filteredData = useMemo(() => {
    return balanceData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesProvider = providerFilter === 'all' || item.provider === providerFilter;
      
      return matchesSearch && matchesStatus && matchesProvider;
    });
  }, [balanceData, searchQuery, statusFilter, providerFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reconciled': return 'success';
      case 'pending': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reconciled': return <IconCheck size={16} />;
      case 'pending': return <IconClock size={16} />;
      case 'error': return <IconX size={16} />;
      default: return null;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'User Wallets': return <IconUsers size={16} />;
      case 'Agent Wallets': return <IconBriefcase size={16} />;
      case 'Enterprise Escrow': return <IconBuildingBank size={16} />;
      case 'Subscription Balances': return <IconWallet size={16} />;
      default: return <IconWallet size={16} />;
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance === 0) return 'success';
    if (variance > 0) return 'warning';
    return 'error';
  };

  const handleExport = () => {
    const headers = [
      'Source',
      'Provider',
      'Balance (₦)',
      'Status',
      'Last Updated',
      'Variance',
      'Internal Ledger Balance',
      'Provider Reported Balance',
      'Pending Transactions'
    ];

    const rows = paginatedData.map(item => [
      item.source,
      item.provider,
      item.balance.toString(),
      item.status,
      item.lastUpdated,
      item.variance.toString(),
      item.internalLedgerBalance.toString(),
      item.providerReportedBalance.toString(),
      item.pendingTransactions.toString()
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'platform-balance.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Platform Balance Table (Audit View)">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search source or provider..."
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
              <MenuItem value="reconciled">Reconciled</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="error">Error</MenuItem>
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
              <MenuItem value="Paystack">Paystack</MenuItem>
              <MenuItem value="Flutterwave">Flutterwave</MenuItem>
              <MenuItem value="Bank Escrow">Bank Escrow</MenuItem>
              <MenuItem value="Manual Settlements">Manual Settlements</MenuItem>
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
                <TableCell>Source</TableCell>
                <TableCell>Provider</TableCell>
                <TableCell align="right">Balance (₦)</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell align="right">Variance</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((balance) => (
                <TableRow
                  key={balance.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(balance)}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getSourceIcon(balance.source)}
                      <Typography variant="body2" fontWeight={600}>
                        {balance.source}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconBuildingBank size={16} />
                      <Typography variant="body2">
                        {balance.provider}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700} color="primary.main">
                      ₦{balance.balance.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getStatusIcon(balance.status)}
                      <Chip
                        size="small"
                        label={balance.status.charAt(0).toUpperCase() + balance.status.slice(1)}
                        color={getStatusColor(balance.status) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" fontFamily="monospace">
                      {balance.lastUpdated}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      variant="body2" 
                      fontWeight={600}
                      color={getVarianceColor(balance.variance) + '.main' as any}
                      fontFamily="monospace"
                    >
                      {balance.variance === 0 ? '₦0' : `${balance.variance > 0 ? '+' : ''}₦${Math.abs(balance.variance).toLocaleString()}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {balance.variance !== 0 && (
                        <Tooltip title="Requires attention">
                          <IconAlertTriangle size={16} color="orange" />
                        </Tooltip>
                      )}
                      <Tooltip title="View details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowClick(balance);
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} balances
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
            Audit Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Balance</Typography>
              <Typography variant="caption" fontWeight={600}>
                ₦{paginatedData.reduce((sum, item) => sum + item.balance, 0).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Reconciled</Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                {paginatedData.filter(item => item.status === 'reconciled').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Pending</Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {paginatedData.filter(item => item.status === 'pending').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Requires Attention</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {paginatedData.filter(item => item.variance !== 0).length}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default PlatformBalanceTable;
