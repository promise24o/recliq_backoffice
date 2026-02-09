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
} from '@mui/material';
import {
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import PerformanceOverviewCards from './components/PerformanceOverviewCards';
import PerformanceTrends from '@/app/(DashboardLayout)/agents/performance/components/PerformanceTrends';
import EfficiencyQuality from '@/app/(DashboardLayout)/agents/performance/components/EfficiencyQuality';
import AreaPerformance from '@/app/(DashboardLayout)/agents/performance/components/AreaPerformance';
import EarningsIncentives from '@/app/(DashboardLayout)/agents/performance/components/EarningsIncentives';
import EnvironmentalImpact from '@/app/(DashboardLayout)/agents/performance/components/EnvironmentalImpact';
import AttentionRequired from '@/app/(DashboardLayout)/agents/performance/components/AttentionRequired';
import AgentLeaderboard from '@/app/(DashboardLayout)/agents/performance/components/AgentLeaderboard';

interface AgentPerformance {
  id: string;
  name: string;
  avatar: string;
  area: string;
  pickups: number;
  avgRating: number;
  avgETA: number;
  completionRate: number;
  earnings: number;
  ecoScore: number;
  status: 'active' | 'on_duty' | 'offline';
  acceptanceSpeed: number;
  disputeRate: number;
  repeatUserRate: number;
}

interface PerformanceSummary {
  activeAgents: number;
  onDutyToday: number;
  utilizationRate: number;
  completedPickups: number;
  avgResponseTime: number;
  completionRate: number;
  disputeRate: number;
  totalAgentEarnings: number;
}

interface PerformanceTrend {
  date: string;
  pickups: number;
  completionRate: number;
  avgResponseTime: number;
  disputeRate: number;
}

interface AreaPerformance {
  area: string;
  activeAgents: number;
  pickups: number;
  avgETA: number;
  successRate: number;
  demandIndex: number;
}

// Mock Data
const mockAgents: AgentPerformance[] = [
  {
    id: 'AGT001',
    name: 'Samuel Kamau',
    avatar: '/avatars/agent1.jpg',
    area: 'Lagos Mainland',
    pickups: 145,
    avgRating: 4.8,
    avgETA: 12,
    completionRate: 96.5,
    earnings: 285000,
    ecoScore: 92,
    status: 'on_duty',
    acceptanceSpeed: 8,
    disputeRate: 1.2,
    repeatUserRate: 78
  },
  {
    id: 'AGT002',
    name: 'Grace Okafor',
    avatar: '/avatars/agent2.jpg',
    area: 'Abuja Central',
    pickups: 132,
    avgRating: 4.9,
    avgETA: 10,
    completionRate: 98.2,
    earnings: 278000,
    ecoScore: 95,
    status: 'on_duty',
    acceptanceSpeed: 6,
    disputeRate: 0.8,
    repeatUserRate: 82
  },
  {
    id: 'AGT003',
    name: 'Ahmed Bello',
    avatar: '/avatars/agent3.jpg',
    area: 'Kano Municipal',
    pickups: 118,
    avgRating: 4.6,
    avgETA: 15,
    completionRate: 94.1,
    earnings: 245000,
    ecoScore: 88,
    status: 'active',
    acceptanceSpeed: 12,
    disputeRate: 2.1,
    repeatUserRate: 71
  },
  {
    id: 'AGT004',
    name: 'Chioma Eze',
    avatar: '/avatars/agent4.jpg',
    area: 'Port Harcourt',
    pickups: 156,
    avgRating: 4.7,
    avgETA: 11,
    completionRate: 95.8,
    earnings: 312000,
    ecoScore: 90,
    status: 'on_duty',
    acceptanceSpeed: 7,
    disputeRate: 1.5,
    repeatUserRate: 75
  }
];

const mockSummary: PerformanceSummary = {
  activeAgents: 214,
  onDutyToday: 167,
  utilizationRate: 78.1,
  completedPickups: 1284,
  avgResponseTime: 12,
  completionRate: 94.2,
  disputeRate: 2.3,
  totalAgentEarnings: 26498000
};

const mockTrends: PerformanceTrend[] = [
  { date: '2024-01-01', pickups: 45, completionRate: 93.5, avgResponseTime: 14, disputeRate: 2.8 },
  { date: '2024-01-02', pickups: 52, completionRate: 94.2, avgResponseTime: 12, disputeRate: 2.3 },
  { date: '2024-01-03', pickups: 48, completionRate: 95.1, avgResponseTime: 11, disputeRate: 2.1 },
  { date: '2024-01-04', pickups: 58, completionRate: 94.8, avgResponseTime: 13, disputeRate: 2.5 },
  { date: '2024-01-05', pickups: 61, completionRate: 95.3, avgResponseTime: 10, disputeRate: 1.9 },
  { date: '2024-01-06', pickups: 55, completionRate: 94.7, avgResponseTime: 12, disputeRate: 2.2 }
];

const mockAreaPerformance: AreaPerformance[] = [
  { area: 'Lagos Mainland', activeAgents: 45, pickups: 412, avgETA: 11, successRate: 95.2, demandIndex: 8.7 },
  { area: 'Lagos Island', activeAgents: 32, pickups: 298, avgETA: 9, successRate: 96.1, demandIndex: 9.2 },
  { area: 'Abuja Central', activeAgents: 28, pickups: 267, avgETA: 10, successRate: 94.8, demandIndex: 7.8 },
  { area: 'Port Harcourt', activeAgents: 24, pickups: 189, avgETA: 13, successRate: 93.5, demandIndex: 6.9 },
  { area: 'Kano Municipal', activeAgents: 19, pickups: 145, avgETA: 15, successRate: 92.1, demandIndex: 5.8 }
];

const PerformanceSummaryPage: React.FC = () => {
  const [agents, setAgents] = useState<AgentPerformance[]>(mockAgents);
  const [summary, setSummary] = useState<PerformanceSummary>(mockSummary);
  const [trends, setTrends] = useState<PerformanceTrend[]>(mockTrends);
  const [areaPerformance, setAreaPerformance] = useState<AreaPerformance[]>(mockAreaPerformance);
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedArea, setSelectedArea] = useState('all');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({
        open: true,
        message: 'Performance data refreshed successfully',
        severity: 'success'
      });
    }, 1000);
  };

  const handleExport = () => {
    setNotification({
      open: true,
      message: 'Exporting performance data to CSV...',
      severity: 'success'
    });
  };

  const handleAgentAction = (action: string, agent: AgentPerformance) => {
    setNotification({
      open: true,
      message: `${action} action for ${agent.name}`,
      severity: 'success'
    });
  };

  return (
    <PageContainer title="Performance Summary" description="Agent productivity, quality, reliability, and earnings overview">
      <Breadcrumb title="Performance Summary" subtitle="Agent productivity, quality, reliability, and earnings overview" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Performance Summary
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-time agent performance metrics and analytics
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Period</InputLabel>
                <Select
                  value={selectedPeriod}
                  label="Period"
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Area</InputLabel>
                <Select
                  value={selectedArea}
                  label="Area"
                  onChange={(e) => setSelectedArea(e.target.value)}
                >
                  <MenuItem value="all">All Areas</MenuItem>
                  <MenuItem value="lagos">Lagos</MenuItem>
                  <MenuItem value="abuja">Abuja</MenuItem>
                  <MenuItem value="port-harcourt">Port Harcourt</MenuItem>
                  <MenuItem value="kano">Kano</MenuItem>
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

      {/* Performance Overview Cards */}
      <Box mt={3}>
        <PerformanceOverviewCards summary={summary} />
      </Box>

      {/* Performance Trends */}
      <Box mt={3}>
        <PerformanceTrends trends={trends} period={selectedPeriod} />
      </Box>

      {/* Agent Leaderboard */}
      <Box mt={3}>
        <AgentLeaderboard 
          agents={agents} 
          onAgentAction={handleAgentAction}
        />
      </Box>

      {/* Efficiency & Quality */}
      <Box mt={3}>
        <EfficiencyQuality agents={agents} />
      </Box>

      {/* Area Performance */}
      <Box mt={3}>
        <AreaPerformance 
          areaData={areaPerformance}
          selectedArea={selectedArea}
        />
      </Box>

      {/* Earnings & Incentives */}
      <Box mt={3}>
        <EarningsIncentives agents={agents} />
      </Box>

      {/* Environmental Impact */}
      <Box mt={3}>
        <EnvironmentalImpact agents={agents} />
      </Box>

      {/* Attention Required */}
      <Box mt={3}>
        <AttentionRequired agents={agents} />
      </Box>

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

export default PerformanceSummaryPage;
