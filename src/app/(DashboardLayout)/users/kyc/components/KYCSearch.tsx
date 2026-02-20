'use client';
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Stack,
  Paper,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Search, Filter, X, RefreshCw } from 'lucide-react';
import { type KYCQuery, type KYCRecord, useKYCSearch } from '@/hooks/useKYC';
import { KYCSearchSkeleton } from './KYCSkeletonLoader';

interface KYCSearchProps {
  onSearch: (query: string) => void;
  onFilter: (filters: KYCQuery) => void;
  onUserSelect?: (record: KYCRecord) => void;
  filters: KYCQuery;
}

const KYCSearch: React.FC<KYCSearchProps> = ({ onSearch, onFilter, onUserSelect, filters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');
  const [userTypeFilter, setUserTypeFilter] = useState(filters.userType || '');

  const { data: searchResults, isLoading } = useKYCSearch({ 
    q: searchQuery, 
    limit: 5 
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    if (status === 'all') {
      const newFilters = { ...filters };
      delete newFilters.status;
      onFilter(newFilters);
    } else {
      onFilter({ ...filters, status: status as any });
    }
  };

  const handleUserTypeFilter = (userType: string) => {
    setUserTypeFilter(userType);
    if (userType === 'all') {
      const newFilters = { ...filters };
      delete newFilters.userType;
      onFilter(newFilters);
    } else {
      onFilter({ ...filters, userType: userType as any });
    }
  };

  const handleClearFilters = () => {
    setStatusFilter('');
    setUserTypeFilter('');
    setSearchQuery('');
    onFilter({});
    onSearch('');
  };

  const hasActiveFilters = statusFilter || userTypeFilter || searchQuery;

  const statusOptions = [
    { value: 'all', label: 'All Status', color: 'default' },
    { value: 'pending', label: 'Pending', color: 'warning' },
    { value: 'in_progress', label: 'In Progress', color: 'info' },
    { value: 'verified', label: 'Verified', color: 'success' },
    { value: 'rejected', label: 'Rejected', color: 'error' },
  ];

  const userTypeOptions = [
    { value: 'all', label: 'All Types', color: 'default' },
    { value: 'individual', label: 'Individual', color: 'primary' },
    { value: 'enterprise', label: 'Enterprise', color: 'success' },
    { value: 'agent', label: 'Agent', color: 'secondary' },
  ];

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Stack spacing={2}>
        {/* Search Bar */}
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <Search size={20} style={{ marginRight: 8, color: '#6B7280' }} />,
              endAdornment: searchQuery && (
                <IconButton size="small" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </IconButton>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Stack>

        {/* Search Results Dropdown */}
        {searchQuery.length >= 2 && (
          <Paper sx={{ mt: 1, maxHeight: 200, overflow: 'auto' }}>
            {isLoading ? (
              <KYCSearchSkeleton />
            ) : searchResults && searchResults.length > 0 ? (
              <Stack spacing={0}>
                {searchResults.map((record) => (
                  <Box
                    key={record.userId}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'grey.50' },
                    }}
                    onClick={() => {
                      // Handle user selection - clear search and select user
                      setSearchQuery('');
                      onSearch('');
                      if (onUserSelect) {
                        onUserSelect(record);
                      }
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {record.userDetails?.name || `User ${record.userId.slice(0, 8)}`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {record.userDetails?.email || record.userDetails?.phone || `ID: ${record.userId.slice(-6)}`} • {record.userType}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ) : searchQuery.length >= 2 ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No KYC records found
                </Typography>
              </Box>
            ) : null}
          </Paper>
        )}

        {/* Filters */}
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Typography variant="body2" fontWeight={500} sx={{ mr: 1 }}>
            Filters:
          </Typography>

          {/* Status Filter */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => handleStatusFilter(e.target.value)}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* User Type Filter */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>User Type</InputLabel>
            <Select
              value={userTypeFilter}
              label="User Type"
              onChange={(e) => handleUserTypeFilter(e.target.value)}
            >
              {userTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Active Filter Chips */}
          {statusFilter && statusFilter !== 'all' && (
            <Chip
              label={`Status: ${statusOptions.find(opt => opt.value === statusFilter)?.label}`}
              onDelete={() => handleStatusFilter('all')}
              color={statusOptions.find(opt => opt.value === statusFilter)?.color as any}
              size="small"
            />
          )}

          {userTypeFilter && userTypeFilter !== 'all' && (
            <Chip
              label={`Type: ${userTypeOptions.find(opt => opt.value === userTypeFilter)?.label}`}
              onDelete={() => handleUserTypeFilter('all')}
              color={userTypeOptions.find(opt => opt.value === userTypeFilter)?.color as any}
              size="small"
            />
          )}

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<X size={16} />}
              onClick={handleClearFilters}
              sx={{ ml: 'auto' }}
            >
              Clear All
            </Button>
          )}
        </Stack>

        {/* Quick Filter Pills */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Quick filters:
          </Typography>
          <Chip
            label="Pending Only"
            size="small"
            variant="outlined"
            clickable
            onClick={() => handleStatusFilter('pending')}
            color={statusFilter === 'pending' ? 'warning' : 'default'}
          />
          <Chip
            label="Verified Only"
            size="small"
            variant="outlined"
            clickable
            onClick={() => handleStatusFilter('verified')}
            color={statusFilter === 'verified' ? 'success' : 'default'}
          />
          <Chip
            label="Enterprise"
            size="small"
            variant="outlined"
            clickable
            onClick={() => handleUserTypeFilter('enterprise')}
            color={userTypeFilter === 'enterprise' ? 'success' : 'default'}
          />
          <Chip
            label="Individual"
            size="small"
            variant="outlined"
            clickable
            onClick={() => handleUserTypeFilter('individual')}
            color={userTypeFilter === 'individual' ? 'primary' : 'default'}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default KYCSearch;
