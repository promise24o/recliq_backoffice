'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Chip,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  Shield,
} from 'lucide-react';
import type { AdminProfile } from '../types';
import {
  getRoleColor,
  getRoleLabel,
  getRoleDescription,
  getStatusColor,
} from '../mockData';

interface ProfileOverviewProps {
  profile: AdminProfile;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ profile }) => {
  const roleColor = getRoleColor(profile.role);
  const statusColor = getStatusColor(profile.accountStatus);

  return (
    <Paper sx={{ p: 0, overflow: 'hidden' }}>
      {/* Banner */}
      <Box
        sx={{
          height: 120,
          background: `linear-gradient(135deg, ${roleColor}20 0%, ${roleColor}40 100%)`,
          position: 'relative',
        }}
      />

      {/* Profile Card */}
      <Box sx={{ px: 4, pb: 4, mt: -6 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ md: 'flex-end' }}>
          <Avatar
            src={profile.avatar}
            alt={`${profile.firstName} ${profile.lastName}`}
            sx={{
              width: 96,
              height: 96,
              border: '4px solid #fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          />
          <Box flex={1} pt={{ xs: 0, md: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Typography variant="h5" fontWeight="700">
                {profile.firstName} {profile.lastName}
              </Typography>
              <Chip
                label={profile.accountStatus.charAt(0).toUpperCase() + profile.accountStatus.slice(1)}
                size="small"
                sx={{
                  bgcolor: statusColor + '15',
                  color: statusColor,
                  fontWeight: 600,
                  fontSize: '0.7rem',
                }}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {profile.id}
            </Typography>
          </Box>
          <Tooltip title={getRoleDescription(profile.role)} arrow placement="top">
            <Chip
              icon={<Shield size={14} />}
              label={getRoleLabel(profile.role)}
              sx={{
                bgcolor: roleColor + '15',
                color: roleColor,
                fontWeight: 700,
                fontSize: '0.8rem',
                px: 1,
                height: 36,
                '& .MuiChip-icon': { color: roleColor },
              }}
            />
          </Tooltip>
        </Stack>

        {/* Details Grid */}
        <Grid container spacing={3} mt={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 36, height: 36, borderRadius: 1, bgcolor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={16} color="#3B82F6" />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Email</Typography>
                <Typography variant="body2" fontWeight="600">{profile.email}</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 36, height: 36, borderRadius: 1, bgcolor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={16} color="#10B981" />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Phone</Typography>
                <Typography variant="body2" fontWeight="600">{profile.phone}</Typography>
              </Box>
            </Stack>
          </Grid>
          {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 36, height: 36, borderRadius: 1, bgcolor: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={16} color="#8B5CF6" />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Department</Typography>
                <Typography variant="body2" fontWeight="600">{profile.department}</Typography>
              </Box>
            </Stack>
          </Grid> */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 36, height: 36, borderRadius: 1, bgcolor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={16} color="#F59E0B" />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Joined</Typography>
                <Typography variant="body2" fontWeight="600">
                  {new Date(profile.joinedAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' })}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Last Login */}
        <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Clock size={14} color="#6B7280" />
            <Typography variant="caption" color="text.secondary">
              Last login: {new Date(profile.lastLogin).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileOverview;
