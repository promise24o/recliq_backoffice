'use client'
import React from 'react';
import {
  Box,
  Typography,
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
  Stack,
} from '@mui/material';
import {
  IconDotsVertical,
  IconPackage,
  IconWalk,
  IconCar,
  IconClock,
  IconUser,
  IconMapPin,
  IconEye,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface PickupRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  city: string;
  zone: string;
  pickupMode: 'pickup' | 'dropoff';
  matchType: 'auto' | 'user_selected';
  wasteType: 'plastic' | 'paper' | 'metal' | 'glass' | 'organic' | 'e_waste' | 'mixed';
  estimatedWeight: number;
  status: 'new' | 'matching' | 'assigned' | 'agent_en_route' | 'arrived' | 'completed' | 'cancelled' | 'failed';
  createdAt: string;
  assignedAgentId?: string;
  assignedAgentName?: string;
  slaDeadline: string;
  pricing: {
    baseAmount: number;
    bonusAmount: number;
    totalAmount: number;
    currency: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  notes?: string;
  matchingTimeline: any[];
  failureReason?: string;
  delayReason?: string;
}

interface PickupRequestsTableProps {
  requests: PickupRequest[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRequestClick: (request: PickupRequest) => void;
}

const PickupRequestsTable: React.FC<PickupRequestsTableProps> = ({
  requests,
  page,
  rowsPerPage,
  onPageChange,
  onRequestClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRequest, setSelectedRequest] = React.useState<PickupRequest | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, request: PickupRequest) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRequest(request);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRequest(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'info';
      case 'matching': return 'warning';
      case 'assigned': return 'success';
      case 'agent_en_route': return 'primary';
      case 'arrived': return 'secondary';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <IconPackage size={14} />;
      case 'matching': return <IconClock size={14} />;
      case 'assigned': return <IconCar size={14} />;
      case 'agent_en_route': return <IconCar size={14} />;
      case 'arrived': return <IconMapPin size={14} />;
      case 'completed': return <IconUser size={14} />;
      case 'cancelled': return <IconUser size={14} />;
      case 'failed': return <IconUser size={14} />;
      default: return <IconPackage size={14} />;
    }
  };

  const getPickupModeIcon = (mode: string) => {
    return mode === 'pickup' ? <IconCar size={14} /> : <IconWalk size={14} />;
  };

  const getMatchTypeColor = (type: string) => {
    return type === 'auto' ? 'success' : 'warning';
  };

  const getWasteTypeColor = (type: string) => {
    switch (type) {
      case 'plastic': return 'primary';
      case 'paper': return 'success';
      case 'metal': return 'secondary';
      case 'glass': return 'info';
      case 'organic': return 'success';
      case 'e_waste': return 'warning';
      case 'mixed': return 'default';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeSinceCreated = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${Math.floor(diffHours / 24)}d ago`;
    }
  };

  const getSLATimer = (slaDeadline: string) => {
    const now = new Date();
    const deadline = new Date(slaDeadline);
    const diffMs = deadline.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMs < 0) {
      return { text: 'Overdue', color: 'error' };
    } else if (diffMins < 15) {
      return { text: `${diffMins} min`, color: 'warning' };
    } else {
      return { text: `${diffMins} min`, color: 'success' };
    }
  };

  const paginatedRequests = requests.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <DashboardCard title="Pickup Requests">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>City / Zone</TableCell>
              <TableCell>Pickup Mode</TableCell>
              <TableCell>Match Type</TableCell>
              <TableCell>Waste Type</TableCell>
              <TableCell>Est. Weight</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time Since</TableCell>
              <TableCell>Assigned Agent</TableCell>
              <TableCell>SLA Timer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRequests.map((request) => (
              <TableRow
                key={request.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => onRequestClick(request)}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {request.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">
                      {request.userName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {request.userPhone}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">
                      {request.city}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {request.zone}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getPickupModeIcon(request.pickupMode)}
                    label={request.pickupMode === 'pickup' ? 'Agent → User' : 'User → Agent'}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.matchType === 'auto' ? 'Auto-matched' : 'User-selected'}
                    color={getMatchTypeColor(request.matchType) as any}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.wasteType.replace('_', ' ').toUpperCase()}
                    color={getWasteTypeColor(request.wasteType) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {request.estimatedWeight} kg
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(request.status)}
                    label={request.status.replace('_', ' ').toUpperCase()}
                    color={getStatusColor(request.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {getTimeSinceCreated(request.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell>
                  {request.assignedAgentName ? (
                    <Typography variant="body2">
                      {request.assignedAgentName}
                    </Typography>
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      Not assigned
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {(() => {
                    const sla = getSLATimer(request.slaDeadline);
                    return (
                      <Chip
                        label={sla.text}
                        color={sla.color as any}
                        size="small"
                        variant="outlined"
                      />
                    );
                  })()}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, request)}
                  >
                    <IconDotsVertical size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {requests.length > rowsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={Math.ceil(requests.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => onPageChange(value)}
            color="primary"
          />
        </Box>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { onRequestClick(selectedRequest!); handleMenuClose(); }}>
          <IconEye size={16} style={{ marginRight: 8 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <IconMapPin size={16} style={{ marginRight: 8 }} />
          View on Map
        </MenuItem>
      </Menu>
    </DashboardCard>
  );
};

export default PickupRequestsTable;
