'use client'
import React, { useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup, Stack, Grid, Card, CardContent } from '@mui/material';
import { BarChart3, LineChart, PieChart, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { DisputeTrend } from '../types';

interface DisputeTrendRiskAnalysisProps {
  trends: DisputeTrend[];
}

const DisputeTrendRiskAnalysis: React.FC<DisputeTrendRiskAnalysisProps> = ({ trends }) => {
  const [viewMode, setViewMode] = useState<'timeline' | 'types' | 'breakdown'>('timeline');
  const [breakdownType, setBreakdownType] = useState<'city' | 'agent' | 'type' | 'match'>('city');

  // Mock chart visualization - in real app, integrate with chart library
  const MockChart = ({ type, title }: { type: 'line' | 'bar' | 'pie'; title: string }) => (
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
        {type === 'line' && <LineChart size={48} color="#3b82f6" />}
        {type === 'bar' && <BarChart3 size={48} color="#10b981" />}
        {type === 'pie' && <PieChart size={48} color="#f59e0b" />}
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
  const totalDisputes = trends.reduce((sum, trend) => sum + trend.total, 0);
  const totalResolved = trends.reduce((sum, trend) => sum + trend.resolved, 0);
  const totalEscalated = trends.reduce((sum, trend) => sum + trend.escalated, 0);
  const avgResolutionTime = trends.reduce((sum, trend) => sum + trend.avgResolutionTime, 0) / trends.length;

  // Mock breakdown data
  const getBreakdownData = () => {
    switch (breakdownType) {
      case 'city':
        return [
          { label: 'Lagos', value: 45, count: 67, color: '#3b82f6' },
          { label: 'Abuja', value: 28, count: 34, color: '#10b981' },
          { label: 'Port Harcourt', value: 18, count: 23, color: '#f59e0b' },
          { label: 'Kano', value: 12, count: 15, color: '#8b5cf6' }
        ];
      case 'agent':
        return [
          { label: 'Samuel Kamau', value: 8, count: 45, color: '#ef4444' },
          { label: 'Grace Okafor', value: 5, count: 38, color: '#f59e0b' },
          { label: 'Ahmed Bello', value: 3, count: 28, color: '#10b981' },
          { label: 'Fatima Ibrahim', value: 2, count: 22, color: '#3b82f6' }
        ];
      case 'type':
        return [
          { label: 'Weight Disagreement', value: 42, count: 67, color: '#06b6d4' },
          { label: 'Payout Mismatch', value: 28, count: 34, color: '#f97316' },
          { label: 'Agent No-Show', value: 15, count: 18, color: '#ef4444' },
          { label: 'Missing/Damaged', value: 10, count: 12, color: '#8b5cf6' }
        ];
      case 'match':
        return [
          { label: 'Scheduled', value: 55, count: 89, color: '#3b82f6' },
          { label: 'Immediate', value: 32, count: 45, color: '#10b981' },
          { label: 'Express', value: 18, count: 23, color: '#f59e0b' }
        ];
      default:
        return [];
    }
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'timeline':
        return (
          <Stack spacing={3}>
            <MockChart type="line" title="Disputes Over Time" />
            
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary.main">
                      {totalDisputes}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Disputes
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="success.main">
                      {totalResolved}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Resolved
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="error.main">
                      {totalEscalated}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Escalated
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="warning.main">
                      {avgResolutionTime.toFixed(1)}h
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Resolution
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* SLA Compliance */}
            <Box>
              <Typography variant="h6" mb={2}>SLA Compliance</Typography>
              <Stack spacing={1}>
                {trends.map((trend) => {
                  const isCompliant = trend.avgResolutionTime <= 24; // 24-hour SLA
                  return (
                    <Stack key={trend.date} direction="row" spacing={2} alignItems="center">
                      <Typography variant="body2" sx={{ minWidth: 100 }}>
                        {new Date(trend.date).toLocaleDateString()}
                      </Typography>
                      <Box flex={1} sx={{ bgcolor: '#e2e8f0', borderRadius: 1, height: 8, position: 'relative' }}>
                        <Box
                          sx={{
                            bgcolor: isCompliant ? '#10b981' : '#ef4444',
                            borderRadius: 1,
                            height: '100%',
                            width: `${Math.min((trend.avgResolutionTime / 48) * 100, 100)}%`
                          }}
                        />
                      </Box>
                      <Typography variant="body2" fontWeight="500" sx={{ minWidth: 80 }}>
                        {trend.avgResolutionTime.toFixed(1)}h
                      </Typography>
                      {isCompliant ? (
                        <TrendingUp size={16} color="#10b981" />
                      ) : (
                        <TrendingDown size={16} color="#ef4444" />
                      )}
                    </Stack>
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        );
        
      case 'types':
        return (
          <Stack spacing={3}>
            <MockChart type="pie" title="Dispute Types Distribution" />
            
            <Box>
              <Typography variant="h6" mb={2}>Dispute Type Analysis</Typography>
              <Stack spacing={2}>
                {[
                  { type: 'Weight Disagreement', count: 67, percentage: 42, trend: 'up' },
                  { type: 'Payout Mismatch', count: 34, percentage: 28, trend: 'stable' },
                  { type: 'Agent No-Show', count: 18, percentage: 15, trend: 'down' },
                  { type: 'Missing/Damaged', count: 12, percentage: 10, trend: 'stable' },
                  { type: 'Suspicious Behavior', count: 8, percentage: 5, trend: 'up' }
                ].map((item) => (
                  <Card key={item.type}>
                    <CardContent sx={{ py: 2 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box flex={1}>
                          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <Typography variant="body1" fontWeight="500">
                              {item.type}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ({item.count} cases)
                            </Typography>
                          </Stack>
                          <Box sx={{ bgcolor: '#e2e8f0', borderRadius: 1, height: 8, position: 'relative' }}>
                            <Box
                              sx={{
                                bgcolor: item.trend === 'up' ? '#ef4444' : item.trend === 'down' ? '#10b981' : '#f59e0b',
                                borderRadius: 1,
                                height: '100%',
                                width: `${item.percentage}%`
                              }}
                            />
                          </Box>
                        </Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="h6" fontWeight="600">
                            {item.percentage}%
                          </Typography>
                          {item.trend === 'up' ? (
                            <TrendingUp size={16} color="#ef4444" />
                          ) : item.trend === 'down' ? (
                            <TrendingDown size={16} color="#10b981" />
                          ) : (
                            <Minus size={16} color="#f59e0b" />
                          )}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
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
                <ToggleButton value="city">By City</ToggleButton>
                <ToggleButton value="agent">By Agent</ToggleButton>
                <ToggleButton value="type">By Type</ToggleButton>
                <ToggleButton value="match">By Match</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            
            <MockChart type="bar" title={`${breakdownType.charAt(0).toUpperCase() + breakdownType.slice(1)} Dispute Breakdown`} />
            
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
                              ({item.count} disputes)
                            </Typography>
                          </Stack>
                          <Box sx={{ bgcolor: '#e2e8f0', borderRadius: 1, height: 8, position: 'relative' }}>
                            <Box
                              sx={{
                                bgcolor: item.color,
                                borderRadius: 1,
                                height: '100%',
                                width: `${Math.min((item.value / 50) * 100, 100)}%`
                              }}
                            />
                          </Box>
                        </Box>
                        <Typography variant="h6" fontWeight="600" color={item.color}>
                          {item.value}
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
    <DashboardCard title="Dispute Trend & Risk Analysis">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📈 Improve UX clarity • Train agents • Adjust policies • Detect abuse patterns
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
            <ToggleButton value="timeline">
              <LineChart size={16} style={{ marginRight: 4 }} />
              Timeline
            </ToggleButton>
            <ToggleButton value="types">
              <PieChart size={16} style={{ marginRight: 4 }} />
              Types
            </ToggleButton>
            <ToggleButton value="breakdown">
              <BarChart3 size={16} style={{ marginRight: 4 }} />
              Breakdown
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        
        {renderContent()}
      </CardContent>
    </DashboardCard>
  );
};

export default DisputeTrendRiskAnalysis;
