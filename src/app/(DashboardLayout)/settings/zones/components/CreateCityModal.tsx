'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Stack,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { MapPin, Plus, CheckCircle, AlertTriangle } from 'lucide-react';

interface CreateCityModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (cityData: {
    name: string;
    state: string;
    lat: number;
    lng: number;
    timezone?: string;
    isActive?: boolean;
  }) => void;
  isSaving?: boolean;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP as string;

const CreateCityModal: React.FC<CreateCityModalProps> = ({
  open,
  onClose,
  onSave,
  isSaving = false,
}) => {
  const autocompleteRef = useRef<google.maps.places.PlaceAutocompleteElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', state: '' });
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placeDetails, setPlaceDetails] = useState<google.maps.places.Place | null>(null);

  // Helper function to safely extract coordinates
  const getLat = (coords: any) => {
    if (typeof coords.lat === 'function') return coords.lat();
    return coords.lat;
  };

  const getLng = (coords: any) => {
    if (typeof coords.lng === 'function') return coords.lng();
    return coords.lng;
  };

  useEffect(() => {
    if (!open) return;

    // Reset form
    setFormData({ name: '', state: '' });
    setSelectedCoordinates(null);
    setPlaceDetails(null);
    setErrors({});

    // Wait for Google Maps JS API
    const initAutocomplete = async () => {
      if (!window.google?.maps?.places) {
        console.warn('Google Maps Places library not loaded yet');
        return;
      }

      // Clean up previous instance if any
      if (autocompleteRef.current && containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      // Create new PlaceAutocompleteElement
      const autocomplete = new google.maps.places.PlaceAutocompleteElement({
        componentRestrictions: { country: ['ng'] },  
        types: ['(cities)'],
      });

      autocompleteRef.current = autocomplete;

      // Append the web component (it brings its own <input> + dropdown)
      if (containerRef.current) {
        containerRef.current.appendChild(autocomplete);
      }

      // Listen for selection
      autocomplete.addEventListener('gmp-select', async (e: any) => {
        // In some versions it's e.placePrediction – check console if needed
        const placePrediction = e.place || (e as any).placePrediction;

        if (!placePrediction) return;

        try {
          // Fetch full place details (geometry, etc.)
          const place = await placePrediction.toPlace();

          // Wait until details are fetched
          await place.fetchFields({
            fields: ['displayName', 'location', 'addressComponents', 'formattedAddress'],
          });

          const loc = place.location;
          if (!loc?.lat || !loc?.lng) {
            console.warn('No geometry available');
            return;
          }

          const lat = loc.lat;
          const lng = loc.lng;

          setSelectedCoordinates({ lat, lng });

          // Try to extract city & state from address components
          let cityName = place.displayName || '';
          let stateName = '';

          if (place.addressComponents) {
            const comps = place.addressComponents as google.maps.places.AddressComponent[];
            cityName =
              comps.find((c) => c.types.includes('locality'))?.longName ||
              comps.find((c) => c.types.includes('administrative_area_level_2'))?.longName ||
              cityName;

            stateName =
              comps.find((c) => c.types.includes('administrative_area_level_1'))?.longName || '';
          }

          setFormData({
            name: cityName,
            state: stateName,
          });

          setPlaceDetails(place);
          setErrors({});
        } catch (err) {
          console.error('Error fetching place details:', err);
        }
      });
    };

    // Give the script a moment to load if needed
    setTimeout(initAutocomplete, 300);

    return () => {
      // Cleanup
      if (autocompleteRef.current && containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [open]);

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, state: e.target.value }));
    if (errors.state) setErrors((prev) => ({ ...prev, state: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'City name is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!selectedCoordinates) newErrors.coordinates = 'Please select a city from the suggestions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm() || !selectedCoordinates) return;

    onSave({
      name: formData.name.trim(),
      state: formData.state.trim(),
      lat: getLat(selectedCoordinates),
      lng: getLng(selectedCoordinates),
      timezone: 'UTC', // ← improve later if needed
      isActive: true,
    });
  };

  const handleClose = () => {
    setFormData({ name: '', state: '' });
    setSelectedCoordinates(null);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
              Create New City
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add a new city to expand zone coverage and operational areas
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              City coordinates will be automatically detected from Google Places
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
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
              Start typing to search cities using Google Places autocomplete
            </Typography>

            <Box
              ref={containerRef}
              sx={{
                '& input': {
                  width: '100%',
                  padding: '16.5px 14px',
                  fontSize: '1rem',
                  border: errors.name || errors.coordinates
                    ? '1px solid #EF4444'
                    : '1px solid rgba(0,0,0,0.23)',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                },
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
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
              State will be auto-filled from Google Places or enter manually
            </Typography>
            <input
              value={formData.state}
              onChange={handleStateChange}
              placeholder="e.g., Lagos, Rivers State"
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

          {selectedCoordinates && (
            <Box sx={{ p: 2, bgcolor: 'success.lighter', borderRadius: 1, border: '1px solid #10B981' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CheckCircle size={18} color="#10B981" />
                <Typography variant="subtitle2" color="success.main">
                  Location selected: {formData.name}, {formData.state}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, pl: 4 }}>
                Lat: {getLat(selectedCoordinates).toFixed(6)} | Lng: {getLng(selectedCoordinates).toFixed(6)}
              </Typography>
            </Box>
          )}

          {errors.coordinates && (
            <Alert severity="error" icon={<AlertTriangle size={18} />}>
              {errors.coordinates}
            </Alert>
          )}

          {/* Instructions */}
          <Box sx={{ 
            p: 2, 
            bgcolor: 'info.lighter', 
            borderRadius: 1, 
            border: '1px solid',
            borderColor: 'info.light',
            mt: 2
          }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="info.main" fontWeight={600}>
                📍 How to Add a City
              </Typography>
              <Typography variant="body2" color="text.secondary">
                1. Start typing the city name in the search field
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2. Select the correct city from Google Places dropdown
              </Typography>
              <Typography variant="body2" color="text.secondary">
                3. Verify the state field is correct (auto-filled or manual)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                4. Click "Create City" to add to your zones system
              </Typography>
            </Stack>
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
          startIcon={isSaving ? <CircularProgress size={16} /> : <Plus size={16} />}
          disabled={isSaving}
        >
          {isSaving ? 'Creating...' : 'Create City'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCityModal;