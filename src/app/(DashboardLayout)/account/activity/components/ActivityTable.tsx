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
} from '../utils/activityUtils';
import { TableRowsSkeleton } from './SkeletonLoader';

interface ActivityTableProps {
  onEventClick: (event: ActivityEvent) => void;
  filters?: {
    action?: ActivityEvent['action'];
    riskLevel?: ActivityEvent['riskLevel'];
    source?: ActivityEvent['source'];
    outcome?: ActivityEvent['outcome'];
    dateFrom?: string;
    dateTo?: string;
  };
}

const ActivityTable: React.FC<ActivityTableProps> = ({ onEventClick, filters = {} }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const { data: logsData, isLoading, error } = useActivityLogs({
    ...filters,
    page: page + 1,
    limit: rowsPerPage,
  });

  const events = logsData?.events || [];
  const total = logsData?.pagination?.total || 0;

  if (isLoading) {
    return (
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Entity</TableCell>
                <TableCell>Risk</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRowsSkeleton count={rowsPerPage} />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Failed to load activity logs</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Entity Type</TableCell>
              <TableCell>Entity ID</TableCell>
              <TableCell>Risk Level</TableCell>
              <TableCell>Source IP</TableCell>
              <TableCell>Device</TableCell>
              <TableCell>Outcome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => {
              const actionColor = getActionColor(event.action);
              const riskColor = getRiskColor(event.riskLevel);
              const outcomeColor = getOutcomeColor(event.outcome);

              return (
                <TableRow
                  key={event.id}
                  hover
                  onClick={() => onEventClick(event)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Stack>
                      <Typography variant="caption" fontWeight="600">
                        {new Date(event.timestamp).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(event.timestamp).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={event.actionLabel}
                      size="small"
                      sx={{
                        bgcolor: actionColor + '15',
                        color: actionColor,
                        fontWeight: 600,
                        fontSize: '0.65rem',
                        height: 22,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{event.entityType}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" fontFamily="monospace">{event.entityId}</Typography>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Globe size={12} color="#6B7280" />
                      <Typography variant="caption" fontFamily="monospace">{event.ipAddress}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Monitor size={12} color="#6B7280" />
                      <Typography variant="caption">{event.device.split(' — ')[0]}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} events`}
      />
    </Paper>
  );
};

export default ActivityTable;
