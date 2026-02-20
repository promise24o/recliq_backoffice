'use client';
import React from 'react';
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
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  AlertTriangle,
  UserMinus,
  Shield,
  Clock,
} from 'lucide-react';

interface RevokeAccessDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  admin: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  isRevoking?: boolean;
}

const RevokeAccessDialog: React.FC<RevokeAccessDialogProps> = ({
  open,
  onClose,
  onConfirm,
  admin,
  isRevoking = false,
}) => {
  if (!admin) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: '#FEE2E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertTriangle size={24} color="#DC2626" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="600" color="#DC2626">
              Revoke Admin Access
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This action cannot be undone
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Revoking access will immediately suspend this admin's account and prevent them from logging in.
          </Typography>
        </Alert>

        <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 48, height: 48, bgcolor: '#F3F4F6', color: '#6B7280' }}>
              {admin.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Box flex={1}>
              <Typography variant="subtitle1" fontWeight="600">
                {admin.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {admin.email}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                <Shield size={14} color="#6B7280" />
                <Typography variant="caption" color="text.secondary">
                  {admin.role}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>

        <Stack spacing={2}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <UserMinus size={16} color="#DC2626" />
              <Typography variant="subtitle2" fontWeight="600" color="#DC2626">
                What happens when you revoke access:
              </Typography>
            </Stack>
            <Stack spacing={1} sx={{ pl: 3 }}>
              <Typography variant="body2" color="text.secondary">
                • Admin account will be immediately suspended
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • All system access will be revoked
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Current sessions will be terminated
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Admin will need to be re-activated to regain access
              </Typography>
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Clock size={16} color="#6B7280" />
              <Typography variant="subtitle2" fontWeight="600">
                Recovery options:
              </Typography>
            </Stack>
            <Stack spacing={1} sx={{ pl: 3 }}>
              <Typography variant="body2" color="text.secondary">
                • Only SUPER_ADMIN can reactivate suspended accounts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Reactivation requires manual approval
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • All actions are logged and audited
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={isRevoking}
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          startIcon={isRevoking ? <CircularProgress size={16} color="inherit" /> : <UserMinus size={16} />}
          disabled={isRevoking}
          sx={{ minWidth: 120 }}
        >
          {isRevoking ? 'Revoking...' : 'Revoke Access'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RevokeAccessDialog;
