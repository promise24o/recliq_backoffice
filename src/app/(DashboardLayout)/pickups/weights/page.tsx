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
  Paper
} from '@mui/material';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Scale,
  User,
  MapPin
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

// Import components
import WeightAccuracySummaryCards from './components/WeightAccuracySummaryCards';
import WeightVarianceDistribution from './components/WeightVarianceDistribution';
import WeightLogsTable from './components/WeightLogsTable';
import WeightLogDetailDrawer from './components/WeightLogDetailDrawer';
import AnomalyFraudSignals from './components/AnomalyFraudSignals';

// Import data and types
import { 
  mockWeightLogs, 
  mockWeightAccuracySummary, 
  mockWeightVarianceData, 
  mockWeightAnomalies 
} from './mockData';
import { WeightLog, WeightAnomaly, WeightFilters } from './types';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';

export default function WeightLogsPage() {
  // State management
  const [logs, setLogs] = useState<WeightLog[]>(mockWeightLogs);
  const [selectedLog, setSelectedLog] = useState<WeightLog | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<WeightFilters>({
    dateRange: { start: '', end: '' },
    city: '',
    zone: '',
    pickupMode: 'all',
    wasteType: '',
    agent: '',
    varianceThreshold: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
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
  const handleLogClick = (log: WeightLog) => {
    setSelectedLog(log);
    setDrawerOpen(true);
  };

  const handleCardClick = (filterType: string) => {
    setNotification({
      open: true,
      message: `Filtering by: ${filterType}`,
      severity: 'info'
    });
  };

  const handleExport = (logsToExport: WeightLog[]) => {
    setNotification({
      open: true,
      message: `Exporting ${logsToExport.length} weight logs...`,
      severity: 'success'
    });
  };

  const handleApproveWeight = (log: WeightLog) => {
    setLogs(prev => prev.map(l => 
      l.id === log.id ? { ...l, status: 'verified' as const } : l
    ));
    setNotification({
      open: true,
      message: `Weight ${log.id} approved`,
      severity: 'success'
    });
  };

  const handleAdjustWeight = (log: WeightLog, newWeight: number, reason: string) => {
    setLogs(prev => prev.map(l => 
      l.id === log.id ? { 
        ...l, 
        finalWeight: newWeight,
        variance: ((newWeight - log.estimatedWeight) / log.estimatedWeight) * 100,
        status: 'adjusted' as const,
        manualAdjustments: [
          ...(l.manualAdjustments || []),
          {
            originalWeight: log.finalWeight,
            adjustedWeight: newWeight,
            reason,
            adjustedBy: 'OPS001',
            adjustedAt: new Date().toISOString()
          }
        ]
      } : l
    ));
    setNotification({
      open: true,
      message: `Weight adjusted for log ${log.id}`,
      severity: 'info'
    });
  };

  const handleOpenDispute = (log: WeightLog) => {
    setLogs(prev => prev.map(l => 
      l.id === log.id ? { ...l, status: 'disputed' as const, disputeCount: l.disputeCount + 1 } : l
    ));
    setNotification({
      open: true,
      message: `Dispute opened for log ${log.id}`,
      severity: 'warning'
    });
  };

  const handleFlagAgent = (log: WeightLog) => {
    setLogs(prev => prev.map(l => 
      l.id === log.id ? { ...l, status: 'flagged' as const } : l
    ));
    setNotification({
      open: true,
      message: `Agent ${log.agentName} flagged for review`,
      severity: 'warning'
    });
  };

  const handleAddInvestigationNote = (log: WeightLog, note: string) => {
    setLogs(prev => prev.map(l => 
      l.id === log.id 
        ? { ...l, auditNotes: [...(l.auditNotes || []), note] } 
        : l
    ));
    setNotification({
      open: true,
      message: `Investigation note added to log ${log.id}`,
      severity: 'success'
    });
  };

  const handleAnomalyClick = (anomaly: WeightAnomaly) => {
    setNotification({
      open: true,
      message: `Investigating: ${anomaly.title}`,
      severity: 'info'
    });
  };

  const handleFlagLogs = (logIds: string[]) => {
    setLogs(prev => prev.map(l => 
      logIds.includes(l.id) ? { ...l, status: 'flagged' as const } : l
    ));
    setNotification({
      open: true,
      message: `${logIds.length} logs flagged for review`,
      severity: 'warning'
    });
  };

  const handleRefresh = () => {
    setNotification({
      open: true,
      message: 'Weight logs refreshed successfully',
      severity: 'success'
    });
  };

  // Filter logs based on search and filters
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.relatedId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = filters.city === '' || log.city === filters.city;
    const matchesZone = filters.zone === '' || log.zone === filters.zone;
    const matchesPickupMode = filters.pickupMode === 'all' || log.relatedType === filters.pickupMode;
    const matchesWasteType = filters.wasteType === '' || log.wasteType === filters.wasteType;
    const matchesVariance = filters.varianceThreshold === 0 || Math.abs(log.variance) >= filters.varianceThreshold;

    return matchesSearch && matchesCity && matchesZone && matchesPickupMode && matchesWasteType && matchesVariance;
  });

  // Get unique values for filters
  const cities = Array.from(new Set(logs.map(l => l.city)));
  const zones = Array.from(new Set(logs.map(l => l.zone)));
  const wasteTypes = Array.from(new Set(logs.map(l => l.wasteType)));
  const agents = Array.from(new Set(logs.map(l => l.agentName)));

  return (
    <PageContainer title="Weight Logs" description="Verified weight measurements across pickups & drop-offs">
      <Breadcrumb title="Weight Logs" subtitle="Verified weight measurements across pickups & drop-offs" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="600" mb={1}>
          Weight Logs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Verified weight measurements across pickups & drop-offs
        </Typography>
      </Box>

      {/* Filters and Controls */}
      <Box sx={{ mb: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <TextField
              placeholder="Search weight logs..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search size={20} color="#6b7280" style={{ marginRight: 8 }} />
              }}
              sx={{ minWidth: 300 }}
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>City</InputLabel>
              <Select
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                label="City"
              >
                <MenuItem value="">All Cities</MenuItem>
                {cities.map(city => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Zone</InputLabel>
              <Select
                value={filters.zone}
                onChange={(e) => setFilters(prev => ({ ...prev, zone: e.target.value }))}
                label="Zone"
              >
                <MenuItem value="">All Zones</MenuItem>
                {zones.map(zone => (
                  <MenuItem key={zone} value={zone}>{zone}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Pickup Mode</InputLabel>
              <Select
                value={filters.pickupMode}
                onChange={(e) => setFilters(prev => ({ ...prev, pickupMode: e.target.value as any }))}
                label="Pickup Mode"
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="pickup">Pickup</MenuItem>
                <MenuItem value="dropoff">Drop-off</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Waste Type</InputLabel>
              <Select
                value={filters.wasteType}
                onChange={(e) => setFilters(prev => ({ ...prev, wasteType: e.target.value }))}
                label="Waste Type"
              >
                <MenuItem value="">All Types</MenuItem>
                {wasteTypes.map(type => (
                  <MenuItem key={type} value={type}>
                    {type.replace('_', ' ').toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Agent</InputLabel>
              <Select
                value={filters.agent}
                onChange={(e) => setFilters(prev => ({ ...prev, agent: e.target.value }))}
                label="Agent"
              >
                <MenuItem value="">All Agents</MenuItem>
                {agents.map(agent => (
                  <MenuItem key={agent} value={agent}>{agent}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Min Variance %"
              type="number"
              size="small"
              value={filters.varianceThreshold || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, varianceThreshold: parseFloat(e.target.value) || 0 }))}
              sx={{ minWidth: 120 }}
            />

            <Box sx={{ flex: 1 }} />

            <IconButton onClick={handleRefresh}>
              <RefreshCw size={20} />
            </IconButton>

            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              onClick={() => handleExport(filteredLogs)}
            >
              Export CSV
            </Button>
          </Stack>
        </Paper>
      </Box>

      {/* Summary Cards */}
      <WeightAccuracySummaryCards
        summary={mockWeightAccuracySummary}
        onCardClick={handleCardClick}
      />

      {/* Main Content Grid */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* Weight Variance Distribution */}
            <WeightVarianceDistribution
              varianceData={mockWeightVarianceData}
            />

            {/* Weight Logs Table */}
            <WeightLogsTable
              logs={filteredLogs}
              onRowClick={handleLogClick}
              onExport={handleExport}
            />
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Anomaly & Fraud Signals */}
            <AnomalyFraudSignals
              anomalies={mockWeightAnomalies}
              onAnomalyClick={handleAnomalyClick}
              onFlagLogs={handleFlagLogs}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* Detail Drawer */}
      <WeightLogDetailDrawer
        log={selectedLog}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onApproveWeight={handleApproveWeight}
        onAdjustWeight={handleAdjustWeight}
        onOpenDispute={handleOpenDispute}
        onFlagAgent={handleFlagAgent}
        onAddInvestigationNote={handleAddInvestigationNote}
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
