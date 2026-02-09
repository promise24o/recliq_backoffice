'use client'
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip, 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem,
  TablePagination,
  TextField,
  InputAdornment,
  Stack,
  CardContent
} from '@mui/material';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Download, 
  Flag,
  MapPin,
  Scale,
  Wallet,
  User,
  Clock
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { DropoffRecord } from '../types';

interface DropoffRecordsTableProps {
  records: DropoffRecord[];
  onRowClick: (record: DropoffRecord) => void;
  onExport: (records: DropoffRecord[]) => void;
}

const DropoffRecordsTable: React.FC<DropoffRecordsTableProps> = ({ records, onRowClick, onExport }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRecord, setSelectedRecord] = useState<DropoffRecord | null>(null);

  // Filter records based on search
  const filteredRecords = records.filter(record =>
    record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.dropoffLocationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, record: DropoffRecord) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecord(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'disputed':
        return 'warning';
      case 'flagged':
        return 'error';
      default:
        return 'default';
    }
  };

  const getWasteTypeColor = (wasteType: string) => {
    switch (wasteType) {
      case 'plastic':
        return '#3b82f6';
      case 'paper':
        return '#10b981';
      case 'metal':
        return '#f59e0b';
      case 'e_waste':
        return '#ef4444';
      case 'mixed':
        return '#8b5cf6';
      case 'glass':
        return '#06b6d4';
      default:
        return '#6b7280';
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const paginatedRecords = filteredRecords.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardCard title="Drop-off Records">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📋 Auditable drop-off transactions • Click rows for details
          </Typography>
        </Box>
        
        {/* Controls */}
        <Stack direction="row" spacing={2} mb={3} alignItems="center">
          <TextField
            placeholder="Search drop-offs..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color="#6b7280" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <IconButton onClick={() => onExport(filteredRecords)}>
            <Download size={20} />
          </IconButton>
        </Stack>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Drop-off ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Completion Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Agent</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>City/Zone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Waste Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Final Weight</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>User Payout</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Agent Credit</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Platform Fee</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRecords.map((record) => (
                <TableRow
                  key={record.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(record)}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#3b82f6' }}>
                        <MapPin size={16} color="white" />
                      </Avatar>
                      <Typography variant="body2" fontWeight="500">
                        {record.id}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">
                        {new Date(record.completionDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(record.completionDate).toLocaleTimeString()}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" fontWeight="500">
                        {record.userName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {record.userPhone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" fontWeight="500">
                        {record.agentName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {record.agentPhone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" fontWeight="500">
                        {record.dropoffLocationName}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Clock size={12} color="#6b7280" />
                        <Typography variant="caption" color="text.secondary">
                          {formatDuration(record.duration)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">
                        {record.city}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {record.zone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={record.wasteType.replace('_', ' ').toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: `${getWasteTypeColor(record.wasteType)}15`,
                        color: getWasteTypeColor(record.wasteType),
                        fontSize: '0.7rem',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Scale size={16} color="#6b7280" />
                      <Typography variant="body2" fontWeight="500">
                        {record.finalWeight.toFixed(1)} kg
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Wallet size={16} color="#10b981" />
                      <Typography variant="body2" fontWeight="500" color="success.main">
                        ₦{record.pricing.userPayout.toLocaleString()}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <User size={16} color="#3b82f6" />
                      <Typography variant="body2" fontWeight="500" color="primary.main">
                        ₦{record.pricing.agentEarnings.toLocaleString()}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      ₦{record.pricing.platformFee.toLocaleString()}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={record.status.toUpperCase()}
                      size="small"
                      color={getStatusColor(record.status) as any}
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(e, record);
                      }}
                    >
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredRecords.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count} records`
          }
        />

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              if (selectedRecord) {
                onRowClick(selectedRecord);
              }
              handleMenuClose();
            }}
          >
            <Eye size={16} style={{ marginRight: 8 }} />
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (selectedRecord) {
                onExport([selectedRecord]);
              }
              handleMenuClose();
            }}
          >
            <Download size={16} style={{ marginRight: 8 }} />
            Export Record
          </MenuItem>
          <MenuItem
            onClick={() => {
              // Handle flag action
              handleMenuClose();
            }}
          >
            <Flag size={16} style={{ marginRight: 8 }} />
            Flag for Review
          </MenuItem>
        </Menu>
      </CardContent>
    </DashboardCard>
  );
};

export default DropoffRecordsTable;
