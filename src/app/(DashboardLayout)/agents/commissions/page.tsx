'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  LinearProgress,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  CardContent,
  Grid,
} from '@mui/material';
import {
  IconSearch,
  IconFilter,
  IconPlus,
  IconRefresh,
} from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';

// Try regular imports with error handling
let CommissionSummaryCards: any = null;
let CommissionRulesTable: any = null;
let CommissionRuleDetailDrawer: any = null;
let AgentOverrides: any = null;
let CommissionChangeLog: any = null;

try {
  CommissionSummaryCards = require('./components/CommissionSummaryCards').default;
  CommissionRulesTable = require('./components/CommissionRulesTable').default;
  CommissionRuleDetailDrawer = require('./components/CommissionRuleDetailDrawer').default;
  AgentOverrides = require('./components/AgentOverrides').default;
  CommissionChangeLog = require('./components/CommissionChangeLog').default;
} catch (error) {
  console.warn('Some commission components could not be loaded:', error);
}

// Types
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

interface CommissionChange {
  id: string;
  changedBy: string;
  ruleId: string;
  ruleName: string;
  oldValue: string;
  newValue: string;
  changeDate: string;
  reason: string;
}

interface CommissionSummary {
  activeRules: number;
  avgCommissionRate: number;
  agentsAffected: number;
  customOverrides: number;
}

// Mock Data
const mockRules: CommissionRule[] = [
  {
    id: 'RULE001',
    name: 'Standard Commission - Nairobi',
    scope: 'city',
    rateType: 'percentage',
    value: 12,
    appliesTo: 'user_pickups',
    status: 'active',
    effectiveDate: '2024-01-01',
    conditions: {
      pickupType: ['standard', 'express'],
      materialType: ['PET', 'mixed'],
      minWeight: 1,
      maxWeight: 100
    },
    createdBy: 'finance@recliq.com',
    createdAt: '2024-01-01',
    lastModified: '2024-01-01'
  },
  {
    id: 'RULE002',
    name: 'B2B Premium Rate',
    scope: 'global',
    rateType: 'flat_per_pickup',
    value: 50,
    appliesTo: 'b2b_pickups',
    status: 'active',
    effectiveDate: '2024-01-01',
    conditions: {
      pickupType: ['b2b'],
      materialType: ['all'],
      performanceThresholds: {
        minCompletionRate: 95,
        minRating: 4.5
      }
    },
    createdBy: 'finance@recliq.com',
    createdAt: '2024-01-01',
    lastModified: '2024-01-01'
  },
  {
    id: 'RULE003',
    name: 'Metal Recycling Special',
    scope: 'global',
    rateType: 'per_kg',
    value: 2.5,
    appliesTo: 'all_jobs',
    status: 'active',
    effectiveDate: '2024-01-01',
    conditions: {
      materialType: ['metal', 'aluminum'],
      minWeight: 5
    },
    createdBy: 'finance@recliq.com',
    createdAt: '2024-01-01',
    lastModified: '2024-01-01'
  },
  {
    id: 'RULE004',
    name: 'Holiday Rate Adjustment',
    scope: 'global',
    rateType: 'percentage',
    value: 15,
    appliesTo: 'user_pickups',
    status: 'scheduled',
    effectiveDate: '2024-12-20',
    expiryDate: '2024-12-31',
    conditions: {
      pickupType: ['standard', 'express']
    },
    createdBy: 'finance@recliq.com',
    createdAt: '2024-01-15',
    lastModified: '2024-01-15'
  }
];

const mockOverrides: AgentOverride[] = [
  {
    id: 'OV001',
    agentId: 'AGT001',
    agentName: 'Samuel Kamau',
    ruleId: 'RULE001',
    ruleName: 'Standard Commission - Nairobi',
    customRate: 10,
    rateType: 'percentage',
    reason: 'High-performing agent incentive',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    approvedBy: 'finance@recliq.com',
    status: 'active'
  },
  {
    id: 'OV002',
    agentId: 'AGT003',
    agentName: 'Michael Ochieng',
    ruleId: 'RULE002',
    ruleName: 'B2B Premium Rate',
    customRate: 40,
    rateType: 'flat_per_pickup',
    reason: 'Fleet partnership agreement',
    startDate: '2024-01-01',
    approvedBy: 'finance@recliq.com',
    status: 'active'
  }
];

const mockChanges: CommissionChange[] = [
  {
    id: 'CH001',
    changedBy: 'finance@recliq.com',
    ruleId: 'RULE001',
    ruleName: 'Standard Commission - Nairobi',
    oldValue: '10%',
    newValue: '12%',
    changeDate: '2024-01-01',
    reason: 'Market rate adjustment'
  },
  {
    id: 'CH002',
    changedBy: 'admin@recliq.com',
    ruleId: 'RULE002',
    ruleName: 'B2B Premium Rate',
    oldValue: 'KES 40',
    newValue: 'KES 50',
    changeDate: '2024-01-10',
    reason: 'B2B volume increase'
  }
];

const mockSummary: CommissionSummary = {
  activeRules: 6,
  avgCommissionRate: 12,
  agentsAffected: 148,
  customOverrides: 19
};

