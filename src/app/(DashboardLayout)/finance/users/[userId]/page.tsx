'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  DollarSign,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
} from 'lucide-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import notFound from "@/app/not-found";
import { 
  useUserLedger, 
  useFinancialSummary,
  type UserLedger,
  type Transaction,
  type LedgerQuery 
} from '@/hooks/useFinance';
import { 
  FinancePageSkeleton,
  UserHeaderSkeleton,
  FinancialMetricsGridSkeleton,
  FiltersSkeleton,
  TransactionTableSkeleton
} from '../components/FinanceSkeletonLoader';

// Breadcrumb items
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/finance',
    title: 'Finance',
  },
  {
    to: '/finance/users',
    title: 'Users',
  },
  {
    title: 'User Ledger',
  },
];

const FinanceUserLedgerPage: React.FC = () => {
  const params = useParams();
  const userId = params.userId as string;
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filters, setFilters] = useState<LedgerQuery>({});
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'type'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: ledger, isLoading, error, refetch } = useUserLedger(userId, {
    ...filters,
    transactionLimit: rowsPerPage,
    sortBy,
    sortOrder,
  });

  const { data: summary } = useFinancialSummary(userId);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTransactionIcon = (type: string, category: string) => {
    switch (type) {
      case 'earning': return <ArrowUp size={16} />;
      case 'withdrawal': return <ArrowDown size={16} />;
      case 'referral': return <TrendingUp size={16} />;
      case 'refund': return <ArrowUp size={16} />;
      case 'penalty': return <ArrowDown size={16} />;
      case 'bonus': return <TrendingUp size={16} />;
      default: return <DollarSign size={16} />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earning':
      case 'referral':
      case 'refund':
      case 'bonus':
        return 'success';
      case 'withdrawal':
      case 'penalty':
        return 'error';
      default:
        return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'reward': return 'success';
      case 'withdrawal': return 'error';
      case 'referral_bonus': return 'primary';
      case 'escrow_release': return 'info';
      case 'penalty': return 'warning';
      default: return 'default';
    }
  };

  const handleFilterChange = (newFilters: Partial<LedgerQuery>) => {
    setFilters({ ...filters, ...newFilters });
    setPage(0);
  };

  const handleSortChange = (field: 'date' | 'amount' | 'type') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Show skeleton on first render and during loading
  if (isLoading) {
    return (
      <PageContainer title="User Ledger" description="Complete financial transaction history">
        <Breadcrumb title="User Ledger" items={BCrumb} />
        <Box mt={3}>
          <FinancePageSkeleton />
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    // Check if it's an API error (400, 404, 500, etc.)
    if (error && typeof error === 'object' && 'message' in error) {
      return notFound();
    }
    
    // For other types of errors, show custom error page
    return (
      <PageContainer title="User Ledger" description="Complete financial transaction history">
        <Breadcrumb title="User Ledger" items={BCrumb} />
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error">Failed to load user ledger data</Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="User Ledger" description="Complete financial transaction history">
      <Breadcrumb title="User Ledger" items={BCrumb} />
      
      {ledger && (
        <>
          {/* User Header */}
          <Box mt={3}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar 
                    sx={{ width: 64, height: 64 }}
                    src={ledger.userDetails?.profilePhoto}
                  >
                    {!ledger.userDetails?.profilePhoto && 
                     ledger.userDetails?.name?.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="h4" fontWeight={600}>
                      {ledger.userDetails?.name || ledger.userName}
                    </Typography>
                    <Stack direction="row" spacing={2} mt={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Phone size={16} />
                        <Typography variant="body2">{ledger.userDetails?.phone || ledger.userPhone}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Mail size={16} />
                        <Typography variant="body2">{ledger.userDetails?.email || ledger.userEmail}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <MapPin size={16} />
                        <Typography variant="body2">
                          {ledger.userDetails?.location?.address || 
                           `${ledger.userDetails?.city || 'N/A'}, ${ledger.userDetails?.state || 'N/A'}`}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2} mt={1}>
                      <Chip 
                        label={`KYC: ${ledger.kycStatus.toUpperCase()}`}
                        color={ledger.kycStatus === 'approved' ? 'success' : 'warning'}
                        size="small"
                      />
                      <Chip 
                        label={`Account: ${ledger.accountNumber}`}
                        variant="outlined"
                        size="small"
                      />
                      <Chip 
                        label={`Type: ${ledger.userDetails?.type?.toUpperCase() || 'N/A'}`}
                        variant="outlined"
                        size="small"
                      />
                    </Stack>
                  </Box>
                  <Box>
                    <Tooltip title="Refresh Data">
                      <IconButton onClick={() => refetch()}>
                        <RefreshCw size={20} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Financial Metrics */}
          <Box mt={3}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card>
                  <CardContent>
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <DollarSign size={20} color="primary" />
                        <Typography variant="body2" color="text.secondary">
                          Current Balance
                        </Typography>
                      </Stack>
                      <Typography variant="h5" fontWeight={600} color="primary">
                        {formatCurrency(ledger.financialMetrics.currentBalance)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Available: {formatCurrency(ledger.financialMetrics.availableForWithdrawal)}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card>
                  <CardContent>
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <TrendingUp size={20} color="success" />
                        <Typography variant="body2" color="text.secondary">
                          Total Earnings
                        </Typography>
                      </Stack>
                      <Typography variant="h5" fontWeight={600} color="success">
                        {formatCurrency(ledger.financialMetrics.totalEarnings)}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card>
                  <CardContent>
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <ArrowDown size={20} color="error" />
                        <Typography variant="body2" color="text.secondary">
                          Total Withdrawn
                        </Typography>
                      </Stack>
                      <Typography variant="h5" fontWeight={600} color="error">
                        {formatCurrency(ledger.financialMetrics.totalWithdrawn)}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card>
                  <CardContent>
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Calendar size={20} color="info" />
                        <Typography variant="body2" color="text.secondary">
                          Days Active
                        </Typography>
                      </Stack>
                      <Typography variant="h5" fontWeight={600} color="info">
                        {ledger.financialMetrics.daysActive}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Filters */}
          <Box mt={3}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={filters.category || ''}
                      label="Category"
                      onChange={(e) => handleFilterChange({ category: e.target.value || undefined })}
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      <MenuItem value="reward">Reward</MenuItem>
                      <MenuItem value="withdrawal">Withdrawal</MenuItem>
                      <MenuItem value="referral_bonus">Referral Bonus</MenuItem>
                      <MenuItem value="escrow_release">Escrow Release</MenuItem>
                      <MenuItem value="penalty">Penalty</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    size="small"
                    type="date"
                    label="From Date"
                    value={filters.dateFrom || ''}
                    onChange={(e) => handleFilterChange({ dateFrom: e.target.value || undefined })}
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    size="small"
                    type="date"
                    label="To Date"
                    value={filters.dateTo || ''}
                    onChange={(e) => handleFilterChange({ dateTo: e.target.value || undefined })}
                    InputLabelProps={{ shrink: true }}
                  />

                  <Button
                    variant="outlined"
                    startIcon={<Filter size={16} />}
                    onClick={() => setFilters({})}
                  >
                    Clear Filters
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Transactions Table */}
          <Box mt={3}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight={600}>
                    Transaction History ({ledger.totalTransactions} total)
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Download size={16} />}
                    size="small"
                  >
                    Export
                  </Button>
                </Stack>

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell 
                          sx={{ cursor: 'pointer' }}
                          onClick={() => handleSortChange('date')}
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <span>Date</span>
                            {sortBy === 'date' && (
                              <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell 
                          sx={{ cursor: 'pointer' }}
                          onClick={() => handleSortChange('amount')}
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <span>Amount</span>
                            {sortBy === 'amount' && (
                              <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Running Balance</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ledger.transactions.map((transaction) => (
                        <TableRow key={transaction.id} hover>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {getTransactionIcon(transaction.type, transaction.category)}
                              <Typography variant="body2" fontWeight={500}>
                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {formatDateTime(transaction.timestamp)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" fontWeight={500}>
                                {transaction.description}
                              </Typography>
                              {transaction.reference && (
                                <Typography variant="caption" color="text.secondary">
                                  Ref: {transaction.reference}
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography 
                              variant="body2" 
                              color={getTransactionColor(transaction.type) + '.main' as any}
                              fontWeight={600}
                            >
                              {(transaction.type === 'withdrawal' || transaction.type === 'penalty') ? '-' : '+'}{formatCurrency(transaction.amount)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={transaction.category.replace('_', ' ').toUpperCase()}
                              size="small"
                              color={getCategoryColor(transaction.category) as any}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {formatCurrency(transaction.runningBalance)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={transaction.status.toUpperCase()}
                              size="small"
                              color={transaction.status === 'successful' ? 'success' : 
                                     transaction.status === 'pending' ? 'warning' : 'error'}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  component="div"
                  count={ledger.totalTransactions}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(_, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                  }}
                />
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </PageContainer>
  );
};

export default FinanceUserLedgerPage;
