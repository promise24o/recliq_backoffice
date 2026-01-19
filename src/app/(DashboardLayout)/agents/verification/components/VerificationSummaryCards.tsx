'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconUser, 
  IconClock, 
  IconCheck, 
  IconX,
  IconBan,
  IconAlertTriangle,
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
      icon: <IconUser size={20} />,
      color: 'primary',
      status: 'all'
    },
    {
      title: 'Pending Verification',
      value: summary.pendingVerification.toLocaleString(),
      subtitle: 'Awaiting review',
      icon: <IconClock size={20} />,
      color: 'warning',
      status: 'pending'
    },
    {
      title: 'Verified Agents',
      value: summary.verifiedAgents.toLocaleString(),
      subtitle: 'Ready for operations',
      icon: <IconCheck size={20} />,
      color: 'success',
      status: 'verified'
    },
    {
      title: 'Rejected Agents',
      value: summary.rejectedAgents.toLocaleString(),
      icon: <IconX size={20} />,
      color: 'error',
      status: 'rejected'
    },
    {
      title: 'Suspended Agents',
      value: summary.suspendedAgents.toLocaleString(),
      icon: <IconBan size={20} />,
      color: 'error',
      status: 'suspended'
    },
    {
      title: 'Incomplete KYC',
      value: `${summary.incompleteKYC}%`,
      subtitle: 'Need documents',
      icon: <IconAlertTriangle size={20} />,
      color: 'warning',
      status: 'incomplete'
    }
  ];

  return (
    <DashboardCard title="Verification Summary">
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

export default VerificationSummaryCards;
