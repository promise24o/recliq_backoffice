'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Truck,
  MapPin,
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';
import type { PickupDifferential } from '../types';
import {
  getWasteTypeColor,
  getWasteTypeLabel,
  getStatusColor,
  getStatusLabel,
  formatRate,
} from '../mockData';

interface DropoffPickupDifferentialsPanelProps {
  differentials: PickupDifferential[];
}

const DropoffPickupDifferentialsPanel: React.FC<DropoffPickupDifferentialsPanelProps> = ({
  differentials,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box mb={3}>
        <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
          <Truck size={20} color="#3B82F6" />
          <Typography variant="h6" fontWeight="600">
            Drop-off vs Pickup Differentials
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Encourage cost-efficient behavior through pricing incentives
        </Typography>
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Waste Type</TableCell>
              <TableCell align="center">Drop-off Discount</TableCell>
              <TableCell align="center">Pickup Premium</TableCell>
              <TableCell align="center">Distance Modifier</TableCell>
              <TableCell>Effective</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {differentials.map((diff) => (
              <TableRow key={diff.id} hover>
                <TableCell>
                  <Chip
                    label={getWasteTypeLabel(diff.wasteType)}
                    size="small"
                    sx={{
                      bgcolor: getWasteTypeColor(diff.wasteType) + '15',
                      color: getWasteTypeColor(diff.wasteType),
                      fontSize: '0.7rem',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  {diff.dropoffDiscountPercent > 0 ? (
                    <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                      <ArrowDownRight size={14} color="#10B981" />
                      <Typography variant="body2" fontWeight="600" color="#10B981">
                        {diff.dropoffDiscountPercent}%
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography variant="body2" color="text.secondary">—</Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  {diff.pickupPremiumPercent > 0 ? (
                    <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                      <ArrowUpRight size={14} color="#F59E0B" />
                      <Typography variant="body2" fontWeight="600" color="#F59E0B">
                        +{diff.pickupPremiumPercent}%
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography variant="body2" color="text.secondary">—</Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  {diff.distanceModifierPerKm > 0 ? (
                    <Typography variant="body2" fontWeight="500">
                      {formatRate(diff.distanceModifierPerKm)}/km
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">—</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="caption">
                    {new Date(diff.effectiveDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(diff.status)}
                    size="small"
                    sx={{
                      bgcolor: getStatusColor(diff.status) + '15',
                      color: getStatusColor(diff.status),
                      fontSize: '0.65rem',
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Pickup premiums increase agent payouts to cover logistics. Drop-off discounts reduce platform cost. Distance modifiers apply per-km surcharges for pickup mode.
        </Typography>
      </Box>
    </Paper>
  );
};

export default DropoffPickupDifferentialsPanel;
