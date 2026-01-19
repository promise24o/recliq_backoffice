'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconUserCheck, 
  IconClock, 
  IconSend, 
  IconEye, 
  IconCheck, 
  IconX 
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface KYCSummary {
  totalUsers: number;
  notStarted: number;
  submitted: number;
  underReview: number;
  approved: number;
  rejected: number;
  expired: number;
}

interface KYCSummaryCardsProps {
  summary: KYCSummary;
  onStatusFilter: (status: string) => void;
}

const KYCSummaryCards: React.FC<KYCSummaryCardsProps> = ({ summary, onStatusFilter }) => {
  const cards = [
    {
      title: 'Total Users',
      value: summary.totalUsers.toLocaleString(),
      icon: <IconUserCheck size={20} />,
      color: 'primary',
      status: 'all'
    },
    {
      title: 'KYC Not Started',
      value: summary.notStarted.toLocaleString(),
      icon: <IconClock size={20} />,
      color: 'info',
      status: 'not_started'
    },
    {
      title: 'KYC Submitted',
      value: summary.submitted.toLocaleString(),
      icon: <IconSend size={20} />,
      color: 'warning',
      status: 'submitted'
    },
    {
      title: 'Under Review',
      value: summary.underReview.toLocaleString(),
      icon: <IconEye size={20} />,
      color: 'info',
      status: 'under_review'
    },
    {
      title: 'Approved',
      value: summary.approved.toLocaleString(),
      icon: <IconCheck size={20} />,
      color: 'success',
      status: 'approved'
    },
    {
      title: 'Rejected / Expired',
      value: (summary.rejected + summary.expired).toLocaleString(),
      icon: <IconX size={20} />,
      color: 'error',
      status: 'rejected'
    }
  ];

  return (
    <DashboardCard title="KYC Summary">
      <CardContent>
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

export default KYCSummaryCards;
