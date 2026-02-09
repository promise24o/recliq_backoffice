'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  Chip,
} from '@mui/material';
import {
  IconClock,
  IconMap,
  IconUsers,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerStop,
  IconCalendar,
  IconAlertTriangle,
  IconDownload,
  IconRefresh,
  IconFilter,
  IconWifi,
  IconWifiOff,
} from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import AvailabilitySummaryCards from './components/AvailabilitySummaryCards';
import CityZoneCoverageMap from './components/CityZoneCoverageMap';
import AvailabilityTrend from './components/AvailabilityTrend';
import AgentAvailabilityTable from './components/AgentAvailabilityTable';
import AgentAvailabilityDetailDrawer from './components/AgentAvailabilityDetailDrawer';
import AvailabilityInsights from './components/AvailabilityInsights';

interface AgentAvailability {
  id: string;
  name: string;
  city: string;
  zone: string;
  currentStatus: 'available' | 'busy' | 'idle' | 'offline' | 'suspended';
  lastActive: string;
  avgAvailability: number;
  idleTimeToday: number;
  assignedPickupsToday: number;
  agentType: 'individual' | 'fleet';
  scheduledHours: string;
  actualOnlineDuration: number;
  pickupsAcceptedWhileOnline: number;
  missedAssignments: number;
  reliabilityScore: number;
  peakHourParticipation: number;
}

interface ZoneCoverage {
  zone: string;
  availableAgents: number;
  totalAgents: number;
  demandLevel: 'low' | 'medium' | 'high' | 'critical';
  coverageLevel: 'healthy' | 'strained' | 'critical' | 'dead';
  avgResponseTime: number;
}

interface AvailabilitySummary {
  availableAgents: number;
  idleAgents: number;
  busyAgents: number;
  unavailableAgents: number;
  scheduledAvailability: number;
  lowCoverageZones: number;
  supplyShortageAlerts: number;
}

interface AvailabilityTrend {
  timestamp: string;
  availablePercentage: number;
  scheduledPercentage: number;
  busyPercentage: number;
  offlinePercentage: number;
}

// Mock Data
const getMockAgents = (): AgentAvailability[] => [
  {
    id: 'AGT001',
    name: 'Samuel Kamau',
    city: 'Lagos',
    zone: 'Mainland',
    currentStatus: 'available',
    lastActive: '2024-01-15T10:30:00Z',
    avgAvailability: 85.2,
    idleTimeToday: 120,
    assignedPickupsToday: 8,
    agentType: 'individual',
    scheduledHours: '08:00-18:00',
    actualOnlineDuration: 420,
    pickupsAcceptedWhileOnline: 8,
    missedAssignments: 1,
    reliabilityScore: 92,
    peakHourParticipation: 88
  },
  {
    id: 'AGT002',
    name: 'Grace Okafor',
    city: 'Lagos',
    zone: 'Island',
    currentStatus: 'busy',
    lastActive: '2024-01-15T10:25:00Z',
    avgAvailability: 91.5,
    idleTimeToday: 45,
    assignedPickupsToday: 12,
    agentType: 'individual',
    scheduledHours: '07:00-19:00',
    actualOnlineDuration: 480,
    pickupsAcceptedWhileOnline: 12,
    missedAssignments: 0,
    reliabilityScore: 96,
    peakHourParticipation: 94
  },
  {
    id: 'AGT003',
    name: 'Ahmed Bello',
    city: 'Abuja',
    zone: 'Central',
    currentStatus: 'idle',
    lastActive: '2024-01-15T10:15:00Z',
    avgAvailability: 78.3,
    idleTimeToday: 180,
    assignedPickupsToday: 5,
    agentType: 'fleet',
    scheduledHours: '09:00-17:00',
    actualOnlineDuration: 360,
    pickupsAcceptedWhileOnline: 5,
    missedAssignments: 2,
    reliabilityScore: 85,
    peakHourParticipation: 72
  },
  {
    id: 'AGT004',
    name: 'Chioma Eze',
    city: 'Port Harcourt',
    zone: 'Rivers',
    currentStatus: 'offline',
    lastActive: '2024-01-15T09:45:00Z',
    avgAvailability: 88.7,
    idleTimeToday: 0,
    assignedPickupsToday: 0,
    agentType: 'individual',
    scheduledHours: '08:00-16:00',
    actualOnlineDuration: 0,
    pickupsAcceptedWhileOnline: 0,
    missedAssignments: 0,
    reliabilityScore: 90,
    peakHourParticipation: 85
  }
];

