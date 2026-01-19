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
  Avatar,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField
} from '@mui/material';
import { 
  IconEye, 
  IconSearch,
  IconFilter,
  IconDownload,
  IconCheck,
  IconX,
  IconClock,
  IconBuilding,
  IconTrash,
  IconCalendar
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AgentData {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  bankName: string;
  accountNumber: string;
  jobType: 'enterprise' | 'disposal' | 'subscription';
  jobsCompleted: number;
  grossAmount: number;
  platformFee: number;
  netPayable: number;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'held';
}

interface PayableAgentsTableProps {
  onRowClick: (agent: AgentData) => void;
}

const PayableAgentsTable: React.FC<PayableAgentsTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [holdDialogOpen, setHoldDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [holdReason, setHoldReason] = useState('');

  // Mock data
  const mockAgents: AgentData[] = [
    {
      id: '1',
      name: 'Ahmed Bello',
      avatar: 'AB',
      email: 'ahmed.bello@email.com',
      phone: '+234-801-234-5678',
      bankName: 'GTBank',
      accountNumber: '0123456789',
      jobType: 'enterprise',
      jobsCompleted: 45,
      grossAmount: 2250000,
      platformFee: 225000,
      netPayable: 2025000,
      status: 'pending'
    },
    {
      id: '2',
      name: 'Fatima Ibrahim',
      avatar: 'FI',
      email: 'fatima.ibrahim@email.com',
      phone: '+234-802-345-6789',
      bankName: 'Zenith Bank',
      accountNumber: '9876543210',
      jobType: 'disposal',
      jobsCompleted: 32,
      grossAmount: 1600000,
      platformFee: 160000,
      netPayable: 1440000,
      status: 'processing'
    },
    {
      id: '3',
      name: 'Chukwu Okafor',
      avatar: 'CO',
      email: 'chukwu.okafor@email.com',
      phone: '+234-803-456-7890',
      bankName: 'Access Bank',
      accountNumber: '1112223334',
      jobType: 'subscription',
      jobsCompleted: 28,
      grossAmount: 1400000,
      platformFee: 140000,
      netPayable: 1260000,
      status: 'paid'
    },
    {
      id: '4',
      name: 'Aisha Yusuf',
      avatar: 'AY',
      email: 'aisha.yusuf@email.com',
      phone: '+234-804-567-8901',
      bankName: 'First Bank',
      accountNumber: '5556667778',
      jobType: 'enterprise',
      jobsCompleted: 38,
      grossAmount: 1900000,
      platformFee: 190000,
      netPayable: 1710000,
      status: 'failed'
    },
    {
      id: '5',
      name: 'Tunde Adekunle',
      avatar: 'TA',
      email: 'tunde.adekunle@email.com',
      phone: '+234-805-678-9012',
      bankName: 'UBA',
      accountNumber: '9998887776',
      jobType: 'disposal',
      jobsCompleted: 25,
      grossAmount: 1250000,
      platformFee: 125000,
      netPayable: 1125000,
      status: 'held'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      name: `Agent ${i + 6}`,
      avatar: `A${i + 6}`,
      email: `agent${i + 6}@email.com`,
      phone: `+234-80${i + 6}-${100 + i}-${200 + i}`,
      bankName: ['GTBank', 'Zenith Bank', 'Access Bank', 'First Bank', 'UBA'][i % 5],
      accountNumber: `${Math.random().toString(36).substr(2, 10).toUpperCase()}`,
      jobType: ['enterprise', 'disposal', 'subscription'][i % 3] as 'enterprise' | 'disposal' | 'subscription',
      jobsCompleted: 20 + (i * 2),
      grossAmount: 1000000 + (i * 50000),
      platformFee: 100000 + (i * 5000),
      netPayable: 900000 + (i * 45000),
      status: ['pending', 'processing', 'paid', 'failed', 'held'][i % 5] as 'pending' | 'processing' | 'paid' | 'failed' | 'held'
    }))
  ];

  const filteredAgents = useMemo(() => {
    return mockAgents.filter(agent => {
      const matchesSearch = searchQuery === '' || 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
      const matchesType = typeFilter === 'all' || agent.jobType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [mockAgents, searchQuery, statusFilter, typeFilter]);

  const paginatedAgents = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredAgents.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAgents, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredAgents.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'failed': return 'error';
      case 'held': return 'error';
      default: return 'default';
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'enterprise': return 'primary';
      case 'disposal': return 'warning';
      case 'subscription': return 'success';
      default: return 'default';
    }
  };

  const getJobTypeIcon = (type: string) => {
    switch (type) {
      case 'enterprise': return <IconBuilding size={16} />;
      case 'disposal': return <IconTrash size={16} />;
      case 'subscription': return <IconCalendar size={16} />;
      default: return null;
    }
  };

  const handleApprovePayout = (agent: AgentData) => {
    // Approve payout logic would be implemented here
    console.log(`Approving payout for ${agent.name}`);
  };

  const handleHoldPayout = (agent: AgentData) => {
    setSelectedAgent(agent);
    setHoldDialogOpen(true);
  };

  const confirmHoldPayout = () => {
    if (selectedAgent && holdReason) {
      // Hold payout logic would be implemented here
      console.log(`Holding payout for ${selectedAgent.name}. Reason: ${holdReason}`);
      setHoldDialogOpen(false);
      setHoldReason('');
      setSelectedAgent(null);
    }
  };

  const handleExport = () => {
    const headers = [
      'Agent',
      'Job Type',
      'Jobs Completed',
      'Gross Amount (₦)',
      'Platform Fee (₦)',
      'Net Payable (₦)',
      'Status'
    ];

    const rows = paginatedAgents.map(item => [
      item.name,
      item.jobType,
      item.jobsCompleted.toString(),
      item.grossAmount.toString(),
      item.platformFee.toString(),
      item.netPayable.toString(),
      item.status
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'payable-agents.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Payable Agents">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search agent name or email..."
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
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="held">Held</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Job Type</InputLabel>
            <Select
              value={typeFilter}
              label="Job Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="enterprise">Enterprise</MenuItem>
              <MenuItem value="disposal">Disposal</MenuItem>
              <MenuItem value="subscription">Subscription</MenuItem>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Agent</TableCell>
                <TableCell>Job Type</TableCell>
                <TableCell align="right">Jobs Completed</TableCell>
                <TableCell align="right">Gross Amount (₦)</TableCell>
                <TableCell align="right">Platform Fee (₦)</TableCell>
                <TableCell align="right">Net Payable (₦)</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAgents.map((agent) => (
                <TableRow
                  key={agent.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(agent)}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                          fontSize: '0.875rem',
                          fontWeight: 600
                        }}
                      >
                        {agent.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {agent.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {agent.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getJobTypeIcon(agent.jobType)}
                      <Chip
                        size="small"
                        label={agent.jobType}
                        color={getJobTypeColor(agent.jobType) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {agent.jobsCompleted}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      ₦{agent.grossAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary">
                      ₦{agent.platformFee.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700} color="primary.main">
                      ₦{agent.netPayable.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      color={getStatusColor(agent.status) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="View payout breakdown">
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
                      {agent.status === 'pending' && (
                        <>
                          <Tooltip title="Approve payout">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApprovePayout(agent);
                              }}
                            >
                              <IconCheck size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hold payout">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleHoldPayout(agent);
                              }}
                            >
                              <IconX size={16} />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredAgents.length)} of {filteredAgents.length} agents
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
      </Box>

      {/* Hold Payout Dialog */}
      <Dialog open={holdDialogOpen} onClose={() => setHoldDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Hold Payout</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Agent: {selectedAgent?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Amount: ₦{selectedAgent?.netPayable?.toLocaleString()}
          </Typography>
          <MuiTextField
            label="Reason for holding payout"
            multiline
            rows={4}
            fullWidth
            value={holdReason}
            onChange={(e) => setHoldReason(e.target.value)}
            placeholder="Please provide a reason for holding this payout..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHoldDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={confirmHoldPayout} 
            variant="contained" 
            color="error"
            disabled={!holdReason.trim()}
          >
            Hold Payout
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardCard>
  );
};

export default PayableAgentsTable;
