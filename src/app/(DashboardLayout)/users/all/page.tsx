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
  IconUsers,
  IconSearch,
  IconFilter,
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import UserSummaryCards from './components/UserSummaryCards';
import AllUsersTable from './components/AllUsersTable';
import UserDetailDrawer from './components/UserDetailDrawer';

// Types
interface User {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  status: 'active' | 'dormant' | 'churned' | 'suspended';
  type: 'individual' | 'enterprise';
  totalRecycles: number;
  lastActivity: string;
  created: string;
  walletBalance: number;
  pendingEscrow: number;
  disputesRaised: number;
  cancellations: number;
  avgResponseTime: number;
}

interface UserSummary {
  totalUsers: number;
  activeUsers: number;
  dormantUsers: number;
  churnedUsers: number;
  suspendedUsers: number;
}

// Mock Data
const mockUsers: User[] = [
  {
    id: 'USR001',
    name: 'John Smith',
    phone: '+2348012345678',
    city: 'Lagos',
    zone: 'Ikoyi',
    status: 'active',
    type: 'individual',
    totalRecycles: 47,
    lastActivity: '2024-01-15T10:30:00Z',
    created: '2023-06-15T08:00:00Z',
    walletBalance: 2450.00,
    pendingEscrow: 150.00,
    disputesRaised: 0,
    cancellations: 2,
    avgResponseTime: 12,
  },
  {
    id: 'USR002',
    name: 'Mary Johnson',
    phone: '+2348023456789',
    city: 'Port Harcourt',
    zone: 'GRA',
    status: 'active',
    type: 'individual',
    totalRecycles: 23,
    lastActivity: '2024-01-14T14:20:00Z',
    created: '2023-08-20T10:30:00Z',
    walletBalance: 890.50,
    pendingEscrow: 75.00,
    disputesRaised: 1,
    cancellations: 0,
    avgResponseTime: 8,
  },
  {
    id: 'USR003',
    name: 'GreenTech Solutions',
    phone: '+2348034567890',
    city: 'Lagos',
    zone: 'Victoria Island',
    status: 'active',
    type: 'enterprise',
    totalRecycles: 156,
    lastActivity: '2024-01-15T09:15:00Z',
    created: '2023-03-10T14:00:00Z',
    walletBalance: 12500.00,
    pendingEscrow: 500.00,
    disputesRaised: 0,
    cancellations: 1,
    avgResponseTime: 6,
  },
  {
    id: 'USR004',
    name: 'David Kimani',
    phone: '+2348045678901',
    city: 'Kano',
    zone: 'Sabon Gari',
    status: 'dormant',
    type: 'individual',
    totalRecycles: 8,
    lastActivity: '2023-12-20T16:45:00Z',
    created: '2023-09-05T11:20:00Z',
    walletBalance: 320.00,
    pendingEscrow: 0,
    disputesRaised: 0,
    cancellations: 3,
    avgResponseTime: 25,
  },
  {
    id: 'USR005',
    name: 'EcoCollect Ltd',
    phone: '+2348056789012',
    city: 'Abuja',
    zone: 'Maitama',
    status: 'suspended',
    type: 'enterprise',
    totalRecycles: 89,
    lastActivity: '2024-01-10T13:30:00Z',
    created: '2023-05-15T09:00:00Z',
    walletBalance: 4200.00,
    pendingEscrow: 200.00,
    disputesRaised: 3,
    cancellations: 5,
    avgResponseTime: 18,
  },
];

const mockSummary: UserSummary = {
  totalUsers: 1247,
  activeUsers: 892,
  dormantUsers: 234,
  churnedUsers: 89,
  suspendedUsers: 32,
};

// Main Component
const AllUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [summary, setSummary] = useState<UserSummary>(mockSummary);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState('90days');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || user.city === selectedCity;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesType = selectedType === 'all' || user.type === selectedType;
    
    return matchesSearch && matchesCity && matchesStatus && matchesType;
  });

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
  };

  const handleUserAction = (action: string, user: User) => {
    // Handle different user actions
    switch (action) {
      case 'suspend':
        setNotification({
          open: true,
          message: `User ${user.name} has been suspended`,
          severity: 'success'
        });
        break;
      case 'reactivate':
        setNotification({
          open: true,
          message: `User ${user.name} has been reactivated`,
          severity: 'success'
        });
        break;
      case 'flag':
        setNotification({
          open: true,
          message: `User ${user.name} has been flagged for review`,
          severity: 'success'
        });
        break;
      default:
        break;
    }
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    setNotification({
      open: true,
      message: `Exporting users data as ${format.toUpperCase()}`,
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
        message: 'Data refreshed successfully',
        severity: 'success'
      });
    }, 1000);
  };

  return (
    <PageContainer title="All Users" description="Complete recycler directory">
      <Breadcrumb title="All Users" subtitle="Complete recycler directory" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                All Users
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Complete recycler directory
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
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="dormant">Dormant</MenuItem>
                  <MenuItem value="churned">Churned</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
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

      {/* User Summary Cards */}
      <Box mt={3}>
        <UserSummaryCards 
          summary={summary} 
          onStatusFilter={(status) => setSelectedStatus(status)}
        />
      </Box>

      {/* Users Table */}
      <Box mt={3}>
        <AllUsersTable
          users={filteredUsers}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onUserClick={handleUserClick}
          onUserAction={handleUserAction}
        />
      </Box>

      {/* User Detail Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 480,
            p: 0,
          },
        }}
      >
        <UserDetailDrawer
          user={selectedUser}
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          onUserAction={handleUserAction}
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

export default AllUsersPage;
