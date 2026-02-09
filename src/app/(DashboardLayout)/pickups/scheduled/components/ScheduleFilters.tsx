'use client';

import React from 'react';
import {
  Box,
  Stack,
  TextField,
  Button,
} from '@mui/material';
import {
  Search,
  RefreshCw,
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ScheduleFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onRefresh: () => void;
  loading: boolean;
}

const ScheduleFilters: React.FC<ScheduleFiltersProps> = ({
  searchTerm,
  onSearchChange,
  onRefresh,
  loading,
}) => {
  return (
    <DashboardCard>
      <Box sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            placeholder="Search by pickup ID, user name, or phone"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: <Search size={16} style={{ marginRight: 8 }} />,
            }}
            sx={{ minWidth: 300 }}
          />
          
          <Button
            variant="outlined"
            startIcon={<RefreshCw size={16} />}
            onClick={onRefresh}
            disabled={loading}
          >
            Refresh
          </Button>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default ScheduleFilters;
