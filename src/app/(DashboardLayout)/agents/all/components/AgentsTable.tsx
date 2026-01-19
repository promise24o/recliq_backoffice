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
  IconPhone,
  IconMapPin,
  IconClock,
  IconTrendingUp,
  IconNavigation,
  IconPackage,
  IconStar,
  IconWallet,
  IconFlag,
  IconPlayerPlay,
  IconEdit,
  IconSnowflake,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface Agent {
  id: string;
  name: string;
  phone: string;
  photo: string;
  city: string;
  zone: string;
  status: 'active' | 'idle' | 'en_route' | 'offline' | 'suspended' | 'flagged';
  tier: 'regular' | 'power_agent' | 'enterprise';
  kycStatus: 'not_started' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired';
  vehicleType: 'bicycle' | 'motorcycle' | 'van' | 'truck';
  performanceTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  activePickups: number;
  todayCompleted: number;
  completionRate: number;
  avgPickupTime: number;
  walletBalance: number;
  currentPickup?: {
    id: string;
    address: string;
    estimatedTime: string;
  };
  lastCompletedPickup?: {
    id: string;
    address: string;
    completedAt: string;
  };
  timeSinceLastActivity: string;
  disputes: number;
  userRating: number;
  reliabilityScore: number;
  escrow: number;
  pendingPayouts: number;
  flags: number;
  suspensions: number;
  complaints: number;
  notes: string;
}

interface AgentsTableProps {
  agents: Agent[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onAgentClick: (agent: Agent) => void;
  onAgentAction: (action: string, agent: Agent, reason?: string) => void;
}

const AgentsTable: React.FC<AgentsTableProps> = ({
  agents,
  page,
  rowsPerPage,
  onPageChange,
  onAgentClick,
  onAgentAction
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedAgent, setSelectedAgent] = React.useState<Agent | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, agent: Agent) => {
    setAnchorEl(event.currentTarget);
    setSelectedAgent(agent);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAgent(null);
  };

  const handleAction = (action: string) => {
    if (selectedAgent) {
      onAgentAction(action, selectedAgent);
    }
    handleMenuClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'idle': return 'info';
      case 'en_route': return 'primary';
      case 'offline': return 'warning';
      case 'suspended': return 'error';
      case 'flagged': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <IconCheck size={16} />;
      case 'idle': return <IconClock size={16} />;
      case 'en_route': return <IconNavigation size={16} />;
      case 'offline': return <IconClock size={16} />;
      case 'suspended': return <IconBan size={16} />;
      case 'flagged': return <IconAlertTriangle size={16} />;
      default: return <IconUserCircle size={16} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'idle': return 'Idle';
      case 'en_route': return 'En Route';
      case 'offline': return 'Offline';
      case 'suspended': return 'Suspended';
      case 'flagged': return 'Flagged';
      default: return 'Unknown';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'regular': return 'info';
      case 'power_agent': return 'warning';
      case 'enterprise': return 'error';
      default: return 'default';
    }
  };

  const getPerformanceColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return '#CD7F32';
      case 'silver': return '#C0C0C0';
      case 'gold': return '#FFD700';
      case 'platinum': return '#E5E4E2';
      default: return 'grey';
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'bicycle': return '🚴';
      case 'motorcycle': return '🏍️';
      case 'van': return '🚐';
      case 'truck': return '🚚';
      default: return '🚗';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const paginatedAgents = agents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <DashboardCard title="Agents">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Agent</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tier</TableCell>
              <TableCell>Performance</TableCell>
              <TableCell>Today</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Wallet</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAgents.map((agent) => (
              <TableRow
                key={agent.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => onAgentClick(agent)}
              >
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar 
                      src={agent.photo} 
                      sx={{ width: 40, height: 40 }}
                    >
                      <IconUserCircle size={24} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {agent.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {agent.id}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconMapPin size={14} />
                      <Typography variant="body2">
                        {agent.zone}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {agent.city} • {getVehicleIcon(agent.vehicleType)} {agent.vehicleType.replace('_', ' ')}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    <Chip
                      icon={getStatusIcon(agent.status)}
                      label={getStatusLabel(agent.status)}
                      color={getStatusColor(agent.status) as any}
                      size="small"
                    />
                    {agent.currentPickup && (
                      <Typography variant="caption" color="primary.main">
                        📍 {agent.currentPickup.estimatedTime}
                      </Typography>
                    )}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={agent.tier.replace('_', ' ').toUpperCase()}
                    color={getTierColor(agent.tier) as any}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: getPerformanceColor(agent.performanceTier),
                        }}
                      />
                      <Typography variant="body2" fontWeight={600}>
                        {agent.performanceTier.toUpperCase()}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {agent.completionRate.toFixed(1)}% • {agent.avgPickupTime}min
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" fontWeight={600}>
                      {agent.activePickups} active
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {agent.todayCompleted} completed
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <IconStar size={14} color="warning" />
                    <Typography variant="body2">
                      {agent.userRating.toFixed(1)}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600} color="success.main">
                    {formatCurrency(agent.walletBalance)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, agent);
                    }}
                  >
                    <IconDotsVertical size={16} />
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
      >
        <MenuItem onClick={() => handleAction('view')}>
          <IconEye size={16} style={{ marginRight: 8 }} />
          View Details
        </MenuItem>
        {selectedAgent?.status === 'active' || selectedAgent?.status === 'idle' ? [
          <MenuItem key="flag" onClick={() => handleAction('flag')}>
            <IconFlag size={16} style={{ marginRight: 8 }} />
            Flag for Review
          </MenuItem>,
          <MenuItem key="suspend" onClick={() => handleAction('suspend')}>
            <IconBan size={16} style={{ marginRight: 8 }} />
            Suspend Agent
          </MenuItem>
        ] : selectedAgent?.status === 'suspended' || selectedAgent?.status === 'flagged' ? (
          <MenuItem onClick={() => handleAction('reinstate')}>
            <IconPlayerPlay size={16} style={{ marginRight: 8 }} />
            Reinstate Agent
          </MenuItem>
        ) : null}
        <MenuItem onClick={() => handleAction('move_zone')}>
          <IconMapPin size={16} style={{ marginRight: 8 }} />
          Move Zone
        </MenuItem>
        <MenuItem onClick={() => handleAction('change_tier')}>
          <IconTrendingUp size={16} style={{ marginRight: 8 }} />
          Change Tier
        </MenuItem>
        <MenuItem onClick={() => handleAction('freeze_payouts')}>
          <IconSnowflake size={16} style={{ marginRight: 8 }} />
          Freeze Payouts
        </MenuItem>
      </Menu>

      {/* Pagination */}
      {agents.length > rowsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, pr: 2 }}>
          <Pagination
            count={Math.ceil(agents.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => onPageChange(value)}
            color="primary"
          />
        </Box>
      )}
    </DashboardCard>
  );
};

export default AgentsTable;
