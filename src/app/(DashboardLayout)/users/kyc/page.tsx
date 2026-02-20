'use client';

import React, { useState } from 'react';
import {
  Box,
  Alert,
  Snackbar,
  Drawer,
} from '@mui/material';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import KYCStatsCards from './components/KYCStatsCards';
import KYCTable from './components/KYCTable';
import KYCSearch from './components/KYCSearch';
import KYCDetailDrawer from './components/KYCDetailDrawer';
import { type KYCRecord, type KYCQuery } from '@/hooks/useKYC';

// Breadcrumb items
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'KYC Management',
  },
];

// Main Component
const KYCStatusPage: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<KYCRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<KYCQuery>({});
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' 
  });

  const handleRecordClick = (record: KYCRecord) => {
    setSelectedRecord(record);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedRecord(null);
  };

  const handleSearch = (query: string) => {
    if (query) {
      setFilters({ ...filters });
    } else {
      const newFilters = { ...filters };
      setFilters(newFilters);
    }
  };

  const handleFilter = (newFilters: KYCQuery) => {
    setFilters(newFilters);
  };

  const handleStatusFilter = (status: string) => {
    if (status === 'all') {
      const newFilters = { ...filters };
      delete newFilters.status;
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, status: status as KYCRecord['status'] });
    }
  };

  const handleUserTypeFilter = (userType: string) => {
    if (userType === 'all') {
      const newFilters = { ...filters };
      delete newFilters.userType;
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, userType: userType as KYCRecord['userType'] });
    }
  };

  return (
    <PageContainer title="KYC Management" description="User identity verification and compliance">
      <Breadcrumb title="KYC Management" items={BCrumb} />
      
      {/* KYC Statistics Cards */}
      <Box mt={3}>
        <KYCStatsCards 
          onStatusFilter={handleStatusFilter}
          onUserTypeFilter={handleUserTypeFilter}
        />
      </Box>

      {/* Search and Filters */}
      <Box mt={3}>
        <KYCSearch 
          onSearch={handleSearch}
          onFilter={handleFilter}
          onUserSelect={handleRecordClick}
          filters={filters}
        />
      </Box>

      {/* KYC Records Table */}
      <Box mt={3}>
        <KYCTable
          onUserClick={handleRecordClick}
          filters={filters}
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
          record={selectedRecord}
          open={isDrawerOpen}
          onClose={handleDrawerClose}
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
