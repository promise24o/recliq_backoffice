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
  Chip,
  Avatar,
  IconButton,
  Menu,
  Badge,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Package,
  Search,
  Filter,
  Download,
  RefreshCw,
  Map,
  Clock,
  User,
  Check,
  X,
  AlertTriangle,
  Walk,
  Car,
  Route,
  Calendar,
  MapPin,
  MoreVertical,
  Eye,
  Edit,
  Ban,
  Play,
  ArrowUpDown,
  Flag,
  Activity,
  TrendingUp,
} from 'lucide-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import PickupRequestSummaryCards from './components/PickupRequestSummaryCards';
import PickupRequestMap from './components/PickupRequestMap';
import PickupRequestFunnel from './components/PickupRequestFunnel';
import PickupRequestsTable from './components/PickupRequestsTable';
import PickupRequestDetailDrawer from './components/PickupRequestDetailDrawer';
import FailureDelayAnalysis from './components/FailureDelayAnalysis';

// Types
interface PickupRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  city: string;
  zone: string;
  pickupMode: 'pickup' | 'dropoff';
  matchType: 'auto' | 'user_selected';
  wasteType: 'plastic' | 'paper' | 'metal' | 'glass' | 'organic' | 'e_waste' | 'mixed';
  estimatedWeight: number;
  status: 'new' | 'matching' | 'assigned' | 'agent_en_route' | 'arrived' | 'completed' | 'cancelled' | 'failed';
  createdAt: string;
  assignedAgentId?: string;
  assignedAgentName?: string;
  slaDeadline: string;
  pricing: {
    baseAmount: number;
    bonusAmount: number;
    totalAmount: number;
    currency: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  notes?: string;
  matchingTimeline: MatchingEvent[];
  failureReason?: string;
  delayReason?: string;
}

interface MatchingEvent {
  id: string;
  type: 'matching_started' | 'agent_notified' | 'agent_accepted' | 'agent_rejected' | 'reassigned' | 'timeout';
  timestamp: string;
  agentId?: string;
  agentName?: string;
  details: string;
}

interface RequestSummary {
  newRequests: number;
  matchingInProgress: number;
  assignedPickups: number;
  dropoffRequests: number;
  atRiskSLA: number;
  failedRequests: number;
  completedToday: number;
}

interface FunnelData {
  stage: string;
  count: number;
  percentage: number;
  breakdown: {
    pickup: number;
    dropoff: number;
    auto: number;
    userSelected: number;
  };
}

interface FailureAnalysis {
  totalFailures: number;
  failureReasons: {
    noAvailableAgent: number;
    agentRejection: number;
    timeout: number;
    userCancellation: number;
  };
  delayCauses: {
    supplyShortage: number;
    distance: number;
    peakHourCongestion: number;
    agentFlakiness: number;
  };
  cityBreakdown: Record<string, {
    failures: number;
    delays: number;
    totalRequests: number;
  }>;
}

