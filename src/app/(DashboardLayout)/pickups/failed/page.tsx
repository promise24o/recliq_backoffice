'use client';

import React, { useState, useEffect } from 'react';
import {
  Alert,
  Snackbar,
  Box,
  Stack,
} from '@mui/material';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import FailedPageHeader from './components/FailedPageHeader';
import FailureSummaryCards from './components/FailureSummaryCards';
import FailureDistributionCharts from './components/FailureDistributionCharts';
import FailedPickupsTable from './components/FailedPickupsTable';
import FailureDetailDrawer from './components/FailureDetailDrawer';
import FailureInsightsAnalytics from './components/FailureInsightsAnalytics';

// Types
interface FailedPickup {
  id: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  city: string;
  zone: string;
  address: string;
  pickupMode: 'pickup' | 'dropoff';
  matchType: 'auto' | 'user';
  wasteType: string;
  estimatedWeight: number;
  status: 'failed' | 'cancelled';
  failureReason: string;
  timeToFailure: number;
  assignedAgent?: string;
  agentPhone?: string;
  triggerSource: 'user' | 'agent' | 'system';
  createdAt: string;
  failedAt: string;
  matchingAttempts: number;
  agentsNotified: number;
  slaCountdown: number;
  availabilitySnapshot: any;
  distanceConstraints: any;
  agentReliability: any;
}

interface FailureStats {
  totalFailedPickups: number;
  userCancellations: number;
  agentCancellations: number;
  timeoutFailures: number;
  slaBreaches: number;
  highFailureZones: number;
}

// Mock Data
const mockFailedPickups: FailedPickup[] = [
  {
    id: 'FAIL001',
    userName: 'Chidi Amadi',
    userPhone: '+2348031234567',
    userEmail: 'chidi@example.com',
    city: 'Port Harcourt',
    zone: 'GRA',
    address: '45 Forces Avenue, GRA',
    pickupMode: 'pickup',
    matchType: 'auto',
    wasteType: 'plastic',
    estimatedWeight: 15.0,
    status: 'failed',
    failureReason: 'no_agent',
    timeToFailure: 15,
    assignedAgent: undefined,
    triggerSource: 'system',
    createdAt: '2024-01-25 10:30:00',
    failedAt: '2024-01-25 10:45:00',
    matchingAttempts: 12,
    agentsNotified: 8,
    slaCountdown: 0,
    availabilitySnapshot: { availableAgents: 0, radius: 5 },
    distanceConstraints: { maxDistance: 5 },
    agentReliability: {},
  },
  {
    id: 'FAIL002',
    userName: 'Ngozi Eze',
    userPhone: '+2348123456789',
    userEmail: 'ngozi@example.com',
    city: 'Port Harcourt',
    zone: 'Trans-Amadi',
    address: '12 Trans-Amadi Industrial Layout',
    pickupMode: 'dropoff',
    matchType: 'user',
    wasteType: 'mixed',
    estimatedWeight: 20.0,
    status: 'cancelled',
    failureReason: 'user_cancelled',
    timeToFailure: 8,
    assignedAgent: 'Sadiq Bello',
    agentPhone: '+2348123456789',
    triggerSource: 'user',
    createdAt: '2024-01-25 11:15:00',
    failedAt: '2024-01-25 11:23:00',
    matchingAttempts: 3,
    agentsNotified: 2,
    slaCountdown: 12,
    availabilitySnapshot: { availableAgents: 3, radius: 5 },
    distanceConstraints: { maxDistance: 5 },
    agentReliability: { reliability: 85 },
  },
  {
    id: 'FAIL003',
    userName: 'Tunde Adebayo',
    userPhone: '+2347069876543',
    userEmail: 'tunde@example.com',
    city: 'Port Harcourt',
    zone: 'Old GRA',
    address: '28 Old GRA Road',
    pickupMode: 'pickup',
    matchType: 'auto',
    wasteType: 'organic',
    estimatedWeight: 18.0,
    status: 'failed',
    failureReason: 'timeout',
    timeToFailure: 30,
    assignedAgent: undefined,
    triggerSource: 'system',
    createdAt: '2024-01-25 14:20:00',
    failedAt: '2024-01-25 14:50:00',
    matchingAttempts: 25,
    agentsNotified: 15,
    slaCountdown: 0,
    availabilitySnapshot: { availableAgents: 1, radius: 5 },
    distanceConstraints: { maxDistance: 5 },
    agentReliability: {},
  },
];

