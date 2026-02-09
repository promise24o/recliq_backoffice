'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Alert } from '@mui/material';
import { 
  Target, 
  Clock, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Calendar,
  Zap
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { ChallengeOverview } from '../types';

interface ChallengesOverviewProps {
  overview: ChallengeOverview;
  onCardClick?: (metricType: string) => void;
}

const ChallengesOverview: React.FC<ChallengesOverviewProps> = ({ 
  overview, 
  onCardClick 
}) => {
  const overviewCards = [
    {
      title: 'Active Challenges',
      value: overview.activeChallenges.toString(),
      subtitle: 'Currently running',
      icon: <Target size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'active_challenges'
    },
    {
      title: 'Upcoming Challenges',
      value: overview.upcomingChallenges.toString(),
      subtitle: 'Scheduled next',
      icon: <Clock size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      metricType: 'upcoming_challenges'
    },
    {
      title: 'Completed Challenges',
      value: overview.completedChallenges.toString(),
      subtitle: 'Finished campaigns',
      icon: <CheckCircle size={24} color="#6b7280" />,
      color: '#6b7280',
      bgColor: '#6b728015',
      metricType: 'completed_challenges'
    },
    {
      title: 'Total Participants',
      value: overview.totalParticipants.toLocaleString(),
      subtitle: 'Active participation count',
      icon: <Users size={24} color="#3b82f6" />,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      metricType: 'total_participants'
    },
    {
      title: 'Avg Completion Rate',
      value: `${overview.averageCompletionRate.toFixed(1)}%`,
      subtitle: 'Effectiveness indicator',
      icon: <TrendingUp size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'completion_rate'
    },
    {
      title: 'Reward Exposure',
      value: `₦${(overview.rewardExposure / 1000000).toFixed(1)}M`,
      subtitle: 'Points / perks issued',
      icon: <DollarSign size={24} color="#ef4444" />,
      color: '#ef4444',
      bgColor: '#ef444415',
      metricType: 'reward_exposure'
    }
  ];

  const handleCardClick = (metricType: string) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  return (
    <DashboardCard title="Challenges Overview">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🔥 High-level visibility into active incentive pressure • Monitor challenge performance and participation
          </Typography>
        </Box>

        <Stack spacing={2}>
          {overviewCards.map((card, index) => (
            <Card
              key={index}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                }
              }}
              onClick={() => handleCardClick(card.metricType)}
            >
              <CardContent>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: card.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {card.icon}
                  </Box>
                  
                  <Box flex={1}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      {card.title}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      fontWeight="600" 
                      color={card.color}
                      mb={0.5}
                    >
                      {card.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {card.subtitle}
                    </Typography>
                  </Box>

                  {card.metricType === 'active_challenges' && (
                    <Chip
                      label="High Priority"
                      size="small"
                      sx={{
                        bgcolor: '#10b98115',
                        color: '#10b981',
                        fontWeight: 500
                      }}
                    />
                  )}

                  {card.metricType === 'upcoming_challenges' && (
                    <Chip
                      label="Scheduled"
                      size="small"
                      sx={{
                        bgcolor: '#f59e0b15',
                        color: '#f59e0b',
                        fontWeight: 500
                      }}
                    />
                  )}

                  {card.metricType === 'reward_exposure' && (
                    <Chip
                      label="Monitor Closely"
                      size="small"
                      sx={{
                        bgcolor: '#ef444415',
                        color: '#ef4444',
                        fontWeight: 500
                      }}
                    />
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Summary Insights */}
        <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Key Insights
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • {overview.activeChallenges} challenges currently driving user engagement
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • {overview.totalParticipants.toLocaleString()} participants across all challenges
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • {overview.averageCompletionRate.toFixed(1)}% average completion rate shows effective challenge design
            </Typography>
            <Typography variant="body2" color="text_secondary">
              • ₦{(overview.rewardExposure / 1000000).toFixed(1)}M total reward exposure requires careful monitoring
            </Typography>
          </Stack>
        </Box>

        {/* Challenge Status Distribution */}
        <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Challenge Status Distribution
          </Typography>
          <Stack direction="row" spacing={3}>
            <Stack spacing={1} alignItems="center">
              <Typography variant="h4" fontWeight="600" color="#10b981">
                {overview.activeChallenges}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active
              </Typography>
            </Stack>
            
            <Stack spacing={1} alignItems="center">
              <Typography variant="h4" fontWeight="600" color="#f59e0b">
                {overview.upcomingChallenges}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming
              </Typography>
            </Stack>
            
            <Stack spacing={1} alignItems="center">
              <Typography variant="h4" fontWeight="600" color="#6b7280">
                {overview.completedChallenges}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Performance Indicators */}
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Performance Summary
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • Challenge participation is {overview.averageCompletionRate > 50 ? 'strong' : 'moderate'} at {overview.averageCompletionRate.toFixed(1)}% completion rate
            </Typography>
            <Typography variant="body2">
              • Reward exposure of ₦{(overview.rewardExposure / 1000000).toFixed(1)}M requires close financial monitoring
            </Typography>
            <Typography variant="body2">
              • {overview.activeChallenges} active challenges suggest healthy program diversity
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default ChallengesOverview;
