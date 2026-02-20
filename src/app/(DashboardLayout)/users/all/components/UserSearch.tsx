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
} from '@mui/material';
import {
  Search,
  Filter,
  X,
  Calendar,
} from 'lucide-react';
import { useUserSearch } from '@/hooks/useUsers';
import { UserSearchSkeleton } from './UserSkeletonLoader';

interface UserSearchProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
  onUserSelect?: (user: any) => void;
  filters: any;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch, onFilter, onUserSelect, filters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: searchResults, isLoading } = useUserSearch({ 
    q: searchQuery, 
    limit: 5 
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterClick = (filterKey: string, filterValue: string) => {
    const newFilters = { ...filters };
    if (newFilters[filterKey] === filterValue) {
      delete newFilters[filterKey];
    } else {
      newFilters[filterKey] = filterValue;
    }
    onFilter(newFilters);
  };

  const clearFilters = () => {
    onFilter({});
  };

  const activeFilterCount = Object.keys(filters).filter(key => 
    filters[key] && key !== 'page' && key !== 'limit'
  ).length;

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Stack spacing={2}>
        {/* Search Bar */}
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <Search size={20} color="#6B7280" style={{ marginRight: 8 }} />,
            }}
            sx={{ flexGrow: 1 }}
          />
          <Tooltip title="Advanced Filters">
            <Button
              variant={showFilters ? "contained" : "outlined"}
              onClick={() => setShowFilters(!showFilters)}
              startIcon={<Filter size={16} />}
            >
              Filters
              {activeFilterCount > 0 && (
                <Chip
                  label={activeFilterCount}
                  size="small"
                  sx={{ ml: 1, height: 20 }}
                />
              )}
            </Button>
          </Tooltip>
        </Stack>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Typography variant="caption" color="text.secondary">
              Active filters:
            </Typography>
            {Object.entries(filters).map(([key, value]) => {
              if (!value || key === 'page' || key === 'limit') return null;
              return (
                <Chip
                  key={key}
                  label={`${key}: ${value}`}
                  size="small"
                  onDelete={() => handleFilterClick(key, value as string)}
                  deleteIcon={<X size={14} />}
                />
              );
            })}
            <Button
              size="small"
              onClick={clearFilters}
              sx={{ ml: 1 }}
            >
              Clear All
            </Button>
          </Stack>
        )}

        {/* Advanced Filters */}
        {showFilters && (
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Status:
              </Typography>
              {['active', 'dormant', 'churned', 'suspended'].map((status) => (
                <Chip
                  key={status}
                  label={status.charAt(0).toUpperCase() + status.slice(1)}
                  clickable
                  color={filters.status === status ? "primary" : "default"}
                  variant={filters.status === status ? "filled" : "outlined"}
                  onClick={() => handleFilterClick('status', status)}
                  size="small"
                />
              ))}
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Type:
              </Typography>
              {['individual', 'enterprise', 'agent'].map((type) => (
                <Chip
                  key={type}
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  clickable
                  color={filters.type === type ? "primary" : "default"}
                  variant={filters.type === type ? "filled" : "outlined"}
                  onClick={() => handleFilterClick('type', type)}
                  size="small"
                />
              ))}
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Date Range:
              </Typography>
              <Button
                size="small"
                variant={filters.dateRange ? "contained" : "outlined"}
                startIcon={<Calendar size={14} />}
                onClick={() => {
                  // TODO: Implement date range picker
                  console.log('Date range picker');
                }}
              >
                {filters.dateRange || 'Select Range'}
              </Button>
            </Stack>
          </Stack>
        )}

        {/* Search Results Dropdown */}
        {searchQuery.length >= 2 && (
          <Paper sx={{ mt: 1, maxHeight: 200, overflow: 'auto' }}>
            {isLoading ? (
              <UserSearchSkeleton />
            ) : searchResults && searchResults.length > 0 ? (
              <Stack spacing={0}>
                {searchResults.map((user) => (
                  <Box
                    key={user.id}
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
                        onUserSelect(user);
                      }
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.email} • {user.phone}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ) : searchQuery.length >= 2 ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No users found
                </Typography>
              </Box>
            ) : null}
          </Paper>
        )}
      </Stack>
    </Paper>
  );
};

export default UserSearch;
