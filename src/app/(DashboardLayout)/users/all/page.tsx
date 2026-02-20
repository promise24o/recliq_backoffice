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
import UserSummaryCards from './components/UserSummaryCards';
import UserTable from './components/UserTable';
import UserSearch from './components/UserSearch';
import UserDetailDrawer from './components/UserDetailDrawer';
import { type User, type UsersQuery, useUserAction } from '@/hooks/useUsers';

// Breadcrumb items
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'All Users',
  },
];

// Main Component
const AllUsersPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<UsersQuery>({});
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' 
  });

  const userAction = useUserAction();

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
  };

  const handleSearch = (query: string) => {
    if (query) {
      setFilters({ ...filters, search: query });
    } else {
      const newFilters = { ...filters };
      delete newFilters.search;
      setFilters(newFilters);
    }
  };

  const handleFilter = (newFilters: UsersQuery) => {
    setFilters(newFilters);
  };

  const handleStatusFilter = (status: string) => {
    if (status === 'all') {
      const newFilters = { ...filters };
      delete newFilters.status;
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, status: status as User['status'] });
    }
  };

  const handleUserAction = async (action: string, user: User) => {
    try {
      await userAction.mutateAsync({ 
        userId: user.id, 
        action: {
          action: action as 'suspend' | 'reactivate' | 'flag',
          reason: `Admin action: ${action}`,
          notes: `Action performed by admin on ${new Date().toLocaleDateString()}`
        }
      });

      // Success notification
      const messages = {
        suspend: `User ${user.name} has been suspended`,
        reactivate: `User ${user.name} has been reactivated`,
        flag: `User ${user.name} has been flagged for review`
      };

      setNotification({
        open: true,
        message: messages[action as keyof typeof messages] || `Action ${action} completed`,
        severity: 'success'
      });

      // Close drawer after successful action
      handleDrawerClose();
    } catch (error) {
      // Error notification
      setNotification({
        open: true,
        message: `Failed to ${action} user: ${error instanceof Error ? error.message : 'Unknown error'}`,
        severity: 'error'
      });
    }
  };

  return (
    <PageContainer title="All Users" description="Complete recycler directory">
      <Breadcrumb title="All Users" items={BCrumb} />
      
      {/* User Summary Cards */}
      <Box mt={3}>
        <UserSummaryCards onStatusFilter={handleStatusFilter} />
      </Box>

      {/* Search and Filters */}
      <Box mt={3}>
        <UserSearch 
          onSearch={handleSearch}
          onFilter={handleFilter}
          onUserSelect={handleUserClick}
          filters={filters}
        />
      </Box>

      {/* Users Table */}
      <Box mt={3}>
        <UserTable
          onUserClick={handleUserClick}
          filters={filters}
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
          isActionLoading={userAction.isPending}
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
