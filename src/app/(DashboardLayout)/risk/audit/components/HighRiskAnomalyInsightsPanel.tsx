'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  TrendingUp,
  AlertTriangle,
  Clock,
  User,
  Shield,
  Activity,
} from 'lucide-react';
import type { HighRiskTrendData, AdminActivityData, OffHoursActivity, OverridePattern } from '../types';

interface HighRiskAnomalyInsightsPanelProps {
  highRiskTrend: HighRiskTrendData[];
  adminActivity: AdminActivityData[];
  offHoursActivity: OffHoursActivity[];
  overridePatterns: OverridePattern[];
}

const HighRiskAnomalyInsightsPanel: React.FC<HighRiskAnomalyInsightsPanelProps> = ({
  highRiskTrend,
  adminActivity,
  offHoursActivity,
  overridePatterns
}) => {
  const maxTrend = Math.max(...highRiskTrend.map(d => d.high + d.critical));
  const maxHourly = Math.max(...offHoursActivity.map(d => d.count));
  const totalOffHours = offHoursActivity.filter(h => h.isOffHours).reduce((sum, h) => sum + h.count, 0);
  const totalBusinessHours = offHoursActivity.filter(h => !h.isOffHours).reduce((sum, h) => sum + h.count, 0);

  return (
    <Paper sx={{ p: 3 }}>
      <Box mb={3}>
        <Typography variant="h6" fontWeight="600">
          High-Risk & Anomaly Insights
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Privilege misuse detection, activity concentration, and override monitoring
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* High-Risk Actions Over Time */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight="600" mb={2}>
              High-Risk Actions (7 Days)
            </Typography>
            <Stack direction="row" spacing={1} mb={2}>
              <Chip label="High" size="small" sx={{ bgcolor: '#EF444420', color: '#EF4444', fontSize: '0.65rem' }} />
              <Chip label="Critical" size="small" sx={{ bgcolor: '#7C3AED20', color: '#7C3AED', fontSize: '0.65rem' }} />
            </Stack>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 140 }}>
              {highRiskTrend.map((item, index) => {
                const highHeight = maxTrend > 0 ? (item.high / maxTrend) * 110 : 0;
                const criticalHeight = maxTrend > 0 ? (item.critical / maxTrend) * 110 : 0;
                return (
                  <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="caption" fontWeight="600" display="block" mb={0.5}>
                      {item.high + item.critical}
                    </Typography>
                    <Stack spacing={0} sx={{ alignItems: 'center' }}>
                      {item.critical > 0 && (
                        <Box sx={{ width: '70%', height: criticalHeight, bgcolor: '#7C3AED', borderRadius: '3px 3px 0 0', minHeight: 3 }} />
                      )}
                      {item.high > 0 && (
                        <Box sx={{ width: '70%', height: highHeight, bgcolor: '#EF4444', borderRadius: item.critical === 0 ? '3px 3px 0 0' : 0, minHeight: 3 }} />
                      )}
                    </Stack>
                    <Typography variant="caption" color="text.secondary" display="block" mt={0.5} fontSize="0.6rem">
                      {item.date.split(' ')[1]}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Grid>

        {/* Off-Hours Activity */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight="600" mb={2}>
              Activity by Hour (24h)
            </Typography>
            <Stack direction="row" spacing={1} mb={2}>
              <Chip label="Business Hours" size="small" sx={{ bgcolor: '#3B82F620', color: '#3B82F6', fontSize: '0.65rem' }} />
              <Chip label={`Off-Hours (${totalOffHours})`} size="small" sx={{ bgcolor: '#EF444420', color: '#EF4444', fontSize: '0.65rem' }} />
            </Stack>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.25, height: 140 }}>
              {offHoursActivity.map((item, index) => {
                const barHeight = maxHourly > 0 ? (item.count / maxHourly) * 110 : 0;
                return (
                  <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: Math.max(barHeight, 2),
                        bgcolor: item.isOffHours ? '#EF4444' : '#3B82F6',
                        borderRadius: '2px 2px 0 0',
                        opacity: item.count === 0 ? 0.2 : 1
                      }}
                    />
                    {index % 4 === 0 && (
                      <Typography variant="caption" color="text.secondary" display="block" mt={0.5} fontSize="0.55rem">
                        {item.hour}h
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Grid>

        {/* Admin Activity Concentration */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight="600" mb={2}>
              Admin Activity Concentration
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Admin</TableCell>
                    <TableCell align="center">Actions</TableCell>
                    <TableCell align="center">High-Risk</TableCell>
                    <TableCell>Last Active</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminActivity.map((admin) => (
                    <TableRow key={admin.adminName} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="500">
                          {admin.adminName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" fontWeight="600">
                          {admin.actionCount}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={admin.highRiskCount}
                          size="small"
                          sx={{
                            bgcolor: admin.highRiskCount > 5 ? '#EF444415' : '#F59E0B15',
                            color: admin.highRiskCount > 5 ? '#EF4444' : '#F59E0B',
                            fontWeight: 700,
                            fontSize: '0.75rem'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(admin.lastActive).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        {/* Override Patterns */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <AlertTriangle size={16} color="#EF4444" />
              <Typography variant="subtitle2" fontWeight="600">
                Repeated Overrides
              </Typography>
            </Stack>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Admin</TableCell>
                    <TableCell align="center">Overrides</TableCell>
                    <TableCell>Entity Types</TableCell>
                    <TableCell>Last Override</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {overridePatterns.map((pattern) => (
                    <TableRow key={pattern.adminName} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="500">
                          {pattern.adminName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={pattern.overrideCount}
                          size="small"
                          color={pattern.overrideCount >= 5 ? 'error' : 'warning'}
                          variant="outlined"
                          sx={{ fontWeight: 700 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} flexWrap="wrap">
                          {pattern.entityTypes.map((et) => (
                            <Chip key={et} label={et} size="small" sx={{ fontSize: '0.6rem', height: 18 }} />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(pattern.lastOverride).toLocaleDateString('en-NG')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HighRiskAnomalyInsightsPanel;
