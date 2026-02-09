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
  FormControlLabel,
  Switch,
  CardContent,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  Calendar,
  List,
  Clock,
  MapPin,
  Building,
  User,
  AlertTriangle,
  Target,
  Settings
} from 'lucide-react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import DashboardCard from '@/app/components/shared/DashboardCard';
import CollectionsSummaryCards from './components/CollectionsSummaryCards';
import ScheduledCollectionsTable from './components/ScheduledCollectionsTable';
import CollectionDetailDrawer from './components/CollectionDetailDrawer';
import type { 
  ScheduledCollection, 
  CollectionsSummary, 
  CollectionFilters,
  CollectionStatus,
  CollectionType,
  WasteType,
  SLARisk,
  ViewMode,
  DateRange
} from './types';
import { 
  mockScheduledCollections, 
  mockCollectionsSummary
} from './mockData';

const ScheduledCollectionsPage: React.FC = () => {
  // State management
  const [collections, setCollections] = useState<ScheduledCollection[]>(mockScheduledCollections);
  const [summary, setSummary] = useState<CollectionsSummary>(mockCollectionsSummary);
  const [filters, setFilters] = useState<CollectionFilters>({
    dateRange: 'week',
    customDateRange: {
      start: '',
      end: ''
    },
    city: '',
    zone: '',
    clientId: '',
    collectionType: '',
    slaRisk: '',
    assignedAgent: '',
    wasteType: '',
    status: '',
    search: ''
  });
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<ScheduledCollection | null>(null);
  const [collectionDrawerOpen, setCollectionDrawerOpen] = useState(false);

  // Extract unique values for filters
  const cities = Array.from(new Set(collections.map(c => c.city)));
  const zones = Array.from(new Set(collections.map(c => c.zone)));
  const clients = Array.from(new Set(collections.map(c => c.clientName)));
  const agents = Array.from(new Set(collections.filter(c => c.assignedAgent).map(c => c.assignedAgent!.agentName)));

  // Filter collections
  const filteredCollections = collections.filter(collection => {
    if (filters.status && collection.status !== filters.status) return false;
    if (filters.collectionType && collection.collectionType !== filters.collectionType) return false;
    if (filters.slaRisk && collection.slaRisk !== filters.slaRisk) return false;
    if (filters.city && collection.city !== filters.city) return false;
    if (filters.zone && collection.zone !== filters.zone) return false;
    if (filters.clientId && collection.clientId !== filters.clientId) return false;
    if (filters.assignedAgent && collection.assignedAgent?.agentName !== filters.assignedAgent) return false;
    if (filters.wasteType && !collection.wasteCategories.some(w => w.type === filters.wasteType)) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        collection.collectionId.toLowerCase().includes(searchLower) ||
        collection.clientName.toLowerCase().includes(searchLower) ||
        collection.location.name.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  // Event handlers
  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotification({
        open: true,
        message: 'Scheduled collections data refreshed',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to refresh data',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    setNotification({
      open: true,
      message: 'Exporting scheduled collections data...',
      severity: 'info'
    });
    // Implement export logic
  };

  const handleFilterChange = (key: keyof CollectionFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: 'week',
      customDateRange: {
        start: '',
        end: ''
      },
      city: '',
      zone: '',
      clientId: '',
      collectionType: '',
      slaRisk: '',
      assignedAgent: '',
      wasteType: '',
      status: '',
      search: ''
    });
    setSelectedMetric(null);
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric(metricType);
    
    // Apply filter based on card clicked
    switch (metricType) {
      case 'upcoming_collections':
        // Filter for upcoming collections (all)
        break;
      case 'active_clients':
        // Filter for collections from active clients
        break;
      case 'agents_assigned':
        // Filter for assigned collections
        handleFilterChange('assignedAgent', agents[0] || '');
        break;
      case 'at_risk_collections':
        // Filter for at-risk collections
        handleFilterChange('slaRisk', 'high');
        break;
      case 'recurring_schedules':
        // Filter for recurring collections
        handleFilterChange('collectionType', 'recurring');
        break;
      case 'avg_lead_time':
        // Filter by lead time (would need calculation)
        break;
      default:
        break;
    }
  };

  const handleViewCollection = (collectionId: string) => {
    const collection = collections.find(c => c.id === collectionId);
    if (collection) {
      setSelectedCollection(collection);
      setCollectionDrawerOpen(true);
    }
  };

  const handleEditCollection = (collectionId: string) => {
    setNotification({
      open: true,
      message: `Opening collection editor for ${collectionId}`,
      severity: 'info'
    });
    // Implement collection editing logic
  };

  const handleAssignAgent = (collectionId: string) => {
    setNotification({
      open: true,
      message: `Opening agent assignment for ${collectionId}`,
      severity: 'info'
    });
    // Implement agent assignment logic
  };

  const handleRescheduleCollection = (collectionId: string) => {
    setNotification({
      open: true,
      message: `Opening reschedule dialog for ${collectionId}`,
      severity: 'info'
    });
    // Implement reschedule logic
  };

  const handleCreateCollection = () => {
    setNotification({
      open: true,
      message: 'Create collection feature coming soon',
      severity: 'info'
    });
    // Implement collection creation logic
  };

  const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newMode: ViewMode | null) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  return (
    <PageContainer title="Scheduled Collections" description="Upcoming enterprise recycling pickups">
      <Breadcrumb title="Scheduled Collections" subtitle="Upcoming enterprise recycling pickups" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Scheduled Collections
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Upcoming enterprise recycling pickups
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              size="small"
            >
              <ToggleButton value="list">
                <List size={16} />
              </ToggleButton>
              <ToggleButton value="calendar">
                <Calendar size={16} />
              </ToggleButton>
              <ToggleButton value="timeline">
                <Clock size={16} />
              </ToggleButton>
            </ToggleButtonGroup>
            
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={handleCreateCollection}
            >
              Schedule Collection
            </Button>
            
            <IconButton onClick={handleRefresh} disabled={loading}>
              <RefreshCw size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Filters Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight="600" mb={2}>
          Filters
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Date Range</InputLabel>
              <Select
                value={filters.dateRange}
                label="Date Range"
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>City</InputLabel>
              <Select
                value={filters.city}
                label="City"
                onChange={(e) => handleFilterChange('city', e.target.value)}
              >
                <MenuItem value="">All Cities</MenuItem>
                {cities.map(city => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Zone</InputLabel>
              <Select
                value={filters.zone}
                label="Zone"
                onChange={(e) => handleFilterChange('zone', e.target.value)}
              >
                <MenuItem value="">All Zones</MenuItem>
                {zones.map(zone => (
                  <MenuItem key={zone} value={zone}>
                    {zone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Client</InputLabel>
              <Select
                value={filters.clientId}
                label="Client"
                onChange={(e) => handleFilterChange('clientId', e.target.value)}
              >
                <MenuItem value="">All Clients</MenuItem>
                {collections.map(collection => (
                  <MenuItem key={collection.clientId} value={collection.clientId}>
                    {collection.clientName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Collection Type</InputLabel>
              <Select
                value={filters.collectionType}
                label="Collection Type"
                onChange={(e) => handleFilterChange('collectionType', e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="recurring">Recurring</MenuItem>
                <MenuItem value="one_off">One-off</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>SLA Risk</InputLabel>
              <Select
                value={filters.slaRisk}
                label="SLA Risk"
                onChange={(e) => handleFilterChange('slaRisk', e.target.value)}
              >
                <MenuItem value="">All Risk Levels</MenuItem>
                <MenuItem value="low">Low Risk</MenuItem>
                <MenuItem value="medium">Medium Risk</MenuItem>
                <MenuItem value="high">High Risk</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search collections..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: <Search size={16} style={{ marginRight: 8 }} />
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Assigned Agent</InputLabel>
              <Select
                value={filters.assignedAgent}
                label="Assigned Agent"
                onChange={(e) => handleFilterChange('assignedAgent', e.target.value)}
              >
                <MenuItem value="">All Agents</MenuItem>
                {agents.map(agent => (
                  <MenuItem key={agent} value={agent}>
                    {agent}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClearFilters}
            startIcon={<Filter />}
          >
            Clear Filters
          </Button>
          
          <Button
            variant="outlined"
            onClick={handleExportData}
            startIcon={<Download />}
          >
            Export (CSV)
          </Button>
        </Stack>

        {selectedMetric && (
          <Alert 
            severity="info" 
            sx={{ mt: 2 }}
            action={
              <Button size="small" onClick={() => setSelectedMetric(null)}>
                Clear
              </Button>
            }
          >
            Filtered by: {selectedMetric.replace('_', ' ').toUpperCase()}
          </Alert>
        )}
      </Paper>

      {/* Collections Summary Cards */}
      <CollectionsSummaryCards 
        summary={summary} 
        onCardClick={handleCardClick}
      />

      {/* Collections Table */}
      <DashboardCard title="Scheduled Collections">
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              📅 Execution planning • Agent readiness • SLA protection
            </Typography>
          </Box>
          
          <ScheduledCollectionsTable
            collections={filteredCollections}
            onViewCollection={handleViewCollection}
            onEditCollection={handleEditCollection}
            onAssignAgent={handleAssignAgent}
            onRescheduleCollection={handleRescheduleCollection}
          />
        </CardContent>
      </DashboardCard>

      {/* Results Summary */}
      <Alert severity={summary.atRiskCollections > 0 ? 'warning' : 'success'} sx={{ mt: 3 }}>
        <Typography variant="body2" fontWeight="600" mb={1}>
          Collections Execution Summary
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            • Showing {filteredCollections.length} of {collections.length} scheduled collections
          </Typography>
          <Typography variant="body2">
            • {summary.agentsAssigned} agents assigned to {summary.upcomingCollections} upcoming collections
          </Typography>
          <Typography variant="body2">
            • {summary.totalEstimatedVolume.toLocaleString()} kg total estimated volume requiring capacity planning
          </Typography>
          <Typography variant="body2">
            • {summary.atRiskCollections} collections at risk requiring immediate attention
          </Typography>
          <Typography variant="body2">
            • {summary.recurringSchedules} recurring schedules maintaining operational consistency
          </Typography>
          <Typography variant="body2">
            • {summary.unassignedCollections} unassigned collections requiring agent assignment
          </Typography>
        </Stack>
      </Alert>

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

      {/* Collection Detail Drawer */}
      <CollectionDetailDrawer
        open={collectionDrawerOpen}
        onClose={() => setCollectionDrawerOpen(false)}
        collection={selectedCollection}
      />
    </PageContainer>
  );
};

export default ScheduledCollectionsPage;
