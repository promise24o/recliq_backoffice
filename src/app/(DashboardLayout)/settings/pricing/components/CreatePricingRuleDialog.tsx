'use client';
import React, { useState } from 'react';
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
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Alert,
} from '@mui/material';
import {
  X,
  DollarSign,
  Shield,
  MapPin,
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import type {
  PricingRule,
  PricingScope,
  WasteType,
  PickupMode,
  RulePriority,
  RuleStatus,
  PricingSafeguards,
} from '../types';
import { formatRate } from '../mockData';

interface CreatePricingRuleDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rule: PricingRule) => void;
}

const steps = ['Rule Definition', 'Pricing Logic', 'Safeguards', 'Timing & Visibility', 'Review'];

const wasteTypeOptions: { value: WasteType; label: string }[] = [
  { value: 'plastic', label: 'Plastic' },
  { value: 'metal', label: 'Metal' },
  { value: 'paper', label: 'Paper' },
  { value: 'glass', label: 'Glass' },
  { value: 'e_waste', label: 'E-Waste' },
  { value: 'organic', label: 'Organic' },
  { value: 'textile', label: 'Textile' },
];

const nigerianCities = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu', 'Benin City', 'Kaduna', 'Jos', 'Abeokuta'];

const CreatePricingRuleDialog: React.FC<CreatePricingRuleDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  // Step 1: Rule Definition
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [scope, setScope] = useState<PricingScope>('global');
  const [city, setCity] = useState('');
  const [zone, setZone] = useState('');
  const [wasteType, setWasteType] = useState<WasteType>('plastic');
  const [pickupMode, setPickupMode] = useState<PickupMode>('both');
  const [priority, setPriority] = useState<RulePriority>('base');

  // Step 2: Pricing Logic
  const [userPricePerKg, setUserPricePerKg] = useState<number>(0);
  const [agentPayoutPerKg, setAgentPayoutPerKg] = useState<number>(0);
  const [fixedFee, setFixedFee] = useState<number>(0);

  // Step 3: Safeguards
  const [minPricePerKg, setMinPricePerKg] = useState<number>(0);
  const [maxPricePerKg, setMaxPricePerKg] = useState<number>(0);
  const [minPayoutPerKg, setMinPayoutPerKg] = useState<number>(0);
  const [maxPayoutPerKg, setMaxPayoutPerKg] = useState<number>(0);
  const [dailyPayoutCap, setDailyPayoutCap] = useState<number>(0);
  const [abuseThrottleLimit, setAbuseThrottleLimit] = useState<number>(50);

  // Step 4: Timing & Visibility
  const [effectiveStart, setEffectiveStart] = useState('');
  const [effectiveEnd, setEffectiveEnd] = useState('');
  const [userFacingLabel, setUserFacingLabel] = useState('');
  const [agentFacingLabel, setAgentFacingLabel] = useState('');
  const [status, setStatus] = useState<RuleStatus>('scheduled');

  const platformMarginPercent =
    userPricePerKg > 0
      ? Number((((userPricePerKg - agentPayoutPerKg) / userPricePerKg) * 100).toFixed(1))
      : 0;

  const resetForm = () => {
    setActiveStep(0);
    setName('');
    setDescription('');
    setScope('global');
    setCity('');
    setZone('');
    setWasteType('plastic');
    setPickupMode('both');
    setPriority('base');
    setUserPricePerKg(0);
    setAgentPayoutPerKg(0);
    setFixedFee(0);
    setMinPricePerKg(0);
    setMaxPricePerKg(0);
    setMinPayoutPerKg(0);
    setMaxPayoutPerKg(0);
    setDailyPayoutCap(0);
    setAbuseThrottleLimit(50);
    setEffectiveStart('');
    setEffectiveEnd('');
    setUserFacingLabel('');
    setAgentFacingLabel('');
    setStatus('scheduled');
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

  const canProceed = (): boolean => {
    switch (activeStep) {
      case 0:
        return name.trim().length > 0 && description.trim().length > 0 && (scope === 'global' || city.length > 0);
      case 1:
        return userPricePerKg > 0 && agentPayoutPerKg > 0 && agentPayoutPerKg < userPricePerKg;
      case 2:
        return minPricePerKg > 0 && maxPricePerKg > minPricePerKg && minPayoutPerKg > 0 && maxPayoutPerKg > minPayoutPerKg && dailyPayoutCap > 0;
      case 3:
        return effectiveStart.length > 0 && userFacingLabel.trim().length > 0 && agentFacingLabel.trim().length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    const now = new Date().toISOString();
    const newRule: PricingRule = {
      id: `PRC-${String(Date.now()).slice(-6)}`,
      name,
      description,
      scope,
      city: scope !== 'global' ? city : undefined,
      zone: scope === 'zone' ? zone : undefined,
      wasteType,
      pickupMode,
      userPricePerKg,
      agentPayoutPerKg,
      fixedFee,
      platformMarginPercent,
      currency: 'NGN',
      safeguards: {
        minPricePerKg,
        maxPricePerKg,
        minPayoutPerKg,
        maxPayoutPerKg,
        dailyPayoutCap,
        abuseThrottleLimit,
      },
      effectiveStart: new Date(effectiveStart).toISOString(),
      effectiveEnd: effectiveEnd ? new Date(effectiveEnd).toISOString() : undefined,
      priority,
      userFacingLabel,
      agentFacingLabel,
      status,
      version: 1,
      createdAt: now,
      updatedAt: now,
      createdBy: 'Adaeze Nwosu',
      lastChangedBy: 'Adaeze Nwosu',
    };
    onSubmit(newRule);
    handleClose();
  };

  // ============================================================
  // Step Renderers
  // ============================================================

  const renderStepDefinition = () => (
    <Stack spacing={3}>
      <TextField
        label="Rule Name"
        placeholder="e.g. Plastic - Lagos Premium"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Description"
        placeholder="Describe the purpose and scope of this pricing rule"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={2}
        required
      />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth required>
            <InputLabel>Scope</InputLabel>
            <Select value={scope} label="Scope" onChange={(e) => setScope(e.target.value as PricingScope)}>
              <MenuItem value="global">Global</MenuItem>
              <MenuItem value="city">City</MenuItem>
              <MenuItem value="zone">Zone</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {scope !== 'global' && (
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth required>
              <InputLabel>City</InputLabel>
              <Select value={city} label="City" onChange={(e) => setCity(e.target.value)}>
                {nigerianCities.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {scope === 'zone' && (
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Zone"
              placeholder="e.g. Lekki, Epe, Kubwa"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              fullWidth
            />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth required>
            <InputLabel>Waste Type</InputLabel>
            <Select value={wasteType} label="Waste Type" onChange={(e) => setWasteType(e.target.value as WasteType)}>
              {wasteTypeOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth required>
            <InputLabel>Pickup Mode</InputLabel>
            <Select value={pickupMode} label="Pickup Mode" onChange={(e) => setPickupMode(e.target.value as PickupMode)}>
              <MenuItem value="pickup">Pickup</MenuItem>
              <MenuItem value="dropoff">Drop-off</MenuItem>
              <MenuItem value="both">Both</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value as RulePriority)}>
              <MenuItem value="base">Base</MenuItem>
              <MenuItem value="override">Override</MenuItem>
              <MenuItem value="promotional">Promotional</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Stack>
  );

  const renderStepPricing = () => (
    <Stack spacing={3}>
      <Alert severity="info" sx={{ mb: 1 }}>
        Agent payout must be less than user price. The difference is platform margin.
      </Alert>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="User Price per kg"
            type="number"
            value={userPricePerKg || ''}
            onChange={(e) => setUserPricePerKg(Number(e.target.value))}
            fullWidth
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">₦</InputAdornment>,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="Agent Payout per kg"
            type="number"
            value={agentPayoutPerKg || ''}
            onChange={(e) => setAgentPayoutPerKg(Number(e.target.value))}
            fullWidth
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">₦</InputAdornment>,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="Fixed Fee (optional)"
            type="number"
            value={fixedFee || ''}
            onChange={(e) => setFixedFee(Number(e.target.value))}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">₦</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      {/* Live margin preview */}
      <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle2" fontWeight="600" mb={2}>Live Margin Preview</Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 4 }}>
            <Box sx={{ p: 2, bgcolor: '#ECFDF5', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">User Price</Typography>
              <Typography variant="h6" fontWeight="700" color="#10B981">
                {userPricePerKg > 0 ? formatRate(userPricePerKg) : '—'}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Box sx={{ p: 2, bgcolor: '#FFFBEB', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">Agent Payout</Typography>
              <Typography variant="h6" fontWeight="700" color="#F59E0B">
                {agentPayoutPerKg > 0 ? formatRate(agentPayoutPerKg) : '—'}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Box sx={{ p: 2, bgcolor: platformMarginPercent > 0 ? '#F5F3FF' : '#FEF2F2', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">Platform Margin</Typography>
              <Typography
                variant="h6"
                fontWeight="700"
                color={platformMarginPercent > 0 ? '#8B5CF6' : '#EF4444'}
              >
                {platformMarginPercent}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {agentPayoutPerKg >= userPricePerKg && userPricePerKg > 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Agent payout cannot be equal to or greater than user price.
          </Alert>
        )}
      </Box>
    </Stack>
  );

  const renderStepSafeguards = () => (
    <Stack spacing={3}>
      <Alert severity="warning">
        Safeguards protect against pricing abuse and operational errors. All fields are required.
      </Alert>
      <Typography variant="subtitle2" fontWeight="600">Price Bounds (per kg)</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Min Price per kg"
            type="number"
            value={minPricePerKg || ''}
            onChange={(e) => setMinPricePerKg(Number(e.target.value))}
            fullWidth
            required
            InputProps={{ startAdornment: <InputAdornment position="start">₦</InputAdornment> }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Max Price per kg"
            type="number"
            value={maxPricePerKg || ''}
            onChange={(e) => setMaxPricePerKg(Number(e.target.value))}
            fullWidth
            required
            InputProps={{ startAdornment: <InputAdornment position="start">₦</InputAdornment> }}
          />
        </Grid>
      </Grid>
      <Typography variant="subtitle2" fontWeight="600">Payout Bounds (per kg)</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Min Payout per kg"
            type="number"
            value={minPayoutPerKg || ''}
            onChange={(e) => setMinPayoutPerKg(Number(e.target.value))}
            fullWidth
            required
            InputProps={{ startAdornment: <InputAdornment position="start">₦</InputAdornment> }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Max Payout per kg"
            type="number"
            value={maxPayoutPerKg || ''}
            onChange={(e) => setMaxPayoutPerKg(Number(e.target.value))}
            fullWidth
            required
            InputProps={{ startAdornment: <InputAdornment position="start">₦</InputAdornment> }}
          />
        </Grid>
      </Grid>
      <Typography variant="subtitle2" fontWeight="600">Throttles</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Daily Payout Cap"
            type="number"
            value={dailyPayoutCap || ''}
            onChange={(e) => setDailyPayoutCap(Number(e.target.value))}
            fullWidth
            required
            InputProps={{ startAdornment: <InputAdornment position="start">₦</InputAdornment> }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Abuse Throttle (txns/day)"
            type="number"
            value={abuseThrottleLimit || ''}
            onChange={(e) => setAbuseThrottleLimit(Number(e.target.value))}
            fullWidth
            required
          />
        </Grid>
      </Grid>
    </Stack>
  );

  const renderStepTiming = () => (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Effective Start Date"
            type="date"
            value={effectiveStart}
            onChange={(e) => setEffectiveStart(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Sunset Date (optional)"
            type="date"
            value={effectiveEnd}
            onChange={(e) => setEffectiveEnd(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <FormControl fullWidth>
        <InputLabel>Initial Status</InputLabel>
        <Select value={status} label="Initial Status" onChange={(e) => setStatus(e.target.value as RuleStatus)}>
          <MenuItem value="scheduled">Scheduled</MenuItem>
          <MenuItem value="active">Active (immediate)</MenuItem>
        </Select>
      </FormControl>
      <Divider />
      <Typography variant="subtitle2" fontWeight="600">Visibility Labels</Typography>
      <Alert severity="info" sx={{ mb: 1 }}>
        These labels are shown to users and agents in the app.
      </Alert>
      <TextField
        label="User-Facing Label"
        placeholder="e.g. ₦130/kg for plastic"
        value={userFacingLabel}
        onChange={(e) => setUserFacingLabel(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Agent-Facing Label"
        placeholder="e.g. ₦85/kg payout"
        value={agentFacingLabel}
        onChange={(e) => setAgentFacingLabel(e.target.value)}
        fullWidth
        required
      />
    </Stack>
  );

  const renderStepReview = () => (
    <Stack spacing={3}>
      <Alert severity="warning">
        Review all details carefully. Pricing changes are versioned and audited.
      </Alert>

      {/* Definition */}
      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Typography variant="subtitle2" fontWeight="600" mb={1.5}>Rule Definition</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="caption" color="text.secondary">Name</Typography>
            <Typography variant="body2" fontWeight="600">{name}</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="caption" color="text.secondary">Scope</Typography>
            <Typography variant="body2" fontWeight="600">
              {scope.charAt(0).toUpperCase() + scope.slice(1)}{city ? ` — ${city}` : ''}{zone ? ` / ${zone}` : ''}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="caption" color="text.secondary">Waste Type</Typography>
            <Typography variant="body2" fontWeight="600">
              {wasteTypeOptions.find((w) => w.value === wasteType)?.label}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="caption" color="text.secondary">Pickup Mode</Typography>
            <Typography variant="body2" fontWeight="600">
              {pickupMode === 'both' ? 'Both' : pickupMode === 'pickup' ? 'Pickup' : 'Drop-off'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="caption" color="text.secondary">Priority</Typography>
            <Typography variant="body2" fontWeight="600">
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing */}
      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Typography variant="subtitle2" fontWeight="600" mb={1.5}>Pricing Logic</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 4 }}>
            <Box sx={{ p: 1.5, bgcolor: '#ECFDF5', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">User Price</Typography>
              <Typography variant="h6" fontWeight="700" color="#10B981">{formatRate(userPricePerKg)}/kg</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Box sx={{ p: 1.5, bgcolor: '#FFFBEB', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">Agent Payout</Typography>
              <Typography variant="h6" fontWeight="700" color="#F59E0B">{formatRate(agentPayoutPerKg)}/kg</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Box sx={{ p: 1.5, bgcolor: '#F5F3FF', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">Margin</Typography>
              <Typography variant="h6" fontWeight="700" color="#8B5CF6">{platformMarginPercent}%</Typography>
            </Box>
          </Grid>
        </Grid>
        {fixedFee > 0 && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            Fixed fee: {formatRate(fixedFee)} per transaction
          </Typography>
        )}
      </Box>

      {/* Safeguards */}
      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Typography variant="subtitle2" fontWeight="600" mb={1.5}>Safeguards</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">Price Range</Typography>
            <Typography variant="body2" fontWeight="600">{formatRate(minPricePerKg)} — {formatRate(maxPricePerKg)}</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">Payout Range</Typography>
            <Typography variant="body2" fontWeight="600">{formatRate(minPayoutPerKg)} — {formatRate(maxPayoutPerKg)}</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">Daily Cap</Typography>
            <Typography variant="body2" fontWeight="600">{formatRate(dailyPayoutCap)}</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">Throttle</Typography>
            <Typography variant="body2" fontWeight="600">{abuseThrottleLimit} txns/day</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Timing */}
      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Typography variant="subtitle2" fontWeight="600" mb={1.5}>Timing & Visibility</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">Effective Start</Typography>
            <Typography variant="body2" fontWeight="600">
              {effectiveStart ? new Date(effectiveStart).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">Sunset</Typography>
            <Typography variant="body2" fontWeight="600">
              {effectiveEnd ? new Date(effectiveEnd).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No expiry'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="caption" color="text.secondary">Status</Typography>
            <Typography variant="body2" fontWeight="600">{status === 'active' ? 'Active (immediate)' : 'Scheduled'}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1.5 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="caption" color="text.secondary">User-Facing</Typography>
            <Typography variant="body2" fontWeight="500">{userFacingLabel}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="caption" color="text.secondary">Agent-Facing</Typography>
            <Typography variant="body2" fontWeight="500">{agentFacingLabel}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );

  const renderActiveStep = () => {
    switch (activeStep) {
      case 0: return renderStepDefinition();
      case 1: return renderStepPricing();
      case 2: return renderStepSafeguards();
      case 3: return renderStepTiming();
      case 4: return renderStepReview();
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
            <DollarSign size={22} color="#3B82F6" />
            <Typography variant="h6" fontWeight="600">Create Pricing Rule</Typography>
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

      <DialogContent sx={{ py: 3, minHeight: 380 }}>
        {renderActiveStep()}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Box sx={{ flex: 1 }} />
        {activeStep > 0 && (
          <Button
            onClick={handleBack}
            startIcon={<ChevronLeft size={16} />}
            color="inherit"
          >
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
            Create Rule
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreatePricingRuleDialog;