// Main Component
const CommissionRatesPage: React.FC = () => {
  const [rules, setRules] = useState<CommissionRule[]>(mockRules);
  const [overrides, setOverrides] = useState<AgentOverride[]>(mockOverrides);
  const [changes, setChanges] = useState<CommissionChange[]>(mockChanges);
  const [summary, setSummary] = useState<CommissionSummary>(mockSummary);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScope, setSelectedScope] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [effectiveDate, setEffectiveDate] = useState('current');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedRule, setSelectedRule] = useState<CommissionRule | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' });

  // Filter rules
  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesScope = selectedScope === 'all' || rule.scope === selectedScope;
    const matchesStatus = selectedStatus === 'all' || rule.status === selectedStatus;
    const matchesType = selectedType === 'all' || rule.rateType === selectedType;
    
    return matchesSearch && matchesScope && matchesStatus && matchesType;
  });

  const handleRuleClick = (rule: CommissionRule) => {
    setSelectedRule(rule);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedRule(null);
  };

  const handleRuleAction = (action: string, rule: CommissionRule, reason?: string) => {
    switch (action) {
      case 'edit':
        setNotification({
          open: true,
          message: `Editing rule: ${rule.name}`,
          severity: 'success'
        });
        break;
      case 'schedule':
        setNotification({
          open: true,
          message: `Scheduling change for: ${rule.name}`,
          severity: 'warning'
        });
        break;
      case 'deactivate':
        setNotification({
          open: true,
          message: `Deactivating rule: ${rule.name}: ${reason}`,
          severity: 'error'
        });
        break;
      case 'duplicate':
        setNotification({
          open: true,
          message: `Duplicating rule: ${rule.name}`,
          severity: 'success'
        });
        break;
    }
    handleDrawerClose();
  };

  const handleCreateRule = () => {
    setNotification({
      open: true,
      message: 'Opening commission rule creator...',
      severity: 'success'
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({
        open: true,
        message: 'Commission data refreshed successfully',
        severity: 'success'
      });
    }, 1000);
  };

  const formatRate = (rule: CommissionRule) => {
    switch (rule.rateType) {
      case 'percentage':
        return `${rule.value}%`;
      case 'flat_per_pickup':
        return `KES ${rule.value}`;
      case 'per_kg':
        return `KES ${rule.value}/kg`;
      default:
        return rule.value.toString();
    }
  };

  return (
    <PageContainer title="Commission Rates" description="Agent commission rules and configurations">
      <Breadcrumb title="Commission Rates" subtitle="Agent commission rules and configurations" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Commission Rates
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Agent commission rules and configurations
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Effective Date</InputLabel>
                <Select
                  value={effectiveDate}
                  label="Effective Date"
                  onChange={(e) => setEffectiveDate(e.target.value)}
                >
                  <MenuItem value="current">Current</MenuItem>
                  <MenuItem value="future">Future</MenuItem>
                  <MenuItem value="past">Historical</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Commission Type</InputLabel>
                <Select
                  value={selectedType}
                  label="Commission Type"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="flat_per_pickup">Flat per Pickup</MenuItem>
                  <MenuItem value="per_kg">Per KG</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="contained"
                startIcon={<IconPlus size={16} />}
                onClick={handleCreateRule}
              >
                Create New Rule
              </Button>
            </Stack>
          </Stack>
        </DashboardCard>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Summary Cards */}
      <Box mt={3}>
        {CommissionSummaryCards && (
          <CommissionSummaryCards summary={summary} />
        )}
      </Box>

      {/* Filters */}
      <Box mt={3}>
        <DashboardCard>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                placeholder="Search by rule name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <IconSearch size={16} style={{ marginRight: 8 }} />,
                }}
                sx={{ minWidth: 300 }}
              />
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Scope</InputLabel>
                <Select
                  value={selectedScope}
                  label="Scope"
                  onChange={(e) => setSelectedScope(e.target.value)}
                >
                  <MenuItem value="all">All Scopes</MenuItem>
                  <MenuItem value="global">Global</MenuItem>
                  <MenuItem value="city">City</MenuItem>
                  <MenuItem value="agent_group">Agent Group</MenuItem>
                  <MenuItem value="individual_agent">Individual Agent</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="expired">Expired</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="outlined"
                startIcon={<IconRefresh size={16} />}
                onClick={handleRefresh}
                disabled={loading}
              >
                Refresh
              </Button>
            </Stack>
          </CardContent>
        </DashboardCard>
      </Box>

      {/* Commission Rules Table */}
      <Box mt={3}>
        {CommissionRulesTable && (
          <CommissionRulesTable
            rules={filteredRules}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRuleClick={handleRuleClick}
            onRuleAction={handleRuleAction}
            formatRate={formatRate}
          />
        )}
      </Box>

      {/* Agent-Level Overrides */}
      <Box mt={3}>
        {AgentOverrides && (
          <AgentOverrides
            overrides={overrides}
            onEdit={(override: any) => {
              setNotification({
                open: true,
                message: `Editing override for ${override.agentName}`,
                severity: 'success'
              });
            }}
          />
        )}
      </Box>

      {/* Commission Change Log */}
      <Box mt={3}>
        {CommissionChangeLog && (
          <CommissionChangeLog changes={changes} />
        )}
      </Box>

      {/* Commission Rule Detail Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 600,
            p: 0,
          },
        }}
      >
        {CommissionRuleDetailDrawer && (
          <CommissionRuleDetailDrawer
            rule={selectedRule}
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            onRuleAction={handleRuleAction}
            formatRate={formatRate}
          />
        )}
      </Drawer>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default CommissionRatesPage;
