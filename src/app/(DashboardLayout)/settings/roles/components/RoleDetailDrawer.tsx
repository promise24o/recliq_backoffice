'use client';
import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  Stack,
  Grid,
  Paper,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
} from '@mui/material';
import {
  X,
  Shield,
  Check,
  Minus,
  Eye,
  Edit,
  CheckCircle,
  AlertTriangle,
  Lock,
  Users,
  Globe,
  DollarSign,
  User,
  Copy,
  ToggleLeft,
  UserPlus,
  UserMinus,
} from 'lucide-react';
import type { RoleDefinition } from '../types';
import {
  getRoleColor,
  getRoleLabel,
  getRiskLevelColor,
  getRiskLevelLabel,
  getStatusColor,
} from '../mockData';

interface RoleDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  role: RoleDefinition | null;
  onAssignAdmin?: (role: RoleDefinition) => void;
  onCloneRole?: (role: RoleDefinition) => void;
  onToggleRoleStatus?: (role: RoleDefinition) => void;
  onRevokeAccess?: (adminId: string, roleId: string) => void;
  onRefreshRole?: () => void;
}

const RoleDetailDrawer: React.FC<RoleDetailDrawerProps> = ({
  open,
  onClose,
  role,
  onAssignAdmin,
  onCloneRole,
  onToggleRoleStatus,
  onRevokeAccess,
  onRefreshRole,
}) => {
  if (!role) return null;

  const roleColor = getRoleColor(role.role);

  const getPermissionIcon = (granted: boolean) => {
    return granted ? (
      <Check size={14} color="#10B981" />
    ) : (
      <Minus size={14} color="#CBD5E1" />
    );
  };

  const getDataVisibilityLabel = (value: string) => {
    const labels: Record<string, { label: string; color: string }> = {
      all: { label: 'All', color: '#10B981' },
      assigned: { label: 'Assigned Only', color: '#F59E0B' },
      full: { label: 'Full', color: '#10B981' },
      summary: { label: 'Summary Only', color: '#3B82F6' },
      masked: { label: 'Masked', color: '#F59E0B' },
      none: { label: 'None', color: '#EF4444' },
    };
    return labels[value] || { label: value, color: '#6B7280' };
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', md: 900 },
          p: 0,
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 1.5,
                  bgcolor: roleColor + '15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Shield size={24} color={roleColor} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="600">
                  {getRoleLabel(role.role)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {role.role}
                </Typography>
              </Box>
            </Stack>
            <IconButton onClick={onClose}>
              <X size={20} />
            </IconButton>
          </Stack>
        </Box>

        {/* Status Bar */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Chip
              label={role.status.toUpperCase()}
              size="small"
              sx={{ bgcolor: getStatusColor(role.status) + '15', color: getStatusColor(role.status), fontWeight: 600 }}
            />
            <Chip
              label={`Risk: ${getRiskLevelLabel(role.riskLevel)}`}
              size="small"
              sx={{ bgcolor: getRiskLevelColor(role.riskLevel) + '15', color: getRiskLevelColor(role.riskLevel), fontWeight: 600 }}
            />
            <Chip
              label={`${role.assignedAdmins.length} admins`}
              size="small"
              variant="outlined"
            />
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Role Overview */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Role Overview
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {role.purpose}
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" fontWeight="600" mb={1}>Purpose</Typography>
                  <Typography variant="body2">{role.purpose}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" fontWeight="600" mb={1}>Focus Areas</Typography>
                  <Stack spacing={0.5}>
                    {role.focusAreas ? role.focusAreas.map((area, i) => (
                      <Typography key={i} variant="body2" color="text.secondary">
                        • {area}
                      </Typography>
                    )) : (
                      <Typography variant="body2" color="text.secondary">
                        No specific focus areas defined
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Key Capabilities & Restrictions */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <CheckCircle size={18} color="#10B981" />
                    <Typography variant="h6" fontWeight="600">Key Capabilities</Typography>
                  </Stack>
                  <Stack spacing={1}>
                    {role.keyCapabilities ? role.keyCapabilities.map((cap, i) => (
                      <Stack key={i} direction="row" spacing={1} alignItems="center">
                        <Check size={14} color="#10B981" />
                        <Typography variant="body2">{cap}</Typography>
                      </Stack>
                    )) : (
                      <Typography variant="body2" color="text.secondary">
                        No specific capabilities defined
                      </Typography>
                    )}
                  </Stack>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <Lock size={18} color="#EF4444" />
                    <Typography variant="h6" fontWeight="600">Explicit Restrictions</Typography>
                  </Stack>
                  <Stack spacing={1}>
                    {role.explicitRestrictions ? role.explicitRestrictions.map((res, i) => (
                      <Stack key={i} direction="row" spacing={1} alignItems="center">
                        <Minus size={14} color="#EF4444" />
                        <Typography variant="body2" color="text.secondary">{res}</Typography>
                      </Stack>
                    )) : (
                      <Typography variant="body2" color="text.secondary">
                        No explicit restrictions defined
                      </Typography>
                    )}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>

            {/* Permission Matrix */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Permission Matrix
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Module</TableCell>
                      <TableCell align="center">View</TableCell>
                      <TableCell align="center">Create</TableCell>
                      <TableCell align="center">Edit</TableCell>
                      <TableCell align="center">Approve</TableCell>
                      <TableCell align="center">Override</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {role.permissionScope?.modules ? role.permissionScope.modules.map((mod, i) => (
                      <TableRow key={i} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight="500">
                            {mod.label || mod.module}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">{getPermissionIcon(mod.permissions?.view)}</TableCell>
                        <TableCell align="center">{getPermissionIcon(mod.permissions?.create)}</TableCell>
                        <TableCell align="center">{getPermissionIcon(mod.permissions?.edit)}</TableCell>
                        <TableCell align="center">{getPermissionIcon(mod.permissions?.approve)}</TableCell>
                        <TableCell align="center">{getPermissionIcon(mod.permissions?.override)}</TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography variant="body2" color="text.secondary">
                            No permission modules defined
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Data Visibility */}
            {role.permissionScope?.dataVisibility && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Data Visibility
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Globe size={18} color="#6B7280" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">City / Zone Scope</Typography>
                        <Box mt={0.5}>
                          <Chip
                            label={getDataVisibilityLabel(role.permissionScope.dataVisibility.cityZoneScope || 'none').label}
                            size="small"
                            sx={{
                              bgcolor: getDataVisibilityLabel(role.permissionScope.dataVisibility.cityZoneScope || 'none').color + '15',
                              color: getDataVisibilityLabel(role.permissionScope.dataVisibility.cityZoneScope || 'none').color,
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <DollarSign size={18} color="#6B7280" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Financial Data Exposure</Typography>
                        <Box mt={0.5}>
                          <Chip
                            label={getDataVisibilityLabel(role.permissionScope.dataVisibility.financialDataExposure || 'none').label}
                            size="small"
                            sx={{
                              bgcolor: getDataVisibilityLabel(role.permissionScope.dataVisibility.financialDataExposure || 'none').color + '15',
                              color: getDataVisibilityLabel(role.permissionScope.dataVisibility.financialDataExposure || 'none').color,
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <User size={18} color="#6B7280" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">PII Access Level</Typography>
                        <Box mt={0.5}>
                          <Chip
                            label={getDataVisibilityLabel(role.permissionScope.dataVisibility.piiAccessLevel || 'none').label}
                            size="small"
                            sx={{
                              bgcolor: getDataVisibilityLabel(role.permissionScope.dataVisibility.piiAccessLevel || 'none').color + '15',
                              color: getDataVisibilityLabel(role.permissionScope.dataVisibility.piiAccessLevel || 'none').color,
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            )}

            {/* Approval Rules */}
            {role.permissionScope?.approvalRules && role.permissionScope.approvalRules.length > 0 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Approval Rules
                </Typography>
                <Stack spacing={1.5}>
                  {role.permissionScope.approvalRules.map((rule, i) => (
                    <Box key={i} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="body2" fontWeight="600">{rule.action}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Escalation: {rule.escalationPath}
                          </Typography>
                        </Box>
                        <Chip
                          label={rule.requiresDualApproval ? 'Dual Approval' : 'Single Approval'}
                          size="small"
                          color={rule.requiresDualApproval ? 'warning' : 'default'}
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            )}

            {/* Assigned Admins */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Assigned Admins ({role.assignedAdmins?.length || 0})
              </Typography>
              <Stack spacing={1.5}>
                {role.assignedAdmins ? role.assignedAdmins.map((admin) => (
                  <Box key={admin.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 36, height: 36, bgcolor: roleColor, fontSize: '0.8rem' }}>
                          {admin.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="600">{admin.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {admin.email} • Assigned by {admin.assignedBy || 'System'} • {admin.assignedAt ? new Date(admin.assignedAt).toLocaleDateString('en-NG') : 'Recently'}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={(admin.status || 'active').toUpperCase()}
                          size="small"
                          color={(admin.status || 'active') === 'active' ? 'success' : 'error'}
                          variant="outlined"
                          sx={{ fontSize: '0.65rem' }}
                        />
                        {(admin.status === 'active' || !admin.status) && (
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            startIcon={<UserMinus size={14} />}
                            onClick={() => onRevokeAccess?.(admin.id, role.id)}
                            sx={{ fontSize: '0.7rem', py: 0.5, px: 1 }}
                          >
                            Revoke
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                )) : (
                  <Typography variant="body2" color="text.secondary">
                    No admins assigned to this role
                  </Typography>
                )}
              </Stack>
            </Paper>

            {/* Actions */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Actions
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                All actions are logged and audited.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button 
                  variant="outlined" 
                  startIcon={<UserPlus size={16} />}
                  onClick={() => onAssignAdmin?.(role)}
                >
                  Assign Admin
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default RoleDetailDrawer;
