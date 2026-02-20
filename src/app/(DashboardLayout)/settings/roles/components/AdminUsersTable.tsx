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
  Tooltip,
  TablePagination,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  CircularProgress,
} from '@mui/material';
import {
  MoreVertical,
  Shield,
  Search,
  UserX,
  UserCheck,
  Mail,
  Clock,
} from 'lucide-react';
import { AdminSubRole } from '../types';
import { getRoleColor, getRoleLabel } from '../mockData';
import type { AdminUser } from '@/hooks/useAdmins';

interface AdminUsersTableProps {
  admins: AdminUser[];
  isLoading: boolean;
  onSuspend: (id: string) => void;
  onActivate: (id: string) => void;
}

const getStatusColor = (status: string): string => {
  return status === 'active' ? '#10B981' : '#EF4444';
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const AdminUsersTable: React.FC<AdminUsersTableProps> = ({
  admins,
  isLoading,
  onSuspend,
  onActivate,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      !searchQuery ||
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || admin.adminSubRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  const paginatedAdmins = filteredAdmins.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, admin: AdminUser) => {
    setAnchorEl(event.currentTarget);
    setSelectedAdmin(admin);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAdmin(null);
  };

  const handleSuspend = () => {
    if (selectedAdmin) onSuspend(selectedAdmin.id);
    handleMenuClose();
  };

  const handleActivate = () => {
    if (selectedAdmin) onActivate(selectedAdmin.id);
    handleMenuClose();
  };

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6" fontWeight="600">
              Admin Users
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All registered admin accounts and their assigned roles
            </Typography>
          </Box>
          <Chip
            label={`${filteredAdmins.length} admin${filteredAdmins.length !== 1 ? 's' : ''}`}
            size="small"
            sx={{ bgcolor: '#3B82F615', color: '#3B82F6', fontWeight: 600 }}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0);
            }}
            sx={{ minWidth: 280 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} color="#9CA3AF" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={roleFilter}
              displayEmpty
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(0);
              }}
            >
              <MenuItem value="">All Sub-Roles</MenuItem>
              {Object.values(AdminSubRole).map((role) => (
                <MenuItem key={role} value={role}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Shield size={14} color={getRoleColor(role)} />
                    <Typography variant="body2">{getRoleLabel(role)}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {isLoading ? (
        <Box sx={{ p: 6, textAlign: 'center' }}>
          <CircularProgress size={32} />
          <Typography variant="body2" color="text.secondary" mt={2}>
            Loading admin users...
          </Typography>
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Admin</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Sub-Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedAdmins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        {searchQuery || roleFilter
                          ? 'No admins match your filters'
                          : 'No admin users found'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedAdmins.map((admin) => (
                    <TableRow key={admin.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar
                            src={admin.photo}
                            sx={{
                              width: 36,
                              height: 36,
                              bgcolor: getRoleColor(admin.adminSubRole as AdminSubRole),
                              fontSize: '0.75rem',
                              fontWeight: 600,
                            }}
                          >
                            {getInitials(admin.name)}
                          </Avatar>
                          <Typography variant="body2" fontWeight="600">
                            {admin.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Mail size={14} color="#9CA3AF" />
                          <Typography variant="body2" color="text.secondary">
                            {admin.email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={<Shield size={12} />}
                          label={getRoleLabel(admin.adminSubRole as AdminSubRole)}
                          size="small"
                          sx={{
                            bgcolor: getRoleColor(admin.adminSubRole as AdminSubRole) + '15',
                            color: getRoleColor(admin.adminSubRole as AdminSubRole),
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            '& .MuiChip-icon': {
                              color: getRoleColor(admin.adminSubRole as AdminSubRole),
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={admin.status.toUpperCase()}
                          size="small"
                          sx={{
                            bgcolor: getStatusColor(admin.status) + '15',
                            color: getStatusColor(admin.status),
                            fontWeight: 600,
                            fontSize: '0.65rem',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(admin.createdAt).toLocaleDateString('en-NG', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {admin.lastLogin ? (
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Clock size={12} color="#9CA3AF" />
                            <Typography variant="caption" color="text.secondary">
                              {new Date(admin.lastLogin).toLocaleDateString('en-NG', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </Typography>
                          </Stack>
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            Never
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuOpen(e, admin);
                          }}
                        >
                          <MoreVertical size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredAdmins.length > rowsPerPage && (
            <TablePagination
              component="div"
              count={filteredAdmins.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25]}
            />
          )}
        </>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 180, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
        }}
      >
        {selectedAdmin?.status === 'active' ? (
          <MenuItem onClick={handleSuspend}>
            <Stack direction="row" spacing={2} alignItems="center">
              <UserX size={16} color="#EF4444" />
              <Typography variant="body2" color="error">Suspend Admin</Typography>
            </Stack>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleActivate}>
            <Stack direction="row" spacing={2} alignItems="center">
              <UserCheck size={16} color="#10B981" />
              <Typography variant="body2" sx={{ color: '#10B981' }}>Activate Admin</Typography>
            </Stack>
          </MenuItem>
        )}
      </Menu>
    </Paper>
  );
};

export default AdminUsersTable;
