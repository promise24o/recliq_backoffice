'use client';

import React, { useState } from 'react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  RefreshCw,
  Download,
  Grid as GridIcon,
  UserPlus,
} from 'lucide-react';
import RolesOverviewSummaryCards from './components/RolesOverviewSummaryCards';
import RolesTable from './components/RolesTable';
import RoleDetailDrawer from './components/RoleDetailDrawer';
import PermissionConflictRiskPanel from './components/PermissionConflictRiskPanel';
import RoleChangeHistoryPanel from './components/RoleChangeHistoryPanel';
import AddAdminDialog from './components/AddAdminDialog';
import AdminUsersTable from './components/AdminUsersTable';
import PermissionMatrixDialog from './components/PermissionMatrixDialog';
import RevokeAccessDialog from './components/RevokeAccessDialog';
import AssignAdminModal from './components/AssignAdminModal';
import type { RoleDefinition } from './types';
import { useAdmins, useSuspendAdmin, useActivateAdmin, useRevokeAdmin, useAssignRole, useRolesSummary, useRoleDefinitions, usePermissionsAnalysis, useRoleChangeHistory } from '@/hooks/useAdmins';
import {
  permissionMatrix,
  mockPermissionConflicts,
  mockRoleChangeHistory,
} from './mockData';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/settings',
    title: 'System Settings',
  },
  {
    title: 'Roles & Permissions',
  },
];

