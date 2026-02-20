'use client';
import React, { useState, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Stack,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Chip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Check,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import {
  GoogleMap,
  Polygon,
  DrawingManager,
} from '@react-google-maps/api';
import type {
  Zone,
  ZoneStatus,
  SLATier,
  CoverageLevel,
  DemandIntensity,
  LatLng,
  PickupWindow,
} from '../types';
import { nigerianCityCenters } from '../mockData';
import { City } from '@/hooks/useZones';

interface CreateZoneDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (zone: Zone) => void;
  isMapLoaded: boolean;
  cities: City[];
}

const steps = ['Zone Definition', 'Draw Boundary', 'Operations', 'Review'];

const drawingMapStyle = { width: '100%', height: '400px' };

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const CreateZoneDialog: React.FC<CreateZoneDialogProps> = ({
  open,
  onClose,
  onSubmit,
  isMapLoaded,
  cities,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  // Step 1: Zone Definition
  const [name, setName] = useState('');
  const [city, setCity] = useState('Lagos');
  const [state, setState] = useState('Lagos');
  const [description, setDescription] = useState('');

  // Step 2: Boundary (drawn on map)
  const [polygonPath, setPolygonPath] = useState<LatLng[]>([]);
  const [drawingComplete, setDrawingComplete] = useState(false);
  const drawnPolygonRef = useRef<google.maps.Polygon | null>(null);

  // Step 3: Operations
  const [slaTier, setSlaTier] = useState<SLATier>('silver');
  const [pricingRuleName, setPricingRuleName] = useState('');
  const [dropoffEligible, setDropoffEligible] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [startTime, setStartTime] = useState('07:00');
  const [endTime, setEndTime] = useState('18:00');
  const [initialStatus, setInitialStatus] = useState<ZoneStatus>('pending');

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    // Find the selected city and set its state
    const selectedCity = cities.find(city => city.name === newCity);
    setState(selectedCity?.state || newCity);
  };

  const resetForm = () => {
    setActiveStep(0);
    setName('');
    setCity('Lagos');
    setState('Lagos');
    setDescription('');
    setPolygonPath([]);
    setDrawingComplete(false);
    if (drawnPolygonRef.current) {
      drawnPolygonRef.current.setMap(null);
      drawnPolygonRef.current = null;
    }
    setSlaTier('silver');
    setPricingRuleName('');
    setDropoffEligible(true);
    setSelectedDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    setStartTime('07:00');
    setEndTime('18:00');
    setInitialStatus('pending');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const onPolygonComplete = useCallback((polygon: google.maps.Polygon) => {
    if (drawnPolygonRef.current) {
      drawnPolygonRef.current.setMap(null);
    }
    drawnPolygonRef.current = polygon;

    const path = polygon.getPath();
    const coords: LatLng[] = [];
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coords.push({ lat: point.lat(), lng: point.lng() });
    }
    setPolygonPath(coords);
    setDrawingComplete(true);
  }, []);

  const handleClearPolygon = () => {
    if (drawnPolygonRef.current) {
      drawnPolygonRef.current.setMap(null);
      drawnPolygonRef.current = null;
    }
    setPolygonPath([]);
    setDrawingComplete(false);
  };

  const calculateCenter = (coords: LatLng[]): LatLng => {
    if (coords.length === 0) return { lat: 0, lng: 0 };
    const sum = coords.reduce(
      (acc, c) => ({ lat: acc.lat + c.lat, lng: acc.lng + c.lng }),
      { lat: 0, lng: 0 }
    );
    return { lat: sum.lat / coords.length, lng: sum.lng / coords.length };
  };

  const calculateAreaKm2 = (coords: LatLng[]): number => {
    if (coords.length < 3) return 0;
    if (typeof google !== 'undefined' && google.maps?.geometry?.spherical) {
      const path = coords.map((c) => new google.maps.LatLng(c.lat, c.lng));
      const areaM2 = google.maps.geometry.spherical.computeArea(path);
      return Number((areaM2 / 1_000_000).toFixed(1));
    }
    return Number((Math.random() * 30 + 10).toFixed(1));
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const canProceed = (): boolean => {
    switch (activeStep) {
      case 0:
        return name.trim().length > 0 && city.length > 0 && description.trim().length > 0;
      case 1:
        return drawingComplete && polygonPath.length >= 3;
      case 2:
        return selectedDays.length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    const now = new Date().toISOString();
    const center = calculateCenter(polygonPath);
    const areaKm2 = calculateAreaKm2(polygonPath);

    const pickupWindows: PickupWindow[] = selectedDays.map((day) => ({
      day,
      startTime,
      endTime,
    }));

    const newZone: Zone = {
      id: `ZN-${String(Date.now()).slice(-6)}`,
      name,
      city,
      state,
      description,
      boundary: {
        polygon: polygonPath,
        center,
        areaKm2,
      },
      status: initialStatus,
      coverageLevel: 'low' as CoverageLevel,
      activeAgents: 0,
      totalAgents: 0,
      pricingRuleId: undefined,
      pricingRuleName: pricingRuleName || undefined,
      slaTier,
      pickupAvailability: pickupWindows,
      dropoffEligible,
      avgPickupsPerDay: 0,
      avgDropoffsPerDay: 0,
      demandIntensity: 'low' as DemandIntensity,
      coverageGapPercent: 100,
      enterpriseClients: [],
      contractOverrides: 0,
      performance: {
        avgPickupTimeMins: 0,
        completionRatePercent: 0,
        agentIdlePercent: 0,
        slaCompliancePercent: 0,
        utilizationPercent: 0,
      },
      version: 1,
      createdAt: now,
      updatedAt: now,
      createdBy: 'Adaeze Nwosu',
      lastChangedBy: 'Adaeze Nwosu',
    };

    onSubmit(newZone);
    handleClose();
  };

  // ============================================================
  // Step Renderers
  // ============================================================

  const renderStepDefinition = () => (
    <Stack spacing={3}>
      <TextField
        label="Zone Name"
        placeholder="e.g. Lekki, Victoria Island, Wuse"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth required>
            <InputLabel>City</InputLabel>
            <Select value={city} label="City" onChange={(e) => handleCityChange(e.target.value)}>
              {cities.map((c) => (
                <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            disabled
          />
        </Grid>
      </Grid>
      <TextField
        label="Description"
        placeholder="Describe the zone boundaries, key landmarks, and purpose"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
        required
      />
    </Stack>
  );

  const renderStepBoundary = () => (
    <Stack spacing={2}>
      <Alert severity="info">
        Use the polygon drawing tool on the map to draw the zone boundary. Click points to create the polygon, then close it by clicking the first point.
      </Alert>

      {isMapLoaded ? (
        <Box sx={{ borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
          <GoogleMap
            mapContainerStyle={drawingMapStyle}
            center={nigerianCityCenters[city] || { lat: 6.5244, lng: 3.3792 }}
            zoom={13}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: true,
              streetViewControl: false,
              fullscreenControl: false,
            }}
          >
            {!drawingComplete && (
              <DrawingManager
                onPolygonComplete={onPolygonComplete}
                options={{
                  drawingMode: google.maps.drawing.OverlayType.POLYGON,
                  drawingControl: true,
                  drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [google.maps.drawing.OverlayType.POLYGON],
                  },
                  polygonOptions: {
                    fillColor: '#3B82F6',
                    fillOpacity: 0.3,
                    strokeColor: '#1E40AF',
                    strokeWeight: 2,
                    editable: true,
                    draggable: false,
                  },
                }}
              />
            )}

            {drawingComplete && polygonPath.length > 0 && !drawnPolygonRef.current && (
              <Polygon
                paths={polygonPath}
                options={{
                  fillColor: '#3B82F6',
                  fillOpacity: 0.3,
                  strokeColor: '#1E40AF',
                  strokeWeight: 2,
                }}
              />
            )}
          </GoogleMap>
        </Box>
      ) : (
        <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 1 }}>
          <Typography color="text.secondary">Loading map...</Typography>
        </Box>
      )}

      <Stack direction="row" spacing={2} alignItems="center">
        {drawingComplete ? (
          <>
            <Chip label={`${polygonPath.length} points`} color="primary" size="small" />
            <Chip label={`~${calculateAreaKm2(polygonPath)} km²`} size="small" variant="outlined" />
            <Button
              size="small"
              startIcon={<Trash2 size={14} />}
              color="error"
              onClick={handleClearPolygon}
            >
              Clear & Redraw
            </Button>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Draw a polygon on the map to define the zone boundary
          </Typography>
        )}
      </Stack>
    </Stack>
  );

  const renderStepOperations = () => (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>SLA Tier</InputLabel>
            <Select value={slaTier} label="SLA Tier" onChange={(e) => setSlaTier(e.target.value as SLATier)}>
              <MenuItem value="platinum">Platinum</MenuItem>
              <MenuItem value="gold">Gold</MenuItem>
              <MenuItem value="silver">Silver</MenuItem>
              <MenuItem value="bronze">Bronze</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Initial Status</InputLabel>
            <Select value={initialStatus} label="Initial Status" onChange={(e) => setInitialStatus(e.target.value as ZoneStatus)}>
              <MenuItem value="pending">Pending (requires activation)</MenuItem>
              <MenuItem value="active">Active (immediate)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TextField
        label="Pricing Rule (optional)"
        placeholder="e.g. Plastic - Lagos Premium"
        value={pricingRuleName}
        onChange={(e) => setPricingRuleName(e.target.value)}
        fullWidth
      />

      <FormControlLabel
        control={<Switch checked={dropoffEligible} onChange={(e) => setDropoffEligible(e.target.checked)} />}
        label="Drop-off eligible"
      />

      <Divider />

      <Typography variant="subtitle2" fontWeight="600">Pickup Availability</Typography>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block" mb={1}>Select operating days</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {daysOfWeek.map((day) => (
            <Chip
              key={day}
              label={day.slice(0, 3)}
              size="small"
              onClick={() => toggleDay(day)}
              sx={{
                bgcolor: selectedDays.includes(day) ? '#3B82F6' : '#f1f5f9',
                color: selectedDays.includes(day) ? '#fff' : '#6B7280',
                fontWeight: 600,
                cursor: 'pointer',
                mb: 0.5,
                '&:hover': { opacity: 0.8 },
              }}
            />
          ))}
        </Stack>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <TextField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Stack>
  );

  const renderStepReview = () => (
    <Stack spacing={3}>
      <Alert severity="warning">
        Review all details carefully. Zone changes are versioned and audited.
      </Alert>

      {/* Definition */}
      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Typography variant="subtitle2" fontWeight="600" mb={1.5}>Zone Definition</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="caption" color="text.secondary">Name</Typography>
            <Typography variant="body2" fontWeight="600">{name}</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="caption" color="text.secondary">City / State</Typography>
            <Typography variant="body2" fontWeight="600">{city}, {state}</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="caption" color="text.secondary">Boundary</Typography>
            <Typography variant="body2" fontWeight="600">{polygonPath.length} points • ~{calculateAreaKm2(polygonPath)} km²</Typography>
          </Grid>
        </Grid>
        <Typography variant="caption" color="text.secondary" display="block" mt={1}>{description}</Typography>
      </Box>

      {/* Boundary Preview */}
      {isMapLoaded && polygonPath.length > 0 && (
        <Box sx={{ borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '200px' }}
            center={calculateCenter(polygonPath)}
            zoom={13}
            options={{ disableDefaultUI: true, zoomControl: false, draggable: false }}
          >
            <Polygon
              paths={polygonPath}
              options={{
                fillColor: '#3B82F6',
                fillOpacity: 0.3,
                strokeColor: '#1E40AF',
                strokeWeight: 2,
              }}
            />
          </GoogleMap>
        </Box>
      )}

      {/* Operations */}
      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Typography variant="subtitle2" fontWeight="600" mb={1.5}>Operational Settings</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">SLA Tier</Typography>
            <Typography variant="body2" fontWeight="600">{slaTier.charAt(0).toUpperCase() + slaTier.slice(1)}</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">Status</Typography>
            <Typography variant="body2" fontWeight="600">{initialStatus === 'active' ? 'Active' : 'Pending'}</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">Drop-off</Typography>
            <Typography variant="body2" fontWeight="600">{dropoffEligible ? 'Eligible' : 'Not eligible'}</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">Pricing Rule</Typography>
            <Typography variant="body2" fontWeight="600">{pricingRuleName || 'None'}</Typography>
          </Grid>
        </Grid>
        <Box mt={1.5}>
          <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Pickup Schedule</Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap">
            {selectedDays.map((day) => (
              <Chip key={day} label={`${day.slice(0, 3)} ${startTime}–${endTime}`} size="small" variant="outlined" sx={{ fontSize: '0.65rem', mb: 0.5 }} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Stack>
  );

  const renderActiveStep = () => {
    switch (activeStep) {
      case 0: return renderStepDefinition();
      case 1: return renderStepBoundary();
      case 2: return renderStepOperations();
      case 3: return renderStepReview();
      default: return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <MapPin size={22} color="#3B82F6" />
            <Typography variant="h6" fontWeight="600">Create Zone</Typography>
          </Stack>
          <IconButton onClick={handleClose} size="small">
            <X size={18} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Box sx={{ px: 3, pb: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Divider />

      <DialogContent sx={{ py: 3, minHeight: 400 }}>
        {renderActiveStep()}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} color="inherit">Cancel</Button>
        <Box sx={{ flex: 1 }} />
        {activeStep > 0 && (
          <Button onClick={handleBack} startIcon={<ChevronLeft size={16} />} color="inherit">
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button
            onClick={handleNext}
            endIcon={<ChevronRight size={16} />}
            variant="contained"
            disabled={!canProceed()}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            startIcon={<Check size={16} />}
            variant="contained"
            color="primary"
          >
            Create Zone
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateZoneDialog;
