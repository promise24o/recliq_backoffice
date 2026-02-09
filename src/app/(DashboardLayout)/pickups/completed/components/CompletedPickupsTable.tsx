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

interface CompletedPickup {
  id: string;
  completionDate: string;
  userName: string;
  userPhone: string;
  agentName: string;
  agentPhone: string;
  city: string;
  zone: string;
  address: string;
  pickupMode: 'pickup' | 'dropoff';
  matchType: 'auto' | 'user';
  wasteType: string;
  estimatedWeight: number;
  finalWeight: number;
  weightVariance: number;
  userPayout: number;
  agentEarnings: number;
  platformFee: number;
  pricePerKg: number;
  grossValue: number;
  completionTime: number;
  walletTransactionId: string;
  kgRecycled: number;
  co2Saved: number;
  sdgContribution: string;
  photoEvidence?: string[];
  userConfirmation: boolean;
  agentConfirmation: boolean;
  status: 'completed';
}

interface CompletedPickupsTableProps {
  pickups: CompletedPickup[];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onPickupClick: (pickup: CompletedPickup) => void;
}

const CompletedPickupsTable: React.FC<CompletedPickupsTableProps> = ({
  pickups,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onPickupClick,
}) => {
  const paginatedPickups = pickups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <DashboardCard>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Completed Pickups
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pickup ID</TableCell>
                <TableCell>Completion Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Agent</TableCell>
                <TableCell>City / Zone</TableCell>
                <TableCell>Pickup Mode</TableCell>
                <TableCell>Match Type</TableCell>
                <TableCell>Waste Type</TableCell>
                <TableCell>Final Weight (kg)</TableCell>
                <TableCell>User Payout</TableCell>
                <TableCell>Agent Earnings</TableCell>
                <TableCell>Platform Fee</TableCell>
                <TableCell>Completion Time</TableCell>
                <TableCell>Status</TableCell>
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
                    <Typography variant="body2">{pickup.completionDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{pickup.userName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{pickup.agentName}</Typography>
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
                    <Typography variant="body2">{pickup.wasteType.replace('_', ' ')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>{pickup.finalWeight.toFixed(1)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">₦{pickup.userPayout.toLocaleString()}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">₦{pickup.agentEarnings.toLocaleString()}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">₦{pickup.platformFee.toLocaleString()}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{pickup.completionTime} min</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      size="small" 
                      label="Completed (locked)"
                      color="success"
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

export default CompletedPickupsTable;
