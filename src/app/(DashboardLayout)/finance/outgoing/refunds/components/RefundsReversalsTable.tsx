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
  IconArrowBackUp,
  IconRefresh,
  IconUser,
  IconBuilding,
  IconPackage,
  IconFileText
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface RefundData {
  id: string;
  date: string;
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
  reason: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  providerReference: string;
  initiatedAt: string;
  completedAt?: string;
}

interface RefundsReversalsTableProps {
  onRowClick: (refund: RefundData) => void;
}

const RefundsReversalsTable: React.FC<RefundsReversalsTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  // Mock data
  const mockRefunds: RefundData[] = [
    {
      id: '1',
      date: '2024-01-15',
      referenceId: 'REF-2024-0001',
      originalTransaction: {
        id: 'TXN-2024-0147',
        type: 'user_payment',
        user: {
          name: 'John Doe',
          email: 'john.doe@email.com'
        },
        pickupId: 'PCK-2024-0147'
      },
      amount: 25000,
      type: 'refund',
      reason: 'Pickup failed',
      status: 'completed',
      providerReference: 'PROV-REF-001',
      initiatedAt: '2024-01-15 09:30:00',
      completedAt: '2024-01-15 10:15:00'
    },
    {
      id: '2',
      date: '2024-01-15',
      referenceId: 'REV-2024-0002',
      originalTransaction: {
        id: 'TXN-2024-0148',
        type: 'enterprise_payment',
        enterprise: {
          name: 'Tech Corp Ltd',
          email: 'billing@techcorp.com'
        },
        invoiceId: 'INV-2024-0148'
      },
      amount: 75000,
      type: 'reversal',
      reason: 'Duplicate payment',
      status: 'completed',
      providerReference: 'PROV-REV-002',
      initiatedAt: '2024-01-15 10:30:00',
      completedAt: '2024-01-15 11:00:00'
    },
    {
      id: '3',
      date: '2024-01-14',
      referenceId: 'REF-2024-0003',
      originalTransaction: {
        id: 'TXN-2024-0149',
        type: 'user_payment',
        user: {
          name: 'Sarah Williams',
          email: 'sarah.williams@email.com'
        },
        pickupId: 'PCK-2024-0149'
      },
      amount: 35000,
      type: 'refund',
      reason: 'Dispute resolved',
      status: 'processing',
      providerReference: 'PROV-REF-003',
      initiatedAt: '2024-01-14 14:20:00'
    },
    {
      id: '4',
      date: '2024-01-14',
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
      reason: 'Service not delivered',
      status: 'failed',
      providerReference: 'PROV-REF-004',
      initiatedAt: '2024-01-14 16:45:00'
    },
    {
      id: '5',
      date: '2024-01-13',
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
      reason: 'System error',
      status: 'pending',
      providerReference: 'PROV-REV-005',
      initiatedAt: '2024-01-13 11:30:00'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      date: `2024-01-${12 - (i % 10)}`,
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
      reason: ['Pickup failed', 'Duplicate payment', 'Dispute resolved', 'System error', 'Service not delivered'][i % 5],
      status: ['pending', 'processing', 'completed', 'failed'][i % 4] as 'pending' | 'processing' | 'completed' | 'failed',
      providerReference: `PROV-${['REF', 'REV'][i % 2]}-${(i + 6).toString().padStart(3, '0')}`,
      initiatedAt: `2024-01-${12 - (i % 10)} ${9 + (i % 8)}:${30 + (i % 30)}:00`,
      completedAt: i % 4 === 2 ? `2024-01-${12 - (i % 10)} ${10 + (i % 8)}:${30 + (i % 30)}:00` : undefined
    }))
  ];

  const filteredRefunds = useMemo(() => {
    return mockRefunds.filter(refund => {
      const matchesSearch = searchQuery === '' || 
        refund.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        refund.originalTransaction.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === 'all' || refund.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || refund.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || refund.originalTransaction.type === sourceFilter;
      
      return matchesSearch && matchesType && matchesStatus && matchesSource;
    });
  }, [mockRefunds, searchQuery, typeFilter, statusFilter, sourceFilter]);

  const paginatedRefunds = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredRefunds.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredRefunds, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredRefunds.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'failed': return 'error';
      default: return 'default';
    }
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

  const handleExport = () => {
    const headers = [
      'Date',
      'Reference ID',
      'Original Transaction',
      'Source',
      'Amount (₦)',
      'Type',
      'Reason',
      'Status'
    ];

    const rows = paginatedRefunds.map(item => [
      item.date,
      item.referenceId,
      item.originalTransaction.id,
      item.originalTransaction.type.replace('_', ' '),
      item.amount.toString(),
      item.type,
      item.reason,
      item.status
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'refunds-reversals.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Refunds & Reversals">
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

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
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
              <MenuItem value="user_payment">User Payment</MenuItem>
              <MenuItem value="enterprise_payment">Enterprise Payment</MenuItem>
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
                <TableCell>Reference ID</TableCell>
                <TableCell>Original Transaction</TableCell>
                <TableCell>Source</TableCell>
                <TableCell align="right">Amount (₦)</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRefunds.map((refund) => (
                <TableRow
                  key={refund.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(refund)}
                >
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(refund.date).toLocaleDateString()}
                    </Typography>
                  </TableCell>
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
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {refund.reason}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                      color={getStatusColor(refund.status) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="View details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowClick(refund);
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredRefunds.length)} of {filteredRefunds.length} refunds & reversals
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

export default RefundsReversalsTable;
