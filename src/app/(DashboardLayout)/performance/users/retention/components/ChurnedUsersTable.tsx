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
  Pagination,
  LinearProgress
} from '@mui/material';
import { 
  IconEye, 
  IconSearch,
  IconDownload,
  IconAlertTriangle,
  IconMapPin,
  IconClock,
  IconRecycle,
  IconCurrency,
  IconScale,
  IconActivity
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface UserRetentionData {
  id: string;
  userId: string;
  name: string;
  email: string;
  city: string;
  zone: string;
  signupDate: string;
  firstRecycleDate: string;
  lastActivityDate: string;
  recyclesCompleted: number;
  lifetimeDays: number;
  churnReason: string;
  churnSegment: 'early_churn' | 'mid_lifecycle' | 'long_term_churn' | 'active';
  avgResponseTime: number;
  disputesEncountered: number;
  rewardsEarned: number;
  userType: 'pickup' | 'dropoff' | 'enterprise_linked';
}

interface ChurnedUsersTableProps {
  onRowClick: (user: UserRetentionData) => void;
}

const ChurnedUsersTable: React.FC<ChurnedUsersTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reasonFilter, setReasonFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastActivityDate');

  // Mock data for churned users
  const churnedUsersData: UserRetentionData[] = [
    {
      id: '1',
      userId: 'U1001',
      name: 'Adebayo Johnson',
      email: 'adebayo.j@email.com',
      city: 'Lagos',
      zone: 'Mainland',
      signupDate: '2023-12-01',
      firstRecycleDate: '2023-12-03',
      lastActivityDate: '2024-01-08',
      recyclesCompleted: 2,
      lifetimeDays: 38,
      churnReason: 'No agent availability',
      churnSegment: 'early_churn',
      avgResponseTime: 8.5,
      disputesEncountered: 0,
      rewardsEarned: 50,
      userType: 'pickup'
    },
    {
      id: '2',
      userId: 'U1002',
      name: 'Fatima Abdullah',
      email: 'fatima.a@email.com',
      city: 'Lagos',
      zone: 'Island',
      signupDate: '2023-11-15',
      firstRecycleDate: '2023-11-17',
      lastActivityDate: '2024-01-10',
      recyclesCompleted: 8,
      lifetimeDays: 56,
      churnReason: 'Pricing dissatisfaction',
      churnSegment: 'mid_lifecycle',
      avgResponseTime: 4.2,
      disputesEncountered: 2,
      rewardsEarned: 200,
      userType: 'dropoff'
    },
    {
      id: '3',
      userId: 'U1003',
      name: 'Chukwu Okafor',
      email: 'chukwu.o@email.com',
      city: 'Abuja',
      zone: 'Central',
      signupDate: '2023-10-20',
      firstRecycleDate: '2023-10-22',
      lastActivityDate: '2024-01-05',
      recyclesCompleted: 15,
      lifetimeDays: 77,
      churnReason: 'Dispute history',
      churnSegment: 'long_term_churn',
      avgResponseTime: 6.8,
      disputesEncountered: 3,
      rewardsEarned: 375,
      userType: 'pickup'
    },
    {
      id: '4',
      userId: 'U1004',
      name: 'Aisha Bello',
      email: 'aisha.b@email.com',
      city: 'Port Harcourt',
      zone: 'Rivers',
      signupDate: '2023-12-10',
      firstRecycleDate: '2023-12-12',
      lastActivityDate: '2024-01-12',
      recyclesCompleted: 1,
      lifetimeDays: 33,
      churnReason: 'Low rewards',
      churnSegment: 'early_churn',
      avgResponseTime: 5.5,
      disputesEncountered: 0,
      rewardsEarned: 25,
      userType: 'dropoff'
    },
    {
      id: '5',
      userId: 'U1005',
      name: 'Muhammad Ibrahim',
      email: 'muhammad.i@email.com',
      city: 'Kano',
      zone: 'North',
      signupDate: '2023-11-25',
      firstRecycleDate: '2023-11-27',
      lastActivityDate: '2024-01-09',
      recyclesCompleted: 6,
      lifetimeDays: 45,
      churnReason: 'No agent availability',
      churnSegment: 'mid_lifecycle',
      avgResponseTime: 12.3,
      disputesEncountered: 1,
      rewardsEarned: 150,
      userType: 'pickup'
    },
    {
      id: '6',
      userId: 'U1006',
      name: 'Grace Okonkwo',
      email: 'grace.o@email.com',
      city: 'Lagos',
      zone: 'Mainland',
      signupDate: '2023-09-15',
      firstRecycleDate: '2023-09-17',
      lastActivityDate: '2024-01-11',
      recyclesCompleted: 22,
      lifetimeDays: 118,
      churnReason: 'Pricing dissatisfaction',
      churnSegment: 'long_term_churn',
      avgResponseTime: 3.8,
      disputesEncountered: 1,
      rewardsEarned: 550,
      userType: 'enterprise_linked'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => {
      const reasons = ['No agent availability', 'Pricing dissatisfaction', 'Dispute history', 'Low rewards'];
      const segments = ['early_churn', 'mid_lifecycle', 'long_term_churn'];
      const reason = reasons[Math.floor(Math.random() * reasons.length)];
      const segment = segments[Math.floor(Math.random() * segments.length)];
      const recycles = segment === 'early_churn' ? 1 : segment === 'mid_lifecycle' ? 8 : 15;
      
      return {
        id: `${i + 7}`,
        userId: `U${String(1000 + i).padStart(4, '0')}`,
        name: `User ${i + 7}`,
        email: `user${i + 7}@email.com`,
        city: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano'][i % 4],
        zone: ['Mainland', 'Island', 'Central', 'Rivers', 'North'][i % 5],
        signupDate: `2023-${10 + (i % 3)}-${1 + (i % 28)}`,
        firstRecycleDate: `2023-${10 + (i % 3)}-${3 + (i % 28)}`,
        lastActivityDate: `2024-01-${5 + (i % 10)}`,
        recyclesCompleted: recycles + Math.floor(Math.random() * 5),
        lifetimeDays: 30 + Math.floor(Math.random() * 100),
        churnReason: reason,
        churnSegment: segment as 'early_churn' | 'mid_lifecycle' | 'long_term_churn',
        avgResponseTime: 2 + Math.random() * 12,
        disputesEncountered: Math.floor(Math.random() * 4),
        rewardsEarned: 25 + Math.floor(Math.random() * 600),
        userType: ['pickup', 'dropoff', 'enterprise_linked'][Math.floor(Math.random() * 3)] as 'pickup' | 'dropoff' | 'enterprise_linked'
      };
    })
  ];

  const filteredData = useMemo(() => {
    let filtered = churnedUsersData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesReason = reasonFilter === 'all' || item.churnReason === reasonFilter;
      
      return matchesSearch && matchesReason;
    });

    // Sort data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'lastActivityDate':
          return new Date(b.lastActivityDate).getTime() - new Date(a.lastActivityDate).getTime();
        case 'recyclesCompleted':
          return b.recyclesCompleted - a.recyclesCompleted;
        case 'lifetimeDays':
          return b.lifetimeDays - a.lifetimeDays;
        case 'avgResponseTime':
          return b.avgResponseTime - a.avgResponseTime;
        case 'disputesEncountered':
          return b.disputesEncountered - a.disputesEncountered;
        default:
          return new Date(b.lastActivityDate).getTime() - new Date(a.lastActivityDate).getTime();
      }
    });

    return filtered;
  }, [churnedUsersData, searchQuery, reasonFilter, sortBy]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'No agent availability': return 'error';
      case 'Pricing dissatisfaction': return 'warning';
      case 'Dispute history': return 'error';
      case 'Low rewards': return 'warning';
      default: return 'default';
    }
  };

  const getReasonIcon = (reason: string) => {
    switch (reason) {
      case 'No agent availability': return <IconMapPin size={16} />;
      case 'Pricing dissatisfaction': return <IconCurrency size={16} />;
      case 'Dispute history': return <IconAlertTriangle size={16} />;
      case 'Low rewards': return <IconRecycle size={16} />;
      default: return null;
    }
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'early_churn': return 'error';
      case 'mid_lifecycle': return 'warning';
      case 'long_term_churn': return 'info';
      default: return 'default';
    }
  };

  const getResponseTimeColor = (time: number) => {
    if (time <= 3) return 'success';
    if (time <= 6) return 'warning';
    return 'error';
  };

  const handleExport = () => {
    const headers = [
      'User ID',
      'Name',
      'Email',
      'City',
      'Zone',
      'Last Activity',
      'Recycles Completed',
      'Lifetime (Days)',
      'Churn Reason',
      'Segment'
    ];

    const rows = paginatedData.map(item => [
      item.userId,
      item.name,
      item.email,
      item.city,
      item.zone,
      item.lastActivityDate,
      item.recyclesCompleted.toString(),
      item.lifetimeDays.toString(),
      item.churnReason,
      item.churnSegment.replace('_', ' ')
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'churned-users.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Churned Users Analysis">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search user name / ID / email..."
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
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Churn Reason</InputLabel>
            <Select
              value={reasonFilter}
              label="Churn Reason"
              onChange={(e) => setReasonFilter(e.target.value)}
            >
              <MenuItem value="all">All Reasons</MenuItem>
              <MenuItem value="No agent availability">No Agent Availability</MenuItem>
              <MenuItem value="Pricing dissatisfaction">Pricing Dissatisfaction</MenuItem>
              <MenuItem value="Dispute history">Dispute History</MenuItem>
              <MenuItem value="Low rewards">Low Rewards</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="lastActivityDate">Last Activity</MenuItem>
              <MenuItem value="recyclesCompleted">Recycles Completed</MenuItem>
              <MenuItem value="lifetimeDays">Lifetime (Days)</MenuItem>
              <MenuItem value="avgResponseTime">Avg Response Time</MenuItem>
              <MenuItem value="disputesEncountered">Disputes</MenuItem>
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
          <Table sx={{ minWidth: 1400 }}>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">Last Activity</TableCell>
                <TableCell align="right">Recycles Completed</TableCell>
                <TableCell align="right">Lifetime (Days)</TableCell>
                <TableCell align="center">Likely Reason</TableCell>
                <TableCell align="center">Segment</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(user)}
                >
                  <TableCell>
                    <Stack spacing={1}>
                      <Typography variant="body2" fontWeight={600}>
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {user.userId}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.city} • {user.zone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Stack spacing={1} alignItems="flex-end">
                      <Typography variant="body2" fontWeight={600}>
                        {new Date(user.lastActivityDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {Math.floor((Date.now() - new Date(user.lastActivityDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {user.recyclesCompleted}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack spacing={1} alignItems="flex-end">
                      <Typography variant="body2" fontWeight={600}>
                        {user.lifetimeDays}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        days active
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack spacing={1} alignItems="center">
                      {getReasonIcon(user.churnReason)}
                      <Chip
                        size="small"
                        label={user.churnReason}
                        color={getReasonColor(user.churnReason) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={user.churnSegment.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      color={getSegmentColor(user.churnSegment) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(user);
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} churned users
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

        {/* Summary */}
        <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, mt: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Churn Analysis Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Churned Users</Typography>
              <Typography variant="caption" fontWeight={600}>
                {paginatedData.length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Early Churn (&lt;30 days)</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {paginatedData.filter(item => item.churnSegment === 'early_churn').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Avg Lifetime Before Churn</Typography>
              <Typography variant="caption" fontWeight={600}>
                {Math.round(paginatedData.reduce((sum, item) => sum + item.lifetimeDays, 0) / paginatedData.length)} days
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Top Churn Reason</Typography>
              <Typography variant="caption" fontWeight={600}>
                No Agent Availability
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ChurnedUsersTable;
