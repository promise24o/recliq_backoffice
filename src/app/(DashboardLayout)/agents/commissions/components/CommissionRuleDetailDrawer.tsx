'use client'
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  Avatar,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from '@mui/material';
import {
  IconUser,
  IconMapPin,
  IconCalendar,
  IconCheck,
  IconX,
  IconBan,
  IconClock,
  IconEye,
  IconFileText,
  IconNotes,
  IconHistory,
  IconPercentage,
  IconAdjustments,
  IconRefresh,
  IconCopy,
  IconEdit,
  IconTrendingUp,
  IconTrendingDown,
  IconAlertTriangle,
  IconX as IconClose,
} from '@tabler/icons-react';

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

interface CommissionRuleDetailDrawerProps {
  rule: CommissionRule | null;
  open: boolean;
  onClose: () => void;
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

const CommissionRuleDetailDrawer: React.FC<CommissionRuleDetailDrawerProps> = ({
  rule,
  open,
  onClose,
  onRuleAction,
  formatRate
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    action: string;
    title: string;
    description: string;
  }>({
    open: false,
    action: '',
    title: '',
    description: ''
  });
  const [actionReason, setActionReason] = useState('');

  if (!rule) return null;

  const handleAction = (action: string) => {
    if (action === 'deactivate') {
      setActionDialog({
        open: true,
        action,
        title: 'Confirm Deactivation',
        description: `Please provide a reason for deactivating ${rule.name}`
      });
    } else {
      onRuleAction(action, rule);
    }
  };

  const handleActionConfirm = () => {
    onRuleAction(actionDialog.action, rule, actionReason);
    setActionDialog({ open: false, action: '', title: '', description: '' });
    setActionReason('');
    onClose();
  };

  const getScopeLabel = (scope: string) => {
    switch (scope) {
      case 'global': return 'Global (All agents)';
      case 'city': return 'City-specific';
      case 'agent_group': return 'Agent Group';
      case 'individual_agent': return 'Individual Agent';
      default: return scope;
    }
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

  const calculateImpact = () => {
    // Example calculation for impact preview
    const examplePickupValue = 1000; // ₦
    let commission = 0;
    
    switch (rule.rateType) {
      case 'percentage':
        commission = examplePickupValue * (rule.value / 100);
        break;
      case 'flat_per_pickup':
        commission = rule.value;
        break;
      case 'per_kg':
        commission = rule.value * 10; // Assuming 10kg example
        break;
    }
    
    const agentPayout = examplePickupValue - commission;
    
    return {
      pickupValue: examplePickupValue,
      commission,
      agentPayout,
      commissionRate: (commission / examplePickupValue) * 100
    };
  };

  const impact = calculateImpact();

  return (
    <>
      <Box sx={{ width: 600, height: '100%', overflow: 'auto' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {rule.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {rule.id} • {formatRate(rule)}
              </Typography>
            </Box>
            <IconButton onClick={onClose}>
              <IconClose size={20} />
            </IconButton>
          </Stack>
        </Box>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 3 }}>
          <Tab label="Rule Details" />
          <Tab label="Conditions" />
          <Tab label="Impact Preview" />
          <Tab label="Actions" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Rule Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Scope
                    </Typography>
                    <Box mt={1}>
                      <ScopeChip scope={rule.scope} />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Box mt={1}>
                      <StatusChip status={rule.status} />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Rate Type
                    </Typography>
                    <Typography variant="body1">
                      {rule.rateType.replace('_', ' ').charAt(0).toUpperCase() + rule.rateType.replace('_', ' ').slice(1)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Value
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      {formatRate(rule)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Applies To
                    </Typography>
                    <Typography variant="body1">
                      {getAppliesToLabel(rule.appliesTo)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Effective Period
                    </Typography>
                    <Typography variant="body1">
                      {rule.effectiveDate}
                    </Typography>
                    {rule.expiryDate && (
                      <Typography variant="caption" color="text.secondary">
                        to {rule.expiryDate}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Audit Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Created By
                    </Typography>
                    <Typography variant="body1">
                      {rule.createdBy}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Created Date
                    </Typography>
                    <Typography variant="body1">
                      {rule.createdAt}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Last Modified
                    </Typography>
                    <Typography variant="body1">
                      {rule.lastModified}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          )}

          {activeTab === 1 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Rule Conditions
              </Typography>
              
              {rule.conditions.pickupType && (
                <Box>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Pickup Types
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {rule.conditions.pickupType.map((type, index) => (
                      <Chip key={index} label={type} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </Box>
              )}

              {rule.conditions.materialType && (
                <Box>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Material Types
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {rule.conditions.materialType.map((type, index) => (
                      <Chip key={index} label={type} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </Box>
              )}

              {(rule.conditions.minWeight !== undefined || rule.conditions.maxWeight !== undefined) && (
                <Box>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Weight Range
                  </Typography>
                  <Typography variant="body2">
                    {rule.conditions.minWeight !== undefined && `Min: ${rule.conditions.minWeight}kg`}
                    {rule.conditions.minWeight !== undefined && rule.conditions.maxWeight !== undefined && ' • '}
                    {rule.conditions.maxWeight !== undefined && `Max: ${rule.conditions.maxWeight}kg`}
                  </Typography>
                </Box>
              )}

              {rule.conditions.performanceThresholds && (
                <Box>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Performance Thresholds
                  </Typography>
                  <Stack spacing={1}>
                    {rule.conditions.performanceThresholds.minCompletionRate && (
                      <Typography variant="body2">
                        Min Completion Rate: {rule.conditions.performanceThresholds.minCompletionRate}%
                      </Typography>
                    )}
                    {rule.conditions.performanceThresholds.minRating && (
                      <Typography variant="body2">
                        Min Rating: {rule.conditions.performanceThresholds.minRating}★
                      </Typography>
                    )}
                  </Stack>
                </Box>
              )}
            </Stack>
          )}

          {activeTab === 2 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Impact Preview
              </Typography>
              
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Example Pickup Calculation
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Pickup Value:</Typography>
                      <Typography variant="body2">₦ {impact.pickupValue}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Commission ({formatRate(rule)}):</Typography>
                      <Typography variant="body2" color="error.main">-₦ {impact.commission}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight={600}>Agent Payout:</Typography>
                      <Typography variant="body2" color="success.main" fontWeight={600}>
                        ₦ {impact.agentPayout}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        Effective Commission Rate:
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {impact.commissionRate.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Alert severity="info">
                <Typography variant="body2">
                  This is an example calculation. Actual commissions may vary based on pickup specifics and agent performance.
                </Typography>
              </Alert>
            </Stack>
          )}

          {activeTab === 3 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Rule Actions
              </Typography>
              
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<IconEdit size={16} />}
                  onClick={() => handleAction('edit')}
                >
                  Edit Rule
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconCopy size={16} />}
                  onClick={() => handleAction('duplicate')}
                >
                  Duplicate Rule
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconCalendar size={16} />}
                  onClick={() => handleAction('schedule')}
                >
                  Schedule Change
                </Button>
                {rule.status === 'active' && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<IconBan size={16} />}
                    onClick={() => handleAction('deactivate')}
                  >
                    Deactivate Rule
                  </Button>
                )}
              </Stack>

              <Alert severity="warning">
                <Typography variant="body2">
                  ⚠️ Editing creates a new version and never overwrites history. All changes are audited and require confirmation.
                </Typography>
              </Alert>
            </Stack>
          )}
        </Box>
      </Box>

      {/* Action Dialog */}
      <Dialog open={actionDialog.open} onClose={() => setActionDialog({ ...actionDialog, open: false })} maxWidth="sm" fullWidth>
        <DialogTitle>{actionDialog.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {actionDialog.description}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason"
            value={actionReason}
            onChange={(e) => setActionReason(e.target.value)}
            placeholder="Please provide a detailed reason..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialog({ ...actionDialog, open: false })}>
            Cancel
          </Button>
          <Button 
            onClick={handleActionConfirm} 
            variant="contained"
            disabled={!actionReason.trim()}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommissionRuleDetailDrawer;
