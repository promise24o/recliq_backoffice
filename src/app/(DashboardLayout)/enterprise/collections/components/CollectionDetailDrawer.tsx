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
  ListItemIcon
} from '@mui/material';
import {
  X,
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
  RotateCcw,
  Timer,
  Shield,
  Truck,
  FileText,
  TrendingUp,
  Users,
  Building,
  Navigation,
  Info,
  RefreshCw
} from 'lucide-react';
import type { ScheduledCollection, WasteCategory, RiskFactor } from '../types';
import { 
  getCollectionStatusColor, 
  getCollectionTypeColor, 
  getWasteTypeColor,
  getSLARiskColor,
  getPriorityColor,
  formatWeight,
  formatDuration
} from '../mockData';

interface CollectionDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  collection: ScheduledCollection | null;
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
      id={`collection-tabpanel-${index}`}
      aria-labelledby={`collection-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const CollectionDetailDrawer: React.FC<CollectionDetailDrawerProps> = ({
  open,
  onClose,
  collection
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!collection) return null;

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
              <Calendar size={24} color="#3b82f6" />
              <Box>
                <Typography variant="h6" fontWeight="600">
                  {collection.collectionId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {collection.clientName} • {collection.location.name}
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
              label={collection.status.replace('_', ' ').toUpperCase()}
              size="small"
              sx={{
                bgcolor: getCollectionStatusColor(collection.status) + '15',
                color: getCollectionStatusColor(collection.status),
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
            <Chip
              label={collection.collectionType.replace('_', ' ').toUpperCase()}
              size="small"
              sx={{
                bgcolor: getCollectionTypeColor(collection.collectionType) + '15',
                color: getCollectionTypeColor(collection.collectionType),
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
            <Chip
              label={collection.priority.toUpperCase()}
              size="small"
              sx={{
                bgcolor: getPriorityColor(collection.priority) + '15',
                color: getPriorityColor(collection.priority),
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
          </Stack>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Schedule" />
            <Tab label="Assignment" />
            <Tab label="Risk Assessment" />
            <Tab label="Actions" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* Overview Tab */}
          <TabPanel value={activeTab} index={0}>
            <Stack spacing={3}>
              {/* Collection Overview */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Collection Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Building size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Client</Typography>
                          <Typography variant="body2">{collection.clientName}</Typography>
                          <Typography variant="caption" color="text.secondary">{collection.contractNumber}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Calendar size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Scheduled Date</Typography>
                          <Typography variant="body2">{new Date(collection.scheduledDate).toLocaleDateString()}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Clock size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Scheduled Time</Typography>
                          <Typography variant="body2">{collection.scheduledTime}</Typography>
                          <Typography variant="caption" color="text.secondary">Duration: {formatDuration(collection.estimatedDuration)}</Typography>
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
                          <Typography variant="body2">{collection.location.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{collection.city} • {collection.zone}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Target size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">SLA Window</Typography>
                          <Typography variant="body2">{collection.slaWindow.start} - {collection.slaWindow.end}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <AlertTriangle size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">SLA Risk</Typography>
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
                        </Box>
                      </Stack>
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
                        <TableCell>Container Requirements</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {collection.wasteCategories.map((waste, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Chip
                              label={waste.type.replace('_', ' ').toUpperCase()}
                              size="small"
                              sx={{
                                bgcolor: getWasteTypeColor(waste.type) + '15',
                                color: getWasteTypeColor(waste.type),
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
                            {waste.containerRequirements.length > 0 ? (
                              <Stack spacing={1}>
                                {waste.containerRequirements.map((req, idx) => (
                                  <Chip
                                    key={idx}
                                    label={req}
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

              {/* Contact Person */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Contact Person
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <User size={16} color="#6b7280" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Name</Typography>
                      <Typography variant="body2">{collection.contactPerson.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{collection.contactPerson.title}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Phone size={16} color="#6b7280" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Phone</Typography>
                      <Typography variant="body2">{collection.contactPerson.phone}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Mail size={16} color="#6b7280" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Email</Typography>
                      <Typography variant="body2">{collection.contactPerson.email}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>

              {/* Special Requirements */}
              {collection.specialRequirements.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Special Requirements
                  </Typography>
                  <Stack spacing={1}>
                    {collection.specialRequirements.map((requirement, index) => (
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
            </Stack>
          </TabPanel>

          {/* Schedule Tab */}
          <TabPanel value={activeTab} index={1}>
            <Stack spacing={3}>
              {/* Schedule Details */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Schedule Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Calendar size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Scheduled Date</Typography>
                          <Typography variant="body2">{new Date(collection.scheduledDate).toLocaleDateString()}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Clock size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Scheduled Time</Typography>
                          <Typography variant="body2">{collection.scheduledTime}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Timer size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Estimated Duration</Typography>
                          <Typography variant="body2">{formatDuration(collection.estimatedDuration)}</Typography>
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
                          <Typography variant="body2">{collection.slaWindow.start} - {collection.slaWindow.end}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <RefreshCw size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Reschedule Count</Typography>
                          <Typography variant="body2">{collection.rescheduleCount} times</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Info size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Created</Typography>
                          <Typography variant="body2">{new Date(collection.createdAt).toLocaleDateString()}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Recurrence Pattern */}
              {collection.recurrencePattern && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Recurrence Pattern
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <RotateCcw size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Pattern Type</Typography>
                            <Typography variant="body2">{collection.recurrencePattern.type.replace('_', ' ').toUpperCase()}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Calendar size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Frequency</Typography>
                            <Typography variant="body2">Every {collection.recurrencePattern.frequency} {collection.recurrencePattern.type === 'daily' ? 'day(s)' : 'week(s)'}</Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        {collection.recurrencePattern.endDate && (
                          <Stack direction="row" spacing={2}>
                            <Calendar size={16} color="#6b7280" />
                            <Box>
                              <Typography variant="body2" color="text.secondary">End Date</Typography>
                              <Typography variant="body2">{new Date(collection.recurrencePattern.endDate).toLocaleDateString()}</Typography>
                            </Box>
                          </Stack>
                        )}
                        {collection.recurrencePattern.daysOfWeek && (
                          <Stack direction="row" spacing={2}>
                            <Calendar size={16} color="#6b7280" />
                            <Box>
                              <Typography variant="body2" color="text.secondary">Days of Week</Typography>
                              <Typography variant="body2">
                                {collection.recurrencePattern.daysOfWeek.map(day => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]).join(', ')}
                              </Typography>
                            </Box>
                          </Stack>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Access Instructions */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Access Instructions
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <Navigation size={16} color="#6b7280" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Location Access</Typography>
                      <Typography variant="body2">{collection.accessInstructions}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Info size={16} color="#6b7280" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Location Details</Typography>
                      <Typography variant="body2">{collection.location.accessInstructions}</Typography>
                      <Typography variant="body2" color="text.secondary">{collection.location.parkingInfo}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </TabPanel>

          {/* Assignment Tab */}
          <TabPanel value={activeTab} index={2}>
            <Stack spacing={3}>
              {/* Assigned Agent */}
              {collection.assignedAgent && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Assigned Agent
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                          <User size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Agent Name</Typography>
                            <Typography variant="body2">{collection.assignedAgent.agentName}</Typography>
                            <Typography variant="caption" color="text.secondary">{collection.assignedAgent.agentType}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Phone size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Contact</Typography>
                            <Typography variant="body2">{collection.assignedAgent.contact.phone}</Typography>
                            <Typography variant="body2">{collection.assignedAgent.contact.email}</Typography>
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
                            <Typography variant="body2">{collection.assignedAgent.vehicleInfo.type}</Typography>
                            <Typography variant="body2">{collection.assignedAgent.vehicleInfo.plate}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Package size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Current Load</Typography>
                            <Typography variant="body2">{formatWeight(collection.assignedAgent.currentLoad)} / {formatWeight(collection.assignedAgent.capacity.maxWeight)}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {((collection.assignedAgent.currentLoad / collection.assignedAgent.capacity.maxWeight) * 100).toFixed(1)}% utilized
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Backup Agent */}
              {collection.backupAgent && (
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
                            <Typography variant="body2">{collection.backupAgent.agentName}</Typography>
                            <Typography variant="caption" color="text.secondary">{collection.backupAgent.agentType}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Phone size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Contact</Typography>
                            <Typography variant="body2">{collection.backupAgent.contact.phone}</Typography>
                            <Typography variant="body2">{collection.backupAgent.contact.email}</Typography>
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
                            <Typography variant="body2">{collection.backupAgent.vehicleInfo.type}</Typography>
                            <Typography variant="body2">{collection.backupAgent.vehicleInfo.plate}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Package size={16} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Current Load</Typography>
                            <Typography variant="body2">{formatWeight(collection.backupAgent.currentLoad)} / {formatWeight(collection.backupAgent.capacity.maxWeight)}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {((collection.backupAgent.currentLoad / collection.backupAgent.capacity.maxWeight) * 100).toFixed(1)}% utilized
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Performance Metrics */}
              {collection.assignedAgent && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Agent Performance
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">On-Time Rate</Typography>
                        <Typography variant="h6" fontWeight="600">{collection.assignedAgent.performance.onTimeRate.toFixed(1)}%</Typography>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">Completion Rate</Typography>
                        <Typography variant="h6" fontWeight="600">{collection.assignedAgent.performance.completionRate.toFixed(1)}%</Typography>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">Average Rating</Typography>
                        <Typography variant="h6" fontWeight="600">{collection.assignedAgent.performance.averageRating.toFixed(1)} / 5.0</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              )}
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
                        label={collection.slaRisk.replace('_', ' ').toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: getSLARiskColor(collection.slaRisk) + '15',
                          color: getSLARiskColor(collection.slaRisk),
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
                      <Typography variant="body2">{formatWeight(collection.estimatedVolume)}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>

              {/* Risk Factors */}
              {collection.riskFactors.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Risk Factors
                  </Typography>
                  <Stack spacing={2}>
                    {collection.riskFactors.map((risk) => (
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
              )}

              {/* No Risk Factors */}
              {collection.riskFactors.length === 0 && (
                <Paper sx={{ p: 3 }}>
                  <Alert severity="success">
                    <Typography variant="body2" fontWeight="600" mb={1}>
                      No Risk Factors Detected
                    </Typography>
                    <Typography variant="body2">
                      This collection has no identified risk factors and is proceeding according to schedule.
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
                  <Button
                    variant="outlined"
                    startIcon={<User />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Assign Agent
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Calendar />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Reschedule Collection
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
                    startIcon={<Mail />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Notify Client
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Timer />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Set Reminder
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<FileText />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Add Note
                  </Button>
                </Stack>
              </Paper>

              {/* Notes */}
              {collection.notes.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Collection Notes
                  </Typography>
                  <List>
                    {collection.notes.map((note, index) => (
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
            
            <Button
              variant="outlined"
              startIcon={<Calendar />}
            >
              Reschedule
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<User />}
            >
              Assign Agent
            </Button>
            
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

export default CollectionDetailDrawer;
