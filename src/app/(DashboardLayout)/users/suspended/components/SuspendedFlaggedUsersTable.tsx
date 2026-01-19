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
  IconBan,
  IconClock,
  IconAlertTriangle,
  IconShield,
  IconUser,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface RiskUser {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  riskState: 'active' | 'flagged' | 'temporarily_suspended' | 'permanently_banned' | 'compliance_hold';
  reason: string;
  since: string;
  expires?: string;
  flaggedBy: string;
  lastActivity: string;
  accountAge: string;
  kycStatus: 'not_started' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired';
  riskTimeline: any[];
  activityContext: any;
}

interface SuspendedFlaggedUsersTableProps {
  users: RiskUser[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onUserClick: (user: RiskUser) => void;
}

const SuspendedFlaggedUsersTable: React.FC<SuspendedFlaggedUsersTableProps> = ({
  users,
  page,
  rowsPerPage,
  onPageChange,
  onUserClick
}) => {
  const [actionMenuAnchor, setActionMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = React.useState<RiskUser | null>(null);

  const getRiskStateColor = (state: string) => {
    switch (state) {
      case 'flagged': return 'info';
      case 'temporarily_suspended': return 'warning';
      case 'permanently_banned': return 'error';
      case 'compliance_hold': return 'warning';
      default: return 'default';
    }
  };

  const getRiskStateIcon = (state: string) => {
    switch (state) {
      case 'flagged': return <IconAlertTriangle size={16} />;
      case 'temporarily_suspended': return <IconClock size={16} />;
      case 'permanently_banned': return <IconBan size={16} />;
      case 'compliance_hold': return <IconShield size={16} />;
      default: return <IconUser size={16} />;
    }
  };

  const getRiskStateLabel = (state: string) => {
    switch (state) {
      case 'flagged': return 'Flagged';
      case 'temporarily_suspended': return 'Temporarily Suspended';
      case 'permanently_banned': return 'Permanently Banned';
      case 'compliance_hold': return 'Compliance Hold';
      default: return 'Active';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const getReasonColor = (reason: string) => {
    if (reason.toLowerCase().includes('fraud')) return 'error';
    if (reason.toLowerCase().includes('no-show')) return 'warning';
    if (reason.toLowerCase().includes('abuse')) return 'error';
    if (reason.toLowerCase().includes('dispute')) return 'warning';
    if (reason.toLowerCase().includes('compliance')) return 'info';
    return 'default';
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, user: RiskUser) => {
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
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          🚨 Canonical risk registry - All restrictions are traceable and auditable
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Risk State</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Since</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell>Flagged By</TableCell>
              <TableCell>Last Activity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow 
                key={user.id} 
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'error.main' }}>
                      <IconBan size={16} />
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
                  <Typography variant="body2">{user.city}</Typography>
                  <Typography variant="caption" color="text.secondary">{user.zone}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getRiskStateIcon(user.riskState)}
                    label={getRiskStateLabel(user.riskState)}
                    color={getRiskStateColor(user.riskState) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.reason.length > 30 ? user.reason.substring(0, 30) + '...' : user.reason}
                    color={getReasonColor(user.reason) as any}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(user.since)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color={user.expires ? 'warning.main' : 'error.main'}>
                    {user.expires ? formatDate(user.expires) : 'Never'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {user.flaggedBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(user.lastActivity)}
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
                      View Risk Details
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, users.length)} of {users.length} risky users
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

export default SuspendedFlaggedUsersTable;
