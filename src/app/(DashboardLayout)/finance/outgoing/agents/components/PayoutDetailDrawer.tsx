'use client'
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  Button,
  IconButton,
  Grid,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import {
  IconX,
  IconCheck,
  IconClock,
  IconX as IconFailed,
  IconRefresh,
  IconDownload,
  IconMail,
  IconPrinter,
  IconEye,
  IconAlertTriangle,
  IconCurrencyNaira,
  IconBuildingBank,
  IconWallet,
  IconCash,
  IconUser,
  IconBuilding,
  IconPackage,
  IconFileText,
  IconCalendar
} from '@tabler/icons-react';

interface AgentData {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  bankName: string;
  accountNumber: string;
  jobType: 'enterprise' | 'disposal' | 'subscription';
  jobsCompleted: number;
  grossAmount: number;
  platformFee: number;
  netPayable: number;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'held';
}

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

interface PayoutDetailDrawerProps {
  agent: AgentData | null;
  transaction: PayoutTransaction | null;
  drawerType: 'agent' | 'transaction';
  open: boolean;
  onClose: () => void;
}

const PayoutDetailDrawer: React.FC<PayoutDetailDrawerProps> = ({
  agent,
  transaction,
  drawerType,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'failed': return 'error';
      case 'reversed': return 'warning';
      case 'held': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <IconCheck size={16} />;
      case 'pending': return <IconClock size={16} />;
      case 'processing': return <IconClock size={16} />;
      case 'failed': return <IconFailed size={16} />;
      case 'reversed': return <IconRefresh size={16} />;
      case 'held': return <IconAlertTriangle size={16} />;
      default: return null;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer': return <IconBuildingBank size={20} />;
      case 'wallet': return <IconWallet size={20} />;
      case 'cash': return <IconCash size={20} />;
      default: return null;
    }
  };

  const getJobTypeIcon = (type: string) => {
    switch (type) {
      case 'enterprise': return <IconBuilding size={20} />;
      case 'disposal': return <IconPackage size={20} />;
      case 'subscription': return <IconCalendar size={20} />;
      default: return null;
    }
  };

  const getTimelineColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'failed': return 'error';
      case 'reversed': return 'warning';
      case 'held': return 'error';
      default: return 'grey';
    }
  };

  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length <= 4) return accountNumber;
    return accountNumber.slice(0, 2) + '*'.repeat(accountNumber.length - 4) + accountNumber.slice(-2);
  };

  if (!open) return null;

  const isAgentView = drawerType === 'agent' && agent;
  const isTransactionView = drawerType === 'transaction' && transaction;

  // Mock timeline data based on status
  const getTimelineEvents = () => {
    if (isAgentView) {
      return [
        {
          title: 'Jobs Completed',
          time: '2 hours ago',
          status: 'success',
          description: `${agent.jobsCompleted} jobs processed successfully`
        },
        {
          title: 'Payout Calculated',
          time: '1 hour ago',
          status: 'success',
          description: `Net payable: ₦${agent.netPayable.toLocaleString()}`
        },
        {
          title: 'Ready for Payout',
          time: '30 mins ago',
          status: agent.status === 'paid' ? 'success' : agent.status === 'failed' ? 'error' : 'pending',
          description: agent.status === 'paid' ? 'Payout completed' : agent.status === 'failed' ? 'Payout failed' : 'Awaiting approval'
        }
      ];
    } else if (isTransactionView) {
      return [
        {
          title: 'Payout Initiated',
          time: new Date(transaction.date).toLocaleTimeString(),
          status: 'success',
          description: 'Payment request sent to provider'
        },
        {
          title: 'Processing',
          time: new Date(transaction.date).toLocaleTimeString(),
          status: transaction.status === 'failed' ? 'error' : 'success',
          description: transaction.status === 'failed' ? 'Processing failed' : 'Payment processing'
        },
        {
          title: 'Settlement',
          time: transaction.status === 'paid' ? new Date(transaction.date).toLocaleTimeString() : 'Pending',
          status: transaction.status === 'paid' ? 'success' : transaction.status === 'failed' ? 'error' : 'pending',
          description: transaction.status === 'paid' ? 'Payment settled successfully' : transaction.status === 'failed' ? 'Settlement failed' : 'Awaiting settlement'
        }
      ];
    }
    return [];
  };

  const timelineEvents = getTimelineEvents();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500, md: 600 },
          p: 0,
        }
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'grey.50'
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {isAgentView ? 'Agent Payout Details' : 'Payout Transaction Details'}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="monospace">
              {isAgentView ? `Agent ID: AG-${agent?.id}` : transaction?.payoutId}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <IconX size={20} />
          </IconButton>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
        <Stack spacing={3}>
          {/* Status */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Status
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                icon={getStatusIcon(isAgentView ? agent?.status || 'pending' : transaction?.status || 'processing')}
                label={(isAgentView ? agent?.status : transaction?.status)?.charAt(0).toUpperCase() + (isAgentView ? agent?.status : transaction?.status)?.slice(1) || 'Unknown'}
                color={getStatusColor(isAgentView ? agent?.status || 'pending' : transaction?.status || 'processing') as any}
                variant="outlined"
              />
              {isAgentView && (
                <Typography variant="body2" color="text.secondary">
                  {agent?.jobsCompleted || 0} jobs completed
                </Typography>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Agent/Payer Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              {isAgentView ? 'Agent Information' : 'Agent Information'}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'primary.main',
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                {isAgentView ? agent?.avatar : transaction?.agent.avatar}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight={600}>
                  {isAgentView ? agent?.name : transaction?.agent.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isAgentView ? agent?.email : 'agent@email.com'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isAgentView ? agent?.phone : '+234-801-234-5678'}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Financial Breakdown */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Financial Breakdown
            </Typography>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Gross Amount
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      ₦{isAgentView ? agent?.grossAmount.toLocaleString() : transaction?.amount.toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Platform Fee
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      ₦{isAgentView ? agent?.platformFee.toLocaleString() : Math.floor((transaction?.amount || 0) * 0.1).toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Net Payout
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="primary.main">
                      ₦{isAgentView ? agent?.netPayable.toLocaleString() : Math.floor((transaction?.amount || 0) * 0.9).toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      {isTransactionView ? 'Method' : 'Bank Details'}
                    </Typography>
                    {isTransactionView ? (
                      <Stack direction="row" spacing={1} alignItems="center">
                        {getMethodIcon(transaction?.method || '')}
                        <Typography variant="body2" fontWeight={600}>
                          {transaction?.method.replace('_', ' ')}
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography variant="body2" fontWeight={600}>
                        {agent?.bankName} • {maskAccountNumber(agent?.accountNumber || '')}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Work Covered */}
          {isAgentView && (
            <>
              <Box>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Work Covered
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {getJobTypeIcon(agent?.jobType || '')}
                    <Typography variant="body2" fontWeight={600}>
                      {agent?.jobType.charAt(0).toUpperCase() + agent?.jobType.slice(1)} Jobs
                    </Typography>
                  </Stack>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Job IDs
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace">
                      PU-2024-0142, PU-2024-0143, PU-2024-0144, PU-2024-0145, PU-2024-0146
                    </Typography>
                  </Stack>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Clients
                    </Typography>
                    <Typography variant="body2">
                      Nigerian Bottling Company, Shoprite Nigeria, Dangote Group
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Divider />
            </>
          )}

          {/* Status Timeline */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Status Timeline
            </Typography>
            <Timeline>
              {timelineEvents.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={getTimelineColor(event.status) as any}>
                      {event.status === 'success' && <IconCheck size={16} />}
                      {event.status === 'error' && <IconFailed size={16} />}
                      {event.status === 'pending' && <IconClock size={16} />}
                      {event.status === 'info' && <IconClock size={16} />}
                    </TimelineDot>
                    {index < timelineEvents.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="body2" fontWeight={600}>
                      {event.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {event.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>

          <Divider />

          {/* Actions */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Actions
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<IconDownload size={16} />}
                  size="small"
                >
                  Download Receipt
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconMail size={16} />}
                  size="small"
                >
                  Send to Agent
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconPrinter size={16} />}
                  size="small"
                >
                  Print
                </Button>
              </Stack>
              
              {isAgentView && agent?.status === 'failed' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<IconRefresh size={16} />}
                    size="small"
                    color="warning"
                  >
                    Retry Payout
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconAlertTriangle size={16} />}
                    size="small"
                    color="error"
                  >
                    Escalate
                  </Button>
                </Stack>
              )}
              
              {isTransactionView && transaction?.status === 'failed' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<IconRefresh size={16} />}
                    size="small"
                    color="warning"
                  >
                    Retry Transaction
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconAlertTriangle size={16} />}
                    size="small"
                    color="error"
                  >
                    Contact Bank
                  </Button>
                </Stack>
              )}
              
              <Button
                variant="text"
                startIcon={<IconEye size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                View Full Audit Log
              </Button>
              
              <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                ⚠️ Read-only (except Finance Admin)
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default PayoutDetailDrawer;
