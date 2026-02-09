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
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  Target,
  Package,
  MapPin,
  Timer,
  Settings,
  Phone,
  Mail
} from 'lucide-react';
import type { ScheduledCollection, CollectionStatus, CollectionType, WasteType, SLARisk } from '../types';
import { 
  getCollectionStatusColor, 
  getCollectionTypeColor, 
  getWasteTypeColor,
  getSLARiskColor,
  getPriorityColor,
  formatWeight,
  formatDuration,
  getDaysUntilCollection,
  isCollectionToday,
  isCollectionOverdue
} from '../mockData';

interface ScheduledCollectionsTableProps {
  collections: ScheduledCollection[];
  onViewCollection: (collectionId: string) => void;
  onEditCollection: (collectionId: string) => void;
  onAssignAgent: (collectionId: string) => void;
  onRescheduleCollection: (collectionId: string) => void;
}

const ScheduledCollectionsTable: React.FC<ScheduledCollectionsTableProps> = ({
  collections,
  onViewCollection,
  onEditCollection,
  onAssignAgent,
  onRescheduleCollection
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCollection, setSelectedCollection] = useState<ScheduledCollection | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, collection: ScheduledCollection) => {
    setAnchorEl(event.currentTarget);
    setSelectedCollection(collection);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCollection(null);
  };

  const handleView = () => {
    if (selectedCollection) {
      onViewCollection(selectedCollection.id);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedCollection) {
      onEditCollection(selectedCollection.id);
    }
    handleMenuClose();
  };

  const handleAssign = () => {
    if (selectedCollection) {
      onAssignAgent(selectedCollection.id);
    }
    handleMenuClose();
  };

  const handleReschedule = () => {
    if (selectedCollection) {
      onRescheduleCollection(selectedCollection.id);
    }
    handleMenuClose();
  };

  const getStatusIcon = (status: CollectionStatus) => {
    switch (status) {
      case 'scheduled': return <Calendar size={16} />;
      case 'assigned': return <CheckCircle size={16} />;
      case 'rescheduled': return <RotateCcw size={16} />;
      case 'at_risk': return <AlertTriangle size={16} />;
      case 'cancelled': return <AlertTriangle size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  const getCollectionTiming = (collection: ScheduledCollection) => {
    const daysUntil = getDaysUntilCollection(collection.scheduledDate);
    const isToday = isCollectionToday(collection.scheduledDate);
    const isOverdue = isCollectionOverdue(collection.scheduledDate, collection.scheduledTime);
    
    if (isOverdue) {
      return { text: 'Overdue', color: '#ef4444' };
    }
    
    if (isToday) {
      return { text: 'Today', color: '#3b82f6' };
    }
    
    if (daysUntil === 1) {
      return { text: 'Tomorrow', color: '#f59e0b' };
    }
    
    if (daysUntil <= 7) {
      return { text: `${daysUntil} days`, color: '#10b981' };
    }
    
    return { text: `${daysUntil} days`, color: '#6b7280' };
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - collections.length) : 0;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="scheduled collections table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Collection ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Schedule</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Waste Types</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Volume</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Agent</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>SLA Risk</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collections
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((collection) => {
                const timing = getCollectionTiming(collection);
                
                return (
                  <TableRow
                    key={collection.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onViewCollection(collection.id)}
                  >
                    <TableCell>
                      <Stack spacing={1}>
                        <Typography variant="body2" fontWeight="500">
                          {collection.collectionId}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            label={collection.collectionType.replace('_', ' ').toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: getCollectionTypeColor(collection.collectionType) + '15',
                              color: getCollectionTypeColor(collection.collectionType),
                              fontSize: '0.7rem',
                              fontWeight: 500
                            }}
                          />
                          <Chip
                            label={collection.priority.toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: getPriorityColor(collection.priority) + '15',
                              color: getPriorityColor(collection.priority),
                              fontSize: '0.7rem',
                              fontWeight: 500
                            }}
                          />
                        </Stack>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Typography variant="body2" fontWeight="500">
                          {collection.clientName}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Phone size={12} color="#6b7280" />
                          <Typography variant="caption" color="text.secondary">
                            {collection.contactPerson.phone}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          {collection.contractNumber}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MapPin size={12} color="#6b7280" />
                          <Typography variant="body2">
                            {collection.location.name}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          {collection.city} • {collection.zone}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Calendar size={12} color="#6b7280" />
                          <Typography variant="body2">
                            {new Date(collection.scheduledDate).toLocaleDateString()}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Clock size={12} color="#6b7280" />
                          <Typography variant="body2">
                            {collection.scheduledTime}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" color={timing.color}>
                          {timing.text}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDuration(collection.estimatedDuration)}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        {collection.wasteCategories.slice(0, 2).map((waste, index) => (
                          <Chip
                            key={index}
                            label={waste.type.replace('_', ' ').toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: getWasteTypeColor(waste.type) + '15',
                              color: getWasteTypeColor(waste.type),
                              fontSize: '0.7rem',
                              fontWeight: 500
                            }}
                          />
                        ))}
                        {collection.wasteCategories.length > 2 && (
                          <Typography variant="caption" color="text.secondary">
                            +{collection.wasteCategories.length - 2} more
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {formatWeight(collection.estimatedVolume)}
                      </Typography>
                      {collection.assignedAgent && (
                        <Typography variant="caption" color="text.secondary">
                          {formatWeight(collection.assignedAgent.currentLoad)} / {formatWeight(collection.assignedAgent.capacity.maxWeight)} used
                        </Typography>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      {collection.assignedAgent ? (
                        <Stack spacing={1}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <User size={12} color="#6b7280" />
                            <Typography variant="body2">
                              {collection.assignedAgent.agentName}
                            </Typography>
                          </Stack>
                          <Typography variant="caption" color="text.secondary">
                            {collection.assignedAgent.agentType}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {collection.assignedAgent.vehicleInfo.plate}
                          </Typography>
                        </Stack>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Unassigned
                        </Typography>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <Chip
                        label={collection.slaRisk.replace('_', ' ').toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: getSLARiskColor(collection.slaRisk) + '15',
                          color: getSLARiskColor(collection.slaRisk),
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {getStatusIcon(collection.status)}
                        <Chip
                          label={collection.status.replace('_', ' ').toUpperCase()}
                          size="small"
                          sx={{
                            bgcolor: getCollectionStatusColor(collection.status) + '15',
                            color: getCollectionStatusColor(collection.status),
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
                          handleMenuOpen(e, collection);
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
                <TableCell colSpan={10} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={collections.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Collections per page"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} of ${count} collections`
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
            <Typography variant="body2">Edit Collection</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem onClick={handleAssign}>
          <Stack direction="row" spacing={2} alignItems="center">
            <User size={16} />
            <Typography variant="body2">Assign Agent</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem onClick={handleReschedule}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Calendar size={16} />
            <Typography variant="body2">Reschedule</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Timer size={16} />
            <Typography variant="body2">Set Reminder</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <AlertTriangle size={16} />
            <Typography variant="body2">Flag Risk</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Mail size={16} />
            <Typography variant="body2">Notify Client</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default ScheduledCollectionsTable;
