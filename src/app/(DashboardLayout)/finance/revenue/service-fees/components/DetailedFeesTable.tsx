import React, { useState, useEffect } from 'react';
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
  Divider,
  Button,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  Grid
} from '@mui/material';
import {
  IconEye,
  IconReceipt,
  IconTruck,
  IconPackage,
  IconAlertTriangle,
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconFilter,
  IconDownload
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FeeData {
  id: string;
  date: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  pickupId: string;
  feeType: 'transaction' | 'weight' | 'convenience' | 'penalty';
  material: string;
  weight: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'reversed';
}

interface ColumnFilter {
  id: string;
  value: string;
}

interface DetailedFeesTableProps {
  searchQuery: string;
  onRowClick: (fee: FeeData) => void;
}

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounce?: number;
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  placeholder = 'Search...',
  debounce = 500
}) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconSearch size={16} />
          </InputAdornment>
        ),
      }}
      sx={{ minWidth: 120 }}
    />
  );
};

const ColumnFilter: React.FC<{
  column: string;
  value: string;
  onChange: (value: string) => void;
  options?: string[];
}> = ({ column, value, onChange, options }) => {
  if (options) {
    return (
      <Select
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ minWidth: 120 }}
        displayEmpty
      >
        <MenuItem value="">All</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </Select>
    );
  }

  return <DebouncedInput value={value} onChange={onChange} placeholder="Filter..." />;
};

