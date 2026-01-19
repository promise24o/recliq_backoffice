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
  IconUserCircle,
  IconBuilding,
  IconPhone,
  IconMapPin,
  IconClock,
  IconSend,
  IconSearch,
  IconCheck,
  IconX,
  IconAlertTriangle,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface KYCUser {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  type: 'individual' | 'enterprise';
  kycStatus: 'not_started' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired';
  submittedOn: string;
  reviewedOn?: string;
  reviewer?: string;
  documents: {
    governmentId: string;
    selfie: string;
    proofOfAddress?: string;
  };
  rejectionReason?: string;
}

interface KYCUsersTableProps {
  users: KYCUser[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onUserClick: (user: KYCUser) => void;
}

const KYCUsersTable: React.FC<KYCUsersTableProps> = ({
  users,
  page,
  rowsPerPage,
  onPageChange,
  onUserClick
}) => {
  const [actionMenuAnchor, setActionMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = React.useState<KYCUser | null>(null);

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'info';
      case 'submitted': return 'warning';
      case 'under_review': return 'info';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const getKYCStatusIcon = (status: string) => {
    switch (status) {
      case 'not_started': return <IconClock size={16} />;
      case 'submitted': return <IconSend size={16} />;
      case 'under_review': return <IconSearch size={16} />;
      case 'approved': return <IconCheck size={16} />;
      case 'rejected': return <IconX size={16} />;
      case 'expired': return <IconAlertTriangle size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const getKYCStatusLabel = (status: string) => {
    switch (status) {
      case 'not_started': return 'Not Started';
      case 'submitted': return 'Submitted';
      case 'under_review': return 'Under Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'expired': return 'Expired';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, user: KYCUser) => {
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
              <TableCell>User Type</TableCell>
              <TableCell>KYC Status</TableCell>
              <TableCell>Submitted On</TableCell>
              <TableCell>Reviewed On</TableCell>
              <TableCell>Reviewer</TableCell>
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
                  <Typography variant="body2">
                    {user.type === 'enterprise' ? 'Enterprise' : 'Individual'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getKYCStatusIcon(user.kycStatus)}
                    label={getKYCStatusLabel(user.kycStatus)}
                    color={getKYCStatusColor(user.kycStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(user.submittedOn)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(user.reviewedOn || '')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {user.reviewer || '-'}
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
                      Review KYC
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

export default KYCUsersTable;
