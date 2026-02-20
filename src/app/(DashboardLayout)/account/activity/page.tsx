'use client';

import React, { useState, useMemo } from 'react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import {
  Box,
  Typography,
  Stack,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Download,
  List,
  Clock,
  Calendar,
} from 'lucide-react';
import ActivitySummaryCards from './components/ActivitySummaryCards';
import ActivityTimeline from './components/ActivityTimeline';
import ActivityTable from './components/ActivityTable';
import ActivityDetailDrawer from './components/ActivityDetailDrawer';
import SecuritySignalsPanel from './components/SecuritySignalsPanel';
import type { ActivityEvent, SecuritySignal } from './types';
import {
  mockActivitySummary,
  mockActivityEvents,
  mockSecuritySignals,
  activityTypeOptions,
} from './mockData';

const BCrumb = [
  { to: '/', title: 'Home' },
  { to: '/account', title: 'Admin Account' },
  { title: 'Activity Log' },
];

const AccountActivityPage: React.FC = () => {
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({ open: false, message: '', severity: 'success' });

  // Filters
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [activityTypeFilter, setActivityTypeFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // View toggle
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline');

  // Drawer
  const [selectedEvent, setSelectedEvent] = useState<ActivityEvent | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Security signals
  const [signals, setSignals] = useState<SecuritySignal[]>(mockSecuritySignals);

  // Filtered events
  const filteredEvents = useMemo(() => {
    let events = [...mockActivityEvents];

    // Filter by activity type
    if (activityTypeFilter) {
      events = events.filter((e) => e.action === activityTypeFilter);
    }

    // Filter by date range
    if (dateFrom) {
      const from = new Date(dateFrom);
      events = events.filter((e) => new Date(e.timestamp) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      events = events.filter((e) => new Date(e.timestamp) <= to);
    }

    // Filter by selected metric card
    if (selectedMetric) {
      switch (selectedMetric) {
        case 'recentLogins':
          events = events.filter((e) => e.action === 'login');
          break;
        case 'actionsPerformed':
          events = events.filter((e) =>
            ['approval', 'rejection', 'override', 'user_action', 'agent_action', 'finance_action', 'zone_action', 'pricing_action', 'setting_change', 'profile_update'].includes(e.action)
          );
          break;
        case 'sensitiveActions':
          events = events.filter((e) =>
            e.riskLevel === 'high' || e.riskLevel === 'critical'
          );
          break;
        case 'distinctLocations':
          // Show all but highlight location diversity
          break;
        case 'lastActivityTime':
          // Show most recent only
          events = events.slice(0, 5);
          break;
      }
    }

    return events;
  }, [activityTypeFilter, dateFrom, dateTo, selectedMetric]);

  const handleEventClick = (event: ActivityEvent) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  const handleExport = () => {
    setNotification({ open: true, message: 'Activity log exported successfully', severity: 'success' });
  };

  const handleAcknowledgeSignal = (signalId: string) => {
    setSignals((prev) =>
      prev.map((s) => (s.id === signalId ? { ...s, acknowledged: true } : s))
    );
    setNotification({ open: true, message: 'Security signal acknowledged', severity: 'success' });
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <PageContainer title="Account Activity" description="Your recent actions and security events">
      <Breadcrumb title="Account Activity" subtitle="Your recent actions and security events" />

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Account Activity
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Your recent actions and security events
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            {/* Date Range */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Calendar size={16} color="#6B7280" />
              <TextField
                type="date"
                size="small"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                InputLabelProps={{ shrink: true }}
                placeholder="From"
                sx={{ width: 150 }}
              />
              <Typography variant="caption" color="text.secondary">to</Typography>
              <TextField
                type="date"
                size="small"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                InputLabelProps={{ shrink: true }}
                placeholder="To"
                sx={{ width: 150 }}
              />
            </Stack>

            {/* Activity Type Filter */}
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select
                value={activityTypeFilter}
                onChange={(e) => setActivityTypeFilter(e.target.value)}
                displayEmpty
              >
                {activityTypeOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Export */}
            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              onClick={handleExport}
            >
              Export
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ mb: 3 }}>
        <ActivitySummaryCards
          summary={mockActivitySummary}
          selectedMetric={selectedMetric}
          onMetricClick={(metric) => setSelectedMetric(metric || null)}
        />
      </Box>

      {/* Security Signals */}
      <Box sx={{ mb: 3 }}>
        <SecuritySignalsPanel
          signals={signals}
          onAcknowledge={handleAcknowledgeSignal}
        />
      </Box>

      {/* View Toggle */}
      <Box sx={{ mb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="600">
            Activity Log ({filteredEvents.length} events)
          </Typography>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, val) => val && setViewMode(val)}
            size="small"
          >
            <ToggleButton value="timeline">
              <Clock size={16} />
              <Typography variant="caption" sx={{ ml: 0.5 }}>Timeline</Typography>
            </ToggleButton>
            <ToggleButton value="table">
              <List size={16} />
              <Typography variant="caption" sx={{ ml: 0.5 }}>Table</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>

      {/* Activity View */}
      <Box sx={{ mb: 3 }}>
        {viewMode === 'timeline' ? (
          <ActivityTimeline events={filteredEvents} onEventClick={handleEventClick} />
        ) : (
          <ActivityTable events={filteredEvents} onEventClick={handleEventClick} />
        )}
      </Box>

      {/* Activity Detail Drawer */}
      <ActivityDetailDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
      />

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default AccountActivityPage;
