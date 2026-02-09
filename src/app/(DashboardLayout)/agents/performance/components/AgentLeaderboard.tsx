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
  IconMessage,
  IconFlag,
  IconStar,
  IconLeaf,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AgentPerformance {
  id: string;
  name: string;
  avatar: string;
  area: string;
  pickups: number;
  avgRating: number;
  avgETA: number;
  completionRate: number;
  earnings: number;
  ecoScore: number;
  status: 'active' | 'on_duty' | 'offline';
}

interface AgentLeaderboardProps {
  agents: AgentPerformance[];
  onAgentAction: (action: string, agent: AgentPerformance) => void;
}

const AgentLeaderboard: React.FC<AgentLeaderboardProps> = ({
  agents,
  onAgentAction
}) => {
  const [actionMenuAnchor, setActionMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedAgent, setSelectedAgent] = React.useState<AgentPerformance | null>(null);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_duty': return 'success';
      case 'active': return 'info';
      case 'offline': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on_duty': return 'On Duty';
      case 'active': return 'Active';
      case 'offline': return 'Offline';
      default: return status;
    }
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, agent: AgentPerformance) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedAgent(agent);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedAgent(null);
  };

  const handleAction = (action: string) => {
    if (selectedAgent) {
      onAgentAction(action, selectedAgent);
    }
    handleActionMenuClose();
  };

  // Sort agents by pickups (descending)
  const sortedAgents = [...agents].sort((a, b) => b.pickups - a.pickups);
  
  // Pagination
  const paginatedAgents = sortedAgents.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <DashboardCard title="Agent Leaderboard">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Agent</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Pickups</TableCell>
              <TableCell>Avg Rating ⭐</TableCell>
              <TableCell>Avg ETA</TableCell>
              <TableCell>Completion %</TableCell>
              <TableCell>Earnings</TableCell>
              <TableCell>Eco Score 🌱</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAgents.map((agent, index) => (
              <TableRow key={agent.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {agent.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {agent.name}
                      </Typography>
                      <Chip
                        label={getStatusLabel(agent.status)}
                        color={getStatusColor(agent.status) as any}
                        size="small"
                      />
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {agent.area}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {agent.pickups}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconStar size={16} color="#FFC107" />
                    <Typography variant="body2">
                      {agent.avgRating.toFixed(1)}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {agent.avgETA} mins
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color={agent.completionRate > 95 ? 'success.main' : agent.completionRate > 90 ? 'warning.main' : 'error.main'}>
                    {agent.completionRate}%
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(agent.earnings)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconLeaf size={16} color="#4CAF50" />
                    <Typography variant="body2">
                      {agent.ecoScore}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleActionMenuOpen(e, agent)}
                    size="small"
                  >
                    <IconDotsVertical size={16} />
                  </IconButton>
                  <Menu
                    anchorEl={actionMenuAnchor}
                    open={Boolean(actionMenuAnchor)}
                    onClose={handleActionMenuClose}
                  >
                    <MenuItem onClick={() => handleAction('view_profile')}>
                      View Profile
                    </MenuItem>
                    <MenuItem onClick={() => handleAction('message')}>
                      <IconMessage size={16} style={{ marginRight: 8 }} />
                      Message
                    </MenuItem>
                    <MenuItem onClick={() => handleAction('flag')}>
                      <IconFlag size={16} style={{ marginRight: 8 }} />
                      Flag Agent
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

export default AgentLeaderboard;