const getMockZoneCoverage = (): ZoneCoverage[] => [
  { zone: 'Lagos Mainland', availableAgents: 12, totalAgents: 15, demandLevel: 'high', coverageLevel: 'strained', avgResponseTime: 8 },
  { zone: 'Lagos Island', availableAgents: 8, totalAgents: 10, demandLevel: 'medium', coverageLevel: 'healthy', avgResponseTime: 6 },
  { zone: 'Abuja Central', availableAgents: 6, totalAgents: 8, demandLevel: 'medium', coverageLevel: 'healthy', avgResponseTime: 7 },
  { zone: 'Port Harcourt', availableAgents: 2, totalAgents: 6, demandLevel: 'high', coverageLevel: 'critical', avgResponseTime: 15 },
  { zone: 'Kano Municipal', availableAgents: 1, totalAgents: 5, demandLevel: 'critical', coverageLevel: 'dead', avgResponseTime: 25 }
];

const getMockSummary = (): AvailabilitySummary => ({
  availableAgents: 29,
  idleAgents: 8,
  busyAgents: 15,
  unavailableAgents: 12,
  scheduledAvailability: 85,
  lowCoverageZones: 3,
  supplyShortageAlerts: 2
});

const getMockTrends = (): AvailabilityTrend[] => [
  { timestamp: '2024-01-15T06:00:00Z', availablePercentage: 55, scheduledPercentage: 40, busyPercentage: 15, offlinePercentage: 30 },
  { timestamp: '2024-01-15T08:00:00Z', availablePercentage: 45, scheduledPercentage: 60, busyPercentage: 25, offlinePercentage: 30 },
  { timestamp: '2024-01-15T10:00:00Z', availablePercentage: 35, scheduledPercentage: 85, busyPercentage: 45, offlinePercentage: 20 },
  { timestamp: '2024-01-15T12:00:00Z', availablePercentage: 28, scheduledPercentage: 90, busyPercentage: 52, offlinePercentage: 20 },
  { timestamp: '2024-01-15T14:00:00Z', availablePercentage: 32, scheduledPercentage: 85, busyPercentage: 48, offlinePercentage: 20 },
  { timestamp: '2024-01-15T16:00:00Z', availablePercentage: 38, scheduledPercentage: 70, busyPercentage: 32, offlinePercentage: 30 }
];

