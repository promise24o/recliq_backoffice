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
  IconBan,
  IconSearch,
  IconFilter,
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import RiskSummaryCards from './components/RiskSummaryCards';
import SuspendedFlaggedUsersTable from './components/SuspendedFlaggedUsersTable';
import UserRiskDetailDrawer from './components/UserRiskDetailDrawer';

// Types
interface RiskUser {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  riskState: 'active' | 'flagged' | 'temporarily_suspended' | 'permanently_banned' | 'compliance_hold';
  reason: string;
  since: string;
  expires?: string;
  flaggedBy: string;
  lastActivity: string;
  accountAge: string;
  kycStatus: 'not_started' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired';
  riskTimeline: RiskEvent[];
  activityContext: ActivityContext;
}

interface RiskEvent {
  id: string;
  type: 'flag' | 'suspend' | 'reinstate' | 'ban';
  reason: string;
  timestamp: string;
  actor: string;
  expires?: string;
  resolved?: boolean;
}

interface ActivityContext {
  disputes: number;
  cancellations: number;
  walletAnomalies: boolean;
  pickupHistory: {
    total: number;
    completed: number;
    cancelled: number;
    noShows: number;
  };
}

interface RiskSummary {
  permanentlyBanned: number;
  temporarilySuspended: number;
  flaggedUsers: number;
  complianceHolds: number;
  usersUnderReview: number;
  reinstated30d: number;
}

