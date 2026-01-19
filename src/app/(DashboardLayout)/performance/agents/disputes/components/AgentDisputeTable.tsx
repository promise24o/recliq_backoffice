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
  IconUser,
  IconCheck
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface AgentDisputeData {
  id: string;
  agentId: string;
  name: string;
  city: string;
  zone: string;
  completedPickups: number;
  totalDisputes: number;
  openDisputes: number;
  resolvedDisputes: number;
  disputeRate: number;
  riskLevel: 'low' | 'medium' | 'high';
  disputeTypes: {
    weight: number;
    payment: number;
    conduct: number;
    missed: number;
    quality: number;
  };
  avgResolutionTime: number;
  resolvedInUserFavor: number;
  activeStatus: 'active' | 'suspended';
}

interface AgentDisputeTableProps {
  onRowClick: (agent: AgentDisputeData) => void;
}

const AgentDisputeTable: React.FC<AgentDisputeTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState('disputeRate');

  // Mock data
  const agentData: AgentDisputeData[] = [
    {
      id: '1',
      agentId: 'A041',
      name: 'John Doe',
      city: 'Lagos',
      zone: 'Mainland',
      completedPickups: 245,
      totalDisputes: 1,
      openDisputes: 0,
      resolvedDisputes: 1,
      disputeRate: 0.2,
      riskLevel: 'low',
      disputeTypes: { weight: 0, payment: 1, conduct: 0, missed: 0, quality: 0 },
      avgResolutionTime: 24,
      resolvedInUserFavor: 0,
      activeStatus: 'active'
    },
    {
      id: '2',
      agentId: 'A045',
      name: 'Jane Smith',
      city: 'Lagos',
      zone: 'Island',
      completedPickups: 198,
      totalDisputes: 5,
      openDisputes: 1,
      resolvedDisputes: 4,
      disputeRate: 2.5,
      riskLevel: 'low',
      disputeTypes: { weight: 2, payment: 1, conduct: 1, missed: 1, quality: 0 },
      avgResolutionTime: 48,
      resolvedInUserFavor: 60,
      activeStatus: 'active'
    },
    {
      id: '3',
      agentId: 'A078',
      name: 'Mike Johnson',
      city: 'Abuja',
      zone: 'Central',
      completedPickups: 156,
      totalDisputes: 8,
      openDisputes: 2,
      resolvedDisputes: 6,
      disputeRate: 5.1,
      riskLevel: 'medium',
      disputeTypes: { weight: 3, payment: 2, conduct: 2, missed: 1, quality: 0 },
      avgResolutionTime: 72,
      resolvedInUserFavor: 75,
      activeStatus: 'active'
    },
    {
      id: '4',
      agentId: 'A023',
      name: 'Sarah Williams',
      city: 'Port Harcourt',
      zone: 'Rivers',
      completedPickups: 134,
      totalDisputes: 12,
      openDisputes: 3,
      resolvedDisputes: 9,
      disputeRate: 9.0,
      riskLevel: 'high',
      disputeTypes: { weight: 4, payment: 3, conduct: 3, missed: 1, quality: 1 },
      avgResolutionTime: 96,
      resolvedInUserFavor: 83,
      activeStatus: 'active'
    },
    {
      id: '5',
      agentId: 'A156',
      name: 'David Brown',
      city: 'Kano',
      zone: 'North',
      completedPickups: 98,
      totalDisputes: 15,
      openDisputes: 5,
      resolvedDisputes: 10,
      disputeRate: 15.3,
      riskLevel: 'high',
      disputeTypes: { weight: 5, payment: 4, conduct: 3, missed: 2, quality: 1 },
      avgResolutionTime: 120,
      resolvedInUserFavor: 90,
      activeStatus: 'suspended'
    },
    {
      id: '6',
      agentId: 'A089',
      name: 'Emily Davis',
      city: 'Lagos',
      zone: 'Mainland',
      completedPickups: 178,
      totalDisputes: 3,
      openDisputes: 0,
      resolvedDisputes: 3,
      disputeRate: 1.7,
      riskLevel: 'low',
      disputeTypes: { weight: 1, payment: 1, conduct: 0, missed: 1, quality: 0 },
      avgResolutionTime: 36,
      resolvedInUserFavor: 33,
      activeStatus: 'active'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => {
      const completedPickups = 50 + Math.floor(Math.random() * 200);
      const totalDisputes = Math.floor(Math.random() * 20);
      const disputeRate = (totalDisputes / completedPickups) * 100;
      const riskLevel = disputeRate <= 2 ? 'low' : disputeRate <= 5 ? 'medium' : 'high';
      
      return {
        id: `${i + 7}`,
        agentId: `A${String(200 + i).padStart(3, '0')}`,
        name: `Agent ${i + 7}`,
        city: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano'][i % 4],
        zone: ['Mainland', 'Island', 'Central', 'Rivers', 'North'][i % 5],
        completedPickups,
        totalDisputes,
        openDisputes: Math.floor(Math.random() * 5),
        resolvedDisputes: totalDisputes - Math.floor(Math.random() * 5),
        disputeRate,
        riskLevel: riskLevel as 'low' | 'medium' | 'high',
        disputeTypes: {
          weight: Math.floor(Math.random() * 5),
          payment: Math.floor(Math.random() * 5),
          conduct: Math.floor(Math.random() * 5),
          missed: Math.floor(Math.random() * 5),
          quality: Math.floor(Math.random() * 5)
        },
        avgResolutionTime: 24 + Math.floor(Math.random() * 120),
        resolvedInUserFavor: 20 + Math.floor(Math.random() * 80),
        activeStatus: Math.random() > 0.8 ? 'suspended' : 'active' as 'active' | 'suspended'
      };
    })
  ];

  const filteredData = useMemo(() => {
    let filtered = agentData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agentId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRisk = riskFilter === 'all' || item.riskLevel === riskFilter;
      
      return matchesSearch && matchesRisk;
    });

    // Sort data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'disputeRate':
          return b.disputeRate - a.disputeRate;
        case 'totalDisputes':
          return b.totalDisputes - a.totalDisputes;
        case 'completedPickups':
          return b.completedPickups - a.completedPickups;
        case 'openDisputes':
          return b.openDisputes - a.openDisputes;
        default:
          return b.disputeRate - a.disputeRate;
      }
    });

    return filtered;
  }, [agentData, searchQuery, riskFilter, sortBy]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <IconCheck size={16} />;
      case 'medium': return <IconAlertTriangle size={16} />;
      case 'high': return <IconAlertTriangle size={16} />;
      default: return null;
    }
  };

  const getDisputeRateColor = (rate: number) => {
    if (rate <= 2) return 'success';
    if (rate <= 5) return 'warning';
    return 'error';
  };

  const handleExport = () => {
    const headers = [
      'Agent ID',
      'Name',
      'City',
      'Zone',
      'Completed Pickups',
      'Total Disputes',
      'Open Disputes',
      'Dispute Rate',
      'Risk Level'
    ];

    const rows = paginatedData.map(item => [
      item.agentId,
      item.name,
      item.city,
      item.zone,
      item.completedPickups.toString(),
      item.totalDisputes.toString(),
      item.openDisputes.toString(),
      `${item.disputeRate.toFixed(1)}%`,
      item.riskLevel
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'agent-dispute-rates.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Agent Dispute Table">
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
            <InputLabel>Risk Level</InputLabel>
            <Select
              value={riskFilter}
              label="Risk Level"
              onChange={(e) => setRiskFilter(e.target.value)}
            >
              <MenuItem value="all">All Levels</MenuItem>
              <MenuItem value="low">🟢 Low (&le; 2%)</MenuItem>
              <MenuItem value="medium">🟡 Medium (2–5%)</MenuItem>
              <MenuItem value="high">🔴 High (&gt; 5%)</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="disputeRate">Dispute Rate</MenuItem>
              <MenuItem value="totalDisputes">Total Disputes</MenuItem>
              <MenuItem value="completedPickups">Completed Pickups</MenuItem>
              <MenuItem value="openDisputes">Open Disputes</MenuItem>
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
                <TableCell align="right">Completed Pickups</TableCell>
                <TableCell align="right">Disputes</TableCell>
                <TableCell align="right">Dispute Rate</TableCell>
                <TableCell align="right">Open Disputes</TableCell>
                <TableCell align="center">Risk Level</TableCell>
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
                    <Typography variant="body2" fontWeight={600}>
                      {agent.completedPickups.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack spacing={1} alignItems="flex-end">
                      <Typography variant="body2" fontWeight={600}>
                        {agent.totalDisputes}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {agent.openDisputes} open
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Stack spacing={1} alignItems="flex-end">
                      <Typography 
                        variant="body2" 
                        fontWeight={700}
                        color={getDisputeRateColor(agent.disputeRate) + '.main' as any}
                      >
                        {agent.disputeRate.toFixed(1)}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(agent.disputeRate * 10, 100)}
                        sx={{
                          width: 60,
                          height: 4,
                          borderRadius: 2,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getDisputeRateColor(agent.disputeRate) + '.main' as any,
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600} color={agent.openDisputes > 0 ? 'error.main' : 'text.primary'}>
                      {agent.openDisputes}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getRiskIcon(agent.riskLevel)}
                      <Chip
                        size="small"
                        label={agent.riskLevel.charAt(0).toUpperCase() + agent.riskLevel.slice(1)}
                        color={getRiskColor(agent.riskLevel) as any}
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
            Dispute Risk Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Disputes</Typography>
              <Typography variant="caption" fontWeight={600}>
                {paginatedData.reduce((sum, item) => sum + item.totalDisputes, 0).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">High Risk Agents</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {paginatedData.filter(item => item.riskLevel === 'high').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Open Disputes</Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {paginatedData.reduce((sum, item) => sum + item.openDisputes, 0)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Avg Dispute Rate</Typography>
              <Typography variant="caption" fontWeight={600}>
                {(paginatedData.reduce((sum, item) => sum + item.disputeRate, 0) / paginatedData.length).toFixed(1)}%
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default AgentDisputeTable;
