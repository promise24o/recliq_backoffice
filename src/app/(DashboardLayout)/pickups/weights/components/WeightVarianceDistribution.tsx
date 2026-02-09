'use client'
import React, { useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup, Stack, Grid, Card, CardContent } from '@mui/material';
import { BarChart3, ScatterChart, TrendingUp, Filter } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { WeightVarianceData } from '../types';

interface WeightVarianceDistributionProps {
  varianceData: WeightVarianceData[];
}

const WeightVarianceDistribution: React.FC<WeightVarianceDistributionProps> = ({ varianceData }) => {
  const [viewMode, setViewMode] = useState<'histogram' | 'scatter' | 'breakdown'>('histogram');
  const [breakdownType, setBreakdownType] = useState<'agent' | 'waste' | 'type' | 'location'>('agent');

  // Mock chart visualization - in real app, integrate with chart library
  const MockChart = ({ type, title }: { type: 'histogram' | 'scatter' | 'bar'; title: string }) => (
    <Box
      sx={{
        height: 300,
        bgcolor: '#f8fafc',
        border: '2px dashed #e2e8f0',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <Stack alignItems="center" spacing={2}>
        {type === 'histogram' && <BarChart3 size={48} color="#3b82f6" />}
        {type === 'scatter' && <ScatterChart size={48} color="#10b981" />}
        {type === 'bar' && <TrendingUp size={48} color="#f59e0b" />}
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Chart visualization would be rendered here
        </Typography>
      </Stack>
    </Box>
  );

  // Calculate statistics
  const avgVariance = varianceData.reduce((sum, data) => sum + data.variance, 0) / varianceData.length;
  const maxVariance = Math.max(...varianceData.map(d => Math.abs(d.variance)));
  const minVariance = Math.min(...varianceData.map(d => Math.abs(d.variance)));

  // Group data for breakdown
  const getBreakdownData = () => {
    switch (breakdownType) {
      case 'agent':
        return varianceData.map(d => ({
          label: d.agentName,
          value: Math.abs(d.variance),
          count: d.count,
          color: d.variance > 15 ? '#ef4444' : d.variance > 8 ? '#f59e0b' : '#10b981'
        }));
      case 'waste':
        const wasteTypes = varianceData.reduce((acc, d) => {
          const existing = acc.find(item => item.label === d.wasteType);
          if (existing) {
            existing.value += Math.abs(d.variance);
            existing.count += 1;
          } else {
            acc.push({
              label: d.wasteType.replace('_', ' ').toUpperCase(),
              value: Math.abs(d.variance),
              count: 1,
              color: '#3b82f6'
            });
          }
          return acc;
        }, [] as any[]);
        return wasteTypes;
      case 'type':
        return [
          { label: 'Pickup', value: 12.3, count: 156, color: '#3b82f6' },
          { label: 'Drop-off', value: 24.7, count: 89, color: '#10b981' }
        ];
      case 'location':
        const locations = varianceData.reduce((acc, d) => {
          const existing = acc.find(item => item.label === d.city);
          if (existing) {
            existing.value += Math.abs(d.variance);
            existing.count += 1;
          } else {
            acc.push({
              label: d.city,
              value: Math.abs(d.variance),
              count: 1,
              color: '#8b5cf6'
            });
          }
          return acc;
        }, [] as any[]);
        return locations;
      default:
        return [];
    }
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'histogram':
        return (
          <Stack spacing={3}>
            <MockChart type="histogram" title="Weight Variance Distribution (%)" />
            
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary.main">
                      {avgVariance.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Variance
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="error.main">
                      {maxVariance.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Max Variance
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="success.main">
                      {minVariance.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Min Variance
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        );
        
      case 'scatter':
        return (
          <Stack spacing={3}>
            <MockChart type="scatter" title="Estimated vs Final Weight Scatter Plot" />
            
            <Box>
              <Typography variant="h6" mb={2}>Variance Analysis</Typography>
              <Stack spacing={1}>
                {varianceData.slice(0, 5).map((data) => (
                  <Stack key={data.agentId} direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" sx={{ minWidth: 120 }}>
                      {data.agentName}
                    </Typography>
                    <Box flex={1} sx={{ bgcolor: '#e2e8f0', borderRadius: 1, height: 8, position: 'relative' }}>
                      <Box
                        sx={{
                          bgcolor: Math.abs(data.variance) > 15 ? '#ef4444' : Math.abs(data.variance) > 8 ? '#f59e0b' : '#10b981',
                          borderRadius: 1,
                          height: '100%',
                          width: `${(Math.abs(data.variance) / maxVariance) * 100}%`
                        }}
                      />
                    </Box>
                    <Typography variant="body2" fontWeight="500" sx={{ minWidth: 60 }}>
                      {data.variance > 0 ? '+' : ''}{data.variance.toFixed(1)}%
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        );
        
      case 'breakdown':
        const breakdownData = getBreakdownData();
        return (
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <ToggleButtonGroup
                value={breakdownType}
                exclusive
                onChange={(_, value) => value && setBreakdownType(value)}
                size="small"
              >
                <ToggleButton value="agent">By Agent</ToggleButton>
                <ToggleButton value="waste">By Waste Type</ToggleButton>
                <ToggleButton value="type">By Type</ToggleButton>
                <ToggleButton value="location">By Location</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            
            <MockChart type="bar" title={`${breakdownType.charAt(0).toUpperCase() + breakdownType.slice(1)} Variance Breakdown`} />
            
            <Box>
              <Typography variant="h6" mb={2}>
                {breakdownType.charAt(0).toUpperCase() + breakdownType.slice(1)} Performance
              </Typography>
              <Stack spacing={2}>
                {breakdownData.map((item, index) => (
                  <Card key={index}>
                    <CardContent sx={{ py: 2 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box flex={1}>
                          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <Typography variant="body1" fontWeight="500">
                              {item.label}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ({item.count} records)
                            </Typography>
                          </Stack>
                          <Box sx={{ bgcolor: '#e2e8f0', borderRadius: 1, height: 8, position: 'relative' }}>
                            <Box
                              sx={{
                                bgcolor: item.color,
                                borderRadius: 1,
                                height: '100%',
                                width: `${Math.min((item.value / maxVariance) * 100, 100)}%`
                              }}
                            />
                          </Box>
                        </Box>
                        <Typography variant="h6" fontWeight="600" color={item.color}>
                          {item.value.toFixed(1)}%
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Stack>
        );
        
      default:
        return null;
    }
  };

  return (
    <DashboardCard title="Weight Variance Distribution">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📊 Detect outliers • Adjust estimation UI • Train agents and users
          </Typography>
        </Box>
        
        {/* Controls */}
        <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, value) => value && setViewMode(value)}
            size="small"
          >
            <ToggleButton value="histogram">
              <BarChart3 size={16} style={{ marginRight: 4 }} />
              Histogram
            </ToggleButton>
            <ToggleButton value="scatter">
              <ScatterChart size={16} style={{ marginRight: 4 }} />
              Scatter Plot
            </ToggleButton>
            <ToggleButton value="breakdown">
              <Filter size={16} style={{ marginRight: 4 }} />
              Breakdown
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        
        {renderContent()}
      </CardContent>
    </DashboardCard>
  );
};

export default WeightVarianceDistribution;
