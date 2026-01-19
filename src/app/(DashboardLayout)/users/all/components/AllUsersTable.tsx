'use client'
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
} from '@mui/material';
import {
  IconDotsVertical,
  IconEye,
  IconBan,
  IconCheck,
  IconAlertTriangle,
  IconUserCircle,
  IconBuilding,
  IconPhone,
  IconMapPin,
  IconClock,
  IconTrendingUp,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

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

interface AllUsersTableProps {
  users: User[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onUserClick: (user: User) => void;
  onUserAction: (action: string, user: User) => void;
}

const AllUsersTable: React.FC<AllUsersTableProps> = ({
  users,
  page,
  rowsPerPage,
  onPageChange,
  onUserClick,
  onUserAction
}) => {
  const [actionMenuAnchor, setActionMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'dormant': return 'warning';
      case 'churned': return 'error';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <IconCheck size={16} />;
      case 'dormant': return <IconClock size={16} />;
      case 'churned': return <IconTrendingUp size={16} />;
      case 'suspended': return <IconBan size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedUser(user);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedUser(null);
  };

  const handleViewUser = () => {
    if (selectedUser) {
      onUserClick(selectedUser);
    }
    handleActionMenuClose();
  };

  const handleUserAction = (action: string) => {
    if (selectedUser) {
      onUserAction(action, selectedUser);
    }
    handleActionMenuClose();
  };

  // Pagination
  const paginatedUsers = users.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <DashboardCard>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>City / Zone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Total Recycles</TableCell>
              <TableCell>Last Activity</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {user.type === 'enterprise' ? <IconBuilding size={16} /> : <IconUserCircle size={16} />}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.id}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconPhone size={16} />
                    <Typography variant="body2">{user.phone}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconMapPin size={16} />
                    <Box>
                      <Typography variant="body2">{user.city}</Typography>
                      <Typography variant="caption" color="text.secondary">{user.zone}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(user.status)}
                    label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    color={getStatusColor(user.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {user.type === 'enterprise' ? 'Enterprise-linked' : 'Individual'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {user.totalRecycles}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(user.lastActivity)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(user.created)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleActionMenuOpen(e, user)}
                    size="small"
                  >
                    <IconDotsVertical size={16} />
                  </IconButton>
                  <Menu
                    anchorEl={actionMenuAnchor}
                    open={Boolean(actionMenuAnchor)}
                    onClose={handleActionMenuClose}
                  >
                    <MenuItem onClick={handleViewUser}>
                      <IconEye size={16} style={{ marginRight: 8 }} />
                      View Details
                    </MenuItem>
                    {selectedUser?.status === 'active' && (
                      <MenuItem onClick={() => handleUserAction('suspend')}>
                        <IconBan size={16} style={{ marginRight: 8 }} />
                        Suspend User
                      </MenuItem>
                    )}
                    {(selectedUser?.status === 'dormant' || selectedUser?.status === 'suspended') && (
                      <MenuItem onClick={() => handleUserAction('reactivate')}>
                        <IconCheck size={16} style={{ marginRight: 8 }} />
                        Reactivate
                      </MenuItem>
                    )}
                    <MenuItem onClick={() => handleUserAction('flag')}>
                      <IconAlertTriangle size={16} style={{ marginRight: 8 }} />
                      Flag for Review
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, users.length)} of {users.length} users
          </Typography>
          <Pagination
            count={Math.ceil(users.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => onPageChange(value)}
            color="primary"
          />
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default AllUsersTable;
