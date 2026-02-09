'use client';
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Alert,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  InputAdornment,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import {
  X,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  Plus,
  Trash2,
  Check
} from 'lucide-react';
import type { 
  CreateEnterpriseClientRequest, 
  ContactPerson, 
  Address, 
  PricingModel, 
  SLARequirements,
  Industry,
  ContractType,
  PickupFrequency
} from '../types';

interface AddEnterpriseClientDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (client: any) => void;
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

const AddEnterpriseClientDrawer: React.FC<AddEnterpriseClientDrawerProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form state
  const [formData, setFormData] = useState<CreateEnterpriseClientRequest>({
    companyName: '',
    industry: 'office' as Industry,
    contractType: 'pay_per_pickup' as ContractType,
    pickupFrequency: 'weekly' as PickupFrequency,
    primaryContact: {
      name: '',
      title: '',
      email: '',
      phone: '',
      department: ''
    },
    headquarters: {
      street: '',
      city: '',
      zone: '',
      state: '',
      coordinates: { lat: 0, lng: 0 },
      postalCode: ''
    },
    pricingModel: {
      type: 'pay_per_pickup' as ContractType,
      baseRate: 0,
      minimumFee: 0,
      volumeDiscounts: [],
      wasteTypePremiums: [],
      serviceFees: [],
      currency: 'NGN',
      billingCycle: 'monthly'
    },
    slaRequirements: {
      pickupWindow: { start: '09:00', end: '17:00' },
      responseTime: 120,
      completionRate: 95,
      reportingFrequency: 'monthly'
    },
    notes: ''
  });

  // Additional state for complex fields
  const [volumeDiscounts, setVolumeDiscounts] = useState([
    { minVolume: 0, discountPercentage: 0, effectiveFrom: new Date().toISOString().split('T')[0] }
  ]);
  const [wasteTypePremiums, setWasteTypePremiums] = useState([]);
  const [serviceFees, setServiceFees] = useState([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleContactChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      primaryContact: {
        ...prev.primaryContact,
        [field]: value
      }
    }));
  };

  const handleAddressChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      headquarters: {
        ...prev.headquarters,
        [field]: value
      }
    }));
  };

  const handlePricingChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      pricingModel: {
        ...prev.pricingModel,
        [field]: value
      }
    }));
  };

  const handleSLAChange = (field: string, value: any) => {
    if (field === 'pickupWindow') {
      setFormData(prev => ({
        ...prev,
        slaRequirements: {
          ...prev.slaRequirements,
          pickupWindow: {
            ...prev.slaRequirements.pickupWindow,
            [value.type]: value.value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        slaRequirements: {
          ...prev.slaRequirements,
          [field]: value
        }
      }));
    }
  };

  const addVolumeDiscount = () => {
    setVolumeDiscounts(prev => [
      ...prev,
      { minVolume: 0, discountPercentage: 0, effectiveFrom: new Date().toISOString().split('T')[0] }
    ]);
  };

  const removeVolumeDiscount = (index: number) => {
    setVolumeDiscounts(prev => prev.filter((_, i) => i !== index));
  };

  const updateVolumeDiscount = (index: number, field: string, value: any) => {
    setVolumeDiscounts(prev => 
      prev.map((discount, i) => 
        i === index ? { ...discount, [field]: value } : discount
      )
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.primaryContact.name.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!formData.primaryContact.email.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryContact.email)) {
      newErrors.contactEmail = 'Invalid email format';
    }

    if (!formData.primaryContact.phone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    }

    if (!formData.headquarters.street.trim()) {
      newErrors.street = 'Street address is required';
    }

    if (!formData.headquarters.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.headquarters.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (formData.pricingModel.baseRate <= 0) {
      newErrors.baseRate = 'Base rate must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create the client object
      const newClient = {
        id: `ENT${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        clientStatus: 'onboarding',
        totalPickups: 0,
        scheduledPickups: 0,
        completedPickups: 0,
        missedPickups: 0,
        rescheduledPickups: 0,
        totalWeightCollected: 0,
        monthlyVolume: 0,
        averagePickupWeight: 0,
        wasteCategories: [],
        totalRevenue: 0,
        monthlyRevenue: 0,
        outstandingBalance: 0,
        averageRevenuePerPickup: 0,
        lifetimeValue: 0,
        slaStatus: 'not_applicable',
        slaComplianceRate: 0,
        averagePickupTime: 0,
        slaBreaches: [],
        co2Saved: 0,
        treesEquivalent: 0,
        waterSaved: 0,
        energySaved: 0,
        sdgAlignment: [],
        onboardedBy: 'CURRENT_USER',
        accountManager: 'ACCOUNT_MGR001',
        tags: ['new'],
        locations: [{
          id: `LOC${Date.now()}`,
          name: `${formData.companyName} - Main Office`,
          address: formData.headquarters,
          isActive: true,
          operatingHours: {
            monday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
            tuesday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
            wednesday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
            thursday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
            friday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
            saturday: { isOpen: false },
            sunday: { isOpen: false }
          }
        }],
        totalLocations: 1,
        activeLocations: 1,
        billingContact: formData.primaryContact,
        operationsContact: formData.primaryContact
      };

      onSuccess(newClient);
      onClose();
      // Reset form
      setFormData({
        companyName: '',
        industry: 'office' as Industry,
        contractType: 'pay_per_pickup' as ContractType,
        pickupFrequency: 'weekly' as PickupFrequency,
        primaryContact: {
          name: '',
          title: '',
          email: '',
          phone: '',
          department: ''
        },
        headquarters: {
          street: '',
          city: '',
          zone: '',
          state: '',
          coordinates: { lat: 0, lng: 0 },
          postalCode: ''
        },
        pricingModel: {
          type: 'pay_per_pickup' as ContractType,
          baseRate: 0,
          minimumFee: 0,
          volumeDiscounts: [],
          wasteTypePremiums: [],
          serviceFees: [],
          currency: 'NGN',
          billingCycle: 'monthly'
        },
        slaRequirements: {
          pickupWindow: { start: '09:00', end: '17:00' },
          responseTime: 120,
          completionRate: 95,
          reportingFrequency: 'monthly'
        },
        notes: ''
      });
    } catch (error) {
      setErrors({ submit: 'Failed to create client. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', md: 800 },
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
                  Add Enterprise Client
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create new enterprise recycling partnership
                </Typography>
              </Box>
            </Stack>
            
            <IconButton onClick={onClose}>
              <X size={20} />
            </IconButton>
          </Stack>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Basic Info" />
            <Tab label="Contact & Location" />
            <Tab label="Pricing" />
            <Tab label="SLA Requirements" />
          </Tabs>
        </Box>

        {/* Form Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* Basic Info Tab */}
          <TabPanel value={activeTab} index={0}>
            <Stack spacing={3}>
              <Alert severity="info">
                <Typography variant="body2">
                  Enter the basic information about the enterprise client. This will be used for account setup and contract generation.
                </Typography>
              </Alert>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    error={!!errors.companyName}
                    helperText={errors.companyName}
                    required
                    InputProps={{
                      startAdornment: <Building size={16} style={{ marginRight: 8, color: '#6b7280' }} />
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Industry</InputLabel>
                    <Select
                      value={formData.industry}
                      label="Industry"
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                    >
                      <MenuItem value="office">Office</MenuItem>
                      <MenuItem value="factory">Factory</MenuItem>
                      <MenuItem value="estate">Estate</MenuItem>
                      <MenuItem value="school">School</MenuItem>
                      <MenuItem value="hotel">Hotel</MenuItem>
                      <MenuItem value="retail">Retail</MenuItem>
                      <MenuItem value="manufacturing">Manufacturing</MenuItem>
                      <MenuItem value="healthcare">Healthcare</MenuItem>
                      <MenuItem value="government">Government</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Contract Type</InputLabel>
                    <Select
                      value={formData.contractType}
                      label="Contract Type"
                      onChange={(e) => handleInputChange('contractType', e.target.value)}
                    >
                      <MenuItem value="pay_per_pickup">Pay Per Pickup</MenuItem>
                      <MenuItem value="monthly_retainer">Monthly Retainer</MenuItem>
                      <MenuItem value="volume_based">Volume Based</MenuItem>
                      <MenuItem value="hybrid">Hybrid</MenuItem>
                      <MenuItem value="custom">Custom</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Pickup Frequency</InputLabel>
                    <Select
                      value={formData.pickupFrequency}
                      label="Pickup Frequency"
                      onChange={(e) => handleInputChange('pickupFrequency', e.target.value)}
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="bi_weekly">Bi-Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="on_demand">On Demand</MenuItem>
                      <MenuItem value="custom">Custom</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    helperText="Additional notes about the client"
                  />
                </Grid>
              </Grid>
            </Stack>
          </TabPanel>

          {/* Contact & Location Tab */}
          <TabPanel value={activeTab} index={1}>
            <Stack spacing={3}>
              <Alert severity="info">
                <Typography variant="body2">
                  Enter contact information and location details for the primary contact and headquarters.
                </Typography>
              </Alert>

              <Typography variant="h6" fontWeight="600" mb={2}>
                Primary Contact
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Contact Name"
                    value={formData.primaryContact.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    error={!!errors.contactName}
                    helperText={errors.contactName}
                    required
                    InputProps={{
                      startAdornment: <User size={16} style={{ marginRight: 8, color: '#6b7280' }} />
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={formData.primaryContact.title}
                    onChange={(e) => handleContactChange('title', e.target.value)}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.primaryContact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    error={!!errors.contactEmail}
                    helperText={errors.contactEmail}
                    required
                    InputProps={{
                      startAdornment: <Mail size={16} style={{ marginRight: 8, color: '#6b7280' }} />
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.primaryContact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    error={!!errors.contactPhone}
                    helperText={errors.contactPhone}
                    required
                    InputProps={{
                      startAdornment: <Phone size={16} style={{ marginRight: 8, color: '#6b7280' }} />
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={formData.primaryContact.department}
                    onChange={(e) => handleContactChange('department', e.target.value)}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="600" mb={2}>
                Headquarters Location
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    value={formData.headquarters.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    error={!!errors.street}
                    helperText={errors.street}
                    required
                    InputProps={{
                      startAdornment: <MapPin size={16} style={{ marginRight: 8, color: '#6b7280' }} />
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="City"
                    value={formData.headquarters.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    error={!!errors.city}
                    helperText={errors.city}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Zone/Area"
                    value={formData.headquarters.zone}
                    onChange={(e) => handleAddressChange('zone', e.target.value)}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="State"
                    value={formData.headquarters.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    error={!!errors.state}
                    helperText={errors.state}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    value={formData.headquarters.postalCode}
                    onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                  />
                </Grid>
              </Grid>
            </Stack>
          </TabPanel>

          {/* Pricing Tab */}
          <TabPanel value={activeTab} index={2}>
            <Stack spacing={3}>
              <Alert severity="info">
                <Typography variant="body2">
                  Configure the pricing model and billing structure for this enterprise client.
                </Typography>
              </Alert>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Pricing Type</InputLabel>
                    <Select
                      value={formData.pricingModel.type}
                      label="Pricing Type"
                      onChange={(e) => handlePricingChange('type', e.target.value)}
                    >
                      <MenuItem value="pay_per_pickup">Pay Per Pickup</MenuItem>
                      <MenuItem value="monthly_retainer">Monthly Retainer</MenuItem>
                      <MenuItem value="volume_based">Volume Based</MenuItem>
                      <MenuItem value="hybrid">Hybrid</MenuItem>
                      <MenuItem value="custom">Custom</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Billing Cycle</InputLabel>
                    <Select
                      value={formData.pricingModel.billingCycle}
                      label="Billing Cycle"
                      onChange={(e) => handlePricingChange('billingCycle', e.target.value)}
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="quarterly">Quarterly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Base Rate (₦/kg)"
                    type="number"
                    value={formData.pricingModel.baseRate}
                    onChange={(e) => handlePricingChange('baseRate', parseFloat(e.target.value) || 0)}
                    error={!!errors.baseRate}
                    helperText={errors.baseRate}
                    required
                    InputProps={{
                      startAdornment: <DollarSign size={16} style={{ marginRight: 8, color: '#6b7280' }} />
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Minimum Fee (₦)"
                    type="number"
                    value={formData.pricingModel.minimumFee}
                    onChange={(e) => handlePricingChange('minimumFee', parseFloat(e.target.value) || 0)}
                    InputProps={{
                      startAdornment: <DollarSign size={16} style={{ marginRight: 8, color: '#6b7280' }} />
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="600" mb={2}>
                Volume Discounts
              </Typography>

              {volumeDiscounts.map((discount, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 3 }}>
                      <TextField
                        fullWidth
                        label="Min Volume (kg)"
                        type="number"
                        value={discount.minVolume}
                        onChange={(e) => updateVolumeDiscount(index, 'minVolume', parseFloat(e.target.value) || 0)}
                        size="small"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <TextField
                        fullWidth
                        label="Discount (%)"
                        type="number"
                        value={discount.discountPercentage}
                        onChange={(e) => updateVolumeDiscount(index, 'discountPercentage', parseFloat(e.target.value) || 0)}
                        size="small"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        fullWidth
                        label="Effective From"
                        type="date"
                        value={discount.effectiveFrom}
                        onChange={(e) => updateVolumeDiscount(index, 'effectiveFrom', e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                      {volumeDiscounts.length > 1 && (
                        <IconButton 
                          onClick={() => removeVolumeDiscount(index)}
                          color="error"
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              <Button
                variant="outlined"
                startIcon={<Plus />}
                onClick={addVolumeDiscount}
                sx={{ alignSelf: 'flex-start' }}
              >
                Add Volume Discount
              </Button>
            </Stack>
          </TabPanel>

          {/* SLA Requirements Tab */}
          <TabPanel value={activeTab} index={3}>
            <Stack spacing={3}>
              <Alert severity="info">
                <Typography variant="body2">
                  Define service level agreement requirements for this enterprise client.
                </Typography>
              </Alert>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" fontWeight="600" mb={1}>
                    Pickup Window
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      label="Start Time"
                      type="time"
                      value={formData.slaRequirements.pickupWindow.start}
                      onChange={(e) => handleSLAChange('pickupWindow', { type: 'start', value: e.target.value })}
                      size="small"
                    />
                    <TextField
                      fullWidth
                      label="End Time"
                      type="time"
                      value={formData.slaRequirements.pickupWindow.end}
                      onChange={(e) => handleSLAChange('pickupWindow', { type: 'end', value: e.target.value })}
                      size="small"
                    />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Response Time (minutes)"
                    type="number"
                    value={formData.slaRequirements.responseTime}
                    onChange={(e) => handleSLAChange('responseTime', parseInt(e.target.value) || 0)}
                    helperText="Maximum time to respond to pickup requests"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Completion Rate (%)"
                    type="number"
                    value={formData.slaRequirements.completionRate}
                    onChange={(e) => handleSLAChange('completionRate', parseFloat(e.target.value) || 0)}
                    helperText="Minimum pickup completion rate required"
                    inputProps={{ min: 0, max: 100 }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Reporting Frequency</InputLabel>
                    <Select
                      value={formData.slaRequirements.reportingFrequency}
                      label="Reporting Frequency"
                      onChange={(e) => handleSLAChange('reportingFrequency', e.target.value)}
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Stack>
          </TabPanel>
        </Box>

        {/* Footer */}
        <Box sx={{ 
          p: 3, 
          borderTop: 1, 
          borderColor: 'divider',
          bgcolor: '#f8fafc'
        }}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <Check size={16} /> : <Plus size={16} />}
            >
              {loading ? 'Creating Client...' : 'Create Client'}
            </Button>
          </Stack>

          {errors.submit && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.submit}
            </Alert>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default AddEnterpriseClientDrawer;
