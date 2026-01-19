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
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconAlertTriangle,
  IconActivity
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface UserActivityData {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  zone: string;
  lastActive: string;
  actionsInPeriod: number;
  pickupsCompleted: number;
  dropoffsCompleted: number;
  scheduledPickups: number;
  preferredMethod: 'pickup' | 'dropoff' | 'schedule';
  status: 'highly_active' | 'normal' | 'at_risk';
  accountAge: number; // in days
  totalActions: number;
  engagementTrend: 'increasing' | 'stable' | 'decreasing';
}

interface ActiveUsersTableProps {
  onRowClick: (user: UserActivityData) => void;
}

const ActiveUsersTable: React.FC<ActiveUsersTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastActive');

  // Mock data
  const userData: UserActivityData[] = [
    {
      id: '1',
      userId: 'U1001',
      name: 'Adebayo Johnson',
      email: 'adebayo.j@email.com',
      phone: '+2348012345678',
      city: 'Lagos',
      zone: 'Mainland',
      lastActive: '2024-01-15 14:30',
      actionsInPeriod: 12,
      pickupsCompleted: 8,
      dropoffsCompleted: 3,
      scheduledPickups: 1,
      preferredMethod: 'pickup',
      status: 'highly_active',
      accountAge: 180,
      totalActions: 156,
      engagementTrend: 'increasing'
    },
    {
      id: '2',
      userId: 'U1002',
      name: 'Fatima Abdullah',
      email: 'fatima.a@email.com',
      phone: '+2348023456789',
      city: 'Lagos',
      zone: 'Island',
      lastActive: '2024-01-15 12:15',
      actionsInPeriod: 8,
      pickupsCompleted: 5,
      dropoffsCompleted: 2,
      scheduledPickups: 1,
      preferredMethod: 'dropoff',
      status: 'highly_active',
      accountAge: 120,
      totalActions: 98,
      engagementTrend: 'stable'
    },
    {
      id: '3',
      userId: 'U1003',
      name: 'Chukwu Okafor',
      email: 'chukwu.o@email.com',
      phone: '+2348034567890',
      city: 'Abuja',
      zone: 'Central',
      lastActive: '2024-01-14 18:45',
      actionsInPeriod: 5,
      pickupsCompleted: 3,
      dropoffsCompleted: 1,
      scheduledPickups: 1,
      preferredMethod: 'schedule',
      status: 'normal',
      accountAge: 90,
      totalActions: 67,
      engagementTrend: 'decreasing'
    },
    {
      id: '4',
      userId: 'U1004',
      name: 'Aisha Bello',
      email: 'aisha.b@email.com',
      phone: '+2348045678901',
      city: 'Port Harcourt',
      zone: 'Rivers',
      lastActive: '2024-01-13 09:20',
      actionsInPeriod: 3,
      pickupsCompleted: 2,
      dropoffsCompleted: 1,
      scheduledPickups: 0,
      preferredMethod: 'pickup',
      status: 'at_risk',
      accountAge: 60,
      totalActions: 45,
      engagementTrend: 'decreasing'
    },
    {
      id: '5',
      userId: 'U1005',
      name: 'Muhammad Ibrahim',
      email: 'muhammad.i@email.com',
      phone: '+2348056789012',
      city: 'Kano',
      zone: 'North',
      lastActive: '2024-01-15 16:00',
      actionsInPeriod: 7,
      pickupsCompleted: 4,
      dropoffsCompleted: 2,
      scheduledPickups: 1,
      preferredMethod: 'dropoff',
      status: 'normal',
      accountAge: 150,
      totalActions: 89,
      engagementTrend: 'increasing'
    },
    {
      id: '6',
      userId: 'U1006',
      name: 'Grace Okonkwo',
      email: 'grace.o@email.com',
      phone: '+2348067890123',
      city: 'Lagos',
      zone: 'Mainland',
      lastActive: '2024-01-15 11:30',
      actionsInPeriod: 15,
      pickupsCompleted: 10,
      dropoffsCompleted: 4,
      scheduledPickups: 1,
      preferredMethod: 'pickup',
      status: 'highly_active',
      accountAge: 210,
      totalActions: 234,
      engagementTrend: 'increasing'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => {
      const actionsInPeriod = 1 + Math.floor(Math.random() * 20);
      const pickupsCompleted = Math.floor(actionsInPeriod * 0.6);
      const dropoffsCompleted = Math.floor(actionsInPeriod * 0.3);
      const scheduledPickups = actionsInPeriod - pickupsCompleted - dropoffsCompleted;
      
      return {
        id: `${i + 7}`,
        userId: `U${String(1000 + i).padStart(4, '0')}`,
        name: `User ${i + 7}`,
        email: `user${i + 7}@email.com`,
        phone: `+23480${String(1234567 + i).padStart(7, '0')}`,
        city: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano'][i % 4],
        zone: ['Mainland', 'Island', 'Central', 'Rivers', 'North'][i % 5],
        lastActive: `2024-01-${10 + (i % 10)} ${8 + (i % 12)}:${(i * 5) % 60}`,
        actionsInPeriod,
        pickupsCompleted,
        dropoffsCompleted,
        scheduledPickups,
        preferredMethod: ['pickup', 'dropoff', 'schedule'][Math.floor(Math.random() * 3)] as 'pickup' | 'dropoff' | 'schedule',
        status: actionsInPeriod >= 10 ? 'highly_active' : actionsInPeriod >= 3 ? 'normal' : 'at_risk' as 'highly_active' | 'normal' | 'at_risk',
        accountAge: 30 + Math.floor(Math.random() * 200),
        totalActions: 20 + Math.floor(Math.random() * 300),
        engagementTrend: ['increasing', 'stable', 'decreasing'][Math.floor(Math.random() * 3)] as 'increasing' | 'stable' | 'decreasing'
      };
    })
  ];

  const filteredData = useMemo(() => {
    let filtered = userData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery);
      
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'lastActive':
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        case 'actionsInPeriod':
          return b.actionsInPeriod - a.actionsInPeriod;
        case 'pickupsCompleted':
          return b.pickupsCompleted - a.pickupsCompleted;
        case 'totalActions':
          return b.totalActions - a.totalActions;
        case 'accountAge':
          return b.accountAge - a.accountAge;
        default:
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
      }
    });

    return filtered;
  }, [userData, searchQuery, statusFilter, sortBy]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'highly_active': return 'success';
      case 'normal': return 'info';
      case 'at_risk': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'highly_active': return <IconTrendingUp size={16} />;
      case 'normal': return <IconUsers size={16} />;
      case 'at_risk': return <IconAlertTriangle size={16} />;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <IconTrendingUp size={16} color="green" />;
      case 'decreasing': return <IconTrendingDown size={16} color="red" />;
      case 'stable': return <IconActivity size={16} color="blue" />;
      default: return null;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'pickup': return 'primary';
      case 'dropoff': return 'success';
      case 'schedule': return 'info';
      default: return 'default';
    }
  };

  const handleExport = () => {
    const headers = [
      'User ID',
      'Name',
      'Email',
      'Phone',
      'City',
      'Zone',
      'Last Active',
      'Actions (Period)',
      'Pickups Completed',
      'Preferred Method',
      'Status'
    ];

    const rows = paginatedData.map(item => [
      item.userId,
      item.name,
      item.email,
      item.phone,
      item.city,
      item.zone,
      item.lastActive,
      item.actionsInPeriod.toString(),
      item.pickupsCompleted.toString(),
      item.preferredMethod,
      item.status
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'active-users.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Active Users Table">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search user name / ID / email / phone..."
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
              <MenuItem value="highly_active">Highly Active</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="at_risk">At Risk</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="lastActive">Last Active</MenuItem>
              <MenuItem value="actionsInPeriod">Actions (Period)</MenuItem>
              <MenuItem value="pickupsCompleted">Pickups Completed</MenuItem>
              <MenuItem value="totalActions">Total Actions</MenuItem>
              <MenuItem value="accountAge">Account Age</MenuItem>
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
                <TableCell align="right">Last Active</TableCell>
                <TableCell align="right">Actions (Period)</TableCell>
                <TableCell align="right">Pickups Completed</TableCell>
                <TableCell align="center">Preferred Method</TableCell>
                <TableCell align="center">Status</TableCell>
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
                        {user.phone}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.city} • {user.zone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Stack spacing={1} alignItems="flex-end">
                      <Typography variant="body2" fontWeight={600}>
                        {new Date(user.lastActive).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(user.lastActive).toLocaleTimeString()}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Stack spacing={1} alignItems="flex-end">
                      <Typography variant="body2" fontWeight={700} color="primary.main">
                        {user.actionsInPeriod}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                        {getTrendIcon(user.engagementTrend)}
                        <Typography variant="caption" color="text.secondary">
                          {user.totalActions} total
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {user.pickupsCompleted}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={user.preferredMethod.charAt(0).toUpperCase() + user.preferredMethod.slice(1)}
                      color={getMethodColor(user.preferredMethod) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getStatusIcon(user.status)}
                      <Chip
                        size="small"
                        label={user.status.charAt(0).toUpperCase() + user.status.slice(1).replace('_', ' ')}
                        color={getStatusColor(user.status) as any}
                        variant="outlined"
                      />
                    </Stack>
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} users
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
            Activity Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Actions (Period)</Typography>
              <Typography variant="caption" fontWeight={600}>
                {paginatedData.reduce((sum, item) => sum + item.actionsInPeriod, 0).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Highly Active Users</Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                {paginatedData.filter(item => item.status === 'highly_active').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Users at Risk</Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {paginatedData.filter(item => item.status === 'at_risk').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', 'justifyContent': 'space-between' }}>
              <Typography variant="caption">Avg Actions per User</Typography>
              <Typography variant="caption" fontWeight={600}>
                {(paginatedData.reduce((sum, item) => sum + item.actionsInPeriod, 0) / paginatedData.length).toFixed(1)}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ActiveUsersTable;
