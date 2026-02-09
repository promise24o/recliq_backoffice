'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Menu, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Search, Filter, MoreVertical, Eye, Download, Copy, CheckCircle, X, AlertTriangle, Users, MapPin, Clock, Target, Zap, Calendar } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { Referral, ReferralStatus, ReferrerType } from '../types';
import { getReferralStatusColor, getReferrerTypeColor, getAbuseFlagColor, formatDuration, formatCurrency } from '../mockData';

interface ReferralPerformanceTableProps {
  referrals: Referral[];
  onReferralClick: (referral: Referral) => void;
  onExport: (referrals: Referral[]) => void;
  onApproveReward: (referral: Referral) => void;
  onRevokeReward: (referral: Referral) => void;
  onFlagAbuse: (referral: Referral) => void;
  onClearFlag: (referral: Referral) => void;
}

const ReferralPerformanceTable: React.FC<ReferralPerformanceTableProps> = ({
  referrals,
  onReferralClick,
  onExport,
  onApproveReward,
  onRevokeReward,
  onFlagAbuse,
  onClearFlag
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, referral: Referral) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedReferral(referral);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReferral(null);
  };

  const handleAction = (action: string) => {
    if (selectedReferral) {
      switch (action) {
        case 'view':
          onReferralClick(selectedReferral);
          break;
        case 'export':
          onExport([selectedReferral]);
          break;
        case 'approve_reward':
          onApproveReward(selectedReferral);
          break;
        case 'revoke_reward':
          onRevokeReward(selectedReferral);
          break;
        case 'flag_abuse':
          onFlagAbuse(selectedReferral);
          break;
        case 'clear_flag':
          onClearFlag(selectedReferral);
          break;
      }
    }
    handleMenuClose();
  };

  const getStatusColor = (status: ReferralStatus): string => {
    switch (status) {
      case 'pending': return '#6b7280';
      case 'signed_up': return '#3b82f6';
      case 'activated': return '#10b981';
      case 'rewarded': return '#059669';
      case 'flagged': return '#ef4444';
      case 'revoked': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getActionColor = (action: string): string => {
    switch (action) {
      case 'approve_reward': return '#10b981';
      case 'revoke_reward': return '#f59e0b';
      case 'flag_abuse': return '#ef4444';
      case 'clear_flag': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const formatTimeToActivation = (referral: Referral): string => {
    if (!referral.signedUpAt || !referral.activatedAt) return 'N/A';
    const hours = (new Date(referral.activatedAt).getTime() - new Date(referral.signedUpAt).getTime()) / (1000 * 60);
    return formatDuration(hours);
  };

  const getConversionRateColor = (rate: number): string => {
    if (rate >= 40) return '#10b981';
    if (rate >= 30) return '#3b82f6';
    if (rate >= 20) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <DashboardCard title="Referral Performance Table">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            👥 Individual referral review • Growth verification console • Quality assessment tools
          </Typography>
        </Box>

        {/* Controls */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <TextField
            placeholder="Search referrals..."
            size="small"
            value={''}
            onChange={(e) => {
              // Handle search functionality
            }}
            InputProps={{
              startAdornment: <Search size={20} color="#6b7280" style={{ marginRight: 8 }} />
            }}
            sx={{ minWidth: 300 }}
          />

          <Box sx={{ flex: 1 }} />

          <IconButton onClick={() => onExport(referrals)}>
            <Download size={20} />
          </IconButton>
        </Stack>

        {/* Results Summary */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {referrals.length} referrals
          </Typography>
        </Box>

        {/* Referrals Table */}
        {referrals.length === 0 ? (
          <Box sx={{ 
            py: 8, 
            textAlign: 'center',
            bgcolor: '#f8fafc',
            borderRadius: 2,
            border: '2px dashed #e2e8f0'
          }}>
            <Typography variant="h6" color="text.secondary" mb={1}>
              No referrals found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your filters or search terms
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell>Referrer</TableCell>
                <TableCell>Referral Code</TableCell>
                <TableCell>Invited User</TableCell>
                <TableCell>City / Zone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>First Action</TableCell>
                <TableCell>Time to Activation</TableCell>
                <TableCell>Reward</TableCell>
                <TableCell>Abuse Flags</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {referrals.map((referral: Referral) => (
                <TableRow
                  key={referral.id}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#f8fafc'
                    }
                  }}
                  onClick={() => onReferralClick(referral)}
                >
                  <TableCell>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" fontWeight="500">
                          {referral.referrerName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {referral.referrerEmail}
                        </Typography>
                      </Box>
                      <Chip
                        label={referral.referrerType.charAt(0).toUpperCase() + referral.referrerType.slice(1)}
                        size="small"
                        sx={{
                          bgcolor: `${getReferrerTypeColor(referral.referrerType)}15`,
                          color: getReferrerTypeColor(referral.referrerType),
                          fontSize: '0.75rem'
                        }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {referral.referralCode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {referral.invitedUserName ? (
                      <Stack spacing={1}>
                        <Typography variant="body2" fontWeight="500">
                          {referral.invitedUserName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {referral.invitedUserEmail}
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Not registered
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <MapPin size={16} color="#6b7280" />
                        <Typography variant="body2">
                          {referral.invitedUserCity || referral.referrerCity}
                        </Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {referral.invitedUserZone || referral.referrerZone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={referral.status.replace('_', ' ').toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: `${getStatusColor(referral.status)}15`,
                        color: getStatusColor(referral.status),
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {referral.firstActionType ? (
                      <Stack spacing={1}>
                        <Typography variant="body2" fontWeight="500">
                          {referral.firstActionType.toUpperCase()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {referral.firstActionWeight?.toFixed(1)}kg
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No action yet
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatTimeToActivation(referral)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {referral.rewardIssued ? (
                      <Stack spacing={1}>
                        <Typography variant="body2" fontWeight="500" color="#10b981">
                          {formatCurrency(referral.rewardIssued)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {referral.rewardType}
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No reward
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {referral.abuseFlags && referral.abuseFlags.length > 0 ? (
                      <Stack spacing={1}>
                        {referral.abuseFlags.slice(0, 2).map((flag: string, index: number) => (
                          <Chip
                            key={index}
                            label={flag.replace('_', ' ').toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: `${getAbuseFlagColor(flag as any)}15`,
                              color: getAbuseFlagColor(flag as any),
                              fontSize: '0.7rem'
                            }}
                          />
                        ))}
                        {referral.abuseFlags.length > 2 && (
                          <Chip
                            label={`+${referral.abuseFlags.length - 2} more`}
                            size="small"
                            sx={{
                              bgcolor: '#ef444415',
                              color: '#ef4444',
                              fontSize: '0.7rem'
                            }}
                          />
                        )}
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Clean
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, referral)}
                    >
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        )}

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleAction('view')}>
            <Eye size={16} style={{ marginRight: 8 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={() => handleAction('export')}>
            <Download size={16} style={{ marginRight: 8 }} />
            Export
          </MenuItem>
          
          <MenuItem 
            onClick={() => handleAction('approve_reward')} 
            disabled={!selectedReferral || selectedReferral.status !== 'activated'}
          >
            <CheckCircle size={16} style={{ marginRight: 8 }} />
            Approve Reward
          </MenuItem>
          
          <MenuItem 
            onClick={() => handleAction('revoke_reward')} 
            disabled={!selectedReferral || selectedReferral.status !== 'rewarded'}
          >
            <X size={16} style={{ marginRight: 8 }} />
            Revoke Reward
          </MenuItem>
          
          <MenuItem 
            onClick={() => handleAction('flag_abuse')} 
            disabled={!selectedReferral || selectedReferral.status === 'flagged'}
          >
            <AlertTriangle size={16} style={{ marginRight: 8 }} />
            Flag Abuse
          </MenuItem>
          
          <MenuItem 
            onClick={() => handleAction('clear_flag')} 
            disabled={!selectedReferral || !selectedReferral.abuseFlags || selectedReferral.abuseFlags.length === 0}
          >
            <CheckCircle size={16} style={{ marginRight: 8 }} />
            Clear Flag
          </MenuItem>
        </Menu>
      </CardContent>
    </DashboardCard>
  );
};

export default ReferralPerformanceTable;
