'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip } from '@mui/material';
import { 
  Award, 
  Users, 
  TrendingUp, 
  Star, 
  Archive, 
  Zap 
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { BadgeSystemOverview } from '../types';

interface BadgeSystemOverviewProps {
  overview: BadgeSystemOverview;
  onCardClick?: (metricType: string) => void;
}

const BadgeSystemOverview: React.FC<BadgeSystemOverviewProps> = ({ 
  overview, 
  onCardClick 
}) => {
  const overviewCards = [
    {
      title: 'Active Badges',
      value: overview.activeBadges.toString(),
      subtitle: 'Currently earnable',
      icon: <Award size={24} color="#3b82f6" />,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      metricType: 'active_badges'
    },
    {
      title: 'Users with Badges',
      value: overview.totalUsersWithBadges.toLocaleString(),
      subtitle: `${overview.adoptionRate.toFixed(1)}% adoption rate`,
      icon: <Users size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'users_with_badges'
    },
    {
      title: 'Top-Earned Badge',
      value: overview.topEarnedBadge.name,
      subtitle: `${overview.topEarnedBadge.count.toLocaleString()} earners`,
      icon: <TrendingUp size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      metricType: 'top_earned_badge'
    },
    {
      title: 'Rare Badges',
      value: overview.rareBadges.toString(),
      subtitle: 'High-difficulty recognition',
      icon: <Star size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#8b5cf615',
      metricType: 'rare_badges'
    },
    {
      title: 'Retired Badges',
      value: overview.retiredBadges.toString(),
      subtitle: 'No longer issued',
      icon: <Archive size={24} color="#6b7280" />,
      color: '#6b7280',
      bgColor: '#6b728015',
      metricType: 'retired_badges'
    },
    {
      title: 'Badges with Perks',
      value: overview.badgesWithPerks.toString(),
      subtitle: 'Linked to benefits',
      icon: <Zap size={24} color="#ef4444" />,
      color: '#ef4444',
      bgColor: '#ef444415',
      metricType: 'badges_with_perks'
    }
  ];

  const handleCardClick = (metricType: string) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  return (
    <DashboardCard title="Badge System Overview">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🏅 High-level visibility into recognition structure • Monitor badge adoption and engagement
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

                  {card.metricType === 'top_earned_badge' && (
                    <Chip
                      label="Most Popular"
                      size="small"
                      sx={{
                        bgcolor: '#f59e0b15',
                        color: '#f59e0b',
                        fontWeight: 500
                      }}
                    />
                  )}

                  {card.metricType === 'rare_badges' && overview.rareBadges > 0 && (
                    <Chip
                      label="Exclusive"
                      size="small"
                      sx={{
                        bgcolor: '#8b5cf615',
                        color: '#8b5cf6',
                        fontWeight: 500
                      }}
                    />
                  )}

                  {card.metricType === 'badges_with_perks' && (
                    <Chip
                      label="With Benefits"
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
              • {overview.adoptionRate.toFixed(1)}% of active users have earned at least one badge
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • {overview.badgesWithPerks} badges offer special perks to motivate engagement
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • {overview.topEarnedBadge.name} is the most popular achievement with {overview.topEarnedBadge.count.toLocaleString()} earners
            </Typography>
            {overview.retiredBadges > 0 && (
              <Typography variant="body2" color="text.secondary">
                • {overview.retiredBadges} badge{overview.retiredBadges > 1 ? 's' : ''} retired to maintain system quality
              </Typography>
            )}
          </Stack>
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

export default BadgeSystemOverview;
