'use client';

import React, { useState, useEffect } from 'react';
import {
  Alert,
  Snackbar,
  Box,
} from '@mui/material';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import SchedulePageHeader from './components/SchedulePageHeader';
import ScheduleOverviewCards from './components/ScheduleOverviewCards';
import ScheduleFilters from './components/ScheduleFilters';
import ZoneLoadAnalysis from './components/ZoneLoadAnalysis';
import ScheduledPickupsTable from './components/ScheduledPickupsTable';
import ScheduledPickupDetailDrawer from './components/ScheduledPickupDetailDrawer';

// Types
interface ScheduledPickup {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  city: string;
  zone: string;
  address: string;
  scheduledDate: string;
  scheduledTime: string;
  pickupMode: 'pickup' | 'dropoff';
  wasteType: 'plastic' | 'paper' | 'metal' | 'glass' | 'organic' | 'e_waste' | 'mixed';
  estimatedWeight: number;
  status: 'scheduled' | 'assigned' | 'agent_confirmed' | 'at_risk' | 'cancelled' | 'rescheduled';
  assignedAgentId?: string;
  assignedAgentName?: string;
  agentConfirmationStatus?: 'confirmed' | 'pending' | 'rejected';
  backupAgentId?: string;
  backupAgentName?: string;
  slaRisk: 'low' | 'medium' | 'high' | 'critical';
  timeRemaining: string;
  riskScore: number;
  createdAt: string;
  updatedAt: string;
  rescheduleCount: number;
  cancellationReason?: string;
}

interface ScheduleStats {
  totalScheduled: number;
  assignedToAgent: number;
  unassignedAtRisk: number;
  nextTwoHours: number;
  slaRiskPickups: number;
  cancelledUpcoming: number;
}

interface ZoneLoad {
  zone: string;
  scheduledPickups: number;
  availableAgents: number;
  loadRatio: number;
  riskLevel: 'low' | 'medium' | 'high';
}

// Mock Data
const mockScheduledPickups: ScheduledPickup[] = [
  {
    id: 'SCH001',
    userId: 'USR001',
    userName: 'Chidi Amadi',
    userPhone: '+2348031234567',
    city: 'Port Harcourt',
    zone: 'GRA',
    address: '45 Forces Avenue, GRA',
    scheduledDate: '2024-01-26',
    scheduledTime: '09:00',
    pickupMode: 'pickup',
    wasteType: 'plastic',
    estimatedWeight: 15.5,
    status: 'assigned',
    assignedAgentId: 'AGT001',
    assignedAgentName: 'Sadiq Bello',
    agentConfirmationStatus: 'confirmed',
    slaRisk: 'low',
    timeRemaining: '2h 15m',
    riskScore: 15,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-25T14:30:00Z',
    rescheduleCount: 0,
  },
  {
    id: 'SCH002',
    userId: 'USR002',
    userName: 'Ngozi Eze',
    userPhone: '+2348123456789',
    city: 'Port Harcourt',
    zone: 'Trans-Amadi',
    address: '12 Trans-Amadi Industrial Layout',
    scheduledDate: '2024-01-26',
    scheduledTime: '10:30',
    pickupMode: 'dropoff',
    wasteType: 'mixed',
    estimatedWeight: 22.0,
    status: 'at_risk',
    assignedAgentId: 'AGT002',
    assignedAgentName: 'Ngozi Okafor',
    agentConfirmationStatus: 'pending',
    slaRisk: 'high',
    timeRemaining: '3h 45m',
    riskScore: 75,
    createdAt: '2024-01-21T11:20:00Z',
    updatedAt: '2024-01-25T16:45:00Z',
    rescheduleCount: 1,
  },
  {
    id: 'SCH003',
    userId: 'USR003',
    userName: 'Tunde Adebayo',
    userPhone: '+2347069876543',
    city: 'Port Harcourt',
    zone: 'Old GRA',
    address: '28 Old GRA Road',
    scheduledDate: '2024-01-26',
    scheduledTime: '14:00',
    pickupMode: 'pickup',
    wasteType: 'organic',
    estimatedWeight: 18.2,
    status: 'scheduled',
    slaRisk: 'medium',
    timeRemaining: '7h 15m',
    riskScore: 45,
    createdAt: '2024-01-22T09:15:00Z',
    updatedAt: '2024-01-22T09:15:00Z',
    rescheduleCount: 0,
  },
  {
    id: 'SCH004',
    userId: 'USR004',
    userName: 'Fatima Yusuf',
    userPhone: '+2349056789012',
    city: 'Port Harcourt',
    zone: 'Rumuokoro',
    address: 'Plot 15 Rumuokoro Market Road',
    scheduledDate: '2024-01-26',
    scheduledTime: '16:00',
    pickupMode: 'dropoff',
    wasteType: 'e_waste',
    estimatedWeight: 8.7,
    status: 'cancelled',
    cancellationReason: 'User requested reschedule',
    slaRisk: 'low',
    timeRemaining: '9h 15m',
    riskScore: 0,
    createdAt: '2024-01-23T13:45:00Z',
    updatedAt: '2024-01-25T10:20:00Z',
    rescheduleCount: 2,
  },
];

