'use client';
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  Stack,
  Divider,
  Alert,
  Grid,
  Paper,
  Chip,
  Button,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress
} from '@mui/material';
import {
  X,
  FileText,
  Calendar,
  Clock,
  DollarSign,
  User,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Settings,
  Target,
  Activity,
  Phone,
  Mail,
  Download,
  Edit,
  Eye,
  Send,
  CreditCard,
  Receipt,
  RefreshCw,
  Building,
  Package,
  TrendingUp,
  Users,
  Navigation,
  Info,
  History,
  MessageSquare,
  Shield,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import type { EnterpriseInvoice, InvoiceLineItem, Payment, InvoiceDispute } from '../types';
import { 
  getInvoiceStatusColor, 
  getInvoiceTypeColor,
  formatCurrency,
  getDaysOverdue,
  isInvoiceOverdue
} from '../mockData';

interface InvoiceDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  invoice: EnterpriseInvoice | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`invoice-tabpanel-${index}`}
      aria-labelledby={`invoice-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const InvoiceDetailDrawer: React.FC<InvoiceDetailDrawerProps> = ({
  open,
  onClose,
  invoice
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!invoice) return null;

  const overdueInfo = isInvoiceOverdue(invoice.dueDate, invoice.status) ? getDaysOverdue(invoice.dueDate) : 0;
  const paymentProgress = invoice.totalAmount > 0 ? (invoice.paidAmount / invoice.totalAmount) * 100 : 0;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', md: 900 },
          p: 0
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: '#f8fafc'
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <FileText size={24} color="#3b82f6" />
              <Box>
                <Typography variant="h6" fontWeight="600">
                  {invoice.invoiceNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {invoice.clientName} • {invoice.contractNumber}
                </Typography>
              </Box>
            </Stack>
            
            <IconButton onClick={onClose}>
              <X size={20} />
            </IconButton>
          </Stack>
        </Box>

        {/* Status Bar */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip
              label={invoice.status.replace('_', ' ').toUpperCase()}
              size="small"
              sx={{
                bgcolor: getInvoiceStatusColor(invoice.status) + '15',
                color: getInvoiceStatusColor(invoice.status),
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
            <Chip
              label={invoice.invoiceType.replace('_', ' ').toUpperCase()}
              size="small"
              sx={{
                bgcolor: getInvoiceTypeColor(invoice.invoiceType) + '15',
                color: getInvoiceTypeColor(invoice.invoiceType),
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
            <Chip
              label={invoice.currency}
              size="small"
              sx={{
                bgcolor: '#6b728015',
                color: '#6b7280',
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
            {overdueInfo > 0 && (
              <Chip
                label={`${overdueInfo} DAYS OVERDUE`}
                size="small"
                color="error"
              />
            )}
          </Stack>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Line Items" />
            <Tab label="Payments" />
            <Tab label="Audit Trail" />
            <Tab label="Actions" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* Overview Tab */}
          <TabPanel value={activeTab} index={0}>
            <Stack spacing={3}>
              {/* Invoice Overview */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Invoice Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Building size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Client</Typography>
                          <Typography variant="body2">{invoice.clientName}</Typography>
                          <Typography variant="caption" color="text.secondary">ID: {invoice.clientId}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <FileText size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Contract</Typography>
                          <Typography variant="body2">{invoice.contractNumber}</Typography>
                          <Typography variant="caption" color="text.secondary">ID: {invoice.contractId}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Calendar size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Billing Period</Typography>
                          <Typography variant="body2">
                            {new Date(invoice.billingPeriod.startDate).toLocaleDateString()} - {new Date(invoice.billingPeriod.endDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Calendar size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Invoice Date</Typography>
                          <Typography variant="body2">{new Date(invoice.invoiceDate).toLocaleDateString()}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Clock size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Due Date</Typography>
                          <Typography variant="body2">{new Date(invoice.dueDate).toLocaleDateString()}</Typography>
                          {overdueInfo > 0 && (
                            <Typography variant="caption" color="error">
                              {overdueInfo} days overdue
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Target size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Status</Typography>
                          <Chip
                            label={invoice.status.replace('_', ' ').toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: getInvoiceStatusColor(invoice.status) + '15',
                              color: getInvoiceStatusColor(invoice.status),
                              fontSize: '0.75rem',
                              fontWeight: 500
                            }}
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Financial Summary */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Financial Summary
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                        <Typography variant="body2">{formatCurrency(invoice.subtotal, invoice.currency)}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">Tax</Typography>
                        <Typography variant="body2">{formatCurrency(invoice.taxAmount, invoice.currency)}</Typography>
                      </Stack>
                      {invoice.discountAmount > 0 && (
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" color="text.secondary">Discount</Typography>
                          <Typography variant="body2" color="success.main">
                            -{formatCurrency(invoice.discountAmount, invoice.currency)}
                          </Typography>
                        </Stack>
                      )}
                      <Divider />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight="600">Total Amount</Typography>
                        <Typography variant="body2" fontWeight="600">
                          {formatCurrency(invoice.totalAmount, invoice.currency)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">Paid Amount</Typography>
                        <Typography variant="body2" color="success.main">
                          {formatCurrency(invoice.paidAmount, invoice.currency)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">Outstanding</Typography>
                        <Typography variant="body2" color={invoice.outstandingAmount > 0 ? 'warning.main' : 'success.main'}>
                          {formatCurrency(invoice.outstandingAmount, invoice.currency)}
                        </Typography>
                      </Stack>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Payment Progress
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={paymentProgress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: '#e2e8f0',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              bgcolor: paymentProgress === 100 ? '#10b981' : '#3b82f6'
                            }
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" mt={0.5}>
                          {paymentProgress.toFixed(1)}% paid
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Dispute Information */}
              {invoice.dispute && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Dispute Information
                  </Typography>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight="600" mb={1}>
                      Dispute Status: {invoice.dispute.status.replace('_', ' ').toUpperCase()}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      <strong>Reason:</strong> {invoice.dispute.reason}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      <strong>Description:</strong> {invoice.dispute.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Opened: {new Date(invoice.dispute.openedDate).toLocaleDateString()}
                    </Typography>
                  </Alert>
                  
                  {invoice.dispute.communications.length > 0 && (
                    <Box>
                      <Typography variant="body2" fontWeight="600" mb={2}>
                        Communications
                      </Typography>
                      <List>
                        {invoice.dispute.communications.map((comm) => (
                          <ListItem key={comm.communicationId} sx={{ bgcolor: '#f8fafc', mb: 1, borderRadius: 1 }}>
                            <ListItemText
                              primary={
                                <Stack direction="row" justifyContent="space-between">
                                  <Typography variant="body2" fontWeight="500">
                                    {comm.sender}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {new Date(comm.timestamp).toLocaleDateString()}
                                  </Typography>
                                </Stack>
                              }
                              secondary={comm.message}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </Paper>
              )}

              {/* Notes */}
              {invoice.notes.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Invoice Notes
                  </Typography>
                  <List>
                    {invoice.notes.map((note, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={note} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Stack>
          </TabPanel>

          {/* Line Items Tab */}
          <TabPanel value={activeTab} index={1}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Line Items
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Collection ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Waste Type</TableCell>
                        <TableCell align="right">Weight (kg)</TableCell>
                        <TableCell align="right">Unit Price</TableCell>
                        <TableCell align="right">Line Total</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoice.lineItems.map((item) => (
                        <TableRow key={item.lineItemId}>
                          <TableCell>
                            {item.collectionId ? (
                              <Typography variant="body2" color="primary">
                                {item.collectionId}
                              </Typography>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                N/A
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.collectionDate ? (
                              new Date(item.collectionDate).toLocaleDateString()
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                N/A
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={item.wasteType.toUpperCase()}
                              size="small"
                              sx={{
                                bgcolor: '#3b82f615',
                                color: '#3b82f6',
                                fontSize: '0.75rem',
                                fontWeight: 500
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              {item.weight.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              {formatCurrency(item.unitPrice, invoice.currency)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight="500">
                              {formatCurrency(item.lineTotal, invoice.currency)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {item.description}
                            </Typography>
                            {item.specialConditions && item.specialConditions.length > 0 && (
                              <Stack direction="row" spacing={1} mt={0.5}>
                                {item.specialConditions.slice(0, 2).map((condition, idx) => (
                                  <Chip
                                    key={idx}
                                    label={condition}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                ))}
                                {item.specialConditions.length > 2 && (
                                  <Typography variant="caption" color="text.secondary">
                                    +{item.specialConditions.length - 2} more
                                  </Typography>
                                )}
                              </Stack>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Stack>
          </TabPanel>

          {/* Payments Tab */}
          <TabPanel value={activeTab} index={2}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Payment History
                </Typography>
                {invoice.payments.length > 0 ? (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Payment Date</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Method</TableCell>
                          <TableCell>Transaction Ref</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Processed By</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invoice.payments.map((payment) => (
                          <TableRow key={payment.paymentId}>
                            <TableCell>
                              {new Date(payment.paymentDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight="500">
                                {formatCurrency(payment.amount, invoice.currency)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {payment.paymentMethod.type.replace('_', ' ').toUpperCase()}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {payment.paymentMethod.provider}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {payment.transactionReference}
                              </Typography>
                              {payment.bankReference && (
                                <Typography variant="caption" color="text.secondary">
                                  Bank: {payment.bankReference}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={payment.status.toUpperCase()}
                                size="small"
                                color={payment.status === 'completed' ? 'success' : 
                                       payment.status === 'failed' ? 'error' : 'warning'}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {payment.processedBy}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="info">
                    <Typography variant="body2">
                      No payments recorded for this invoice yet.
                    </Typography>
                  </Alert>
                )}
              </Paper>
            </Stack>
          </TabPanel>

          {/* Audit Trail Tab */}
          <TabPanel value={activeTab} index={3}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Audit Trail
                </Typography>
                <List>
                  {invoice.auditTrail.map((entry) => (
                    <ListItem key={entry.entryId} sx={{ bgcolor: '#f8fafc', mb: 1, borderRadius: 1 }}>
                      <ListItemIcon>
                        <History size={16} color="#6b7280" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body2" fontWeight="500">
                              {entry.action.replace('_', ' ').toUpperCase()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(entry.timestamp).toLocaleDateString()}
                            </Typography>
                          </Stack>
                        }
                        secondary={
                          <Stack spacing={1}>
                            <Typography variant="body2">
                              {entry.details}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              By: {entry.performedBy}
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Stack>
          </TabPanel>

          {/* Actions Tab */}
          <TabPanel value={activeTab} index={4}>
            <Stack spacing={3}>
              {/* Available Actions */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Available Actions
                </Typography>
                <Stack spacing={2}>
                  {invoice.status === 'draft' && (
                    <Button
                      variant="contained"
                      startIcon={<Send />}
                      fullWidth
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Issue Invoice
                    </Button>
                  )}
                  
                  {invoice.status === 'draft' && (
                    <Button
                      variant="outlined"
                      startIcon={<Edit />}
                      fullWidth
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Edit Invoice
                    </Button>
                  )}
                  
                  {(invoice.status === 'issued' || invoice.status === 'partially_paid') && (
                    <Button
                      variant="outlined"
                      startIcon={<CreditCard />}
                      fullWidth
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Record Payment
                    </Button>
                  )}
                  
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Export PDF
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Receipt />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Create Credit Note
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Mail />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Send Reminder
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<RefreshCw />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Duplicate Invoice
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<MessageSquare />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Add Note
                  </Button>
                </Stack>
              </Paper>

              {/* Attachments */}
              {invoice.attachments.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Attachments
                  </Typography>
                  <List>
                    {invoice.attachments.map((attachment) => (
                      <ListItem key={attachment.attachmentId}>
                        <ListItemIcon>
                          <FileCheck size={16} color="#6b7280" />
                        </ListItemIcon>
                        <ListItemText
                          primary={attachment.fileName}
                          secondary={
                            <Stack spacing={0.5}>
                              <Typography variant="caption" color="text.secondary">
                                {attachment.description}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB • Uploaded by {attachment.uploadedBy}
                              </Typography>
                            </Stack>
                          }
                        />
                        <IconButton size="small">
                          <Download size={16} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Stack>
          </TabPanel>
        </Box>

        {/* Footer Actions */}
        <Box sx={{ 
          p: 3, 
          borderTop: 1, 
          borderColor: 'divider',
          bgcolor: '#f8fafc'
        }}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              startIcon={<Download />}
            >
              Export PDF
            </Button>
            
            {invoice.status === 'draft' && (
              <Button
                variant="outlined"
                startIcon={<Send />}
              >
                Issue Invoice
              </Button>
            )}
            
            {(invoice.status === 'issued' || invoice.status === 'partially_paid') && (
              <Button
                variant="outlined"
                startIcon={<CreditCard />}
              >
                Record Payment
              </Button>
            )}
            
            <Button
              variant="contained"
              startIcon={<Eye />}
            >
              View Full Details
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default InvoiceDetailDrawer;
