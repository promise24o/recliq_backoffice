'use client';
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  Stack,
  Divider,
  Alert,
  Grid,
  Paper,
  Chip,
  Button,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Switch,
  FormControlLabel,
  TextField
} from '@mui/material';
import {
  X,
  Users,
  Calendar,
  Clock,
  User,
  MapPin,
  Package,
  AlertTriangle,
  CheckCircle,
  Settings,
  Target,
  Activity,
  Phone,
  Mail,
  Download,
  Edit,
  Eye,
  Send,
  RefreshCw,
  Building,
  TrendingUp,
  Navigation,
  Info,
  History,
  MessageSquare,
  Shield,
  FileCheck,
  Truck,
  Timer,
  Star,
  Award,
  Zap,
  AlertCircle
} from 'lucide-react';
import type { AgentAssignment, AgentInfo, FleetInfo, AssignmentRiskFactor } from '../types';
import { 
  getAssignmentStatusColor, 
  getAgentTypeColor,
  getSLARiskColor,
  formatWeight,
  formatDuration
} from '../mockData';

interface AssignmentDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  assignment: AgentAssignment | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`assignment-tabpanel-${index}`}
      aria-labelledby={`assignment-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const AssignmentDetailDrawer: React.FC<AssignmentDetailDrawerProps> = ({
  open,
  onClose,
  assignment
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!assignment) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', md: 900 },
          p: 0
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: '#f8fafc'
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Users size={24} color="#3b82f6" />
              <Box>
                <Typography variant="h6" fontWeight="600">
                  {assignment.assignmentId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {assignment.clientName} • {assignment.location.name}
                </Typography>
              </Box>
            </Stack>
            
            <IconButton onClick={onClose}>
              <X size={20} />
            </IconButton>
          </Stack>
        </Box>

        {/* Status Bar */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center">
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
            <Chip
              label={assignment.agentType.toUpperCase()}
              size="small"
              sx={{
                bgcolor: getAgentTypeColor(assignment.agentType) + '15',
                color: getAgentTypeColor(assignment.agentType),
                fontSize: '0.75rem',
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
                  fontSize: '0.75rem',
                  fontWeight: 500
                }}
              />
            )}
          </Stack>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Agent Readiness" />
            <Tab label="Timeline & SLA" />
            <Tab label="Risk Assessment" />
            <Tab label="Actions" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* Overview Tab */}
          <TabPanel value={activeTab} index={0}>
            <Stack spacing={3}>
              {/* Assignment Overview */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Assignment Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Building size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Client</Typography>
                          <Typography variant="body2">{assignment.clientName}</Typography>
                          <Typography variant="caption" color="text.secondary">{assignment.contractNumber}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Calendar size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Scheduled Date</Typography>
                          <Typography variant="body2">{new Date(assignment.scheduledDate).toLocaleDateString()}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Clock size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Scheduled Time</Typography>
                          <Typography variant="body2">{assignment.scheduledTime}</Typography>
                          <Typography variant="caption" color="text.secondary">Duration: {formatDuration(assignment.estimatedDuration)}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <MapPin size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Location</Typography>
                          <Typography variant="body2">{assignment.location.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{assignment.city} • {assignment.zone}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Target size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">SLA Window</Typography>
                          <Typography variant="body2">{assignment.slaWindow.start} - {assignment.slaWindow.end}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <AlertTriangle size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">SLA Risk</Typography>
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
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Collection Details */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Collection Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Package size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Estimated Volume</Typography>
                          <Typography variant="body2">{formatWeight(assignment.estimatedVolume)}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Timer size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Estimated Duration</Typography>
                          <Typography variant="body2">{formatDuration(assignment.estimatedDuration)}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      {assignment.actualVolume && (
                        <Stack direction="row" spacing={2}>
                          <Package size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Actual Volume</Typography>
                            <Typography variant="body2">{formatWeight(assignment.actualVolume)}</Typography>
                          </Box>
                        </Stack>
                      )}
                      {assignment.actualDuration && (
                        <Stack direction="row" spacing={2}>
                          <Timer size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Actual Duration</Typography>
                            <Typography variant="body2">{formatDuration(assignment.actualDuration)}</Typography>
                          </Box>
                        </Stack>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Waste Categories */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Waste Categories
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Waste Type</TableCell>
                        <TableCell align="right">Estimated Weight</TableCell>
                        <TableCell>Special Handling</TableCell>
                        <TableCell>Equipment Required</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignment.wasteCategories.map((waste, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Chip
                              label={waste.type.toUpperCase()}
                              size="small"
                              sx={{
                                bgcolor: '#3b82f615',
                                color: '#3b82f6',
                                fontSize: '0.75rem',
                                fontWeight: 500
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight="500">
                              {formatWeight(waste.estimatedWeight)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {waste.specialHandling.length > 0 ? (
                              <Stack spacing={1}>
                                {waste.specialHandling.map((handling, idx) => (
                                  <Chip
                                    key={idx}
                                    label={handling}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                ))}
                              </Stack>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                Standard
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {waste.equipmentRequired.length > 0 ? (
                              <Stack spacing={1}>
                                {waste.equipmentRequired.map((equipment, idx) => (
                                  <Chip
                                    key={idx}
                                    label={equipment}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                ))}
                              </Stack>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                Standard
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              {/* Special Requirements */}
              {assignment.specialRequirements.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Special Requirements
                  </Typography>
                  <Stack spacing={1}>
                    {assignment.specialRequirements.map((requirement, index) => (
                      <Chip
                        key={index}
                        label={requirement}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    ))}
                  </Stack>
                </Paper>
              )}

              {/* Notes */}
              {assignment.notes.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Assignment Notes
                  </Typography>
                  <List>
                    {assignment.notes.map((note, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={note} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Stack>
          </TabPanel>

          {/* Agent Readiness Tab */}
          <TabPanel value={activeTab} index={1}>
            <Stack spacing={3}>
              {/* Primary Agent */}
              {assignment.primaryAgent && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Primary Agent
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <User size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Agent Name</Typography>
                            <Typography variant="body2">{assignment.primaryAgent.agentName}</Typography>
                            <Typography variant="caption" color="text.secondary">{assignment.primaryAgent.agentType}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Phone size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Contact</Typography>
                            <Typography variant="body2">{assignment.primaryAgent.contact.phone}</Typography>
                            <Typography variant="body2">{assignment.primaryAgent.contact.email}</Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <Truck size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Vehicle</Typography>
                            <Typography variant="body2">{assignment.primaryAgent.vehicleInfo.type}</Typography>
                            <Typography variant="body2">{assignment.primaryAgent.vehicleInfo.plate}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Package size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Current Load</Typography>
                            <Typography variant="body2">{formatWeight(assignment.primaryAgent.currentLoad)} / {formatWeight(assignment.primaryAgent.capacity.maxWeight)}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {((assignment.primaryAgent.currentLoad / assignment.primaryAgent.capacity.maxWeight) * 100).toFixed(1)}% utilized
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Fleet Information */}
              {assignment.fleetInfo && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Fleet Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <Truck size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Fleet Name</Typography>
                            <Typography variant="body2">{assignment.fleetInfo.fleetName}</Typography>
                            <Typography variant="caption" color="text.secondary">{assignment.fleetInfo.fleetType}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Users size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Lead Agent</Typography>
                            <Typography variant="body2">{assignment.fleetInfo.leadAgent.agentName}</Typography>
                            <Typography variant="caption" color="text.secondary">{assignment.fleetInfo.leadAgent.agentType}</Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <Package size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Fleet Capacity</Typography>
                            <Typography variant="body2">{formatWeight(assignment.fleetInfo.capacity.maxWeight)}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {assignment.fleetInfo.supportAgents.length + 1} agents
                            </Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Activity size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Current Load</Typography>
                            <Typography variant="body2">{formatWeight(assignment.fleetInfo.currentLoad)}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {((assignment.fleetInfo.currentLoad / assignment.fleetInfo.capacity.maxWeight) * 100).toFixed(1)}% utilized
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Performance Metrics */}
              {assignment.primaryAgent && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Performance Metrics
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">Enterprise Reliability</Typography>
                        <Typography variant="h6" fontWeight="600">{assignment.primaryAgent.performance.enterpriseReliabilityScore.toFixed(1)}%</Typography>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">On-Time Rate</Typography>
                        <Typography variant="h6" fontWeight="600">{assignment.primaryAgent.performance.onTimeRate.toFixed(1)}%</Typography>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">Completion Rate</Typography>
                        <Typography variant="h6" fontWeight="600">{assignment.primaryAgent.performance.completionRate.toFixed(1)}%</Typography>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">Average Rating</Typography>
                        <Typography variant="h6" fontWeight="600">{assignment.primaryAgent.performance.averageRating.toFixed(1)} / 5.0</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Backup Agent */}
              {assignment.backupAgent && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Backup Agent
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <User size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Agent Name</Typography>
                            <Typography variant="body2">{assignment.backupAgent.agentName}</Typography>
                            <Typography variant="caption" color="text.secondary">{assignment.backupAgent.agentType}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Phone size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Contact</Typography>
                            <Typography variant="body2">{assignment.backupAgent.contact.phone}</Typography>
                            <Typography variant="body2">{assignment.backupAgent.contact.email}</Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <Truck size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Vehicle</Typography>
                            <Typography variant="body2">{assignment.backupAgent.vehicleInfo.type}</Typography>
                            <Typography variant="body2">{assignment.backupAgent.vehicleInfo.plate}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Package size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Current Load</Typography>
                            <Typography variant="body2">{formatWeight(assignment.backupAgent.currentLoad)} / {formatWeight(assignment.backupAgent.capacity.maxWeight)}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {((assignment.backupAgent.currentLoad / assignment.backupAgent.capacity.maxWeight) * 100).toFixed(1)}% utilized
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </Stack>
          </TabPanel>

          {/* Timeline & SLA Tab */}
          <TabPanel value={activeTab} index={2}>
            <Stack spacing={3}>
              {/* Timeline Overview */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Timeline Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Calendar size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Scheduled Date</Typography>
                          <Typography variant="body2">{new Date(assignment.scheduledDate).toLocaleDateString()}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Clock size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Scheduled Time</Typography>
                          <Typography variant="body2">{assignment.scheduledTime}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Target size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">SLA Window</Typography>
                          <Typography variant="body2">{assignment.slaWindow.start} - {assignment.slaWindow.end}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Timer size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Estimated Duration</Typography>
                          <Typography variant="body2">{formatDuration(assignment.estimatedDuration)}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Assignment History */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Assignment History
                </Typography>
                <Stack spacing={2}>
                  {assignment.assignedAt && (
                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight="500">
                          Assignment Created
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(assignment.assignedAt || assignment.createdAt).toLocaleDateString()}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Assignment created and ready for agent assignment
                      </Typography>
                    </Box>
                  )}
                  
                  {assignment.assignedAt && (
                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight="500">
                          Agent Assigned
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(assignment.assignedAt).toLocaleDateString()}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        {assignment.primaryAgent?.agentName} assigned to collection
                      </Typography>
                    </Box>
                  )}
                  
                  {assignment.confirmedAt && (
                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight="500">
                          Assignment Confirmed
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(assignment.confirmedAt).toLocaleDateString()}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Agent confirmed readiness for collection
                      </Typography>
                    </Box>
                  )}
                  
                  {assignment.completedAt && (
                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight="500">
                          Assignment Completed
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(assignment.completedAt).toLocaleDateString()}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Collection completed successfully
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Paper>
            </Stack>
          </TabPanel>

          {/* Risk Assessment Tab */}
          <TabPanel value={activeTab} index={3}>
            <Stack spacing={3}>
              {/* Risk Overview */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Risk Assessment
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <AlertTriangle size={16} color="#6b7280" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Overall Risk Level</Typography>
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
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Package size={16} color="#6b7280" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Estimated Volume</Typography>
                      <Typography variant="body2">{formatWeight(assignment.estimatedVolume)}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>

              {/* Risk Factors */}
              {assignment.riskFactors.length > 0 ? (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Risk Factors
                  </Typography>
                  <Stack spacing={2}>
                    {assignment.riskFactors.map((risk) => (
                      <Box key={risk.factorId} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" fontWeight="500">
                            {risk.type.replace('_', ' ').toUpperCase()}
                          </Typography>
                          <Chip
                            label={risk.severity.toUpperCase()}
                            size="small"
                            color={risk.severity === 'critical' ? 'error' : risk.severity === 'high' ? 'warning' : 'info'}
                          />
                        </Stack>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                          {risk.description}
                        </Typography>
                        <Typography variant="body2" color="primary" mt={1}>
                          Impact: {risk.impact}
                        </Typography>
                        <Typography variant="body2" color="success" mt={1}>
                          Mitigation: {risk.mitigation}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" mt={1}>
                          Detected: {new Date(risk.detectedAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              ) : (
                <Paper sx={{ p: 3 }}>
                  <Alert severity="success">
                    <Typography variant="body2" fontWeight="600" mb={1}>
                      No Risk Factors Detected
                    </Typography>
                    <Typography variant="body2">
                      This assignment has no identified risk factors and is proceeding according to schedule.
                    </Typography>
                  </Alert>
                </Paper>
              )}
            </Stack>
          </TabPanel>

          {/* Actions Tab */}
          <TabPanel value={activeTab} index={4}>
            <Stack spacing={3}>
              {/* Available Actions */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Available Actions
                </Typography>
                <Stack spacing={2}>
                  {assignment.status === 'unassigned' && (
                    <Button
                      variant="contained"
                      startIcon={<Users />}
                      fullWidth
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Assign Agent
                    </Button>
                  )}
                  
                  {(assignment.status === 'assigned' || assignment.status === 'confirmed') && (
                    <Button
                      variant="outlined"
                      startIcon={<RefreshCw />}
                      fullWidth
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Reassign Agent
                    </Button>
                  )}
                  
                  {assignment.status === 'assigned' && (
                    <Button
                      variant="contained"
                      startIcon={<CheckCircle />}
                      fullWidth
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Confirm Assignment
                    </Button>
                  )}
                  
                  <Button
                    variant="outlined"
                    startIcon={<Shield />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Add Backup Agent
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<AlertTriangle />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Flag SLA Risk
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Phone />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Contact Agent
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Mail />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Send Notification
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<MessageSquare />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Add Note
                  </Button>
                </Stack>
              </Paper>

              {/* Notes */}
              {assignment.notes.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Assignment Notes
                  </Typography>
                  <List>
                    {assignment.notes.map((note, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={note} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Stack>
          </TabPanel>
        </Box>

        {/* Footer Actions */}
        <Box sx={{ 
          p: 3, 
          borderTop: 1, 
          borderColor: 'divider',
          bgcolor: '#f8fafc'
        }}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              startIcon={<Download />}
            >
              Export Details
            </Button>
            
            {assignment.status === 'unassigned' && (
              <Button
                variant="contained"
                startIcon={<Users />}
              >
                Assign Agent
              </Button>
            )}
            
            {(assignment.status === 'assigned' || assignment.status === 'confirmed') && (
              <Button
                variant="contained"
                startIcon={<CheckCircle />}
              >
                Confirm Assignment
              </Button>
            )}
            
            <Button
              variant="contained"
              startIcon={<Eye />}
            >
              View Full Details
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AssignmentDetailDrawer;
