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
  Tooltip
} from '@mui/material';
import {
  X,
  Building,
  DollarSign,
  Shield,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
  TrendingUp,
  Scale,
  User,
  Mail,
  Phone,
  Download,
  Edit,
  Eye,
  Target,
  Activity,
  Truck,
  FileText,
  Award,
  Globe,
  Package
} from 'lucide-react';
import type { EnterpriseClient, WasteCategoryBreakdown, SLABreach } from '../types';
import { 
  getClientStatusColor, 
  getIndustryColor, 
  getContractTypeColor,
  getSLAStatusColor,
  formatCurrency,
  formatWeight
} from '../mockData';

interface EnterpriseClientDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  client: EnterpriseClient | null;
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
      id={`client-tabpanel-${index}`}
      aria-labelledby={`client-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const EnterpriseClientDetailDrawer: React.FC<EnterpriseClientDetailDrawerProps> = ({
  open,
  onClose,
  client
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!client) return null;

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
              <Building size={24} color="#3b82f6" />
              <Box>
                <Typography variant="h6" fontWeight="600">
                  {client.companyName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {client.primaryContact.title} • {client.primaryContact.name}
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
              label={client.clientStatus.replace('_', ' ').toUpperCase()}
              size="small"
              sx={{
                bgcolor: getClientStatusColor(client.clientStatus) + '15',
                color: getClientStatusColor(client.clientStatus),
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
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
          </Stack>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Contact & Location" />
            <Tab label="Performance" />
            <Tab label="Financials" />
            <Tab label="ESG Impact" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* Overview Tab */}
          <TabPanel value={activeTab} index={0}>
            <Stack spacing={3}>
              {/* Client Overview */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Client Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Calendar size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Contract Start</Typography>
                          <Typography variant="body2">{new Date(client.contractStart).toLocaleDateString()}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Target size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Pickup Frequency</Typography>
                          <Typography variant="body2">{client.pickupFrequency.replace('_', ' ').toUpperCase()}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <User size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Account Manager</Typography>
                          <Typography variant="body2">{client.accountManager}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <MapPin size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Total Locations</Typography>
                          <Typography variant="body2">{client.totalLocations} ({client.activeLocations} active)</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Package size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Total Pickups</Typography>
                          <Typography variant="body2">{client.totalPickups.toLocaleString()}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Clock size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Last Pickup</Typography>
                          <Typography variant="body2">
                            {client.lastPickupDate ? new Date(client.lastPickupDate).toLocaleDateString() : 'No pickups yet'}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Performance Metrics */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Performance Metrics
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Monthly Volume</Typography>
                      <Typography variant="h6" fontWeight="600">{formatWeight(client.monthlyVolume)}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Monthly Revenue</Typography>
                      <Typography variant="h6" fontWeight="600">{formatCurrency(client.monthlyRevenue)}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Avg Pickup Weight</Typography>
                      <Typography variant="h6" fontWeight="600">{formatWeight(client.averagePickupWeight)}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">SLA Status</Typography>
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
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Notes */}
              {client.notes && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Notes
                  </Typography>
                  <Typography variant="body2">
                    {client.notes}
                  </Typography>
                </Paper>
              )}

              {/* Tags */}
              {client.tags.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Tags
                  </Typography>
                  <Stack spacing={1} direction="row" flexWrap="wrap">
                    {client.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </Paper>
              )}
            </Stack>
          </TabPanel>

          {/* Contact & Location Tab */}
          <TabPanel value={activeTab} index={1}>
            <Stack spacing={3}>
              {/* Primary Contact */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Primary Contact
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <User size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Name</Typography>
                          <Typography variant="body2">{client.primaryContact.name}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Building size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Title</Typography>
                          <Typography variant="body2">{client.primaryContact.title}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Mail size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Email</Typography>
                          <Typography variant="body2">{client.primaryContact.email}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Phone size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Phone</Typography>
                          <Typography variant="body2">{client.primaryContact.phone}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Headquarters Location */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Headquarters Location
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <MapPin size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Street Address</Typography>
                          <Typography variant="body2">{client.headquarters.street}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Globe size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">City</Typography>
                          <Typography variant="body2">{client.headquarters.city}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Building size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Zone/Area</Typography>
                          <Typography variant="body2">{client.headquarters.zone}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <MapPin size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">State</Typography>
                          <Typography variant="body2">{client.headquarters.state}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Locations */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  All Locations ({client.locations.length})
                </Typography>
                <Stack spacing={2}>
                  {client.locations.map((location, index) => (
                    <Box key={location.id} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight="500">
                          {location.name}
                        </Typography>
                        <Chip
                          label={location.isActive ? 'ACTIVE' : 'INACTIVE'}
                          size="small"
                          color={location.isActive ? 'success' : 'default'}
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        {location.address.street}, {location.address.city}
                      </Typography>
                      {location.specialRequirements && location.specialRequirements.length > 0 && (
                        <Stack spacing={1} direction="row" flexWrap="wrap" mt={1}>
                          {location.specialRequirements.map((req, idx) => (
                            <Chip key={idx} label={req} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                          ))}
                        </Stack>
                      )}
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </TabPanel>

          {/* Performance Tab */}
          <TabPanel value={activeTab} index={2}>
            <Stack spacing={3}>
              {/* Performance Summary */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Performance Summary
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Total Pickups</Typography>
                      <Typography variant="h6" fontWeight="600">{client.totalPickups.toLocaleString()}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Completed Pickups</Typography>
                      <Typography variant="h6" fontWeight="600">{client.completedPickups.toLocaleString()}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Missed Pickups</Typography>
                      <Typography variant="h6" fontWeight="600">{client.missedPickups.toLocaleString()}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Completion Rate</Typography>
                      <Typography variant="h6" fontWeight="600">
                        {client.totalPickups > 0 ? ((client.completedPickups / client.totalPickups) * 100).toFixed(1) : 0}%
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* SLA Performance */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  SLA Performance
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">SLA Compliance Rate</Typography>
                      <Typography variant="h6" fontWeight="600">{client.slaComplianceRate.toFixed(1)}%</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Avg Pickup Time</Typography>
                      <Typography variant="h6" fontWeight="600">{client.averagePickupTime} minutes</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">SLA Breaches</Typography>
                      <Typography variant="h6" fontWeight="600">{client.slaBreaches.length}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* SLA Breaches */}
              {client.slaBreaches.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    SLA Breaches
                  </Typography>
                  <Stack spacing={2}>
                    {client.slaBreaches.map((breach) => (
                      <Box key={breach.id} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" fontWeight="500">
                            {breach.type.replace('_', ' ').toUpperCase()}
                          </Typography>
                          <Chip
                            label={breach.severity.toUpperCase()}
                            size="small"
                            color={breach.severity === 'critical' ? 'error' : breach.severity === 'major' ? 'warning' : 'info'}
                          />
                        </Stack>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                          {breach.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" mt={1}>
                          {new Date(breach.occurredAt).toLocaleDateString()} • Impact: {breach.impact}
                        </Typography>
                        {breach.compensation && (
                          <Typography variant="body2" color="primary" mt={1}>
                            Compensation: {breach.compensation.type} - {formatCurrency(breach.compensation.amount)}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              )}
            </Stack>
          </TabPanel>

          {/* Financials Tab */}
          <TabPanel value={activeTab} index={3}>
            <Stack spacing={3}>
              {/* Financial Summary */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Financial Summary
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Total Revenue</Typography>
                      <Typography variant="h6" fontWeight="600">{formatCurrency(client.totalRevenue)}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Monthly Revenue</Typography>
                      <Typography variant="h6" fontWeight="600">{formatCurrency(client.monthlyRevenue)}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Outstanding Balance</Typography>
                      <Typography variant="h6" fontWeight="600">{formatCurrency(client.outstandingBalance)}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Lifetime Value</Typography>
                      <Typography variant="h6" fontWeight="600">{formatCurrency(client.lifetimeValue)}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Revenue Metrics */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Revenue Metrics
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Avg Revenue per Pickup</Typography>
                      <Typography variant="h6" fontWeight="600">{formatCurrency(client.averageRevenuePerPickup)}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Total Weight Collected</Typography>
                      <Typography variant="h6" fontWeight="600">{formatWeight(client.totalWeightCollected)}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Avg Revenue per kg</Typography>
                      <Typography variant="h6" fontWeight="600">
                        {client.totalWeightCollected > 0 ? formatCurrency(client.totalRevenue / client.totalWeightCollected) : formatCurrency(0)}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Stack>
          </TabPanel>

          {/* ESG Impact Tab */}
          <TabPanel value={activeTab} index={4}>
            <Stack spacing={3}>
              {/* ESG Summary */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  ESG Impact Summary
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">CO₂ Saved</Typography>
                      <Typography variant="h6" fontWeight="600">{client.co2Saved.toLocaleString()} kg</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Trees Equivalent</Typography>
                      <Typography variant="h6" fontWeight="600">{client.treesEquivalent.toLocaleString()}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Water Saved</Typography>
                      <Typography variant="h6" fontWeight="600">{client.waterSaved.toLocaleString()} liters</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Energy Saved</Typography>
                      <Typography variant="h6" fontWeight="600">{client.energySaved.toLocaleString()} kWh</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Waste Categories */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Waste Categories Breakdown
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Weight</TableCell>
                        <TableCell align="right">Percentage</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {client.wasteCategories.map((category, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="500">
                              {category.category.replace('_', ' ').toUpperCase()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              {formatWeight(category.weight)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              {category.percentage.toFixed(1)}%
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight="500">
                              {formatCurrency(category.revenue)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              {/* SDG Alignment */}
              {client.sdgAlignment.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    SDG Alignment
                  </Typography>
                  <Stack spacing={2}>
                    {client.sdgAlignment.map((sdg, index) => (
                      <Box key={index} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" fontWeight="500">
                            SDG {sdg.goalNumber}: {sdg.goalTitle}
                          </Typography>
                          <Chip
                            label={`${((sdg.currentValue / sdg.targetValue) * 100).toFixed(1)}%`}
                            size="small"
                            color="success"
                          />
                        </Stack>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                          {sdg.contribution}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" mt={1}>
                          {sdg.kpi}: {sdg.currentValue} / {sdg.targetValue}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
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
              Export Report
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Calendar />}
            >
              Schedule Pickup
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Edit />}
            >
              Edit Client
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

export default EnterpriseClientDetailDrawer;
