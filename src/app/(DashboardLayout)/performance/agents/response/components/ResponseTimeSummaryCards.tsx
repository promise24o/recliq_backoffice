'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Chip } from '@mui/material';
import { 
  IconClock,
  IconRocket,
  IconTurtle,
  IconAlertTriangle,
  IconUser
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ResponseCardProps {
  title: string;
  value?: string;
  time?: number; // in seconds
  description: string;
  icon: React.ReactNode;
  color: 'success' | 'warning' | 'error' | 'info';
  trend?: number;
  onClick?: () => void;
}

const formatTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

const ResponseCard: React.FC<ResponseCardProps> = ({ title, value, time, description, icon, color, trend, onClick }) => {
  const getColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'success.main';
      case 'warning': return 'warning.main';
      case 'error': return 'error.main';
      case 'info': return 'info.main';
      default: return 'primary.main';
    }
  };

  const getBgColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'success.light';
      case 'warning': return 'warning.light';
      case 'error': return 'error.light';
      case 'info': return 'info.light';
      default: return 'primary.light';
    }
  };

  return (
    <Card
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.25s ease',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          borderColor: getColor(color),
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: getBgColor(color),
                color: getColor(color),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
            {trend !== undefined && (
              <Chip
                size="small"
                label={`${trend > 0 ? '+' : ''}${trend}%`}
                color={trend > 0 ? 'success' : 'error'}
                variant="outlined"
              />
            )}
          </Stack>
          
          <Box>
            {time !== undefined && (
              <Typography variant="h4" fontWeight={700} color={getColor(color)}>
                {formatTime(time)}
              </Typography>
            )}
            {value !== undefined && (
              <Typography variant="h4" fontWeight={700} color={getColor(color)}>
                {value}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const ResponseTimeSummaryCards: React.FC = () => {
  const responseCards = [
    {
      title: 'Avg Response Time',
      time: 272, // 4m 32s
      description: 'Average time to accept pickup requests',
      icon: <IconClock size={24} />,
      trend: -8.5,
      color: 'success' as const,
    },
    {
      title: 'Fastest Agent',
      time: 45,
      description: 'Best response time recorded',
      icon: <IconRocket size={24} />,
      trend: -12.3,
      color: 'success' as const,
    },
    {
      title: 'Slowest Agent',
      time: 1090, // 18m 10s
      description: 'Worst response time recorded',
      icon: <IconTurtle size={24} />,
      trend: 15.2,
      color: 'error' as const,
    },
    {
      title: 'SLA Breaches',
      value: '27 agents',
      description: 'Agents exceeding 5min response time',
      icon: <IconAlertTriangle size={24} />,
      trend: -5.8,
      color: 'warning' as const,
    },
    {
      title: 'Active Agents',
      value: '132',
      description: 'Agents responding to requests',
      icon: <IconUser size={24} />,
      trend: 8.3,
      color: 'info' as const,
    }
  ];

  const handleCardClick = (title: string) => {
    // Filter logic would be implemented here
    console.log(`Filter by ${title}`);
  };

  return (
    <DashboardCard title="Response Time Summary">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' }, gap: 2 }}>
        {responseCards.map((card, index) => (
          <ResponseCard
            key={index}
            title={card.title}
            time={card.time}
            value={card.value}
            description={card.description}
            icon={card.icon}
            trend={card.trend}
            color={card.color}
            onClick={() => handleCardClick(card.title)}
          />
        ))}
      </Box>
    </DashboardCard>
  );
};

export default ResponseTimeSummaryCards;
