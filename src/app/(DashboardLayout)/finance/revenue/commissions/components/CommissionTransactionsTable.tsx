'use client'
import React, { useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  Avatar,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Box,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination
} from '@mui/material';
import { 
  IconEye, 
  IconSearch,
  IconFilter,
  IconDownload,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface CommissionData {
  id: string;
  date: string;
  agent: {
    name: string;
    avatar: string;
    email: string;
  };
  pickupId: string;
  pickupType: 'user' | 'b2b' | 'dropoff';
  grossValue: number;
  commission: number;
  rate: number;
  netPayout: number;
  material: string;
  weight: number;
  location: string;
}

interface CommissionTransactionsTableProps {
  onRowClick: (commission: CommissionData) => void;
}

const CommissionTransactionsTable: React.FC<CommissionTransactionsTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rateFilter, setRateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data
  const mockCommissions: CommissionData[] = [
    {
      id: '1',
      date: '2024-01-15',
      agent: {
        name: 'Ahmed Bello',
        avatar: 'AB',
        email: 'ahmed.bello@recliq.com'
      },
      pickupId: 'PU-2024-0142',
      pickupType: 'user',
      grossValue: 25000,
      commission: 3000,
      rate: 12,
      netPayout: 22000,
      material: 'PET',
      weight: 45.5,
      location: 'Lagos Mainland'
    },
    {
      id: '2',
      date: '2024-01-15',
      agent: {
        name: 'Fatima Ibrahim',
        avatar: 'FI',
        email: 'fatima.ibrahim@recliq.com'
      },
      pickupId: 'PU-2024-0143',
      pickupType: 'b2b',
      grossValue: 45000,
      commission: 5400,
      rate: 12,
      netPayout: 39600,
      material: 'Metal',
      weight: 78.2,
      location: 'Lagos Island'
    },
    {
      id: '3',
      date: '2024-01-14',
      agent: {
        name: 'Chukwu Okafor',
        avatar: 'CO',
        email: 'chukwu.okafor@recliq.com'
      },
      pickupId: 'PU-2024-0144',
      pickupType: 'user',
      grossValue: 18000,
      commission: 2160,
      rate: 12,
      netPayout: 15840,
      material: 'E-waste',
      weight: 12.3,
      location: 'Abuja'
    },
    {
      id: '4',
      date: '2024-01-14',
      agent: {
        name: 'Amina Yusuf',
        avatar: 'AY',
        email: 'amina.yusuf@recliq.com'
      },
      pickupId: 'PU-2024-0145',
      pickupType: 'dropoff',
      grossValue: 12000,
      commission: 960,
      rate: 8,
      netPayout: 11040,
      material: 'Mixed',
      weight: 34.7,
      location: 'Port Harcourt'
    },
    {
      id: '5',
      date: '2024-01-13',
      agent: {
        name: 'Tunde Adekunle',
        avatar: 'TA',
        email: 'tunde.adekunle@recliq.com'
      },
      pickupId: 'PU-2024-0146',
      pickupType: 'b2b',
      grossValue: 67000,
      commission: 8040,
      rate: 12,
      netPayout: 58960,
      material: 'PET',
      weight: 123.8,
      location: 'Lagos Mainland'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      date: `2024-01-${12 - (i % 10)}`,
      agent: {
        name: `Agent ${i + 6}`,
        avatar: `A${i + 6}`,
        email: `agent${i + 6}@recliq.com`
      },
      pickupId: `PU-2024-${1400 + i + 6}`,
      pickupType: ['user', 'b2b', 'dropoff'][i % 3] as 'user' | 'b2b' | 'dropoff',
      grossValue: 15000 + (i * 1000),
      commission: 1500 + (i * 100),
      rate: [8, 10, 12][i % 3],
      netPayout: 13500 + (i * 900),
      material: ['PET', 'Metal', 'E-waste', 'Mixed'][i % 4],
      weight: 20 + (i * 5),
      location: ['Lagos Mainland', 'Lagos Island', 'Abuja', 'Port Harcourt'][i % 4]
    }))
  ];

  const filteredCommissions = useMemo(() => {
    return mockCommissions.filter(commission => {
      const matchesSearch = searchQuery === '' || 
        commission.agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        commission.pickupId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        commission.material.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRate = rateFilter === 'all' || commission.rate.toString() === rateFilter;
      const matchesType = typeFilter === 'all' || commission.pickupType === typeFilter;
      
      return matchesSearch && matchesRate && matchesType;
    });
  }, [mockCommissions, searchQuery, rateFilter, typeFilter]);

  const paginatedCommissions = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredCommissions.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredCommissions, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredCommissions.length / rowsPerPage);

  const getPickupTypeColor = (type: string) => {
    switch (type) {
      case 'user': return 'primary';
      case 'b2b': return 'success';
      case 'dropoff': return 'info';
      default: return 'default';
    }
  };

  const getPickupTypeLabel = (type: string) => {
    switch (type) {
      case 'user': return 'User Pickup';
      case 'b2b': return 'B2B Pickup';
      case 'dropoff': return 'Drop-off';
      default: return type;
    }
  };

  const handleExport = () => {
    const headers = [
      'Date',
      'Agent',
      'Pickup ID',
      'Pickup Type',
      'Gross Value (₦)',
      'Commission (₦)',
      'Rate (%)',
      'Net Payout (₦)'
    ];

    const rows = paginatedCommissions.map(item => [
      item.date,
      item.agent.name,
      item.pickupId,
      getPickupTypeLabel(item.pickupType),
      item.grossValue.toString(),
      item.commission.toString(),
      item.rate.toString(),
      item.netPayout.toString()
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'commission-transactions.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Commission Transactions">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search agent, pickup ID, or material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={16} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Rate Filter</InputLabel>
            <Select
              value={rateFilter}
              label="Rate Filter"
              onChange={(e) => setRateFilter(e.target.value)}
            >
              <MenuItem value="all">All Rates</MenuItem>
              <MenuItem value="8">8%</MenuItem>
              <MenuItem value="10">10%</MenuItem>
              <MenuItem value="12">12%</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type Filter</InputLabel>
            <Select
              value={typeFilter}
              label="Type Filter"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="user">User Pickup</MenuItem>
              <MenuItem value="b2b">B2B Pickup</MenuItem>
              <MenuItem value="dropoff">Drop-off</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flex: 1 }} />

          <Button
            variant="outlined"
            size="small"
            startIcon={<IconDownload size={16} />}
            onClick={handleExport}
          >
            Export CSV
          </Button>
        </Stack>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Agent</TableCell>
                <TableCell>Pickup ID</TableCell>
                <TableCell>Pickup Type</TableCell>
                <TableCell align="right">Gross Value (₦)</TableCell>
                <TableCell align="right">Commission (₦)</TableCell>
                <TableCell align="center">Rate</TableCell>
                <TableCell align="right">Net Payout (₦)</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCommissions.map((commission) => (
                <TableRow
                  key={commission.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(commission)}
                >
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(commission.date).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                          fontSize: '0.875rem',
                          fontWeight: 600
                        }}
                      >
                        {commission.agent.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {commission.agent.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {commission.agent.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                      {commission.pickupId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={getPickupTypeLabel(commission.pickupType)}
                      color={getPickupTypeColor(commission.pickupType) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      ₦{commission.grossValue.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      ₦{commission.commission.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={`${commission.rate}%`}
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      ₦{commission.netPayout.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(commission);
                        }}
                      >
                        <IconEye size={16} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredCommissions.length)} of {filteredCommissions.length} entries
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default CommissionTransactionsTable;
