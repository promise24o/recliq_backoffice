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
import { 
  type WalletsQuery, 
  type Wallet, 
  type WalletStatus, 
  type KYCStatus,
  useWalletSearch 
} from '@/hooks/useWallets';
import { WalletSearchSkeleton } from './WalletSkeletonLoader';

interface WalletSearchProps {
  onSearch: (query: string) => void;
  onFilter: (filters: WalletsQuery) => void;
  onUserSelect?: (wallet: Wallet) => void;
  filters: WalletsQuery;
}

const WalletSearch: React.FC<WalletSearchProps> = ({ 
  onSearch, 
  onFilter, 
  onUserSelect, 
  filters 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');
  const [kycStatusFilter, setKycStatusFilter] = useState(filters.kycStatus || '');

  const { data: searchResults, isLoading } = useWalletSearch({ 
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
      onFilter({ ...filters, status: status as WalletStatus });
    }
  };

  const handleKycStatusFilter = (kycStatus: string) => {
    setKycStatusFilter(kycStatus);
    if (kycStatus === 'all') {
      const newFilters = { ...filters };
      delete newFilters.kycStatus;
      onFilter(newFilters);
    } else {
      onFilter({ ...filters, kycStatus: kycStatus as KYCStatus });
    }
  };

  const handleClearFilters = () => {
    setStatusFilter('');
    setKycStatusFilter('');
    setSearchQuery('');
    onFilter({});
    onSearch('');
  };

  const hasActiveFilters = statusFilter || kycStatusFilter || searchQuery;

  const statusOptions = [
    { value: 'all', label: 'All Status', color: 'default' },
    { value: 'normal', label: 'Normal', color: 'success' },
    { value: 'locked', label: 'Locked', color: 'error' },
    { value: 'compliance_hold', label: 'Compliance Hold', color: 'warning' },
    { value: 'negative_balance', label: 'Negative Balance', color: 'error' },
    { value: 'high_risk', label: 'High Risk', color: 'error' },
  ];

  const kycStatusOptions = [
    { value: 'all', label: 'All KYC Status', color: 'default' },
    { value: 'not_started', label: 'Not Started', color: 'default' },
    { value: 'submitted', label: 'Submitted', color: 'warning' },
    { value: 'under_review', label: 'Under Review', color: 'info' },
    { value: 'approved', label: 'Approved', color: 'success' },
    { value: 'rejected', label: 'Rejected', color: 'error' },
    { value: 'expired', label: 'Expired', color: 'error' },
  ];

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Stack spacing={2}>
        {/* Search Bar */}
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            placeholder="Search by name or phone..."
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
            sx={{ flexGrow: 1 }}
          />
          <Tooltip title="Advanced Filters">
            <Button
              variant={hasActiveFilters ? "contained" : "outlined"}
              onClick={handleClearFilters}
              startIcon={<Filter size={16} />}
            >
              Filters
              {hasActiveFilters && (
                <Chip
                  label={Object.keys(filters).filter(key => 
                    filters[key as keyof WalletsQuery] && key !== 'page' && key !== 'limit'
                  ).length}
                  size="small"
                  sx={{ ml: 1, height: 20 }}
                />
              )}
            </Button>
          </Tooltip>
        </Stack>

        {/* Search Results Dropdown */}
        {searchQuery.length >= 2 && (
          <Paper sx={{ mt: 1, maxHeight: 200, overflow: 'auto' }}>
            {isLoading ? (
              <WalletSearchSkeleton />
            ) : searchResults && searchResults.length > 0 ? (
              <Stack spacing={0}>
                {searchResults.map((wallet) => (
                  <Box
                    key={wallet.id}
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
                        onUserSelect(wallet);
                      }
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {wallet.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {wallet.phone} • {wallet.city} • Balance: ₦{wallet.availableBalance.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ) : searchQuery.length >= 2 ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No wallets found
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

          {/* Wallet Status Filter */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Wallet Status</InputLabel>
            <Select
              value={statusFilter}
              label="Wallet Status"
              onChange={(e) => handleStatusFilter(e.target.value)}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* KYC Status Filter */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>KYC Status</InputLabel>
            <Select
              value={kycStatusFilter}
              label="KYC Status"
              onChange={(e) => handleKycStatusFilter(e.target.value)}
            >
              {kycStatusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default WalletSearch;
