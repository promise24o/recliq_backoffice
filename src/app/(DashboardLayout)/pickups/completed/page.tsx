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
import CompletedPageHeader from './components/CompletedPageHeader';
import CompletionSummaryCards from './components/CompletionSummaryCards';
import CompletionTrendCharts from './components/CompletionTrendCharts';
import CompletedPickupsTable from './components/CompletedPickupsTable';
import CompletedPickupDetailDrawer from './components/CompletedPickupDetailDrawer';
import QualityAnomalyInsights from './components/QualityAnomalyInsights';

// Types
interface CompletedPickup {
  id: string;
  completionDate: string;
  userName: string;
  userPhone: string;
  agentName: string;
  agentPhone: string;
  city: string;
  zone: string;
  address: string;
  pickupMode: 'pickup' | 'dropoff';
  matchType: 'auto' | 'user';
  wasteType: string;
  estimatedWeight: number;
  finalWeight: number;
  weightVariance: number;
  userPayout: number;
  agentEarnings: number;
  platformFee: number;
  pricePerKg: number;
  grossValue: number;
  completionTime: number;
  walletTransactionId: string;
  kgRecycled: number;
  co2Saved: number;
  sdgContribution: string;
  photoEvidence?: string[];
  userConfirmation: boolean;
  agentConfirmation: boolean;
  status: 'completed';
}

interface CompletionStats {
  totalCompleted: number;
  totalWeightCollected: number;
  totalPayouts: number;
  platformRevenue: number;
  avgCompletionTime: number;
  postCompletionIssues: number;
}

// Mock Data
const mockCompletedPickups: CompletedPickup[] = [
  {
    id: 'CMP001',
    completionDate: '2024-01-25',
    userName: 'Chidi Amadi',
    userPhone: '+2348031234567',
    agentName: 'Sadiq Bello',
    agentPhone: '+2348123456789',
    city: 'Port Harcourt',
    zone: 'GRA',
    address: '45 Forces Avenue, GRA',
    pickupMode: 'pickup',
    matchType: 'auto',
    wasteType: 'plastic',
    estimatedWeight: 15.0,
    finalWeight: 15.5,
    weightVariance: 3.3,
    userPayout: 0,
    agentEarnings: 3100,
    platformFee: 1550,
    pricePerKg: 300,
    grossValue: 4650,
    completionTime: 45,
    walletTransactionId: 'TXN001',
    kgRecycled: 15.5,
    co2Saved: 23.25,
    sdgContribution: 'SDG 12, 13',
    photoEvidence: ['photo1.jpg', 'photo2.jpg'],
    userConfirmation: true,
    agentConfirmation: true,
    status: 'completed',
  },
  {
    id: 'CMP002',
    completionDate: '2024-01-25',
    userName: 'Ngozi Eze',
    userPhone: '+2348123456789',
    agentName: 'Ngozi Okafor',
    agentPhone: '+2348069876543',
    city: 'Port Harcourt',
    zone: 'Trans-Amadi',
    address: '12 Trans-Amadi Industrial Layout',
    pickupMode: 'dropoff',
    matchType: 'user',
    wasteType: 'mixed',
    estimatedWeight: 20.0,
    finalWeight: 22.0,
    weightVariance: 10.0,
    userPayout: 0,
    agentEarnings: 4400,
    platformFee: 2200,
    pricePerKg: 300,
    grossValue: 6600,
    completionTime: 32,
    walletTransactionId: 'TXN002',
    kgRecycled: 22.0,
    co2Saved: 33.0,
    sdgContribution: 'SDG 12, 13',
    photoEvidence: ['photo3.jpg'],
    userConfirmation: true,
    agentConfirmation: true,
    status: 'completed',
  },
  {
    id: 'CMP003',
    completionDate: '2024-01-25',
    userName: 'Tunde Adebayo',
    userPhone: '+2347069876543',
    agentName: 'Ahmed Ibrahim',
    agentPhone: '+2349056789012',
    city: 'Port Harcourt',
    zone: 'Old GRA',
    address: '28 Old GRA Road',
    pickupMode: 'pickup',
    matchType: 'auto',
    wasteType: 'organic',
    estimatedWeight: 18.0,
    finalWeight: 18.2,
    weightVariance: 1.1,
    userPayout: 0,
    agentEarnings: 3640,
    platformFee: 1820,
    pricePerKg: 300,
    grossValue: 5460,
    completionTime: 28,
    walletTransactionId: 'TXN003',
    kgRecycled: 18.2,
    co2Saved: 27.3,
    sdgContribution: 'SDG 12, 13',
    photoEvidence: ['photo4.jpg', 'photo5.jpg'],
    userConfirmation: true,
    agentConfirmation: true,
    status: 'completed',
  },
];

const mockCompletionStats: CompletionStats = {
  totalCompleted: 1247,
  totalWeightCollected: 15678,
  totalPayouts: 3135600,
  platformRevenue: 1567800,
  avgCompletionTime: 35,
  postCompletionIssues: 23,
};

const mockTimeSeriesData = [
  { date: 'Jan 20', completed: 45, weight: 678 },
  { date: 'Jan 21', completed: 52, weight: 789 },
  { date: 'Jan 22', completed: 48, weight: 712 },
  { date: 'Jan 23', completed: 61, weight: 923 },
  { date: 'Jan 24', completed: 58, weight: 876 },
  { date: 'Jan 25', completed: 67, weight: 1024 },
];

const mockBreakdownData = [
  { name: 'Port Harcourt', completed: 423, weight: 5678 },
  { name: 'Lagos', completed: 389, weight: 4892 },
  { name: 'Abuja', completed: 435, weight: 5108 },
];