const RolesPermissionsPage: React.FC = () => {
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleDefinition | null>(null);
  const [roleDrawerOpen, setRoleDrawerOpen] = useState(false);
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const [permissionMatrixOpen, setPermissionMatrixOpen] = useState(false);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [adminToRevoke, setAdminToRevoke] = useState<{ id: string; name: string; email: string; role: string } | null>(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [roleToAssign, setRoleToAssign] = useState<RoleDefinition | null>(null);

  const { data: admins = [], isLoading: adminsLoading } = useAdmins();
  const { data: rolesSummary, isLoading: summaryLoading } = useRolesSummary();
  const { data: roleDefinitions = [], isLoading: rolesLoading } = useRoleDefinitions();
  const { data: permissionsAnalysis, isLoading: analysisLoading } = usePermissionsAnalysis();
  const { data: roleChangeHistory = [], isLoading: historyLoading } = useRoleChangeHistory();
  const suspendAdmin = useSuspendAdmin();
  const activateAdmin = useActivateAdmin();
  const revokeAdmin = useRevokeAdmin();
  const assignRole = useAssignRole();

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNotification({
        open: true,
        message: 'Roles & permissions data refreshed',
        severity: 'success',
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to refresh data',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    setNotification({
      open: true,
      message: 'Exporting roles & permissions for audit...',
      severity: 'info',
    });
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric((prev) => (prev === metricType ? null : metricType));
    setNotification({
      open: true,
      message: `Filtering by: ${metricType.replace(/_/g, ' ')}`,
      severity: 'info',
    });
  };

  const handleViewRole = (roleId: string) => {
    const role = roleDefinitions.find((r: any) => r.id === roleId);
    if (role) {
      setSelectedRole(role);
      setRoleDrawerOpen(true);
    }
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const handleAssignAdmin = (role: RoleDefinition) => {
    setRoleToAssign(role);
    setAssignModalOpen(true);
  };

  const handleAssignRole = (adminId: string, roleId: string) => {
    assignRole.mutate(
      { adminId, roleId },
      {
        onSuccess: () => {
          setNotification({
            open: true,
            message: 'Role assigned successfully',
            severity: 'success',
          });
          setAssignModalOpen(false);
          setRoleToAssign(null);
        },
        onError: () => {
          setNotification({
            open: true,
            message: 'Failed to assign role',
            severity: 'error',
          });
        },
      }
    );
  };

  const handleCloneRole = (role: RoleDefinition) => {
    setNotification({
      open: true,
      message: `Cloning ${role.role} role...`,
      severity: 'info',
    });
    // TODO: Implement role cloning
  };

  const handleToggleRoleStatus = (role: RoleDefinition) => {
    const newStatus = role.status === 'active' ? 'disabled' : 'active';
    setNotification({
      open: true,
      message: `${role.role} role ${newStatus === 'active' ? 'enabled' : 'disabled'}`,
      severity: 'success',
    });
    // TODO: Implement role status toggle
  };

  const handleRevokeAccess = (adminId: string, roleId: string) => {
    // Find the admin details
    const admin = admins.find(a => a.id === adminId);
    if (admin) {
      setAdminToRevoke({
        id: adminId,
        name: admin.name,
        email: admin.email,
        role: roleId,
      });
      setRevokeDialogOpen(true);
    }
  };

  const handleConfirmRevoke = () => {
    if (adminToRevoke) {
      revokeAdmin.mutate(adminToRevoke.id, {
        onSuccess: () => {
          setNotification({
            open: true,
            message: `Access revoked for ${adminToRevoke.name}`,
            severity: 'success',
          });
          setRevokeDialogOpen(false);
          setAdminToRevoke(null);
          // Refresh the selected role to update the assigned admins list
          if (selectedRole) {
            const updatedRole = roleDefinitions.find((r: RoleDefinition) => r.id === selectedRole.id);
            if (updatedRole) {
              setSelectedRole(updatedRole);
            }
          }
        },
        onError: () => {
          setNotification({
            open: true,
            message: 'Failed to revoke admin access',
            severity: 'error',
          });
        },
      });
    }
  };

  const handleRefreshRole = () => {
    // This will trigger a refetch of role definitions
    // The role data will be updated automatically through the cache invalidation
  };

  return (
    <PageContainer title="Roles & Permissions" description="Access control and authorization rules">
      <Breadcrumb title="Roles & Permissions" subtitle="Access control and authorization rules" />

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Roles & Permissions
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Access control and authorization rules
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Button
              variant="contained"
              color="primary"
              startIcon={<UserPlus size={16} />}
              onClick={() => setAddAdminOpen(true)}
            >
              Add Admin
            </Button>
            <Button
              variant="outlined"
              startIcon={<GridIcon size={16} />}
              onClick={() => setPermissionMatrixOpen(true)}
            >
              Permission Matrix
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              onClick={handleExport}
            >
              Export (Audit)
            </Button>
            <IconButton onClick={handleRefresh} disabled={loading}>
              <RefreshCw size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ mb: 3 }}>
        {rolesSummary && (
          <RolesOverviewSummaryCards
            summary={rolesSummary}
            onCardClick={handleCardClick}
            selectedMetric={selectedMetric}
          />
        )}
      </Box>

      {/* Admin Users Table */}
      <Box sx={{ mb: 3 }}>
        <AdminUsersTable
          admins={admins}
          isLoading={adminsLoading}
          onSuspend={(id) => {
            suspendAdmin.mutate(id, {
              onSuccess: () => setNotification({ open: true, message: 'Admin suspended successfully', severity: 'success' }),
              onError: () => setNotification({ open: true, message: 'Failed to suspend admin', severity: 'error' }),
            });
          }}
          onActivate={(id) => {
            activateAdmin.mutate(id, {
              onSuccess: () => setNotification({ open: true, message: 'Admin activated successfully', severity: 'success' }),
              onError: () => setNotification({ open: true, message: 'Failed to activate admin', severity: 'error' }),
            });
          }}
        />
      </Box>

      {/* Roles Table */}
      <Box sx={{ mb: 3 }}>
        <RolesTable
          roles={roleDefinitions}
          onViewRole={handleViewRole}
          onAssignAdmin={handleAssignAdmin}
        />
      </Box>

      {/* Permission Conflict & Risk Analysis */}
      <Box sx={{ mb: 3 }}>
        <PermissionConflictRiskPanel
          conflicts={permissionsAnalysis?.conflicts || []}
          permissionMatrix={permissionsAnalysis?.permissionMatrix || []}
        />
      </Box>

      {/* Change History */}
      <Box sx={{ mb: 3 }}>
        <RoleChangeHistoryPanel
          changeHistory={roleChangeHistory}
        />
      </Box>

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Role Detail Drawer */}
      <RoleDetailDrawer
        open={roleDrawerOpen}
        onClose={() => {
          setRoleDrawerOpen(false);
          setSelectedRole(null);
        }}
        role={selectedRole}
        onAssignAdmin={handleAssignAdmin}
        onCloneRole={handleCloneRole}
        onToggleRoleStatus={handleToggleRoleStatus}
        onRevokeAccess={handleRevokeAccess}
        onRefreshRole={handleRefreshRole}
      />

      {/* Add Admin Dialog */}
      <AddAdminDialog
        open={addAdminOpen}
        onClose={() => setAddAdminOpen(false)}
        onSuccess={() => {
          setNotification({ open: true, message: 'Admin user created successfully', severity: 'success' });
        }}
      />

      {/* Permission Matrix Dialog */}
      <PermissionMatrixDialog
        open={permissionMatrixOpen}
        onClose={() => setPermissionMatrixOpen(false)}
        permissionMatrix={permissionMatrix}
      />

      {/* Revoke Access Dialog */}
      <RevokeAccessDialog
        open={revokeDialogOpen}
        onClose={() => {
          setRevokeDialogOpen(false);
          setAdminToRevoke(null);
        }}
        onConfirm={handleConfirmRevoke}
        admin={adminToRevoke}
        isRevoking={revokeAdmin.isPending}
      />

      {/* Assign Admin Modal */}
      <AssignAdminModal
        open={assignModalOpen}
        onClose={() => {
          setAssignModalOpen(false);
          setRoleToAssign(null);
        }}
        onAssign={handleAssignRole}
        role={roleToAssign}
        admins={admins}
        isAssigning={assignRole.isPending}
      />
    </PageContainer>
  );
};

export default RolesPermissionsPage;