const AvailabilityStatusPage: React.FC = () => {
  const [agents, setAgents] = useState<AgentAvailability[]>(getMockAgents());
  const [zoneCoverage, setZoneCoverage] = useState<ZoneCoverage[]>(getMockZoneCoverage());
  const [summary, setSummary] = useState<AvailabilitySummary>(getMockSummary());
  const [trends, setTrends] = useState<AvailabilityTrend[]>(getMockTrends());
  const [loading, setLoading] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedAgentType, setSelectedAgentType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<AgentAvailability | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' });

  const mockAgents: AgentAvailability[] = [
    {
      id: 'AGT001',
      name: 'Samuel Kamau',
      city: 'Lagos',
      zone: 'Mainland',
      currentStatus: 'available',
      lastActive: '2024-01-15T10:30:00Z',
      avgAvailability: 85.2,
      idleTimeToday: 120,
      assignedPickupsToday: 8,
      agentType: 'individual',
      scheduledHours: '08:00-18:00',
      actualOnlineDuration: 420,
      pickupsAcceptedWhileOnline: 8,
      missedAssignments: 1,
      reliabilityScore: 92,
      peakHourParticipation: 88
    },
    {
      id: 'AGT002',
      name: 'Grace Okafor',
      city: 'Lagos',
      zone: 'Island',
      currentStatus: 'busy',
      lastActive: '2024-01-15T10:25:00Z',
      avgAvailability: 91.5,
      idleTimeToday: 45,
      assignedPickupsToday: 12,
      agentType: 'individual',
      scheduledHours: '07:00-19:00',
      actualOnlineDuration: 480,
      pickupsAcceptedWhileOnline: 12,
      missedAssignments: 0,
      reliabilityScore: 96,
      peakHourParticipation: 94
    },
    {
      id: 'AGT003',
      name: 'Ahmed Bello',
      city: 'Abuja',
      zone: 'Central',
      currentStatus: 'idle',
      lastActive: '2024-01-15T10:15:00Z',
      avgAvailability: 78.3,
      idleTimeToday: 180,
      assignedPickupsToday: 4,
      agentType: 'fleet',
      scheduledHours: '09:00-17:00',
      actualOnlineDuration: 360,
      pickupsAcceptedWhileOnline: 4,
      missedAssignments: 2,
      reliabilityScore: 82,
      peakHourParticipation: 76
    },
    {
      id: 'AGT004',
      name: 'Chioma Eze',
      city: 'Port Harcourt',
      zone: 'Rivers',
      currentStatus: 'offline',
      lastActive: '2024-01-15T08:45:00Z',
      avgAvailability: 65.7,
      idleTimeToday: 0,
      assignedPickupsToday: 0,
      agentType: 'individual',
      scheduledHours: '08:00-16:00',
      actualOnlineDuration: 240,
      pickupsAcceptedWhileOnline: 0,
      missedAssignments: 3,
      reliabilityScore: 71,
      peakHourParticipation: 68
    }
  ];

  const mockZoneCoverage: ZoneCoverage[] = [
    { zone: 'Lagos Mainland', availableAgents: 12, totalAgents: 18, demandLevel: 'high', coverageLevel: 'strained', avgResponseTime: 8 },
    { zone: 'Lagos Island', availableAgents: 8, totalAgents: 10, demandLevel: 'medium', coverageLevel: 'healthy', avgResponseTime: 6 },
    { zone: 'Abuja Central', availableAgents: 6, totalAgents: 8, demandLevel: 'medium', coverageLevel: 'healthy', avgResponseTime: 7 },
    { zone: 'Port Harcourt', availableAgents: 2, totalAgents: 6, demandLevel: 'low', coverageLevel: 'critical', avgResponseTime: 15 },
    { zone: 'Kano Municipal', availableAgents: 1, totalAgents: 4, demandLevel: 'low', coverageLevel: 'dead', avgResponseTime: 25 }
  ];

  const mockSummary: AvailabilitySummary = {
    availableAgents: 29,
    idleAgents: 8,
    busyAgents: 15,
    unavailableAgents: 12,
    scheduledAvailability: 46,
    lowCoverageZones: 3,
    supplyShortageAlerts: 2
  };

  const mockTrends: AvailabilityTrend[] = [
    { timestamp: '2024-01-15T06:00:00Z', availablePercentage: 15, scheduledPercentage: 20, busyPercentage: 5, offlinePercentage: 80 },
    { timestamp: '2024-01-15T08:00:00Z', availablePercentage: 45, scheduledPercentage: 60, busyPercentage: 25, offlinePercentage: 30 },
    { timestamp: '2024-01-15T10:00:00Z', availablePercentage: 35, scheduledPercentage: 85, busyPercentage: 45, offlinePercentage: 20 },
    { timestamp: '2024-01-15T12:00:00Z', availablePercentage: 28, scheduledPercentage: 90, busyPercentage: 52, offlinePercentage: 20 },
    { timestamp: '2024-01-15T14:00:00Z', availablePercentage: 32, scheduledPercentage: 85, busyPercentage: 48, offlinePercentage: 20 },
    { timestamp: '2024-01-15T16:00:00Z', availablePercentage: 38, scheduledPercentage: 70, busyPercentage: 32, offlinePercentage: 30 }
  ];

  // Filter agents based on selections
  const filteredAgents = agents.filter(agent => {
    const cityMatch = selectedCity === 'all' || agent.city.toLowerCase() === selectedCity.toLowerCase();
    const zoneMatch = selectedZone === 'all' || agent.zone.toLowerCase() === selectedZone.toLowerCase();
    const typeMatch = selectedAgentType === 'all' || agent.agentType === selectedAgentType;
    const statusMatch = selectedStatus === 'all' || agent.currentStatus === selectedStatus;
    return cityMatch && zoneMatch && typeMatch && statusMatch;
  });

  const handleAgentClick = (agent: AgentAvailability) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({
        open: true,
        message: 'Availability data refreshed successfully',
        severity: 'success'
      });
    }, 1000);
  };

  const handleExport = () => {
    setNotification({
      open: true,
      message: 'Exporting availability data to CSV...',
      severity: 'success'
    });
  };

  const handleAgentAction = (action: string, agent: AgentAvailability) => {
    setNotification({
      open: true,
      message: `${action} action for ${agent.name}`,
      severity: 'success'
    });
  };

  return (
    <PageContainer title="Availability Status" description="Real-time agent readiness & city coverage">
      <Breadcrumb title="Availability Status" subtitle="Real-time agent readiness & city coverage" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Availability Status
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  Real-time agent supply health
                </Typography>
                <Chip
                  label={isLiveMode ? 'LIVE' : 'SNAPSHOT'}
                  color={isLiveMode ? 'success' : 'default'}
                  size="small"
                  icon={isLiveMode ? <IconWifi size={14} /> : <IconWifiOff size={14} />}
                />
              </Stack>
            </Box>
            <Stack direction="row" spacing={2}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>City</InputLabel>
                <Select
                  value={selectedCity}
                  label="City"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <MenuItem value="all">All Cities</MenuItem>
                  <MenuItem value="lagos">Lagos</MenuItem>
                  <MenuItem value="abuja">Abuja</MenuItem>
                  <MenuItem value="port-harcourt">Port Harcourt</MenuItem>
                  <MenuItem value="kano">Kano</MenuItem>
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
                  <MenuItem value="mainland">Mainland</MenuItem>
                  <MenuItem value="island">Island</MenuItem>
                  <MenuItem value="central">Central</MenuItem>
                  <MenuItem value="rivers">Rivers</MenuItem>
                  <MenuItem value="municipal">Municipal</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Agent Type</InputLabel>
                <Select
                  value={selectedAgentType}
                  label="Agent Type"
                  onChange={(e) => setSelectedAgentType(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="fleet">Fleet</MenuItem>
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
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="busy">Busy</MenuItem>
                  <MenuItem value="idle">Idle</MenuItem>
                  <MenuItem value="offline">Offline</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                startIcon={<IconDownload size={16} />}
                onClick={handleExport}
              >
                Export
              </Button>
              <Button
                variant="outlined"
                startIcon={<IconRefresh size={16} />}
                onClick={handleRefresh}
                disabled={loading}
              >
                Refresh
              </Button>
            </Stack>
          </Stack>
        </DashboardCard>
      </Box>

      {/* Summary Cards */}
      <Box mt={3}>
        <AvailabilitySummaryCards summary={summary} />
      </Box>

      {/* Main Content Grid */}
      <Box mt={3}>
        <Stack spacing={3}>
          {/* City Zone Coverage Map */}
          <CityZoneCoverageMap 
            zoneCoverage={zoneCoverage}
            selectedCity={selectedCity}
            selectedZone={selectedZone}
          />

          {/* Availability Trend */}
          <AvailabilityTrend trends={trends} />

          {/* Agent Availability Table */}
          <AgentAvailabilityTable 
            agents={filteredAgents}
            onAgentClick={handleAgentClick}
          />

          {/* Availability Insights */}
          <AvailabilityInsights 
            agents={agents}
            zoneCoverage={zoneCoverage}
          />
        </Stack>
      </Box>

      {/* Agent Detail Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {selectedAgent && (
          <AgentAvailabilityDetailDrawer
            agent={selectedAgent}
            onClose={() => setIsDrawerOpen(false)}
            onAgentAction={handleAgentAction}
          />
        )}
      </Drawer>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default AvailabilityStatusPage;