// Mock Data
const mockRiskUsers: RiskUser[] = [
  {
    id: 'USR001',
    name: 'John Smith',
    phone: '+254712345678',
    city: 'Nairobi',
    zone: 'Westlands',
    riskState: 'permanently_banned',
    reason: 'Fraud attempt - fake recycling submissions',
    since: '2024-01-10T14:30:00Z',
    flaggedBy: 'System Auto',
    lastActivity: '2024-01-10T12:15:00Z',
    accountAge: '45 days',
    kycStatus: 'rejected',
    riskTimeline: [
      {
        id: 'RISK001',
        type: 'flag',
        reason: 'Suspicious pickup patterns',
        timestamp: '2024-01-08T10:00:00Z',
        actor: 'System Auto'
      },
      {
        id: 'RISK002',
        type: 'suspend',
        reason: 'Fraud investigation',
        timestamp: '2024-01-09T15:30:00Z',
        actor: 'Trust & Safety Team',
        expires: '2024-01-16T15:30:00Z'
      },
      {
        id: 'RISK003',
        type: 'ban',
        reason: 'Confirmed fraud - fake recycling submissions',
        timestamp: '2024-01-10T14:30:00Z',
        actor: 'System Auto'
      }
    ],
    activityContext: {
      disputes: 3,
      cancellations: 8,
      walletAnomalies: true,
      pickupHistory: {
        total: 15,
        completed: 7,
        cancelled: 6,
        noShows: 2
      }
    }
  },
  {
    id: 'USR002',
    name: 'Mary Johnson',
    phone: '+254723456789',
    city: 'Mombasa',
    zone: 'Town Center',
    riskState: 'temporarily_suspended',
    reason: 'Repeated no-shows for scheduled pickups',
    since: '2024-01-13T16:20:00Z',
    expires: '2024-01-20T16:20:00Z',
    flaggedBy: 'Ops Team',
    lastActivity: '2024-01-12T09:45:00Z',
    accountAge: '120 days',
    kycStatus: 'approved',
    riskTimeline: [
      {
        id: 'RISK004',
        type: 'flag',
        reason: 'High cancellation rate',
        timestamp: '2024-01-11T11:00:00Z',
        actor: 'System Auto'
      },
      {
        id: 'RISK005',
        type: 'suspend',
        reason: 'Repeated no-shows for scheduled pickups',
        timestamp: '2024-01-13T16:20:00Z',
        actor: 'Ops Team',
        expires: '2024-01-20T16:20:00Z'
      }
    ],
    activityContext: {
      disputes: 0,
      cancellations: 12,
      walletAnomalies: false,
      pickupHistory: {
        total: 28,
        completed: 16,
        cancelled: 10,
        noShows: 2
      }
    }
  },
  {
    id: 'USR003',
    name: 'GreenTech Solutions',
    phone: '+254734567890',
    city: 'Nairobi',
    zone: 'Industrial Area',
    riskState: 'compliance_hold',
    reason: 'KYC documentation expired',
    since: '2024-01-14T11:45:00Z',
    flaggedBy: 'Compliance Team',
    lastActivity: '2024-01-14T10:30:00Z',
    accountAge: '200 days',
    kycStatus: 'expired',
    riskTimeline: [
      {
        id: 'RISK006',
        type: 'flag',
        reason: 'KYC expiring soon',
        timestamp: '2024-01-07T09:00:00Z',
        actor: 'System Auto'
      },
      {
        id: 'RISK007',
        type: 'suspend',
        reason: 'KYC documentation expired',
        timestamp: '2024-01-14T11:45:00Z',
        actor: 'Compliance Team'
      }
    ],
    activityContext: {
      disputes: 1,
      cancellations: 3,
      walletAnomalies: false,
      pickupHistory: {
        total: 45,
        completed: 42,
        cancelled: 2,
        noShows: 1
      }
    }
  },
  {
    id: 'USR004',
    name: 'David Kimani',
    phone: '+254745678901',
    city: 'Kisumu',
    zone: 'CBD',
    riskState: 'flagged',
    reason: 'Abuse of rewards program',
    since: '2024-01-15T09:30:00Z',
    flaggedBy: 'System Auto',
    lastActivity: '2024-01-15T08:15:00Z',
    accountAge: '90 days',
    kycStatus: 'approved',
    riskTimeline: [
      {
        id: 'RISK008',
        type: 'flag',
        reason: 'Unusual reward accumulation pattern',
        timestamp: '2024-01-15T09:30:00Z',
        actor: 'System Auto'
      }
    ],
    activityContext: {
      disputes: 0,
      cancellations: 2,
      walletAnomalies: true,
      pickupHistory: {
        total: 22,
        completed: 20,
        cancelled: 1,
        noShows: 1
      }
    }
  },
  {
    id: 'USR005',
    name: 'EcoCollect Ltd',
    phone: '+254756789012',
    city: 'Nairobi',
    zone: 'Karen',
    riskState: 'temporarily_suspended',
    reason: 'Dispute abuse - multiple false claims',
    since: '2024-01-12T13:15:00Z',
    expires: '2024-01-19T13:15:00Z',
    flaggedBy: 'Trust & Safety Team',
    lastActivity: '2024-01-11T16:45:00Z',
    accountAge: '150 days',
    kycStatus: 'approved',
    riskTimeline: [
      {
        id: 'RISK009',
        type: 'flag',
        reason: 'High dispute rate',
        timestamp: '2024-01-10T14:00:00Z',
        actor: 'System Auto'
      },
      {
        id: 'RISK010',
        type: 'suspend',
        reason: 'Dispute abuse - multiple false claims',
        timestamp: '2024-01-12T13:15:00Z',
        actor: 'Trust & Safety Team',
        expires: '2024-01-19T13:15:00Z'
      }
    ],
    activityContext: {
      disputes: 5,
      cancellations: 4,
      walletAnomalies: false,
      pickupHistory: {
        total: 38,
        completed: 34,
        cancelled: 3,
        noShows: 1
      }
    }
  }
];

const mockRiskSummary: RiskSummary = {
  permanentlyBanned: 12,
  temporarilySuspended: 28,
  flaggedUsers: 45,
  complianceHolds: 15,
  usersUnderReview: 8,
  reinstated30d: 6
};