const mockFailureStats: FailureStats = {
  totalFailedPickups: 342,
  userCancellations: 127,
  agentCancellations: 89,
  timeoutFailures: 76,
  slaBreaches: 34,
  highFailureZones: 12,
};

const mockFailureBreakdownData = [
  { reason: 'No Agent Available', count: 156, color: 'error' },
  { reason: 'User Cancelled', count: 127, color: 'warning' },
  { reason: 'Agent Rejection', count: 45, color: 'secondary' },
  { reason: 'Timeout', count: 76, color: 'info' },
  { reason: 'Agent No-Show', count: 23, color: 'error' },
  { reason: 'System Error', count: 15, color: 'error' },
];

const mockTrendData = [
  { date: 'Jan 20', cancelled: 18, failed: 24 },
  { date: 'Jan 21', cancelled: 22, failed: 31 },
  { date: 'Jan 22', cancelled: 15, failed: 19 },
  { date: 'Jan 23', cancelled: 28, failed: 35 },
  { date: 'Jan 24', cancelled: 21, failed: 28 },
  { date: 'Jan 25', cancelled: 19, failed: 26 },
];

const mockInsightsData = {
  cityFailureData: [
    { name: 'Port Harcourt', totalPickups: 1247, failures: 234, failureRate: 18.8 },
    { name: 'Lagos', totalPickups: 892, failures: 167, failureRate: 18.7 },
    { name: 'Abuja', totalPickups: 623, failures: 98, failureRate: 15.7 },
  ],
  modeFailureData: [
    { mode: 'pickup', totalPickups: 1567, failures: 298, failureRate: 19.0 },
    { mode: 'dropoff', totalPickups: 1195, failures: 201, failureRate: 16.8 },
  ],
  matchTypeData: [
    { type: 'auto', totalPickups: 1892, failures: 367, failureRate: 19.4 },
    { type: 'user', totalPickups: 870, failures: 132, failureRate: 15.2 },
  ],
  peakHourData: [
    { timeRange: '6:00-9:00', totalPickups: 234, failures: 67, failureRate: 28.6 },
    { timeRange: '9:00-12:00', totalPickups: 456, failures: 89, failureRate: 19.5 },
    { timeRange: '12:00-15:00', totalPickups: 378, failures: 56, failureRate: 14.8 },
    { timeRange: '15:00-18:00', totalPickups: 423, failures: 78, failureRate: 18.4 },
    { timeRange: '18:00-21:00', totalPickups: 267, failures: 82, failureRate: 30.7 },
  ],
  agentVsSystemData: [
    { source: 'Agent-driven', totalPickups: 892, failures: 156, failureRate: 17.5 },
    { source: 'User-driven', totalPickups: 678, failures: 127, failureRate: 18.7 },
    { source: 'System-driven', totalPickups: 1192, failures: 216, failureRate: 18.1 },
  ],
};

