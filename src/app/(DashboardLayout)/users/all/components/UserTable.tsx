'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVertical,
  Shield,
  UserCheck,
  Flag,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useUsers, type User, type UsersQuery } from '@/hooks/useUsers';
import { UserTableRowsSkeleton } from './UserSkeletonLoader';

interface UserTableProps {
  onUserClick: (user: User) => void;
  filters?: UsersQuery;
}

const UserTable: React.FC<UserTableProps> = ({ onUserClick, filters = {} }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: usersData, isLoading, error } = useUsers({
    ...filters,
    page: page + 1,
    limit: rowsPerPage,
  });

  const users = usersData?.users || [];
  const total = usersData?.pagination?.total || 0;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const getStatusColor = (status: User['status']) => {
    const colors = {
      active: '#10B981',
      dormant: '#F59E0B',
      churned: '#EF4444',
      suspended: '#6B7280',
    };
    return colors[status];
  };

  const getStatusLabel = (status: User['status']) => {
    const labels = {
      active: 'Active',
      dormant: 'Dormant',
      churned: 'Churned',
      suspended: 'Suspended',
    };
    return labels[status];
  };

  // Show skeleton on first render and during loading to prevent hydration mismatch
  if (!mounted || isLoading) {
    return (
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Recycles</TableCell>
                <TableCell>Wallet</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <UserTableRowsSkeleton count={rowsPerPage} />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Failed to load users</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Recycles</TableCell>
              <TableCell>Wallet</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                hover
                onClick={() => onUserClick(user)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {user.id}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Mail size={14} color="#6B7280" />
                      <Typography variant="caption">{user.email}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Phone size={14} color="#6B7280" />
                      <Typography variant="caption">{user.phone}</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <MapPin size={14} color="#6B7280" />
                      <Typography variant="body2">
                        {user.location?.city || user.city || 'N/A'}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {user.location?.state || user.zone || 'N/A'}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(user.status)}
                    size="small"
                    sx={{
                      bgcolor: getStatusColor(user.status) + '15',
                      color: getStatusColor(user.status),
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.type === 'individual' ? 'Individual' : 'Enterprise'}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: '#3B82F6',
                      color: '#3B82F6',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.totalRecycles.toLocaleString()}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    ₦{user.walletBalance.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, user);
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

      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} users`}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          if (selectedUser) {
            onUserClick(selectedUser);
          }
          handleMenuClose();
        }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Shield size={16} />
            <Typography variant="body2">View Details</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={1} alignItems="center">
            <UserCheck size={16} />
            <Typography variant="body2">Reactivate</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Flag size={16} />
            <Typography variant="body2">Flag for Review</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default UserTable;
