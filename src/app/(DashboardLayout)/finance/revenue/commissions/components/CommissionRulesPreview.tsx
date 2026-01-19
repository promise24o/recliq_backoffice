'use client'
import React from 'react';
import { Box, Typography, Stack, Chip, Button, Divider, Grid, Card, CardContent } from '@mui/material';
import { IconSettings, IconExternalLink, IconInfoCircle, IconCheck, IconAlertTriangle } from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

const CommissionRulesPreview: React.FC = () => {
  const currentRules = {
    model: 'Percentage-based Commission',
    defaultRates: {
      userPickup: '12%',
      b2bPickup: '12%',
      dropoffHandling: '8%'
    },
    exceptions: [
      {
        condition: 'Premium Materials (E-waste)',
        rate: '15%',
        active: true
      },
      {
        condition: 'High-volume Agents (>100 pickups/month)',
        rate: '10%',
        active: true
      },
      {
        condition: 'New Agents (First 30 days)',
        rate: '8%',
        active: false
      }
    ]
  };

  return (
    <DashboardCard title="Commission Rules Preview">
      <Stack spacing={3}>
        {/* Current Model */}
        <Box>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Current Commission Model
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip
              icon={<IconSettings size={14} />}
              label={currentRules.model}
              color="primary"
              variant="outlined"
            />
            <Typography variant="body2" color="text.secondary">
              Active since Jan 1, 2024
            </Typography>
          </Stack>
        </Box>

        <Divider />

        {/* Default Rates */}
        <Box>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Default Rates
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">User Pickup</Typography>
                  <Chip 
                    size="small" 
                    label={currentRules.defaultRates.userPickup}
                    color="primary"
                    variant="outlined"
                  />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">B2B Pickup</Typography>
                  <Chip 
                    size="small" 
                    label={currentRules.defaultRates.b2bPickup}
                    color="success"
                    variant="outlined"
                  />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Drop-off Handling</Typography>
                  <Chip 
                    size="small" 
                    label={currentRules.defaultRates.dropoffHandling}
                    color="info"
                    variant="outlined"
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Exceptions */}
        <Box>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Exceptions & Special Rules
          </Typography>
          <Stack spacing={2}>
            {currentRules.exceptions.map((exception, index) => (
              <Card key={index} variant="outlined" sx={{ bgcolor: exception.active ? 'success.50' : 'grey.50' }}>
                <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {exception.active ? (
                      <IconCheck size={16} color="green" />
                    ) : (
                      <IconAlertTriangle size={16} color="orange" />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {exception.condition}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Rate: {exception.rate}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={exception.active ? 'Active' : 'Inactive'}
                      color={exception.active ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <Divider />

        {/* Configuration Link */}
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconInfoCircle size={16} color="info.main" />
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
              Need to adjust commission rates or add new rules?
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<IconExternalLink size={14} />}
              href="/settings/commissions"
            >
              Commission Settings
            </Button>
          </Stack>
        </Box>

        {/* Quick Stats */}
        <Box>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Rule Performance
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Rules Applied Today
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  142
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Exception Rate
                </Typography>
                <Typography variant="h6" fontWeight={700} color="warning.main">
                  8.5%
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </DashboardCard>
  );
};

export default CommissionRulesPreview;
