'use client';

import React, { useState } from 'react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  RefreshCw,
  Download,
  Plus,
  Eye,
} from 'lucide-react';
import PricingHealthSummaryCards from './components/PricingHealthSummaryCards';
import PricingRulesTable from './components/PricingRulesTable';
import PricingRuleDetailDrawer from './components/PricingRuleDetailDrawer';
import CreatePricingRuleDialog from './components/CreatePricingRuleDialog';
import DropoffPickupDifferentialsPanel from './components/DropoffPickupDifferentialsPanel';
import LocationDemandAdjustmentsPanel from './components/LocationDemandAdjustmentsPanel';
import type { PricingRule } from './types';
import {
  mockPricingRules,
  mockPricingSummary,
  mockPickupDifferentials,
  mockLocationAdjustments,
  mockImpactPreview,
} from './mockData';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/settings',
    title: 'System Settings',
  },
  {
    title: 'Pricing Rules',
  },
];

const PricingRulesPage: React.FC = () => {
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedRule, setSelectedRule] = useState<PricingRule | null>(null);
  const [ruleDrawerOpen, setRuleDrawerOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [rules, setRules] = useState<PricingRule[]>(mockPricingRules);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNotification({
        open: true,
        message: 'Pricing rules refreshed',
        severity: 'success',
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to refresh data',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    setNotification({
      open: true,
      message: 'Exporting pricing rules for audit...',
      severity: 'info',
    });
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric((prev) => (prev === metricType ? null : metricType));
    setNotification({
      open: true,
      message: `Filtering by: ${metricType.replace(/_/g, ' ')}`,
      severity: 'info',
    });
  };

  const handleCreateRule = (newRule: PricingRule) => {
    setRules((prev) => [newRule, ...prev]);
    setNotification({
      open: true,
      message: `Pricing rule "${newRule.name}" created successfully`,
      severity: 'success',
    });
  };

  const handleViewRule = (ruleId: string) => {
    const rule = rules.find((r) => r.id === ruleId);
    if (rule) {
      setSelectedRule(rule);
      setRuleDrawerOpen(true);
    }
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <PageContainer title="Pricing Rules" description="Platform-wide pricing logic & safeguards">
      <Breadcrumb title="Pricing Rules" subtitle="Platform-wide pricing logic & safeguards" />

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Pricing Rules
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Platform-wide pricing logic & safeguards
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              color="primary"
              onClick={() => setCreateDialogOpen(true)}
            >
              Create Rule
            </Button>
            <Button
              variant="outlined"
              startIcon={<Eye size={16} />}
            >
              Preview Impact
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              onClick={handleExport}
            >
              Export (Audit)
            </Button>
            <IconButton onClick={handleRefresh} disabled={loading}>
              <RefreshCw size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ mb: 3 }}>
        <PricingHealthSummaryCards
          summary={mockPricingSummary}
          onCardClick={handleCardClick}
          selectedMetric={selectedMetric}
        />
      </Box>

      {/* Pricing Rules Table */}
      <Box sx={{ mb: 3 }}>
        <PricingRulesTable
          rules={rules}
          onViewRule={handleViewRule}
        />
      </Box>

      {/* Drop-off vs Pickup Differentials */}
      <Box sx={{ mb: 3 }}>
        <DropoffPickupDifferentialsPanel
          differentials={mockPickupDifferentials}
        />
      </Box>

      {/* Location & Demand Adjustments */}
      <Box sx={{ mb: 3 }}>
        <LocationDemandAdjustmentsPanel
          adjustments={mockLocationAdjustments}
        />
      </Box>

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Create Pricing Rule Dialog */}
      <CreatePricingRuleDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateRule}
      />

      {/* Pricing Rule Detail Drawer */}
      <PricingRuleDetailDrawer
        open={ruleDrawerOpen}
        onClose={() => {
          setRuleDrawerOpen(false);
          setSelectedRule(null);
        }}
        rule={selectedRule}
        impactPreview={mockImpactPreview}
      />
    </PageContainer>
  );
};

export default PricingRulesPage;
