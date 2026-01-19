'use client'
import React from 'react';
import { Box, Typography, Stack, Chip, Button, Card, CardContent, Avatar, IconButton, Tooltip, Grid } from '@mui/material';
import { 
  IconAlertTriangle, 
  IconClock,
  IconRefresh,
  IconEye,
  IconArrowRight,
  IconBuilding,
  IconCurrencyNaira,
  IconCalendar,
  IconMail,
  IconPhone
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface OverduePayment {
  id: string;
  client: {
    name: string;
    avatar: string;
    phone: string;
  };
  invoiceId: string;
  amount: number;
  daysOverdue: number;
  lastReminder: string;
  escalationStatus: 'none' | 'warning' | 'critical' | 'legal';
  action: string;
}

const OverdueEscalation: React.FC = () => {
  const overduePayments: OverduePayment[] = [
    {
      id: '1',
      client: {
        name: 'Dangote Group',
        avatar: 'DNG',
        phone: '+234-1-567-8901'
      },
      invoiceId: 'INV-2024-0145',
      amount: 5500000,
      daysOverdue: 15,
      lastReminder: '3 days ago',
      escalationStatus: 'critical',
      action: 'Escalate'
    },
    {
      id: '2',
      client: {
        name: 'Shoprite Nigeria',
        avatar: 'SRN',
        phone: '+234-1-456-7890'
      },
      invoiceId: 'INV-2024-0147',
      amount: 3200000,
      daysOverdue: 8,
      lastReminder: '2 days ago',
      escalationStatus: 'warning',
      action: 'Send Reminder'
    },
    {
      id: '3',
      client: {
        name: 'Unilever Nigeria',
        avatar: 'UNL',
        phone: '+234-1-678-9012'
      },
      invoiceId: 'INV-2024-0148',
      amount: 2800000,
      daysOverdue: 25,
      lastReminder: '1 week ago',
      escalationStatus: 'legal',
      action: 'Legal Notice'
    },
    {
      id: '4',
      client: {
        name: 'Nestle Nigeria',
        avatar: 'NNG',
        phone: '+234-1-789-0123'
      },
      invoiceId: 'INV-2024-0149',
      amount: 4500000,
      daysOverdue: 5,
      lastReminder: '1 day ago',
      escalationStatus: 'warning',
      action: 'Call Client'
    },
    {
      id: '5',
      client: {
        name: 'Coca-Cola Nigeria',
        avatar: 'CCN',
        phone: '+234-1-890-1234'
      },
      invoiceId: 'INV-2024-0150',
      amount: 6800000,
      daysOverdue: 12,
      lastReminder: '4 days ago',
      escalationStatus: 'critical',
      action: 'Escalate'
    },
    {
      id: '6',
      client: {
        name: 'PZ Wilmar',
        avatar: 'PZW',
        phone: '+234-1-901-2345'
      },
      invoiceId: 'INV-2024-0151',
      amount: 2100000,
      daysOverdue: 3,
      lastReminder: 'Today',
      escalationStatus: 'none',
      action: 'Monitor'
    }
  ];

  const getEscalationColor = (status: string) => {
    switch (status) {
      case 'legal': return 'error';
      case 'critical': return 'error';
      case 'warning': return 'warning';
      case 'none': return 'success';
      default: return 'default';
    }
  };

  const getEscalationIcon = (status: string) => {
    switch (status) {
      case 'legal': return <IconAlertTriangle size={16} />;
      case 'critical': return <IconAlertTriangle size={16} />;
      case 'warning': return <IconClock size={16} />;
      case 'none': return <IconClock size={16} />;
      default: return null;
    }
  };

  const getDaysOverdueColor = (days: number) => {
    if (days >= 20) return 'error';
    if (days >= 10) return 'warning';
    if (days >= 5) return 'info';
    return 'success';
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Legal Notice': return 'error';
      case 'Escalate': return 'error';
      case 'Send Reminder': return 'warning';
      case 'Call Client': return 'info';
      case 'Monitor': return 'success';
      default: return 'primary';
    }
  };

  return (
    <DashboardCard title="Overdue & Escalation">
      <Grid container spacing={2}>
        {overduePayments.map((payment) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={payment.id}>
            <Card
              variant="outlined"
              sx={{
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                borderLeft: `3px solid`,
                borderLeftColor: `${getEscalationColor(payment.escalationStatus)}.main`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent sx={{ py: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={1.5} sx={{ flex: 1 }}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '8px',
                          bgcolor: `${getEscalationColor(payment.escalationStatus)}.light`,
                          color: `${getEscalationColor(payment.escalationStatus)}.main`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {getEscalationIcon(payment.escalationStatus)}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle2" fontWeight={700} noWrap>
                          {payment.invoiceId}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {payment.escalationStatus.charAt(0).toUpperCase() + payment.escalationStatus.slice(1)}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
                      <Chip
                        size="small"
                        label={`${payment.daysOverdue} days`}
                        color={getDaysOverdueColor(payment.daysOverdue) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </Stack>

                  {/* Client and Amount */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {payment.client.avatar}
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>
                        {payment.client.name}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={700} color="error.main">
                      ₦{payment.amount.toLocaleString()}
                    </Typography>
                  </Stack>

                  {/* Contact and Reminder Info */}
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconPhone size={14} color="text.secondary" />
                      <Typography variant="caption" color="text.secondary">
                        {payment.client.phone}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconCalendar size={14} color="text.secondary" />
                      <Typography variant="caption" color="text.secondary">
                        Last reminder: {payment.lastReminder}
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Footer */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {payment.escalationStatus === 'legal' && (
                        <Tooltip title="Legal action required">
                          <IconAlertTriangle size={14} color="red" />
                        </Tooltip>
                      )}
                      {payment.escalationStatus === 'critical' && (
                        <Tooltip title="Critical escalation">
                          <IconAlertTriangle size={14} color="orange" />
                        </Tooltip>
                      )}
                      {payment.escalationStatus === 'warning' && (
                        <Tooltip title="Warning level">
                          <IconClock size={14} color="orange" />
                        </Tooltip>
                      )}
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Tooltip title="View details">
                        <IconButton size="small">
                          <IconEye size={16} />
                        </IconButton>
                      </Tooltip>
                      {payment.action === 'Send Reminder' && (
                        <Tooltip title="Send email reminder">
                          <IconButton size="small">
                            <IconMail size={16} />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography
                          variant="caption"
                          color={getActionColor(payment.action) + '.main' as any}
                          fontWeight={600}
                        >
                          {payment.action}
                        </Typography>
                        <IconArrowRight size={14} />
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Summary */}
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, mt: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Overdue Payments Summary
        </Typography>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Total Overdue</Typography>
            <Typography variant="caption" fontWeight={600}>{overduePayments.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Critical Escalation</Typography>
            <Typography variant="caption" fontWeight={600} color="error.main">
              {overduePayments.filter(p => p.escalationStatus === 'critical').length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Legal Action Required</Typography>
            <Typography variant="caption" fontWeight={600} color="error.main">
              {overduePayments.filter(p => p.escalationStatus === 'legal').length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Total Outstanding</Typography>
            <Typography variant="caption" fontWeight={600} color="error.main">
              ₦{overduePayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Avg Days Overdue</Typography>
            <Typography variant="caption" fontWeight={600}>
              {Math.round(overduePayments.reduce((sum, p) => sum + p.daysOverdue, 0) / overduePayments.length)} days
            </Typography>
          </Box>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default OverdueEscalation;
