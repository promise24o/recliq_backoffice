'use client'
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, ToggleButton, ToggleButtonGroup, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, DollarSign } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { DropoffTrend } from '../types';

interface DropoffTrendAnalysisProps {
  trends: DropoffTrend[];
}

const DropoffTrendAnalysis: React.FC<DropoffTrendAnalysisProps> = ({ trends }) => {
  const [viewMode, setViewMode] = useState<'volume' | 'comparison' | 'weight' | 'payouts'>('volume');
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d'>('7d');

  // Mock chart visualization - in real app, integrate with chart library
  const MockChart = ({ type, data }: { type: 'line' | 'bar' | 'pie'; data: any[] }) => (
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
        {type === 'line' && <TrendingUp size={48} color="#3b82f6" />}
        {type === 'bar' && <BarChart3 size={48} color="#10b981" />}
        {type === 'pie' && <PieChart size={48} color="#f59e0b" />}
        <Typography variant="body2" color="text.secondary">
          {type === 'line' ? 'Drop-off Volume Over Time' : 
           type === 'bar' ? 'Drop-off vs Pickup Comparison' : 
           'Distribution by Category'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Chart visualization would be rendered here
        </Typography>
      </Stack>
    </Box>
  );

  // Calculate metrics
  const totalDropoffs = trends.reduce((sum, trend) => sum + trend.dropoffs, 0);
  const totalPickups = trends.reduce((sum, trend) => sum + trend.pickups, 0);
  const avgWeightPerDropoff = trends.reduce((sum, trend) => sum + trend.weight, 0) / trends.length;
  const totalPayouts = trends.reduce((sum, trend) => sum + trend.userPayouts, 0);
  
  const dropoffToPickupRatio = ((totalDropoffs / totalPickups) * 100).toFixed(1);
  const trendDirection = trends[trends.length - 1]?.dropoffs > trends[0]?.dropoffs ? 'up' : 'down';

  // Mock breakdown data
  const wasteTypeBreakdown = [
    { type: 'Plastic', value: 35, color: '#3b82f6' },
    { type: 'Paper', value: 25, color: '#10b981' },
    { type: 'Metal', value: 20, color: '#f59e0b' },
    { type: 'E-waste', value: 12, color: '#ef4444' },
    { type: 'Mixed', value: 8, color: '#8b5cf6' }
  ];

  const cityBreakdown = [
    { city: 'Lagos', value: 45, color: '#3b82f6' },
    { city: 'Abuja', value: 25, color: '#10b981' },
    { city: 'Port Harcourt', value: 20, color: '#f59e0b' },
    { city: 'Kano', value: 10, color: '#ef4444' }
  ];

  const renderContent = () => {
    switch (viewMode) {
      case 'volume':
        return (
          <Stack spacing={3}>
            <Stack direction="row" spacing={3} flexWrap="wrap">
              <Box flex={1} minWidth={200}>
                <Typography variant="h4" fontWeight="600" color="primary.main">
                  {totalDropoffs.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Drop-offs
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                  {trendDirection === 'up' ? (
                    <TrendingUp size={16} color="#10b981" />
                  ) : (
                    <TrendingDown size={16} color="#ef4444" />
                  )}
                  <Typography variant="caption" color={trendDirection === 'up' ? '#10b981' : '#ef4444'}>
                    {trendDirection === 'up' ? '+' : '-'}{Math.abs(((trends[trends.length - 1]?.dropoffs - trends[0]?.dropoffs) / trends[0]?.dropoffs * 100)).toFixed(1)}% vs last period
                  </Typography>
                </Stack>
              </Box>
              
              <Box flex={1} minWidth={200}>
                <Typography variant="h4" fontWeight="600" color="success.main">
                  {dropoffToPickupRatio}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Drop-off vs Pickup Ratio
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {totalDropoffs} drop-offs vs {totalPickups} pickups
                </Typography>
              </Box>
            </Stack>
            
            <MockChart type="line" data={trends} />
            
            <Box>
              <Typography variant="h6" mb={2}>Daily Breakdown</Typography>
              <Stack spacing={1}>
                {trends.slice(-5).reverse().map((trend, index) => (
                  <Stack key={trend.date} direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" sx={{ minWidth: 100 }}>
                      {new Date(trend.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </Typography>
                    <Box flex={1} sx={{ bgcolor: '#e2e8f0', borderRadius: 1, height: 8, position: 'relative' }}>
                      <Box
                        sx={{
                          bgcolor: '#3b82f6',
                          borderRadius: 1,
                          height: '100%',
                          width: `${(trend.dropoffs / Math.max(...trends.map(t => t.dropoffs))) * 100}%`
                        }}
                      />
                    </Box>
                    <Typography variant="body2" fontWeight="500" sx={{ minWidth: 50 }}>
                      {trend.dropoffs}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        );
        
      case 'comparison':
        return (
          <Stack spacing={3}>
            <MockChart type="bar" data={trends} />
            
            <Box>
              <Typography variant="h6" mb={2}>Performance Comparison</Typography>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">Drop-offs</Typography>
                  <Typography variant="h6" color="primary.main">{totalDropoffs.toLocaleString()}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">Pickups</Typography>
                  <Typography variant="h6" color="success.main">{totalPickups.toLocaleString()}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">Cost Efficiency</Typography>
                  <Chip 
                    label={`${((totalPickups - totalDropoffs) / totalPickups * 100).toFixed(1)}% savings`}
                    size="small"
                    color="success"
                  />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        );
        
      case 'weight':
        return (
          <Stack spacing={3}>
            <Stack direction="row" spacing={3} flexWrap="wrap">
              <Box flex={1} minWidth={200}>
                <Typography variant="h4" fontWeight="600" color="info.main">
                  {avgWeightPerDropoff.toFixed(1)} kg
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg Weight per Drop-off
                </Typography>
              </Box>
              
              <Box flex={1} minWidth={200}>
                <Typography variant="h4" fontWeight="600" color="warning.main">
                  {trends.reduce((sum, trend) => sum + trend.weight, 0).toLocaleString()} kg
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Weight Processed
                </Typography>
              </Box>
            </Stack>
            
            <Box>
              <Typography variant="h6" mb={2}>Waste Type Distribution</Typography>
              <Stack spacing={2}>
                {wasteTypeBreakdown.map((item) => (
                  <Stack key={item.type} direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" sx={{ minWidth: 80 }}>
                      {item.type}
                    </Typography>
                    <Box flex={1} sx={{ bgcolor: '#e2e8f0', borderRadius: 1, height: 8, position: 'relative' }}>
                      <Box
                        sx={{
                          bgcolor: item.color,
                          borderRadius: 1,
                          height: '100%',
                          width: `${item.value}%`
                        }}
                      />
                    </Box>
                    <Typography variant="body2" fontWeight="500" sx={{ minWidth: 40 }}>
                      {item.value}%
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        );
        
      case 'payouts':
        return (
          <Stack spacing={3}>
            <Stack direction="row" spacing={3} flexWrap="wrap">
              <Box flex={1} minWidth={200}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <DollarSign size={24} color="#10b981" />
                  <Typography variant="h4" fontWeight="600" color="success.main">
                    ₦{totalPayouts.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Total User Payouts
                </Typography>
              </Box>
              
              <Box flex={1} minWidth={200}>
                <Typography variant="h4" fontWeight="600" color="primary.main">
                  ₦{(totalPayouts / totalDropoffs).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg Payout per Drop-off
                </Typography>
              </Box>
            </Stack>
            
            <Box>
              <Typography variant="h6" mb={2}>Payout Trends</Typography>
              <Stack spacing={1}>
                {trends.slice(-5).reverse().map((trend, index) => (
                  <Stack key={trend.date} direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" sx={{ minWidth: 100 }}>
                      {new Date(trend.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </Typography>
                    <Box flex={1} sx={{ bgcolor: '#e2e8f0', borderRadius: 1, height: 8, position: 'relative' }}>
                      <Box
                        sx={{
                          bgcolor: '#10b981',
                          borderRadius: 1,
                          height: '100%',
                          width: `${(trend.userPayouts / Math.max(...trends.map(t => t.userPayouts))) * 100}%`
                        }}
                      />
                    </Box>
                    <Typography variant="body2" fontWeight="500" sx={{ minWidth: 80 }}>
                      ₦{trend.userPayouts.toLocaleString()}
                    </Typography>
                  </Stack>
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
    <DashboardCard title="Drop-off Trend & Comparison Analysis">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📊 Performance analytics • Compare drop-off adoption vs pickups
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
            <ToggleButton value="volume">
              <Activity size={16} style={{ marginRight: 4 }} />
              Volume
            </ToggleButton>
            <ToggleButton value="comparison">
              <BarChart3 size={16} style={{ marginRight: 4 }} />
              Comparison
            </ToggleButton>
            <ToggleButton value="weight">
              <TrendingUp size={16} style={{ marginRight: 4 }} />
              Weight
            </ToggleButton>
            <ToggleButton value="payouts">
              <DollarSign size={16} style={{ marginRight: 4 }} />
              Payouts
            </ToggleButton>
          </ToggleButtonGroup>
          
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={(_, value) => value && setTimeRange(value)}
            size="small"
          >
            <ToggleButton value="7d">7D</ToggleButton>
            <ToggleButton value="14d">14D</ToggleButton>
            <ToggleButton value="30d">30D</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        
        {renderContent()}
      </CardContent>
    </DashboardCard>
  );
};

export default DropoffTrendAnalysis;
