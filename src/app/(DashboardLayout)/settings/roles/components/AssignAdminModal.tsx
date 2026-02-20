'use client';
import React, { useMemo, useState } from 'react';
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
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  CircularProgress,
  Alert,
  Divider,
  Fade,
  Tooltip,
} from '@mui/material';
import {
  Search,
  UserPlus,
  Shield,
  Mail,
  Calendar,
  CheckCircle,
  X,
} from 'lucide-react';
import type { AdminUser, RoleDefinition } from '../types';

interface AssignAdminModalProps {
  open: boolean;
  onClose: () => void;
  onAssign: (adminId: string, roleId: string) => void;
  role: RoleDefinition | null;
  admins: AdminUser[];
  isAssigning?: boolean;
}

const glass = {
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
  backdropFilter: 'blur(10px)',
};

const AssignAdminModal: React.FC<AssignAdminModalProps> = ({
  open,
  onClose,
  onAssign,
  role,
  admins,
  isAssigning = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  const availableAdmins = useMemo(
    () =>
      admins.filter(
        (admin) =>
          admin.adminSubRole !== role?.role &&
          (admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [admins, role, searchQuery]
  );

  const handleAssign = () => {
    if (selectedAdmin && role) onAssign(selectedAdmin.id, role.id);
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedAdmin(null);
    onClose();
  };

  if (!role) return null;

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
            <UserPlus size={24} color="#0284C7" />
          </Box>
          <Box flex={1}>
            <Typography variant="h6" fontWeight="600">
              Assign Admin to Role
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select an admin to assign to {role.role}
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        {/* Role Info */}
        <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Shield size={20} color="#0284C7" />
            <Box>
              <Typography variant="subtitle1" fontWeight="600">
                {role.role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {role.purpose}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <TextField
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            },
          }}
        />

        <Divider sx={{ mb: 2 }} />

        {availableAdmins.length === 0 ? (
          <Alert severity="info" sx={{ borderRadius: 3 }}>
            No available admins
          </Alert>
        ) : (
          <List sx={{ maxHeight: 420, overflowY: 'auto' }}>
            {availableAdmins.map((admin) => {
              const selected = selectedAdmin?.id === admin.id;
              return (
                <ListItem key={admin.id} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={() => setSelectedAdmin(admin)}
                    selected={selected}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: selected ? 'primary.main' : 'divider',
                      transition: 'all .2s',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                      },
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '& .MuiTypography-root': {
                          color: 'inherit',
                        },
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: selected ? 'primary.dark' : 'grey.200',
                          color: selected ? 'primary.contrastText' : 'text.primary',
                          fontWeight: 700,
                        }}
                      >
                        {admin.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography fontWeight={600}>
                            {admin.name}
                          </Typography>
                          {admin.isVerified && (
                            <CheckCircle size={14} />
                          )}
                        </Stack>
                      }
                      secondary={
                        <Stack spacing={0.5}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Mail size={12} />
                            <Typography variant="caption">
                              {admin.email}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                              size="small"
                              label={admin.adminSubRole || 'NO_ROLE'}
                              sx={{
                                height: 20,
                                fontSize: '0.65rem',
                                bgcolor: selected
                                  ? 'primary.dark'
                                  : 'transparent',
                                color: selected
                                  ? 'primary.contrastText'
                                  : 'text.secondary',
                              }}
                            />
                            <Stack
                              direction="row"
                              spacing={0.3}
                              alignItems="center"
                            >
                              <Calendar size={12} />
                              <Typography variant="caption">
                                {new Date(
                                  admin.createdAt
                                ).toLocaleDateString()}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}

        {selectedAdmin && (
          <Alert
            severity="success"
            sx={{ mt: 2, borderRadius: 3 }}
          >
            {selectedAdmin.name}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          disabled={isAssigning}
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAssign}
          variant="contained"
          startIcon={isAssigning ? <CircularProgress size={16} color="inherit" /> : <UserPlus size={16} />}
          disabled={!selectedAdmin || isAssigning}
          sx={{ minWidth: 120 }}
        >
          {isAssigning ? 'Assigning...' : 'Assign Role'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignAdminModal;