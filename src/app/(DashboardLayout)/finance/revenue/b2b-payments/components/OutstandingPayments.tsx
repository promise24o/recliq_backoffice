'use client'
import React, { useState } from 'react';
import { 
  TableContainer, 
  Table, 
  TableRow, 
  TableCell, 
  TableBody, 
  Avatar, 
  Typography, 
  TableHead, 
  Chip, 
  Box, 
  Grid, 
  MenuItem, 
  Button, 
  Divider, 
  IconButton, 
  LinearProgress,
  Stack,
  Card,
  CardContent
} from '@mui/material';
import { 
  IconClock,
  IconAlertTriangle,
  IconMail,
  IconPhone,
  IconEye,
  IconCalendar,
  IconTrendingUp,
  IconDownload
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface OutstandingPayment {
  id: string;
  invoiceId: string;
  client: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
  amount: number;
  dueDate: string;
  daysOverdue: number;
  status: 'pending' | 'overdue' | 'critical';
  lastReminder: string;
  escalationLevel: number;
}

const OutstandingPayments: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'overdue' | 'critical'>('all');

  const outstandingPayments: OutstandingPayment[] = [
    {
      id: '1',
      invoiceId: 'INV-2024-003',
      client: {
        name: 'Abuja Logistics Hub',
        avatar: 'AL',
        email: 'finance@abujalogistics.com',
        phone: '+234 809 123 4567'
      },
      amount: 1500000,
      dueDate: '2024-01-10',
      daysOverdue: 25,
      status: 'critical',
      lastReminder: '2024-01-20',
      escalationLevel: 3
    },
    {
      id: '2',
      invoiceId: 'INV-2024-002',
      client: {
        name: 'Port Harcourt Manufacturing',
        avatar: 'PH',
        email: 'billing@phmanufacturing.com',
        phone: '+234 803 987 6543'
      },
      amount: 1400000,
      dueDate: '2024-01-20',
      daysOverdue: 15,
      status: 'overdue',
      lastReminder: '2024-01-25',
      escalationLevel: 2
    },
    {
      id: '3',
      invoiceId: 'INV-2024-005',
      client: {
        name: 'Ibadan Textiles Ltd',
        avatar: 'IT',
        email: 'billing@ibadantextiles.com',
        phone: '+234 805 456 7890'
      },
      amount: 600000,
      dueDate: '2024-01-30',
      daysOverdue: 5,
      status: 'overdue',
      lastReminder: '2024-01-28',
      escalationLevel: 1
    },
    {
      id: '4',
      invoiceId: 'INV-2024-008',
      client: {
        name: 'Kano Food Processing',
        avatar: 'KF',
        email: 'accounts@kanofood.com',
        phone: '+234 806 234 5678'
      },
      amount: 800000,
      dueDate: '2024-02-05',
      daysOverdue: 0,
      status: 'pending',
      lastReminder: '2024-01-30',
      escalationLevel: 0
    },
    {
      id: '5',
      invoiceId: 'INV-2024-009',
      client: {
        name: 'Lagos Industries',
        avatar: 'LI',
        email: 'accounts@lagosindustries.com',
        phone: '+234 802 345 6789'
      },
      amount: 2000000,
      dueDate: '2024-02-10',
      daysOverdue: 0,
      status: 'pending',
      lastReminder: 'Never',
      escalationLevel: 0
    }
  ];

  const filteredPayments = outstandingPayments.filter(payment => {
    if (selectedFilter === 'all') return true;
    return payment.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'error';
      case 'overdue': return 'warning';
      case 'pending': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getEscalationColor = (level: number) => {
    if (level >= 3) return 'error';
    if (level >= 2) return 'warning';
    if (level >= 1) return 'info';
    return 'success';
  };

  const totalOutstanding = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const criticalAmount = filteredPayments.filter(p => p.status === 'critical').reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = filteredPayments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  const handleExport = () => {
    const headers = ["Invoice ID", "Client", "Email", "Phone", "Amount (₦)", "Due Date", "Days Overdue", "Status", "Last Reminder", "Escalation Level"];
    const rows = filteredPayments.map(payment => [
      payment.invoiceId,
      payment.client.name,
      payment.client.email,
      payment.client.phone,
      `₦${payment.amount.toLocaleString()}`,
      new Date(payment.dueDate).toLocaleDateString(),
      payment.daysOverdue.toString(),
      getStatusLabel(payment.status),
      payment.lastReminder,
      payment.escalationLevel.toString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "outstanding-payments.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard 
      title="Outstanding & Overdue Payments"
      action={
        <Stack direction="row" spacing={1}>
          <Button
            variant={selectedFilter === 'all' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setSelectedFilter('all')}
          >
            All ({filteredPayments.length})
          </Button>
          <Button
            variant={selectedFilter === 'overdue' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setSelectedFilter('overdue')}
          >
            Overdue ({filteredPayments.filter(p => p.status === 'overdue').length})
          </Button>
          <Button
            variant={selectedFilter === 'critical' ? 'contained' : 'outlined'}
            size="small"
            color="error"
            onClick={() => setSelectedFilter('critical')}
          >
            Critical ({filteredPayments.filter(p => p.status === 'critical').length})
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconDownload size={16} />}
            onClick={handleExport}
          >
            Export
          </Button>
        </Stack>
      }
    >
      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconClock size={20} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    ₦{totalOutstanding.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Outstanding
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined" sx={{ bgcolor: 'warning.light' }}>
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'warning.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconAlertTriangle size={20} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700} color="warning.dark">
                    ₦{overdueAmount.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Overdue Amount
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined" sx={{ bgcolor: 'error.light' }}>
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'error.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconTrendingUp size={20} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700} color="error.dark">
                    ₦{criticalAmount.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Critical Amount
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table */}
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer sx={{ minWidth: 1200 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120 }}>Invoice ID</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Client</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Contact</TableCell>
                <TableCell sx={{ minWidth: 120 }} align="right">Amount (₦)</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Due Date</TableCell>
                <TableCell sx={{ minWidth: 100 }} align="center">Days Overdue</TableCell>
                <TableCell sx={{ minWidth: 100 }} align="center">Status</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Last Reminder</TableCell>
                <TableCell sx={{ minWidth: 120 }} align="center">Escalation</TableCell>
                <TableCell sx={{ minWidth: 120 }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow
                  key={payment.id}
                  hover
                  sx={{
                    borderLeft: `3px solid`,
                    borderLeftColor: `${getStatusColor(payment.status)}.main`,
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                      {payment.invoiceId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: 'primary.main',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {payment.client.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {payment.client.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {payment.client.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {payment.client.phone}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      ₦{payment.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography 
                      variant="body2" 
                      color={payment.daysOverdue > 0 ? 'error.main' : 'text.secondary'}
                      fontWeight={600}
                    >
                      {payment.daysOverdue > 0 ? `${payment.daysOverdue}` : 'Due'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={getStatusLabel(payment.status)}
                      color={getStatusColor(payment.status) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {payment.lastReminder}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack spacing={1} alignItems="center">
                      <Typography variant="body2" fontWeight={600}>
                        Level {payment.escalationLevel}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(payment.escalationLevel / 3) * 100}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          width: 60,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getEscalationColor(payment.escalationLevel),
                          },
                        }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton size="small">
                        <IconMail size={16} />
                      </IconButton>
                      <IconButton size="small">
                        <IconPhone size={16} />
                      </IconButton>
                      <IconButton size="small">
                        <IconEye size={16} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Summary Footer */}
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Showing {filteredPayments.length} outstanding payments • Total: ₦{totalOutstanding.toLocaleString()}
        </Typography>
      </Box>
    </DashboardCard>
  );
};

export default OutstandingPayments;
