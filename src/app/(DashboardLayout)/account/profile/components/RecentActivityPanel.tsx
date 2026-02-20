'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@mui/material';
import {
  Activity,
  LogIn,
  LogOut,
  Key,
  UserCheck,
  Smartphone,
  Shield,
  AlertTriangle,
  XCircle,
  Monitor,
} from 'lucide-react';
import type { AccountActivity } from '../types';
import { getActivityColor, getActivityLabel } from '../mockData';

interface RecentActivityPanelProps {
  activities: AccountActivity[];
}

const RecentActivityPanel: React.FC<RecentActivityPanelProps> = ({ activities }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getActionIcon = (action: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      login: <LogIn size={14} />,
      logout: <LogOut size={14} />,
      password_change: <Key size={14} />,
      profile_update: <UserCheck size={14} />,
      two_factor_enabled: <Smartphone size={14} />,
      two_factor_disabled: <Smartphone size={14} />,
      session_terminated: <Shield size={14} />,
      sensitive_action: <AlertTriangle size={14} />,
      failed_login: <XCircle size={14} />,
    };
    return iconMap[action] || <Activity size={14} />;
  };

  const paginatedActivities = activities.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Activity size={20} color="#F59E0B" />
          <Typography variant="h6" fontWeight="600">Recent Account Activity</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Recent logins, security changes, and sensitive actions — filtered to your account only
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Device</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedActivities.map((activity) => {
              const color = getActivityColor(activity.action);
              return (
                <TableRow key={activity.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ color }}>{getActionIcon(activity.action)}</Box>
                      <Chip
                        label={getActivityLabel(activity.action)}
                        size="small"
                        sx={{
                          bgcolor: color + '15',
                          color,
                          fontWeight: 600,
                          fontSize: '0.65rem',
                          height: 22,
                        }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{activity.description}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Monitor size={12} color="#6B7280" />
                      <Typography variant="caption">{activity.device}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" fontFamily="monospace">{activity.ipAddress}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {new Date(activity.timestamp).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={activity.success ? 'Success' : 'Failed'}
                      size="small"
                      sx={{
                        bgcolor: activity.success ? '#10B98115' : '#EF444415',
                        color: activity.success ? '#10B981' : '#EF4444',
                        fontWeight: 600,
                        fontSize: '0.6rem',
                        height: 20,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={activities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} events`}
      />
    </Paper>
  );
};

export default RecentActivityPanel;
