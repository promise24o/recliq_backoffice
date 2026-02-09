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
  Award,
  Users,
  TrendingUp
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

// Import components
import BadgeSystemOverview from './components/BadgeSystemOverview';
import BadgesCatalog from './components/BadgesCatalog';
import BadgeDetailDrawer from './components/BadgeDetailDrawer';
import BadgeEarningFlowProgression from './components/BadgeEarningFlowProgression';
import BadgeEarningsQualityInsights from './components/BadgeEarningsQualityInsights';
import AntiAbuseDilutionControls from './components/AntiAbuseDilutionControls';

// Import data and types
import { 
  mockBadges, 
  mockBadgeSystemOverview, 
  mockBadgeProgressions, 
  mockBadgeEarningsInsights, 
  mockAntiAbuseControls 
} from './mockData';
import { Badge, BadgeCategory, BadgeRarity, BadgeStatus, EligibilityType, BadgeProgression, BadgeEarningsInsight, AntiAbuseControl } from './types';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';

export default function BadgesPage() {
  // State management
  const [badges, setBadges] = useState<Badge[]>(mockBadges);
  const [badgeOverview, setBadgeOverview] = useState(mockBadgeSystemOverview);
  const [progressions, setProgressions] = useState<BadgeProgression[]>(mockBadgeProgressions);
  const [insights, setInsights] = useState<BadgeEarningsInsight[]>(mockBadgeEarningsInsights);
  const [controls, setControls] = useState<AntiAbuseControl[]>(mockAntiAbuseControls);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    eligibility: '',
    status: '',
    rarity: '',
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
  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    setDrawerOpen(true);
  };

  const handleCardClick = (metricType: string) => {
    setNotification({
      open: true,
      message: `Viewing details for: ${metricType}`,
      severity: 'info'
    });
  };

  const handleExport = (badgesToExport: Badge[]) => {
    setNotification({
      open: true,
      message: `Exporting ${badgesToExport.length} badges...`,
      severity: 'success'
    });
  };

  const handleActivateBadge = (badge: Badge) => {
    setBadges(prev => prev.map(b => 
      b.id === badge.id ? { 
        ...b, 
        status: 'active' as BadgeStatus,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...b.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'activated' as const,
            performedBy: 'CURRENT_USER',
            details: 'Badge activated by user'
          }
        ]
      } : b
    ));
    setNotification({
      open: true,
      message: `Badge activated: ${badge.name}`,
      severity: 'success'
    });
  };

  const handlePauseBadge = (badge: Badge) => {
    setBadges(prev => prev.map(b => 
      b.id === badge.id ? { 
        ...b, 
        status: 'paused' as BadgeStatus,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...b.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'paused' as const,
            performedBy: 'CURRENT_USER',
            details: 'Badge paused by user'
          }
        ]
      } : b
    ));
    setNotification({
      open: true,
      message: `Badge paused: ${badge.name}`,
      severity: 'warning'
    });
  };

  const handleRetireBadge = (badge: Badge) => {
    setBadges(prev => prev.map(b => 
      b.id === badge.id ? { 
        ...b, 
        status: 'retired' as BadgeStatus,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...b.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'retired' as const,
            performedBy: 'CURRENT_USER',
            details: 'Badge retired by user'
          }
        ]
      } : b
    ));
    setNotification({
      open: true,
      message: `Badge retired: ${badge.name}`,
      severity: 'warning'
    });
  };

  const handleDuplicateBadge = (badge: Badge) => {
    const newBadge = {
      ...badge,
      id: `BADGE${Date.now()}`,
      name: `${badge.name} (Copy)`,
      status: 'paused' as BadgeStatus,
      createdAt: new Date().toISOString(),
      createdBy: 'CURRENT_USER',
      lastModified: new Date().toISOString(),
      modifiedBy: 'CURRENT_USER',
      auditTrail: [
        {
          id: `AUDIT${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: 'created' as const,
          performedBy: 'CURRENT_USER',
          details: `Duplicated from badge ${badge.id}`
        }
      ]
    };
    setBadges(prev => [...prev, newBadge]);
    setNotification({
      open: true,
      message: `Badge duplicated: ${newBadge.name}`,
      severity: 'success'
    });
  };

  const handleSaveBadge = (updatedBadge: Badge) => {
    setBadges(prev => prev.map(b => 
      b.id === updatedBadge.id ? { 
        ...updatedBadge,
        lastModified: new Date().toISOString(),
        modifiedBy: 'CURRENT_USER',
        auditTrail: [
          ...updatedBadge.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'modified' as const,
            performedBy: 'CURRENT_USER',
            details: 'Badge modified by user'
          }
        ]
      } : b
    ));
    setNotification({
      open: true,
      message: `Badge updated: ${updatedBadge.name}`,
      severity: 'success'
    });
  };

  const handleCreateProgression = (progression: Omit<BadgeProgression, 'id'>) => {
    const newProgression = {
      ...progression,
      id: `PROG${Date.now()}`
    };
    setProgressions(prev => [...prev, newProgression]);
    setNotification({
      open: true,
      message: 'Progression path created',
      severity: 'success'
    });
  };

  const handleUpdateProgression = (id: string, updates: Partial<BadgeProgression>) => {
    setProgressions(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ));
  };

  const handleDeleteProgression = (id: string) => {
    setProgressions(prev => prev.filter(p => p.id !== id));
    setNotification({
      open: true,
      message: 'Progression path deleted',
      severity: 'warning'
    });
  };

  const handleUpdateControl = (id: string, updates: Partial<AntiAbuseControl>) => {
    setControls(prev => prev.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  const handleAddControl = (control: Omit<AntiAbuseControl, 'id'>) => {
    const newControl = {
      ...control,
      id: `CONTROL${Date.now()}`
    };
    setControls(prev => [...prev, newControl]);
    setNotification({
      open: true,
      message: 'Anti-abuse control added',
      severity: 'success'
    });
  };

  const handleDeleteControl = (id: string) => {
    setControls(prev => prev.filter(c => c.id !== id));
    setNotification({
      open: true,
      message: 'Anti-abuse control deleted',
      severity: 'warning'
    });
  };

  const handleExportInsights = () => {
    setNotification({
      open: true,
      message: 'Badge insights exported',
      severity: 'success'
    });
  };

  const handleGenerateReport = () => {
    setNotification({
      open: true,
      message: 'Generating badge performance report...',
      severity: 'info'
    });
  };

  const handleRefresh = () => {
    setNotification({
      open: true,
      message: 'Badge data refreshed successfully',
      severity: 'success'
    });
  };

  // Filter badges based on search and filters
  const filteredBadges = badges.filter(badge => {
    const matchesSearch = searchTerm === '' || 
      badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filters.category === '' || badge.category === filters.category;
    const matchesEligibility = filters.eligibility === '' || badge.eligibility.includes(filters.eligibility as EligibilityType);
    const matchesStatus = filters.status === '' || badge.status === filters.status;
    const matchesRarity = filters.rarity === '' || badge.rarity === filters.rarity;

    return matchesSearch && matchesCategory && matchesEligibility && matchesStatus && matchesRarity;
  });

  // Get unique values for filters
  const categories = Array.from(new Set(badges.map(b => b.category)));
  const eligibilities = Array.from(new Set(badges.flatMap(b => b.eligibility)));
  const statuses = Array.from(new Set(badges.map(b => b.status)));
  const rarities = Array.from(new Set(badges.map(b => b.rarity)));

  return (
    <PageContainer title="Badges" description="Achievement-based recognition for recycling impact">
      <Breadcrumb title="Badges" subtitle="Achievement-based recognition for recycling impact" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Badges
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Define achievement milestones and recognize user identity through status badges
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={() => setNotification({
                open: true,
                message: 'Create new badge feature coming soon',
                severity: 'info'
              })}
            >
              Create Badge
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
              placeholder="Search badges..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search size={20} color="#6b7280" style={{ marginRight: 8 }} />
              }}
              sx={{ minWidth: 300 }}
            />

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
              <InputLabel>Eligibility</InputLabel>
              <Select
                value={filters.eligibility}
                onChange={(e) => setFilters(prev => ({ ...prev, eligibility: e.target.value }))}
                label="Eligibility"
              >
                <MenuItem value="">All Types</MenuItem>
                {eligibilities.map(eligibility => (
                  <MenuItem key={eligibility} value={eligibility}>
                    {eligibility.charAt(0).toUpperCase() + eligibility.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
              <InputLabel>Rarity</InputLabel>
              <Select
                value={filters.rarity}
                onChange={(e) => setFilters(prev => ({ ...prev, rarity: e.target.value }))}
                label="Rarity"
              >
                <MenuItem value="">All Rarities</MenuItem>
                {rarities.map(rarity => (
                  <MenuItem key={rarity} value={rarity}>
                    {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ flex: 1 }} />

            <IconButton onClick={() => handleExport(filteredBadges)}>
              <Download size={20} />
            </IconButton>
          </Stack>
        </Paper>
      </Box>

      {/* Badge System Overview */}
      <BadgeSystemOverview
        overview={badgeOverview}
        onCardClick={handleCardClick}
      />

      {/* Main Content Grid */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* Badges Catalog */}
            <BadgesCatalog
              badges={filteredBadges}
              onBadgeClick={handleBadgeClick}
              onActivateBadge={handleActivateBadge}
              onPauseBadge={handlePauseBadge}
              onRetireBadge={handleRetireBadge}
              onDuplicateBadge={handleDuplicateBadge}
              onExport={handleExport}
            />

            {/* Badge Earning Flow & Progression */}
            <BadgeEarningFlowProgression
              progressions={progressions}
              onCreateProgression={handleCreateProgression}
              onUpdateProgression={handleUpdateProgression}
              onDeleteProgression={handleDeleteProgression}
            />
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Badge Earnings & Quality Insights */}
            <BadgeEarningsQualityInsights
              insights={insights}
              onExportInsights={handleExportInsights}
              onGenerateReport={handleGenerateReport}
            />

            {/* Anti-Abuse & Dilution Controls */}
            <AntiAbuseDilutionControls
              controls={controls}
              onUpdateControl={handleUpdateControl}
              onAddControl={handleAddControl}
              onDeleteControl={handleDeleteControl}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* Badge Detail Drawer */}
      <BadgeDetailDrawer
        badge={selectedBadge}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveBadge}
        onActivate={handleActivateBadge}
        onPause={handlePauseBadge}
        onRetire={handleRetireBadge}
        onDuplicate={handleDuplicateBadge}
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
