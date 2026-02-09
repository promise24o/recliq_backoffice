'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
  Grid,
  Paper,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Settings,
  Plus,
  Play,
  Pause,
  Target,
  Shield,
  Zap
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

// Import components
import PointsEconomySummary from './components/PointsEconomySummary';
import PointsRulesTable from './components/PointsRulesTable';
import RuleDetailDrawer from './components/RuleDetailDrawer';
import StreaksMultipliersConfiguration from './components/StreaksMultipliersConfiguration';
import AbusePreventionLimits from './components/AbusePreventionLimits';
import ImpactPreviewSimulation from './components/ImpactPreviewSimulation';

// Import data and types
import { 
  mockPointsRules, 
  mockPointsEconomySummary, 
  mockStreakMultipliers, 
  mockAbusePreventionConfig, 
  mockImpactSimulation 
} from './mockData';
import { PointsRule, StreakMultiplier, AbusePreventionConfig, ImpactSimulation, PointsRuleFilters } from './types';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';

export default function PointsRulesPage() {
  // State management
  const [rules, setRules] = useState<PointsRule[]>(mockPointsRules);
  const [streakMultipliers, setStreakMultipliers] = useState<StreakMultiplier[]>(mockStreakMultipliers);
  const [abuseConfig, setAbuseConfig] = useState<AbusePreventionConfig>(mockAbusePreventionConfig);
  const [impactSimulation, setImpactSimulation] = useState<ImpactSimulation>(mockImpactSimulation);
  const [selectedRule, setSelectedRule] = useState<PointsRule | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<PointsRuleFilters>({
    status: '',
    triggerAction: '',
    userType: '',
    scope: '',
    city: '',
    dateRange: { start: '', end: '' }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [rulesEnabled, setRulesEnabled] = useState(true);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });

  // Event handlers
  const handleRuleClick = (rule: PointsRule) => {
    setSelectedRule(rule);
    setDrawerOpen(true);
  };

  const handleCardClick = (metricType: string) => {
    setNotification({
      open: true,
      message: `Viewing details for: ${metricType}`,
      severity: 'info'
    });
  };

  const handleExport = (rulesToExport: PointsRule[]) => {
    setNotification({
      open: true,
      message: `Exporting ${rulesToExport.length} rules...`,
      severity: 'success'
    });
  };

  const handleDuplicateRule = (rule: PointsRule) => {
    const newRule = {
      ...rule,
      id: `RULE${Date.now()}`,
      name: `${rule.name} (Copy)`,
      status: 'paused' as const,
      createdAt: new Date().toISOString(),
      createdBy: 'CURRENT_USER',
      lastModified: new Date().toISOString(),
      modifiedBy: 'CURRENT_USER',
      auditTrail: [
        {
          timestamp: new Date().toISOString(),
          action: 'created' as const,
          performedBy: 'CURRENT_USER',
          details: `Duplicated from rule ${rule.id}`
        }
      ]
    };
    setRules(prev => [...prev, newRule]);
    setNotification({
      open: true,
      message: `Rule duplicated: ${newRule.name}`,
      severity: 'success'
    });
  };

  const handleActivateRule = (rule: PointsRule) => {
    setRules(prev => prev.map(r => 
      r.id === rule.id ? { 
        ...r, 
        status: 'active' as const,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...r.auditTrail,
          {
            timestamp: new Date().toISOString(),
            action: 'activated' as const,
            performedBy: 'CURRENT_USER',
            details: 'Rule activated by user'
          }
        ]
      } : r
    ));
    setNotification({
      open: true,
      message: `Rule activated: ${rule.name}`,
      severity: 'success'
    });
  };

  const handlePauseRule = (rule: PointsRule) => {
    setRules(prev => prev.map(r => 
      r.id === rule.id ? { 
        ...r, 
        status: 'paused' as const,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...r.auditTrail,
          {
            timestamp: new Date().toISOString(),
            action: 'paused' as const,
            performedBy: 'CURRENT_USER',
            details: 'Rule paused by user'
          }
        ]
      } : r
    ));
    setNotification({
      open: true,
      message: `Rule paused: ${rule.name}`,
      severity: 'warning'
    });
  };

  const handleScheduleRule = (rule: PointsRule) => {
    setNotification({
      open: true,
      message: `Scheduling rule: ${rule.name}`,
      severity: 'info'
    });
  };

  const handleRetireRule = (rule: PointsRule) => {
    setRules(prev => prev.map(r => 
      r.id === rule.id ? { 
        ...r, 
        status: 'retired' as const,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...r.auditTrail,
          {
            timestamp: new Date().toISOString(),
            action: 'retired' as const,
            performedBy: 'CURRENT_USER',
            details: 'Rule retired by user'
          }
        ]
      } : r
    ));
    setNotification({
      open: true,
      message: `Rule retired: ${rule.name}`,
      severity: 'warning'
    });
  };

  const handleSaveRule = (updatedRule: PointsRule) => {
    setRules(prev => prev.map(r => 
      r.id === updatedRule.id ? { 
        ...updatedRule,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...updatedRule.auditTrail,
          {
            timestamp: new Date().toISOString(),
            action: 'modified' as const,
            performedBy: 'CURRENT_USER',
            details: 'Rule modified by user'
          }
        ]
      } : r
    ));
    setNotification({
      open: true,
      message: `Rule updated: ${updatedRule.name}`,
      severity: 'success'
    });
  };

  const handleAddMultiplier = (multiplier: Omit<StreakMultiplier, 'id'>) => {
    const newMultiplier = {
      ...multiplier,
      id: `STREAK${Date.now()}`
    };
    setStreakMultipliers(prev => [...prev, newMultiplier]);
    setNotification({
      open: true,
      message: 'Streak multiplier added',
      severity: 'success'
    });
  };

  const handleUpdateMultiplier = (id: string, updates: Partial<StreakMultiplier>) => {
    setStreakMultipliers(prev => prev.map(m => 
      m.id === id ? { ...m, ...updates } : m
    ));
  };

  const handleDeleteMultiplier = (id: string) => {
    setStreakMultipliers(prev => prev.filter(m => m.id !== id));
    setNotification({
      open: true,
      message: 'Streak multiplier deleted',
      severity: 'warning'
    });
  };

  const handleActivateMultiplier = (id: string) => {
    handleUpdateMultiplier(id, { status: 'active' });
  };

  const handlePauseMultiplier = (id: string) => {
    handleUpdateMultiplier(id, { status: 'paused' });
  };

  const handleUpdateAbuseConfig = (updates: Partial<AbusePreventionConfig>) => {
    setAbuseConfig(prev => ({ ...prev, ...updates }));
    setNotification({
      open: true,
      message: 'Abuse prevention settings updated',
      severity: 'success'
    });
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setNotification({
        open: true,
        message: 'Simulation completed successfully',
        severity: 'success'
      });
    }, 3000);
  };

  const handleExportReport = () => {
    setNotification({
      open: true,
      message: 'Impact report exported',
      severity: 'success'
    });
  };

  const handleRefresh = () => {
    setNotification({
      open: true,
      message: 'Rules data refreshed successfully',
      severity: 'success'
    });
  };

  // Filter rules based on search and filters
  const filteredRules = rules.filter(rule => {
    const matchesSearch = searchTerm === '' || 
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.triggerAction.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === '' || rule.status === filters.status;
    const matchesTriggerAction = filters.triggerAction === '' || rule.triggerAction === filters.triggerAction;
    const matchesScope = filters.scope === '' || rule.scope.type === filters.scope;

    return matchesSearch && matchesStatus && matchesTriggerAction && matchesScope;
  });

  // Get unique values for filters
  const triggerActions = Array.from(new Set(rules.map(r => r.triggerAction)));
  const scopes = Array.from(new Set(rules.map(r => r.scope.type)));

  return (
    <PageContainer title="Points Rules" description="Define how recycling actions earn rewards">
      <Breadcrumb title="Points Rules" subtitle="Define how recycling actions earn rewards" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Points Rules
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Configure reward incentives safely and align points with business outcomes
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControlLabel
              control={
                <Switch
                  checked={rulesEnabled}
                  onChange={(e) => setRulesEnabled(e.target.checked)}
                />
              }
              label="Enable Rules"
            />
            
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={() => setNotification({
                open: true,
                message: 'Create new rule feature coming soon',
                severity: 'info'
              })}
            >
              Create New Rule
            </Button>
            
            <IconButton onClick={handleRefresh}>
              <RefreshCw size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Filters and Controls */}
      <Box sx={{ mb: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <TextField
              placeholder="Search rules..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search size={20} color="#6b7280" style={{ marginRight: 8 }} />
              }}
              sx={{ minWidth: 300 }}
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="paused">Paused</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="retired">Retired</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Trigger Action</InputLabel>
              <Select
                value={filters.triggerAction}
                onChange={(e) => setFilters(prev => ({ ...prev, triggerAction: e.target.value }))}
                label="Trigger Action"
              >
                <MenuItem value="">All Actions</MenuItem>
                {triggerActions.map(action => (
                  <MenuItem key={action} value={action}>
                    {action.replace('_', ' ').toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Scope</InputLabel>
              <Select
                value={filters.scope}
                onChange={(e) => setFilters(prev => ({ ...prev, scope: e.target.value }))}
                label="Scope"
              >
                <MenuItem value="">All Scopes</MenuItem>
                {scopes.map(scope => (
                  <MenuItem key={scope} value={scope}>
                    {scope.charAt(0).toUpperCase() + scope.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ flex: 1 }} />

            <IconButton onClick={() => handleExport(filteredRules)}>
              <Download size={20} />
            </IconButton>
          </Stack>
        </Paper>
      </Box>

      {/* Points Economy Summary */}
      <PointsEconomySummary
        summary={mockPointsEconomySummary}
        onCardClick={handleCardClick}
      />

      {/* Main Content Grid */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* Points Rules Table */}
            <PointsRulesTable
              rules={filteredRules}
              onRowClick={handleRuleClick}
              onExport={handleExport}
              onDuplicateRule={handleDuplicateRule}
              onActivateRule={handleActivateRule}
              onPauseRule={handlePauseRule}
              onScheduleRule={handleScheduleRule}
              onRetireRule={handleRetireRule}
            />

            {/* Streaks & Multipliers Configuration */}
            <StreaksMultipliersConfiguration
              streakMultipliers={streakMultipliers}
              onAddMultiplier={handleAddMultiplier}
              onUpdateMultiplier={handleUpdateMultiplier}
              onDeleteMultiplier={handleDeleteMultiplier}
              onActivateMultiplier={handleActivateMultiplier}
              onPauseMultiplier={handlePauseMultiplier}
            />
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Abuse Prevention & Limits */}
            <AbusePreventionLimits
              config={abuseConfig}
              onUpdateConfig={handleUpdateAbuseConfig}
            />

            {/* Impact Preview & Simulation */}
            <ImpactPreviewSimulation
              simulation={impactSimulation}
              onRunSimulation={handleRunSimulation}
              onExportReport={handleExportReport}
              isSimulating={isSimulating}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* Rule Detail Drawer */}
      <RuleDetailDrawer
        rule={selectedRule}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveRule}
        onActivate={handleActivateRule}
        onPause={handlePauseRule}
        onDuplicate={handleDuplicateRule}
        onSchedule={handleScheduleRule}
        onRetire={handleRetireRule}
      />

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification(prev => ({ ...prev, open: false }))}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