// Mock Data
const mockPickupRequests: PickupRequest[] = [
  {
    id: 'REQ001',
    userId: 'USR001',
    userName: 'John Smith',
    userPhone: '+2348012345678',
    city: 'Lagos',
    zone: 'Ikoyi',
    pickupMode: 'pickup',
    matchType: 'auto',
    wasteType: 'plastic',
    estimatedWeight: 5.2,
    status: 'assigned',
    createdAt: '2024-01-15T10:30:00Z',
    assignedAgentId: 'AGT001',
    assignedAgentName: 'Samuel Kamau',
    slaDeadline: '2024-01-15T11:30:00Z',
    pricing: {
      baseAmount: 50,
      bonusAmount: 10,
      totalAmount: 60,
      currency: 'NGN'
    },
    coordinates: { lat: 6.4524, lng: 3.4158 },
    address: '123 Awolowo Road, Ikoyi',
    notes: 'Gate code: #1234',
    matchingTimeline: [
      {
        id: 'MATCH001',
        type: 'matching_started',
        timestamp: '2024-01-15T10:30:00Z',
        details: 'Auto-matching initiated'
      },
      {
        id: 'MATCH002',
        type: 'agent_notified',
        timestamp: '2024-01-15T10:31:00Z',
        agentId: 'AGT001',
        agentName: 'Samuel Kamau',
        details: 'Agent notified of request'
      },
      {
        id: 'MATCH003',
        type: 'agent_accepted',
        timestamp: '2024-01-15T10:32:00Z',
        agentId: 'AGT001',
        agentName: 'Samuel Kamau',
        details: 'Agent accepted pickup request'
      }
    ]
  },
  {
    id: 'REQ002',
    userId: 'USR002',
    userName: 'Mary Johnson',
    userPhone: '+2348023456789',
    city: 'Lagos',
    zone: 'Victoria Island',
    pickupMode: 'dropoff',
    matchType: 'user_selected',
    wasteType: 'paper',
    estimatedWeight: 3.8,
    status: 'new',
    createdAt: '2024-01-15T10:45:00Z',
    slaDeadline: '2024-01-15T12:45:00Z',
    pricing: {
      baseAmount: 35,
      bonusAmount: 5,
      totalAmount: 40,
      currency: 'NGN'
    },
    coordinates: { lat: 6.4281, lng: 3.4219 },
    address: '456 Ahmadu Bello Way, Victoria Island',
    matchingTimeline: [
      {
        id: 'MATCH004',
        type: 'matching_started',
        timestamp: '2024-01-15T10:45:00Z',
        details: 'User selected agent for drop-off'
      }
    ]
  },
  {
    id: 'REQ003',
    userId: 'USR003',
    userName: 'David Kimani',
    userPhone: '+2348034567890',
    city: 'Abuja',
    zone: 'Maitama',
    pickupMode: 'pickup',
    matchType: 'auto',
    wasteType: 'metal',
    estimatedWeight: 8.5,
    status: 'matching',
    createdAt: '2024-01-15T09:15:00Z',
    slaDeadline: '2024-01-15T10:15:00Z',
    pricing: {
      baseAmount: 80,
      bonusAmount: 15,
      totalAmount: 95,
      currency: 'NGN'
    },
    coordinates: { lat: 9.0765, lng: 7.3986 },
    address: '789 Mambilla Street, Maitama',
    matchingTimeline: [
      {
        id: 'MATCH005',
        type: 'matching_started',
        timestamp: '2024-01-15T09:15:00Z',
        details: 'Auto-matching initiated'
      },
      {
        id: 'MATCH006',
        type: 'agent_rejected',
        timestamp: '2024-01-15T09:20:00Z',
        agentId: 'AGT002',
        agentName: 'Grace Okafor',
        details: 'Agent rejected due to distance'
      },
      {
        id: 'MATCH007',
        type: 'reassigned',
        timestamp: '2024-01-15T09:21:00Z',
        details: 'Reassigned to next available agent'
      }
    ]
  },
  {
    id: 'REQ004',
    userId: 'USR004',
    userName: 'Grace Wanjiru',
    userPhone: '+2348045678901',
    city: 'Port Harcourt',
    zone: 'GRA',
    pickupMode: 'pickup',
    matchType: 'auto',
    wasteType: 'e_waste',
    estimatedWeight: 2.1,
    status: 'failed',
    createdAt: '2024-01-15T08:00:00Z',
    slaDeadline: '2024-01-15T09:00:00Z',
    failureReason: 'timeout',
    pricing: {
      baseAmount: 60,
      bonusAmount: 20,
      totalAmount: 80,
      currency: 'NGN'
    },
    coordinates: { lat: 4.8156, lng: 7.0498 },
    address: '321 Aba Road, GRA',
    matchingTimeline: [
      {
        id: 'MATCH008',
        type: 'matching_started',
        timestamp: '2024-01-15T08:00:00Z',
        details: 'Auto-matching initiated'
      },
      {
        id: 'MATCH009',
        type: 'timeout',
        timestamp: '2024-01-15T09:00:00Z',
        details: 'No agents available within SLA'
      }
    ]
  },
  {
    id: 'REQ005',
    userId: 'USR005',
    userName: 'James Muriithi',
    userPhone: '+2348056789012',
    city: 'Kano',
    zone: 'Sabon Gari',
    pickupMode: 'dropoff',
    matchType: 'user_selected',
    wasteType: 'mixed',
    estimatedWeight: 6.7,
    status: 'completed',
    createdAt: '2024-01-15T07:30:00Z',
    assignedAgentId: 'AGT003',
    assignedAgentName: 'Ahmed Bello',
    slaDeadline: '2024-01-15T09:30:00Z',
    pricing: {
      baseAmount: 70,
      bonusAmount: 12,
      totalAmount: 82,
      currency: 'NGN'
    },
    coordinates: { lat: 11.9604, lng: 8.5219 },
    address: '654 Market Road, Sabon Gari',
    matchingTimeline: [
      {
        id: 'MATCH010',
        type: 'matching_started',
        timestamp: '2024-01-15T07:30:00Z',
        details: 'User selected agent for drop-off'
      },
      {
        id: 'MATCH011',
        type: 'agent_accepted',
        timestamp: '2024-01-15T07:31:00Z',
        agentId: 'AGT003',
        agentName: 'Ahmed Bello',
        details: 'Drop-off arrangement confirmed'
      }
    ]
  }
];

