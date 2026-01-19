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
  IconUserCheck,
  IconSearch,
  IconFilter,
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import KYCSummaryCards from './components/KYCSummaryCards';
import KYCUsersTable from './components/KYCUsersTable';
import KYCDetailDrawer from './components/KYCDetailDrawer';

// Types
interface KYCUser {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  type: 'individual' | 'enterprise';
  kycStatus: 'not_started' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired';
  submittedOn: string;
  reviewedOn?: string;
  reviewer?: string;
  documents: {
    governmentId: string;
    selfie: string;
    proofOfAddress?: string;
  };
  rejectionReason?: string;
}

interface KYCSummary {
  totalUsers: number;
  notStarted: number;
  submitted: number;
  underReview: number;
  approved: number;
  rejected: number;
  expired: number;
}

// Mock Data
const mockKYCUsers: KYCUser[] = [
  {
    id: 'USR001',
    name: 'John Smith',
    phone: '+254712345678',
    city: 'Nairobi',
    zone: 'Westlands',
    type: 'individual',
    kycStatus: 'approved',
    submittedOn: '2024-01-10T14:30:00Z',
    reviewedOn: '2024-01-11T09:15:00Z',
    reviewer: 'Admin User',
    documents: {
      governmentId: '/docs/id_front_001.jpg',
      selfie: '/docs/selfie_001.jpg',
      proofOfAddress: '/docs/address_001.pdf'
    }
  },
  {
    id: 'USR002',
    name: 'Mary Johnson',
    phone: '+254723456789',
    city: 'Mombasa',
    zone: 'Town Center',
    type: 'individual',
    kycStatus: 'submitted',
    submittedOn: '2024-01-14T16:20:00Z',
    documents: {
      governmentId: '/docs/id_front_002.jpg',
      selfie: '/docs/selfie_002.jpg'
    }
  },
  {
    id: 'USR003',
    name: 'GreenTech Solutions',
    phone: '+254734567890',
    city: 'Nairobi',
    zone: 'Industrial Area',
    type: 'enterprise',
    kycStatus: 'under_review',
    submittedOn: '2024-01-13T11:45:00Z',
    documents: {
      governmentId: '/docs/cert_003.pdf',
      selfie: '/docs/rep_003.jpg',
      proofOfAddress: '/docs/address_003.pdf'
    }
  },
  {
    id: 'USR004',
    name: 'David Kimani',
    phone: '+254745678901',
    city: 'Kisumu',
    zone: 'CBD',
    type: 'individual',
    kycStatus: 'rejected',
    submittedOn: '2024-01-08T10:30:00Z',
    reviewedOn: '2024-01-09T14:20:00Z',
    reviewer: 'System Auto',
    rejectionReason: 'Document quality too low - blurry image',
    documents: {
      governmentId: '/docs/id_front_004.jpg',
      selfie: '/docs/selfie_004.jpg'
    }
  },
  {
    id: 'USR005',
    name: 'EcoCollect Ltd',
    phone: '+254756789012',
    city: 'Nairobi',
    zone: 'Karen',
    type: 'enterprise',
    kycStatus: 'not_started',
    submittedOn: '',
    documents: {
      governmentId: '',
      selfie: '',
      proofOfAddress: ''
    }
  }
];

const mockKYCSummary: KYCSummary = {
  totalUsers: 1247,
  notStarted: 456,
  submitted: 89,
  underReview: 34,
  approved: 623,
  rejected: 28,
  expired: 17
};

// Main Component
const KYCStatusPage: React.FC = () => {
  const [users, setUsers] = useState<KYCUser[]>(mockKYCUsers);
  const [summary, setSummary] = useState<KYCSummary>(mockKYCSummary);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedUser, setSelectedUser] = useState<KYCUser | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || user.city === selectedCity;
    const matchesStatus = selectedStatus === 'all' || user.kycStatus === selectedStatus;
    const matchesType = selectedType === 'all' || user.type === selectedType;
    
    return matchesSearch && matchesCity && matchesStatus && matchesType;
  });

  const handleUserClick = (user: KYCUser) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
  };

  const handleKYCAction = (action: string, user: KYCUser, reason?: string) => {
    // Handle different KYC actions
    switch (action) {
      case 'approve':
        setNotification({
          open: true,
          message: `KYC for ${user.name} has been approved`,
          severity: 'success'
        });
        break;
      case 'reject':
        setNotification({
          open: true,
          message: `KYC for ${user.name} has been rejected`,
          severity: 'error'
        });
        break;
      case 'request_resubmission':
        setNotification({
          open: true,
          message: `Resubmission requested for ${user.name}`,
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
      message: `Exporting KYC data as ${format.toUpperCase()}`,
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
        message: 'KYC data refreshed successfully',
        severity: 'success'
      });
    }, 1000);
  };

  return (
    <PageContainer title="KYC Status" description="User identity verification and compliance">
      <Breadcrumb title="KYC Status" subtitle="User identity verification and compliance" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                KYC Status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                User identity verification and compliance
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
                <InputLabel>KYC Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="KYC Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="not_started">Not Started</MenuItem>
                  <MenuItem value="submitted">Submitted</MenuItem>
                  <MenuItem value="under_review">Under Review</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  <MenuItem value="expired">Expired</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={selectedType}
                  label="Type"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="enterprise">Enterprise</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </DashboardCard>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* KYC Summary Cards */}
      <Box mt={3}>
        <KYCSummaryCards 
          summary={summary} 
          onStatusFilter={(status) => setSelectedStatus(status)}
        />
      </Box>

      {/* KYC Users Table */}
      <Box mt={3}>
        <KYCUsersTable
          users={filteredUsers}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onUserClick={handleUserClick}
        />
      </Box>

      {/* KYC Detail Drawer */}
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
        <KYCDetailDrawer
          user={selectedUser}
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          onKYCAction={handleKYCAction}
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

export default KYCStatusPage;
