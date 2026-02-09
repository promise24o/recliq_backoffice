'use client';

import React from 'react';
import {
  Box,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import {
  Calendar,
  Clock,
  Download,
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface SchedulePageHeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedPickupType: string;
  onPickupTypeChange: (type: string) => void;
  onExport: (format: 'csv' | 'pdf') => void;
}

const SchedulePageHeader: React.FC<SchedulePageHeaderProps> = ({
  selectedDate,
  onDateChange,
  selectedCity,
  onCityChange,
  selectedStatus,
  onStatusChange,
  selectedPickupType,
  onPickupTypeChange,
  onExport,
}) => {
  return (
    <DashboardCard>
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="h4" fontWeight={600}>Scheduled Pickups</Typography>
            <Typography variant="body2" color="text.secondary">
              Upcoming and planned recycling jobs
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <ToggleButtonGroup
              value={selectedDate}
              exclusive
              onChange={(e, newDate) => newDate && onDateChange(newDate)}
              size="small"
            >
              <ToggleButton value="today">
                <Calendar size={16} style={{ marginRight: 4 }} />
                Today
              </ToggleButton>
              <ToggleButton value="tomorrow">
                <Clock size={16} style={{ marginRight: 4 }} />
                Tomorrow
              </ToggleButton>
              <ToggleButton value="custom">
                <Calendar size={16} style={{ marginRight: 4 }} />
                Custom
              </ToggleButton>
            </ToggleButtonGroup>

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
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={(e) => onStatusChange(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="assigned">Assigned</MenuItem>
                <MenuItem value="agent_confirmed">Agent Confirmed</MenuItem>
                <MenuItem value="at_risk">At Risk</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={selectedPickupType}
                label="Type"
                onChange={(e) => onPickupTypeChange(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="pickup">Pickup</MenuItem>
                <MenuItem value="dropoff">Drop-off</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              onClick={() => onExport('csv')}
            >
              Export
            </Button>
          </Stack>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default SchedulePageHeader;
