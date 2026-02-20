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
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import {
  Key,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (passwordData: { currentPassword: string; newPassword: string }) => void;
  isSaving?: boolean;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  onClose,
  onSave,
  isSaving = false,
}) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: string[];
    color: string;
  }>({
    score: 0,
    feedback: [],
    color: 'error.main',
  });

  React.useEffect(() => {
    if (open) {
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setErrors({});
      setShowPasswords({
        current: false,
        new: false,
        confirm: false,
      });
    }
  }, [open]);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Check password strength for new password
    if (field === 'newPassword') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    const feedback: string[] = [];

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One uppercase letter');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One lowercase letter');
    }

    // Number check
    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('One number');
    }

    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One special character');
    }

    let color = 'error.main';
    if (score >= 4) color = 'success.main';
    else if (score >= 3) color = 'warning.main';
    else if (score >= 2) color = 'info.main';

    setPasswordStrength({ score, feedback, color });
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (passwordStrength.score < 3) {
      newErrors.newPassword = 'Password is too weak';
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
    }
  };

  const handleClose = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
    setPasswordStrength({ score: 0, feedback: [], color: 'error.main' });
    onClose();
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength.score === 0) return 'Very Weak';
    if (passwordStrength.score === 1) return 'Weak';
    if (passwordStrength.score === 2) return 'Fair';
    if (passwordStrength.score === 3) return 'Good';
    if (passwordStrength.score === 4) return 'Strong';
    return 'Very Strong';
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
              bgcolor: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Key size={24} color="#F59E0B" />
          </Box>
          <Box flex={1}>
            <Typography variant="h6" fontWeight="600">
              Change Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Update your account password for better security
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        {/* Security Notice */}
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            For your security, please choose a strong password that you haven't used before.
          </Typography>
        </Alert>

        {/* Password Fields */}
        <Stack spacing={3}>
          {/* Current Password */}
          <TextField
            fullWidth
            label="Current Password"
            type={showPasswords.current ? 'text' : 'password'}
            value={formData.currentPassword}
            onChange={handleInputChange('currentPassword')}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('current')}
                    edge="end"
                    size="small"
                  >
                    {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* New Password */}
          <TextField
            fullWidth
            label="New Password"
            type={showPasswords.new ? 'text' : 'password'}
            value={formData.newPassword}
            onChange={handleInputChange('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('new')}
                    edge="end"
                    size="small"
                  >
                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Password Strength Indicator */}
          {formData.newPassword && (
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Typography variant="caption" color="text.secondary">
                  Password Strength:
                </Typography>
                <Typography 
                  variant="caption" 
                  fontWeight="600" 
                  color={passwordStrength.color}
                >
                  {getPasswordStrengthLabel()}
                </Typography>
              </Stack>
              <Box
                sx={{
                  height: 4,
                  bgcolor: 'grey.200',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${(passwordStrength.score / 5) * 100}%`,
                    bgcolor: passwordStrength.color,
                    transition: 'all 0.3s ease',
                  }}
                />
              </Box>
              {passwordStrength.feedback.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  {passwordStrength.feedback.map((item, index) => (
                    <Stack key={index} direction="row" spacing={1} alignItems="center">
                      <AlertTriangle size={12} color="warning" />
                      <Typography variant="caption" color="text.secondary">
                        {item}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              )}
            </Box>
          )}

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm New Password"
            type={showPasswords.confirm ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('confirm')}
                    edge="end"
                    size="small"
                  >
                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {/* Success Message */}
        {formData.newPassword && 
         formData.confirmPassword && 
         formData.newPassword === formData.confirmPassword &&
         passwordStrength.score >= 3 && (
          <Alert severity="success" sx={{ mt: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircle size={16} />
              <Typography variant="body2">
                Password meets security requirements
              </Typography>
            </Stack>
          </Alert>
        )}
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
          startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : <Key size={16} />}
          disabled={isSaving}
          sx={{ minWidth: 120 }}
        >
          {isSaving ? 'Updating...' : 'Update Password'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
