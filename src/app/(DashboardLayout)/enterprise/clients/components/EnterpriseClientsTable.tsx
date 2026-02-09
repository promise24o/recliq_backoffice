'use client';
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
  IconButton,
  Tooltip,
  TablePagination,
  Menu,
  MenuItem,
  Stack
} from '@mui/material';
import {
  Eye,
  Edit,
  MoreVertical,
  Calendar,
  DollarSign,
  Building,
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  Target,
  Activity,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import type { EnterpriseClient, ClientStatus, Industry, ContractType, SLAStatus } from '../types';
import { 
  getClientStatusColor, 
  getIndustryColor, 
  getContractTypeColor,
  getSLAStatusColor,
  formatCurrency,
  formatWeight
} from '../mockData';

interface EnterpriseClientsTableProps {
  clients: EnterpriseClient[];
  onViewClient: (clientId: string) => void;
  onEditClient: (clientId: string) => void;
  onSchedulePickup: (clientId: string) => void;
}

const EnterpriseClientsTable: React.FC<EnterpriseClientsTableProps> = ({
  clients,
  onViewClient,
  onEditClient,
  onSchedulePickup
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = useState<EnterpriseClient | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, client: EnterpriseClient) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClient(null);
  };

  const handleView = () => {
    if (selectedClient) {
      onViewClient(selectedClient.id);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedClient) {
      onEditClient(selectedClient.id);
    }
    handleMenuClose();
  };

  const handleSchedule = () => {
    if (selectedClient) {
      onSchedulePickup(selectedClient.id);
    }
    handleMenuClose();
  };

  const getStatusIcon = (status: ClientStatus) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} />;
      case 'inactive': return <Clock size={16} />;
      case 'suspended': return <AlertTriangle size={16} />;
      case 'trial': return <Target size={16} />;
      case 'onboarding': return <Settings size={16} />;
      default: return <Building size={16} />;
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="enterprise clients table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Client Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Industry</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>City / Zone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Contract Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Monthly Volume</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Monthly Revenue</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>SLA Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((client) => (
                <TableRow
                  key={client.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onViewClient(client.id)}
                >
                  <TableCell>
                    <Stack spacing={1}>
                      <Typography variant="body2" fontWeight="500">
                        {client.companyName}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Mail size={12} color="#6b7280" />
                        <Typography variant="caption" color="text.secondary">
                          {client.primaryContact.email}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Phone size={12} color="#6b7280" />
                        <Typography variant="caption" color="text.secondary">
                          {client.primaryContact.phone}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={client.industry.replace('_', ' ').toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: getIndustryColor(client.industry) + '15',
                        color: getIndustryColor(client.industry),
                        fontSize: '0.75rem',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <MapPin size={12} color="#6b7280" />
                        <Typography variant="body2">
                          {client.headquarters.city}
                        </Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {client.headquarters.zone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={client.contractType.replace('_', ' ').toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: getContractTypeColor(client.contractType) + '15',
                        color: getContractTypeColor(client.contractType),
                        fontSize: '0.75rem',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">
                      {formatWeight(client.monthlyVolume)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Avg per pickup: {formatWeight(client.averagePickupWeight)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">
                      {formatCurrency(client.monthlyRevenue)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Avg per pickup: {formatCurrency(client.averageRevenuePerPickup)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={client.slaStatus.replace('_', ' ').toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: getSLAStatusColor(client.slaStatus) + '15',
                        color: getSLAStatusColor(client.slaStatus),
                        fontSize: '0.75rem',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getStatusIcon(client.clientStatus)}
                      <Chip
                        label={client.clientStatus.replace('_', ' ').toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: getClientStatusColor(client.clientStatus) + '15',
                          color: getClientStatusColor(client.clientStatus),
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      />
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuOpen(e, client);
                      }}
                    >
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={9} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={clients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Clients per page"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} of ${count} clients`
        }
      />
      
      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            minWidth: 200,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }
        }}
      >
        <MenuItem onClick={handleView}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Eye size={16} />
            <Typography variant="body2">View Details</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem onClick={handleEdit}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Edit size={16} />
            <Typography variant="body2">Edit Client</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem onClick={handleSchedule}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Calendar size={16} />
            <Typography variant="body2">Schedule Pickup</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <DollarSign size={16} />
            <Typography variant="body2">View Financials</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Activity size={16} />
            <Typography variant="body2">Performance Report</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Settings size={16} />
            <Typography variant="body2">Contract Settings</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default EnterpriseClientsTable;
