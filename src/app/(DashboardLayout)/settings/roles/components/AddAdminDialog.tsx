'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  X,
  UserPlus,
  Eye,
  EyeOff,
  Shield,
} from 'lucide-react';
import { AdminSubRole } from '../types';
import { getRoleColor, getRoleLabel } from '../mockData';
import { useCreateAdmin } from '@/hooks/useAdmins';
import type { CreateAdminPayload } from '@/hooks/useAdmins';

interface AddAdminDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const subRoleOptions = [
  { value: AdminSubRole.OPS_ADMIN, description: 'Manages daily operations — pickups, agents, scheduling' },
  { value: AdminSubRole.FINANCE_ADMIN, description: 'Manages payouts, wallets, invoices, financial reports' },
  { value: AdminSubRole.STRATEGY_ADMIN, description: 'Read-only analytics — dashboards, trends, impact' },
  { value: AdminSubRole.SUPER_ADMIN, description: 'Full platform governance — unrestricted access (audited)' },
];

const AddAdminDialog: React.FC<AddAdminDialogProps> = ({ open, onClose, onSuccess }) => {
  const createAdmin = useCreateAdmin();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    adminSubRole: '' as string,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().split(' ').length < 2) {
      newErrors.name = 'Please enter first and last name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Must include uppercase, lowercase, and a number';
    }

    if (!formData.adminSubRole) {
      newErrors.adminSubRole = 'Sub-role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload: CreateAdminPayload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: 'admin',
      adminSubRole: formData.adminSubRole as CreateAdminPayload['adminSubRole'],
    };

    createAdmin.mutate(payload, {
      onSuccess: () => {
        handleReset();
        onSuccess?.();
        onClose();
      },
    });
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', password: '', adminSubRole: '' });
    setErrors({});
    setShowPassword(false);
  };

  const handleClose = () => {
    handleReset();
    createAdmin.reset();
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: '#3B82F615',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UserPlus size={20} color="#3B82F6" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="600">Add Admin User</Typography>
              <Typography variant="caption" color="text.secondary">
                Create a new admin account with role-based access
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={handleClose} size="small">
            <X size={18} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {createAdmin.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {(createAdmin.error as any)?.response?.data?.message || 'Failed to create admin user. Please try again.'}
          </Alert>
        )}

        <Stack spacing={2.5} sx={{ mt: 1 }}>
          {/* Full Name */}
          <TextField
            label="Full Name"
            placeholder="e.g. Tunde Bakare"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
          />

          {/* Email */}
          <TextField
            label="Email Address"
            placeholder="e.g. tunde.bakare@recliq.ng"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
          />

          {/* Password */}
          <TextField
            label="Password"
            placeholder="Min. 8 characters"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={!!errors.password}
            helperText={errors.password || 'Must include uppercase, lowercase, and a number'}
            fullWidth
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Sub-Role */}
          <FormControl fullWidth required error={!!errors.adminSubRole}>
            <InputLabel>Admin Sub-Role</InputLabel>
            <Select
              value={formData.adminSubRole}
              label="Admin Sub-Role"
              onChange={(e) => handleChange('adminSubRole', e.target.value)}
            >
              {subRoleOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Shield size={16} color={getRoleColor(opt.value)} />
                    <Box>
                      <Typography variant="body2" fontWeight="600">
                        {getRoleLabel(opt.value)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {opt.description}
                      </Typography>
                    </Box>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
            {errors.adminSubRole && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                {errors.adminSubRole}
              </Typography>
            )}
          </FormControl>

          {/* Selected role info */}
          {formData.adminSubRole && (
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: getRoleColor(formData.adminSubRole as AdminSubRole) + '08',
                border: '1px solid',
                borderColor: getRoleColor(formData.adminSubRole as AdminSubRole) + '25',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                <Shield size={14} color={getRoleColor(formData.adminSubRole as AdminSubRole)} />
                <Typography variant="body2" fontWeight="600" color={getRoleColor(formData.adminSubRole as AdminSubRole)}>
                  {getRoleLabel(formData.adminSubRole as AdminSubRole)}
                </Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                {subRoleOptions.find((o) => o.value === formData.adminSubRole)?.description}
              </Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={createAdmin.isPending}
          startIcon={createAdmin.isPending ? <CircularProgress size={16} color="inherit" /> : <UserPlus size={16} />}
        >
          {createAdmin.isPending ? 'Creating...' : 'Create Admin'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAdminDialog;
