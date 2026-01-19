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
  IconDownload,
  IconBuildingBank,
  IconCreditCard,
  IconTruck,
  IconNotes,
  IconCheck,
  IconX,
  IconClock
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface ProviderEntryData {
  id: string;
  provider: 'paystack' | 'flutterwave' | 'bank' | 'manual';
  batchId: string;
  txnId: string;
  grossAmount: number;
  fee: number;
  netAmount: number;
  status: 'settled' | 'pending' | 'failed';
  settlementDate: string;
  providerReference: string;
  transactionDate: string;
  matchedLedgerTxn?: string;
}

interface ProviderReportTableProps {
  onRowClick: (entry: ProviderEntryData) => void;
}

const ProviderReportTable: React.FC<ProviderReportTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');

  // Mock data
  const providerData: ProviderEntryData[] = [
    {
      id: '1',
      provider: 'paystack',
      batchId: 'BATCH-001',
      txnId: 'PAY-2024-001',
      grossAmount: 50000,
      fee: 1000,
      netAmount: 49000,
      status: 'settled',
      settlementDate: '2024-01-15 14:30:00',
      providerReference: 'PAY-REF-001',
      transactionDate: '2024-01-15 09:30:00',
      matchedLedgerTxn: 'TXN-2024-001'
    },
    {
      id: '2',
      provider: 'flutterwave',
      batchId: 'BATCH-002',
      txnId: 'FLW-2024-001',
      grossAmount: 75000,
      fee: 1500,
      netAmount: 73500,
      status: 'settled',
      settlementDate: '2024-01-15 15:45:00',
      providerReference: 'FLW-REF-001',
      transactionDate: '2024-01-15 10:15:00',
      matchedLedgerTxn: 'TXN-2024-002'
    },
    {
      id: '3',
      provider: 'paystack',
      batchId: 'BATCH-003',
      txnId: 'PAY-2024-002',
      grossAmount: 25000,
      fee: 500,
      netAmount: 24500,
      status: 'pending',
      settlementDate: '2024-01-16 09:00:00',
      providerReference: 'PAY-REF-002',
      transactionDate: '2024-01-15 11:00:00',
      matchedLedgerTxn: 'TXN-2024-003'
    },
    {
      id: '4',
      provider: 'flutterwave',
      batchId: 'BATCH-004',
      txnId: 'FLW-2024-002',
      grossAmount: 45000,
      fee: 900,
      netAmount: 44100,
      status: 'failed',
      settlementDate: '2024-01-15 16:30:00',
      providerReference: 'FLW-REF-002',
      transactionDate: '2024-01-15 11:30:00',
      matchedLedgerTxn: undefined
    },
    {
      id: '5',
      provider: 'bank',
      batchId: 'BATCH-005',
      txnId: 'BANK-2024-001',
      grossAmount: 100000,
      fee: 0,
      netAmount: 100000,
      status: 'settled',
      settlementDate: '2024-01-15 17:00:00',
      providerReference: 'BANK-REF-001',
      transactionDate: '2024-01-15 13:00:00',
      matchedLedgerTxn: 'TXN-2024-006'
    },
    {
      id: '6',
      provider: 'manual',
      batchId: 'BATCH-006',
      txnId: 'MAN-2024-001',
      grossAmount: 15000,
      fee: 0,
      netAmount: 15000,
      status: 'settled',
      settlementDate: '2024-01-15 18:00:00',
      providerReference: 'MAN-REF-001',
      transactionDate: '2024-01-15 14:00:00',
      matchedLedgerTxn: 'TXN-2024-007'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 7}`,
      provider: ['paystack', 'flutterwave', 'bank', 'manual'][i % 4] as 'paystack' | 'flutterwave' | 'bank' | 'manual',
      batchId: `BATCH-${String(i + 7).padStart(3, '0')}`,
      txnId: `${['PAY', 'FLW', 'BANK', 'MAN'][i % 4]}-2024-${String(i + 7).padStart(3, '0')}`,
      grossAmount: 25000 + (i * 5000),
      fee: i % 4 === 2 ? 0 : 500 + (i * 100),
      netAmount: i % 4 === 2 ? 25000 + (i * 5000) : 24500 + (i * 4900),
      status: ['settled', 'pending', 'failed'][i % 3] as 'settled' | 'pending' | 'failed',
      settlementDate: `2024-01-${15 + (i % 5)} ${14 + (i % 8)}:${30 + (i % 30)}:00`,
      providerReference: `${['PAY', 'FLW', 'BANK', 'MAN'][i % 4]}-REF-${String(i + 7).padStart(3, '0')}`,
      transactionDate: `2024-01-${15 + (i % 5)} ${9 + (i % 8)}:${30 + (i % 30)}:00`,
      matchedLedgerTxn: i % 5 === 0 ? undefined : `TXN-2024-${String(i + 7).padStart(3, '0')}`
    }))
  ];

  const filteredData = useMemo(() => {
    return providerData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.txnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.providerReference.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesProvider = providerFilter === 'all' || item.provider === providerFilter;
      
      return matchesSearch && matchesStatus && matchesProvider;
    });
  }, [providerData, searchQuery, statusFilter, providerFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'settled': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'settled': return <IconCheck size={16} />;
      case 'pending': return <IconClock size={16} />;
      case 'failed': return <IconX size={16} />;
      default: return null;
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'paystack': return <IconBuildingBank size={16} />;
      case 'flutterwave': return <IconCreditCard size={16} />;
      case 'bank': return <IconTruck size={16} />;
      case 'manual': return <IconNotes size={16} />;
      default: return <IconBuildingBank size={16} />;
    }
  };

  const handleExport = () => {
    const headers = [
      'Provider',
      'Batch ID',
      'Transaction ID',
      'Gross Amount (₦)',
      'Fee (₦)',
      'Net Amount (₦)',
      'Status',
      'Settlement Date',
      'Provider Reference',
      'Transaction Date',
      'Matched Ledger Txn'
    ];

    const rows = paginatedData.map(item => [
      item.provider,
      item.batchId,
      item.txnId,
      item.grossAmount.toString(),
      item.fee.toString(),
      item.netAmount.toString(),
      item.status,
      item.settlementDate,
      item.providerReference,
      item.transactionDate,
      item.matchedLedgerTxn || 'Unmatched'
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'provider-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Provider Report Table">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search Txn ID / Batch ID / Reference..."
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
              <MenuItem value="settled">Settled</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
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
                <TableCell>Provider</TableCell>
                <TableCell>Batch ID</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell align="right">Gross (₦)</TableCell>
                <TableCell align="right">Fee (₦)</TableCell>
                <TableCell align="right">Net (₦)</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Settlement Date</TableCell>
                <TableCell>Provider Ref</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((entry) => (
                <TableRow
                  key={entry.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(entry)}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getProviderIcon(entry.provider)}
                      <Typography variant="body2" fontWeight={600}>
                        {entry.provider.charAt(0).toUpperCase() + entry.provider.slice(1)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {entry.batchId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {entry.txnId}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700} color="primary.main">
                      ₦{entry.grossAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600} color="warning.main">
                      -₦{entry.fee.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700} color="success.main">
                      ₦{entry.netAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getStatusIcon(entry.status)}
                      <Chip
                        size="small"
                        label={entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        color={getStatusColor(entry.status) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {entry.settlementDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {entry.providerReference}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {!entry.matchedLedgerTxn && (
                        <Tooltip title="Unmatched">
                          <IconX size={16} color="red" />
                        </Tooltip>
                      )}
                      <Tooltip title="View details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowClick(entry);
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} provider entries
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
            Provider Report Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Provider Amount</Typography>
              <Typography variant="caption" fontWeight={600}>
                ₦{paginatedData.reduce((sum, item) => sum + item.grossAmount, 0).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Provider Fees</Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                ₦{paginatedData.reduce((sum, item) => sum + item.fee, 0).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Net Settled</Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                ₦{paginatedData.reduce((sum, item) => sum + item.netAmount, 0).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Unmatched Entries</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {paginatedData.filter(item => !item.matchedLedgerTxn).length}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ProviderReportTable;
