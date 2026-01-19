import React from 'react';
import { Grid, Typography, Box, Card, CardContent, Stack } from '@mui/material';
import { IconGift, IconUsers, IconTrophy, IconUserCheck, IconTrendingUp, IconTarget, IconAward, IconUserPlus } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

interface RewardsEngagementProps {
  isLoading?: boolean;
}

const RewardsEngagement = ({ isLoading }: RewardsEngagementProps) => {
  const rewardsData = [
    {
      title: "Points Issued Today",
      value: "12,450",
      icon: <IconGift size={28} />,
      color: "primary",
      subtitle: "User rewards distributed",
    },
    {
      title: "Rewards Redeemed",
      value: "186",
      icon: <IconTrophy size={28} />,
      color: "success",
      subtitle: "Today's redemptions",
    },
    {
      title: "Active Streaks",
      value: "3,420",
      icon: <IconTarget size={28} />,
      color: "warning",
      subtitle: "Users with active streaks",
    },
  ];

  const referralData = [
    {
      title: "New Referrals Today",
      value: "28",
      icon: <IconUserCheck size={28} />,
      color: "info",
      subtitle: "New users referred",
      trend: +12,
    },
    {
      title: "Completed Referrals",
      value: "19",
      icon: <IconUsers size={28} />,
      color: "secondary",
      subtitle: "Successful referrals",
      trend: +8,
    },
    {
      title: "Conversion Rate",
      value: "68%",
      icon: <IconTrendingUp size={28} />,
      color: "success",
      subtitle: "Referral success rate",
      trend: +5,
    },
  ];

  const StatCard = ({ item }: { item: any }) => (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" fontWeight={700} color={`${item.color}.main`}>
              {item.value}
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              {item.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {item.subtitle}
            </Typography>
            {item.trend !== undefined && (
              <Stack direction="row" alignItems="center" mt={1.5} spacing={0.5}>
                <IconTrendingUp size={16} color="#4caf50" />
                <Typography variant="caption" fontWeight={600} color="success.main">
                  +{item.trend}%
                </Typography>
              </Stack>
            )}
          </Box>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: `${item.color}.light`,
              opacity: 0.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: `${item.color}.main`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 8,
                borderRadius: '50%',
                bgcolor: `${item.color}.light`,
                opacity: 0.6,
              },
            }}
          >
            {item.icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const SectionCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div style={{ marginBottom: '24px' }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'white',
            flexShrink: 0,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {icon}
        </Box>
        {title}
      </Typography>
      {children}
    </div>
  );

  if (isLoading) {
    return (
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <SectionCard title="Rewards Snapshot" icon={<IconAward size={24} />}>
            <Grid container spacing={3}>
              {[0, 1, 2].map((i) => (
                <Grid size={{ xs: 12, sm: 4 }} key={i}>
                  <Card>
                    <CardContent>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box>
                          <Box sx={{ width: 90, height: 32, bgcolor: 'grey.300', borderRadius: 1, mb: 1 }} />
                          <Box sx={{ width: 140, height: 16, bgcolor: 'grey.200', borderRadius: 1, mb: 0.5 }} />
                          <Box sx={{ width: 100, height: 14, bgcolor: 'grey.200', borderRadius: 1 }} />
                        </Box>
                        <Box sx={{ width: 64, height: 64, bgcolor: 'grey.200', borderRadius: '50%' }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <SectionCard title="Referrals" icon={<IconUserPlus size={24} />}>
            <Grid container spacing={3}>
              {[0, 1, 2].map((i) => (
                <Grid size={{ xs: 12, sm: 4 }} key={i}>
                  <Card>
                    <CardContent>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box>
                          <Box sx={{ width: 80, height: 32, bgcolor: 'grey.300', borderRadius: 1, mb: 1 }} />
                          <Box sx={{ width: 130, height: 16, bgcolor: 'grey.200', borderRadius: 1, mb: 0.5 }} />
                          <Box sx={{ width: 110, height: 14, bgcolor: 'grey.200', borderRadius: 1 }} />
                        </Box>
                        <Box sx={{ width: 64, height: 64, bgcolor: 'grey.200', borderRadius: '50%' }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </SectionCard>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={4}>
      {/* Rewards Snapshot Card */}
      <Grid size={{ xs: 12, lg: 12 }}>
        <SectionCard title="Rewards Snapshot" icon={<IconAward size={24} />}>
          <Grid container spacing={3}>
            {rewardsData.map((item, index) => (
              <Grid size={{ xs: 12, sm: 4 }} key={index}>
                <StatCard item={item} />
              </Grid>
            ))}
          </Grid>
        </SectionCard>
      </Grid>

      {/* Referrals Card */}
      <Grid size={{ xs: 12, lg: 12 }}>
        <SectionCard title="Referrals" icon={<IconUserPlus size={24} />}>
          <Grid container spacing={3}>
            {referralData.map((item, index) => (
              <Grid size={{ xs: 12, sm: 4 }} key={index}>
                <StatCard item={item} />
              </Grid>
            ))}
          </Grid>
        </SectionCard>
      </Grid>
    </Grid>
  );
};

export default RewardsEngagement;