'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
} from 'lucide-react';
import type { SeverityTrendData, ExposureTrendData, CategoryDistribution } from '../types';
import { formatCurrency, getCategoryColor, getCategoryLabel, getSeverityColor } from '../mockData';

interface RiskSeverityTrendChartsProps {
  severityData: SeverityTrendData[];
  exposureData: ExposureTrendData[];
  categoryData: CategoryDistribution[];
}

const RiskSeverityTrendCharts: React.FC<RiskSeverityTrendChartsProps> = ({
  severityData,
  exposureData,
  categoryData
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const maxSeverity = Math.max(
    ...severityData.map(d => d.medium + d.high + d.critical)
  );

  const maxExposure = Math.max(
    ...exposureData.map(d => Math.max(d.exposure, d.recovered))
  );

  const totalCategoryCount = categoryData.reduce((sum, c) => sum + c.count, 0);

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h6" fontWeight="600">
            Risk Severity & Trend Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dispute patterns and financial exposure over time
          </Typography>
        </Box>
      </Stack>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Severity Trend" />
        <Tab label="Financial Exposure" />
        <Tab label="Category Distribution" />
      </Tabs>

      {/* Severity Trend */}
      {activeTab === 0 && (
        <Box>
          <Stack direction="row" spacing={3} mb={3}>
            <Chip label="Medium" size="small" sx={{ bgcolor: getSeverityColor('medium') + '20', color: getSeverityColor('medium') }} />
            <Chip label="High" size="small" sx={{ bgcolor: getSeverityColor('high') + '20', color: getSeverityColor('high') }} />
            <Chip label="Critical" size="small" sx={{ bgcolor: getSeverityColor('critical') + '20', color: getSeverityColor('critical') }} />
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 250, px: 1 }}>
            {severityData.map((item, index) => {
              const total = item.medium + item.high + item.critical;
              const mediumHeight = maxSeverity > 0 ? (item.medium / maxSeverity) * 200 : 0;
              const highHeight = maxSeverity > 0 ? (item.high / maxSeverity) * 200 : 0;
              const criticalHeight = maxSeverity > 0 ? (item.critical / maxSeverity) * 200 : 0;
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

      {/* Financial Exposure */}
      {activeTab === 1 && (
        <Box>
          <Stack direction="row" spacing={3} mb={3}>
            <Chip label="Exposure" size="small" sx={{ bgcolor: '#EF444420', color: '#EF4444' }} />
            <Chip label="Recovered" size="small" sx={{ bgcolor: '#10B98120', color: '#10B981' }} />
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 250, px: 1 }}>
            {exposureData.map((item, index) => {
              const exposureHeight = maxExposure > 0 ? (item.exposure / maxExposure) * 200 : 0;
              const recoveredHeight = maxExposure > 0 ? (item.recovered / maxExposure) * 200 : 0;
              return (
                <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="caption" fontWeight="600" mb={1} display="block" noWrap>
                    {formatCurrency(item.exposure)}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center' }}>
                    <Box sx={{ width: '40%', height: exposureHeight, bgcolor: '#EF4444', borderRadius: '4px 4px 0 0', minHeight: 4 }} />
                    <Box sx={{ width: '40%', height: recoveredHeight, bgcolor: '#10B981', borderRadius: '4px 4px 0 0', minHeight: 4 }} />
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

      {/* Category Distribution */}
      {activeTab === 2 && (
        <Box>
          <Stack spacing={2}>
            {categoryData.map((item, index) => (
              <Box key={index}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getCategoryColor(item.category) }} />
                    <Typography variant="body2" fontWeight="500">
                      {getCategoryLabel(item.category)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {item.count} cases
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
                      bgcolor: getCategoryColor(item.category),
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
    </Paper>
  );
};

export default RiskSeverityTrendCharts;
