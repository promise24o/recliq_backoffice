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
  Plus,
  Eye,
  Settings,
  Target,
  Users,
  TrendingUp,
  Calendar,
  Zap
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

// Import components
import ChallengesOverview from './components/ChallengesOverview';
import ChallengesTableSimple from './components/ChallengesTableSimple';
import ChallengeDetailDrawer from './components/ChallengeDetailDrawer';
import ProgressPerformanceInsights from './components/ProgressPerformanceInsights';
import ChallengeLifecycleLearningLoop from './components/ChallengeLifecycleLearningLoop';
import AntiAbuseFairnessControls from './components/AntiAbuseFairnessControls';

// Import data and types
import { 
  mockChallenges, 
  mockChallengeOverview, 
  mockChallengeProgress, 
  mockChallengePerformanceInsights, 
  mockChallengeLifecycle 
} from './mockData';
import { Challenge, ChallengeCategory, ChallengeStatus, ChallengeScope, ChallengeUserType } from './types';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';

export default function ChallengesPage() {
  // State management
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [challengeOverview, setChallengeOverview] = useState(mockChallengeOverview);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    scope: '',
    userType: '',
    location: '',
    search: ''
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
  const handleChallengeClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setDrawerOpen(true);
  };

  const handleCardClick = (metricType: string) => {
    setNotification({
      open: true,
      message: `Viewing details for: ${metricType}`,
      severity: 'info'
    });
  };

  const handleExport = (challengesToExport: Challenge[]) => {
    setNotification({
      open: true,
      message: `Exporting ${challengesToExport.length} challenges...`,
      severity: 'success'
    });
  };

  const handleActivateChallenge = (challenge: Challenge) => {
    setChallenges(prev => prev.map(c => 
      c.id === challenge.id ? { 
        ...c, 
        status: 'active' as ChallengeStatus,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...c.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'activated' as any,
            performedBy: 'CURRENT_USER',
            details: 'Challenge activated by user'
          }
        ]
      } : c
    ));
    setNotification({
      open: true,
      message: `Challenge activated: ${challenge.name}`,
      severity: 'success'
    });
  };

  const handlePauseChallenge = (challenge: Challenge) => {
    setChallenges(prev => prev.map(c => 
      c.id === challenge.id ? { 
        ...c, 
        status: 'paused' as ChallengeStatus,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...c.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'paused' as any,
            performedBy: 'CURRENT_USER',
            details: 'Challenge paused by user'
          }
        ]
      } : c
    ));
    setNotification({
      open: true,
      message: `Challenge paused: ${challenge.name}`,
      severity: 'warning'
    });
  };

  const handleEndChallenge = (challenge: Challenge) => {
    setChallenges(prev => prev.map(c => 
      c.id === challenge.id ? { 
        ...c, 
        status: 'completed' as ChallengeStatus,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...c.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'ended' as any,
            performedBy: 'CURRENT_USER',
            details: 'Challenge ended early by user'
          }
        ]
      } : c
    ));
    setNotification({
      open: true,
      message: `Challenge ended: ${challenge.name}`,
      severity: 'warning'
    });
  };

  const handleDuplicateChallenge = (challenge: Challenge) => {
    const newChallenge = {
      ...challenge,
      id: `CHALLENGE${Date.now()}`,
      name: `${challenge.name} (Copy)`,
      status: 'paused' as ChallengeStatus,
      createdAt: new Date().toISOString(),
      createdBy: 'CURRENT_USER',
      lastModified: new Date().toISOString(),
      modifiedBy: 'CURRENT_USER',
      auditTrail: [
        {
          id: `AUDIT${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: 'created' as any,
          performedBy: 'CURRENT_USER',
          details: `Duplicated from challenge ${challenge.id}`
        }
      ]
    };
    setChallenges(prev => [...prev, newChallenge]);
    setNotification({
      open: true,
      message: `Challenge duplicated: ${newChallenge.name}`,
      severity: 'success'
    });
  };

  const handleSaveChallenge = (updatedChallenge: Challenge) => {
    setChallenges(prev => prev.map(c => 
      c.id === updatedChallenge.id ? { 
        ...updatedChallenge,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...updatedChallenge.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'modified' as any,
            performedBy: 'CURRENT_USER',
            details: 'Challenge modified by user'
          }
        ]
      } : c
    ));
    setNotification({
      open: true,
      message: `Challenge updated: ${updatedChallenge.name}`,
      severity: 'success'
    });
  };

  const handleRefresh = () => {
    setNotification({
      open: true,
      message: 'Challenge data refreshed successfully',
      severity: 'success'
    });
  };

  // Filter challenges based on search and filters
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = searchTerm === '' || 
      challenge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === '' || challenge.status === filters.status;
    const matchesCategory = filters.category === '' || challenge.category === filters.category;
    const matchesScope = filters.scope === '' || challenge.scope === filters.scope;
    const matchesUserType = filters.userType === '' || challenge.targetUserType === filters.userType;
    const matchesLocation = filters.location === '' || 
      challenge.targetLocations.some(loc => loc.toLowerCase().includes(filters.location.toLowerCase()));

    return matchesSearch && matchesStatus && matchesCategory && matchesScope && matchesUserType && matchesLocation;
  });

  // Get unique values for filters
  const statuses = Array.from(new Set(challenges.map(c => c.status)));
  const categories = Array.from(new Set(challenges.map(c => c.category)));
  const scopes = Array.from(new Set(challenges.map(c => c.scope)));
  const userTypes = Array.from(new Set(challenges.map(c => c.targetUserType)));

  return (
    <PageContainer title="Challenges" description="Time-bound incentives to drive recycling behavior">
      <Breadcrumb title="Challenges" subtitle="Time-bound incentives to drive recycling behavior" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Challenges
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Design time-bound incentive programs to drive specific recycling behaviors and outcomes
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={() => setNotification({
                open: true,
                message: 'Create new challenge feature coming soon',
                severity: 'info'
              })}
            >
              Create Challenge
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
              placeholder="Search challenges..."
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
                {statuses.map(status => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
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

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>User Type</InputLabel>
              <Select
                value={filters.userType}
                onChange={(e) => setFilters(prev => ({ ...prev, userType: e.target.value }))}
                label="User Type"
              >
                <MenuItem value="">All Types</MenuItem>
                {userTypes.map(userType => (
                  <MenuItem key={userType} value={userType}>
                    {userType === 'all' ? 'All' : userType.charAt(0).toUpperCase() + userType.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ flex: 1 }} />

            <IconButton onClick={() => handleExport(filteredChallenges)}>
              <Download size={20} />
            </IconButton>
          </Stack>
        </Paper>
      </Box>

      {/* Challenges Overview */}
      <ChallengesOverview
        overview={challengeOverview}
        onCardClick={handleCardClick}
      />

      {/* Main Content Grid */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* Challenges Table */}
            <ChallengesTableSimple
              challenges={filteredChallenges}
              onChallengeClick={handleChallengeClick}
              onExport={handleExport}
              onActivateChallenge={handleActivateChallenge}
              onPauseChallenge={handlePauseChallenge}
              onEndChallenge={handleEndChallenge}
              onDuplicateChallenge={handleDuplicateChallenge}
            />

            {/* Progress & Performance Insights */}
            <ProgressPerformanceInsights
              insights={mockChallengePerformanceInsights}
              onExportInsights={() => setNotification({
                open: true,
                message: 'Performance insights exported',
                severity: 'success'
              })}
              onGenerateReport={() => setNotification({
                open: true,
                message: 'Generating performance report...',
                severity: 'info'
              })}
            />
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Challenge Lifecycle & Learning Loop */}
            <ChallengeLifecycleLearningLoop
              lifecycleData={mockChallengeLifecycle}
              onExportLifecycle={() => setNotification({
                open: true,
                message: 'Lifecycle data exported',
                severity: 'success'
              })}
            />

            {/* Anti-Abuse & Fairness Controls */}
            <AntiAbuseFairnessControls
              challenges={challenges}
              onUpdateControl={(id, updates) => {
                setNotification({
                  open: true,
                  message: 'Control settings updated',
                  severity: 'success'
                });
              }}
              onAddControl={(control) => {
                setNotification({
                  open: true,
                  message: 'New control added',
                  severity: 'success'
                });
              }}
              onDeleteControl={(id) => {
                setNotification({
                  open: true,
                  message: 'Control deleted',
                  severity: 'warning'
                });
              }}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* Challenge Detail Drawer */}
      <ChallengeDetailDrawer
        challenge={selectedChallenge}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveChallenge}
        onActivate={handleActivateChallenge}
        onPause={handlePauseChallenge}
        onEnd={handleEndChallenge}
        onDuplicate={handleDuplicateChallenge}
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
