'use client';

import React, { useState } from 'react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  RefreshCw,
  Download,
  Filter,
  Calendar,
  Info
} from 'lucide-react';
import ImpactSummaryCards from './components/ImpactSummaryCards';
import ImpactOverTimeCharts from './components/ImpactOverTimeCharts';
import ImpactByWasteTypeActivity from './components/ImpactByWasteTypeActivity';
import CityZoneImpactMap from './components/CityZoneImpactMap';
import VerifiedImpactTable from './components/VerifiedImpactTable';
import ESGSDGAlignmentPanel from './components/ESGSDGAlignmentPanel';
import ImpactDetailDrawer from './components/ImpactDetailDrawer';
import { 
  mockImpactData,
  defaultImpactFilters 
} from './mockData';
import { ImpactMetric, EnvironmentalImpact } from './types';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/environment',
    title: 'Environmental Impact',
  },
  {
    title: 'Impact Dashboard',
  },
];

const EnvironmentalImpactDashboard: React.FC = () => {
  const [filters, setFilters] = useState(defaultImpactFilters);
  const [selectedMetric, setSelectedMetric] = useState<ImpactMetric | null>(null);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });
  const [selectedImpact, setSelectedImpact] = useState<EnvironmentalImpact | null>(null);
  const [impactDrawerOpen, setImpactDrawerOpen] = useState(false);

  const handleRefresh = () => {
    setNotification({
      open: true,
      message: 'Impact data refreshed successfully',
      severity: 'success'
    });
  };

  const handleExport = (format: 'csv' | 'pdf' | 'png' | 'svg' | 'excel') => {
    setNotification({
      open: true,
      message: `Exporting data as ${format.toUpperCase()}...`,
      severity: 'info'
    });
  };

  const handleCardClick = (metricType: ImpactMetric) => {
    setSelectedMetric(metricType);
    setNotification({
      open: true,
      message: `Filtering by ${metricType.replace(/_/g, ' ')}`,
      severity: 'info'
    });
  };

  const handleNotificationClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <PageContainer title="Impact Dashboard" description="Verified environmental outcomes from recycling activity">
      <Breadcrumb title="Impact Dashboard" items={BCrumb} />
      
      <Box sx={{ width: '100%', mb: 3 }}>
        {/* Page Header */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="600" mb={1}>
                Environmental Impact Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Real-time tracking of verified environmental impact across all recycling activities
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<Filter size={16} />}
                onClick={() => setNotification({
                  open: true,
                  message: 'Filter panel coming soon',
                  severity: 'info'
                })}
              >
                Filters
              </Button>
              <Button
                variant="outlined"
                startIcon={<Calendar size={16} />}
                onClick={() => setNotification({
                  open: true,
                  message: 'Date range selector coming soon',
                  severity: 'info'
                })}
              >
                Date Range
              </Button>
              <Button
                variant="contained"
                startIcon={<Download size={16} />}
                onClick={() => handleExport('pdf')}
              >
                Export Report
              </Button>
              <IconButton onClick={handleRefresh}>
                <RefreshCw size={20} />
              </IconButton>
            </Box>
          </Box>

          {/* Selected Metric Indicator */}
          {selectedMetric && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              p: 2, 
              backgroundColor: '#f5f5f5', 
              borderRadius: 2 
            }}>
              <Typography variant="body2" color="text.secondary">
                Currently filtering by:
              </Typography>
              <Typography variant="body2" fontWeight="600" color="primary">
                {selectedMetric.replace(/_/g, ' ').charAt(0).toUpperCase() + selectedMetric.replace(/_/g, ' ').slice(1)}
              </Typography>
              <Button size="small" onClick={() => setSelectedMetric(null)}>
                Clear
              </Button>
            </Box>
          )}
        </Paper>

        {/* Impact Summary Cards */}
        <ImpactSummaryCards
          summary={mockImpactData.summary}
          onCardClick={handleCardClick}
          showActions={true}
        />

        {/* Impact Over Time Charts */}
        <Box sx={{ mt: 3 }}>
          <ImpactOverTimeCharts
            data={mockImpactData.impactOverTime}
            onExport={handleExport}
            showActions={true}
          />
        </Box>

        {/* Impact by Waste Type & Activity */}
        <Box sx={{ mt: 3 }}>
          <ImpactByWasteTypeActivity
            wasteTypeData={mockImpactData.wasteTypeBreakdown}
            activityTypeData={mockImpactData.activityTypeBreakdown}
            onExport={handleExport}
            showActions={true}
          />
        </Box>

        {/* City & Zone Impact Map */}
        <Box sx={{ mt: 3 }}>
          <CityZoneImpactMap
            cityData={mockImpactData.cityImpacts}
            zoneData={mockImpactData.zoneImpacts}
            onExport={handleExport}
            showActions={true}
          />
        </Box>

        {/* Verified Impact Table */}
        <Box sx={{ mt: 3 }}>
          <VerifiedImpactTable
            data={mockImpactData.environmentalImpacts}
            onExport={handleExport}
            onViewDetails={(impact) => {
              setSelectedImpact(impact);
              setImpactDrawerOpen(true);
            }}
            showActions={true}
          />
        </Box>

        {/* ESG & SDG Alignment Panel */}
        <Box sx={{ mt: 3 }}>
          <ESGSDGAlignmentPanel
            esgReport={mockImpactData.esgReport}
            onExport={handleExport}
            showActions={true}
          />
        </Box>

        {/* Info Section */}
        <Paper sx={{ p: 3, mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Info size={20} color="#666" />
            <Typography variant="body2" color="text.secondary">
              All impact metrics are calculated from verified weight data and follow international environmental reporting standards. 
              Data is updated in real-time and includes full audit trails for ESG compliance.
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Notification Snackbar */}
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

      {/* Impact Detail Drawer */}
      <ImpactDetailDrawer
        impact={selectedImpact}
        open={impactDrawerOpen}
        onClose={() => {
          setImpactDrawerOpen(false);
          setSelectedImpact(null);
        }}
      />
    </PageContainer>
  );
};

export default EnvironmentalImpactDashboard;
