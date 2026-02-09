'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  TablePagination,
  Menu,
  MenuItem,
  Stack
} from '@mui/material';
import {
  Eye,
  Edit,
  MoreVertical,
  Calendar,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  FileText,
  CreditCard,
  Download,
  Send,
  RefreshCw,
  Target,
  Receipt,
  TrendingUp,
  Phone,
  Mail,
  Building,
  Settings
} from 'lucide-react';
import type { EnterpriseInvoice, InvoiceStatus, InvoiceType, Currency } from '../types';
import { 
  getInvoiceStatusColor, 
  getInvoiceTypeColor,
  formatCurrency,
  getDaysOverdue,
  isInvoiceOverdue
} from '../mockData';

interface InvoicesTableProps {
  invoices: EnterpriseInvoice[];
  onViewInvoice: (invoiceId: string) => void;
  onEditInvoice: (invoiceId: string) => void;
  onSendInvoice: (invoiceId: string) => void;
  onRecordPayment: (invoiceId: string) => void;
  onExportInvoice: (invoiceId: string) => void;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({
  invoices,
  onViewInvoice,
  onEditInvoice,
  onSendInvoice,
  onRecordPayment,
  onExportInvoice
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<EnterpriseInvoice | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, invoice: EnterpriseInvoice) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const handleView = () => {
    if (selectedInvoice) {
      onViewInvoice(selectedInvoice.id);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedInvoice) {
      onEditInvoice(selectedInvoice.id);
    }
    handleMenuClose();
  };

  const handleSend = () => {
    if (selectedInvoice) {
      onSendInvoice(selectedInvoice.id);
    }
    handleMenuClose();
  };

  const handleRecordPayment = () => {
    if (selectedInvoice) {
      onRecordPayment(selectedInvoice.id);
    }
    handleMenuClose();
  };

  const handleExport = () => {
    if (selectedInvoice) {
      onExportInvoice(selectedInvoice.id);
    }
    handleMenuClose();
  };

  const getStatusIcon = (status: InvoiceStatus) => {
    switch (status) {
      case 'draft': return <FileText size={16} />;
      case 'issued': return <Send size={16} />;
      case 'partially_paid': return <CreditCard size={16} />;
      case 'paid': return <CheckCircle size={16} />;
      case 'overdue': return <AlertTriangle size={16} />;
      case 'cancelled': return <AlertTriangle size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getPaymentProgress = (paidAmount: number, totalAmount: number): number => {
    return totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;
  };

  const getOverdueInfo = (invoice: EnterpriseInvoice) => {
    if (!isInvoiceOverdue(invoice.dueDate, invoice.status)) {
      return { text: 'On Time', color: '#10b981' };
    }
    
    const daysOverdue = getDaysOverdue(invoice.dueDate);
    if (daysOverdue <= 7) {
      return { text: `${daysOverdue} days overdue`, color: '#f59e0b' };
    } else if (daysOverdue <= 30) {
      return { text: `${daysOverdue} days overdue`, color: '#f97316' };
    } else {
      return { text: `${daysOverdue} days overdue`, color: '#ef4444' };
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - invoices.length) : 0;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="invoices table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Invoice ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Contract</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Billing Period</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Dates</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Payment</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((invoice) => {
                const overdueInfo = getOverdueInfo(invoice);
                const paymentProgress = getPaymentProgress(invoice.paidAmount, invoice.totalAmount);
                
                return (
                  <TableRow
                    key={invoice.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onViewInvoice(invoice.id)}
                  >
                    <TableCell>
                      <Stack spacing={1}>
                        <Typography variant="body2" fontWeight="500">
                          {invoice.invoiceNumber}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            label={invoice.invoiceType.replace('_', ' ').toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: getInvoiceTypeColor(invoice.invoiceType) + '15',
                              color: getInvoiceTypeColor(invoice.invoiceType),
                              fontSize: '0.7rem',
                              fontWeight: 500
                            }}
                          />
                          <Chip
                            label={invoice.currency}
                            size="small"
                            sx={{
                              bgcolor: '#6b728015',
                              color: '#6b7280',
                              fontSize: '0.7rem',
                              fontWeight: 500
                            }}
                          />
                        </Stack>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Building size={12} color="#6b7280" />
                          <Typography variant="body2">
                            {invoice.clientName}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          ID: {invoice.clientId}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Typography variant="body2">
                          {invoice.contractNumber}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {invoice.contractId}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Typography variant="body2">
                          {new Date(invoice.billingPeriod.startDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          to {new Date(invoice.billingPeriod.endDate).toLocaleDateString()}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Calendar size={12} color="#6b7280" />
                          <Typography variant="body2">
                            {new Date(invoice.invoiceDate).toLocaleDateString()}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Clock size={12} color="#6b7280" />
                          <Typography variant="body2">
                            Due: {new Date(invoice.dueDate).toLocaleDateString()}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" color={overdueInfo.color}>
                          {overdueInfo.text}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Typography variant="body2" fontWeight="500">
                          {formatCurrency(invoice.totalAmount, invoice.currency)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Subtotal: {formatCurrency(invoice.subtotal, invoice.currency)}
                        </Typography>
                        {invoice.discountAmount > 0 && (
                          <Typography variant="caption" color="success.main">
                            Discount: {formatCurrency(invoice.discountAmount, invoice.currency)}
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Typography variant="body2" fontWeight="500">
                          {formatCurrency(invoice.paidAmount, invoice.currency)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatCurrency(invoice.outstandingAmount, invoice.currency)} outstanding
                        </Typography>
                        <Box sx={{ width: '100%', mt: 0.5 }}>
                          <Box
                            sx={{
                              height: 4,
                              bgcolor: '#e2e8f0',
                              borderRadius: 2,
                              overflow: 'hidden'
                            }}
                          >
                            <Box
                              sx={{
                                height: '100%',
                                width: `${paymentProgress}%`,
                                bgcolor: paymentProgress === 100 ? '#10b981' : 
                                          paymentProgress >= 50 ? '#3b82f6' : '#f59e0b',
                                borderRadius: 2
                              }}
                            />
                          </Box>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {paymentProgress.toFixed(0)}% paid
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {getStatusIcon(invoice.status)}
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
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuOpen(e, invoice);
                        }}
                      >
                        <MoreVertical size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={9} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={invoices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Invoices per page"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} of ${count} invoices`
        }
      />
      
      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            minWidth: 200,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }
        }}
      >
        <MenuItem onClick={handleView}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Eye size={16} />
            <Typography variant="body2">View Details</Typography>
          </Stack>
        </MenuItem>
        
        {selectedInvoice?.status === 'draft' && (
          <MenuItem onClick={handleEdit}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Edit size={16} />
              <Typography variant="body2">Edit Invoice</Typography>
            </Stack>
          </MenuItem>
        )}
        
        {selectedInvoice?.status === 'draft' && (
          <MenuItem onClick={handleSend}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Send size={16} />
              <Typography variant="body2">Issue Invoice</Typography>
            </Stack>
          </MenuItem>
        )}
        
        {(selectedInvoice?.status === 'issued' || selectedInvoice?.status === 'partially_paid') && (
          <MenuItem onClick={handleRecordPayment}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CreditCard size={16} />
              <Typography variant="body2">Record Payment</Typography>
            </Stack>
          </MenuItem>
        )}
        
        <MenuItem onClick={handleExport}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Download size={16} />
            <Typography variant="body2">Export PDF</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Receipt size={16} />
            <Typography variant="body2">Create Credit Note</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Mail size={16} />
            <Typography variant="body2">Send Reminder</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <RefreshCw size={16} />
            <Typography variant="body2">Duplicate Invoice</Typography>
          </Stack>
        </MenuItem>
        
        {selectedInvoice?.dispute && (
          <MenuItem>
            <Stack direction="row" spacing={2} alignItems="center">
              <AlertTriangle size={16} />
              <Typography variant="body2">View Dispute</Typography>
            </Stack>
          </MenuItem>
        )}
      </Menu>
    </Paper>
  );
};

export default InvoicesTable;
