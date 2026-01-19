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
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface InvoiceData {
  id: string;
  invoiceId: string;
  client: {
    name: string;
    avatar: string;
    email: string;
  };
  contract: string;
  period: string;
  amount: number;
  paid: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
}

interface InvoicesTableProps {
  onInvoiceClick: (invoice: InvoiceData) => void;
  onRowClick?: (invoice: InvoiceData) => void;
  dateRange: string;
  statusFilter: string;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ 
  onInvoiceClick, 
  onRowClick,
  dateRange, 
  statusFilter 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock data
  const mockInvoices: InvoiceData[] = [
    {
      id: '1',
      invoiceId: 'INV-2024-001',
      client: {
        name: 'Lagos Industries',
        avatar: 'LI',
        email: 'accounts@lagosindustries.com'
      },
      contract: 'Scheduled Weekly',
      period: 'Jan 2024',
      amount: 2500000,
      paid: 2500000,
      status: 'paid',
      dueDate: '2024-01-15'
    },
    {
      id: '2',
      invoiceId: 'INV-2024-002',
      client: {
        name: 'Port Harcourt Manufacturing',
        avatar: 'PH',
        email: 'billing@phmanufacturing.com'
      },
      contract: 'Scheduled Monthly',
      period: 'Jan 2024',
      amount: 3200000,
      paid: 1800000,
      status: 'pending',
      dueDate: '2024-01-20'
    },
    {
      id: '3',
      invoiceId: 'INV-2024-003',
      client: {
        name: 'Abuja Logistics Hub',
        avatar: 'AL',
        email: 'finance@abujalogistics.com'
      },
      contract: 'One-time Collections',
      period: 'Jan 2024',
      amount: 1500000,
      paid: 0,
      status: 'overdue',
      dueDate: '2024-01-10'
    },
    {
      id: '4',
      invoiceId: 'INV-2024-004',
      client: {
        name: 'Kano Food Processing',
        avatar: 'KF',
        email: 'accounts@kanofood.com'
      },
      contract: 'Disposal Only',
      period: 'Jan 2024',
      amount: 1800000,
      paid: 1800000,
      status: 'paid',
      dueDate: '2024-01-25'
    },
    {
      id: '5',
      invoiceId: 'INV-2024-005',
      client: {
        name: 'Ibadan Textiles Ltd',
        avatar: 'IT',
        email: 'billing@ibadantextiles.com'
      },
      contract: 'Recycling Only',
      period: 'Jan 2024',
      amount: 1200000,
      paid: 600000,
      status: 'pending',
      dueDate: '2024-01-30'
    },
    {
      id: '6',
      invoiceId: 'INV-2024-006',
      client: {
        name: 'Lagos Industries',
        avatar: 'LI',
        email: 'accounts@lagosindustries.com'
      },
      contract: 'Scheduled Weekly',
      period: 'Dec 2023',
      amount: 2300000,
      paid: 2300000,
      status: 'paid',
      dueDate: '2023-12-15'
    },
    {
      id: '7',
      invoiceId: 'INV-2024-007',
      client: {
        name: 'Port Harcourt Manufacturing',
        avatar: 'PH',
        email: 'billing@phmanufacturing.com'
      },
      contract: 'Scheduled Monthly',
      period: 'Dec 2023',
      amount: 3100000,
      paid: 3100000,
      status: 'paid',
      dueDate: '2023-12-20'
    },
    {
      id: '8',
      invoiceId: 'INV-2024-008',
      client: {
        name: 'Abuja Logistics Hub',
        avatar: 'AL',
        email: 'finance@abujalogistics.com'
      },
      contract: 'One-time Collections',
      period: 'Dec 2023',
      amount: 950000,
      paid: 950000,
      status: 'paid',
      dueDate: '2023-12-10'
    }
  ];

  // Filter invoices based on search and status
  const filteredInvoices = useMemo(() => {
    return mockInvoices.filter(invoice => {
      const matchesSearch = 
        invoice.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.contract.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [mockInvoices, searchQuery, statusFilter]);

  // Paginate invoices
  const paginatedInvoices = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredInvoices.slice(startIndex, endIndex);
  }, [filteredInvoices, page, rowsPerPage]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleExport = () => {
    // CSV export functionality
    const headers = ["Invoice ID", "Client", "Contract", "Period", "Amount", "Paid", "Status", "Due Date"];
    const rows = filteredInvoices.map(invoice => [
      invoice.invoiceId,
      invoice.client.name,
      invoice.contract,
      invoice.period,
      `₦${invoice.amount.toLocaleString()}`,
      `₦${invoice.paid.toLocaleString()}`,
      getStatusLabel(invoice.status),
      invoice.dueDate
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "b2b-invoices.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard 
      title="Invoices & Payments"
      action={
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconDownload size={16} />}
            onClick={handleExport}
          >
            Export CSV
          </Button>
        </Stack>
      }
    >
      {/* Search and Filters */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Search client or invoice ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1 }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setPage(1)} // Reset to first page when filter changes
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="overdue">Overdue</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {/* Table */}
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer sx={{ minWidth: 900 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120 }}>Invoice ID</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Client</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Contract</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Period</TableCell>
                <TableCell sx={{ minWidth: 120 }} align="right">Amount (₦)</TableCell>
                <TableCell sx={{ minWidth: 120 }} align="right">Paid (₦)</TableCell>
                <TableCell sx={{ minWidth: 100 }} align="center">Status</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Due Date</TableCell>
                <TableCell sx={{ minWidth: 80 }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInvoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onInvoiceClick(invoice)}
                >
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                      {invoice.invoiceId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: 'primary.main',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {invoice.client.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {invoice.client.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {invoice.client.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {invoice.contract}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {invoice.period}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      ₦{invoice.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      variant="body2" 
                      fontWeight={600}
                      color={invoice.paid === invoice.amount ? 'success.main' : 'warning.main'}
                    >
                      ₦{invoice.paid.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={getStatusLabel(invoice.status)}
                      color={getStatusColor(invoice.status) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onRowClick) {
                            onRowClick(invoice);
                          } else {
                            onInvoiceClick(invoice);
                          }
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
      </Box>

      {/* Pagination */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredInvoices.length)} of {filteredInvoices.length} invoices
        </Typography>
        
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 60 }}>
            <Select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          
          <Pagination
            count={Math.ceil(filteredInvoices.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            showFirstButton
            showLastButton
            size="small"
          />
        </Stack>
      </Stack>
    </DashboardCard>
  );
};

export default InvoicesTable;
