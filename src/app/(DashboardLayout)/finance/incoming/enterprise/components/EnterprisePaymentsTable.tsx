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
  IconBuilding,
  IconCalendar,
  IconFileText
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface PaymentData {
  id: string;
  date: string;
  client: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
  invoiceId: string;
  contract: string;
  contractType: 'one-time' | 'scheduled' | 'recycling' | 'disposal';
  amount: number;
  paid: number;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
  dueDate: string;
  location: string;
  providerRef: string;
}

interface EnterprisePaymentsTableProps {
  onRowClick: (payment: PaymentData) => void;
}

const EnterprisePaymentsTable: React.FC<EnterprisePaymentsTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [contractFilter, setContractFilter] = useState('all');

  // Mock data
  const mockPayments: PaymentData[] = [
    {
      id: '1',
      date: '2024-01-15',
      client: {
        name: 'Nigerian Bottling Company',
        avatar: 'NBC',
        email: 'finance@nigerianbottling.com',
        phone: '+234-1-234-5678'
      },
      invoiceId: 'INV-2024-0142',
      contract: 'Scheduled Weekly Collection',
      contractType: 'scheduled',
      amount: 8500000,
      paid: 8500000,
      status: 'paid',
      dueDate: '2024-01-10',
      location: 'Lagos Mainland',
      providerRef: 'BANK-123456789'
    },
    {
      id: '2',
      date: '2024-01-14',
      client: {
        name: 'Lagos State Government',
        avatar: 'LSG',
        email: 'accounts@lagosstate.gov.ng',
        phone: '+234-1-345-6789'
      },
      invoiceId: 'INV-2024-0143',
      contract: 'Bulk Recycling Services',
      contractType: 'recycling',
      amount: 12000000,
      paid: 8000000,
      status: 'partial',
      dueDate: '2024-01-12',
      location: 'Lagos Island',
      providerRef: 'BANK-987654321'
    },
    {
      id: '3',
      date: '2024-01-13',
      client: {
        name: 'Shoprite Nigeria',
        avatar: 'SRN',
        email: 'payments@shoprite.ng',
        phone: '+234-1-456-7890'
      },
      invoiceId: 'INV-2024-0144',
      contract: 'One-time Collection',
      contractType: 'one-time',
      amount: 3500000,
      paid: 0,
      status: 'pending',
      dueDate: '2024-01-20',
      location: 'Abuja',
      providerRef: 'BANK-456789123'
    },
    {
      id: '4',
      date: '2024-01-12',
      client: {
        name: 'Dangote Group',
        avatar: 'DNG',
        email: 'finance@dangote.com',
        phone: '+234-1-567-8901'
      },
      invoiceId: 'INV-2024-0145',
      contract: 'Disposal Services',
      contractType: 'disposal',
      amount: 5500000,
      paid: 0,
      status: 'overdue',
      dueDate: '2024-01-05',
      location: 'Port Harcourt',
      providerRef: 'BANK-789123456'
    },
    {
      id: '5',
      date: '2024-01-11',
      client: {
        name: 'Unilever Nigeria',
        avatar: 'UNL',
        email: 'accounts@unilever.ng',
        phone: '+234-1-678-9012'
      },
      invoiceId: 'INV-2024-0146',
      contract: 'Scheduled Monthly Collection',
      contractType: 'scheduled',
      amount: 7500000,
      paid: 7500000,
      status: 'paid',
      dueDate: '2024-01-08',
      location: 'Lagos Mainland',
      providerRef: 'BANK-321654987'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      date: `2024-01-${11 - (i % 10)}`,
      client: {
        name: `Enterprise Client ${i + 6}`,
        avatar: `EC${i + 6}`,
        email: `client${i + 6}@enterprise.com`,
        phone: `+234-1-${100 + i}-${200 + i}`
      },
      invoiceId: `INV-2024-${1400 + i + 6}`,
      contract: ['Scheduled Weekly Collection', 'Bulk Recycling Services', 'One-time Collection', 'Disposal Services'][i % 4],
      contractType: ['scheduled', 'recycling', 'one-time', 'disposal'][i % 4] as 'one-time' | 'scheduled' | 'recycling' | 'disposal',
      amount: 3000000 + (i * 500000),
      paid: Math.floor((3000000 + (i * 500000)) * (Math.random() * 1.2)),
      status: ['paid', 'partial', 'pending', 'overdue'][i % 4] as 'paid' | 'partial' | 'pending' | 'overdue',
      dueDate: `2024-01-${15 - (i % 20)}`,
      location: ['Lagos Mainland', 'Lagos Island', 'Abuja', 'Port Harcourt'][i % 4],
      providerRef: `BANK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    }))
  ];

  const filteredPayments = useMemo(() => {
    return mockPayments.filter(payment => {
      const matchesSearch = searchQuery === '' || 
        payment.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.contract.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      const matchesContract = contractFilter === 'all' || payment.contractType === contractFilter;
      
      return matchesSearch && matchesStatus && matchesContract;
    });
  }, [mockPayments, searchQuery, statusFilter, contractFilter]);

  const paginatedPayments = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredPayments.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredPayments, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'partial': return 'warning';
      case 'pending': return 'info';
      case 'overdue': return 'error';
      default: return 'default';
    }
  };

  const getContractTypeColor = (type: string) => {
    switch (type) {
      case 'scheduled': return 'primary';
      case 'recycling': return 'success';
      case 'one-time': return 'warning';
      case 'disposal': return 'info';
      default: return 'default';
    }
  };

  const handleExport = () => {
    const headers = [
      'Date',
      'Client',
      'Invoice ID',
      'Contract',
      'Amount (₦)',
      'Paid (₦)',
      'Status',
      'Due Date'
    ];

    const rows = paginatedPayments.map(item => [
      item.date,
      item.client.name,
      item.invoiceId,
      item.contract,
      item.amount.toString(),
      item.paid.toString(),
      item.status,
      item.dueDate
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'enterprise-payments.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Enterprise Payments">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search client, invoice ID, or contract..."
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
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="partial">Partial</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="overdue">Overdue</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Contract Type</InputLabel>
            <Select
              value={contractFilter}
              label="Contract Type"
              onChange={(e) => setContractFilter(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
              <MenuItem value="recycling">Recycling</MenuItem>
              <MenuItem value="one-time">One-time</MenuItem>
              <MenuItem value="disposal">Disposal</MenuItem>
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
                <TableCell>Client</TableCell>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Contract</TableCell>
                <TableCell align="right">Amount (₦)</TableCell>
                <TableCell align="right">Paid (₦)</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Due Date</TableCell>
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
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {payment.client.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {payment.client.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {payment.client.phone}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                      {payment.invoiceId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        {payment.contract}
                      </Typography>
                      <Chip
                        size="small"
                        label={payment.contractType}
                        color={getContractTypeColor(payment.contractType) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      ₦{payment.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      ₦{payment.paid.toLocaleString()}
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
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(payment.dueDate).toLocaleDateString()}
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

export default EnterprisePaymentsTable;
