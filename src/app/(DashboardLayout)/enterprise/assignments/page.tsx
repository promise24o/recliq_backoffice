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
  Users,
  Calendar,
  Clock,
  MapPin,
  Truck,
  Target,
  Settings,
  Activity,
  Timer,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import DashboardCard from '@/app/components/shared/DashboardCard';
import AssignmentSummaryCards from './components/AssignmentSummaryCards';
import AssignmentsTable from './components/AssignmentsTable';
import AssignmentDetailDrawer from './components/AssignmentDetailDrawer';
import type { 
  AgentAssignment, 
  AssignmentSummary, 
  AssignmentFilters,
  AssignmentStatus,
  AgentType,
  SLARisk,
  AssignmentView
} from './types';
import { 
  mockAgentAssignments, 
  mockAssignmentSummary
} from './mockData';

const AgentAssignmentsPage: React.FC = () => {
  // State management
  const [assignments, setAssignments] = useState<AgentAssignment[]>(mockAgentAssignments);
  const [summary, setSummary] = useState<AssignmentSummary>(mockAssignmentSummary);
  const [filters, setFilters] = useState<AssignmentFilters>({
    status: '',
    agentType: '',
    city: '',
    zone: '',
    agentId: '',
    clientId: '',
    slaRisk: '',
    dateRange: 'today',
    customDateRange: {
      start: '',
      end: ''
    },
    search: ''
  });
  const [viewMode, setViewMode] = useState<AssignmentView>('table');
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
  const [selectedAssignment, setSelectedAssignment] = useState<AgentAssignment | null>(null);
  const [assignmentDrawerOpen, setAssignmentDrawerOpen] = useState(false);

  // Extract unique values for filters
  const cities = Array.from(new Set(assignments.map(a => a.city)));
  const zones = Array.from(new Set(assignments.map(a => a.zone)));
  const clients = Array.from(new Set(assignments.map(a => a.clientName)));
  const agents = Array.from(new Set(assignments.filter(a => a.primaryAgent).map(a => a.primaryAgent!.agentName)));

  // Filter assignments
  const filteredAssignments = assignments.filter(assignment => {
    if (filters.status && assignment.status !== filters.status) return false;
    if (filters.agentType && assignment.agentType !== filters.agentType) return false;
    if (filters.city && assignment.city !== filters.city) return false;
    if (filters.zone && assignment.zone !== filters.zone) return false;
    if (filters.agentId && assignment.primaryAgent?.agentName !== filters.agentId) return false;
    if (filters.clientId && assignment.clientId !== filters.clientId) return false;
    if (filters.slaRisk && assignment.slaRisk !== filters.slaRisk) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        assignment.assignmentId.toLowerCase().includes(searchLower) ||
        assignment.clientName.toLowerCase().includes(searchLower) ||
        assignment.location.name.toLowerCase().includes(searchLower)
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
        message: 'Assignment data refreshed',
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
      message: 'Exporting assignments data...',
      severity: 'info'
    });
    // Implement export logic
  };

  const handleFilterChange = (key: keyof AssignmentFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      agentType: '',
      city: '',
      zone: '',
      agentId: '',
      clientId: '',
      slaRisk: '',
      dateRange: 'today',
      customDateRange: {
        start: '',
        end: ''
      },
      search: ''
    });
    setSelectedMetric(null);
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric(metricType);
    
    // Apply filter based on card clicked
    switch (metricType) {
      case 'assigned_collections':
        // Filter for assigned collections
        handleFilterChange('status', 'assigned');
        break;
      case 'pending_assignments':
        // Filter for pending assignments
        handleFilterChange('status', 'assigned');
        break;
      case 'confirmed_agents':
        // Filter for confirmed assignments
        handleFilterChange('status', 'confirmed');
        break;
      case 'at_risk_assignments':
        // Filter for at-risk assignments
        handleFilterChange('slaRisk', 'high');
        break;
      case 'reassignments':
        // Filter for reassigned assignments
        // Would need to filter by reassignedCount > 0
        break;
      case 'unassigned_jobs':
        // Filter for unassigned jobs
        handleFilterChange('status', 'unassigned');
        break;
      default:
        break;
    }
  };

  const handleViewAssignment = (assignmentId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      setSelectedAssignment(assignment);
      setAssignmentDrawerOpen(true);
    }
  };

  const handleEditAssignment = (assignmentId: string) => {
    setNotification({
      open: true,
      message: `Opening assignment editor for ${assignmentId}`,
      severity: 'info'
    });
    // Implement assignment editing logic
  };

  const handleReassignAgent = (assignmentId: string) => {
    setNotification({
      open: true,
      message: `Opening reassignment dialog for ${assignmentId}`,
      severity: 'info'
    });
    // Implement reassignment logic
  };

  const handleConfirmAssignment = (assignmentId: string) => {
    setNotification({
      open: true,
      message: `Confirming assignment ${assignmentId}`,
      severity: 'info'
    });
    // Implement confirmation logic
  };

  const handleAddBackupAgent = (assignmentId: string) => {
    setNotification({
      open: true,
      message: `Adding backup agent to ${assignmentId}`,
      severity: 'info'
    });
    // Implement backup agent logic
  };

  const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newMode: AssignmentView | null) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  return (
    <PageContainer title="Agent Assignments" description="Enterprise collection responsibility & readiness">
      <Breadcrumb title="Agent Assignments" subtitle="Enterprise collection responsibility & readiness" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Agent Assignments
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enterprise collection responsibility & readiness
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              size="small"
            >
              <ToggleButton value="table">
                <Activity size={16} />
              </ToggleButton>
              <ToggleButton value="timeline">
                <Clock size={16} />
              </ToggleButton>
              <ToggleButton value="kanban">
                <Target size={16} />
              </ToggleButton>
            </ToggleButtonGroup>
            
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
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="unassigned">Unassigned</MenuItem>
                <MenuItem value="assigned">Assigned</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Agent Type</InputLabel>
              <Select
                value={filters.agentType}
                label="Agent Type"
                onChange={(e) => handleFilterChange('agentType', e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="individual">Individual</MenuItem>
                <MenuItem value="fleet">Fleet</MenuItem>
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
              placeholder="Search assignments..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: <Search size={16} style={{ marginRight: 8 }} />
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Agent</InputLabel>
              <Select
                value={filters.agentId}
                label="Agent"
                onChange={(e) => handleFilterChange('agentId', e.target.value)}
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

      {/* Assignment Summary Cards */}
      <AssignmentSummaryCards 
        summary={summary} 
        onCardClick={handleCardClick}
      />

      {/* Assignments Table */}
      <DashboardCard title="Enterprise Assignments">
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              👷 Enterprise collection responsibility • Agent readiness • SLA protection
            </Typography>
          </Box>
          
          <AssignmentsTable
            assignments={filteredAssignments}
            onViewAssignment={handleViewAssignment}
            onEditAssignment={handleEditAssignment}
            onReassignAgent={handleReassignAgent}
            onConfirmAssignment={handleConfirmAssignment}
            onAddBackupAgent={handleAddBackupAgent}
          />
        </CardContent>
      </DashboardCard>

      {/* Results Summary */}
      <Alert severity={summary.unassignedJobs > 0 ? 'warning' : summary.atRiskAssignments > 0 ? 'info' : 'success'} sx={{ mt: 3 }}>
        <Typography variant="body2" fontWeight="600" mb={1}>
          Assignment Operations Summary
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            • Showing {filteredAssignments.length} of {assignments.length} assignments
          </Typography>
          <Typography variant="body2">
            • {summary.assignedCollections} collections assigned to {summary.confirmedAgents} confirmed agents
          </Typography>
          <Typography variant="body2">
            • {(summary.totalVolume / 1000).toFixed(1)} tons total volume requiring capacity planning
          </Typography>
          <Typography variant="body2">
            • {summary.atRiskAssignments} at-risk assignments requiring immediate attention
          </Typography>
          <Typography variant="body2">
            • {summary.reassignments} reassignments indicating assignment quality issues
          </Typography>
          <Typography variant="body2">
            • {summary.unassignedJobs} unassigned jobs requiring immediate assignment
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

      {/* Assignment Detail Drawer */}
      <AssignmentDetailDrawer
        open={assignmentDrawerOpen}
        onClose={() => setAssignmentDrawerOpen(false)}
        assignment={selectedAssignment}
      />
    </PageContainer>
  );
};

export default AgentAssignmentsPage;
