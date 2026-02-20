'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
} from '@mui/material';
import {
  Lock,
  Users,
  AlertTriangle,
  FileCheck,
  AlertOctagon,
  Clock,
} from 'lucide-react';
import type { RolesSummary } from '../types';

interface RolesOverviewSummaryCardsProps {
  summary: RolesSummary;
  onCardClick?: (metricType: string) => void;
  selectedMetric?: string | null;
}

interface CardConfig {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const RolesOverviewSummaryCards: React.FC<RolesOverviewSummaryCardsProps> = ({
  summary,
  onCardClick,
  selectedMetric
}) => {
  const cards: CardConfig[] = [
    {
      id: 'total_roles',
      title: 'Total Roles',
      value: summary?.totalRoles || 0,
      subtitle: 'Defined admin roles',
      icon: <Lock size={24} />,
      color: '#3B82F6',
      bgColor: '#EFF6FF'
    },
    {
      id: 'admins_assigned',
      title: 'Admins Assigned',
      value: summary?.adminsAssigned || 0,
      subtitle: 'Users with roles',
      icon: <Users size={24} />,
      color: '#6366F1',
      bgColor: '#EEF2FF'
    },
    {
      id: 'high_privilege',
      title: 'High-Privilege Roles',
      value: summary?.highPrivilegeRoles || 0,
      subtitle: 'Override-enabled',
      icon: <AlertTriangle size={24} />,
      color: '#EF4444',
      bgColor: '#FEF2F2'
    },
    {
      id: 'approval_required',
      title: 'Approval-Required Actions',
      value: summary?.approvalRequiredActions || 0,
      subtitle: 'Protected operations',
      icon: <FileCheck size={24} />,
      color: '#F59E0B',
      bgColor: '#FFFBEB'
    },
    {
      id: 'permission_conflicts',
      title: 'Permission Conflicts',
      value: summary?.permissionConflicts || 0,
      subtitle: 'Overlapping scopes',
      icon: <AlertOctagon size={24} />,
      color: '#DC2626',
      bgColor: '#FEE2E2'
    },
    {
      id: 'last_change',
      title: 'Last Role Change',
      value: summary?.lastRoleChange
        ? new Date(summary.lastRoleChange).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
        : '—',
      subtitle: 'Governance signal',
      icon: <Clock size={24} />,
      color: '#10B981',
      bgColor: '#ECFDF5'
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <Paper
            sx={{
              p: 3,
              cursor: onCardClick ? 'pointer' : 'default',
              border: selectedMetric === card.id ? `2px solid ${card.color}` : '1px solid',
              borderColor: selectedMetric === card.id ? card.color : 'divider',
              transition: 'all 0.2s ease',
              '&:hover': onCardClick ? {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              } : {}
            }}
            onClick={() => onCardClick?.(card.id)}
          >
            <Stack spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: card.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.color
                }}
              >
                {card.icon}
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="700" color={card.color}>
                  {card.value}
                </Typography>
                <Typography variant="subtitle2" fontWeight="600" mt={0.5}>
                  {card.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {card.subtitle}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default RolesOverviewSummaryCards;
