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
  MoreVertical, 
  Eye, 
  Download, 
  Flag,
  Scale,
  User,
  Clock,
  MapPin,
  Camera
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { WeightLog } from '../types';

interface WeightLogsTableProps {
  logs: WeightLog[];
  onRowClick: (log: WeightLog) => void;
  onExport: (logs: WeightLog[]) => void;
}

const WeightLogsTable: React.FC<WeightLogsTableProps> = ({ logs, onRowClick, onExport }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLog, setSelectedLog] = useState<WeightLog | null>(null);

  // Filter logs based on search
  const filteredLogs = logs.filter(log =>
    log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.relatedId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, log: WeightLog) => {
    setAnchorEl(event.currentTarget);
    setSelectedLog(log);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLog(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'disputed':
        return 'warning';
      case 'adjusted':
        return 'info';
      case 'flagged':
        return 'error';
      default:
        return 'default';
    }
  };

  const getVarianceColor = (variance: number) => {
    const absVariance = Math.abs(variance);
    if (absVariance > 20) return '#ef4444';
    if (absVariance > 10) return '#f59e0b';
    if (absVariance > 5) return '#06b6d4';
    return '#10b981';
  };

  const getVerificationIcon = (method: string) => {
    switch (method) {
      case 'agent_scale':
        return <Scale size={16} />;
      case 'user_confirmation':
        return <User size={16} />;
      case 'photo_assisted':
        return <Camera size={16} />;
      case 'smart_scale':
        return <Scale size={16} />;
      default:
        return <Scale size={16} />;
    }
  };

  const getVerificationLabel = (method: string) => {
    switch (method) {
      case 'agent_scale':
        return 'Agent Scale';
      case 'user_confirmation':
        return 'User Confirmed';
      case 'photo_assisted':
        return 'Photo Assisted';
      case 'smart_scale':
        return 'Smart Scale';
      default:
        return 'Unknown';
    }
  };

  const paginatedLogs = filteredLogs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardCard title="Weight Logs">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📋 Forensic-level auditing • Click rows for detailed measurement analysis
          </Typography>
        </Box>
        
        {/* Controls */}
        <Stack direction="row" spacing={2} mb={3} alignItems="center">
          <TextField
            placeholder="Search weight logs..."
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
          
          <IconButton onClick={() => onExport(filteredLogs)}>
            <Download size={20} />
          </IconButton>
        </Stack>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Log ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Pickup/Drop-off ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Agent</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>City/Zone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Waste Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Estimated Weight</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Measured Weight</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Final Weight</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Variance %</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Verification</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLogs.map((log) => (
                <TableRow
                  key={log.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(log)}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#3b82f6' }}>
                        <Scale size={16} color="white" />
                      </Avatar>
                      <Typography variant="body2" fontWeight="500">
                        {log.id}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" fontWeight="500">
                        {log.relatedId}
                      </Typography>
                      <Chip
                        label={log.relatedType}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.6rem' }}
                      />
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" fontWeight="500">
                        {log.userName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {log.userPhone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2" fontWeight="500">
                        {log.agentName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {log.agentPhone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">
                        {log.city}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {log.zone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={log.wasteType.replace('_', ' ').toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: '#3b82f615',
                        color: '#3b82f6',
                        fontSize: '0.7rem',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">
                      {log.estimatedWeight.toFixed(1)} kg
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">
                      {log.measuredWeight.toFixed(1)} kg
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" fontWeight="500" color="primary.main">
                      {log.finalWeight.toFixed(1)} kg
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography 
                        variant="body2" 
                        fontWeight="500"
                        color={getVarianceColor(log.variance)}
                      >
                        {log.variance > 0 ? '+' : ''}{log.variance.toFixed(1)}%
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getVerificationIcon(log.verificationMethod)}
                      <Typography variant="caption" color="text.secondary">
                        {getVerificationLabel(log.verificationMethod)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={log.status.toUpperCase()}
                      size="small"
                      color={getStatusColor(log.status) as any}
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(e, log);
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
          count={filteredLogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count} logs`
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
              if (selectedLog) {
                onRowClick(selectedLog);
              }
              handleMenuClose();
            }}
          >
            <Eye size={16} style={{ marginRight: 8 }} />
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (selectedLog) {
                onExport([selectedLog]);
              }
              handleMenuClose();
            }}
          >
            <Download size={16} style={{ marginRight: 8 }} />
            Export Log
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

export default WeightLogsTable;
