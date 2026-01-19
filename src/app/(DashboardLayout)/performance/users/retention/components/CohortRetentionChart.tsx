'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { 
  IconChartBar,
  IconUsers,
  IconActivity
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface CohortRetentionChartProps {
  onCohortClick?: (cohort: string) => void;
}

const CohortRetentionChart: React.FC<CohortRetentionChartProps> = ({ 
  onCohortClick 
}) => {
  // Mock cohort data - rows are cohorts by signup week, columns are weeks
  const cohortData = [
    {
      cohort: 'Week of Jan 1',
      signupCount: 245,
      retention: [100, 78, 65, 58, 52, 48, 45, 42, 40, 38, 36, 35]
    },
    {
      cohort: 'Week of Jan 8',
      signupCount: 289,
      retention: [100, 82, 70, 63, 57, 53, 49, 46, 43, 41, 39, 37]
    },
    {
      cohort: 'Week of Jan 15',
      signupCount: 312,
      retention: [100, 85, 73, 66, 60, 56, 52, 48, 45, 43, 41, 39]
    },
    {
      cohort: 'Week of Jan 22',
      signupCount: 278,
      retention: [100, 83, 71, 64, 58, 54, 50, 47, 44, 42, 40, 38]
    },
    {
      cohort: 'Week of Jan 29',
      signupCount: 295,
      retention: [100, 86, 74, 67, 61, 57, 53, 49, 46, 44, 42, 40]
    },
    {
      cohort: 'Week of Feb 5',
      signupCount: 324,
      retention: [100, 88, 76, 69, 63, 59, 55, 51, 48, 46, 44, 42]
    },
    {
      cohort: 'Week of Feb 12',
      signupCount: 301,
      retention: [100, 87, 75, 68, 62, 58, 54, 50, 47, 45, 43, 41]
    },
    {
      cohort: 'Week of Feb 19',
      signupCount: 287,
      retention: [100, 84, 72, 65, 59, 55, 51, 47, 44, 42, 40, 38]
    }
  ];

  const getRetentionColor = (percentage: number) => {
    if (percentage >= 80) return '#10b981'; // green
    if (percentage >= 60) return '#3b82f6'; // blue
    if (percentage >= 40) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getRetentionTextColor = (percentage: number) => {
    if (percentage >= 60) return 'white';
    return 'text.primary';
  };

  const weekHeaders = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11'];

  return (
    <DashboardCard title="Cohort Retention Analysis">
      <Box sx={{ width: '100%' }}>
        {/* Overview */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: 'primary.light',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IconChartBar size={24} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                User Retention Over Time
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Percentage of users who continue recycling by cohort week
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Cohort Heatmap Table */}
        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer sx={{ minWidth: 800, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>
                    Cohort Week
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center', minWidth: 80 }}>
                    Users
                  </TableCell>
                  {weekHeaders.map((week, index) => (
                    <TableCell key={index} sx={{ fontWeight: 600, textAlign: 'center', minWidth: 70 }}>
                      {week}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cohortData.map((cohort, rowIndex) => (
                  <TableRow 
                    key={rowIndex}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'grey.50' }
                    }}
                    onClick={() => onCohortClick?.(cohort.cohort)}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>
                      {cohort.cohort}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', fontWeight: 600 }}>
                      {cohort.signupCount}
                    </TableCell>
                    {cohort.retention.map((percentage, colIndex) => (
                      <TableCell 
                        key={colIndex} 
                        sx={{ 
                          textAlign: 'center',
                          bgcolor: getRetentionColor(percentage),
                          color: getRetentionTextColor(percentage),
                          fontWeight: 600,
                          borderRight: colIndex === cohort.retention.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        {percentage}%
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Color Legend */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, justifyContent: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Retention Rate:
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 20, height: 12, bgcolor: '#10b981', borderRadius: 1 }} />
            <Typography variant="caption">≥80%</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 20, height: 12, bgcolor: '#3b82f6', borderRadius: 1 }} />
            <Typography variant="caption">60-79%</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 20, height: 12, bgcolor: '#f59e0b', borderRadius: 1 }} />
            <Typography variant="caption">40-59%</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 20, height: 12, bgcolor: '#ef4444', borderRadius: 1 }} />
            <Typography variant="caption">&lt;40%</Typography>
          </Stack>
        </Stack>

        {/* Key Insights */}
        <Card sx={{ border: '1px solid', borderColor: 'info.light', mt: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="info.main">
              📊 Cohort Analysis Insights
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Retention Patterns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Week 1 retention improved from 78% to 88% (+10 points) - better onboarding
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Week 4 retention stabilized around 60% - solid mid-term engagement
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Week 12 retention at 38-42% - strong long-term user base
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Improvement Indicators
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Recent cohorts (Feb) show consistently higher retention across all periods
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Early churn reduced from 22% to 12% - better first experience
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Business Impact
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 62% 30-day retention indicates strong product-market fit
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Improving retention trends suggest sustainable growth trajectory
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            💡 Retention Optimization Strategies
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Focus on Week 1-2 onboarding to improve early retention further
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Analyze what drives 60% Week 4 retention and scale those factors
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Implement re-engagement campaigns for users at Week 8 risk point
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Continue improvements that led to recent cohort performance gains
            </Typography>
          </Stack>
        </Box>

        {/* Metrics Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom color="success.dark">
            📈 Retention Health Score
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Week 1 Retention
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                85% (Excellent)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Week 4 Retention
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                61% (Good)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Week 12 Retention
              </Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                40% (Moderate)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Overall Trend
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                Improving ↗️
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default CohortRetentionChart;
