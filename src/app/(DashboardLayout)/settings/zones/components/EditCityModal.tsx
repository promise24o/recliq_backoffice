'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import { MapPin, Save } from 'lucide-react';
import { City } from '@/hooks/useZones';

interface EditCityModalProps {
  open: boolean;
  city: City | null;
  onClose: () => void;
  onSave: (cityId: string, data: { name: string; state: string; lat: number; lng: number; timezone?: string }) => void;
  isSaving?: boolean;
}

const EditCityModal: React.FC<EditCityModalProps> = ({
  open,
  city,
  onClose,
  onSave,
  isSaving = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    lat: 0,
    lng: 0,
    timezone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (city) {
      setFormData({
        name: city.name,
        state: city.state,
        lat: city.center.lat,
        lng: city.center.lng,
        timezone: city.timezone,
      });
      setErrors({});
    }
  }, [city]);

  const handleInputChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'lat' || field === 'lng' 
      ? parseFloat(event.target.value) || 0 
      : event.target.value;
    
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'City name is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (formData.lat === 0) newErrors.lat = 'Valid latitude is required';
    if (formData.lng === 0) newErrors.lng = 'Valid longitude is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm() || !city) return;
    
    onSave(city.id, {
      name: formData.name.trim(),
      state: formData.state.trim(),
      lat: formData.lat,
      lng: formData.lng,
      timezone: formData.timezone || 'UTC',
    });
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: '#EBF8FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MapPin size={24} color="#3B82F6" />
          </Box>
          <Box flex={1}>
            <Typography variant="h6" fontWeight={600}>
              Edit City
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Update city information and coordinates
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="body2" fontWeight={500} mb={1}>
              City Name <span style={{ color: '#EF4444' }}>*</span>
            </Typography>
            <input
              value={formData.name}
              onChange={handleInputChange('name')}
              placeholder="Enter city name"
              style={{
                width: '100%',
                padding: '16.5px 14px',
                fontSize: '1rem',
                border: errors.name ? '1px solid #EF4444' : '1px solid rgba(0,0,0,0.23)',
                borderRadius: '4px',
              }}
            />
            {errors.name && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {errors.name}
              </Typography>
            )}
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={500} mb={1}>
              State <span style={{ color: '#EF4444' }}>*</span>
            </Typography>
            <input
              value={formData.state}
              onChange={handleInputChange('state')}
              placeholder="Enter state name"
              style={{
                width: '100%',
                padding: '16.5px 14px',
                fontSize: '1rem',
                border: errors.state ? '1px solid #EF4444' : '1px solid rgba(0,0,0,0.23)',
                borderRadius: '4px',
              }}
            />
            {errors.state && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {errors.state}
              </Typography>
            )}
          </Box>

          <Stack direction="row" spacing={2}>
            <Box flex={1}>
              <Typography variant="body2" fontWeight={500} mb={1}>
                Latitude <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <input
                type="number"
                step="0.000001"
                value={formData.lat}
                onChange={handleInputChange('lat')}
                placeholder="e.g., 6.5244"
                style={{
                  width: '100%',
                  padding: '16.5px 14px',
                  fontSize: '1rem',
                  border: errors.lat ? '1px solid #EF4444' : '1px solid rgba(0,0,0,0.23)',
                  borderRadius: '4px',
                }}
              />
              {errors.lat && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.lat}
                </Typography>
              )}
            </Box>

            <Box flex={1}>
              <Typography variant="body2" fontWeight={500} mb={1}>
                Longitude <span style={{ color: '#EF4444' }}>*</span>
              </Typography>
              <input
                type="number"
                step="0.000001"
                value={formData.lng}
                onChange={handleInputChange('lng')}
                placeholder="e.g., 3.3792"
                style={{
                  width: '100%',
                  padding: '16.5px 14px',
                  fontSize: '1rem',
                  border: errors.lng ? '1px solid #EF4444' : '1px solid rgba(0,0,0,0.23)',
                  borderRadius: '4px',
                }}
              />
              {errors.lng && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.lng}
                </Typography>
              )}
            </Box>
          </Stack>

          <Box>
            <Typography variant="body2" fontWeight={500} mb={1}>
              Timezone
            </Typography>
            <input
              value={formData.timezone}
              onChange={handleInputChange('timezone')}
              placeholder="e.g., Africa/Lagos"
              style={{
                width: '100%',
                padding: '16.5px 14px',
                fontSize: '1rem',
                border: '1px solid rgba(0,0,0,0.23)',
                borderRadius: '4px',
              }}
            />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} variant="outlined" disabled={isSaving}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={isSaving ? <CircularProgress size={16} /> : <Save size={16} />}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCityModal;
