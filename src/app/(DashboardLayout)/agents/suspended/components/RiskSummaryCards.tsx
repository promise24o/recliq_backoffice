'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconBan, 
  IconClock, 
  IconAlertTriangle, 
  IconShield, 
  IconEye, 
  IconCheck 
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface RiskSummary {
  permanentlyBanned: number;
  temporarilySuspended: number;
  flaggedAgents: number;
  complianceHolds: number;
  agentsUnderReview: number;
  reinstated30d: number;
}

interface RiskSummaryCardsProps {
  summary: RiskSummary;
  onRiskStateFilter: (state: string) => void;
}

const RiskSummaryCards: React.FC<RiskSummaryCardsProps> = ({ summary, onRiskStateFilter }) => {
  const cards = [
    {
      title: 'Permanently Banned',
      value: summary.permanentlyBanned.toLocaleString(),
      icon: <IconBan size={20} />,
      color: 'error',
      state: 'permanently_banned'
    },
    {
      title: 'Temporarily Suspended',
      value: summary.temporarilySuspended.toLocaleString(),
      icon: <IconClock size={20} />,
      color: 'warning',
      state: 'temporarily_suspended'
    },
    {
      title: 'Flagged Agents',
      value: summary.flaggedAgents.toLocaleString(),
      icon: <IconAlertTriangle size={20} />,
      color: 'info',
      state: 'flagged'
    },
    {
      title: 'Compliance Holds',
      value: summary.complianceHolds.toLocaleString(),
      icon: <IconShield size={20} />,
      color: 'warning',
      state: 'compliance_hold'
    },
    {
      title: 'Agents Under Review',
      value: summary.agentsUnderReview.toLocaleString(),
      icon: <IconEye size={20} />,
      color: 'info',
      state: 'active'
    },
    {
      title: 'Reinstated (30d)',
      value: summary.reinstated30d.toLocaleString(),
      icon: <IconCheck size={20} />,
      color: 'success',
      state: 'active'
    }
  ];

  return (
    <DashboardCard title="Risk Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🚨 Platform-wide agent risk exposure - High-risk, high-control monitoring
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                    borderColor: `${card.color}.main`,
                  }
                }} 
                onClick={() => onRiskStateFilter(card.state)}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: `${card.color}.main` }}>
                      {card.icon}
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h4" 
                        fontWeight={600} 
                        color={`${card.color}.main`}
                      >
                        {card.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.title}
                      </Typography>
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

export default RiskSummaryCards;
