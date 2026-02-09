'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
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
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  BarChart
} from '@mui/x-charts/BarChart';
import {
  MapPin,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Info,
  Building,
  Map,
  Filter
} from 'lucide-react';
import { CityImpact, ZoneImpact } from '../types';
import { 
  formatWeight, 
  formatCO2, 
  formatTrees,
  formatPercentage
} from '../mockData';

interface CityZoneImpactMapProps {
  cityData: CityImpact[];
  zoneData: ZoneImpact[];
  onExport?: (format: 'png' | 'svg' | 'pdf') => void;
  showActions?: boolean;
}

const CityZoneImpactMap: React.FC<CityZoneImpactMapProps> = ({
  cityData,
  zoneData,
  onExport,
  showActions = true
}) => {
  const [selectedView, setSelectedView] = useState<'city' | 'zone'>('city');
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'co2' | 'trees'>('weight');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const handleExport = (format: 'png' | 'svg' | 'pdf') => {
    if (onExport) {
      onExport(format);
    }
  };

  const handleRefresh = () => {
    console.log('Refreshing city and zone impact data');
  };

  // Filter zones based on selected city
  const filteredZoneData = selectedCity === 'all' 
    ? zoneData 
    : zoneData.filter(zone => zone.city === selectedCity);

  // Prepare chart data
  const getChartData = () => {
    const data = selectedView === 'city' ? cityData : filteredZoneData;
    return data.map(item => ({
      name: selectedView === 'city' ? item.city : item.zone,
      weight: selectedView === 'city' ? item.totalWasteRecycled : item.totalWasteRecycled,
      co2: selectedView === 'city' ? item.co2Avoided : item.co2Avoided,
      trees: selectedView === 'city' ? item.treesSaved : item.treesSaved,
      activities: selectedView === 'city' ? item.pickups + item.dropoffs + (item.enterpriseActivity || 0) + (item.communityActivity || 0) : item.pickups + item.dropoffs
    }));
  };

  const getMetricValue = (item: any) => {
    switch (selectedMetric) {
      case 'weight':
        return formatWeight(item.weight);
      case 'co2':
        return formatCO2(item.co2);
      case 'trees':
        return formatTrees(item.trees);
      default:
        return formatWeight(item.weight);
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'weight':
        return '#10B981';
      case 'co2':
        return '#3B82F6';
      case 'trees':
        return '#84CC16';
      default:
        return '#10B981';
    }
  };

  const topPerformingCity = cityData.reduce((max, city) => 
    city.totalWasteRecycled > max.totalWasteRecycled ? city : max, cityData[0] || {} as any);

  const topPerformingZone = zoneData.reduce((max, zone) => 
    zone.totalWasteRecycled > max.totalWasteRecycled ? zone : max, zoneData[0] || {} as any);

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
                <Building size={16} color="#10B981" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Top City
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#10B981">
              {topPerformingCity.city || 'N/A'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatWeight(topPerformingCity.totalWasteRecycled || 0)}
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
                <MapPin size={16} color="#3B82F6" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Top Zone
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#3B82F6">
              {topPerformingZone.zone || 'N/A'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatWeight(topPerformingZone.totalWasteRecycled || 0)}
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
                <Map size={16} color="#84CC16" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Active Cities
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#84CC16">
              {cityData.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              With verified activity
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
                Total Zones
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#8B5CF6">
              {zoneData.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Across all cities
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Main Map and Charts */}
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
                  City & Zone Impact Map
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Geographic analysis of environmental impact across cities and zones
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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

            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>View</InputLabel>
                <Select
                  value={selectedView}
                  label="View"
                  onChange={(e) => setSelectedView(e.target.value as 'city' | 'zone')}
                >
                  <MenuItem value="city">Cities</MenuItem>
                  <MenuItem value="zone">Zones</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Metric</InputLabel>
                <Select
                  value={selectedMetric}
                  label="Metric"
                  onChange={(e) => setSelectedMetric(e.target.value as 'weight' | 'co2' | 'trees')}
                >
                  <MenuItem value="weight">Weight (kg)</MenuItem>
                  <MenuItem value="co2">CO₂ Avoided</MenuItem>
                  <MenuItem value="trees">Trees Saved</MenuItem>
                </Select>
              </FormControl>

              {selectedView === 'zone' && (
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>City Filter</InputLabel>
                  <Select
                    value={selectedCity}
                    label="City Filter"
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <MenuItem value="all">All Cities</MenuItem>
                    {cityData.map(city => (
                      <MenuItem key={city.city} value={city.city}>
                        {city.city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>

            {/* Charts */}
            <Grid container spacing={3}>
              {/* Bar Chart */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="subtitle2" mb={2}>
                  {selectedView === 'city' ? 'City' : 'Zone'} Impact Comparison
                </Typography>
                <BarChart
                  height={350}
                  series={[
                    {
                      data: getChartData().map(d => d.weight),
                      label: 'Weight (kg)',
                      color: getMetricColor('weight')
                    },
                    {
                      data: getChartData().map(d => d.co2),
                      label: 'CO₂ Avoided (kg)',
                      color: getMetricColor('co2')
                    }
                  ]}
                  xAxis={[{ 
                    data: getChartData().map(d => d.name),
                    scaleType: 'band'
                  }]}
                  margin={{ top: 10, right: 30, left: 40, bottom: 50 }}
                />
              </Grid>

              {/* Top Performers */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" mb={2}>
                  Top Performers
                </Typography>
                <Box sx={{ maxHeight: 350, overflowY: 'auto' }}>
                  {getChartData()
                    .sort((a, b) => b.weight - a.weight)
                    .slice(0, 10)
                    .map((item, index) => (
                      <Box
                        key={item.name}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 1.5,
                          mb: 1,
                          backgroundColor: index === 0 ? '#10B98110' : '#f5f5f5',
                          borderRadius: 1
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="body2"
                            fontWeight="600"
                            color={index === 0 ? '#10B981' : 'text.primary'}
                          >
                            #{index + 1}
                          </Typography>
                          <Typography variant="body2">
                            {item.name}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight="500"
                          color={index === 0 ? '#10B981' : 'text.primary'}
                        >
                          {getMetricValue(item)}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Grid>
            </Grid>

            {/* Detailed Table */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" mb={2}>
                Detailed {selectedView === 'city' ? 'City' : 'Zone'} Breakdown
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>{selectedView === 'city' ? 'City' : 'Zone'}</TableCell>
                      <TableCell align="right">Weight (kg)</TableCell>
                      <TableCell align="right">CO₂ Avoided</TableCell>
                      <TableCell align="right">Trees Saved</TableCell>
                      <TableCell align="right">Activities</TableCell>
                      <TableCell align="right">Trend</TableCell>
                      <TableCell align="right">Rank</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(selectedView === 'city' ? cityData : filteredZoneData)
                      .sort((a, b) => (selectedView === 'city' ? a.totalWasteRecycled : a.totalWasteRecycled) - (selectedView === 'city' ? b.totalWasteRecycled : b.totalWasteRecycled))
                      .map((item, index) => (
                        <TableRow key={selectedView === 'city' ? item.city : item.zone}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <MapPin size={14} color="#666" />
                              {selectedView === 'city' ? item.city : item.zone}
                              {selectedView === 'zone' && (
                                <Typography variant="caption" color="text.secondary">
                                  ({item.city})
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell align="right">{formatWeight(item.totalWasteRecycled)}</TableCell>
                          <TableCell align="right">{formatCO2(item.co2Avoided)}</TableCell>
                          <TableCell align="right">{formatTrees(item.treesSaved)}</TableCell>
                          <TableCell align="right">
                            {selectedView === 'city' 
                              ? item.pickups + item.dropoffs + (item.enterpriseActivity || 0) + (item.communityActivity || 0)
                              : item.pickups + item.dropoffs}
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                              {selectedView === 'city' ? (
                                item.monthlyTrend === 'increasing' ? (
                                  <TrendingUp size={14} color="#10B981" />
                                ) : item.monthlyTrend === 'decreasing' ? (
                                  <TrendingDown size={14} color="#EF4444" />
                                ) : null
                              ) : (
                                item.monthlyTrend === 'increasing' ? (
                                  <TrendingUp size={14} color="#10B981" />
                                ) : item.monthlyTrend === 'decreasing' ? (
                                  <TrendingDown size={14} color="#EF4444" />
                                ) : null
                              )}
                              <Chip
                                label={selectedView === 'city' ? item.monthlyTrend : item.monthlyTrend}
                                size="small"
                                color={
                                  (selectedView === 'city' ? item.monthlyTrend : item.monthlyTrend) === 'increasing'
                                    ? 'success'
                                    : (selectedView === 'city' ? item.monthlyTrend : item.monthlyTrend) === 'decreasing'
                                    ? 'error'
                                    : 'default'
                                }
                              />
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={`#${index + 1}`}
                              size="small"
                              color={index === 0 ? 'primary' : 'default'}
                              variant={index === 0 ? 'filled' : 'outlined'}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

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
                Geographic impact analysis based on verified recycling activities by location
              </Typography>
              <Tooltip title="Rankings are based on total waste recycled in the selected period">
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

export default CityZoneImpactMap;
