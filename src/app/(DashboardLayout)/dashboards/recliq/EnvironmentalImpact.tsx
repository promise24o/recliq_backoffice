import React from 'react';
import { Grid, Typography, Box, Card, CardContent, LinearProgress } from '@mui/material';
import { IconLeaf, IconCloud, IconTree, IconRecycle } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

interface EnvironmentalImpactProps {
  isLoading?: boolean;
}

const EnvironmentalImpact = ({ isLoading }: EnvironmentalImpactProps) => {
  const impactData = [
    {
      title: "Waste Recycled",
      value: "4.3 tons",
      icon: <IconRecycle size={24} />,
      color: "success",
      subtitle: "Today's collection",
      percentage: 85,
      description: "Equivalent to 4300 kg of waste diverted from landfills",
    },
    {
      title: "CO₂ Saved",
      value: "6.8 tons",
      icon: <IconCloud size={24} />,
      color: "info",
      subtitle: "Carbon footprint reduction",
      percentage: 72,
      description: "Environmental impact of recycling operations",
    },
    {
      title: "Equivalent Trees Saved",
      value: "312",
      icon: <IconTree size={24} />,
      color: "primary",
      subtitle: "Environmental contribution",
      percentage: 65,
      description: "Trees that would be needed to absorb this CO₂",
    },
  ];

  if (isLoading) {
    return (
      <DashboardCard title="🌍 Environmental Impact">
        <Grid container spacing={3}>
          {impactData.map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h4">
                        <Box sx={{ width: 60, height: 20, bgcolor: 'grey.200', borderRadius: 1 }} />
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 1 }}>
                        <Box sx={{ width: 80, height: 16, bgcolor: 'grey.200', borderRadius: 1 }} />
                      </Typography>
                      <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                        <Box sx={{ width: 120, height: 14, bgcolor: 'grey.200', borderRadius: 1 }} />
                      </Typography>
                    </Box>
                    <Box sx={{ width: 40, height: 40, bgcolor: 'grey.200', borderRadius: '50%' }} />
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ width: '100%', height: 8, bgcolor: 'grey.200', borderRadius: 1 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="🌍 Environmental Impact">
      <Grid container spacing={3}>
        {impactData.map((impact, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: `${impact.color}.main` }}>
                      {impact.value}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 1 }}>
                      {impact.title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                      {impact.subtitle}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
                      {impact.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: `${impact.color}.light`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: `${impact.color}.main`
                    }}
                  >
                    {impact.icon}
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="textSecondary">
                      Daily Goal Progress
                    </Typography>
                    <Typography variant="caption" color={`${impact.color}.main`} fontWeight={600}>
                      {impact.percentage}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={impact.percentage}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: `${impact.color}.main`,
                        borderRadius: 3,
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default EnvironmentalImpact;
