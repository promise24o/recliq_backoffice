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
  IconButton,
  Avatar,
} from '@mui/material';
import {
  IconEdit,
  IconUser,
  IconAdjustments,
  IconCalendar,
  IconCheck,
  IconX,
  IconClock,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AgentOverride {
  id: string;
  agentId: string;
  agentName: string;
  ruleId: string;
  ruleName: string;
  customRate: number;
  rateType: 'percentage' | 'flat_per_pickup' | 'per_kg';
  reason: string;
  startDate: string;
  endDate?: string;
  approvedBy: string;
  status: 'active' | 'expired' | 'pending';
}

interface AgentOverridesProps {
  overrides: AgentOverride[];
  onEdit: (override: AgentOverride) => void;
}

const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'success', icon: <IconCheck size={14} />, label: 'Active' };
      case 'expired':
        return { color: 'error', icon: <IconX size={14} />, label: 'Expired' };
      case 'pending':
        return { color: 'warning', icon: <IconClock size={14} />, label: 'Pending' };
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

const RateTypeChip: React.FC<{ type: string }> = ({ type }) => {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'percentage':
        return { color: 'success', label: '%' };
      case 'flat_per_pickup':
        return { color: 'info', label: 'Flat' };
      case 'per_kg':
        return { color: 'warning', label: '/kg' };
      default:
        return { color: 'default', label: type };
    }
  };

  const config = getTypeConfig(type);

  return (
    <Chip
      color={config.color as any}
      label={config.label}
      size="small"
      variant="outlined"
    />
  );
};

const AgentOverrides: React.FC<AgentOverridesProps> = ({ overrides, onEdit }) => {
  const formatRate = (override: AgentOverride) => {
    switch (override.rateType) {
      case 'percentage':
        return `${override.customRate}%`;
      case 'flat_per_pickup':
        return `₦${override.customRate}`;
      case 'per_kg':
        return `₦${override.customRate}/kg`;
      default:
        return override.customRate.toString();
    }
  };

  const getDuration = (startDate: string, endDate?: string) => {
    if (endDate) {
      return `${startDate} to ${endDate}`;
    }
    return `From ${startDate}`;
  };

  return (
    <DashboardCard title="Agent-Level Overrides">
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Agents with custom commission rates for special circumstances
        </Typography>
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Agent</TableCell>
              <TableCell>Rule</TableCell>
              <TableCell>Custom Rate</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overrides.map((override) => (
              <TableRow key={override.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <IconUser size={20} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {override.agentName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {override.agentId}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {override.ruleName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {override.ruleId}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <RateTypeChip type={override.rateType} />
                    <Typography variant="body2" fontWeight={600}>
                      {formatRate(override)}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200 }}>
                    {override.reason}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {getDuration(override.startDate, override.endDate)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    by {override.approvedBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusChip status={override.status} />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(override)}
                    disabled={override.status === 'expired'}
                  >
                    <IconEdit size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {overrides.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <IconAdjustments size={48} color="grey" />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            No agent overrides configured
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Create custom commission rates for specific agents
          </Typography>
        </Box>
      )}
    </DashboardCard>
  );
};

export default AgentOverrides;