// Main Component
const SuspendedFlaggedUsersPage: React.FC = () => {
  const [users, setUsers] = useState<RiskUser[]>(mockRiskUsers);
  const [summary, setSummary] = useState<RiskSummary>(mockRiskSummary);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedRiskState, setSelectedRiskState] = useState('all');
  const [selectedReason, setSelectedReason] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedUser, setSelectedUser] = useState<RiskUser | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' });

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || user.city === selectedCity;
    const matchesRiskState = selectedRiskState === 'all' || user.riskState === selectedRiskState;
    const matchesReason = selectedReason === 'all' || user.reason.toLowerCase().includes(selectedReason.toLowerCase());
    
    return matchesSearch && matchesCity && matchesRiskState && matchesReason;
  });

  const handleUserClick = (user: RiskUser) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
    // Log access for security
    console.log(`Risk profile accessed: ${user.id} by ${'current_user'}`);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
  };

  const handleRiskAction = (action: string, user: RiskUser, reason?: string, duration?: string) => {
    // Handle different risk actions
    switch (action) {
      case 'flag':
        setNotification({
          open: true,
          message: `User ${user.name} has been flagged for review`,
          severity: 'warning'
        });
        break;
      case 'suspend':
        setNotification({
          open: true,
          message: `User ${user.name} has been suspended`,
          severity: 'error'
        });
        break;
      case 'reinstate':
        setNotification({
          open: true,
          message: `User ${user.name} has been reinstated`,
          severity: 'success'
        });
        break;
      case 'extend_suspension':
        setNotification({
          open: true,
          message: `Suspension for ${user.name} has been extended`,
          severity: 'warning'
        });
        break;
      case 'ban':
        setNotification({
          open: true,
          message: `User ${user.name} has been permanently banned`,
          severity: 'error'
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
      message: `Exporting risk data as ${format.toUpperCase()} - Access logged`,
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
        message: 'Risk data refreshed successfully',
        severity: 'success'
      });
    }, 1000);
  };

  return (
    <PageContainer title="Suspended & Flagged Users" description="Trust, risk, and enforcement">
      <Breadcrumb title="Suspended & Flagged Users" subtitle="Trust, risk, and enforcement" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Suspended & Flagged Users
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Trust, risk, and enforcement
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
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
                placeholder="Search by name, phone, or user ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <IconSearch size={16} style={{ marginRight: 8 }} />,
                }}
                sx={{ minWidth: 300 }}
              />
              
              <FormControl size="small" sx={{ minWidth: 150 }}>
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
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Risk State</InputLabel>
                <Select
                  value={selectedRiskState}
                  label="Risk State"
                  onChange={(e) => setSelectedRiskState(e.target.value)}
                >
                  <MenuItem value="all">All States</MenuItem>
                  <MenuItem value="flagged">Flagged</MenuItem>
                  <MenuItem value="temporarily_suspended">Temporarily Suspended</MenuItem>
                  <MenuItem value="permanently_banned">Permanently Banned</MenuItem>
                  <MenuItem value="compliance_hold">Compliance Hold</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Flag Reason</InputLabel>
                <Select
                  value={selectedReason}
                  label="Flag Reason"
                  onChange={(e) => setSelectedReason(e.target.value)}
                >
                  <MenuItem value="all">All Reasons</MenuItem>
                  <MenuItem value="fraud">Fraud</MenuItem>
                  <MenuItem value="no-show">Repeated No-Shows</MenuItem>
                  <MenuItem value="rewards">Abuse of Rewards</MenuItem>
                  <MenuItem value="dispute">Dispute Abuse</MenuItem>
                  <MenuItem value="compliance">Compliance Failure</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </DashboardCard>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Risk Summary Cards */}
      <Box mt={3}>
        <RiskSummaryCards 
          summary={summary} 
          onRiskStateFilter={(state) => setSelectedRiskState(state)}
        />
      </Box>

      {/* Suspended & Flagged Users Table */}
      <Box mt={3}>
        <SuspendedFlaggedUsersTable
          users={filteredUsers}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onUserClick={handleUserClick}
        />
      </Box>

      {/* User Risk Detail Drawer */}
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
        <UserRiskDetailDrawer
          user={selectedUser}
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          onRiskAction={handleRiskAction}
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

export default SuspendedFlaggedUsersPage;