const mockRequestSummary: RequestSummary = {
  newRequests: 12,
  matchingInProgress: 8,
  assignedPickups: 23,
  dropoffRequests: 15,
  atRiskSLA: 4,
  failedRequests: 2,
  completedToday: 45
};

const mockFunnelData: FunnelData[] = [
  {
    stage: 'Request Created',
    count: 100,
    percentage: 100,
    breakdown: { pickup: 65, dropoff: 35, auto: 70, userSelected: 30 }
  },
  {
    stage: 'Matching Started',
    count: 95,
    percentage: 95,
    breakdown: { pickup: 60, dropoff: 35, auto: 65, userSelected: 30 }
  },
  {
    stage: 'Agent Notified',
    count: 88,
    percentage: 88,
    breakdown: { pickup: 55, dropoff: 33, auto: 58, userSelected: 30 }
  },
  {
    stage: 'Agent Accepted',
    count: 75,
    percentage: 75,
    breakdown: { pickup: 45, dropoff: 30, auto: 48, userSelected: 27 }
  },
  {
    stage: 'Arrival Confirmed',
    count: 68,
    percentage: 68,
    breakdown: { pickup: 40, dropoff: 28, auto: 43, userSelected: 25 }
  },
  {
    stage: 'Pickup Completed',
    count: 62,
    percentage: 62,
    breakdown: { pickup: 38, dropoff: 24, auto: 40, userSelected: 22 }
  }
];

const mockFailureAnalysis: FailureAnalysis = {
  totalFailures: 15,
  failureReasons: {
    noAvailableAgent: 8,
    agentRejection: 4,
    timeout: 2,
    userCancellation: 1
  },
  delayCauses: {
    supplyShortage: 12,
    distance: 8,
    peakHourCongestion: 6,
    agentFlakiness: 3
  },
  cityBreakdown: {
    'Nairobi': { failures: 8, delays: 15, totalRequests: 120 },
    'Mombasa': { failures: 3, delays: 7, totalRequests: 45 },
    'Kisumu': { failures: 2, delays: 4, totalRequests: 28 },
    'Nakuru': { failures: 2, delays: 3, totalRequests: 22 }
  }
};

