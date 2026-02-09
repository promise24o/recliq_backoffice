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

interface ScheduledPickup {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  city: string;
  zone: string;
  address: string;
  scheduledDate: string;
  scheduledTime: string;
  pickupMode: 'pickup' | 'dropoff';
  wasteType: 'plastic' | 'paper' | 'metal' | 'glass' | 'organic' | 'e_waste' | 'mixed';
  estimatedWeight: number;
  status: 'scheduled' | 'assigned' | 'agent_confirmed' | 'at_risk' | 'cancelled' | 'rescheduled';
  assignedAgentId?: string;
  assignedAgentName?: string;
  agentConfirmationStatus?: 'confirmed' | 'pending' | 'rejected';
  backupAgentId?: string;
  backupAgentName?: string;
  slaRisk: 'low' | 'medium' | 'high' | 'critical';
  timeRemaining: string;
  riskScore: number;
  createdAt: string;
  updatedAt: string;
  rescheduleCount: number;
  cancellationReason?: string;
}

interface ScheduledPickupsTableProps {
  pickups: ScheduledPickup[];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onPickupClick: (pickup: ScheduledPickup) => void;
}

const ScheduledPickupsTable: React.FC<ScheduledPickupsTableProps> = ({
  pickups,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onPickupClick,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'assigned': return 'info';
      case 'agent_confirmed': return 'success';
      case 'at_risk': return 'warning';
      case 'cancelled': return 'error';
      case 'rescheduled': return 'secondary';
      default: return 'default';
    }
  };

  const getSlaRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const paginatedPickups = pickups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <DashboardCard>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>Scheduled Pickups</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pickup ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>City / Zone</TableCell>
                <TableCell>Scheduled Time</TableCell>
                <TableCell>Agent</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>SLA Risk</TableCell>
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
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{pickup.userName}</Typography>
                      <Typography variant="caption" color="text.secondary">{pickup.userPhone}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{pickup.city}</Typography>
                      <Typography variant="caption" color="text.secondary">{pickup.zone}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{pickup.scheduledDate}</Typography>
                      <Typography variant="caption" color="text.secondary">{pickup.scheduledTime}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {pickup.assignedAgentName ? (
                      <Box>
                        <Typography variant="body2">{pickup.assignedAgentName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {pickup.agentConfirmationStatus === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">Unassigned</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      size="small" 
                      label={pickup.status.replace('_', ' ')}
                      color={getStatusColor(pickup.status) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      size="small" 
                      label={pickup.slaRisk.replace('_', ' ')}
                      color={getSlaRiskColor(pickup.slaRisk) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="More actions">
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

export default ScheduledPickupsTable;
