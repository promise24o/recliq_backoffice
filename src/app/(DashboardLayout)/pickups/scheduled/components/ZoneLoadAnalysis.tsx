'use client';

import React from 'react';
import {
  Grid,
  Box,
  Stack,
  Typography,
  Paper,
  Chip,
  LinearProgress,
} from '@mui/material';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ZoneLoad {
  zone: string;
  scheduledPickups: number;
  availableAgents: number;
  loadRatio: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface ZoneLoadAnalysisProps {
  zoneLoad: ZoneLoad[];
}

const ZoneLoadAnalysis: React.FC<ZoneLoadAnalysisProps> = ({ zoneLoad }) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getLoadColor = (loadRatio: number) => {
    if (loadRatio > 4) return 'error';
    if (loadRatio > 2) return 'warning';
    return 'success';
  };

  return (
    <DashboardCard>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>City & Zone Load Analysis</Typography>
        <Grid container spacing={2}>
          {zoneLoad.map((zone) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={zone.zone}>
              <Paper sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle2" fontWeight={600}>{zone.zone}</Typography>
                  <Chip 
                    size="small" 
                    label={zone.riskLevel}
                    color={getRiskColor(zone.riskLevel) as any}
                  />
                </Stack>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Pickups:</Typography>
                    <Typography variant="body2" fontWeight={600}>{zone.scheduledPickups}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Agents:</Typography>
                    <Typography variant="body2" fontWeight={600}>{zone.availableAgents}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Load Ratio:</Typography>
                    <Typography variant="body2" fontWeight={600} color={zone.loadRatio > 4 ? 'error.main' : zone.loadRatio > 2 ? 'warning.main' : 'success.main'}>
                      {zone.loadRatio.toFixed(1)}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min((zone.loadRatio / 10) * 100, 100)} 
                    color={getLoadColor(zone.loadRatio) as any}
                  />
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardCard>
  );
};

export default ZoneLoadAnalysis;
