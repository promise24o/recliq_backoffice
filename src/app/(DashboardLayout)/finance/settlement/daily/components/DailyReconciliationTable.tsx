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
  IconCreditCard,
  IconTruck,
  IconNotes,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconClock
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface TransactionData {
  id: string;
  txnId: string;
  source: 'paystack' | 'flutterwave' | 'bank' | 'manual';
  ledgerAmount: number;
  providerAmount: number;
  fee: number;
  variance: number;
  status: 'matched' | 'missing_provider' | 'missing_ledger' | 'amount_mismatch' | 'pending_settlement';
  internalReference: string;
  providerReference: string;
  initiatedAt: string;
  settledAt?: string;
}

interface DailyReconciliationTableProps {
  onRowClick: (transaction: TransactionData) => void;
}

const DailyReconciliationTable: React.FC<DailyReconciliationTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  // Mock data
  const transactionData: TransactionData[] = [
    {
      id: '1',
      txnId: 'TXN-2024-001',
      source: 'paystack',
      ledgerAmount: 50000,
      providerAmount: 50000,
      fee: 1000,
      variance: 0,
      status: 'matched',
      internalReference: 'REF-001',
      providerReference: 'PAY-001',
      initiatedAt: '2024-01-15 09:30:00',
      settledAt: '2024-01-15 09:32:00'
    },
    {
      id: '2',
      txnId: 'TXN-2024-002',
      source: 'flutterwave',
      ledgerAmount: 75000,
      providerAmount: 75000,
      fee: 1500,
      variance: 0,
      status: 'matched',
      internalReference: 'REF-002',
      providerReference: 'FLW-002',
      initiatedAt: '2024-01-15 10:15:00',
      settledAt: '2024-01-15 10:18:00'
    },
    {
      id: '3',
      txnId: 'TXN-2024-003',
      source: 'paystack',
      ledgerAmount: 25000,
      providerAmount: 0,
      fee: 500,
      variance: -25000,
      status: 'missing_provider',
      internalReference: 'REF-003',
      providerReference: '',
      initiatedAt: '2024-01-15 11:00:00'
    },
    {
      id: '4',
      txnId: 'TXN-2024-004',
      source: 'flutterwave',
      ledgerAmount: 0,
      providerAmount: 45000,
      fee: 900,
      variance: 45000,
      status: 'missing_ledger',
      internalReference: '',
      providerReference: 'FLW-004',
      initiatedAt: '2024-01-15 11:30:00',
      settledAt: '2024-01-15 11:35:00'
    },
    {
      id: '5',
      txnId: 'TXN-2024-005',
      source: 'paystack',
      ledgerAmount: 60000,
      providerAmount: 59500,
      fee: 1200,
      variance: -500,
      status: 'amount_mismatch',
      internalReference: 'REF-005',
      providerReference: 'PAY-005',
      initiatedAt: '2024-01-15 12:00:00',
      settledAt: '2024-01-15 12:05:00'
    },
    {
      id: '6',
      txnId: 'TXN-2024-006',
      source: 'bank',
      ledgerAmount: 100000,
      providerAmount: 100000,
      fee: 0,
      variance: 0,
      status: 'pending_settlement',
      internalReference: 'REF-006',
      providerReference: 'BANK-006',
      initiatedAt: '2024-01-15 13:00:00'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 7}`,
      txnId: `TXN-2024-${String(i + 7).padStart(3, '0')}`,
      source: ['paystack', 'flutterwave', 'bank', 'manual'][i % 4] as 'paystack' | 'flutterwave' | 'bank' | 'manual',
      ledgerAmount: i % 5 === 0 ? 0 : 25000 + (i * 5000),
      providerAmount: i % 3 === 0 ? 0 : 25000 + (i * 5000),
      fee: i % 4 === 0 ? 0 : 500 + (i * 100),
      variance: i % 3 === 0 ? (i % 2 === 0 ? 500 : -500) * (i + 1) : 0,
      status: ['matched', 'missing_provider', 'missing_ledger', 'amount_mismatch', 'pending_settlement'][i % 5] as 'matched' | 'missing_provider' | 'missing_ledger' | 'amount_mismatch' | 'pending_settlement',
      internalReference: `REF-${String(i + 7).padStart(3, '0')}`,
      providerReference: i % 3 === 0 ? '' : `${['PAY', 'FLW', 'BANK', 'MAN'][i % 4]}-${String(i + 7).padStart(3, '0')}`,
      initiatedAt: `2024-01-15 ${9 + (i % 8)}:${30 + (i % 30)}:00`,
      settledAt: i % 4 === 0 ? undefined : `2024-01-15 ${9 + (i % 8)}:${35 + (i % 30)}:00`
    }))
  ];

  const filteredData = useMemo(() => {
    return transactionData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.txnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.internalReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.providerReference.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || item.source === sourceFilter;
      
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [transactionData, searchQuery, statusFilter, sourceFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matched': return 'success';
      case 'missing_provider': return 'warning';
      case 'missing_ledger': return 'error';
      case 'amount_mismatch': return 'error';
      case 'pending_settlement': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'matched': return <IconCheck size={16} />;
      case 'missing_provider': return <IconAlertTriangle size={16} />;
      case 'missing_ledger': return <IconX size={16} />;
      case 'amount_mismatch': return <IconX size={16} />;
      case 'pending_settlement': return <IconClock size={16} />;
      default: return null;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'paystack': return <IconBuildingBank size={16} />;
      case 'flutterwave': return <IconCreditCard size={16} />;
      case 'bank': return <IconTruck size={16} />;
      case 'manual': return <IconNotes size={16} />;
      default: return <IconBuildingBank size={16} />;
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance === 0) return 'success';
    if (variance > 0) return 'warning';
    return 'error';
  };

  const handleExport = () => {
    const headers = [
      'Transaction ID',
      'Source',
      'Ledger Amount (₦)',
      'Provider Amount (₦)',
      'Fee (₦)',
      'Variance (₦)',
      'Status',
      'Internal Reference',
      'Provider Reference',
      'Initiated At'
    ];

    const rows = paginatedData.map(item => [
      item.txnId,
      item.source,
      item.ledgerAmount.toString(),
      item.providerAmount.toString(),
      item.fee.toString(),
      item.variance.toString(),
      item.status,
      item.internalReference,
      item.providerReference,
      item.initiatedAt
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'daily-reconciliation.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Daily Reconciliation Table">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search Transaction ID / Reference..."
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
              <MenuItem value="matched">Matched</MenuItem>
              <MenuItem value="missing_provider">Missing in Provider</MenuItem>
              <MenuItem value="missing_ledger">Missing in Ledger</MenuItem>
              <MenuItem value="amount_mismatch">Amount Mismatch</MenuItem>
              <MenuItem value="pending_settlement">Pending Settlement</MenuItem>
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
              <MenuItem value="paystack">Paystack</MenuItem>
              <MenuItem value="flutterwave">Flutterwave</MenuItem>
              <MenuItem value="bank">Bank Transfers</MenuItem>
              <MenuItem value="manual">Manual Entries</MenuItem>
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
                <TableCell>Transaction ID</TableCell>
                <TableCell>Source</TableCell>
                <TableCell align="right">Ledger (₦)</TableCell>
                <TableCell align="right">Provider (₦)</TableCell>
                <TableCell align="right">Fee (₦)</TableCell>
                <TableCell align="right">Variance (₦)</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Internal Ref</TableCell>
                <TableCell>Provider Ref</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(transaction)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {transaction.txnId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getSourceIcon(transaction.source)}
                      <Typography variant="body2" fontWeight={600}>
                        {transaction.source.charAt(0).toUpperCase() + transaction.source.slice(1)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700} color="primary.main">
                      ₦{transaction.ledgerAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700} color="success.main">
                      ₦{transaction.providerAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600} color="warning.main">
                      -₦{transaction.fee.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      variant="body2" 
                      fontWeight={700}
                      color={getVarianceColor(transaction.variance) + '.main' as any}
                      fontFamily="monospace"
                    >
                      {transaction.variance === 0 ? '₦0' : `${transaction.variance > 0 ? '+' : ''}₦${Math.abs(transaction.variance).toLocaleString()}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getStatusIcon(transaction.status)}
                      <Chip
                        size="small"
                        label={transaction.status.replace('_', ' ').charAt(0).toUpperCase() + transaction.status.replace('_', ' ').slice(1)}
                        color={getStatusColor(transaction.status) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {transaction.internalReference || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {transaction.providerReference || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {transaction.status !== 'matched' && (
                        <Tooltip title="Requires attention">
                          <IconAlertTriangle size={16} color="orange" />
                        </Tooltip>
                      )}
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} transactions
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
            Reconciliation Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Transactions</Typography>
              <Typography variant="caption" fontWeight={600}>
                {paginatedData.length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Matched</Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                {paginatedData.filter(item => item.status === 'matched').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Issues Found</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {paginatedData.filter(item => item.status !== 'matched' && item.status !== 'pending_settlement').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Variance</Typography>
              <Typography variant="caption" fontWeight={600} color={paginatedData.reduce((sum, item) => sum + item.variance, 0) === 0 ? 'success.main' : 'error.main'}>
                ₦{paginatedData.reduce((sum, item) => sum + item.variance, 0).toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default DailyReconciliationTable;
