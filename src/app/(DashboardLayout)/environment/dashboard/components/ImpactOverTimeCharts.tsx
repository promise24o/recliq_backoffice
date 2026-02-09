'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Tabs,
  Tab,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  LineChart
} from '@mui/x-charts/LineChart';
import {
  BarChart
} from '@mui/x-charts/BarChart';
import {
  axisClasses
} from '@mui/x-charts';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  RefreshCw,
  Info
} from 'lucide-react';
import { ImpactOverTime } from '../types';
import { 
  formatWeight, 
  formatCO2, 
  formatTrees,
  formatPercentage 
} from '../mockData';

interface ImpactOverTimeChartsProps {
  data: ImpactOverTime[];
  onPeriodChange?: (period: string) => void;
  onExport?: (format: 'png' | 'svg' | 'pdf') => void;
  showActions?: boolean;
}

const ImpactOverTimeCharts: React.FC<ImpactOverTimeChartsProps> = ({
  data,
  onPeriodChange,
  onExport,
  showActions = true
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [timeRange, setTimeRange] = useState('week');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleExport = (format: 'png' | 'svg' | 'pdf') => {
    if (onExport) {
      onExport(format);
    }
  };

  const handleRefresh = () => {
    // Refresh data
    console.log('Refreshing impact over time data');
  };

  // Calculate trend
  const calculateTrend = (data: number[]) => {
    if (data.length < 2) return { trend: 'stable', change: 0 };
    const recent = data.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, data.length);
    const previous = data.slice(-6, -3).reduce((a, b) => a + b, 0) / Math.min(3, data.length);
    const change = ((recent - previous) / previous) * 100;
    return {
      trend: change > 5 ? 'increasing' : change < -5 ? 'decreasing' : 'stable',
      change
    };
  };

  const wasteTrend = calculateTrend(data.map(d => d.wasteRecycled));
  const co2Trend = calculateTrend(data.map(d => d.co2Avoided));
  const treesTrend = calculateTrend(data.map(d => d.treesSaved));

  const tabPanels = [
    {
      label: 'Waste Recycled',
      icon: <TrendingUp size={16} />,
      color: '#10B981',
      data: data.map(d => ({
        ...d,
        formattedWaste: formatWeight(d.wasteRecycled),
        formattedCO2: formatCO2(d.co2Avoided),
        formattedTrees: formatTrees(d.treesSaved)
      }))
    },
    {
      label: 'CO₂ Avoided',
      icon: <TrendingUp size={16} />,
      color: '#3B82F6',
      data: data.map(d => ({
        ...d,
        formattedWaste: formatWeight(d.wasteRecycled),
        formattedCO2: formatCO2(d.co2Avoided),
        formattedTrees: formatTrees(d.treesSaved)
      }))
    },
    {
      label: 'Trees Equivalent',
      icon: <TrendingUp size={16} />,
      color: '#84CC16',
      data: data.map(d => ({
        ...d,
        formattedWaste: formatWeight(d.wasteRecycled),
        formattedCO2: formatCO2(d.co2Avoided),
        formattedTrees: formatTrees(d.treesSaved)
      }))
    },
    {
      label: 'Activity Breakdown',
      icon: <Calendar size={16} />,
      color: '#8B5CF6',
      data: data.map(d => ({
        ...d,
        totalActivity: d.pickups + d.dropoffs + d.enterpriseActivity + d.communityActivity,
        formattedWaste: formatWeight(d.wasteRecycled),
        formattedCO2: formatCO2(d.co2Avoided),
        formattedTrees: formatTrees(d.treesSaved)
      }))
    }
  ];


  return (
    <Grid container spacing={3}>
      {/* Summary Cards */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: '#10B98120',
                  mr: 1
                }}
              >
                <TrendingUp size={16} color="#10B981" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Waste Trend
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#10B981">
              {wasteTrend.change >= 0 ? '+' : ''}{wasteTrend.change.toFixed(1)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {wasteTrend.trend === 'increasing' ? 'Growing' : wasteTrend.trend === 'decreasing' ? 'Declining' : 'Stable'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: '#3B82F620',
                  mr: 1
                }}
              >
                <TrendingUp size={16} color="#3B82F6" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                CO₂ Trend
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#3B82F6">
              {co2Trend.change >= 0 ? '+' : ''}{co2Trend.change.toFixed(1)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {co2Trend.trend === 'increasing' ? 'Growing' : co2Trend.trend === 'decreasing' ? 'Declining' : 'Stable'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: '#84CC1620',
                  mr: 1
                }}
              >
                <TrendingUp size={16} color="#84CC16" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Trees Trend
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#84CC16">
              {treesTrend.change >= 0 ? '+' : ''}{treesTrend.change.toFixed(1)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {treesTrend.trend === 'increasing' ? 'Growing' : treesTrend.trend === 'decreasing' ? 'Declining' : 'Stable'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: '#8B5CF620',
                  mr: 1
                }}
              >
                <Calendar size={16} color="#8B5CF6" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Activities
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#8B5CF6">
              {data.reduce((sum, d) => sum + d.pickups + d.dropoffs + d.enterpriseActivity + d.communityActivity, 0)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              All time periods
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Main Chart */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="600" mb={1}>
                  Impact Over Time
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track environmental impact trends and patterns
                </Typography>
              </Box>

              {showActions && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Download size={16} />}
                    onClick={() => handleExport('png')}
                  >
                    Export
                  </Button>
                  <IconButton size="small" onClick={handleRefresh}>
                    <RefreshCw size={16} />
                  </IconButton>
                </Box>
              )}
            </Box>

            {/* Tabs */}
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              sx={{ mb: 3 }}
              variant="scrollable"
              scrollButtons="auto"
            >
              {tabPanels.map((panel, index) => (
                <Tab
                  key={index}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {panel.icon}
                      {panel.label}
                    </Box>
                  }
                  value={index}
                />
              ))}
            </Tabs>

            {/* Chart Content */}
            <Box sx={{ height: 400, width: '100%' }}>
              {selectedTab === 0 && (
                <LineChart
                  height={400}
                  series={[
                    {
                      data: tabPanels[0].data.map(d => d.wasteRecycled),
                      label: 'Waste Recycled (kg)',
                      color: '#10B981',
                      area: true,
                    }
                  ]}
                  xAxis={[{ 
                    data: tabPanels[0].data.map(d => d.period),
                    scaleType: 'band'
                  }]}
                  margin={{ top: 10, right: 30, left: 40, bottom: 50 }}
                />
              )}

              {selectedTab === 1 && (
                <LineChart
                  height={400}
                  series={[
                    {
                      data: tabPanels[1].data.map(d => d.co2Avoided),
                      label: 'CO₂ Avoided (kg)',
                      color: '#3B82F6',
                    }
                  ]}
                  xAxis={[{ 
                    data: tabPanels[1].data.map(d => d.period),
                    scaleType: 'band'
                  }]}
                  margin={{ top: 10, right: 30, left: 40, bottom: 50 }}
                />
              )}

              {selectedTab === 2 && (
                <LineChart
                  height={400}
                  series={[
                    {
                      data: tabPanels[2].data.map(d => d.treesSaved),
                      label: 'Trees Equivalent',
                      color: '#84CC16',
                      area: true,
                    }
                  ]}
                  xAxis={[{ 
                    data: tabPanels[2].data.map(d => d.period),
                    scaleType: 'band'
                  }]}
                  margin={{ top: 10, right: 30, left: 40, bottom: 50 }}
                />
              )}

              {selectedTab === 3 && (
                <BarChart
                  height={400}
                  series={[
                    {
                      data: tabPanels[3].data.map(d => d.pickups),
                      label: 'Pickups',
                      color: '#3B82F6',
                      stack: 'total',
                    },
                    {
                      data: tabPanels[3].data.map(d => d.dropoffs),
                      label: 'Drop-offs',
                      color: '#10B981',
                      stack: 'total',
                    },
                    {
                      data: tabPanels[3].data.map(d => d.enterpriseActivity),
                      label: 'Enterprise',
                      color: '#8B5CF6',
                      stack: 'total',
                    },
                    {
                      data: tabPanels[3].data.map(d => d.communityActivity),
                      label: 'Community',
                      color: '#F59E0B',
                      stack: 'total',
                    }
                  ]}
                  xAxis={[{ 
                    data: tabPanels[3].data.map(d => d.period),
                    scaleType: 'band'
                  }]}
                  margin={{ top: 10, right: 30, left: 40, bottom: 50 }}
                />
              )}
            </Box>

            {/* Chart Info */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
                pt: 2,
                borderTop: '1px solid #e0e0e0'
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Data updated in real-time from verified recycling activities
              </Typography>
              <Tooltip title="All metrics are calculated from verified weight data">
                <IconButton size="small">
                  <Info size={14} />
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ImpactOverTimeCharts;
