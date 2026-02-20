'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  Paper,
} from '@mui/material';
import {
  LogIn,
  LogOut,
  Key,
  Smartphone,
  UserCheck,
  Shield,
  AlertTriangle,
  XCircle,
  Eye,
  Settings,
  Users,
  Truck,
  DollarSign,
  MapPin,
  Tag,
  CheckCircle,
  ArrowRight,
  Monitor,
  Globe,
} from 'lucide-react';
import { useActivityLogs, type ActivityEvent } from '@/hooks/useActivityLogs';
import {
  getActionColor,
  getRiskColor,
  getRiskLabel,
  getOutcomeColor,
  getSourceLabel,
  getSourceColor,
  formatTimestamp,
  formatRelativeTime,
} from '../utils/activityUtils';
import { TimelineSkeleton } from './SkeletonLoader';

interface ActivityTimelineProps {
  onEventClick: (event: ActivityEvent) => void;
  limit?: number;
  filters?: {
    action?: ActivityEvent['action'];
    riskLevel?: ActivityEvent['riskLevel'];
    source?: ActivityEvent['source'];
    outcome?: ActivityEvent['outcome'];
    dateFrom?: string;
    dateTo?: string;
  };
}

const getActionIcon = (action: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    login: <LogIn size={16} />,
    logout: <LogOut size={16} />,
    password_change: <Key size={16} />,
    two_factor_change: <Smartphone size={16} />,
    profile_update: <UserCheck size={16} />,
    approval: <CheckCircle size={16} />,
    rejection: <XCircle size={16} />,
    override: <Shield size={16} />,
    escalation: <AlertTriangle size={16} />,
    sensitive_view: <Eye size={16} />,
    setting_change: <Settings size={16} />,
    session_terminated: <Shield size={16} />,
    failed_login: <XCircle size={16} />,
    user_action: <Users size={16} />,
    agent_action: <Truck size={16} />,
    finance_action: <DollarSign size={16} />,
    zone_action: <MapPin size={16} />,
    pricing_action: <Tag size={16} />,
  };
  return iconMap[action] || <Settings size={16} />;
};

const groupByDate = (events: ActivityEvent[]): Record<string, ActivityEvent[]> => {
  const groups: Record<string, ActivityEvent[]> = {};
  events.forEach((event) => {
    const date = new Date(event.timestamp).toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(event);
  });
  return groups;
};

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ onEventClick, limit = 10, filters = {} }) => {
  const { data: logsData, isLoading, error } = useActivityLogs({
    ...filters,
    limit,
  });

  const events = logsData?.events || [];

  if (isLoading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="600" mb={3}>Recent Activity</Typography>
        <TimelineSkeleton count={limit} />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Failed to load activity timeline</Typography>
      </Paper>
    );
  }

  const grouped = groupByDate(events);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="600" mb={3}>Recent Activity</Typography>
      <Stack spacing={4}>
        {Object.entries(grouped).map(([date, dateEvents]) => (
          <Box key={date}>
            <Typography variant="subtitle2" fontWeight="700" color="text.secondary" mb={2} sx={{ textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1 }}>
              {date}
            </Typography>

            <Stack spacing={0}>
              {dateEvents.map((event, idx) => {
                const color = getActionColor(event.action);
                const riskColor = getRiskColor(event.riskLevel);
                const outcomeColor = getOutcomeColor(event.outcome);
                const isLast = idx === dateEvents.length - 1;

                return (
                  <Box
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    sx={{
                      display: 'flex',
                      cursor: 'pointer',
                      '&:hover .event-card': { bgcolor: '#f8fafc', borderColor: color + '40' },
                    }}
                  >
                    {/* Timeline Line */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, minWidth: 32 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: color + '15',
                          color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          zIndex: 1,
                        }}
                      >
                        {getActionIcon(event.action)}
                      </Box>
                      {!isLast && (
                        <Box sx={{ width: 2, flex: 1, bgcolor: '#e2e8f0', minHeight: 20 }} />
                      )}
                    </Box>

                    {/* Event Card */}
                    <Box
                      className="event-card"
                      sx={{
                        flex: 1,
                        p: 2,
                        mb: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        transition: 'all 0.15s',
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                          <Chip
                            label={event.actionLabel}
                            size="small"
                            sx={{
                              bgcolor: color + '15',
                              color,
                              fontWeight: 600,
                              fontSize: '0.65rem',
                              height: 22,
                            }}
                          />
                          <Chip
                            label={getRiskLabel(event.riskLevel)}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: riskColor + '40',
                              color: riskColor,
                              fontWeight: 600,
                              fontSize: '0.6rem',
                              height: 20,
                            }}
                          />
                          <Chip
                            label={event.outcome === 'success' ? 'Success' : event.outcome === 'failed' ? 'Failed' : 'Pending'}
                            size="small"
                            sx={{
                              bgcolor: outcomeColor + '15',
                              color: outcomeColor,
                              fontWeight: 600,
                              fontSize: '0.6rem',
                              height: 20,
                            }}
                          />
                        </Stack>
                        <Typography variant="caption" color="text.secondary" noWrap sx={{ ml: 1 }}>
                          {formatRelativeTime(event.timestamp)}
                        </Typography>
                      </Stack>

                      <Typography variant="body2" fontWeight="500" mb={0.5}>
                        {event.description}
                      </Typography>

                      {/* Before → After */}
                      {event.beforeState && event.afterState && (
                        <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                          <Typography variant="caption" sx={{ bgcolor: '#FEE2E2', px: 0.75, py: 0.25, borderRadius: 0.5, color: '#991B1B' }}>
                            {event.beforeState}
                          </Typography>
                          <ArrowRight size={12} color="#6B7280" />
                          <Typography variant="caption" sx={{ bgcolor: '#D1FAE5', px: 0.75, py: 0.25, borderRadius: 0.5, color: '#065F46' }}>
                            {event.afterState}
                          </Typography>
                        </Stack>
                      )}

                      <Stack direction="row" spacing={2} mt={0.5} flexWrap="wrap">
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Typography variant="caption" color="text.secondary">{event.entityType}:</Typography>
                          <Typography variant="caption" fontWeight="600">{event.entityName}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Monitor size={10} color="#9CA3AF" />
                          <Typography variant="caption" color="text.secondary">{event.device.split(' — ')[0]}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Globe size={10} color="#9CA3AF" />
                          <Typography variant="caption" color="text.secondary">{event.location}</Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default ActivityTimeline;
