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

interface CompletedPageHeaderProps {
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
  selectedWasteType: string;
  onWasteTypeChange: (type: string) => void;
  selectedAgent: string;
  onAgentChange: (agent: string) => void;
  onExport: (format: 'csv' | 'finance') => void;
}

const CompletedPageHeader: React.FC<CompletedPageHeaderProps> = ({
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
  selectedWasteType,
  onWasteTypeChange,
  selectedAgent,
  onAgentChange,
  onExport,
}) => {
  return (
    <DashboardCard>
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="h4" fontWeight={600}>Completed Pickups</Typography>
            <Typography variant="body2" color="text.secondary">
              Verified recycling pickups successfully fulfilled
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
              <InputLabel>Waste Type</InputLabel>
              <Select
                value={selectedWasteType}
                label="Waste Type"
                onChange={(e) => onWasteTypeChange(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="plastic">Plastic</MenuItem>
                <MenuItem value="paper">Paper</MenuItem>
                <MenuItem value="metal">Metal</MenuItem>
                <MenuItem value="glass">Glass</MenuItem>
                <MenuItem value="organic">Organic</MenuItem>
                <MenuItem value="e_waste">E-Waste</MenuItem>
                <MenuItem value="mixed">Mixed</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              placeholder="Agent ID/Name"
              value={selectedAgent}
              onChange={(e) => onAgentChange(e.target.value)}
              sx={{ minWidth: 120 }}
            />

            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              onClick={() => onExport('csv')}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Download size={16} />}
              onClick={() => onExport('finance')}
            >
              Finance
            </Button>
          </Stack>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default CompletedPageHeader;
