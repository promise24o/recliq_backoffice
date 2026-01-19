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
  IconX,
  IconBuilding,
  IconCalendar,
  IconFileText,
  IconCurrencyNaira,
  IconCheck,
  IconClock,
  IconAlertTriangle,
  IconDownload,
  IconEdit,
  IconMail,
  IconPrinter
} from '@tabler/icons-react';
import { InvoiceData } from './InvoicesTable';

interface InvoiceDetailDrawerProps {
  invoice: InvoiceData | null;
  open: boolean;
  onClose: () => void;
}

const InvoiceDetailDrawer: React.FC<InvoiceDetailDrawerProps> = ({
  invoice,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <IconCheck size={16} />;
      case 'pending': return <IconClock size={16} />;
      case 'overdue': return <IconAlertTriangle size={16} />;
      default: return <IconClock size={16} />;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getProgressValue = () => {
    if (!invoice) return 0;
    const percentage = (invoice.paid / invoice.amount) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  if (!invoice) return null;

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
              Invoice Details
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="monospace">
              {invoice.invoiceId}
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
          {/* Client Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Client Information
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
                {invoice.client.avatar}
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  {invoice.client.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {invoice.client.email}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Invoice Status */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Status & Progress
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  icon={getStatusIcon(invoice.status)}
                  label={getStatusLabel(invoice.status)}
                  color={getStatusColor(invoice.status) as any}
                  variant="outlined"
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  Due: {new Date(invoice.dueDate).toLocaleDateString()}
                </Typography>
              </Stack>
              
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Payment Progress
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {getProgressValue().toFixed(1)}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={getProgressValue()}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getStatusColor(invoice.status) + '.main',
                    },
                  }}
                />
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Financial Details */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Financial Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    Total Amount
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    ₦{invoice.amount.toLocaleString()}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    Amount Paid
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="success.main">
                    ₦{invoice.paid.toLocaleString()}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    Outstanding
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="error.main">
                    ₦{(invoice.amount - invoice.paid).toLocaleString()}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    Contract Type
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {invoice.contract}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Period Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Billing Period
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconCalendar size={16} />
                <Typography variant="body2">
                  {invoice.period}
                </Typography>
              </Stack>
            </Stack>
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
                  Download PDF
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconMail size={16} />}
                  size="small"
                >
                  Send Email
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconPrinter size={16} />}
                  size="small"
                >
                  Print
                </Button>
              </Stack>
              
              {invoice.status !== 'paid' && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<IconEdit size={16} />}
                  size="small"
                  fullWidth
                >
                  Record Payment
                </Button>
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default InvoiceDetailDrawer;
