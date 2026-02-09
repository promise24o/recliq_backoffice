'use client';

import React from 'react';
import {
  Box,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from '@mui/material';
import {
  Calendar,
  Download,
  Filter,
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FailedPageHeaderProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedZone: string;
  onZoneChange: (zone: string) => void;
  selectedPickupMode: string;
  onPickupModeChange: (mode: string) => void;
  selectedMatchType: string;
  onMatchTypeChange: (type: string) => void;
  selectedFailureType: string;
  onFailureTypeChange: (type: string) => void;
  selectedReason: string;
  onReasonChange: (reason: string) => void;
  onExport: () => void;
}

const FailedPageHeader: React.FC<FailedPageHeaderProps> = ({
  dateRange,
  onDateRangeChange,
  selectedCity,
  onCityChange,
  selectedZone,
  onZoneChange,
  selectedPickupMode,
  onPickupModeChange,
  selectedMatchType,
  onMatchTypeChange,
  selectedFailureType,
  onFailureTypeChange,
  selectedReason,
  onReasonChange,
  onExport,
}) => {
  return (
    <DashboardCard>
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="h4" fontWeight={600}>Failed / Cancelled Pickups</Typography>
            <Typography variant="body2" color="text.secondary">
              Pickup requests that did not complete
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                label="Date Range"
                onChange={(e) => onDateRangeChange(e.target.value)}
              >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="yesterday">Yesterday</MenuItem>
                <MenuItem value="last7">Last 7 Days</MenuItem>
                <MenuItem value="last30">Last 30 Days</MenuItem>
                <MenuItem value="thisMonth">This Month</MenuItem>
                <MenuItem value="lastMonth">Last Month</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>City</InputLabel>
              <Select
                value={selectedCity}
                label="City"
                onChange={(e) => onCityChange(e.target.value)}
              >
                <MenuItem value="all">All Cities</MenuItem>
                <MenuItem value="Port Harcourt">Port Harcourt</MenuItem>
                <MenuItem value="Lagos">Lagos</MenuItem>
                <MenuItem value="Abuja">Abuja</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Zone</InputLabel>
              <Select
                value={selectedZone}
                label="Zone"
                onChange={(e) => onZoneChange(e.target.value)}
              >
                <MenuItem value="all">All Zones</MenuItem>
                <MenuItem value="GRA">GRA</MenuItem>
                <MenuItem value="Trans-Amadi">Trans-Amadi</MenuItem>
                <MenuItem value="Old GRA">Old GRA</MenuItem>
                <MenuItem value="Rumuokoro">Rumuokoro</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Pickup Mode</InputLabel>
              <Select
                value={selectedPickupMode}
                label="Pickup Mode"
                onChange={(e) => onPickupModeChange(e.target.value)}
              >
                <MenuItem value="all">All Modes</MenuItem>
                <MenuItem value="pickup">Agent → User</MenuItem>
                <MenuItem value="dropoff">User → Agent</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Match Type</InputLabel>
              <Select
                value={selectedMatchType}
                label="Match Type"
                onChange={(e) => onMatchTypeChange(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="auto">Auto-matched</MenuItem>
                <MenuItem value="user">User-selected</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Failure Type</InputLabel>
              <Select
                value={selectedFailureType}
                label="Failure Type"
                onChange={(e) => onFailureTypeChange(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Reason</InputLabel>
              <Select
                value={selectedReason}
                label="Reason"
                onChange={(e) => onReasonChange(e.target.value)}
              >
                <MenuItem value="all">All Reasons</MenuItem>
                <MenuItem value="no_agent">No Agent Available</MenuItem>
                <MenuItem value="timeout">Matching Timeout</MenuItem>
                <MenuItem value="agent_rejection">Agent Rejection</MenuItem>
                <MenuItem value="agent_noshow">Agent No-Show</MenuItem>
                <MenuItem value="system_error">System Error</MenuItem>
                <MenuItem value="user_cancelled">User Cancelled</MenuItem>
                <MenuItem value="agent_cancelled">Agent Cancelled</MenuItem>
                <MenuItem value="ops_cancelled">Ops Cancelled</MenuItem>
                <MenuItem value="sla_breach">SLA Breach</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              onClick={onExport}
            >
              Export
            </Button>
          </Stack>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default FailedPageHeader;
