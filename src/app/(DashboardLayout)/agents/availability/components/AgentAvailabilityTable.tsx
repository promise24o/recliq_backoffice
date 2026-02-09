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
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerStop,
  IconWifi,
  IconWifiOff,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AgentAvailability {
  id: string;
  name: string;
  city: string;
  zone: string;
  currentStatus: 'available' | 'busy' | 'idle' | 'offline' | 'suspended';
  lastActive: string;
  avgAvailability: number;
  idleTimeToday: number;
  assignedPickupsToday: number;
  agentType: 'individual' | 'fleet';
}

interface AgentAvailabilityTableProps {
  agents: AgentAvailability[];
  onAgentClick: (agent: AgentAvailability) => void;
}

const AgentAvailabilityTable: React.FC<AgentAvailabilityTableProps> = ({
  agents,
  onAgentClick
}) => {
  const [actionMenuAnchor, setActionMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedAgent, setSelectedAgent] = React.useState<AgentAvailability | null>(null);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'busy': return 'info';
      case 'idle': return 'warning';
      case 'offline': return 'error';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <IconPlayerPlay size={16} />;
      case 'busy': return <IconPlayerStop size={16} />;
      case 'idle': return <IconPlayerPause size={16} />;
      case 'offline': return <IconWifiOff size={16} />;
      case 'suspended': return <IconWifiOff size={16} />;
      default: return <IconWifi size={16} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'idle': return 'Idle';
      case 'offline': return 'Offline';
      case 'suspended': return 'Suspended';
      default: return status;
    }
  };

  const formatLastActive = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const formatIdleTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, agent: AgentAvailability) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedAgent(agent);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedAgent(null);
  };

  const handleAction = (action: string) => {
    if (selectedAgent) {
      console.log(`${action} for ${selectedAgent.name}`);
    }
    handleActionMenuClose();
  };

  // Pagination
  const paginatedAgents = agents.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <DashboardCard title="Agent Availability">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Agent</TableCell>
              <TableCell>City / Zone</TableCell>
              <TableCell>Current Status</TableCell>
              <TableCell>Last Active</TableCell>
              <TableCell>Avg Availability %</TableCell>
              <TableCell>Idle Time (today)</TableCell>
              <TableCell>Assigned Pickups (today)</TableCell>
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
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {agent.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {agent.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {agent.agentType === 'fleet' ? 'Fleet' : 'Individual'}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {agent.city}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {agent.zone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(agent.currentStatus)}
                    label={getStatusLabel(agent.currentStatus)}
                    color={getStatusColor(agent.currentStatus) as any}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatLastActive(agent.lastActive)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    color={agent.avgAvailability > 80 ? 'success.main' : agent.avgAvailability > 60 ? 'warning.main' : 'error.main'}
                  >
                    {agent.avgAvailability.toFixed(1)}%
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatIdleTime(agent.idleTimeToday)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {agent.assignedPickupsToday}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionMenuOpen(e, agent);
                    }}
                    size="small"
                  >
                    <IconDotsVertical size={16} />
                  </IconButton>
                  <Menu
                    anchorEl={actionMenuAnchor}
                    open={Boolean(actionMenuAnchor)}
                    onClose={handleActionMenuClose}
                  >
                    <MenuItem onClick={() => handleAction('view_details')}>
                      View Details
                    </MenuItem>
                    <MenuItem onClick={() => handleAction('send_reminder')}>
                      Send Availability Reminder
                    </MenuItem>
                    <MenuItem onClick={() => handleAction('adjust_eligibility')}>
                      Adjust Assignment Eligibility
                    </MenuItem>
                    <MenuItem onClick={() => handleAction('flag_followup')}>
                      Flag for Ops Follow-up
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, agents.length)} of {agents.length} agents
          </Typography>
          <Pagination
            count={Math.ceil(agents.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default AgentAvailabilityTable;
