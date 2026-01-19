'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconUser, 
  IconCheck, 
  IconClock, 
  IconBan,
  IconAlertTriangle,
  IconTrendingUp 
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AgentSummary {
  totalAgents: number;
  activeAgents: number;
  idleAgents: number;
  suspendedAgents: number;
  flaggedAgents: number;
  avgCompletionRate: number;
}

interface AgentSummaryCardsProps {
  summary: AgentSummary;
  onStatusFilter: (status: string) => void;
}

const AgentSummaryCards: React.FC<AgentSummaryCardsProps> = ({ summary, onStatusFilter }) => {
  const cards = [
    {
      title: 'Total Agents',
      value: summary.totalAgents.toLocaleString(),
      icon: <IconUser size={20} />,
      color: 'primary',
      status: 'all'
    },
    {
      title: 'Active Agents',
      value: summary.activeAgents.toLocaleString(),
      icon: <IconCheck size={20} />,
      color: 'success',
      status: 'active'
    },
    {
      title: 'Idle Agents',
      value: summary.idleAgents.toLocaleString(),
      icon: <IconClock size={20} />,
      color: 'info',
      status: 'idle'
    },
    {
      title: 'Suspended Agents',
      value: summary.suspendedAgents.toLocaleString(),
      icon: <IconBan size={20} />,
      color: 'error',
      status: 'suspended'
    },
    {
      title: 'Flagged Agents',
      value: summary.flaggedAgents.toLocaleString(),
      icon: <IconAlertTriangle size={20} />,
      color: 'warning',
      status: 'flagged'
    },
    {
      title: 'Avg Completion Rate',
      value: `${summary.avgCompletionRate.toFixed(1)}%`,
      icon: <IconTrendingUp size={20} />,
      color: 'success',
      status: 'all'
    }
  ];

  return (
    <DashboardCard title="Agent Summary">
      <CardContent>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
              <Card 
                sx={{ 
                  cursor: card.status !== 'all' ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': card.status !== 'all' ? {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                    borderColor: 'primary.main',
                  } : {}
                }}
                onClick={() => card.status !== 'all' && onStatusFilter(card.status)}
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

export default AgentSummaryCards;
