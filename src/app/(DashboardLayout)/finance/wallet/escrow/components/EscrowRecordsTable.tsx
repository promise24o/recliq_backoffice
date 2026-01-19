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
  IconTruck,
  IconReceipt,
  IconBriefcase,
  IconUsers,
  IconBuilding,
  IconClock,
  IconCheck,
  IconX,
  IconAlertTriangle
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

export interface EscrowData {
  id: string;
  escrowId: string;
  source: 'user_payment' | 'enterprise_payment';
  counterparty: 'agent' | 'user' | 'enterprise_client';
  amount: number;
  reason: 'verification' | 'dispute' | 'compliance_hold' | 'scheduled_release';
  heldSince: string;
  status: 'active' | 'released' | 'refunded';
  linkedWork?: {
    pickupId?: string;
    invoiceId?: string;
    jobId?: string;
  };
  agent?: {
    name: string;
    email: string;
  };
  user?: {
    name: string;
    email: string;
  };
  enterprise?: {
    name: string;
    email: string;
  };
  releaseCondition?: string;
  slaDeadline?: string;
  holdStartTime: string;
}

interface EscrowRecordsTableProps {
  onRowClick: (escrow: EscrowData) => void;
}

const EscrowRecordsTable: React.FC<EscrowRecordsTableProps> = ({ onRowClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [reasonFilter, setReasonFilter] = useState('all');

  // Mock data
  const escrowData: EscrowData[] = [
    {
      id: '1',
      escrowId: 'ESC-2024-001',
      source: 'user_payment',
      counterparty: 'agent',
      amount: 150000,
      reason: 'verification',
      heldSince: '2024-01-15 14:30:00',
      status: 'active',
      linkedWork: {
        pickupId: 'PU-2024-1234'
      },
      agent: {
        name: 'John Doe',
        email: 'john.doe@recliq.com'
      },
      releaseCondition: 'Weight confirmation pending',
      slaDeadline: '2024-01-18 14:30:00',
      holdStartTime: '2024-01-15 14:30:00'
    },
    {
      id: '2',
      escrowId: 'ESC-2024-002',
      source: 'enterprise_payment',
      counterparty: 'enterprise_client',
      amount: 850000,
      reason: 'dispute',
      heldSince: '2024-01-14 10:15:00',
      status: 'active',
      linkedWork: {
        jobId: 'JOB-2024-5678'
      },
      enterprise: {
        name: 'Tech Corp Ltd',
        email: 'billing@techcorp.com'
      },
      releaseCondition: 'Dispute resolution pending',
      slaDeadline: '2024-01-21 10:15:00',
      holdStartTime: '2024-01-14 10:15:00'
    },
    {
      id: '3',
      escrowId: 'ESC-2024-003',
      source: 'user_payment',
      counterparty: 'user',
      amount: 75000,
      reason: 'compliance_hold',
      heldSince: '2024-01-13 16:45:00',
      status: 'active',
      linkedWork: {
        invoiceId: 'INV-2024-9012'
      },
      user: {
        name: 'Jane Smith',
        email: 'jane.smith@email.com'
      },
      releaseCondition: 'Compliance review pending',
      slaDeadline: '2024-01-20 16:45:00',
      holdStartTime: '2024-01-13 16:45:00'
    },
    {
      id: '4',
      escrowId: 'ESC-2024-004',
      source: 'enterprise_payment',
      counterparty: 'enterprise_client',
      amount: 1200000,
      reason: 'scheduled_release',
      heldSince: '2024-01-12 09:00:00',
      status: 'released',
      linkedWork: {
        jobId: 'JOB-2024-3456'
      },
      enterprise: {
        name: 'Global Services Inc',
        email: 'accounts@globalservices.com'
      },
      releaseCondition: 'Auto-released on completion',
      holdStartTime: '2024-01-12 09:00:00'
    },
    {
      id: '5',
      escrowId: 'ESC-2024-005',
      source: 'user_payment',
      counterparty: 'agent',
      amount: 45000,
      reason: 'dispute',
      heldSince: '2024-01-11 11:30:00',
      status: 'refunded',
      linkedWork: {
        pickupId: 'PU-2024-7890'
      },
      agent: {
        name: 'Mike Johnson',
        email: 'mike.johnson@recliq.com'
      },
      releaseCondition: 'Refunded to user',
      holdStartTime: '2024-01-11 11:30:00'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 6}`,
      escrowId: `ESC-2024-${String(i + 6).padStart(3, '0')}`,
      source: i % 2 === 0 ? 'user_payment' : 'enterprise_payment' as 'user_payment' | 'enterprise_payment',
      counterparty: ['agent', 'user', 'enterprise_client'][i % 3] as 'agent' | 'user' | 'enterprise_client',
      amount: 50000 + (i * 25000),
      reason: ['verification', 'dispute', 'compliance_hold', 'scheduled_release'][i % 4] as 'verification' | 'dispute' | 'compliance_hold' | 'scheduled_release',
      heldSince: `2024-01-${15 - (i % 10)} ${14 - (i % 8)}:${30 + (i % 30)}:00`,
      status: ['active', 'released', 'refunded'][i % 3] as 'active' | 'released' | 'refunded',
      linkedWork: {
        pickupId: i % 3 === 0 ? `PU-2024-${1000 + i}` : undefined,
        invoiceId: i % 3 === 1 ? `INV-2024-${1000 + i}` : undefined,
        jobId: i % 3 === 2 ? `JOB-2024-${1000 + i}` : undefined
      },
      agent: i % 3 === 0 ? {
        name: `Agent ${i}`,
        email: `agent${i}@recliq.com`
      } : undefined,
      user: i % 3 === 1 ? {
        name: `User ${i}`,
        email: `user${i}@email.com`
      } : undefined,
      enterprise: i % 3 === 2 ? {
        name: `Enterprise ${i}`,
        email: `enterprise${i}@company.com`
      } : undefined,
      releaseCondition: 'Condition pending',
      holdStartTime: `2024-01-${15 - (i % 10)} ${14 - (i % 8)}:${30 + (i % 30)}:00`
    }))
  ];

  const filteredData = useMemo(() => {
    return escrowData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.escrowId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.linkedWork?.pickupId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.linkedWork?.invoiceId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.linkedWork?.jobId?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesReason = reasonFilter === 'all' || item.reason === reasonFilter;
      
      return matchesSearch && matchesStatus && matchesReason;
    });
  }, [escrowData, searchQuery, statusFilter, reasonFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'warning';
      case 'released': return 'success';
      case 'refunded': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <IconClock size={16} />;
      case 'released': return <IconCheck size={16} />;
      case 'refunded': return <IconX size={16} />;
      default: return null;
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'verification': return 'info';
      case 'dispute': return 'error';
      case 'compliance_hold': return 'warning';
      case 'scheduled_release': return 'success';
      default: return 'default';
    }
  };

  const getCounterpartyIcon = (counterparty: string) => {
    switch (counterparty) {
      case 'agent': return <IconBriefcase size={16} />;
      case 'user': return <IconUsers size={16} />;
      case 'enterprise_client': return <IconBuilding size={16} />;
      default: return <IconUsers size={16} />;
    }
  };

  const getLinkedWorkIcon = (linkedWork: any) => {
    if (linkedWork.pickupId) return <IconTruck size={16} />;
    if (linkedWork.invoiceId) return <IconReceipt size={16} />;
    if (linkedWork.jobId) return <IconBriefcase size={16} />;
    return null;
  };

  const getLinkedWorkText = (linkedWork: any) => {
    if (linkedWork.pickupId) return linkedWork.pickupId;
    if (linkedWork.invoiceId) return linkedWork.invoiceId;
    if (linkedWork.jobId) return linkedWork.jobId;
    return '';
  };

  const getCounterpartyName = (escrow: EscrowData) => {
    if (escrow.agent) return escrow.agent.name;
    if (escrow.user) return escrow.user.name;
    if (escrow.enterprise) return escrow.enterprise.name;
    return '';
  };

  const handleExport = () => {
    const headers = [
      'Escrow ID',
      'Source',
      'Counterparty',
      'Amount (₦)',
      'Reason',
      'Held Since',
      'Status',
      'Linked Work',
      'Counterparty Name'
    ];

    const rows = paginatedData.map(item => [
      item.escrowId,
      item.source,
      item.counterparty,
      item.amount.toString(),
      item.reason,
      item.heldSince,
      item.status,
      getLinkedWorkText(item.linkedWork || {}),
      getCounterpartyName(item)
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'escrow-records.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardCard title="Escrow Records Table">
      <Box sx={{ width: '100%' }}>
        {/* Filters and Search */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
          <TextField
            placeholder="Search Escrow ID / Pickup / Invoice / Job..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={16} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 350 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="released">Released</MenuItem>
              <MenuItem value="refunded">Refunded</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Reason</InputLabel>
            <Select
              value={reasonFilter}
              label="Reason"
              onChange={(e) => setReasonFilter(e.target.value)}
            >
              <MenuItem value="all">All Reasons</MenuItem>
              <MenuItem value="verification">Verification</MenuItem>
              <MenuItem value="dispute">Dispute</MenuItem>
              <MenuItem value="compliance_hold">Compliance Hold</MenuItem>
              <MenuItem value="scheduled_release">Scheduled Release</MenuItem>
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
          <Table sx={{ minWidth: 1400 }}>
            <TableHead>
              <TableRow>
                <TableCell>Escrow ID</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Counterparty</TableCell>
                <TableCell align="right">Amount (₦)</TableCell>
                <TableCell align="center">Reason</TableCell>
                <TableCell>Held Since</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Linked Work</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((escrow) => (
                <TableRow
                  key={escrow.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(escrow)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {escrow.escrowId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {escrow.source === 'user_payment' ? 'User Payment' : 'Enterprise Payment'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getCounterpartyIcon(escrow.counterparty)}
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {escrow.counterparty === 'agent' ? 'Agent' : 
                           escrow.counterparty === 'user' ? 'User' : 'Enterprise Client'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {getCounterpartyName(escrow)}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700} color="primary.main">
                      ₦{escrow.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={escrow.reason.replace('_', ' ').charAt(0).toUpperCase() + escrow.reason.replace('_', ' ').slice(1)}
                      color={getReasonColor(escrow.reason) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" fontFamily="monospace">
                      {escrow.heldSince}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      {getStatusIcon(escrow.status)}
                      <Chip
                        size="small"
                        label={escrow.status.charAt(0).toUpperCase() + escrow.status.slice(1)}
                        color={getStatusColor(escrow.status) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {escrow.linkedWork && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        {getLinkedWorkIcon(escrow.linkedWork)}
                        <Typography variant="body2" fontFamily="monospace">
                          {getLinkedWorkText(escrow.linkedWork)}
                        </Typography>
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {escrow.status === 'active' && escrow.slaDeadline && new Date(escrow.slaDeadline) < new Date() && (
                        <Tooltip title="Overdue SLA">
                          <IconAlertTriangle size={16} color="orange" />
                        </Tooltip>
                      )}
                      <Tooltip title="View details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowClick(escrow);
                          }}
                        >
                          <IconEye size={16} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} escrow records
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

        {/* Summary */}
        <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, mt: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Escrow Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Total Amount in Escrow</Typography>
              <Typography variant="caption" fontWeight={600}>
                ₦{paginatedData.filter(item => item.status === 'active').reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Active Escrows</Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {paginatedData.filter(item => item.status === 'active').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Released This Period</Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                {paginatedData.filter(item => item.status === 'released').length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Overdue SLA</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {paginatedData.filter(item => item.status === 'active' && item.slaDeadline && new Date(item.slaDeadline) < new Date()).length}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default EscrowRecordsTable;
