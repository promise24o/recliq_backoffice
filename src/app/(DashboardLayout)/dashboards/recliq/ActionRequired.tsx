import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import {
  IconAlertTriangle,
  IconClock,
  IconCircleX,
  IconUserCheck,
  IconArrowRight,
  IconBell,
} from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

interface ActionRequiredProps {
  isLoading?: boolean;
}

const ActionRequired = ({ isLoading }: ActionRequiredProps) => {
  const actionItems = [
    {
      title: 'Pending Withdrawals',
      count: 5,
      icon: <IconClock size={22} />,
      color: 'primary',
      description: 'Agent payouts awaiting processing',
      urgency: 'high',
      meta: ['Finance', 'Wallet'],
      link: '/finance/withdrawals',
    },
    {
      title: 'Disputes Awaiting Review',
      count: 3,
      icon: <IconAlertTriangle size={22} />,
      color: 'primary',
      description: 'Customer complaints requiring attention',
      urgency: 'high',
      meta: ['Support', 'Compliance'],
      link: '/support/disputes',
    },
    {
      title: 'Failed Payouts',
      count: 2,
      icon: <IconCircleX size={22} />,
      color: 'primary',
      description: 'Transaction failures to investigate',
      urgency: 'critical',
      meta: ['Finance', 'Critical'],
      link: '/finance/failed-payouts',
    },
    {
      title: 'Agents Pending Verification',
      count: 4,
      icon: <IconUserCheck size={22} />,
      color: 'primary',
      description: 'New agent applications to review',
      urgency: 'medium',
      meta: ['Agents', 'Onboarding'],
      link: '/agents/verification',
    },
  ];

  const urgencyStyle = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return { border: '2px solid', borderColor: 'primary.main', bgcolor: 'primary.lighter' };
      case 'high':
        return { border: '1px solid', borderColor: 'primary.main', bgcolor: 'primary.lighter' };
      case 'medium':
        return { border: '1px solid', borderColor: 'primary.main', bgcolor: 'primary.lighter' };
      default:
        return {};
    }
  };

  if (isLoading) {
    return (
      <DashboardCard title="Action Required">
        <Box sx={{ height: 240, bgcolor: 'grey.100', borderRadius: 2 }} />
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="Action Required">
      <Grid container spacing={3}>
        {actionItems.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '12px',
                          bgcolor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'primary.main',
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {item.title}
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                          {item.meta.map((tag, i) => (
                            <Chip key={i} size="small" label={tag} />
                          ))}
                        </Stack>
                      </Box>
                    </Stack>

                    <IconBell size={18} />
                  </Stack>

                  <Divider />

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography
                        variant="h3"
                        sx={{ fontWeight: 800, color: 'primary.main' }}
                      >
                        {item.count}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      label={item.urgency.toUpperCase()}
                      color="primary"
                      variant="outlined"
                      />
                  </Stack>

                  <Divider />

                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<IconArrowRight size={16} />}
                    sx={{
                      textTransform: 'none',
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    View Details
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default ActionRequired;
