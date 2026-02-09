'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Chip,
  TablePagination,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import {
  Search,
  Download,
  RefreshCw,
  Filter,
  Info,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Eye,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { EnvironmentalImpact, VerificationStatus } from '../types';
import { 
  formatWeight, 
  formatCO2, 
  formatTrees,
  getWasteTypeColor,
  getActivityTypeColor,
  getVerificationStatusColor
} from '../mockData';

interface VerifiedImpactTableProps {
  data: EnvironmentalImpact[];
  onExport?: (format: 'csv' | 'pdf') => void;
  onViewDetails?: (impact: EnvironmentalImpact) => void;
  showActions?: boolean;
}

const VerifiedImpactTable: React.FC<VerifiedImpactTableProps> = ({
  data,
  onExport,
  onViewDetails,
  showActions = true
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<VerificationStatus | ''>('');
  const [filterWasteType, setFilterWasteType] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<EnvironmentalImpact | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: EnvironmentalImpact) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleViewDetails = () => {
    if (selectedRow && onViewDetails) {
      onViewDetails(selectedRow);
    }
    handleMenuClose();
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    if (onExport) {
      onExport(format);
    }
    handleMenuClose();
  };

  const handleRefresh = () => {
    console.log('Refreshing verified impact data');
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter data
  const filteredData = data.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.wasteType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.verificationSource.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === '' || item.verificationStatus === filterStatus;
    const matchesWasteType = filterWasteType === '' || item.wasteType === filterWasteType;
    const matchesCity = filterCity === '' || item.city === filterCity;

    return matchesSearch && matchesStatus && matchesWasteType && matchesCity;
  });

  // Get unique values for filters
  const uniqueCities = [...new Set(data.map(item => item.city))];
  const uniqueWasteTypes = [...new Set(data.map(item => item.wasteType))];

  const getVerificationIcon = (status: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return <CheckCircle size={16} color="#10B981" />;
      case 'pending':
        return <Clock size={16} color="#F59E0B" />;
      case 'flagged':
        return <AlertCircle size={16} color="#8B5CF6" />;
      case 'rejected':
        return <XCircle size={16} color="#EF4444" />;
      default:
        return <Clock size={16} color="#6B7280" />;
    }
  };

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="600" mb={1}>
              Verified Impact Table
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Auditable record of all verified environmental impact activities
            </Typography>
          </Box>

          {showActions && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<Download size={16} />}
                onClick={() => handleExport('csv')}
              >
                Export CSV
              </Button>
              <IconButton size="small" onClick={handleRefresh}>
                <RefreshCw size={16} />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search impact records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value as VerificationStatus | '')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="verified">Verified</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="flagged">Flagged</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Waste Type</InputLabel>
            <Select
              value={filterWasteType}
              label="Waste Type"
              onChange={(e) => setFilterWasteType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueWasteTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>City</InputLabel>
            <Select
              value={filterCity}
              label="City"
              onChange={(e) => setFilterCity(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueCities.map(city => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Waste Type</TableCell>
                <TableCell align="right">Weight (kg)</TableCell>
                <TableCell align="right">CO₂ Avoided</TableCell>
                <TableCell align="right">Trees Saved</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Verification</TableCell>
                <TableCell>Source</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Calendar size={14} color="#666" />
                      <Typography variant="body2">
                        {new Date(row.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="500">
                        {row.city}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.zone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: getWasteTypeColor(row.wasteType)
                        }}
                      />
                      <Typography variant="body2">
                        {row.wasteType.charAt(0).toUpperCase() + row.wasteType.slice(1)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="500">
                      {formatWeight(row.weightKg)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {formatCO2(row.co2AvoidedKg)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {formatTrees(row.treesSaved)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: getActivityTypeColor(row.activityType)
                        }}
                      />
                      <Typography variant="body2">
                        {row.activityType.charAt(0).toUpperCase() + row.activityType.slice(1)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getVerificationIcon(row.verificationStatus)}
                      <Chip
                        label={row.verificationStatus.charAt(0).toUpperCase() + row.verificationStatus.slice(1)}
                        size="small"
                        color={row.verificationStatus === 'verified' ? 'success' : 
                               row.verificationStatus === 'pending' ? 'warning' :
                               row.verificationStatus === 'flagged' ? 'info' : 'error'}
                        variant="outlined"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {row.verificationSource}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, row)}
                    >
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count} records`
          }
        />

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              minWidth: 150,
              '& .MuiMenuItem-root': {
                fontSize: '0.875rem'
              }
            }
          }}
        >
          <MenuItem onClick={handleViewDetails}>
            <Eye size={16} style={{ marginRight: 8 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={() => handleExport('csv')}>
            <Download size={16} style={{ marginRight: 8 }} />
            Export Record
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Info size={16} style={{ marginRight: 8 }} />
            View Audit Trail
          </MenuItem>
        </Menu>

        {/* Info */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            pt: 2,
            borderTop: '1px solid #e0e0e0'
          }}
        >
          <Typography variant="caption" color="text.secondary">
            All impact records are derived from verified weight data and include full audit trails
          </Typography>
          <Tooltip title="Click on any record to view detailed verification information and audit trail">
            <IconButton size="small">
              <Info size={14} />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VerifiedImpactTable;
