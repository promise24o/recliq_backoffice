'use client'
import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconUsers, 
  IconCheck, 
  IconClock, 
  IconTrendingUp, 
  IconAlertTriangle,
  IconBuilding,
  IconUserCircle,
  IconBriefcase
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { useKYCStats, type KYCStats } from '@/hooks/useKYC';
import { KYCStatsGridSkeleton } from './KYCSkeletonLoader';

interface KYCStatsCardsProps {
  onStatusFilter: (status: string) => void;
  onUserTypeFilter: (userType: string) => void;
}

const KYCStatsCards: React.FC<KYCStatsCardsProps> = ({ onStatusFilter, onUserTypeFilter }) => {
  const [mounted, setMounted] = useState(false);
  const { data: stats, isLoading, error } = useKYCStats();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return <KYCStatsGridSkeleton count={7} />;
  }

  if (error || !stats) {
    return (
      <Card sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Failed to load KYC statistics</Typography>
      </Card>
    );
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'sprout': return '#10B981';
      case 'bloom': return '#3B82F6';
      case 'thrive': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'sprout': return <IconTrendingUp size={24} />;
      case 'bloom': return <IconCheck size={24} />;
      case 'thrive': return <IconUsers size={24} />;
      default: return <IconAlertTriangle size={24} />;
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Total Users */}
      <Grid size={{ xs: 12, sm: 6, md: 4.8, lg: 3 }}>
        <DashboardCard
          title="Total Users"
          subtitle="All KYC records"
          value={stats.total}
          icon={<IconUsers size={24} />}
          color="#6366F1"
          percentage={null}
        />
      </Grid>

      {/* Sprout Tier */}
      <Grid size={{ xs: 12, sm: 6, md: 4.8, lg: 3 }}>
        <Card 
          sx={{ 
            height: '100%', 
            cursor: 'pointer',
            '&:hover': { boxShadow: 3 }
          }}
          onClick={() => onUserTypeFilter('sprout')}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ bgcolor: getTierColor('sprout') + '20', color: getTierColor('sprout') }}>
                {getTierIcon('sprout')}
              </Avatar>
              <Box flex={1}>
                <Typography variant="h4" fontWeight={600}>
                  {stats.sprout}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sprout Tier
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Basic verification
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Bloom Tier */}
      <Grid size={{ xs: 12, sm: 6, md: 4.8, lg: 3 }}>
        <Card 
          sx={{ 
            height: '100%', 
            cursor: 'pointer',
            '&:hover': { boxShadow: 3 }
          }}
          onClick={() => onUserTypeFilter('bloom')}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ bgcolor: getTierColor('bloom') + '20', color: getTierColor('bloom') }}>
                {getTierIcon('bloom')}
              </Avatar>
              <Box flex={1}>
                <Typography variant="h4" fontWeight={600}>
                  {stats.bloom}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bloom Tier
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Enhanced verification
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Thrive Tier */}
      <Grid size={{ xs: 12, sm: 6, md: 4.8, lg: 3 }}>
        <Card 
          sx={{ 
            height: '100%', 
            cursor: 'pointer',
            '&:hover': { boxShadow: 3 }
          }}
          onClick={() => onUserTypeFilter('thrive')}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ bgcolor: getTierColor('thrive') + '20', color: getTierColor('thrive') }}>
                {getTierIcon('thrive')}
              </Avatar>
              <Box flex={1}>
                <Typography variant="h4" fontWeight={600}>
                  {stats.thrive}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Thrive Tier
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Full verification
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Pending */}
      <Grid size={{ xs: 12, sm: 6, md: 4.8, lg: 3 }}>
        <Card 
          sx={{ 
            height: '100%', 
            cursor: 'pointer',
            '&:hover': { boxShadow: 3 }
          }}
          onClick={() => onStatusFilter('pending')}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ bgcolor: '#F59E0B20', color: '#F59E0B' }}>
                <IconClock size={24} />
              </Avatar>
              <Box flex={1}>
                <Typography variant="h4" fontWeight={600}>
                  {stats.pending}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Awaiting verification
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Individual Users */}
      <Grid size={{ xs: 12, sm: 6, md: 4.8, lg: 3 }}>
        <Card 
          sx={{ 
            height: '100%', 
            cursor: 'pointer',
            '&:hover': { boxShadow: 3 }
          }}
          onClick={() => onUserTypeFilter('individual')}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ bgcolor: '#3B82F620', color: '#3B82F6' }}>
                <IconUserCircle size={24} />
              </Avatar>
              <Box flex={1}>
                <Typography variant="h4" fontWeight={600}>
                  {stats.individual}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Individual
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Personal accounts
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Enterprise Users */}
      <Grid size={{ xs: 12, sm: 6, md: 4.8, lg: 3 }}>
        <Card 
          sx={{ 
            height: '100%', 
            cursor: 'pointer',
            '&:hover': { boxShadow: 3 }
          }}
          onClick={() => onUserTypeFilter('enterprise')}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ bgcolor: '#10B98120', color: '#10B981' }}>
                <IconBuilding size={24} />
              </Avatar>
              <Box flex={1}>
                <Typography variant="h4" fontWeight={600}>
                  {stats.enterprise}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enterprise
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Business accounts
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Agent Users */}
      <Grid size={{ xs: 12, sm: 6, md: 4.8, lg: 3 }}>
        <Card 
          sx={{ 
            height: '100%', 
            cursor: 'pointer',
            '&:hover': { boxShadow: 3 }
          }}
          onClick={() => onUserTypeFilter('agent')}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ bgcolor: '#8B5CF620', color: '#8B5CF6' }}>
                <IconBriefcase size={24} />
              </Avatar>
              <Box flex={1}>
                <Typography variant="h4" fontWeight={600}>
                  {stats.agent}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Agents
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Collection agents
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default KYCStatsCards;
