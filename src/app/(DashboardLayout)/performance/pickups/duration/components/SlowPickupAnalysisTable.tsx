'use client'
import React, { useState, useMemo } from 'react';
import { Box, Typography, Stack, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, InputAdornment, Chip, IconButton, MenuItem } from '@mui/material';
import { 
  IconSearch,
  IconClock,
  IconAlertTriangle,
  IconNavigation,
  IconTruck,
  IconCheck,
  IconEye,
  IconFilter,
  IconDownload
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface SlowPickupData {
  id: string;
  pickupId: string;
  userId: string;
  userName: string;
  agentId: string;
  agentName: string;
  zone: string;
  city: string;
  totalDuration: number;
  requestToAssignment: number;
  assignmentToArrival: number;
  arrivalToCompletion: number;
  slaBreach: boolean;
  delaySegment: 'assignment_delay' | 'travel_delay' | 'onsite_delay' | 'normal';
  requestTime: string;
  completionTime: string;
}

interface SlowPickupAnalysisTableProps {
  onRowClick?: (pickup: SlowPickupData) => void;
}

const SlowPickupAnalysisTable: React.FC<SlowPickupAnalysisTableProps> = ({ 
  onRowClick 
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [delayFilter, setDelayFilter] = useState<string>('all');

  // Mock slow pickup data
  const slowPickupData: SlowPickupData[] = [
    {
      id: '1',
      pickupId: 'PU001',
      userId: 'USR001',
      userName: 'John Doe',
      agentId: 'AG001',
      agentName: 'Mike Wilson',
      zone: 'Lagos Mainland',
      city: 'Lagos',
      totalDuration: 78,
      requestToAssignment: 15,
      assignmentToArrival: 45,
      arrivalToCompletion: 18,
      slaBreach: true,
      delaySegment: 'travel_delay',
      requestTime: '2024-01-15 09:30:00',
      completionTime: '2024-01-15 10:48:00'
    },
    {
      id: '2',
      pickupId: 'PU002',
      userId: 'USR002',
      userName: 'Jane Smith',
      agentId: 'AG002',
      agentName: 'Sarah Johnson',
      zone: 'GRA Phase 2',
      city: 'Lagos',
      totalDuration: 92,
      requestToAssignment: 25,
      assignmentToArrival: 52,
      arrivalToCompletion: 15,
      slaBreach: true,
      delaySegment: 'travel_delay',
      requestTime: '2024-01-15 10:15:00',
      completionTime: '2024-01-15 11:47:00'
    },
    {
      id: '3',
      pickupId: 'PU003',
      userId: 'USR003',
      userName: 'Bob Johnson',
      agentId: 'AG003',
      agentName: 'David Brown',
      zone: 'Port Harcourt',
      city: 'Port Harcourt',
      totalDuration: 65,
      requestToAssignment: 8,
      assignmentToArrival: 35,
      arrivalToCompletion: 22,
      slaBreach: true,
      delaySegment: 'onsite_delay',
      requestTime: '2024-01-15 11:00:00',
      completionTime: '2024-01-15 12:05:00'
    },
    {
      id: '4',
      pickupId: 'PU004',
      userId: 'USR004',
      userName: 'Alice Davis',
      agentId: 'AG004',
      agentName: 'Lisa Martinez',
      zone: 'Abuja Central',
      city: 'Abuja',
      totalDuration: 58,
      requestToAssignment: 18,
      assignmentToArrival: 28,
      arrivalToCompletion: 12,
      slaBreach: true,
      delaySegment: 'assignment_delay',
      requestTime: '2024-01-15 13:30:00',
      completionTime: '2024-01-15 14:28:00'
    },
    {
      id: '5',
      pickupId: 'PU005',
      userId: 'USR005',
      userName: 'Charlie Wilson',
      agentId: 'AG005',
      agentName: 'John Smith',
      zone: 'Kano',
      city: 'Kano',
      totalDuration: 84,
      requestToAssignment: 12,
      assignmentToArrival: 58,
      arrivalToCompletion: 14,
      slaBreach: true,
      delaySegment: 'travel_delay',
      requestTime: '2024-01-15 14:00:00',
      completionTime: '2024-01-15 15:24:00'
    },
    {
      id: '6',
      pickupId: 'PU006',
      userId: 'USR006',
      userName: 'Eva Martinez',
      agentId: 'AG006',
      agentName: 'Emily Davis',
      zone: 'Lagos Island',
      city: 'Lagos',
      totalDuration: 71,
      requestToAssignment: 22,
      assignmentToArrival: 38,
      arrivalToCompletion: 11,
      slaBreach: true,
      delaySegment: 'assignment_delay',
      requestTime: '2024-01-15 15:30:00',
      completionTime: '2024-01-15 16:41:00'
    },
    {
      id: '7',
      pickupId: 'PU007',
      userId: 'USR007',
      userName: 'Frank Brown',
      agentId: 'AG007',
      agentName: 'Mike Wilson',
      zone: 'Lagos Mainland',
      city: 'Lagos',
      totalDuration: 89,
      requestToAssignment: 10,
      assignmentToArrival: 62,
      arrivalToCompletion: 17,
      slaBreach: true,
      delaySegment: 'travel_delay',
      requestTime: '2024-01-15 16:00:00',
      completionTime: '2024-01-15 17:29:00'
    },
    {
      id: '8',
      pickupId: 'PU008',
      userId: 'USR008',
      userName: 'Grace Lee',
      agentId: 'AG008',
      agentName: 'Sarah Johnson',
      zone: 'GRA Phase 2',
      city: 'Lagos',
      totalDuration: 56,
      requestToAssignment: 14,
      assignmentToArrival: 32,
      arrivalToCompletion: 10,
      slaBreach: true,
      delaySegment: 'travel_delay',
      requestTime: '2024-01-15 17:00:00',
      completionTime: '2024-01-15 17:56:00'
    }
  ];

  const getColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'success.main';
      case 'warning': return 'warning.main';
      case 'error': return 'error.main';
      case 'info': return 'info.main';
      default: return 'primary.main';
    }
  };

  const getDelaySegmentColor = (segment: string) => {
    switch (segment) {
      case 'assignment_delay': return 'error';
      case 'travel_delay': return 'warning';
      case 'onsite_delay': return 'info';
      case 'normal': return 'success';
      default: return 'default';
    }
  };

  const getDelaySegmentIcon = (segment: string) => {
    switch (segment) {
      case 'assignment_delay': return <IconNavigation size={16} />;
      case 'travel_delay': return <IconTruck size={16} />;
      case 'onsite_delay': return <IconCheck size={16} />;
      case 'normal': return <IconClock size={16} />;
      default: return null;
    }
  };

  const getDelaySegmentLabel = (segment: string) => {
    switch (segment) {
      case 'assignment_delay': return 'Assignment Delay';
      case 'travel_delay': return 'Travel Delay';
      case 'onsite_delay': return 'On-site Delay';
      case 'normal': return 'Normal';
      default: return segment;
    }
  };

  const getDurationColor = (duration: number) => {
    if (duration <= 45) return 'success';
    if (duration <= 60) return 'warning';
    return 'error';
  };

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return slowPickupData.filter(pickup => {
      const matchesSearch = searchTerm === '' || 
        pickup.pickupId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pickup.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pickup.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pickup.zone.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDelayFilter = delayFilter === 'all' || pickup.delaySegment === delayFilter;

      return matchesSearch && matchesDelayFilter;
    });
  }, [searchTerm, delayFilter]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExport = () => {
    // Export functionality would be implemented here
    console.log('Exporting slow pickup data');
  };

  return (
    <DashboardCard title="Slow Pickup Analysis">
      <Box sx={{ width: '100%' }}>
        {/* Overview */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: 'error.light',
                color: 'error.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IconAlertTriangle size={24} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Delayed Pickup Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Deep dive into pickups exceeding SLA thresholds
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            size="small"
            placeholder="Search pickups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={16} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
          
          <TextField
            select
            size="small"
            label="Delay Segment"
            value={delayFilter}
            onChange={(e) => setDelayFilter(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="all">All Segments</MenuItem>
            <MenuItem value="assignment_delay">Assignment Delay</MenuItem>
            <MenuItem value="travel_delay">Travel Delay</MenuItem>
            <MenuItem value="onsite_delay">On-site Delay</MenuItem>
          </TextField>

          <IconButton onClick={handleExport} size="small">
            <IconDownload size={16} />
          </IconButton>
        </Stack>

        {/* Table */}
        <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Pickup ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Agent</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Zone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total Duration</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>SLA Breach</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Delay Segment</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((pickup) => (
                <TableRow
                  key={pickup.id}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'grey.50'
                    }
                  }}
                  onClick={() => onRowClick?.(pickup)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {pickup.pickupId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {pickup.userName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {pickup.userId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {pickup.agentName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {pickup.agentId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {pickup.zone}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {pickup.city}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      <Typography variant="body2" fontWeight={700} color={getColor(getDurationColor(pickup.totalDuration))}>
                        {pickup.totalDuration} mins
                      </Typography>
                      <Stack spacing={0.5}>
                        <Typography variant="caption" color="text.secondary">
                          Assignment: {pickup.requestToAssignment}m
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Travel: {pickup.assignmentToArrival}m
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          On-site: {pickup.arrivalToCompletion}m
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={pickup.slaBreach ? 'Breach' : 'OK'}
                      color={pickup.slaBreach ? 'error' : 'success'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getDelaySegmentIcon(pickup.delaySegment)}
                      label={getDelaySegmentLabel(pickup.delaySegment)}
                      color={getDelaySegmentColor(pickup.delaySegment) as any}
                      size="small"
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={(e) => {
                      e.stopPropagation();
                      onRowClick?.(pickup);
                    }}>
                      <IconEye size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Key Insights */}
        <Card sx={{ border: '1px solid', borderColor: 'warning.light', mt: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="warning.main">
              ⚠️ Delay Pattern Analysis
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Primary Delay Causes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Travel delays account for 62.5% of SLA breaches - routing optimization needed
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Assignment delays represent 25% of issues - dispatch system improvements
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • On-site delays at 12.5% - agent training and equipment optimization
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Geographic Patterns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Lagos Mainland shows highest delay frequency - traffic congestion issues
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Kano experiences longest delays (84+ mins) - agent density problems
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • GRA Phase 2 performs best despite volume - optimized operations
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Agent Performance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Mike Wilson and Sarah Johnson appear frequently - workload balance issues
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Travel delays dominate across all agents - systemic routing problems
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            💡 Optimization Actions
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Implement dynamic routing to reduce travel delays by 30%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Increase agent density in Lagos Mainland and Kano zones
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Optimize dispatch algorithm to reduce assignment delays
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Provide additional equipment and training for on-site efficiency
            </Typography>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default SlowPickupAnalysisTable;
