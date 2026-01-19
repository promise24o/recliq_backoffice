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
  IconEdit,
  IconCalendar,
  IconClock,
  IconCheck,
  IconX,
  IconCopy,
  IconBan,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface CommissionRule {
  id: string;
  name: string;
  scope: 'global' | 'city' | 'agent_group' | 'individual_agent';
  rateType: 'percentage' | 'flat_per_pickup' | 'per_kg';
  value: number;
  appliesTo: 'user_pickups' | 'b2b_pickups' | 'disposal_jobs' | 'all_jobs';
  status: 'active' | 'scheduled' | 'expired';
  effectiveDate: string;
  expiryDate?: string;
  conditions: {
    pickupType?: string[];
    materialType?: string[];
    minWeight?: number;
    maxWeight?: number;
    performanceThresholds?: {
      minCompletionRate?: number;
      minRating?: number;
    };
  };
  createdBy: string;
  createdAt: string;
  lastModified: string;
}

interface CommissionRulesTableProps {
  rules: CommissionRule[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRuleClick: (rule: CommissionRule) => void;
  onRuleAction: (action: string, rule: CommissionRule, reason?: string) => void;
  formatRate: (rule: CommissionRule) => string;
}

const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'success', icon: <IconCheck size={14} />, label: 'Active' };
      case 'scheduled':
        return { color: 'warning', icon: <IconClock size={14} />, label: 'Scheduled' };
      case 'expired':
        return { color: 'error', icon: <IconX size={14} />, label: 'Expired' };
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

const ScopeChip: React.FC<{ scope: string }> = ({ scope }) => {
  const getScopeConfig = (scope: string) => {
    switch (scope) {
      case 'global':
        return { color: 'primary', label: 'Global' };
      case 'city':
        return { color: 'info', label: 'City' };
      case 'agent_group':
        return { color: 'warning', label: 'Agent Group' };
      case 'individual_agent':
        return { color: 'error', label: 'Individual Agent' };
      default:
        return { color: 'default', label: scope };
    }
  };

  const config = getScopeConfig(scope);

  return (
    <Chip
      color={config.color as any}
      label={config.label}
      size="small"
      variant="filled"
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

const CommissionRulesTable: React.FC<CommissionRulesTableProps> = ({
  rules,
  page,
  rowsPerPage,
  onPageChange,
  onRuleClick,
  onRuleAction,
  formatRate
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRule, setSelectedRule] = React.useState<CommissionRule | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, rule: CommissionRule) => {
    setAnchorEl(event.currentTarget);
    setSelectedRule(rule);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRule(null);
  };

  const handleAction = (action: string) => {
    if (selectedRule) {
      onRuleAction(action, selectedRule);
    }
    handleMenuClose();
  };

  const getAppliesToLabel = (appliesTo: string) => {
    switch (appliesTo) {
      case 'user_pickups': return 'User Pickups';
      case 'b2b_pickups': return 'B2B Pickups';
      case 'disposal_jobs': return 'Disposal Jobs';
      case 'all_jobs': return 'All Jobs';
      default: return appliesTo;
    }
  };

  const paginatedRules = rules.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <DashboardCard title="Commission Rules">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rule Name</TableCell>
              <TableCell>Scope</TableCell>
              <TableCell>Rate Type</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Applies To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Effective</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRules.map((rule) => (
              <TableRow
                key={rule.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => onRuleClick(rule)}
              >
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {rule.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {rule.id}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <ScopeChip scope={rule.scope} />
                </TableCell>
                <TableCell>
                  <RateTypeChip type={rule.rateType} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {formatRate(rule)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {getAppliesToLabel(rule.appliesTo)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusChip status={rule.status} />
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography variant="body2">
                      {rule.effectiveDate}
                    </Typography>
                    {rule.expiryDate && (
                      <Typography variant="caption" color="text.secondary">
                        to {rule.expiryDate}
                      </Typography>
                    )}
                  </Stack>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, rule);
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
        <MenuItem onClick={() => handleAction('edit')}>
          <IconEdit size={16} style={{ marginRight: 8 }} />
          Edit Rule
        </MenuItem>
        <MenuItem onClick={() => handleAction('duplicate')}>
          <IconCopy size={16} style={{ marginRight: 8 }} />
          Duplicate Rule
        </MenuItem>
        <MenuItem onClick={() => handleAction('schedule')}>
          <IconCalendar size={16} style={{ marginRight: 8 }} />
          Schedule Change
        </MenuItem>
        {selectedRule?.status === 'active' && (
          <MenuItem onClick={() => handleAction('deactivate')}>
            <IconBan size={16} style={{ marginRight: 8 }} />
            Deactivate Rule
          </MenuItem>
        )}
      </Menu>

      {/* Pagination */}
      {rules.length > rowsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, pr: 2 }}>
          <Pagination
            count={Math.ceil(rules.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => onPageChange(value)}
            color="primary"
          />
        </Box>
      )}
    </DashboardCard>
  );
};

export default CommissionRulesTable;
