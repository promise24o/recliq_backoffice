'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconUsers, 
  IconCheck, 
  IconClock, 
  IconTrendingUp, 
  IconBan 
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface UserSummary {
  totalUsers: number;
  activeUsers: number;
  dormantUsers: number;
  churnedUsers: number;
  suspendedUsers: number;
}

interface UserSummaryCardsProps {
  summary: UserSummary;
  onStatusFilter: (status: string) => void;
}

const UserSummaryCards: React.FC<UserSummaryCardsProps> = ({ summary, onStatusFilter }) => {
  const cards = [
    {
      title: 'Total Users',
      value: summary.totalUsers.toLocaleString(),
      icon: <IconUsers size={20} />,
      color: 'primary',
      status: 'all'
    },
    {
      title: 'Active Users',
      value: summary.activeUsers.toLocaleString(),
      icon: <IconCheck size={20} />,
      color: 'success',
      status: 'active'
    },
    {
      title: 'Dormant Users',
      value: summary.dormantUsers.toLocaleString(),
      icon: <IconClock size={20} />,
      color: 'warning',
      status: 'dormant'
    },
    {
      title: 'Churned Users',
      value: summary.churnedUsers.toLocaleString(),
      icon: <IconTrendingUp size={20} />,
      color: 'error',
      status: 'churned'
    },
    {
      title: 'Suspended Users',
      value: summary.suspendedUsers.toLocaleString(),
      icon: <IconBan size={20} />,
      color: 'error',
      status: 'suspended'
    }
  ];

  return (
    <DashboardCard title="User Summary">
      <CardContent>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={index}>
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
                onClick={() => onStatusFilter(card.status)}
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

export default UserSummaryCards;