const mockQualityData = {
  weightVarianceData: [
    { range: '0-10%', count: 856, maxVariance: 10 },
    { range: '10-20%', count: 267, maxVariance: 20 },
    { range: '20-30%', count: 89, maxVariance: 30 },
    { range: '30%+', count: 35, maxVariance: 50 },
  ],
  highVarianceAgents: [
    { name: 'Agent A', totalPickups: 45, avgVariance: 35.2, riskLevel: 'high' },
    { name: 'Agent B', totalPickups: 38, avgVariance: 28.7, riskLevel: 'medium' },
    { name: 'Agent C', totalPickups: 52, avgVariance: 12.3, riskLevel: 'low' },
  ],
  repeatDisputes: [
    { user: 'User X', disputeCount: 3, lastDispute: '2024-01-24', status: 'active' },
    { user: 'User Y', disputeCount: 2, lastDispute: '2024-01-22', status: 'resolved' },
  ],
  timeOutliers: [
    { pickupId: 'OUT001', agent: 'Agent D', completionTime: 245, deviation: '+180 min' },
    { pickupId: 'OUT002', agent: 'Agent E', completionTime: 198, deviation: '+133 min' },
  ],
};

// Main Component
const CompletedPickupsPage: React.FC = () => {
  const [pickups, setPickups] = useState<CompletedPickup[]>(mockCompletedPickups);
  const [stats, setStats] = useState<CompletionStats>(mockCompletionStats);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('last7');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedPickupMode, setSelectedPickupMode] = useState('all');
  const [selectedMatchType, setSelectedMatchType] = useState('all');
  const [selectedWasteType, setSelectedWasteType] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedBreakdown, setSelectedBreakdown] = useState('city');
  const [selectedPickup, setSelectedPickup] = useState<CompletedPickup | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });

  // Breadcrumb
  const BCrumb = [
    { to: '/', title: 'Dashboard' },
    { to: '/pickups', title: 'Pickups & Recycling' },
    { title: 'Completed Pickups' },
  ];

  // Filter pickups
  const filteredPickups = pickups.filter((pickup) => {
    const matchesCity = selectedCity === 'all' || pickup.city === selectedCity;
    const matchesZone = selectedZone === 'all' || pickup.zone === selectedZone;
    const matchesMode = selectedPickupMode === 'all' || pickup.pickupMode === selectedPickupMode;
    const matchesType = selectedMatchType === 'all' || pickup.matchType === selectedMatchType;
    const matchesWaste = selectedWasteType === 'all' || pickup.wasteType === selectedWasteType;
    const matchesAgent = selectedAgent === '' || pickup.agentName.toLowerCase().includes(selectedAgent.toLowerCase());
    
    return matchesCity && matchesZone && matchesMode && matchesType && matchesWaste && matchesAgent;
  });

  // Handle export
  const handleExport = (format: 'csv' | 'finance') => {
    setNotification({ open: true, message: `Exporting as ${format.toUpperCase()}...`, severity: 'info' });
  };

  // Handle pickup click
  const handlePickupClick = (pickup: CompletedPickup) => {
    setSelectedPickup(pickup);
    setDrawerOpen(true);
  };

  // Handle drawer actions
  const handleOpenDispute = () => {
    setNotification({ open: true, message: 'Dispute opened successfully', severity: 'warning' });
    setDrawerOpen(false);
  };

  const handleFlagAnomaly = () => {
    setNotification({ open: true, message: 'Anomaly flagged for review', severity: 'warning' });
    setDrawerOpen(false);
  };

  const handleAdjustRecords = () => {
    setNotification({ open: true, message: 'Record adjustment initiated', severity: 'info' });
    setDrawerOpen(false);
  };

  const handleExportReceipt = () => {
    setNotification({ open: true, message: 'Receipt exported successfully', severity: 'success' });
  };

  return (
    <PageContainer title="Completed Pickups" description="Verified recycling pickups successfully fulfilled">
      <Breadcrumb title="Completed Pickups" items={BCrumb} />

      {/* Page Header */}
      <CompletedPageHeader
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
        selectedWasteType={selectedWasteType}
        onWasteTypeChange={setSelectedWasteType}
        selectedAgent={selectedAgent}
        onAgentChange={setSelectedAgent}
        onExport={handleExport}
      />

      {/* Completion Summary Cards */}
      <Box sx={{ mt: 3 }}>
        <CompletionSummaryCards stats={stats} />
      </Box>

      {/* Completion Trend & Output Charts */}
      <Box sx={{ mt: 3 }}>
        <CompletionTrendCharts
          timeSeriesData={mockTimeSeriesData}
          breakdownData={mockBreakdownData}
          selectedBreakdown={selectedBreakdown}
          onBreakdownChange={setSelectedBreakdown}
        />
      </Box>

      {/* Completed Pickups Table */}
      <Box sx={{ mt: 3 }}>
        <CompletedPickupsTable
          pickups={filteredPickups}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onPickupClick={handlePickupClick}
        />
      </Box>

      {/* Quality & Anomaly Insights */}
      <Box sx={{ mt: 3 }}>
        <QualityAnomalyInsights {...mockQualityData} />
      </Box>

      {/* Completed Pickup Detail Drawer */}
      <CompletedPickupDetailDrawer
        pickup={selectedPickup}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenDispute={handleOpenDispute}
        onFlagAnomaly={handleFlagAnomaly}
        onAdjustRecords={handleAdjustRecords}
        onExportReceipt={handleExportReceipt}
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

export default CompletedPickupsPage;
