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
  Users,
  Truck,
  Target,
  Package,
  MapPin,
  Timer,
  Settings,
  Phone,
  Mail,
  RefreshCw,
  Shield,
  Activity
} from 'lucide-react';
import type { AgentAssignment, AssignmentStatus, AgentType, SLARisk } from '../types';
import { 
  getAssignmentStatusColor, 
  getAgentTypeColor,
  getSLARiskColor,
  formatWeight,
  formatDuration,
  getDaysUntilAssignment,
  isAssignmentOverdue
} from '../mockData';

interface AssignmentsTableProps {
  assignments: AgentAssignment[];
  onViewAssignment: (assignmentId: string) => void;
  onEditAssignment: (assignmentId: string) => void;
  onReassignAgent: (assignmentId: string) => void;
  onConfirmAssignment: (assignmentId: string) => void;
  onAddBackupAgent: (assignmentId: string) => void;
}

const AssignmentsTable: React.FC<AssignmentsTableProps> = ({
  assignments,
  onViewAssignment,
  onEditAssignment,
  onReassignAgent,
  onConfirmAssignment,
  onAddBackupAgent
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<AgentAssignment | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, assignment: AgentAssignment) => {
    setAnchorEl(event.currentTarget);
    setSelectedAssignment(assignment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAssignment(null);
  };

  const handleView = () => {
    if (selectedAssignment) {
      onViewAssignment(selectedAssignment.id);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedAssignment) {
      onEditAssignment(selectedAssignment.id);
    }
    handleMenuClose();
  };

  const handleReassign = () => {
    if (selectedAssignment) {
      onReassignAgent(selectedAssignment.id);
    }
    handleMenuClose();
  };

  const handleConfirm = () => {
    if (selectedAssignment) {
      onConfirmAssignment(selectedAssignment.id);
    }
    handleMenuClose();
  };

  const handleAddBackup = () => {
    if (selectedAssignment) {
      onAddBackupAgent(selectedAssignment.id);
    }
    handleMenuClose();
  };

  const getStatusIcon = (status: AssignmentStatus) => {
    switch (status) {
      case 'unassigned': return <AlertTriangle size={16} />;
      case 'assigned': return <Clock size={16} />;
      case 'confirmed': return <CheckCircle size={16} />;
      case 'in_progress': return <Activity size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'failed': return <AlertTriangle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getAgentInfo = (assignment: AgentAssignment) => {
    if (assignment.primaryAgent) {
      return assignment.primaryAgent.agentName;
    } else if (assignment.fleetInfo) {
      return assignment.fleetInfo.fleetName;
    } else {
      return 'Unassigned';
    }
  };

  const getAssignmentTiming = (assignment: AgentAssignment) => {
    const daysUntil = getDaysUntilAssignment(assignment.scheduledDate);
    const isToday = daysUntil === 0;
    const isOverdue = isAssignmentOverdue(`${assignment.scheduledDate}T${assignment.scheduledTime}`, assignment.status);
    
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - assignments.length) : 0;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="assignments table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Assignment ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Schedule</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Agent / Fleet</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Volume</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>SLA Risk</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((assignment) => {
                const timing = getAssignmentTiming(assignment);
                const agentName = getAgentInfo(assignment);
                
                return (
                  <TableRow
                    key={assignment.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onViewAssignment(assignment.id)}
                  >
                    <TableCell>
                      <Stack spacing={1}>
                        <Typography variant="body2" fontWeight="500">
                          {assignment.assignmentId}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            label={assignment.agentType.toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: getAgentTypeColor(assignment.agentType) + '15',
                              color: getAgentTypeColor(assignment.agentType),
                              fontSize: '0.7rem',
                              fontWeight: 500
                            }}
                          />
                          {assignment.reassignedCount > 0 && (
                            <Chip
                              label={`Reassigned ${assignment.reassignedCount}x`}
                              size="small"
                              sx={{
                                bgcolor: '#f59e0b15',
                                color: '#f59e0b',
                                fontSize: '0.7rem',
                                fontWeight: 500
                              }}
                            />
                          )}
                        </Stack>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <User size={12} color="#6b7280" />
                          <Typography variant="body2">
                            {assignment.clientName}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          {assignment.contractNumber}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MapPin size={12} color="#6b7280" />
                          <Typography variant="body2">
                            {assignment.location.name}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          {assignment.city} • {assignment.zone}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Calendar size={12} color="#6b7280" />
                          <Typography variant="body2">
                            {new Date(assignment.scheduledDate).toLocaleDateString()}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Clock size={12} color="#6b7280" />
                          <Typography variant="body2">
                            {assignment.scheduledTime}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" color={timing.color}>
                          {timing.text}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDuration(assignment.estimatedDuration)}
                        </Typography>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {assignment.agentType === 'individual' ? (
                            <User size={12} color="#6b7280" />
                          ) : (
                            <Truck size={12} color="#6b7280" />
                          )}
                          <Typography variant="body2">
                            {agentName}
                          </Typography>
                        </Stack>
                        {assignment.primaryAgent && (
                          <Typography variant="caption" color="text.secondary">
                            {assignment.primaryAgent.agentType}
                          </Typography>
                        )}
                        {assignment.backupAgent && (
                          <Typography variant="caption" color="success.main">
                            Backup: {assignment.backupAgent.agentName}
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {formatWeight(assignment.estimatedVolume)}
                      </Typography>
                      {assignment.primaryAgent && (
                        <Typography variant="caption" color="text.secondary">
                          {formatWeight(assignment.primaryAgent.currentLoad)} / {formatWeight(assignment.primaryAgent.capacity.maxWeight)} used
                        </Typography>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <Chip
                        label={assignment.slaRisk.replace('_', ' ').toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: getSLARiskColor(assignment.slaRisk) + '15',
                          color: getSLARiskColor(assignment.slaRisk),
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {getStatusIcon(assignment.status)}
                        <Chip
                          label={assignment.status.replace('_', ' ').toUpperCase()}
                          size="small"
                          sx={{
                            bgcolor: getAssignmentStatusColor(assignment.status) + '15',
                            color: getAssignmentStatusColor(assignment.status),
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
                          handleMenuOpen(e, assignment);
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
        count={assignments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Assignments per page"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} of ${count} assignments`
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
            <Typography variant="body2">Edit Assignment</Typography>
          </Stack>
        </MenuItem>
        
        {selectedAssignment?.status === 'unassigned' && (
          <MenuItem onClick={handleReassign}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Users size={16} />
              <Typography variant="body2">Assign Agent</Typography>
            </Stack>
          </MenuItem>
        )}
        
        {(selectedAssignment?.status === 'assigned' || selectedAssignment?.status === 'confirmed') && (
          <MenuItem onClick={handleReassign}>
            <Stack direction="row" spacing={2} alignItems="center">
              <RefreshCw size={16} />
              <Typography variant="body2">Reassign Agent</Typography>
            </Stack>
          </MenuItem>
        )}
        
        {selectedAssignment?.status === 'assigned' && (
          <MenuItem onClick={handleConfirm}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CheckCircle size={16} />
              <Typography variant="body2">Confirm Assignment</Typography>
            </Stack>
          </MenuItem>
        )}
        
        <MenuItem onClick={handleAddBackup}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Shield size={16} />
            <Typography variant="body2">Add Backup Agent</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <AlertTriangle size={16} />
            <Typography variant="body2">Flag SLA Risk</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Phone size={16} />
            <Typography variant="body2">Contact Agent</Typography>
          </Stack>
        </MenuItem>
        
        <MenuItem>
          <Stack direction="row" spacing={2} alignItems="center">
            <Mail size={16} />
            <Typography variant="body2">Send Notification</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default AssignmentsTable;
