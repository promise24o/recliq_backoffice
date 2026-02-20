'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Stack,
  Grid,
  TextField,
  Button,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  X,
  Scissors,
  ChevronLeft,
  ChevronRight,
  Check,
  Users,
  MapPin,
  Clock,
  Package,
} from 'lucide-react';
import {
  GoogleMap,
  Polygon,
  DrawingManager,
} from '@react-google-maps/api';
import type { Zone } from '../types';

interface SplitZoneModalProps {
  open: boolean;
  onClose: () => void;
  zone: Zone | null;
  onSubmit: (splitData: any) => void;
  isSubmitting?: boolean;
  isMapLoaded?: boolean;
}

const steps = ['Zone Selection', 'Define Zone A', 'Define Zone B', 'Agent Distribution', 'Review'];

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px',
};

const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

const SplitZoneModal: React.FC<SplitZoneModalProps> = ({
  open,
  onClose,
  zone,
  onSubmit,
  isSubmitting = false,
  isMapLoaded = false,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [zone1Data, setZone1Data] = useState({
    name: '',
    description: '',
    polygon: [] as { lat: number; lng: number }[],
    centerLat: 0,
    centerLng: 0,
    areaKm2: 0,
    totalAgents: 0,
    pricingRuleId: 'DEFAULT',
    pricingRuleName: 'Default Pricing',
    slaTier: 'silver' as const,
    coverageLevel: 'medium' as const,
    demandIntensity: 'medium' as const,
    pickupAvailability: [
      { day: 'Monday', startTime: '07:00', endTime: '18:00' },
      { day: 'Tuesday', startTime: '07:00', endTime: '18:00' },
      { day: 'Wednesday', startTime: '07:00', endTime: '18:00' },
      { day: 'Thursday', startTime: '07:00', endTime: '18:00' },
      { day: 'Friday', startTime: '07:00', endTime: '18:00' },
    ],
    dropoffEligible: true,
    enterpriseClients: [] as string[],
  });

  const [zone2Data, setZone2Data] = useState({
    name: '',
    description: '',
    polygon: [] as { lat: number; lng: number }[],
    centerLat: 0,
    centerLng: 0,
    areaKm2: 0,
    totalAgents: 0,
    pricingRuleId: 'DEFAULT',
    pricingRuleName: 'Default Pricing',
    slaTier: 'silver' as const,
    coverageLevel: 'medium' as const,
    demandIntensity: 'medium' as const,
    pickupAvailability: [
      { day: 'Monday', startTime: '07:00', endTime: '18:00' },
      { day: 'Tuesday', startTime: '07:00', endTime: '18:00' },
      { day: 'Wednesday', startTime: '07:00', endTime: '18:00' },
      { day: 'Thursday', startTime: '07:00', endTime: '18:00' },
      { day: 'Friday', startTime: '07:00', endTime: '18:00' },
    ],
    dropoffEligible: true,
    enterpriseClients: [] as string[],
  });

  const [agentDistribution, setAgentDistribution] = useState({
    zone1Agents: 0,
    zone2Agents: 0,
  });

  const [reason, setReason] = useState('');
  const [zoneAPolygon, setZoneAPolygon] = useState<{ lat: number; lng: number }[]>([]);
  const [zoneBPolygon, setZoneBPolygon] = useState<{ lat: number; lng: number }[]>([]);
  const [isDrawingZoneA, setIsDrawingZoneA] = useState(false);
  const [isDrawingZoneB, setIsDrawingZoneB] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (!zone) return;

    const splitData = {
      zoneId: zone.id,
      zone1: {
        ...zone1Data,
        polygon: zoneAPolygon,
        centerLat: zoneAPolygon.length > 0 ? zoneAPolygon[0].lat : zone1Data.centerLat,
        centerLng: zoneAPolygon.length > 0 ? zoneAPolygon[0].lng : zone1Data.centerLng,
      },
      zone2: {
        ...zone2Data,
        polygon: zoneBPolygon,
        centerLat: zoneBPolygon.length > 0 ? zoneBPolygon[0].lat : zone2Data.centerLat,
        centerLng: zoneBPolygon.length > 0 ? zoneBPolygon[0].lng : zone2Data.centerLng,
      },
      agentDistribution,
      reason,
    };

    onSubmit(splitData);
  };

  const handlePolygonComplete = (polygon: any) => {
    const path = polygon.getPath();
    const coordinates: { lat: number; lng: number }[] = [];
    
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coordinates.push({ lat: point.lat(), lng: point.lng() });
    }

    if (activeStep === 1) {
      setZoneAPolygon(coordinates);
      setZone1Data({
        ...zone1Data,
        polygon: coordinates,
        centerLat: coordinates[0]?.lat || 0,
        centerLng: coordinates[0]?.lng || 0,
      });
    } else if (activeStep === 2) {
      setZoneBPolygon(coordinates);
      setZone2Data({
        ...zone2Data,
        polygon: coordinates,
        centerLat: coordinates[0]?.lat || 0,
        centerLng: coordinates[0]?.lng || 0,
      });
    }

    polygon.setMap(null);
  };

  const resetForm = () => {
    setActiveStep(0);
    setZoneAPolygon([]);
    setZoneBPolygon([]);
    setIsDrawingZoneA(false);
    setIsDrawingZoneB(false);
    setZone1Data({
      name: '',
      description: '',
      polygon: [],
      centerLat: 0,
      centerLng: 0,
      areaKm2: 0,
      totalAgents: 0,
      pricingRuleId: 'DEFAULT',
      pricingRuleName: 'Default Pricing',
      slaTier: 'silver',
      coverageLevel: 'medium',
      demandIntensity: 'medium',
      pickupAvailability: [
        { day: 'Monday', startTime: '07:00', endTime: '18:00' },
        { day: 'Tuesday', startTime: '07:00', endTime: '18:00' },
        { day: 'Wednesday', startTime: '07:00', endTime: '18:00' },
        { day: 'Thursday', startTime: '07:00', endTime: '18:00' },
        { day: 'Friday', startTime: '07:00', endTime: '18:00' },
      ],
      dropoffEligible: true,
      enterpriseClients: [],
    });
    setZone2Data({
      name: '',
      description: '',
      polygon: [],
      centerLat: 0,
      centerLng: 0,
      areaKm2: 0,
      totalAgents: 0,
      pricingRuleId: 'DEFAULT',
      pricingRuleName: 'Default Pricing',
      slaTier: 'silver',
      coverageLevel: 'medium',
      demandIntensity: 'medium',
      pickupAvailability: [
        { day: 'Monday', startTime: '07:00', endTime: '18:00' },
        { day: 'Tuesday', startTime: '07:00', endTime: '18:00' },
        { day: 'Wednesday', startTime: '07:00', endTime: '18:00' },
        { day: 'Thursday', startTime: '07:00', endTime: '18:00' },
        { day: 'Friday', startTime: '07:00', endTime: '18:00' },
      ],
      dropoffEligible: true,
      enterpriseClients: [],
    });
    setAgentDistribution({ zone1Agents: 0, zone2Agents: 0 });
    setReason('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Stack spacing={3}>
            <Alert severity="info">
              You're about to split <strong>{zone?.name}</strong> into two separate zones.
              The original zone will be archived and two new zones will be created.
            </Alert>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>Original Zone Details</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">Name</Typography>
                  <Typography variant="body1">{zone?.name}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">City</Typography>
                  <Typography variant="body1">{zone?.city}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">Total Agents</Typography>
                  <Typography variant="body1">{zone?.totalAgents}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">Coverage Level</Typography>
                  <Typography variant="body1">{zone?.coverageLevel}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={3}>
            <Typography variant="h6">Define Zone A</Typography>
            <Alert severity="info">
              Draw the boundary for Zone A on the map below. Click on the map to start drawing, then click to add points and close the polygon.
            </Alert>
            
            {/* Zone A Details */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Zone A Name"
                  value={zone1Data.name}
                  onChange={(e) => setZone1Data({ ...zone1Data, name: e.target.value })}
                  placeholder="e.g., North District"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Description"
                  value={zone1Data.description}
                  onChange={(e) => setZone1Data({ ...zone1Data, description: e.target.value })}
                  placeholder="Description of Zone A"
                />
              </Grid>
            </Grid>

            {/* Interactive Map for Zone A */}
            {isMapLoaded && zone?.boundary?.polygon && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" mb={1}>
                  Draw Zone A Boundary
                </Typography>
                <Box sx={{ borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{
                      lat: zone?.boundary?.center?.lat || 0,
                      lng: zone?.boundary?.center?.lng || 0,
                    }}
                    zoom={13}
                    options={mapOptions}
                  >
                    {/* Original zone polygon */}
                    <Polygon
                      paths={zone?.boundary?.polygon}
                      options={{
                        fillColor: '#e3f2fd',
                        fillOpacity: 0.3,
                        strokeColor: '#2196f3',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                      }}
                    />
                    
                    {/* Zone A polygon */}
                    {zoneAPolygon.length > 0 && (
                      <Polygon
                        paths={zoneAPolygon}
                        options={{
                          fillColor: '#4caf50',
                          fillOpacity: 0.4,
                          strokeColor: '#2e7d32',
                          strokeOpacity: 1,
                          strokeWeight: 3,
                        }}
                      />
                    )}
                    
                    {/* Drawing Manager */}
                    <DrawingManager
                      drawingMode={google.maps.drawing.OverlayType.POLYGON}
                      options={{
                        drawingControl: true,
                        drawingControlOptions: {
                          position: google.maps.ControlPosition.TOP_CENTER,
                          drawingModes: [google.maps.drawing.OverlayType.POLYGON],
                        },
                        polygonOptions: {
                          fillColor: '#4caf50',
                          fillOpacity: 0.4,
                          strokeColor: '#2e7d32',
                          strokeWeight: 3,
                          editable: true,
                        },
                      }}
                      onPolygonComplete={handlePolygonComplete}
                    />
                  </GoogleMap>
                </Box>
              </Box>
            )}

            {/* Additional Zone A Settings */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Area (km²)"
                  type="number"
                  value={zone1Data.areaKm2 || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setZone1Data({ 
                      ...zone1Data, 
                      areaKm2: value === '' ? 0 : parseFloat(value) || 0 
                    });
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>SLA Tier</InputLabel>
                  <Select
                    value={zone1Data.slaTier}
                    onChange={(e) => setZone1Data({ ...zone1Data, slaTier: e.target.value as any })}
                  >
                    <MenuItem value="platinum">Platinum</MenuItem>
                    <MenuItem value="gold">Gold</MenuItem>
                    <MenuItem value="silver">Silver</MenuItem>
                    <MenuItem value="bronze">Bronze</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Coverage Level</InputLabel>
                  <Select
                    value={zone1Data.coverageLevel}
                    onChange={(e) => setZone1Data({ ...zone1Data, coverageLevel: e.target.value as any })}
                  >
                    <MenuItem value="critical">Critical</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            {zoneAPolygon.length > 0 && (
              <Alert severity="success">
                Zone A boundary defined with {zoneAPolygon.length} points
              </Alert>
            )}
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={3}>
            <Typography variant="h6">Define Zone B</Typography>
            <Alert severity="info">
              Draw the boundary for Zone B on the map below. This should be the remaining area of the original zone.
            </Alert>
            
            {/* Zone B Details */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Zone B Name"
                  value={zone2Data.name}
                  onChange={(e) => setZone2Data({ ...zone2Data, name: e.target.value })}
                  placeholder="e.g., South District"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Description"
                  value={zone2Data.description}
                  onChange={(e) => setZone2Data({ ...zone2Data, description: e.target.value })}
                  placeholder="Description of Zone B"
                />
              </Grid>
            </Grid>

            {/* Interactive Map for Zone B */}
            {isMapLoaded && zone?.boundary?.polygon && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" mb={1}>
                  Draw Zone B Boundary
                </Typography>
                <Box sx={{ borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{
                      lat: zone?.boundary?.center?.lat || 0,
                      lng: zone?.boundary?.center?.lng || 0,
                    }}
                    zoom={13}
                    options={mapOptions}
                  >
                    {/* Original zone polygon */}
                    <Polygon
                      paths={zone?.boundary?.polygon}
                      options={{
                        fillColor: '#e3f2fd',
                        fillOpacity: 0.3,
                        strokeColor: '#2196f3',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                      }}
                    />
                    
                    {/* Zone A polygon (already defined) */}
                    {zoneAPolygon.length > 0 && (
                      <Polygon
                        paths={zoneAPolygon}
                        options={{
                          fillColor: '#4caf50',
                          fillOpacity: 0.4,
                          strokeColor: '#2e7d32',
                          strokeOpacity: 1,
                          strokeWeight: 3,
                        }}
                      />
                    )}
                    
                    {/* Zone B polygon */}
                    {zoneBPolygon.length > 0 && (
                      <Polygon
                        paths={zoneBPolygon}
                        options={{
                          fillColor: '#ff9800',
                          fillOpacity: 0.4,
                          strokeColor: '#f57c00',
                          strokeOpacity: 1,
                          strokeWeight: 3,
                        }}
                      />
                    )}
                    
                    {/* Drawing Manager */}
                    <DrawingManager
                      drawingMode={google.maps.drawing.OverlayType.POLYGON}
                      options={{
                        drawingControl: true,
                        drawingControlOptions: {
                          position: google.maps.ControlPosition.TOP_CENTER,
                          drawingModes: [google.maps.drawing.OverlayType.POLYGON],
                        },
                        polygonOptions: {
                          fillColor: '#ff9800',
                          fillOpacity: 0.4,
                          strokeColor: '#f57c00',
                          strokeWeight: 3,
                          editable: true,
                        },
                      }}
                      onPolygonComplete={handlePolygonComplete}
                    />
                  </GoogleMap>
                </Box>
              </Box>
            )}

            {/* Additional Zone B Settings */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Area (km²)"
                  type="number"
                  value={zone2Data.areaKm2 || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setZone2Data({ 
                      ...zone2Data, 
                      areaKm2: value === '' ? 0 : parseFloat(value) || 0 
                    });
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>SLA Tier</InputLabel>
                  <Select
                    value={zone2Data.slaTier}
                    onChange={(e) => setZone2Data({ ...zone2Data, slaTier: e.target.value as any })}
                  >
                    <MenuItem value="platinum">Platinum</MenuItem>
                    <MenuItem value="gold">Gold</MenuItem>
                    <MenuItem value="silver">Silver</MenuItem>
                    <MenuItem value="bronze">Bronze</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Coverage Level</InputLabel>
                  <Select
                    value={zone2Data.coverageLevel}
                    onChange={(e) => setZone2Data({ ...zone2Data, coverageLevel: e.target.value as any })}
                  >
                    <MenuItem value="critical">Critical</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            {zoneBPolygon.length > 0 && (
              <Alert severity="success">
                Zone B boundary defined with {zoneBPolygon.length} points
              </Alert>
            )}
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={3}>
            <Typography variant="h6">Agent Distribution</Typography>
            <Alert severity="info">
              Total agents available: <strong>{zone?.totalAgents}</strong>
            </Alert>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Zone 1 Agents"
                  type="number"
                  value={agentDistribution.zone1Agents || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? 0 : parseInt(e.target.value) || 0;
                    setAgentDistribution({
                      zone1Agents: value,
                      zone2Agents: (zone?.totalAgents || 0) - value,
                    });
                  }}
                  inputProps={{ min: 0, max: zone?.totalAgents }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Zone 2 Agents"
                  type="number"
                  value={agentDistribution.zone2Agents || ''}
                  disabled
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Remaining agents: {(zone?.totalAgents || 0) - agentDistribution.zone1Agents - agentDistribution.zone2Agents}
              </Typography>
            </Box>
          </Stack>
        );

      case 4:
        return (
          <Stack spacing={3}>
            <Typography variant="h6">Review Split Configuration</Typography>
            <TextField
              fullWidth
              label="Reason for Split"
              multiline
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why this zone needs to be split..."
              required
            />
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>Summary</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Zone 1: {zone1Data.name}</Typography>
                  <Typography variant="body2">Agents: {agentDistribution.zone1Agents}</Typography>
                  <Typography variant="body2">Area: {zone1Data.areaKm2} km²</Typography>
                  <Typography variant="body2">SLA: {zone1Data.slaTier}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2">Zone 2: {zone2Data.name}</Typography>
                  <Typography variant="body2">Agents: {agentDistribution.zone2Agents}</Typography>
                  <Typography variant="body2">Area: {zone2Data.areaKm2} km²</Typography>
                  <Typography variant="body2">SLA: {zone2Data.slaTier}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return zone !== null;
      case 1:
        return zone1Data.name && zone1Data.description && zoneAPolygon.length > 0;
      case 2:
        return zone2Data.name && zone2Data.description && zoneBPolygon.length > 0;
      case 3:
        return agentDistribution.zone1Agents >= 0 && agentDistribution.zone2Agents >= 0;
      case 4:
        return reason.trim() !== '';
      default:
        return false;
    }
  };

  if (!zone) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Scissors size={24} />
            <Typography variant="h6">Split Zone: {zone.name}</Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <X size={20} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Stack direction="row" spacing={2} justifyContent="space-between" width="100%">
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleBack} disabled={activeStep === 0 || isSubmitting}>
              <ChevronLeft size={16} />
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={!isStepValid() || isSubmitting}
              startIcon={activeStep === steps.length - 1 ? <Check size={16} /> : <ChevronRight size={16} />}
            >
              {activeStep === steps.length - 1 ? 'Split Zone' : 'Next'}
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default SplitZoneModal;
