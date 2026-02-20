'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Avatar,
  AvatarGroup,
  Tooltip,
} from '@mui/material';
import {
  Eye,
  MoreVertical,
  Shield,
  Copy,
  ToggleLeft,
  Users,
} from 'lucide-react';
import type { RoleDefinition } from '../types';
import {
  getRoleColor,
  getRoleLabel,
  getRiskLevelColor,
  getRiskLevelLabel,
  getStatusColor,
} from '../mockData';

interface RolesTableProps {
  roles: RoleDefinition[];
  onViewRole: (roleId: string) => void;
  onAssignAdmin?: (role: RoleDefinition) => void;
}

const RolesTable: React.FC<RolesTableProps> = ({
  roles,
  onViewRole,
  onAssignAdmin,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRole, setSelectedRole] = useState<RoleDefinition | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, role: RoleDefinition) => {
    setAnchorEl(event.currentTarget);
    setSelectedRole(role);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRole(null);
  };

  const handleView = () => {
    if (selectedRole) {
      onViewRole(selectedRole.id);
    }
    handleMenuClose();
  };

  const handleAssign = () => {
    if (selectedRole && onAssignAdmin) {
      onAssignAdmin(selectedRole);
    }
    handleMenuClose();
  };

  const getPermissionScopeLabel = (role: RoleDefinition): string => {
    const modules = role.permissionScope.modules;
    const fullCount = modules.filter(m => m.permissions.create || m.permissions.edit).length;
    const viewCount = modules.filter(m => m.permissions.view && !m.permissions.create && !m.permissions.edit).length;
    return `${fullCount} full, ${viewCount} view-only`;
  };

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="600">
          Role Definitions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Predefined & locked roles — only Super Admin can assign or disable
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Assigned Admins</TableCell>
              <TableCell>Permission Scope</TableCell>
              <TableCell>Risk Level</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1,
                        bgcolor: getRoleColor(role.role) + '15',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Shield size={18} color={getRoleColor(role.role)} />
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight="600">
                        {getRoleLabel(role.role)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {role.role}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={{ maxWidth: 250 }}>
                  <Typography variant="body2" noWrap>
                    {role.purpose}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.7rem' } }}>
                      {role.assignedAdmins.map((admin) => (
                        <Tooltip key={admin.id} title={admin.name}>
                          <Avatar sx={{ bgcolor: getRoleColor(role.role) }}>
                            {admin.name.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                    <Typography variant="caption" color="text.secondary">
                      {role.assignedAdmins.length}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="500">
                    {getPermissionScopeLabel(role)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getRiskLevelLabel(role.riskLevel)}
                    size="small"
                    sx={{
                      bgcolor: getRiskLevelColor(role.riskLevel) + '15',
                      color: getRiskLevelColor(role.riskLevel),
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={role.status.toUpperCase()}
                    size="small"
                    sx={{
                      bgcolor: getStatusColor(role.status) + '15',
                      color: getStatusColor(role.status),
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, role);
                    }}
                  >
                    <MoreVertical size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            minWidth: 200,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        }}
      >
        <MenuItem onClick={handleView}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Eye size={16} />
            <Typography variant="body2">View Details</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleAssign}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Users size={16} />
            <Typography variant="body2">Assign Admin</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default RolesTable;
