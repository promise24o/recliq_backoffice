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
  Avatar,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import {
  User,
  Mail,
  Phone,
  Edit3,
  X,
  Save,
  Camera,
} from 'lucide-react';
import type { AdminProfile } from '../types';

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (profile: Partial<AdminProfile>, photoFile?: File | null) => void;
  profile: AdminProfile | null;
  isSaving?: boolean;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  onSave,
  profile,
  isSaving = false,
}) => {
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
      });
      setErrors({});
      // Reset photo state
      setSelectedPhoto(null);
      setPhotoFile(null);
    }
  }, [profile]);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedPhoto(e.target?.result as string);
        setPhotoFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
    setPhotoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Skip validation for disabled fields (firstName, lastName, email)
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData, photoFile);
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
    });
    setErrors({});
    setSelectedPhoto(null);
    setPhotoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  if (!profile) return null;

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
            <Edit3 size={24} color="#0284C7" />
          </Box>
          <Box flex={1}>
            <Typography variant="h6" fontWeight="600">
              Edit Profile
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Update your personal information
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        {/* Profile Header */}
        <Box
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={selectedPhoto || undefined}
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: '#F3F4F6',
                  color: '#6B7280',
                  fontWeight: 700,
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
                onClick={handlePhotoClick}
              >
                {!selectedPhoto && formData.firstName && formData.lastName
                  ? `${formData.firstName[0]}${formData.lastName[0]}`
                  : 'U'}
              </Avatar>
              <Stack direction="column" spacing={1} alignItems="center">
                <Button
                  size="small"
                  onClick={handlePhotoClick}
                  startIcon={<Camera size={14} />}
                  variant="outlined"
                  sx={{ minWidth: 100 }}
                >
                  Change Photo
                </Button>
                {selectedPhoto && (
                  <Button
                    size="small"
                    onClick={handleRemovePhoto}
                    startIcon={<X size={14} />}
                    color="error"
                    sx={{ minWidth: 100 }}
                  >
                    Remove
                  </Button>
                )}
              </Stack>
            </Box>
            <Box flex={1}>
              <Typography variant="subtitle1" fontWeight="600">
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.email}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                <Chip
                  label={profile.role}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={profile.accountStatus}
                  size="small"
                  color={profile.accountStatus === 'active' ? 'success' : 'warning'}
                  sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600 }}
                />
              </Stack>
              {selectedPhoto && (
                <Typography variant="caption" color="success.main" mt={0.5} display="block">
                  ✓ New photo selected
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ display: 'none' }}
        />

        <Divider sx={{ mb: 3 }} />

        {/* Form Fields */}
        <Stack spacing={3}>
          {/* Name Fields */}
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="First Name"
              value={formData.firstName}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={18} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
                '& .Mui-disabled': {
                  bgcolor: 'grey.50',
                },
              }}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={formData.lastName}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={18} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
                '& .Mui-disabled': {
                  bgcolor: 'grey.50',
                },
              }}
            />
          </Stack>

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email Address"
            value={formData.email}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={18} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
              '& .Mui-disabled': {
                bgcolor: 'grey.50',
              },
            }}
          />

          {/* Phone Field */}
          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone size={18} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />

          </Stack>

        {/* Info Alert */}
        <Alert severity="info" sx={{ mt: 3, borderRadius: 3 }}>
          <Typography variant="body2">
            For security reasons, your name and email cannot be changed. You can update your phone number. Changes will be reflected across all system records.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          disabled={isSaving}
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : <Save size={16} />}
          disabled={isSaving}
          sx={{ minWidth: 120 }}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
