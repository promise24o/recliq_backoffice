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
  MapPin,
  User,
  Package
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

// Import components
import DropoffSummaryCards from './components/DropoffSummaryCards';
import DropoffLocationMap from './components/DropoffLocationMap';
import DropoffTrendAnalysis from './components/DropoffTrendAnalysis';
import DropoffRecordsTable from './components/DropoffRecordsTable';
import DropoffDetailDrawer from './components/DropoffDetailDrawer';
import FraudInsights from './components/FraudInsights';

// Import data and types
import {
  mockDropoffRecords,
  mockDropoffLocations,
  mockDropoffSummary,
  mockDropoffTrends,
  mockFraudInsights
} from './mockData';
import { DropoffRecord, DropoffLocation, DropoffFraudInsight, DropoffFilters } from './types';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';

export default function DropoffRecordsPage() {
  // State management
  const [records, setRecords] = useState<DropoffRecord[]>(mockDropoffRecords);
  const [locations, setLocations] = useState<DropoffLocation[]>(mockDropoffLocations);
  const [selectedRecord, setSelectedRecord] = useState<DropoffRecord | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<DropoffLocation | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<DropoffFilters>({
    dateRange: { start: '', end: '' },
    city: '',
    zone: '',
    dropoffLocation: '',
    agent: '',
    wasteType: ''
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
  const handleRecordClick = (record: DropoffRecord) => {
    setSelectedRecord(record);
    setDrawerOpen(true);
  };

  const handleLocationClick = (location: DropoffLocation) => {
    setSelectedLocation(location);
    setNotification({
      open: true,
      message: `Selected location: ${location.name}`,
      severity: 'info'
    });
  };

  const handleCardClick = (filterType: string) => {
    setNotification({
      open: true,
      message: `Filtering by: ${filterType}`,
      severity: 'info'
    });
  };

  const handleExport = (recordsToExport: DropoffRecord[]) => {
    // Mock export functionality
    setNotification({
      open: true,
      message: `Exporting ${recordsToExport.length} records...`,
      severity: 'success'
    });
  };

  const handleFlagRecord = (record: DropoffRecord, reason: string) => {
    setRecords(prev => prev.map(r =>
      r.id === record.id ? { ...r, status: 'flagged' as const } : r
    ));
    setNotification({
      open: true,
      message: `Record ${record.id} flagged for review`,
      severity: 'warning'
    });
  };

  const handleOpenDispute = (record: DropoffRecord) => {
    setRecords(prev => prev.map(r =>
      r.id === record.id ? { ...r, status: 'disputed' as const, disputeCount: r.disputeCount + 1 } : r
    ));
    setNotification({
      open: true,
      message: `Dispute opened for record ${record.id}`,
      severity: 'warning'
    });
  };

  const handleExportReceipt = (record: DropoffRecord) => {
    setNotification({
      open: true,
      message: `Receipt exported for record ${record.id}`,
      severity: 'success'
    });
  };

  const handleAddAuditNote = (record: DropoffRecord, note: string) => {
    setRecords(prev => prev.map(r =>
      r.id === record.id
        ? { ...r, auditNotes: [...(r.auditNotes || []), note] }
        : r
    ));
    setNotification({
      open: true,
      message: `Audit note added to record ${record.id}`,
      severity: 'success'
    });
  };

  const handleInsightClick = (insight: DropoffFraudInsight) => {
    setNotification({
      open: true,
      message: `Investigating: ${insight.title}`,
      severity: 'info'
    });
  };

  const handleFlagRecords = (recordIds: string[]) => {
    setRecords(prev => prev.map(r =>
      recordIds.includes(r.id) ? { ...r, status: 'flagged' as const } : r
    ));
    setNotification({
      open: true,
      message: `${recordIds.length} records flagged for review`,
      severity: 'warning'
    });
  };

  const handleRefresh = () => {
    setNotification({
      open: true,
      message: 'Data refreshed successfully',
      severity: 'success'
    });
  };

  // Filter records based on search and filters
  const filteredRecords = records.filter(record => {
    const matchesSearch = searchTerm === '' ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.dropoffLocationName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = filters.city === '' || record.city === filters.city;
    const matchesZone = filters.zone === '' || record.zone === filters.zone;
    const matchesWasteType = filters.wasteType === '' || record.wasteType === filters.wasteType;

    return matchesSearch && matchesCity && matchesZone && matchesWasteType;
  });

  // Get unique values for filters
  const cities = Array.from(new Set(records.map(r => r.city)));
  const zones = Array.from(new Set(records.map(r => r.zone)));
  const wasteTypes = Array.from(new Set(records.map(r => r.wasteType)));

  return (
    <PageContainer title="Drop-off Records" description="Verified user-to-agent recycling transactions">
      <Breadcrumb title="Drop-off Records" subtitle="Verified user-to-agent recycling transactions" />
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="600" mb={1}>
            Drop-off Records
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Verified user-to-agent recycling transactions
          </Typography>
        </Box>

        {/* Filters and Controls */}
        <Box sx={{ mb: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <TextField
                placeholder="Search drop-offs..."
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

              <Box sx={{ flex: 1 }} />

              <IconButton onClick={handleRefresh}>
                <RefreshCw size={20} />
              </IconButton>

              <Button
                variant="outlined"
                startIcon={<Download size={16} />}
                onClick={() => handleExport(filteredRecords)}
              >
                Export CSV
              </Button>
            </Stack>
          </Paper>
        </Box>

        {/* Summary Cards */}
        <DropoffSummaryCards
          summary={mockDropoffSummary}
          onCardClick={handleCardClick}
        />

        {/* Main Content Grid */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Left Column */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={3}>
              {/* Location Performance Map */}
              <DropoffLocationMap
                locations={locations}
                onLocationClick={handleLocationClick}
              />

              {/* Records Table */}
              <DropoffRecordsTable
                records={filteredRecords}
                onRowClick={handleRecordClick}
                onExport={handleExport}
              />
            </Stack>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
              {/* Trend Analysis */}
              <DropoffTrendAnalysis
                trends={mockDropoffTrends}
              />

              {/* Fraud Insights */}
              <FraudInsights
                insights={mockFraudInsights}
                onInsightClick={handleInsightClick}
                onFlagRecords={handleFlagRecords}
              />
            </Stack>
          </Grid>
        </Grid>

        {/* Detail Drawer */}
        <DropoffDetailDrawer
          record={selectedRecord}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onFlagRecord={handleFlagRecord}
          onOpenDispute={handleOpenDispute}
          onExportReceipt={handleExportReceipt}
          onAddAuditNote={handleAddAuditNote}
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
