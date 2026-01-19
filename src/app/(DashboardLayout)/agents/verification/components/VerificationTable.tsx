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
  IconUser,
  IconMapPin,
  IconFileText,
  IconCalendar,
  IconShield,
  IconAlertTriangle,
  IconFlag,
  IconCheck,
  IconX,
  IconBan,
  IconClock,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface KYCDocument {
  id: string;
  type: 'government_id' | 'address_proof' | 'company_registration' | 'vehicle_details' | 'agent_photo';
  status: 'valid' | 'expired' | 'rejected' | 'pending';
  uploadedDate: string;
  reviewerNotes?: string;
  url: string;
}

interface Agent {
  id: string;
  name: string;
  type: 'individual' | 'company' | 'fleet';
  city: string;
  zone: string;
  signupDate: string;
  kycStatus: 'pending' | 'under_review' | 'verified' | 'rejected' | 'suspended';
  submittedDocs: number;
  lastReviewDate?: string;
  riskFlag: 'low' | 'medium' | 'high';
  documents: KYCDocument[];
  verificationTimeline: {
    signup: string;
    documentSubmission?: string;
    reviewStart?: string;
    approval?: string;
    rejection?: string;
    suspension?: string;
  };
  riskHistory: {
    disputes: number;
    missedPickups: number;
    complaints: number;
    priorRejections: number;
  };
  notes?: string;
}

interface VerificationTableProps {
  agents: Agent[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onAgentClick: (agent: Agent) => void;
  onAgentAction: (action: string, agent: Agent, reason?: string) => void;
}

const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'verified':
        return { color: 'success', icon: <IconCheck size={14} />, label: 'Verified' };
      case 'pending':
        return { color: 'warning', icon: <IconClock size={14} />, label: 'Pending' };
      case 'under_review':
        return { color: 'info', icon: <IconEye size={14} />, label: 'Under Review' };
      case 'rejected':
        return { color: 'error', icon: <IconX size={14} />, label: 'Rejected' };
      case 'suspended':
        return { color: 'error', icon: <IconBan size={14} />, label: 'Suspended' };
      default:
        return { color: 'default', icon: <IconClock size={14} />, label: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      color={config.color as any}
      icon={config.icon}
      label={config.label}
      size="small"
      variant="outlined"
    />
  );
};

const RiskChip: React.FC<{ risk: string }> = ({ risk }) => {
  const getRiskConfig = (risk: string) => {
    switch (risk) {
      case 'low':
        return { color: 'success', icon: <IconShield size={14} /> };
      case 'medium':
        return { color: 'warning', icon: <IconAlertTriangle size={14} /> };
      case 'high':
        return { color: 'error', icon: <IconFlag size={14} /> };
      default:
        return { color: 'default', icon: <IconShield size={14} /> };
    }
  };

  const config = getRiskConfig(risk);

  return (
    <Chip
      color={config.color as any}
      icon={config.icon}
      label={risk.charAt(0).toUpperCase() + risk.slice(1) + ' Risk'}
      size="small"
      variant="filled"
    />
  );
};

const VerificationTable: React.FC<VerificationTableProps> = ({
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'individual': return 'info';
      case 'company': return 'warning';
      case 'fleet': return 'error';
      default: return 'default';
    }
  };

  const paginatedAgents = agents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <DashboardCard title="Agent Verification">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Agent</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>City / Zone</TableCell>
              <TableCell>Submitted Docs</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Review</TableCell>
              <TableCell>Risk Flag</TableCell>
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
                    <Avatar sx={{ width: 40, height: 40 }}>
                      <IconUser size={24} />
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
                  <Chip
                    label={agent.type.charAt(0).toUpperCase() + agent.type.slice(1)}
                    color={getTypeColor(agent.type) as any}
                    size="small"
                    variant="outlined"
                  />
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
                      {agent.city}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconFileText size={16} />
                    <Typography variant="body2">
                      {agent.submittedDocs}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <StatusChip status={agent.kycStatus} />
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconCalendar size={14} />
                      <Typography variant="body2">
                        {agent.lastReviewDate || '-'}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <RiskChip risk={agent.riskFlag} />
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
        {selectedAgent?.kycStatus === 'pending' || selectedAgent?.kycStatus === 'under_review' ? (
          <>
            <MenuItem onClick={() => handleAction('approve')}>
              <IconCheck size={16} style={{ marginRight: 8 }} />
              Approve Verification
            </MenuItem>
            <MenuItem onClick={() => handleAction('reject')}>
              <IconX size={16} style={{ marginRight: 8 }} />
              Reject Verification
            </MenuItem>
          </>
        ) : null}
        {selectedAgent?.kycStatus === 'verified' && (
          <MenuItem onClick={() => handleAction('suspend')}>
            <IconBan size={16} style={{ marginRight: 8 }} />
            Suspend Agent
          </MenuItem>
        )}
        <MenuItem onClick={() => handleAction('add_note')}>
          <IconFileText size={16} style={{ marginRight: 8 }} />
          Add Compliance Note
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

export default VerificationTable;