// Main Component
const FailedPickupsPage: React.FC = () => {
  const [pickups, setPickups] = useState<FailedPickup[]>(mockFailedPickups);
  const [stats, setStats] = useState<FailureStats>(mockFailureStats);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('last7');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedPickupMode, setSelectedPickupMode] = useState('all');
  const [selectedMatchType, setSelectedMatchType] = useState('all');
  const [selectedFailureType, setSelectedFailureType] = useState('all');
  const [selectedReason, setSelectedReason] = useState('all');
  const [selectedBreakdown, setSelectedBreakdown] = useState('daily');
  const [selectedPickup, setSelectedPickup] = useState<FailedPickup | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });

  // Breadcrumb
  const BCrumb = [
    { to: '/', title: 'Dashboard' },
    { to: '/pickups', title: 'Pickups & Recycling' },
    { title: 'Failed / Cancelled Pickups' },
  ];

  // Filter pickups
  const filteredPickups = pickups.filter((pickup) => {
    const matchesCity = selectedCity === 'all' || pickup.city === selectedCity;
    const matchesZone = selectedZone === 'all' || pickup.zone === selectedZone;
    const matchesMode = selectedPickupMode === 'all' || pickup.pickupMode === selectedPickupMode;
    const matchesType = selectedMatchType === 'all' || pickup.matchType === selectedMatchType;
    const matchesFailureType = selectedFailureType === 'all' || pickup.status === selectedFailureType;
    const matchesReason = selectedReason === 'all' || pickup.failureReason === selectedReason;
    
    return matchesCity && matchesZone && matchesMode && matchesType && matchesFailureType && matchesReason;
  });

  // Handle export
  const handleExport = () => {
    setNotification({ open: true, message: 'Exporting failure data...', severity: 'info' });
  };

  // Handle pickup click
  const handlePickupClick = (pickup: FailedPickup) => {
    setSelectedPickup(pickup);
    setDrawerOpen(true);
  };

  // Handle drawer actions
  const handleRecreateRequest = () => {
    setNotification({ open: true, message: 'Pickup request recreated successfully', severity: 'success' });
    setDrawerOpen(false);
  };

  const handleConvertMode = () => {
    setNotification({ open: true, message: 'Mode conversion initiated', severity: 'info' });
    setDrawerOpen(false);
  };

  const handleOfferIncentive = () => {
    setNotification({ open: true, message: 'Incentive offer sent to user', severity: 'success' });
    setDrawerOpen(false);
  };

  const handleFlagAgent = () => {
    setNotification({ open: true, message: 'Agent flagged for review', severity: 'warning' });
    setDrawerOpen(false);
  };

  const handleMarkResolved = () => {
    setNotification({ open: true, message: 'Issue marked as resolved', severity: 'success' });
    setDrawerOpen(false);
  };

  return (
    <PageContainer title="Failed / Cancelled Pickups" description="Pickup requests that did not complete">
      <Breadcrumb title="Failed / Cancelled Pickups" items={BCrumb} />

      {/* Page Header */}
      <FailedPageHeader
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedZone={selectedZone}
        onZoneChange={setSelectedZone}
        selectedPickupMode={selectedPickupMode}
        onPickupModeChange={setSelectedPickupMode}
        selectedMatchType={selectedMatchType}
        onMatchTypeChange={setSelectedMatchType}
        selectedFailureType={selectedFailureType}
        onFailureTypeChange={setSelectedFailureType}
        selectedReason={selectedReason}
        onReasonChange={setSelectedReason}
        onExport={handleExport}
      />

      {/* Failure Summary Cards */}
      <Box sx={{ mt: 3 }}>
        <FailureSummaryCards stats={stats} />
      </Box>

      {/* Failure Distribution & Trend Analysis */}
      <Box sx={{ mt: 3 }}>
        <FailureDistributionCharts
          failureBreakdownData={mockFailureBreakdownData}
          trendData={mockTrendData}
          selectedBreakdown={selectedBreakdown}
          onBreakdownChange={setSelectedBreakdown}
        />
      </Box>

      {/* Failed / Cancelled Pickups Table */}
      <Box sx={{ mt: 3 }}>
        <FailedPickupsTable
          pickups={filteredPickups}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onPickupClick={handlePickupClick}
        />
      </Box>

      {/* Failure Insights & Prevention Analytics */}
      <Box sx={{ mt: 3 }}>
        <FailureInsightsAnalytics {...mockInsightsData} />
      </Box>

      {/* Failure Detail Drawer */}
      <FailureDetailDrawer
        pickup={selectedPickup}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onRecreateRequest={handleRecreateRequest}
        onConvertMode={handleConvertMode}
        onOfferIncentive={handleOfferIncentive}
        onFlagAgent={handleFlagAgent}
        onMarkResolved={handleMarkResolved}
      />

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity} onClose={() => setNotification({ ...notification, open: false })}>
          {notification.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default FailedPickupsPage;