const DetailedFeesTable: React.FC<DetailedFeesTableProps> = ({ searchQuery, onRowClick }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof FeeData; direction: 'asc' | 'desc' } | null>(null);

  const mockData: FeeData[] = [
    {
      id: '1',
      date: '2024-01-15',
      user: { name: 'John Adebayo', avatar: 'JA', email: 'john.a@email.com' },
      pickupId: 'PK-2024-001234',
      feeType: 'transaction',
      material: 'PET Plastic',
      weight: '12.5 kg',
      amount: 450,
      status: 'completed',
    },
    {
      id: '2',
      date: '2024-01-15',
      user: { name: 'Musa Kano', avatar: 'MK', email: 'musa.k@email.com' },
      pickupId: 'PK-2024-001235',
      feeType: 'weight',
      material: 'Metal',
      weight: '8.3 kg',
      amount: 320,
      status: 'completed',
    },
    {
      id: '3',
      date: '2024-01-14',
      user: { name: 'Blessing Okoro', avatar: 'BO', email: 'blessing.o@email.com' },
      pickupId: 'PK-2024-001236',
      feeType: 'convenience',
      material: 'Mixed',
      weight: '15.2 kg',
      amount: 180,
      status: 'pending',
    },
    {
      id: '4',
      date: '2024-01-14',
      user: { name: 'Ahmed Yusuf', avatar: 'AY', email: 'ahmed.y@email.com' },
      pickupId: 'PK-2024-001237',
      feeType: 'transaction',
      material: 'E-waste',
      weight: '5.8 kg',
      amount: 280,
      status: 'completed',
    },
    {
      id: '5',
      date: '2024-01-13',
      user: { name: 'Fatima Bello', avatar: 'FB', email: 'fatima.b@email.com' },
      pickupId: 'PK-2024-001238',
      feeType: 'penalty',
      material: 'Glass',
      weight: '3.2 kg',
      amount: -50,
      status: 'reversed',
    },
    {
      id: '6',
      date: '2024-01-13',
      user: { name: 'Chidi Okafor', avatar: 'CO', email: 'chidi.o@email.com' },
      pickupId: 'PK-2024-001239',
      feeType: 'weight',
      material: 'PET Plastic',
      weight: '18.7 kg',
      amount: 520,
      status: 'completed',
    },
    {
      id: '7',
      date: '2024-01-12',
      user: { name: 'Aisha Lawal', avatar: 'AL', email: 'aisha.l@email.com' },
      pickupId: 'PK-2024-001240',
      feeType: 'transaction',
      material: 'Metal',
      weight: '9.4 kg',
      amount: 380,
      status: 'failed',
    },
    {
      id: '8',
      date: '2024-01-12',
      user: { name: 'David Eze', avatar: 'DE', email: 'david.e@email.com' },
      pickupId: 'PK-2024-001241',
      feeType: 'convenience',
      material: 'Mixed',
      weight: '11.1 kg',
      amount: 150,
      status: 'completed',
    },
    {
      id: '9',
      date: '2024-01-11',
      user: { name: 'Grace Peters', avatar: 'GP', email: 'grace.p@email.com' },
      pickupId: 'PK-2024-001242',
      feeType: 'transaction',
      material: 'PET Plastic',
      weight: '14.3 kg',
      amount: 410,
      status: 'completed',
    },
    {
      id: '10',
      date: '2024-01-11',
      user: { name: 'Samuel Ade', avatar: 'SA', email: 'samuel.a@email.com' },
      pickupId: 'PK-2024-001243',
      feeType: 'weight',
      material: 'Metal',
      weight: '7.8 kg',
      amount: 290,
      status: 'pending',
    },
  ];

  const uniqueFeeTypes = Array.from(new Set(mockData.map(item => item.feeType)));
  const uniqueMaterials = Array.from(new Set(mockData.map(item => item.material)));
  const uniqueStatuses = Array.from(new Set(mockData.map(item => item.status)));

  const handleColumnFilterChange = (columnId: string, value: string) => {
    setColumnFilters(prev => {
      const existing = prev.filter(f => f.id !== columnId);
      if (value) return [...existing, { id: columnId, value }];
      return existing;
    });
  };

  const getColumnFilterValue = (columnId: string) => {
    const filter = columnFilters.find(f => f.id === columnId);
    return filter?.value || '';
  };

  const filteredData = mockData.filter((fee) => {
    const globalSearch = searchQuery.toLowerCase();
    const matchesGlobal =
      fee.user.name.toLowerCase().includes(globalSearch) ||
      fee.pickupId.toLowerCase().includes(globalSearch) ||
      fee.user.email.toLowerCase().includes(globalSearch);

    const matchesColumnFilters = columnFilters.every(filter => {
      const searchValue = filter.value.toLowerCase();
      switch (filter.id) {
        case 'feeType': return fee.feeType.toLowerCase().includes(searchValue);
        case 'material': return fee.material.toLowerCase().includes(searchValue);
        case 'status': return fee.status.toLowerCase().includes(searchValue);
        default: return true;
      }
    });

    return matchesGlobal && matchesColumnFilters;
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  const handleSort = (key: keyof FeeData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getFeeTypeIcon = (type: string) => {
    switch (type) {
      case 'transaction': return <IconReceipt size={16} />;
      case 'weight': return <IconPackage size={16} />;
      case 'convenience': return <IconTruck size={16} />;
      case 'penalty': return <IconAlertTriangle size={16} />;
      default: return <IconReceipt size={16} />;
    }
  };

  const getFeeTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace('transaction', 'Transaction').replace('weight', 'Weight-Based');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      case 'reversed': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDownload = () => {
    const headers = ["Date", "User", "Email", "Pickup ID", "Fee Type", "Material", "Weight", "Amount", "Status"];
    const rows = sortedData.map(item => [
      new Date(item.date).toLocaleDateString(),
      item.user.name,
      item.user.email,
      item.pickupId,
      getFeeTypeLabel(item.feeType),
      item.material,
      item.weight,
      `₦${Math.abs(item.amount).toLocaleString()}`,
      getStatusLabel(item.status)
    ]);

    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "detailed-fees-data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Detailed Fees Audit">
      <Box sx={{ width: '100%' }}>
        <TableContainer sx={{
          maxHeight: 600,
          '& .MuiTableCell-root': { py: 1.5, px: 1 },
          '& .MuiTableCell-head': { fontWeight: 600, bgcolor: 'grey.50' }
        }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 100 }}>
                  <Typography variant="subtitle2" sx={{ cursor: 'pointer' }} onClick={() => handleSort('date')}>
                    Date
                    {sortConfig?.key === 'date' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
                  </Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 200 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>User</Typography>
                  <DebouncedInput
                    value={getColumnFilterValue('user')}
                    onChange={(v) => handleColumnFilterChange('user', v)}
                    placeholder="Search user..."
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 140 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Pickup ID</Typography>
                  <DebouncedInput
                    value={getColumnFilterValue('pickupId')}
                    onChange={(v) => handleColumnFilterChange('pickupId', v)}
                    placeholder="Search ID..."
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 140 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Fee Type</Typography>
                  <ColumnFilter
                    column="feeType"
                    value={getColumnFilterValue('feeType')}
                    onChange={(v) => handleColumnFilterChange('feeType', v)}
                    options={uniqueFeeTypes}
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 120 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Material</Typography>
                  <ColumnFilter
                    column="material"
                    value={getColumnFilterValue('material')}
                    onChange={(v) => handleColumnFilterChange('material', v)}
                    options={uniqueMaterials}
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 100 }} align="right">
                  <Typography variant="subtitle2" sx={{ cursor: 'pointer' }} onClick={() => handleSort('weight')}>
                    Weight
                    {sortConfig?.key === 'weight' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
                  </Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 110 }} align="right">
                  <Typography variant="subtitle2" sx={{ cursor: 'pointer' }} onClick={() => handleSort('amount')}>
                    Amount (₦)
                    {sortConfig?.key === 'amount' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
                  </Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 110 }} align="center">
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Status</Typography>
                  <ColumnFilter
                    column="status"
                    value={getColumnFilterValue('status')}
                    onChange={(v) => handleColumnFilterChange('status', v)}
                    options={uniqueStatuses}
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 80 }} align="center">
                  <Typography variant="subtitle2">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((fee) => (
                <TableRow
                  key={fee.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(fee)}
                >
                  <TableCell>{new Date(fee.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.8rem' }}>
                        {fee.user.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{fee.user.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{fee.user.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">{fee.pickupId}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getFeeTypeIcon(fee.feeType)}
                      <Typography variant="body2">{getFeeTypeLabel(fee.feeType)}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{fee.material}</TableCell>
                  <TableCell align="right">{fee.weight}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600} color={fee.amount < 0 ? 'error.main' : 'success.main'}>
                      ₦{Math.abs(fee.amount).toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip size="small" label={getStatusLabel(fee.status)} color={getStatusColor(fee.status) as any} variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); onRowClick(fee); }}>
                        <IconEye size={16} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardCard>
  );
};

export default DetailedFeesTable;