const mockScheduleStats: ScheduleStats = {
  totalScheduled: 486,
  assignedToAgent: 402,
  unassignedAtRisk: 84,
  nextTwoHours: 56,
  slaRiskPickups: 23,
  cancelledUpcoming: 12,
};

const mockZoneLoad: ZoneLoad[] = [
  { zone: 'GRA', scheduledPickups: 45, availableAgents: 12, loadRatio: 3.75, riskLevel: 'medium' },
  { zone: 'Trans-Amadi', scheduledPickups: 38, availableAgents: 8, loadRatio: 4.75, riskLevel: 'high' },
  { zone: 'Old GRA', scheduledPickups: 28, availableAgents: 10, loadRatio: 2.8, riskLevel: 'low' },
  { zone: 'Rumuokoro', scheduledPickups: 52, availableAgents: 6, loadRatio: 8.67, riskLevel: 'high' },
];

// Main Component
const ScheduledPickupsPage: React.FC = () => {
  const [pickups, setPickups] = useState<ScheduledPickup[]>(mockScheduledPickups);
  const [stats, setStats] = useState<ScheduleStats>(mockScheduleStats);
  const [zoneLoad, setZoneLoad] = useState<ZoneLoad[]>(mockZoneLoad);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPickupType, setSelectedPickupType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPickup, setSelectedPickup] = useState<ScheduledPickup | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });

  // Breadcrumb
  const BCrumb = [
    { to: '/', title: 'Dashboard' },
    { to: '/pickups', title: 'Pickups & Recycling' },
    { title: 'Scheduled Pickups' },
  ];

  // Filter pickups
  const filteredPickups = pickups.filter((pickup) => {
    const matchesSearch = pickup.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pickup.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pickup.userPhone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || pickup.status === selectedStatus;
    const matchesType = selectedPickupType === 'all' || pickup.pickupMode === selectedPickupType;
    const matchesCity = selectedCity === 'all' || pickup.city === selectedCity;
    
    return matchesSearch && matchesStatus && matchesType && matchesCity;
  });

  // Handle refresh
  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotification({ open: true, message: 'Data refreshed successfully', severity: 'success' });
    } catch (error) {
      setNotification({ open: true, message: 'Failed to refresh data', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle export
  const handleExport = (format: 'csv' | 'pdf') => {
    setNotification({ open: true, message: `Exporting as ${format.toUpperCase()}...`, severity: 'info' });
  };

  // Handle pickup click
  const handlePickupClick = (pickup: ScheduledPickup) => {
    setSelectedPickup(pickup);
    setDrawerOpen(true);
  };

  // Handle drawer actions
  const handleConfirmPickup = () => {
    setNotification({ open: true, message: 'Pickup confirmed successfully', severity: 'success' });
    setDrawerOpen(false);
  };

  const handleReschedulePickup = () => {
    setNotification({ open: true, message: 'Reschedule dialog opened', severity: 'info' });
  };

  const handleCancelPickup = () => {
    setNotification({ open: true, message: 'Pickup cancelled', severity: 'warning' });
    setDrawerOpen(false);
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'assigned': return 'info';
      case 'agent_confirmed': return 'success';
      case 'at_risk': return 'warning';
      case 'cancelled': return 'error';
      case 'rescheduled': return 'secondary';
      default: return 'default';
    }
  };

  // SLA risk color mapping
  const getSlaRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  return (
    <PageContainer title="Scheduled Pickups" description="Upcoming and planned recycling jobs">
      <Breadcrumb title="Scheduled Pickups" items={BCrumb} />

      {/* Page Header */}
      <SchedulePageHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedPickupType={selectedPickupType}
        onPickupTypeChange={setSelectedPickupType}
        onExport={handleExport}
      />

      {/* Schedule Overview Cards */}
      <Box sx={{ mt: 3 }}>
        <ScheduleOverviewCards stats={stats} />
      </Box>

      {/* Filters */}
      <Box sx={{ mt: 3 }}>
        <ScheduleFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRefresh={handleRefresh}
          loading={loading}
        />
      </Box>

      {/* City & Zone Load View */}
      <Box sx={{ mt: 3 }}>
        <ZoneLoadAnalysis zoneLoad={zoneLoad} />
      </Box>

      {/* Scheduled Pickups Table */}
      <Box sx={{ mt: 3 }}>
        <ScheduledPickupsTable
          pickups={filteredPickups}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onPickupClick={handlePickupClick}
        />
      </Box>

      {/* Scheduled Pickup Detail Drawer */}
      <ScheduledPickupDetailDrawer
        pickup={selectedPickup}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onConfirm={handleConfirmPickup}
        onReschedule={handleReschedulePickup}
        onCancel={handleCancelPickup}
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

export default ScheduledPickupsPage;
