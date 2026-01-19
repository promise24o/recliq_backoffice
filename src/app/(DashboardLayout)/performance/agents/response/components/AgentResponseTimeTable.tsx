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
  IconClock,
  IconTrendingUp,
  IconTrendingDown,
  IconUser,
  IconAlertTriangle
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface AgentResponseData {
  id: string;
  agentId: string;
  name: string;
  city: string;
  zone: string;
  avgResponseTime: number; // in seconds
  medianResponseTime: number; // in seconds
  percentile90Response: number; // in seconds
  requestsSeen: number;
  requestsAccepted: number;
  slaStatus: 'excellent' | 'acceptable' | 'poor';
  fastestResponse: number; // in seconds
  slowestResponse: number; // in seconds
  onlineHours: number;
  availabilityRate: number;
}

interface AgentResponseTimeTableProps {
  onRowClick: (agent: AgentResponseData) => void;
}

const AgentResponseTimeTable: React.FC<AgentResponseTimeTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [slaFilter, setSlaFilter] = useState('all');
  const [sortBy, setSortBy] = useState('avgResponseTime');

  // Mock data
  const agentData: AgentResponseData[] = [
    {
      id: '1',
      agentId: 'A102',
      name: 'John Doe',
      city: 'Lagos',
      zone: 'Mainland',
      avgResponseTime: 45,
      medianResponseTime: 38,
      percentile90Response: 72,
      requestsSeen: 245,
      requestsAccepted: 238,
      slaStatus: 'excellent',
      fastestResponse: 12,
      slowestResponse: 180,
      onlineHours: 8.5,
      availabilityRate: 95.2
    },
    {
      id: '2',
      agentId: 'A045',
      name: 'Jane Smith',
      city: 'Lagos',
      zone: 'Island',
      avgResponseTime: 125,
      medianResponseTime: 110,
      percentile90Response: 180,
      requestsSeen: 198,
      requestsAccepted: 189,
      slaStatus: 'acceptable',
      fastestResponse: 25,
      slowestResponse: 420,
      onlineHours: 7.8,
      availabilityRate: 88.5
    },
    {
      id: '3',
      agentId: 'A078',
      name: 'Mike Johnson',
      city: 'Abuja',
      zone: 'Central',
      avgResponseTime: 180,
      medianResponseTime: 165,
      percentile90Response: 280,
      requestsSeen: 156,
      requestsAccepted: 145,
      slaStatus: 'acceptable',
      fastestResponse: 45,
      slowestResponse: 580,
      onlineHours: 6.5,
      availabilityRate: 82.1
    },
    {
      id: '4',
      agentId: 'A023',
      name: 'Sarah Williams',
      city: 'Port Harcourt',
      zone: 'Rivers',
      avgResponseTime: 320,
      medianResponseTime: 295,
      percentile90Response: 480,
      requestsSeen: 134,
      requestsAccepted: 118,
      slaStatus: 'poor',
      fastestResponse: 60,
      slowestResponse: 890,
      onlineHours: 5.2,
      availabilityRate: 75.8
    },
    {
      id: '5',
      agentId: 'A156',
      name: 'David Brown',
      city: 'Kano',
      zone: 'North',
      avgResponseTime: 450,
      medianResponseTime: 420,
      percentile90Response: 680,
      requestsSeen: 98,
      requestsAccepted: 82,
      slaStatus: 'poor',
      fastestResponse: 90,
      slowestResponse: 1090,
      onlineHours: 4.8,
      availabilityRate: 68.5
    },
    {
      id: '6',
      agentId: 'A089',
      name: 'Emily Davis',
      city: 'Lagos',
      zone: 'Mainland',
      avgResponseTime: 95,
      medianResponseTime: 85,
      percentile90Response: 145,
      requestsSeen: 178,
      requestsAccepted: 172,
      slaStatus: 'excellent',
      fastestResponse: 18,
      slowestResponse: 320,
      onlineHours: 9.2,
      availabilityRate: 92.8
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 7}`,
      agentId: `A${String(200 + i).padStart(3, '0')}`,
      name: `Agent ${i + 7}`,
      city: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano'][i % 4],
      zone: ['Mainland', 'Island', 'Central', 'Rivers', 'North'][i % 5],
      avgResponseTime: 30 + Math.floor(Math.random() * 600),
      medianResponseTime: 25 + Math.floor(Math.random() * 550),
      percentile90Response: 60 + Math.floor(Math.random() * 700),
      requestsSeen: 50 + Math.floor(Math.random() * 200),
      requestsAccepted: 45 + Math.floor(Math.random() * 180),
      slaStatus: ['excellent', 'acceptable', 'poor'][Math.floor(Math.random() * 3)] as 'excellent' | 'acceptable' | 'poor',
      fastestResponse: 10 + Math.floor(Math.random() * 100),
      slowestResponse: 200 + Math.floor(Math.random() * 900),
      onlineHours: 4 + Math.random() * 6,
      availabilityRate: 60 + Math.random() * 40
    }))
  ];

  const filteredData = useMemo(() => {
    let filtered = agentData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agentId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSla = slaFilter === 'all' || item.slaStatus === slaFilter;
      
      return matchesSearch && matchesSla;
    });

    // Sort data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'avgResponseTime':
          return a.avgResponseTime - b.avgResponseTime;
        case 'medianResponseTime':
          return a.medianResponseTime - b.medianResponseTime;
        case 'percentile90Response':
          return a.percentile90Response - b.percentile90Response;
        case 'requestsSeen':
          return b.requestsSeen - a.requestsSeen;
        case 'requestsAccepted':
          return b.requestsAccepted - a.requestsAccepted;
        default:
          return a.avgResponseTime - b.avgResponseTime;
      }
    });

    return filtered;
  }, [agentData, searchQuery, slaFilter, sortBy]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getSlaColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'acceptable': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  const getSlaIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <IconTrendingUp size={16} />;
      case 'acceptable': return <IconClock size={16} />;
      case 'poor': return <IconAlertTriangle size={16} />;
      default: return null;
    }
  };

  const getResponseTimeColor = (seconds: number) => {
    if (seconds <= 120) return 'success'; // ≤ 2 min
    if (seconds <= 300) return 'warning'; // 2-5 min
    return 'error'; // > 5 min
  };

  const handleExport = () => {
    const headers = [
      'Agent ID',
      'Name',
      'City',
      'Zone',
      'Avg Response',
      'Median Response',
      '90th Percentile',
      'Requests Seen',
      'Requests Accepted',
      'SLA Status'
    ];

    const rows = paginatedData.map(item => [
      item.agentId,
      item.name,
      item.city,
      item.zone,
      formatTime(item.avgResponseTime),
      formatTime(item.medianResponseTime),
      formatTime(item.percentile90Response),
      item.requestsSeen.toString(),
      item.requestsAccepted.toString(),
      item.slaStatus
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'agent-response-times.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Agent Response Time Table">
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
            <InputLabel>SLA Status</InputLabel>
            <Select
              value={slaFilter}
              label="SLA Status"
              onChange={(e) => setSlaFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="excellent">Excellent (&lt;= 2 min)</MenuItem>
              <MenuItem value="acceptable">Acceptable (2–5 min)</MenuItem>
              <MenuItem value="poor">Poor (&gt; 5 min)</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="avgResponseTime">Avg Response</MenuItem>
              <MenuItem value="medianResponseTime">Median Response</MenuItem>
              <MenuItem value="percentile90Response">90th Percentile</MenuItem>
              <MenuItem value="requestsSeen">Requests Seen</MenuItem>
              <MenuItem value="requestsAccepted">Requests Accepted</MenuItem>
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
                <TableCell>Agent</TableCell>
                <TableCell align="right">Avg Response</TableCell>
                <TableCell align="right">Median Response</TableCell>
                <TableCell align="right">90th Percentile</TableCell>
                <TableCell align="right">Requests Seen</TableCell>
                <TableCell align="right">Requests Accepted</TableCell>
                <TableCell align="center">SLA Status</TableCell>
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
                      <Typography variant="caption" color="text.secondary">
                        ID: {agent.agentId}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {agent.city} • {agent.zone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      variant="body2" 
                      fontWeight={700}
                      color={getResponseTimeColor(agent.avgResponseTime) + '.main' as any}
                    >
                      {formatTime(agent.avgResponseTime)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {formatTime(agent.medianResponseTime)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {formatTime(agent.percentile90Response)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {agent.requestsSeen.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {agent.requestsAccepted.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getSlaIcon(agent.slaStatus)}
                      <Chip
                        size="small"
                        label={agent.slaStatus.charAt(0).toUpperCase() + agent.slaStatus.slice(1)}
                        color={getSlaColor(agent.slaStatus) as any}
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
            Response Time Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Avg Response Time</Typography>
              <Typography variant="caption" fontWeight={600}>
                {formatTime(Math.round(paginatedData.reduce((sum, item) => sum + item.avgResponseTime, 0) / paginatedData.length))}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Excellent Performers</Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                {paginatedData.filter(item => item.slaStatus === 'excellent').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">SLA Breaches</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {paginatedData.filter(item => item.slaStatus === 'poor').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Acceptance Rate</Typography>
              <Typography variant="caption" fontWeight={600}>
                {Math.round((paginatedData.reduce((sum, item) => sum + item.requestsAccepted, 0) / 
                  paginatedData.reduce((sum, item) => sum + item.requestsSeen, 0)) * 100)}%
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default AgentResponseTimeTable;
