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

interface VerificationSummary {
  totalAgents: number;
  pendingVerification: number;
  verifiedAgents: number;
  rejectedAgents: number;
  suspendedAgents: number;
  incompleteKYC: number;
}

interface VerificationSummaryCardsProps {
  summary: VerificationSummary;
  onStatusFilter: (status: string) => void;
}

const VerificationSummaryCards: React.FC<VerificationSummaryCardsProps> = ({ summary, onStatusFilter }) => {
  const cards = [
    {
      title: 'Total Agents',
      value: summary.totalAgents.toLocaleString(),
      icon: <IconUserCheck size={20} />,
      color: 'primary',
      status: 'all'
    },
    {
      title: 'Pending Verification',
      value: summary.pendingVerification.toLocaleString(),
      icon: <IconClock size={20} />,
      color: 'info',
      status: 'pending'
    },
    {
      title: 'Under Review',
      value: summary.incompleteKYC.toLocaleString(),
      icon: <IconEye size={20} />,
      color: 'info',
      status: 'under_review'
    },
    {
      title: 'Verified Agents',
      value: summary.verifiedAgents.toLocaleString(),
      icon: <IconCheck size={20} />,
      color: 'success',
      status: 'verified'
    },
    {
      title: 'Rejected / Suspended',
      value: (summary.rejectedAgents + summary.suspendedAgents).toLocaleString(),
      icon: <IconX size={20} />,
      color: 'error',
      status: 'rejected'
    }
  ];

  return (
    <DashboardCard title="Verification Summary">
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

export default VerificationSummaryCards;
