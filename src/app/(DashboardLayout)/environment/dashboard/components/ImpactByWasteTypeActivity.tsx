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
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import {
  PieChart
} from '@mui/x-charts/PieChart';
import {
  BarChart
} from '@mui/x-charts/BarChart';
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Info,
  Filter
} from 'lucide-react';
import { WasteTypeBreakdown, ActivityTypeBreakdown } from '../types';
import { 
  getWasteTypeColor,
  getActivityTypeColor,
  formatWeight,
  formatCO2,
  formatTrees,
  formatPercentage
} from '../mockData';

interface ImpactByWasteTypeActivityProps {
  wasteTypeData: WasteTypeBreakdown[];
  activityTypeData: ActivityTypeBreakdown[];
  onExport?: (format: 'png' | 'svg' | 'pdf') => void;
  showActions?: boolean;
}

const ImpactByWasteTypeActivity: React.FC<ImpactByWasteTypeActivityProps> = ({
  wasteTypeData,
  activityTypeData,
  onExport,
  showActions = true
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleExport = (format: 'png' | 'svg' | 'pdf') => {
    if (onExport) {
      onExport(format);
    }
  };

  const handleRefresh = () => {
    console.log('Refreshing waste type and activity breakdown data');
  };

  // Prepare pie chart data for waste types
  const wasteTypePieData = wasteTypeData.map((item, index) => ({
    id: item.wasteType,
    value: item.totalWeight,
    label: item.wasteType.charAt(0).toUpperCase() + item.wasteType.slice(1),
    color: getWasteTypeColor(item.wasteType)
  }));

  // Prepare bar chart data for waste types
  const wasteTypeBarData = wasteTypeData.map(item => ({
    wasteType: item.wasteType.charAt(0).toUpperCase() + item.wasteType.slice(1),
    weight: item.totalWeight,
    co2: item.co2Avoided,
    trees: item.treesSaved,
    pickups: item.pickups,
    dropoffs: item.dropoffs
  }));

  // Prepare activity type chart data
  const activityTypeDataForChart = activityTypeData.map(item => ({
    activity: item.activityType.charAt(0).toUpperCase() + item.activityType.slice(1),
    weight: item.totalWeight,
    co2: item.co2Avoided,
    trees: item.treesSaved,
    count: item.pickups + item.dropoffs
  }));

  const tabPanels = [
    {
      label: 'Waste Type Breakdown',
      icon: <BarChartIcon size={16} />,
      data: wasteTypeData
    },
    {
      label: 'Activity Type Analysis',
      icon: <PieChartIcon size={16} />,
      data: activityTypeData
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
                <BarChartIcon size={16} color="#10B981" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Top Waste Type
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#10B981">
              {wasteTypeData[0]?.wasteType?.charAt(0).toUpperCase() + wasteTypeData[0]?.wasteType?.slice(1) || 'N/A'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatWeight(wasteTypeData[0]?.totalWeight || 0)}
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
                Most CO₂ Impact
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#3B82F6">
              {wasteTypeData.reduce((max, item) => item.co2Avoided > max.co2Avoided ? item : max, wasteTypeData[0] || {} as any)?.wasteType?.charAt(0).toUpperCase() || 'N/A'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatCO2(Math.max(...wasteTypeData.map(d => d.co2Avoided)))}
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
                <PieChartIcon size={16} color="#84CC16" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Primary Activity
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#84CC16">
              {activityTypeData[0]?.activityType?.charAt(0).toUpperCase() + activityTypeData[0]?.activityType?.slice(1) || 'N/A'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatPercentage(activityTypeData[0]?.percentage || 0)}
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
                <Filter size={16} color="#8B5CF6" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Categories
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#8B5CF6">
              {wasteTypeData.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Waste types tracked
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Main Charts */}
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
                  Impact by Waste Type & Activity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Analyze environmental impact across different waste categories and activity types
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Button
                  size="small"
                  variant={viewMode === 'chart' ? 'contained' : 'outlined'}
                  onClick={() => setViewMode('chart')}
                >
                  Charts
                </Button>
                <Button
                  size="small"
                  variant={viewMode === 'table' ? 'contained' : 'outlined'}
                  onClick={() => setViewMode('table')}
                >
                  Table
                </Button>
                {showActions && (
                  <>
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
                  </>
                )}
              </Box>
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

            {/* Content */}
            {viewMode === 'chart' ? (
              <Box sx={{ height: 400 }}>
                {selectedTab === 0 && (
                  <Grid container spacing={2}>
                    {/* Pie Chart */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="subtitle2" mb={2}>
                        Waste Type Distribution
                      </Typography>
                      <PieChart
                        series={[
                          {
                            data: wasteTypePieData,
                            innerRadius: 60,
                            outerRadius: 120,
                            paddingAngle: 2,
                            cornerRadius: 4
                          }
                        ]}
                        width={400}
                        height={300}
                        slotProps={{
                          legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'center' as const } as const,
                            padding: 20
                          }
                        }}
                      />
                    </Grid>

                    {/* Bar Chart */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="subtitle2" mb={2}>
                        Impact Comparison by Waste Type
                      </Typography>
                      <BarChart
                        height={300}
                        series={[
                          {
                            data: wasteTypeBarData.map(d => d.weight),
                            label: 'Weight (kg)',
                            color: '#10B981'
                          },
                          {
                            data: wasteTypeBarData.map(d => d.co2),
                            label: 'CO₂ Avoided (kg)',
                            color: '#3B82F6'
                          }
                        ]}
                        xAxis={[{ 
                          data: wasteTypeBarData.map(d => d.wasteType),
                          scaleType: 'band'
                        }]}
                        margin={{ top: 10, right: 30, left: 40, bottom: 50 }}
                      />
                    </Grid>
                  </Grid>
                )}

                {selectedTab === 1 && (
                  <BarChart
                    height={400}
                    series={[
                      {
                        data: activityTypeDataForChart.map(d => d.weight),
                        label: 'Total Weight (kg)',
                        color: getActivityTypeColor(activityTypeData[0]?.activityType || 'pickup')
                      },
                      {
                        data: activityTypeDataForChart.map(d => d.co2),
                        label: 'CO₂ Avoided (kg)',
                        color: '#3B82F6'
                      }
                    ]}
                    xAxis={[{ 
                      data: activityTypeDataForChart.map(d => d.activity),
                      scaleType: 'band'
                    }]}
                    margin={{ top: 10, right: 30, left: 40, bottom: 50 }}
                  />
                )}
              </Box>
            ) : (
              // Table View
              <Box>
                {selectedTab === 0 && (
                  <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Waste Type</TableCell>
                          <TableCell align="right">Weight (kg)</TableCell>
                          <TableCell align="right">Percentage</TableCell>
                          <TableCell align="right">CO₂ Avoided</TableCell>
                          <TableCell align="right">Trees Saved</TableCell>
                          <TableCell align="right">Pickups</TableCell>
                          <TableCell align="right">Dropoffs</TableCell>
                          <TableCell align="right">Growth</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {wasteTypeData.map((item) => (
                          <TableRow key={item.wasteType}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                  sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: getWasteTypeColor(item.wasteType)
                                  }}
                                />
                                {item.wasteType.charAt(0).toUpperCase() + item.wasteType.slice(1)}
                              </Box>
                            </TableCell>
                            <TableCell align="right">{formatWeight(item.totalWeight)}</TableCell>
                            <TableCell align="right">{formatPercentage(item.percentage)}</TableCell>
                            <TableCell align="right">{formatCO2(item.co2Avoided)}</TableCell>
                            <TableCell align="right">{formatTrees(item.treesSaved)}</TableCell>
                            <TableCell align="right">{item.pickups}</TableCell>
                            <TableCell align="right">{item.dropoffs}</TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                {item.growthRate >= 0 ? (
                                  <TrendingUp size={14} color="#10B981" />
                                ) : (
                                  <TrendingDown size={14} color="#EF4444" />
                                )}
                                <Typography
                                  variant="caption"
                                  color={item.growthRate >= 0 ? '#10B981' : '#EF4444'}
                                >
                                  {item.growthRate >= 0 ? '+' : ''}{item.growthRate.toFixed(1)}%
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                {selectedTab === 1 && (
                  <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Activity Type</TableCell>
                          <TableCell align="right">Total Weight</TableCell>
                          <TableCell align="right">Percentage</TableCell>
                          <TableCell align="right">CO₂ Avoided</TableCell>
                          <TableCell align="right">Trees Saved</TableCell>
                          <TableCell align="right">Activities</TableCell>
                          <TableCell align="right">Avg Weight</TableCell>
                          <TableCell align="right">Growth</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {activityTypeData.map((item) => (
                          <TableRow key={item.activityType}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                  sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: getActivityTypeColor(item.activityType)
                                  }}
                                />
                                {item.activityType.charAt(0).toUpperCase() + item.activityType.slice(1)}
                              </Box>
                            </TableCell>
                            <TableCell align="right">{formatWeight(item.totalWeight)}</TableCell>
                            <TableCell align="right">{formatPercentage(item.percentage)}</TableCell>
                            <TableCell align="right">{formatCO2(item.co2Avoided)}</TableCell>
                            <TableCell align="right">{formatTrees(item.treesSaved)}</TableCell>
                            <TableCell align="right">{item.pickups + item.dropoffs}</TableCell>
                            <TableCell align="right">{formatWeight(item.avgWeightPerActivity)}</TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                <TrendingUp size={14} color="#10B981" />
                                <Typography variant="caption" color="#10B981">
                                  Active
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}

            {/* Info */}
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
                Data based on verified recycling activities and CO₂ conversion factors
              </Typography>
              <Tooltip title="All calculations use verified weight data and standard CO₂ conversion rates">
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

export default ImpactByWasteTypeActivity;
