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

interface RiskAgent {
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
  agentType: 'individual' | 'fleet';
  riskTimeline: any[];
  activityContext: any;
}

interface SuspendedFlaggedAgentsTableProps {
  agents: RiskAgent[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onAgentClick: (agent: RiskAgent) => void;
}

const SuspendedFlaggedAgentsTable: React.FC<SuspendedFlaggedAgentsTableProps> = ({
  agents,
  page,
  rowsPerPage,
  onPageChange,
  onAgentClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedAgent, setSelectedAgent] = React.useState<RiskAgent | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, agent: RiskAgent) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedAgent(agent);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAgent(null);
  };

  const getRiskStateColor = (state: string) => {
    switch (state) {
      case 'flagged': return 'warning';
      case 'temporarily_suspended': return 'warning';
      case 'permanently_banned': return 'error';
      case 'compliance_hold': return 'info';
      case 'active': return 'success';
      default: return 'default';
    }
  };

  const getRiskStateIcon = (state: string) => {
    switch (state) {
      case 'flagged': return <IconAlertTriangle size={14} />;
      case 'temporarily_suspended': return <IconClock size={14} />;
      case 'permanently_banned': return <IconBan size={14} />;
      case 'compliance_hold': return <IconShield size={14} />;
      case 'active': return <IconUser size={14} />;
      default: return <IconUserCircle size={14} />;
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'default';
      case 'submitted': return 'info';
      case 'under_review': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'expired': return 'error';
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

  const paginatedAgents = agents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <DashboardCard title="Suspended & Flagged Agents">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Agent</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Risk State</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Since</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell>Flagged By</TableCell>
              <TableCell>KYC</TableCell>
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
                      <IconUser size={16} />
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
                  <Box>
                    <Typography variant="body2">
                      {agent.phone}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {agent.agentType}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">
                      {agent.city}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {agent.zone}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getRiskStateIcon(agent.riskState)}
                    label={agent.riskState.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    color={getRiskStateColor(agent.riskState) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200 }}>
                    {agent.reason}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(agent.since)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {agent.expires ? formatDate(agent.expires) : 'Never'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {agent.flaggedBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={agent.kycStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    color={getKycStatusColor(agent.kycStatus) as any}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, agent)}
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
      {agents.length > rowsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={Math.ceil(agents.length / rowsPerPage)}
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
        <MenuItem onClick={() => { onAgentClick(selectedAgent!); handleMenuClose(); }}>
          <IconEye size={16} style={{ marginRight: 8 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <IconUserCircle size={16} style={{ marginRight: 8 }} />
          View Profile
        </MenuItem>
      </Menu>
    </DashboardCard>
  );
};

export default SuspendedFlaggedAgentsTable;
