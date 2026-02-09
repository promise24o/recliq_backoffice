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
  FileText,
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
  Building,
  User,
  Mail,
  Phone,
  Download,
  Edit,
  Eye,
  Target,
  Activity
} from 'lucide-react';
import type { EnterpriseContract, WasteCategory } from '../types';
import { 
  getContractStatusColor, 
  getContractTypeColor, 
  getPricingModelColor,
  getSLATierColor,
  formatCurrency,
  formatPercentage,
  getDaysUntilExpiry
} from '../mockData';

interface ContractDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  contract: EnterpriseContract | null;
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
      id={`contract-tabpanel-${index}`}
      aria-labelledby={`contract-tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const ContractDetailDrawer: React.FC<ContractDetailDrawerProps> = ({
  open,
  onClose,
  contract
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!contract) return null;

  const daysUntilExpiry = getDaysUntilExpiry(contract.expiryDate);
  const expiryStatus = daysUntilExpiry < 0 ? 'Expired' : daysUntilExpiry <= 90 ? 'Expiring Soon' : 'Active';

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
              <FileText size={24} color="#3b82f6" />
              <Box>
                <Typography variant="h6" fontWeight="600">
                  {contract.contractNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {contract.clientName}
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
              label={contract.status.replace('_', ' ').toUpperCase()}
              size="small"
              sx={{
                bgcolor: getContractStatusColor(contract.status) + '15',
                color: getContractStatusColor(contract.status),
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
            <Chip
              label={expiryStatus}
              size="small"
              color={expiryStatus === 'Expired' ? 'error' : expiryStatus === 'Expiring Soon' ? 'warning' : 'success'}
            />
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
          </Stack>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Pricing" />
            <Tab label="SLA" />
            <Tab label="Coverage" />
            <Tab label="Performance" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* Overview Tab */}
          <TabPanel value={activeTab} index={0}>
            <Stack spacing={3}>
              {/* Contract Overview */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Contract Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Calendar size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Effective Date</Typography>
                          <Typography variant="body2">{new Date(contract.effectiveDate).toLocaleDateString()}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Clock size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Expiry Date</Typography>
                          <Typography variant="body2">{new Date(contract.expiryDate).toLocaleDateString()}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Target size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Renewal Window</Typography>
                          <Typography variant="body2">{contract.renewalWindow.replace('_', ' ')}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <User size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Contract Owner</Typography>
                          <Typography variant="body2">{contract.contractOwner}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <DollarSign size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Total Revenue</Typography>
                          <Typography variant="body2">{formatCurrency(contract.totalRevenue)}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Scale size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Average Margin</Typography>
                          <Typography variant="body2">{formatPercentage(contract.averageMargin)}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Contract Performance */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Performance Metrics
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Total Pickups</Typography>
                      <Typography variant="h6" fontWeight="600">{contract.totalPickups.toLocaleString()}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">SLA Breaches</Typography>
                      <Typography variant="h6" fontWeight="600">{contract.slaBreaches.toLocaleString()}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Penalties Triggered</Typography>
                      <Typography variant="h6" fontWeight="600">{contract.penaltiesTriggered.toLocaleString()}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Risk Level</Typography>
                      <Chip
                        label={contract.riskLevel.toUpperCase()}
                        size="small"
                        color={contract.riskLevel === 'low' ? 'success' : contract.riskLevel === 'medium' ? 'warning' : 'error'}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Amendments */}
              {contract.amendments.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Contract Amendments
                  </Typography>
                  <Stack spacing={2}>
                    {contract.amendments.map((amendment) => (
                      <Box key={amendment.amendmentId} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" fontWeight="500">
                            {amendment.type.toUpperCase()} - {new Date(amendment.effectiveDate).toLocaleDateString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {amendment.approvedBy}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                          {amendment.description}
                        </Typography>
                        <Typography variant="caption" color="primary" mt={1}>
                          Impact: {amendment.impact}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              )}
            </Stack>
          </TabPanel>

          {/* Pricing Tab */}
          <TabPanel value={activeTab} index={1}>
            <Stack spacing={3}>
              {/* Pricing Model Overview */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Pricing Model
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <DollarSign size={16} color="#6b7280" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Model Type</Typography>
                      <Chip
                        label={contract.pricingModel.model.replace('_', ' ').toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: getPricingModelColor(contract.pricingModel.model) + '15',
                          color: getPricingModelColor(contract.pricingModel.model),
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      />
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Building size={16} color="#6b7280" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Currency</Typography>
                      <Typography variant="body2">{contract.pricingModel.currency}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>

              {/* Base Rates */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Base Rates (per kg)
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Waste Category</TableCell>
                        <TableCell align="right">Rate (₦)</TableCell>
                        <TableCell>Effective Date</TableCell>
                        <TableCell>Special Conditions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contract.pricingModel.baseRates.map((rate, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="500">
                              {rate.wasteCategory.replace('_', ' ').toUpperCase()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight="500">
                              {formatCurrency(rate.baseRate)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(rate.effectiveDate).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {rate.specialConditions && rate.specialConditions.length > 0 ? (
                              <Stack spacing={1}>
                                {rate.specialConditions.map((condition, idx) => (
                                  <Chip
                                    key={idx}
                                    label={condition}
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

              {/* Volume Tiers */}
              {contract.pricingModel.volumeTiers.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Volume Tiers
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Volume Range (kg/month)</TableCell>
                          <TableCell align="right">Discount</TableCell>
                          <TableCell>Effective Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {contract.pricingModel.volumeTiers.map((tier, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Typography variant="body2" fontWeight="500">
                                {tier.minVolume.toLocaleString()} - {tier.maxVolume ? tier.maxVolume.toLocaleString() : '∞'} kg
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Chip
                                label={`${tier.discountPercentage}%`}
                                size="small"
                                color="success"
                                sx={{ fontSize: '0.75rem' }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {new Date(tier.effectiveDate).toLocaleDateString()}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}

              {/* Special Clauses */}
              {contract.pricingModel.specialClauses.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Special Pricing Clauses
                  </Typography>
                  <Stack spacing={2}>
                    {contract.pricingModel.specialClauses.map((clause) => (
                      <Box key={clause.clauseId} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" fontWeight="500">
                            {clause.description}
                          </Typography>
                          <Chip
                            label={clause.riskLevel.toUpperCase()}
                            size="small"
                            color={clause.riskLevel === 'low' ? 'success' : clause.riskLevel === 'medium' ? 'warning' : 'error'}
                          />
                        </Stack>
                        <Typography variant="body2" color="primary" mt={1}>
                          Financial Impact: {formatCurrency(clause.pricingImpact)}
                        </Typography>
                        {clause.approvedBy && (
                          <Typography variant="caption" color="text.secondary">
                            Approved by: {clause.approvedBy}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              )}
            </Stack>
          </TabPanel>

          {/* SLA Tab */}
          <TabPanel value={activeTab} index={2}>
            <Stack spacing={3}>
              {/* SLA Overview */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  SLA Configuration
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Shield size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">SLA Tier</Typography>
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
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Clock size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Response Time</Typography>
                          <Typography variant="body2">{contract.slaConfiguration.responseTime} minutes</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Calendar size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Pickup Window</Typography>
                          <Typography variant="body2">
                            {contract.slaConfiguration.pickupWindow.start} - {contract.slaConfiguration.pickupWindow.end}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Target size={16} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Completion Rate</Typography>
                          <Typography variant="body2">{formatPercentage(contract.slaConfiguration.completionRate)}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Penalty Rules */}
              {contract.slaConfiguration.penaltyRules.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Penalty Rules
                  </Typography>
                  <Stack spacing={2}>
                    {contract.slaConfiguration.penaltyRules.map((rule) => (
                      <Box key={rule.ruleId} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" fontWeight="500">
                            {rule.trigger.replace('_', ' ').toUpperCase()}
                          </Typography>
                          <Chip
                            label={rule.penaltyType.replace('_', ' ').toUpperCase()}
                            size="small"
                            color="error"
                          />
                        </Stack>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                          {rule.calculationMethod}
                        </Typography>
                        <Typography variant="body2" color="primary" mt={1}>
                          Penalty: {rule.penaltyType === 'percentage' ? formatPercentage(rule.penaltyValue) : formatCurrency(rule.penaltyValue)}
                        </Typography>
                        {rule.maxPenalty && (
                          <Typography variant="caption" color="text.secondary">
                            Max penalty: {formatCurrency(rule.maxPenalty)}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              )}

              {/* Service Credits */}
              {contract.slaConfiguration.serviceCredits.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Service Credits
                  </Typography>
                  <Stack spacing={2}>
                    {contract.slaConfiguration.serviceCredits.map((credit) => (
                      <Box key={credit.ruleId} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        <Typography variant="body2" fontWeight="500">
                          {credit.trigger}
                        </Typography>
                        <Typography variant="body2" color="primary" mt={1}>
                          Credit: {credit.creditType === 'percentage' ? formatPercentage(credit.creditValue) : formatCurrency(credit.creditValue)}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              )}
            </Stack>
          </TabPanel>

          {/* Coverage Tab */}
          <TabPanel value={activeTab} index={3}>
            <Stack spacing={3}>
              {/* Geographic Coverage */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Geographic Coverage
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Cities</Typography>
                      <Stack spacing={1}>
                        {contract.coverage.cities.map((city, index) => (
                          <Chip key={index} label={city} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Zones</Typography>
                      <Stack spacing={1}>
                        {contract.coverage.zones.map((zone, index) => (
                          <Chip key={index} label={zone} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Locations</Typography>
                      <Stack spacing={1}>
                        {contract.coverage.locations.map((location, index) => (
                          <Chip key={index} label={location} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Waste Types */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Waste Types Coverage
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Covered Waste Types
                    </Typography>
                    <Stack spacing={1} direction="row" flexWrap="wrap">
                      {contract.coverage.wasteTypes.map((wasteType, index) => (
                        <Chip key={index} label={wasteType.replace('_', ' ').toUpperCase()} size="small" color="success" />
                      ))}
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Excluded Waste Types
                    </Typography>
                    <Stack spacing={1} direction="row" flexWrap="wrap">
                      {contract.coverage.excludedWasteTypes.map((wasteType, index) => (
                        <Chip key={index} label={wasteType.replace('_', ' ').toUpperCase()} size="small" color="error" />
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Special Requirements */}
              {contract.coverage.specialRequirements.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Special Requirements
                  </Typography>
                  <Stack spacing={1}>
                    {contract.coverage.specialRequirements.map((requirement, index) => (
                      <Chip key={index} label={requirement} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </Paper>
              )}
            </Stack>
          </TabPanel>

          {/* Performance Tab */}
          <TabPanel value={activeTab} index={4}>
            <Stack spacing={3}>
              {/* Performance Summary */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Performance Summary
                </Typography>
                <Alert severity={contract.riskLevel === 'high' ? 'error' : contract.riskLevel === 'medium' ? 'warning' : 'success'}>
                  <Typography variant="body2" fontWeight="600" mb={1}>
                    Contract Performance Assessment
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      • {contract.totalPickups} total pickups completed
                    </Typography>
                    <Typography variant="body2">
                      • {formatCurrency(contract.totalRevenue)} total revenue generated
                    </Typography>
                    <Typography variant="body2">
                      • {formatPercentage(contract.averageMargin)} average margin maintained
                    </Typography>
                    <Typography variant="body2">
                      • {contract.slaBreaches} SLA breaches recorded
                    </Typography>
                    <Typography variant="body2">
                      • {contract.penaltiesTriggered} penalties triggered
                    </Typography>
                  </Stack>
                </Alert>
              </Paper>

              {/* Compliance Flags */}
              {contract.complianceFlags.length > 0 && (
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Compliance Flags
                  </Typography>
                  <Stack spacing={1}>
                    {contract.complianceFlags.map((flag, index) => (
                      <Chip key={index} label={flag} size="small" color="warning" />
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
              Export
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Edit />}
            >
              Edit Contract
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

export default ContractDetailDrawer;
