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
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings
} from 'lucide-react';
import type { EnterpriseContract, ContractStatus, ContractType, SLATier } from '../types';
import { 
  getContractStatusColor, 
  getContractTypeColor, 
  getSLATierColor,
  formatCurrency,
  getDaysUntilExpiry,
  isExpiringSoon
} from '../mockData';

interface ContractsTableProps {
  contracts: EnterpriseContract[];
  onViewContract: (contractId: string) => void;
  onEditContract: (contractId: string) => void;
}

const ContractsTable: React.FC<ContractsTableProps> = ({
  contracts,
  onViewContract,
  onEditContract
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContract, setSelectedContract] = useState<EnterpriseContract | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, contract: EnterpriseContract) => {
    setAnchorEl(event.currentTarget);
    setSelectedContract(contract);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedContract(null);
  };

  const handleView = () => {
    if (selectedContract) {
      onViewContract(selectedContract.id);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedContract) {
      onEditContract(selectedContract.id);
    }
    handleMenuClose();
  };

  const getStatusIcon = (status: ContractStatus) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} />;
      case 'draft': return <FileText size={16} />;
      case 'expired': return <Clock size={16} />;
      case 'terminated': return <AlertTriangle size={16} />;
      case 'renewal_pending': return <Calendar size={16} />;
      case 'suspended': return <AlertTriangle size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getExpiryStatus = (contract: EnterpriseContract) => {
    const daysUntil = getDaysUntilExpiry(contract.expiryDate);
    const isExpiring = isExpiringSoon(contract.expiryDate, contract.renewalWindow);
    
    if (contract.status === 'expired') {
      return { text: 'Expired', color: '#ef4444' };
    }
    
    if (isExpiring) {
      return { text: `${daysUntil} days`, color: '#f59e0b' };
    }
    
    return { text: `${daysUntil} days`, color: '#10b981' };
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contracts.length) : 0;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="contracts table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Contract ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Client Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Contract Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Effective Period</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Pricing Model</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>SLA Tier</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Renewal</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contract) => {
                const expiryStatus = getExpiryStatus(contract);
                
                return (
                  <TableRow
                    key={contract.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onViewContract(contract.id)}
                  >
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <FileText size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">
                            {contract.contractNumber}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {contract.id}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {contract.clientName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {contract.clientId}
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <Chip
                        label={contract.contractType.replace('_', ' ').toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: getContractTypeColor(contract.contractType) + '15',
                          color: getContractTypeColor(contract.contractType),
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {new Date(contract.effectiveDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          to {new Date(contract.expiryDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2">
                        {contract.pricingModel.model.replace('_', ' ').toUpperCase()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {contract.pricingModel.baseRates.length} waste types
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <Chip
                        label={contract.slaConfiguration.tier.toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: getSLATierColor(contract.slaConfiguration.tier) + '15',
                          color: getSLATierColor(contract.slaConfiguration.tier),
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {getStatusIcon(contract.status)}
                        <Chip
                          label={contract.status.replace('_', ' ').toUpperCase()}
                          size="small"
                          sx={{
                            bgcolor: getContractStatusColor(contract.status) + '15',
                            color: getContractStatusColor(contract.status),
                            fontSize: '0.75rem',
                            fontWeight: 500
                          }}
                        />
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2" color={expiryStatus.color}>
                        {expiryStatus.text}
                      </Typography>
                      {contract.autoRenewal && (
                        <Typography variant="caption" color="text.secondary">
                          Auto-renew
                        </Typography>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuOpen(e, contract);
                        }}
                      >
                        <MoreVertical size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            
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
        count={contracts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Contracts per page"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} of ${count} contracts`
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
            <Typography variant="body2">Edit Contract</Typography>
          </Stack>
        </MenuItem>
        
        {selectedContract?.status === 'active' && (
          <MenuItem>
            <Stack direction="row" spacing={2} alignItems="center">
              <Calendar size={16} />
              <Typography variant="body2">Schedule Renewal</Typography>
            </Stack>
          </MenuItem>
        )}
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <FileText size={16} />
            <Typography variant="body2">Export Summary</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <DollarSign size={16} />
            <Typography variant="body2">View Financials</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default ContractsTable;
