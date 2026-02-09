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

interface Agent {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  type: 'individual' | 'company' | 'fleet';
  kycStatus: 'pending' | 'under_review' | 'verified' | 'rejected' | 'suspended';
  submittedOn: string;
  reviewedOn?: string;
  reviewer?: string;
  documents: {
    governmentId: string;
    agentPhoto: string;
    proofOfAddress?: string;
  };
  rejectionReason?: string;
}

interface VerificationTableProps {
  agents: Agent[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onAgentClick: (agent: Agent) => void;
}

const VerificationTable: React.FC<VerificationTableProps> = ({
  agents,
  page,
  rowsPerPage,
  onPageChange,
  onAgentClick
}) => {
  const [actionMenuAnchor, setActionMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedAgent, setSelectedAgent] = React.useState<Agent | null>(null);

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, agent: Agent) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedAgent(agent);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedAgent(null);
  };

  const handleViewAgent = () => {
    if (selectedAgent) {
      onAgentClick(selectedAgent);
    }
    handleActionMenuClose();
  };

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'under_review': return 'info';
      case 'verified': return 'success';
      case 'rejected': return 'error';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const getKYCStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <IconClock size={16} />;
      case 'under_review': return <IconSearch size={16} />;
      case 'verified': return <IconCheck size={16} />;
      case 'rejected': return <IconX size={16} />;
      case 'suspended': return <IconAlertTriangle size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const getKYCStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'under_review': return 'Under Review';
      case 'verified': return 'Verified';
      case 'rejected': return 'Rejected';
      case 'suspended': return 'Suspended';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const paginatedAgents = agents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <DashboardCard>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Agent</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>City / Zone</TableCell>
              <TableCell>Agent Type</TableCell>
              <TableCell>KYC Status</TableCell>
              <TableCell>Submitted On</TableCell>
              <TableCell>Reviewed On</TableCell>
              <TableCell>Reviewer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAgents.map((agent) => (
              <TableRow key={agent.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {agent.type === 'company' ? <IconBuilding size={16} /> : <IconUserCircle size={16} />}
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
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconPhone size={16} />
                    <Typography variant="body2">{agent.phone}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconMapPin size={16} />
                    <Box>
                      <Typography variant="body2">{agent.city}</Typography>
                      <Typography variant="caption" color="text.secondary">{agent.zone}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {agent.type === 'company' ? 'Company' : agent.type === 'fleet' ? 'Fleet' : 'Individual'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getKYCStatusIcon(agent.kycStatus)}
                    label={getKYCStatusLabel(agent.kycStatus)}
                    color={getKYCStatusColor(agent.kycStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(agent.submittedOn)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(agent.reviewedOn || '')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {agent.reviewer || '-'}
                  </Typography>
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
                    <MenuItem onClick={handleViewAgent}>
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
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, agents.length)} of {agents.length} agents
          </Typography>
          <Pagination
            count={Math.ceil(agents.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => onPageChange(value)}
            color="primary"
          />
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default VerificationTable;
