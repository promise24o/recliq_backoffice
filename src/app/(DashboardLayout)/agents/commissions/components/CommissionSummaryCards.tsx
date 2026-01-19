'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconPercentage, 
  IconUsers, 
  IconAdjustments,
  IconChartLine,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface CommissionSummary {
  activeRules: number;
  avgCommissionRate: number;
  agentsAffected: number;
  customOverrides: number;
}

interface CommissionSummaryCardsProps {
  summary: CommissionSummary;
}

const CommissionSummaryCards: React.FC<CommissionSummaryCardsProps> = ({ summary }) => {
  const cards = [
    {
      title: 'Active Commission Rules',
      value: summary.activeRules.toString(),
      subtitle: 'Currently enforcing',
      icon: <IconChartLine size={20} />,
      color: 'primary',
    },
    {
      title: 'Avg Commission Rate',
      value: `${summary.avgCommissionRate}%`,
      subtitle: 'Across all active rules',
      icon: <IconPercentage size={20} />,
      color: 'success',
    },
    {
      title: 'Agents Affected',
      value: summary.agentsAffected.toLocaleString(),
      subtitle: 'Under commission rules',
      icon: <IconUsers size={20} />,
      color: 'info',
    },
    {
      title: 'Custom Overrides',
      value: summary.customOverrides.toString(),
      subtitle: 'Special rate exceptions',
      icon: <IconAdjustments size={20} />,
      color: 'warning',
    }
  ];

  return (
    <DashboardCard title="Commission Summary">
      <CardContent>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card 
                sx={{ 
                  transition: 'all 0.2s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                    borderColor: 'primary.main',
                  }
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: `${card.color}.main` }}>
                      {card.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {card.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {card.title}
                      </Typography>
                      {card.subtitle && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {card.subtitle}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </DashboardCard>
  );
};

export default CommissionSummaryCards;
