'use client';
import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  Stack,
  Grid,
  Paper,
  Chip,
  IconButton,
  Divider,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  X,
  MapPin,
  Users,
  Shield,
  Clock,
  Package,
  TrendingUp,
  Building2,
  Play,
  Pause,
  Scissors,
  Merge,
  Edit3,
  Calendar,
} from 'lucide-react';
import {
  GoogleMap,
  Polygon,
} from '@react-google-maps/api';
import type { Zone } from '../types';
import {
  getStatusColor,
  getStatusLabel,
  getCoverageColor,
  getCoverageLabel,
  getSLAColor,
  getSLALabel,
  getDemandColor,
  getDemandLabel,
  getZoneMapColor,
} from '../mockData';

interface ZoneDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  zone: Zone | null;
  isMapLoaded?: boolean;
  onActivate?: (zoneId: string) => void;
  onDeactivate?: (zoneId: string) => void;
  onEdit?: (zone: Zone) => void;
  onSplit?: (zone: Zone) => void;
  onMerge?: (zone: Zone) => void;
  onReassignPricing?: (zone: Zone) => void;
}

const miniMapStyle = { width: '100%', height: '200px' };

const ZoneDetailDrawer: React.FC<ZoneDetailDrawerProps> = ({
  open,
  onClose,
  zone,
  isMapLoaded = false,
  onActivate,
  onDeactivate,
  onEdit,
  onSplit,
  onMerge,
  onReassignPricing,
}) => {
  if (!zone) return null;

  const zoneColor = getZoneMapColor(zone);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', md: 900 }, p: 0 } }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <MapPin size={24} color={zoneColor} />
              <Box>
                <Typography variant="h6" fontWeight="600">{zone.name}</Typography>
                <Typography variant="body2" color="text.secondary">{zone.id} • {zone.city}, {zone.state} • v{zone.version}</Typography>
              </Box>
            </Stack>
            <IconButton onClick={onClose}><X size={20} /></IconButton>
          </Stack>
        </Box>

        {/* Status Bar */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Chip label={getStatusLabel(zone.status).toUpperCase()} size="small" sx={{ bgcolor: getStatusColor(zone.status) + '15', color: getStatusColor(zone.status), fontWeight: 600 }} />
            <Chip label={`Coverage: ${getCoverageLabel(zone.coverageLevel)}`} size="small" sx={{ bgcolor: getCoverageColor(zone.coverageLevel) + '15', color: getCoverageColor(zone.coverageLevel), fontWeight: 500 }} />
            <Chip label={`SLA: ${getSLALabel(zone.slaTier)}`} size="small" sx={{ bgcolor: getSLAColor(zone.slaTier) + '15', color: getSLAColor(zone.slaTier), fontWeight: 500 }} />
            <Chip label={`Demand: ${getDemandLabel(zone.demandIntensity)}`} size="small" sx={{ bgcolor: getDemandColor(zone.demandIntensity) + '15', color: getDemandColor(zone.demandIntensity) }} />
            <Chip label={`${zone.boundary.areaKm2} km²`} size="small" variant="outlined" />
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Zone Overview with Mini Map */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>Zone Overview</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>{zone.description}</Typography>
              {isMapLoaded && (
                <Box sx={{ borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                  <GoogleMap
                    mapContainerStyle={miniMapStyle}
                    center={zone.boundary.center}
                    zoom={13}
                    options={{ disableDefaultUI: true, zoomControl: false, draggable: false }}
                  >
                    <Polygon
                      paths={zone.boundary.polygon}
                      options={{
                        fillColor: zoneColor,
                        fillOpacity: 0.35,
                        strokeColor: zoneColor,
                        strokeOpacity: 1,
                        strokeWeight: 2,
                      }}
                    />
                  </GoogleMap>
                </Box>
              )}
            </Paper>

            {/* Quick Stats */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, md: 3 }}>
                <Box sx={{ p: 2, bgcolor: '#EFF6FF', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Active Agents</Typography>
                  <Typography variant="h5" fontWeight="700" color="#3B82F6">{zone.activeAgents}</Typography>
                  <Typography variant="caption" color="text.secondary">of {zone.totalAgents}</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Box sx={{ p: 2, bgcolor: '#ECFDF5', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Pickups/Day</Typography>
                  <Typography variant="h5" fontWeight="700" color="#10B981">{zone.avgPickupsPerDay}</Typography>
                  <Typography variant="caption" color="text.secondary">avg daily</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Box sx={{ p: 2, bgcolor: '#F5F3FF', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">SLA Compliance</Typography>
                  <Typography variant="h5" fontWeight="700" color="#8B5CF6">{zone.performance.slaCompliancePercent}%</Typography>
                  <Typography variant="caption" color="text.secondary">target: 90%</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Box sx={{ p: 2, bgcolor: zone.coverageGapPercent > 30 ? '#FEF2F2' : '#FFFBEB', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Coverage Gap</Typography>
                  <Typography variant="h5" fontWeight="700" color={zone.coverageGapPercent > 30 ? '#EF4444' : '#F59E0B'}>{zone.coverageGapPercent}%</Typography>
                  <Typography variant="caption" color="text.secondary">uncovered area</Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Operational Settings */}
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Shield size={18} color="#3B82F6" />
                <Typography variant="h6" fontWeight="600">Operational Settings</Typography>
              </Stack>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="caption" color="text.secondary">Pricing Rule</Typography>
                  <Typography variant="body2" fontWeight="600">{zone.pricingRuleName || 'None assigned'}</Typography>
                  {zone.pricingRuleId && <Typography variant="caption" color="text.secondary">{zone.pricingRuleId}</Typography>}
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">SLA Tier</Typography>
                  <Box mt={0.5}>
                    <Chip label={getSLALabel(zone.slaTier)} size="small" sx={{ bgcolor: getSLAColor(zone.slaTier) + '15', color: getSLAColor(zone.slaTier), fontWeight: 600 }} />
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Drop-off Eligible</Typography>
                  <Typography variant="body2" fontWeight="600">{zone.dropoffEligible ? 'Yes' : 'No'}</Typography>
                </Grid>
              </Grid>
              {zone.pickupAvailability.length > 0 && (
                <Box mt={2}>
                  <Typography variant="caption" color="text.secondary" display="block" mb={1}>Pickup Availability</Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {zone.pickupAvailability.map((w, i) => (
                      <Chip
                        key={i}
                        label={`${w.day.slice(0, 3)} ${w.startTime}–${w.endTime}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.65rem', mb: 0.5 }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Paper>

            {/* Supply & Demand */}
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <TrendingUp size={18} color="#F59E0B" />
                <Typography variant="h6" fontWeight="600">Supply & Demand</Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Active Agents</Typography>
                  <Typography variant="body2" fontWeight="600">{zone.activeAgents} / {zone.totalAgents}</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={zone.totalAgents > 0 ? (zone.activeAgents / zone.totalAgents) * 100 : 0}
                    sx={{ mt: 0.5, height: 4, borderRadius: 2, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#3B82F6' } }}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Avg Pickup Volume</Typography>
                  <Typography variant="body2" fontWeight="600">{zone.avgPickupsPerDay}/day</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Avg Drop-offs</Typography>
                  <Typography variant="body2" fontWeight="600">{zone.avgDropoffsPerDay}/day</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Coverage Gap</Typography>
                  <Typography variant="body2" fontWeight="600" color={zone.coverageGapPercent > 30 ? '#EF4444' : '#F59E0B'}>
                    {zone.coverageGapPercent}%
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Performance */}
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Clock size={18} color="#8B5CF6" />
                <Typography variant="h6" fontWeight="600">Performance</Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">Avg Pickup Time</Typography>
                  <Typography variant="body2" fontWeight="600">{zone.performance.avgPickupTimeMins} mins</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">Completion Rate</Typography>
                  <Typography variant="body2" fontWeight="600">{zone.performance.completionRatePercent}%</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">Agent Idle Time</Typography>
                  <Typography variant="body2" fontWeight="600">{zone.performance.agentIdlePercent}%</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">SLA Compliance</Typography>
                  <Typography variant="body2" fontWeight="600">{zone.performance.slaCompliancePercent}%</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">Utilization</Typography>
                  <Typography variant="body2" fontWeight="600">{zone.performance.utilizationPercent}%</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Enterprise Applicability */}
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Building2 size={18} color="#6366F1" />
                <Typography variant="h6" fontWeight="600">Enterprise Applicability</Typography>
              </Stack>
              {zone.enterpriseClients.length > 0 ? (
                <>
                  <Typography variant="caption" color="text.secondary" display="block" mb={1}>Eligible Enterprise Clients</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {zone.enterpriseClients.map((client, i) => (
                      <Chip key={i} label={client} size="small" variant="outlined" sx={{ mb: 0.5 }} />
                    ))}
                  </Stack>
                  {zone.contractOverrides > 0 && (
                    <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                      {zone.contractOverrides} contract override(s) active
                    </Typography>
                  )}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">No enterprise clients in this zone</Typography>
              )}
            </Paper>

            {/* Metadata */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>Metadata</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Created</Typography>
                  <Typography variant="body2">{new Date(zone.createdAt).toLocaleDateString('en-NG')}</Typography>
                  <Typography variant="caption" color="text.secondary">by {zone.createdBy}</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Last Updated</Typography>
                  <Typography variant="body2">{new Date(zone.updatedAt).toLocaleDateString('en-NG')}</Typography>
                  <Typography variant="caption" color="text.secondary">by {zone.lastChangedBy}</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Version</Typography>
                  <Typography variant="body2" fontWeight="600">v{zone.version}</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Actions */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>Actions</Typography>
              <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                All zone changes are versioned and audited.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {zone.status === 'inactive' || zone.status === 'pending' ? (
                  <Button 
                    variant="outlined" 
                    startIcon={<Play size={16} />} 
                    color="success"
                    onClick={() => onActivate?.(zone.id)}
                  >
                    Activate
                  </Button>
                ) : (
                  <Button 
                    variant="outlined" 
                    startIcon={<Pause size={16} />} 
                    color="warning"
                    onClick={() => onDeactivate?.(zone.id)}
                  >
                    Deactivate
                  </Button>
                )}
                <Button 
                  variant="outlined" 
                  startIcon={<Edit3 size={16} />}
                  onClick={() => onEdit?.(zone)}
                >
                  Edit Boundaries
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Calendar size={16} />}
                  onClick={() => onReassignPricing?.(zone)}
                >
                  Reassign Pricing
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Scissors size={16} />}
                  onClick={() => onSplit?.(zone)}
                >
                  Split Zone
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Merge size={16} />}
                  onClick={() => onMerge?.(zone)}
                >
                  Merge Zone
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ZoneDetailDrawer;
