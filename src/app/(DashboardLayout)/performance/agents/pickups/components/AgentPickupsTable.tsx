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
  IconUser,
  IconAlertTriangle
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface AgentData {
  id: string;
  agentId: string;
  name: string;
  city: string;
  zone: string;
  totalPickups: number;
  thisWeek: number;
  thisMonth: number;
  avgPerDay: number;
  completionRate: number;
  status: 'excellent' | 'normal' | 'at_risk';
  cancelledPickups: number;
  failedPickups: number;
  avgCompletionTime: number;
  activeStatus: 'active' | 'suspended';
}

interface AgentPickupsTableProps {
  onRowClick: (agent: AgentData) => void;
}

const AgentPickupsTable: React.FC<AgentPickupsTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('totalPickups');

  // Mock data
  const agentData: AgentData[] = [
    {
      id: '1',
      agentId: 'A102',
      name: 'John Doe',
      city: 'Lagos',
      zone: 'Mainland',
      totalPickups: 214,
      thisWeek: 45,
      thisMonth: 182,
      avgPerDay: 7.1,
      completionRate: 96.5,
      status: 'excellent',
      cancelledPickups: 5,
      failedPickups: 3,
      avgCompletionTime: 45,
      activeStatus: 'active'
    },
    {
      id: '2',
      agentId: 'A045',
      name: 'Jane Smith',
      city: 'Lagos',
      zone: 'Island',
      totalPickups: 189,
      thisWeek: 38,
      thisMonth: 156,
      avgPerDay: 6.3,
      completionRate: 94.2,
      status: 'excellent',
      cancelledPickups: 8,
      failedPickups: 4,
      avgCompletionTime: 52,
      activeStatus: 'active'
    },
    {
      id: '3',
      agentId: 'A078',
      name: 'Mike Johnson',
      city: 'Abuja',
      zone: 'Central',
      totalPickups: 156,
      thisWeek: 28,
      thisMonth: 134,
      avgPerDay: 5.2,
      completionRate: 91.8,
      status: 'normal',
      cancelledPickups: 12,
      failedPickups: 6,
      avgCompletionTime: 58,
      activeStatus: 'active'
    },
    {
      id: '4',
      agentId: 'A023',
      name: 'Sarah Williams',
      city: 'Port Harcourt',
      zone: 'Rivers',
      totalPickups: 143,
      thisWeek: 25,
      thisMonth: 121,
      avgPerDay: 4.8,
      completionRate: 89.5,
      status: 'normal',
      cancelledPickups: 15,
      failedPickups: 8,
      avgCompletionTime: 62,
      activeStatus: 'active'
    },
    {
      id: '5',
      agentId: 'A156',
      name: 'David Brown',
      city: 'Kano',
      zone: 'North',
      totalPickups: 98,
      thisWeek: 12,
      thisMonth: 87,
      avgPerDay: 3.3,
      completionRate: 85.2,
      status: 'at_risk',
      cancelledPickups: 18,
      failedPickups: 12,
      avgCompletionTime: 75,
      activeStatus: 'active'
    },
    {
      id: '6',
      agentId: 'A089',
      name: 'Emily Davis',
      city: 'Lagos',
      zone: 'Mainland',
      totalPickups: 76,
      thisWeek: 8,
      thisMonth: 65,
      avgPerDay: 2.5,
      completionRate: 82.1,
      status: 'at_risk',
      cancelledPickups: 22,
      failedPickups: 15,
      avgCompletionTime: 85,
      activeStatus: 'suspended'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 7}`,
      agentId: `A${String(200 + i).padStart(3, '0')}`,
      name: `Agent ${i + 7}`,
      city: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano'][i % 4],
      zone: ['Mainland', 'Island', 'Central', 'Rivers', 'North'][i % 5],
      totalPickups: 50 + Math.floor(Math.random() * 150),
      thisWeek: 5 + Math.floor(Math.random() * 40),
      thisMonth: 40 + Math.floor(Math.random() * 120),
      avgPerDay: 1 + Math.floor(Math.random() * 8),
      completionRate: 75 + Math.floor(Math.random() * 25),
      status: ['excellent', 'normal', 'at_risk'][Math.floor(Math.random() * 3)] as 'excellent' | 'normal' | 'at_risk',
      cancelledPickups: Math.floor(Math.random() * 25),
      failedPickups: Math.floor(Math.random() * 15),
      avgCompletionTime: 30 + Math.floor(Math.random() * 60),
      activeStatus: Math.random() > 0.8 ? 'suspended' : 'active' as 'active' | 'suspended'
    }))
  ];

  const filteredData = useMemo(() => {
    let filtered = agentData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agentId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'totalPickups':
          return b.totalPickups - a.totalPickups;
        case 'thisWeek':
          return b.thisWeek - a.thisWeek;
        case 'thisMonth':
          return b.thisMonth - a.thisMonth;
        case 'avgPerDay':
          return b.avgPerDay - a.avgPerDay;
        case 'completionRate':
          return b.completionRate - a.completionRate;
        default:
          return b.totalPickups - a.totalPickups;
      }
    });

    return filtered;
  }, [agentData, searchQuery, statusFilter, sortBy]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'normal': return 'info';
      case 'at_risk': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <IconTrendingUp size={16} />;
      case 'normal': return <IconUser size={16} />;
      case 'at_risk': return <IconAlertTriangle size={16} />;
      default: return null;
    }
  };

  const getCompletionRateColor = (rate: number) => {
    if (rate >= 95) return 'success';
    if (rate >= 85) return 'warning';
    return 'error';
  };

  const handleExport = () => {
    const headers = [
      'Agent ID',
      'Name',
      'City',
      'Zone',
      'Total Pickups',
      'This Week',
      'This Month',
      'Avg / Day',
      'Completion Rate',
      'Status'
    ];

    const rows = paginatedData.map(item => [
      item.agentId,
      item.name,
      item.city,
      item.zone,
      item.totalPickups.toString(),
      item.thisWeek.toString(),
      item.thisMonth.toString(),
      item.avgPerDay.toString(),
      `${item.completionRate}%`,
      item.status
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'agent-pickups-completed.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Agent Pickups Table">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search agent name / ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={16} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="excellent">Excellent</MenuItem>
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
              <MenuItem value="totalPickups">Total Pickups</MenuItem>
              <MenuItem value="thisWeek">This Week</MenuItem>
              <MenuItem value="thisMonth">This Month</MenuItem>
              <MenuItem value="avgPerDay">Avg / Day</MenuItem>
              <MenuItem value="completionRate">Completion Rate</MenuItem>
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
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                <TableCell>Agent</TableCell>
                <TableCell align="right">Total Pickups</TableCell>
                <TableCell align="right">This Week</TableCell>
                <TableCell align="right">This Month</TableCell>
                <TableCell align="right">Avg / Day</TableCell>
                <TableCell align="right">Completion Rate</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((agent) => (
                <TableRow
                  key={agent.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(agent)}
                >
                  <TableCell>
                    <Stack spacing={1}>
                      <Typography variant="body2" fontWeight={600}>
                        {agent.name}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                          ID: {agent.agentId}
                        </Typography>
                        {agent.activeStatus === 'suspended' && (
                          <Chip size="small" label="Suspended" color="error" variant="outlined" />
                        )}
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {agent.city} • {agent.zone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700} color="primary.main">
                      {agent.totalPickups.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {agent.thisWeek.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {agent.thisMonth.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {agent.avgPerDay.toFixed(1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack spacing={1} alignItems="flex-end">
                      <Typography 
                        variant="body2" 
                        fontWeight={700}
                        color={getCompletionRateColor(agent.completionRate) + '.main' as any}
                      >
                        {agent.completionRate}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={agent.completionRate}
                        sx={{
                          width: 60,
                          height: 4,
                          borderRadius: 2,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getCompletionRateColor(agent.completionRate) + '.main' as any,
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getStatusIcon(agent.status)}
                      <Chip
                        size="small"
                        label={agent.status.charAt(0).toUpperCase() + agent.status.slice(1).replace('_', ' ')}
                        color={getStatusColor(agent.status) as any}
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
                          onRowClick(agent);
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} agents
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
            Performance Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Pickups</Typography>
              <Typography variant="caption" fontWeight={600}>
                {paginatedData.reduce((sum, item) => sum + item.totalPickups, 0).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Excellent Performers</Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                {paginatedData.filter(item => item.status === 'excellent').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Agents at Risk</Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {paginatedData.filter(item => item.status === 'at_risk').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Avg Completion Rate</Typography>
              <Typography variant="caption" fontWeight={600}>
                {(paginatedData.reduce((sum, item) => sum + item.completionRate, 0) / paginatedData.length).toFixed(1)}%
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default AgentPickupsTable;
