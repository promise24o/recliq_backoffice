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
  IconActivity,
  IconRecycle,
  IconAlertTriangle
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface UserFrequencyData {
  id: string;
  userId: string;
  name: string;
  email: string;
  city: string;
  zone: string;
  avgRecyclesPerMonth: number;
  lastRecycleDate: string;
  currentStreak: number;
  longestStreak: number;
  preferredMaterials: string[];
  frequencySegment: 'power_recycler' | 'regular' | 'occasional' | 'at_risk';
  pickupVsDropoffRatio: number;
  avgWeightPerRecycle: number;
  accountAge: number;
  totalRecycles: number;
  frequencyTrend: 'increasing' | 'stable' | 'decreasing';
}

interface UserFrequencyTableProps {
  onRowClick: (user: UserFrequencyData) => void;
}

const UserFrequencyTable: React.FC<UserFrequencyTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('avgRecyclesPerMonth');

  // Mock data
  const userData: UserFrequencyData[] = [
    {
      id: '1',
      userId: 'U1001',
      name: 'Adebayo Johnson',
      email: 'adebayo.j@email.com',
      city: 'Lagos',
      zone: 'Mainland',
      avgRecyclesPerMonth: 6.2,
      lastRecycleDate: '2024-01-15 14:30',
      currentStreak: 12,
      longestStreak: 28,
      preferredMaterials: ['PET', 'Metal'],
      frequencySegment: 'power_recycler',
      pickupVsDropoffRatio: 0.7,
      avgWeightPerRecycle: 4.5,
      accountAge: 180,
      totalRecycles: 156,
      frequencyTrend: 'increasing'
    },
    {
      id: '2',
      userId: 'U1002',
      name: 'Fatima Abdullah',
      email: 'fatima.a@email.com',
      city: 'Lagos',
      zone: 'Island',
      avgRecyclesPerMonth: 3.8,
      lastRecycleDate: '2024-01-14 10:15',
      currentStreak: 6,
      longestStreak: 15,
      preferredMaterials: ['Mixed', 'E-waste'],
      frequencySegment: 'regular',
      pickupVsDropoffRatio: 0.8,
      avgWeightPerRecycle: 3.2,
      accountAge: 120,
      totalRecycles: 98,
      frequencyTrend: 'stable'
    },
    {
      id: '3',
      userId: 'U1003',
      name: 'Chukwu Okafor',
      email: 'chukwu.o@email.com',
      city: 'Abuja',
      zone: 'Central',
      avgRecyclesPerMonth: 2.1,
      lastRecycleDate: '2024-01-13 16:45',
      currentStreak: 2,
      longestStreak: 8,
      preferredMaterials: ['PET'],
      frequencySegment: 'occasional',
      pickupVsDropoffRatio: 0.6,
      avgWeightPerRecycle: 2.8,
      accountAge: 90,
      totalRecycles: 67,
      frequencyTrend: 'decreasing'
    },
    {
      id: '4',
      userId: 'U1004',
      name: 'Aisha Bello',
      email: 'aisha.b@email.com',
      city: 'Port Harcourt',
      zone: 'Rivers',
      avgRecyclesPerMonth: 0.8,
      lastRecycleDate: '2024-01-08 09:20',
      currentStreak: 0,
      longestStreak: 3,
      preferredMaterials: ['Metal'],
      frequencySegment: 'at_risk',
      pickupVsDropoffRatio: 0.5,
      avgWeightPerRecycle: 2.1,
      accountAge: 60,
      totalRecycles: 45,
      frequencyTrend: 'decreasing'
    },
    {
      id: '5',
      userId: 'U1005',
      name: 'Muhammad Ibrahim',
      email: 'muhammad.i@email.com',
      city: 'Kano',
      zone: 'North',
      avgRecyclesPerMonth: 4.5,
      lastRecycleDate: '2024-01-15 11:00',
      currentStreak: 8,
      longestStreak: 18,
      preferredMaterials: ['PET', 'Mixed'],
      frequencySegment: 'regular',
      pickupVsDropoffRatio: 0.9,
      avgWeightPerRecycle: 3.8,
      accountAge: 150,
      totalRecycles: 89,
      frequencyTrend: 'increasing'
    },
    {
      id: '6',
      userId: 'U1006',
      name: 'Grace Okonkwo',
      email: 'grace.o@email.com',
      city: 'Lagos',
      zone: 'Mainland',
      avgRecyclesPerMonth: 7.1,
      lastRecycleDate: '2024-01-15 15:30',
      currentStreak: 15,
      longestStreak: 32,
      preferredMaterials: ['PET', 'Metal', 'Mixed'],
      frequencySegment: 'power_recycler',
      pickupVsDropoffRatio: 0.75,
      avgWeightPerRecycle: 5.2,
      accountAge: 210,
      totalRecycles: 234,
      frequencyTrend: 'increasing'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => {
      const avgRecyclesPerMonth = 0.5 + Math.random() * 8;
      const segment = avgRecyclesPerMonth >= 6 ? 'power_recycler' : 
                     avgRecyclesPerMonth >= 2 ? 'regular' : 
                     avgRecyclesPerMonth >= 1 ? 'occasional' : 'at_risk';
      
      return {
        id: `${i + 7}`,
        userId: `U${String(1000 + i).padStart(4, '0')}`,
        name: `User ${i + 7}`,
        email: `user${i + 7}@email.com`,
        city: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano'][i % 4],
        zone: ['Mainland', 'Island', 'Central', 'Rivers', 'North'][i % 5],
        avgRecyclesPerMonth,
        lastRecycleDate: `2024-01-${5 + (i % 15)} ${8 + (i % 12)}:${(i * 5) % 60}`,
        currentStreak: Math.floor(Math.random() * 20),
        longestStreak: Math.floor(Math.random() * 35),
        preferredMaterials: [['PET', 'Metal'], ['Mixed'], ['E-waste'], ['PET', 'Mixed']][i % 4],
        frequencySegment: segment as 'power_recycler' | 'regular' | 'occasional' | 'at_risk',
        pickupVsDropoffRatio: 0.4 + Math.random() * 0.6,
        avgWeightPerRecycle: 1.5 + Math.random() * 5,
        accountAge: 30 + Math.floor(Math.random() * 200),
        totalRecycles: 20 + Math.floor(Math.random() * 300),
        frequencyTrend: ['increasing', 'stable', 'decreasing'][Math.floor(Math.random() * 3)] as 'increasing' | 'stable' | 'decreasing'
      };
    })
  ];

  const filteredData = useMemo(() => {
    let filtered = userData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSegment = segmentFilter === 'all' || item.frequencySegment === segmentFilter;
      
      return matchesSearch && matchesSegment;
    });

    // Sort data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'avgRecyclesPerMonth':
          return b.avgRecyclesPerMonth - a.avgRecyclesPerMonth;
        case 'currentStreak':
          return b.currentStreak - a.currentStreak;
        case 'totalRecycles':
          return b.totalRecycles - a.totalRecycles;
        case 'lastRecycleDate':
          return new Date(b.lastRecycleDate).getTime() - new Date(a.lastRecycleDate).getTime();
        case 'accountAge':
          return b.accountAge - a.accountAge;
        default:
          return b.avgRecyclesPerMonth - a.avgRecyclesPerMonth;
      }
    });

    return filtered;
  }, [userData, searchQuery, segmentFilter, sortBy]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'power_recycler': return 'success';
      case 'regular': return 'info';
      case 'occasional': return 'warning';
      case 'at_risk': return 'error';
      default: return 'default';
    }
  };

  const getSegmentIcon = (segment: string) => {
    switch (segment) {
      case 'power_recycler': return <IconTrendingUp size={16} />;
      case 'regular': return <IconActivity size={16} />;
      case 'occasional': return <IconRecycle size={16} />;
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

  const getFrequencyColor = (frequency: number) => {
    if (frequency >= 6) return 'success';
    if (frequency >= 2) return 'info';
    if (frequency >= 1) return 'warning';
    return 'error';
  };

  const handleExport = () => {
    const headers = [
      'User ID',
      'Name',
      'Email',
      'City',
      'Zone',
      'Avg / Month',
      'Last Recycle',
      'Current Streak',
      'Frequency Segment'
    ];

    const rows = paginatedData.map(item => [
      item.userId,
      item.name,
      item.email,
      item.city,
      item.zone,
      item.avgRecyclesPerMonth.toFixed(1),
      item.lastRecycleDate,
      item.currentStreak.toString(),
      item.frequencySegment.replace('_', ' ')
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'user-recycling-frequency.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="User Frequency Table">
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
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Frequency Segment</InputLabel>
            <Select
              value={segmentFilter}
              label="Frequency Segment"
              onChange={(e) => setSegmentFilter(e.target.value)}
            >
              <MenuItem value="all">All Segments</MenuItem>
              <MenuItem value="power_recycler">Power Recycler</MenuItem>
              <MenuItem value="regular">Regular</MenuItem>
              <MenuItem value="occasional">Occasional</MenuItem>
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
              <MenuItem value="avgRecyclesPerMonth">Avg / Month</MenuItem>
              <MenuItem value="currentStreak">Current Streak</MenuItem>
              <MenuItem value="totalRecycles">Total Recycles</MenuItem>
              <MenuItem value="lastRecycleDate">Last Recycle</MenuItem>
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
                <TableCell align="right">Avg / Month</TableCell>
                <TableCell align="right">Last Recycle</TableCell>
                <TableCell align="right">Streak</TableCell>
                <TableCell align="center">Materials</TableCell>
                <TableCell align="center">Frequency Segment</TableCell>
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
                      <Typography 
                        variant="body2" 
                        fontWeight={700}
                        color={getFrequencyColor(user.avgRecyclesPerMonth) + '.main' as any}
                      >
                        {user.avgRecyclesPerMonth.toFixed(1)}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                        {getTrendIcon(user.frequencyTrend)}
                        <Typography variant="caption" color="text.secondary">
                          {user.totalRecycles} total
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Stack spacing={1} alignItems="flex-end">
                      <Typography variant="body2" fontWeight={600}>
                        {new Date(user.lastRecycleDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(user.lastRecycleDate).toLocaleTimeString()}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Stack spacing={1} alignItems="flex-end">
                      <Typography variant="body2" fontWeight={600}>
                        {user.currentStreak}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Best: {user.longestStreak}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack spacing={1}>
                      {user.preferredMaterials.map((material, index) => (
                        <Chip
                          key={index}
                          size="small"
                          label={material}
                          variant="outlined"
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getSegmentIcon(user.frequencySegment)}
                      <Chip
                        size="small"
                        label={user.frequencySegment.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        color={getSegmentColor(user.frequencySegment) as any}
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
            Frequency Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Avg Frequency</Typography>
              <Typography variant="caption" fontWeight={600}>
                {(paginatedData.reduce((sum, item) => sum + item.avgRecyclesPerMonth, 0) / paginatedData.length).toFixed(1)}/month
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Power Recyclers</Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                {paginatedData.filter(item => item.frequencySegment === 'power_recycler').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Users at Risk</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {paginatedData.filter(item => item.frequencySegment === 'at_risk').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Avg Streak</Typography>
              <Typography variant="caption" fontWeight={600}>
                {Math.round(paginatedData.reduce((sum, item) => sum + item.currentStreak, 0) / paginatedData.length)} days
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default UserFrequencyTable;
