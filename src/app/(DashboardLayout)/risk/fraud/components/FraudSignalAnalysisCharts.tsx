'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Tabs,
  Tab,
  Chip,
  Grid,
} from '@mui/material';
import type { FraudTrendData, FraudTypeDistribution, SeverityDistribution } from '../types';
import { formatCurrency, getFraudTypeColor, getFraudTypeLabel, getSeverityColor, getSeverityLabel } from '../mockData';

interface FraudSignalAnalysisChartsProps {
  trendData: FraudTrendData[];
  typeDistribution: FraudTypeDistribution[];
  severityDistribution: SeverityDistribution[];
}

const FraudSignalAnalysisCharts: React.FC<FraudSignalAnalysisChartsProps> = ({
  trendData,
  typeDistribution,
  severityDistribution
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const maxTrend = Math.max(
    ...trendData.map(d => d.medium + d.high + d.critical)
  );

  const totalSeverity = severityDistribution.reduce((sum, s) => sum + s.count, 0);

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h6" fontWeight="600">
            Fraud Signal & Severity Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Detection patterns, fraud types, and severity distribution
          </Typography>
        </Box>
      </Stack>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Flags Over Time" />
        <Tab label="Fraud Types" />
        <Tab label="Severity Distribution" />
      </Tabs>

      {/* Flags Over Time */}
      {activeTab === 0 && (
        <Box>
          <Stack direction="row" spacing={3} mb={3}>
            <Chip label="Medium" size="small" sx={{ bgcolor: getSeverityColor('medium') + '20', color: getSeverityColor('medium') }} />
            <Chip label="High" size="small" sx={{ bgcolor: getSeverityColor('high') + '20', color: getSeverityColor('high') }} />
            <Chip label="Critical" size="small" sx={{ bgcolor: getSeverityColor('critical') + '20', color: getSeverityColor('critical') }} />
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 250, px: 1 }}>
            {trendData.map((item, index) => {
              const total = item.medium + item.high + item.critical;
              const mediumHeight = maxTrend > 0 ? (item.medium / maxTrend) * 200 : 0;
              const highHeight = maxTrend > 0 ? (item.high / maxTrend) * 200 : 0;
              const criticalHeight = maxTrend > 0 ? (item.critical / maxTrend) * 200 : 0;
              return (
                <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="caption" fontWeight="600" mb={1} display="block">
                    {total}
                  </Typography>
                  <Stack spacing={0} sx={{ alignItems: 'center' }}>
                    {item.critical > 0 && (
                      <Box sx={{ width: '60%', height: criticalHeight, bgcolor: getSeverityColor('critical'), borderRadius: '4px 4px 0 0', minHeight: 4 }} />
                    )}
                    {item.high > 0 && (
                      <Box sx={{ width: '60%', height: highHeight, bgcolor: getSeverityColor('high'), minHeight: 4 }} />
                    )}
                    {item.medium > 0 && (
                      <Box sx={{ width: '60%', height: mediumHeight, bgcolor: getSeverityColor('medium'), borderRadius: item.high === 0 && item.critical === 0 ? '4px 4px 0 0' : 0, minHeight: 4 }} />
                    )}
                  </Stack>
                  <Typography variant="caption" color="text.secondary" mt={1} display="block" noWrap>
                    {item.month.split(' ')[0]}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* Fraud Types Breakdown */}
      {activeTab === 1 && (
        <Box>
          <Stack spacing={2}>
            {typeDistribution.map((item, index) => (
              <Box key={index}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getFraudTypeColor(item.type) }} />
                    <Typography variant="body2" fontWeight="500">
                      {getFraudTypeLabel(item.type)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {item.count} flags
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                      {formatCurrency(item.exposure)}
                    </Typography>
                  </Stack>
                </Stack>
                <Box sx={{ width: '100%', height: 8, bgcolor: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      width: `${item.percentage}%`,
                      height: '100%',
                      bgcolor: getFraudTypeColor(item.type),
                      borderRadius: 4,
                      transition: 'width 0.3s ease'
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Severity Distribution */}
      {activeTab === 2 && (
        <Box>
          <Grid container spacing={3}>
            {severityDistribution.map((item, index) => (
              <Grid key={index} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: getSeverityColor(item.severity) + '40',
                    borderRadius: 2,
                    bgcolor: getSeverityColor(item.severity) + '08',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h3" fontWeight="700" color={getSeverityColor(item.severity)}>
                    {item.count}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="600" mt={1}>
                    {getSeverityLabel(item.severity)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.percentage}% of total flags
                  </Typography>
                  <Box sx={{ mt: 2, width: '100%', height: 6, bgcolor: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                    <Box
                      sx={{
                        width: `${item.percentage}%`,
                        height: '100%',
                        bgcolor: getSeverityColor(item.severity),
                        borderRadius: 3
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Total Fraud Flags
              </Typography>
              <Typography variant="h6" fontWeight="700">
                {totalSeverity}
              </Typography>
            </Stack>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default FraudSignalAnalysisCharts;