// Main Component
const PickupRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<PickupRequest[]>(mockPickupRequests);
  const [summary, setSummary] = useState<RequestSummary>(mockRequestSummary);
  const [funnelData, setFunnelData] = useState<FunnelData[]>(mockFunnelData);
  const [failureAnalysis, setFailureAnalysis] = useState<FailureAnalysis>(mockFailureAnalysis);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'live' | 'snapshot'>('live');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedPickupMode, setSelectedPickupMode] = useState('all');
  const [selectedMatchType, setSelectedMatchType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWasteType, setSelectedWasteType] = useState('all');
  const [timeRange, setTimeRange] = useState('today');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedRequest, setSelectedRequest] = useState<PickupRequest | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });

  // Filter requests based on search and filters
  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.userPhone.includes(searchTerm) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || request.city === selectedCity;
    const matchesZone = selectedZone === 'all' || request.zone === selectedZone;
    const matchesPickupMode = selectedPickupMode === 'all' || request.pickupMode === selectedPickupMode;
    const matchesMatchType = selectedMatchType === 'all' || request.matchType === selectedMatchType;
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesWasteType = selectedWasteType === 'all' || request.wasteType === selectedWasteType;
    
    return matchesSearch && matchesCity && matchesZone && matchesPickupMode && matchesMatchType && matchesStatus && matchesWasteType;
  });

  const handleRequestClick = (request: PickupRequest) => {
    setSelectedRequest(request);
    setIsDrawerOpen(true);
    // Log access for security
    console.log(`Pickup request accessed: ${request.id} by ${'current_user'}`);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedRequest(null);
  };

  const handleRequestAction = (action: string, request: PickupRequest, reason?: string) => {
    // Handle different request actions
    switch (action) {
      case 'retrigger_matching':
        setNotification({
          open: true,
          message: `Re-triggered matching for request ${request.id}`,
          severity: 'success'
        });
        break;
      case 'manual_assign':
        setNotification({
          open: true,
          message: `Manual assignment initiated for request ${request.id}`,
          severity: 'info'
        });
        break;
      case 'convert_mode':
        setNotification({
          open: true,
          message: `Converted ${request.pickupMode} to ${request.pickupMode === 'pickup' ? 'dropoff' : 'pickup'} for request ${request.id}`,
          severity: 'warning'
        });
        break;
      case 'cancel':
        setNotification({
          open: true,
          message: `Request ${request.id} cancelled: ${reason}`,
          severity: 'error'
        });
        break;
      case 'escalate':
        setNotification({
          open: true,
          message: `Request ${request.id} escalated to ops lead`,
          severity: 'warning'
        });
        break;
      default:
        break;
    }
    handleDrawerClose();
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    setNotification({
      open: true,
      message: `Exporting pickup requests as ${format.toUpperCase()} - Access logged`,
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
        message: 'Pickup requests refreshed successfully',
        severity: 'success'
      });
    }, 1000);
  };

  const handleSummaryCardClick = (filterType: string) => {
    // Set filters based on clicked card
    switch (filterType) {
      case 'new':
        setSelectedStatus('new');
        break;
      case 'matching':
        setSelectedStatus('matching');
        break;
      case 'assigned':
        setSelectedStatus('assigned');
        break;
      case 'dropoff':
        setSelectedPickupMode('dropoff');
        break;
      case 'at_risk':
        setSelectedStatus('assigned');
        break;
      case 'failed':
        setSelectedStatus('failed');
        break;
      case 'completed':
        setSelectedStatus('completed');
        break;
      default:
        break;
    }
  };

  return (
    <PageContainer title="Pickup Requests" description="Live recycling demand & fulfillment pipeline">
      <Breadcrumb title="Pickup Requests" subtitle="Live recycling demand & fulfillment pipeline" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Pickup Requests
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Live recycling demand & fulfillment pipeline
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, newMode) => newMode && setViewMode(newMode)}
                size="small"
              >
                <ToggleButton value="live">
                  <Activity size={16} style={{ marginRight: 4 }} />
                  Live
                </ToggleButton>
                <ToggleButton value="snapshot">
                  <Clock size={16} style={{ marginRight: 4 }} />
                  Snapshot
                </ToggleButton>
              </ToggleButtonGroup>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  label="Time Range"
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="yesterday">Yesterday</MenuItem>
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                startIcon={<RefreshCw size={16} />}
                onClick={handleRefresh}
                disabled={loading}
              >
                Refresh
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Download size={16} />}
                onClick={() => handleExport('csv')}
              >
                CSV
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Download size={16} />}
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
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <TextField
                placeholder="Search by request ID, user name, or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search size={16} style={{ marginRight: 8 }} />,
                }}
                sx={{ minWidth: 300 }}
              />
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>City</InputLabel>
                <Select
                  value={selectedCity}
                  label="City"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <MenuItem value="all">All Cities</MenuItem>
                  <MenuItem value="Nairobi">Nairobi</MenuItem>
                  <MenuItem value="Mombasa">Mombasa</MenuItem>
                  <MenuItem value="Kisumu">Kisumu</MenuItem>
                  <MenuItem value="Nakuru">Nakuru</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Zone</InputLabel>
                <Select
                  value={selectedZone}
                  label="Zone"
                  onChange={(e) => setSelectedZone(e.target.value)}
                >
                  <MenuItem value="all">All Zones</MenuItem>
                  <MenuItem value="Westlands">Westlands</MenuItem>
                  <MenuItem value="Karen">Karen</MenuItem>
                  <MenuItem value="Town Center">Town Center</MenuItem>
                  <MenuItem value="CBD">CBD</MenuItem>
                  <MenuItem value="Industrial Area">Industrial Area</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>Pickup Mode</InputLabel>
                <Select
                  value={selectedPickupMode}
                  label="Pickup Mode"
                  onChange={(e) => setSelectedPickupMode(e.target.value)}
                >
                  <MenuItem value="all">All Modes</MenuItem>
                  <MenuItem value="pickup">Agent → User (Pickup)</MenuItem>
                  <MenuItem value="dropoff">User → Agent (Drop-off)</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>Match Type</InputLabel>
                <Select
                  value={selectedMatchType}
                  label="Match Type"
                  onChange={(e) => setSelectedMatchType(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="auto">Auto-matched</MenuItem>
                  <MenuItem value="user_selected">User-selected</MenuItem>
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
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="matching">Matching</MenuItem>
                  <MenuItem value="assigned">Assigned</MenuItem>
                  <MenuItem value="agent_en_route">Agent En Route</MenuItem>
                  <MenuItem value="arrived">Arrived</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Waste Type</InputLabel>
                <Select
                  value={selectedWasteType}
                  label="Waste Type"
                  onChange={(e) => setSelectedWasteType(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="plastic">Plastic</MenuItem>
                  <MenuItem value="paper">Paper</MenuItem>
                  <MenuItem value="metal">Metal</MenuItem>
                  <MenuItem value="glass">Glass</MenuItem>
                  <MenuItem value="organic">Organic</MenuItem>
                  <MenuItem value="e_waste">E-Waste</MenuItem>
                  <MenuItem value="mixed">Mixed</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </DashboardCard>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Pickup Request Summary Cards */}
      <Box mt={3}>
        <PickupRequestSummaryCards 
          summary={summary} 
          onCardClick={handleSummaryCardClick}
        />
      </Box>

      {/* Live Pickup Request Map */}
      <Box mt={3}>
        <PickupRequestMap 
          requests={filteredRequests}
          showAgents={false}
        />
      </Box>

      {/* Pickup Request Flow Funnel */}
      <Box mt={3}>
        <PickupRequestFunnel data={funnelData} />
      </Box>

      {/* Pickup Requests Table */}
      <Box mt={3}>
        <PickupRequestsTable
          requests={filteredRequests}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRequestClick={handleRequestClick}
        />
      </Box>

      {/* Failure & Delay Analysis */}
      <Box mt={3}>
        <FailureDelayAnalysis data={failureAnalysis} />
      </Box>

      {/* Pickup Request Detail Drawer */}
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
        <PickupRequestDetailDrawer
          request={selectedRequest}
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          onRequestAction={handleRequestAction}
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

export default PickupRequestsPage;
