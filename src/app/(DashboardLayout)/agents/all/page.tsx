'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  LinearProgress,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  CardContent,
} from '@mui/material';
import {
  IconUser,
  IconSearch,
  IconFilter,
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import AgentSummaryCards from './components/AgentSummaryCards';
import AgentsTable from './components/AgentsTable';
import AgentDetailDrawer from './components/AgentDetailDrawer';

// Types
interface Agent {
  id: string;
  name: string;
  phone: string;
  photo: string;
  city: string;
  zone: string;
  status: 'active' | 'idle' | 'en_route' | 'offline' | 'suspended' | 'flagged';
  tier: 'regular' | 'power_agent' | 'enterprise';
  kycStatus: 'not_started' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired';
  vehicleType: 'bicycle' | 'motorcycle' | 'van' | 'truck';
  performanceTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  activePickups: number;
  todayCompleted: number;
  completionRate: number;
  avgPickupTime: number;
  walletBalance: number;
  currentPickup?: {
    id: string;
    address: string;
    estimatedTime: string;
  };
  lastCompletedPickup?: {
    id: string;
    address: string;
    completedAt: string;
  };
  timeSinceLastActivity: string;
  disputes: number;
  userRating: number;
  reliabilityScore: number;
  escrow: number;
  pendingPayouts: number;
  flags: number;
  suspensions: number;
  complaints: number;
  notes: string;
}

interface AgentSummary {
  totalAgents: number;
  activeAgents: number;
  idleAgents: number;
  suspendedAgents: number;
  flaggedAgents: number;
  avgCompletionRate: number;
  avgComplexity: number;
}

// Mock Data
const mockAgents: Agent[] = [
  {
    id: 'AGT001',
    name: 'Samuel Kamau',
    phone: '+254712345678',
    photo: '/images/agents/agent1.jpg',
    city: 'Nairobi',
    zone: 'Westlands',
    status: 'active',
    tier: 'power_agent',
    kycStatus: 'approved',
    vehicleType: 'motorcycle',
    performanceTier: 'gold',
    activePickups: 2,
    todayCompleted: 8,
    completionRate: 94.5,
    avgPickupTime: 18,
    walletBalance: 2450.00,
    currentPickup: {
      id: 'PU1234',
      address: 'Westlands Mall, Nairobi',
      estimatedTime: '12:45 PM'
    },
    lastCompletedPickup: {
      id: 'PU1233',
      address: 'Sarit Centre, Nairobi',
      completedAt: '2024-01-15T11:30:00Z'
    },
    timeSinceLastActivity: '5 min',
    disputes: 1,
    userRating: 4.8,
    reliabilityScore: 92,
    escrow: 150.00,
    pendingPayouts: 850.00,
    flags: 0,
    suspensions: 0,
    complaints: 1,
    notes: 'Excellent performer, handles complex pickups well'
  },
  {
    id: 'AGT002',
    name: 'Grace Wanjiru',
    phone: '+254723456789',
    photo: '/images/agents/agent2.jpg',
    city: 'Nairobi',
    zone: 'Karen',
    status: 'en_route',
    tier: 'regular',
    kycStatus: 'approved',
    vehicleType: 'van',
    performanceTier: 'silver',
    activePickups: 1,
    todayCompleted: 6,
    completionRate: 89.2,
    avgPickupTime: 22,
    walletBalance: 1820.00,
    currentPickup: {
      id: 'PU1235',
      address: 'Karen Shopping Centre, Nairobi',
      estimatedTime: '1:15 PM'
    },
    lastCompletedPickup: {
      id: 'PU1232',
      address: 'Gigiri, Nairobi',
      completedAt: '2024-01-15T10:45:00Z'
    },
    timeSinceLastActivity: '2 min',
    disputes: 0,
    userRating: 4.6,
    reliabilityScore: 88,
    escrow: 75.00,
    pendingPayouts: 620.00,
    flags: 0,
    suspensions: 0,
    complaints: 0,
    notes: 'Reliable, good with residential pickups'
  },
  {
    id: 'AGT003',
    name: 'Michael Ochieng',
    phone: '+254734567890',
    photo: '/images/agents/agent3.jpg',
    city: 'Mombasa',
    zone: 'Town Center',
    status: 'idle',
    tier: 'enterprise',
    kycStatus: 'approved',
    vehicleType: 'truck',
    performanceTier: 'platinum',
    activePickups: 0,
    todayCompleted: 12,
    completionRate: 96.8,
    avgPickupTime: 15,
    walletBalance: 5200.00,
    lastCompletedPickup: {
      id: 'PU1231',
      address: 'Mombasa Port',
      completedAt: '2024-01-15T09:30:00Z'
    },
    timeSinceLastActivity: '45 min',
    disputes: 0,
    userRating: 4.9,
    reliabilityScore: 96,
    escrow: 0.00,
    pendingPayouts: 2100.00,
    flags: 0,
    suspensions: 0,
    complaints: 0,
    notes: 'Top performer, handles large commercial pickups'
  },
  {
    id: 'AGT004',
    name: 'Sarah Mwangi',
    phone: '+254745678901',
    photo: '/images/agents/agent4.jpg',
    city: 'Kisumu',
    zone: 'CBD',
    status: 'flagged',
    tier: 'regular',
    kycStatus: 'approved',
    vehicleType: 'bicycle',
    performanceTier: 'bronze',
    activePickups: 0,
    todayCompleted: 3,
    completionRate: 78.5,
    avgPickupTime: 28,
    walletBalance: 450.00,
    lastCompletedPickup: {
      id: 'PU1230',
      address: 'Kisumu Market',
      completedAt: '2024-01-15T08:15:00Z'
    },
    timeSinceLastActivity: '3 hours',
    disputes: 2,
    userRating: 3.8,
    reliabilityScore: 75,
    escrow: 0.00,
    pendingPayouts: 180.00,
    flags: 1,
    suspensions: 0,
    complaints: 2,
    notes: 'Flagged for repeated delays and customer complaints'
  },
  {
    id: 'AGT005',
    name: 'David Njoroge',
    phone: '+254756789012',
    photo: '/images/agents/agent5.jpg',
    city: 'Nairobi',
    zone: 'Industrial Area',
    status: 'suspended',
    tier: 'regular',
    kycStatus: 'rejected',
    vehicleType: 'motorcycle',
    performanceTier: 'bronze',
    activePickups: 0,
    todayCompleted: 0,
    completionRate: 65.2,
    avgPickupTime: 35,
    walletBalance: 120.00,
    timeSinceLastActivity: '2 days',
    disputes: 3,
    userRating: 2.9,
    reliabilityScore: 65,
    escrow: 0.00,
    pendingPayouts: 0.00,
    flags: 2,
    suspensions: 1,
    complaints: 3,
    notes: 'Suspended for fraud attempt and poor performance'
  }
];

const mockAgentSummary: AgentSummary = {
  totalAgents: 156,
  activeAgents: 89,
  idleAgents: 34,
  suspendedAgents: 8,
  flaggedAgents: 5,
  avgCompletionRate: 87.3,
  avgComplexity: 0.5
};

// Main Component
const AllAgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [summary, setSummary] = useState<AgentSummary>(mockAgentSummary);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedKYC, setSelectedKYC] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' });

  // Filter agents based on search and filters
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.phone.includes(searchTerm) ||
                         agent.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || agent.city === selectedCity;
    const matchesStatus = selectedStatus === 'all' || agent.status === selectedStatus;
    const matchesTier = selectedTier === 'all' || agent.tier === selectedTier;
    const matchesKYC = selectedKYC === 'all' || agent.kycStatus === selectedKYC;
    const matchesVehicle = selectedVehicle === 'all' || agent.vehicleType === selectedVehicle;
    
    return matchesSearch && matchesCity && matchesStatus && matchesTier && matchesKYC && matchesVehicle;
  });

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
    // Log access for security
    console.log(`Agent profile accessed: ${agent.id} by ${'current_user'}`);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedAgent(null);
  };

  const handleAgentAction = (action: string, agent: Agent, reason?: string) => {
    // Handle different agent actions
    switch (action) {
      case 'suspend':
        setNotification({
          open: true,
          message: `Agent ${agent.name} has been suspended`,
          severity: 'error'
        });
        break;
      case 'reinstate':
        setNotification({
          open: true,
          message: `Agent ${agent.name} has been reinstated`,
          severity: 'success'
        });
        break;
      case 'flag':
        setNotification({
          open: true,
          message: `Agent ${agent.name} has been flagged for review`,
          severity: 'warning'
        });
        break;
      case 'move_zone':
        setNotification({
          open: true,
          message: `Agent ${agent.name} zone has been updated`,
          severity: 'success'
        });
        break;
      case 'change_tier':
        setNotification({
          open: true,
          message: `Agent ${agent.name} tier has been updated`,
          severity: 'success'
        });
        break;
      case 'freeze_payouts':
        setNotification({
          open: true,
          message: `Agent ${agent.name} payouts have been frozen`,
          severity: 'error'
        });
        break;
      case 'view':
        // Open drawer for viewing agent details
        setSelectedAgent(agent);
        setIsDrawerOpen(true);
        return; // Don't close drawer for view action
      default:
        break;
    }
    // Only close drawer for actions that modify the agent, not for viewing
    if (action !== 'view') {
      handleDrawerClose();
    }
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    setNotification({
      open: true,
      message: `Exporting agents data as ${format.toUpperCase()}`,
      severity: 'success'
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setNotification({
        open: true,
        message: 'Agent data refreshed successfully',
        severity: 'success'
      });
    }, 1000);
  };

  return (
    <PageContainer title="All Agents" description="Complete agent workforce directory">
      <Breadcrumb title="All Agents" subtitle="Complete agent workforce directory" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                All Agents
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Complete agent workforce directory
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="30days">Last 30 days</MenuItem>
                  <MenuItem value="90days">Last 90 days</MenuItem>
                  <MenuItem value="180days">Last 180 days</MenuItem>
                  <MenuItem value="all">All time</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="outlined"
                startIcon={<IconRefresh size={16} />}
                onClick={handleRefresh}
                disabled={loading}
              >
                Refresh
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<IconDownload size={16} />}
                onClick={() => handleExport('csv')}
              >
                CSV
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<IconDownload size={16} />}
                onClick={() => handleExport('pdf')}
              >
                PDF
              </Button>
            </Stack>
          </Stack>
        </DashboardCard>
      </Box>

      {/* Filters */}
      <Box mt={3}>
        <DashboardCard>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                placeholder="Search by name, phone, or agent ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <IconSearch size={16} style={{ marginRight: 8 }} />,
                }}
                sx={{ minWidth: 300 }}
              />
              
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>City / Zone</InputLabel>
                <Select
                  value={selectedCity}
                  label="City / Zone"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <MenuItem value="all">All Cities</MenuItem>
                  <MenuItem value="Nairobi">Nairobi</MenuItem>
                  <MenuItem value="Mombasa">Mombasa</MenuItem>
                  <MenuItem value="Kisumu">Kisumu</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="idle">Idle</MenuItem>
                  <MenuItem value="en_route">En Route</MenuItem>
                  <MenuItem value="offline">Offline</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                  <MenuItem value="flagged">Flagged</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Tier</InputLabel>
                <Select
                  value={selectedTier}
                  label="Tier"
                  onChange={(e) => setSelectedTier(e.target.value)}
                >
                  <MenuItem value="all">All Tiers</MenuItem>
                  <MenuItem value="regular">Regular</MenuItem>
                  <MenuItem value="power_agent">Power Agent</MenuItem>
                  <MenuItem value="enterprise">Enterprise</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>KYC Status</InputLabel>
                <Select
                  value={selectedKYC}
                  label="KYC Status"
                  onChange={(e) => setSelectedKYC(e.target.value)}
                >
                  <MenuItem value="all">All KYC</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="submitted">Submitted</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Vehicle</InputLabel>
                <Select
                  value={selectedVehicle}
                  label="Vehicle"
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                >
                  <MenuItem value="all">All Vehicles</MenuItem>
                  <MenuItem value="bicycle">Bicycle</MenuItem>
                  <MenuItem value="motorcycle">Motorcycle</MenuItem>
                  <MenuItem value="van">Van</MenuItem>
                  <MenuItem value="truck">Truck</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </DashboardCard>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Agent Summary Cards */}
      <Box mt={3}>
        <AgentSummaryCards 
          summary={summary} 
          onStatusFilter={(status) => setSelectedStatus(status)}
        />
      </Box>

      {/* Agents Table */}
      <Box mt={3}>
        <AgentsTable
          agents={filteredAgents}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onAgentClick={handleAgentClick}
          onAgentAction={handleAgentAction}
        />
      </Box>

      {/* Agent Detail Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 600,
            p: 0,
          },
        }}
      >
        <AgentDetailDrawer
          agent={selectedAgent}
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          onAgentAction={handleAgentAction}
        />
      </Drawer>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default AllAgentsPage;
