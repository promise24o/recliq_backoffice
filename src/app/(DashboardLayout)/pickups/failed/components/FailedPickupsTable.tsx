'use client';

import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { MoreVertical } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FailedPickup {
  id: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  city: string;
  zone: string;
  address: string;
  pickupMode: 'pickup' | 'dropoff';
  matchType: 'auto' | 'user';
  wasteType: string;
  estimatedWeight: number;
  status: 'failed' | 'cancelled';
  failureReason: string;
  timeToFailure: number;
  assignedAgent?: string;
  agentPhone?: string;
  triggerSource: 'user' | 'agent' | 'system';
  createdAt: string;
  failedAt: string;
  matchingAttempts: number;
  agentsNotified: number;
  slaCountdown: number;
  availabilitySnapshot: any;
  distanceConstraints: any;
  agentReliability: any;
}

interface FailedPickupsTableProps {
  pickups: FailedPickup[];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onPickupClick: (pickup: FailedPickup) => void;
}

const FailedPickupsTable: React.FC<FailedPickupsTableProps> = ({
  pickups,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onPickupClick,
}) => {
  const paginatedPickups = pickups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'failed': return 'error';
      case 'cancelled': return 'warning';
      default: return 'default';
    }
  };

  const getTriggerSourceColor = (source: string) => {
    switch (source) {
      case 'user': return 'info';
      case 'agent': return 'secondary';
      case 'system': return 'error';
      default: return 'default';
    }
  };

  return (
    <DashboardCard>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Failed / Cancelled Pickups
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>City / Zone</TableCell>
                <TableCell>Pickup Mode</TableCell>
                <TableCell>Match Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Failure / Cancellation Reason</TableCell>
                <TableCell>Time to Failure</TableCell>
                <TableCell>Assigned Agent</TableCell>
                <TableCell>Trigger Source</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPickups.map((pickup) => (
                <TableRow 
                  key={pickup.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onPickupClick(pickup)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>{pickup.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{pickup.userName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{pickup.city}</Typography>
                      <Typography variant="caption" color="text.secondary">{pickup.zone}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      size="small" 
                      label={pickup.pickupMode === 'pickup' ? 'Agent → User' : 'User → Agent'}
                      color={pickup.pickupMode === 'pickup' ? 'primary' : 'secondary'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      size="small" 
                      label={pickup.matchType === 'auto' ? 'Auto-matched' : 'User-selected'}
                      color={pickup.matchType === 'auto' ? 'info' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      size="small" 
                      label={pickup.status}
                      color={getStatusColor(pickup.status) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{pickup.failureReason.replace('_', ' ')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{pickup.timeToFailure} min</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{pickup.assignedAgent || 'Unassigned'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      size="small" 
                      label={pickup.triggerSource}
                      color={getTriggerSourceColor(pickup.triggerSource) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View details">
                      <IconButton size="small">
                        <MoreVertical size={16} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={pickups.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          onRowsPerPageChange={(e) => {
            onRowsPerPageChange(parseInt(e.target.value, 10));
            onPageChange(0);
          }}
        />
      </Box>
    </DashboardCard>
  );
};

export default FailedPickupsTable;
