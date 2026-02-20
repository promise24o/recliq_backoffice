'use client';

import React, { useState } from 'react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import {
  Box,
  Typography,
  Stack,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Edit3,
  Key,
} from 'lucide-react';
import ProfileOverview from './components/ProfileOverview';
import AccessPermissionsPanel from './components/AccessPermissionsPanel';
import SecuritySettingsPanel from './components/SecuritySettingsPanel';
import RecentActivityPanel from './components/RecentActivityPanel';
import NotificationPreferencesPanel from './components/NotificationPreferencesPanel';
import EditProfileModal from './components/EditProfileModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import {
  useProfile,
  useSecuritySettings,
  useAccountActivity,
  useNotificationPreferences,
  useUpdateProfile,
  useChangePassword,
} from '@/hooks/useProfile';
import {
  mockRolePermissions,
} from './mockData';

const BCrumb = [
  { to: '/', title: 'Home' },
  { to: '/account', title: 'Admin Account' },
  { title: 'My Profile' },
];

const AccountProfilePage: React.FC = () => {
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({ open: false, message: '', severity: 'success' });

  // Fetch real profile data
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: security, isLoading: securityLoading } = useSecuritySettings();
  const { data: activities, isLoading: activitiesLoading } = useAccountActivity();
  const { data: notifications, isLoading: notificationsLoading } = useNotificationPreferences();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  // Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const handleEditProfile = () => {
    setEditModalOpen(true);
  };

  const handleSaveProfile = (profileData: Partial<typeof profile>, photoFile?: File | null) => {
    updateProfile.mutate(
      { 
        profileData, 
        photoFile 
      },
      {
        onSuccess: () => {
          setNotification({
            open: true,
            message: photoFile 
              ? 'Profile and photo updated successfully' 
              : 'Profile updated successfully',
            severity: 'success',
          });
          setEditModalOpen(false);
        },
        onError: (error: any) => {
          let errorMessage = 'Failed to update profile';
          
          // Handle specific error cases
          if (error?.response?.status === 400) {
            if (error.response.data?.message?.includes('phone')) {
              errorMessage = 'Invalid phone number format';
            } else {
              errorMessage = error.response.data?.message || 'Invalid data provided';
            }
          } else if (error?.response?.status === 404) {
            errorMessage = 'Admin not found';
          }
          
          setNotification({
            open: true,
            message: errorMessage,
            severity: 'error',
          });
        },
      }
    );
  };

  const handleChangePassword = () => {
    setChangePasswordModalOpen(true);
  };

  const handleSavePassword = (passwordData: { currentPassword: string; newPassword: string }) => {
    changePassword.mutate(passwordData, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: 'Password changed successfully',
          severity: 'success',
        });
        setChangePasswordModalOpen(false);
      },
      onError: (error: any) => {
        let errorMessage = 'Failed to change password';
        
        if (error?.response?.status === 400) {
          const message = error.response.data?.message;
          if (message?.includes('Current password is incorrect')) {
            errorMessage = 'Current password is incorrect';
          } else if (message?.includes('Password must be at least 8 characters')) {
            errorMessage = 'Password must be at least 8 characters long';
          } else if (message?.includes('Password must contain')) {
            // Parse multiple password requirements
            errorMessage = 'Password does not meet security requirements';
          } else if (message?.includes('New password must be different')) {
            errorMessage = 'New password must be different from current password';
          } else {
            errorMessage = message || 'Invalid password data';
          }
        } else if (error?.response?.status === 404) {
          errorMessage = 'Admin not found';
        }
        
        setNotification({
          open: true,
          message: errorMessage,
          severity: 'error',
        });
      },
    });
  };

  
  const handleNotificationToggle = (id: string, channel: 'email' | 'inApp', value: boolean) => {
    setNotification({
      open: true,
      message: `Notification preference updated`,
      severity: 'success',
    });
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const currentPermissions = profile ? mockRolePermissions[profile.role] : undefined;

  // Show loading state while fetching data
  const isLoading = profileLoading || securityLoading || activitiesLoading || notificationsLoading;

  if (isLoading) {
    return (
      <PageContainer title="My Profile" description="Account details, security, and activity">
        <Breadcrumb title="My Profile" subtitle="Account details, security, and activity" />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Stack spacing={2} alignItems="center">
            <CircularProgress size={40} />
            <Typography variant="body2" color="text.secondary">
              Loading profile data...
            </Typography>
          </Stack>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="My Profile" description="Account details, security, and activity">
      <Breadcrumb title="My Profile" subtitle="Account details, security, and activity" />

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              My Profile
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Account details, security, and activity
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              startIcon={<Edit3 size={16} />}
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              startIcon={<Key size={16} />}
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
                      </Stack>
        </Stack>
      </Box>

      {/* Profile Overview (Identity Card) */}
      <Box sx={{ mb: 3 }}>
        {profile && <ProfileOverview profile={profile} />}
      </Box>

      {/* Access & Permissions (Read-Only) */}
      <Box sx={{ mb: 3 }}>
        {currentPermissions && <AccessPermissionsPanel permissions={currentPermissions} />}
      </Box>

      {/* Security Settings */}
      <Box sx={{ mb: 3 }}>
        {security && (
          <SecuritySettingsPanel
            security={security}
            onChangePassword={handleChangePassword}
          />
        )}
      </Box>

      
      {/* Recent Account Activity */}
      <Box sx={{ mb: 3 }}>
        {activities && <RecentActivityPanel activities={activities} />}
      </Box>

      {/* Notification Preferences */}
      <Box sx={{ mb: 3 }}>
        {notifications && (
          <NotificationPreferencesPanel
            preferences={notifications}
            onToggle={handleNotificationToggle}
          />
        )}
      </Box>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveProfile}
        profile={profile}
        isSaving={updateProfile.isPending}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={changePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
        onSave={handleSavePassword}
        isSaving={changePassword.isPending}
      />

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default AccountProfilePage;
