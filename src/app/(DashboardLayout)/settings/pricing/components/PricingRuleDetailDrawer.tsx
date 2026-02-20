'use client';
import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  Stack,
  Grid,
  Paper,
  Chip,
  IconButton,
  Divider,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  X,
  DollarSign,
  Shield,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Play,
  Pause,
  Copy,
  Archive,
  Eye,
} from 'lucide-react';
import type { PricingRule, ImpactPreview } from '../types';
import {
  getWasteTypeColor,
  getWasteTypeLabel,
  getScopeColor,
  getScopeLabel,
  getStatusColor,
  getStatusLabel,
  getPickupModeLabel,
  getPickupModeColor,
  getPriorityColor,
  getPriorityLabel,
  formatRate,
  formatCurrency,
} from '../mockData';

interface PricingRuleDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  rule: PricingRule | null;
  impactPreview?: ImpactPreview[];
}

const PricingRuleDetailDrawer: React.FC<PricingRuleDetailDrawerProps> = ({
  open,
  onClose,
  rule,
  impactPreview,
}) => {
  if (!rule) return null;

  const wasteColor = getWasteTypeColor(rule.wasteType);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', md: 900 }, p: 0 } }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <DollarSign size={24} color={wasteColor} />
              <Box>
                <Typography variant="h6" fontWeight="600">{rule.name}</Typography>
                <Typography variant="body2" color="text.secondary">{rule.id} • v{rule.version}</Typography>
              </Box>
            </Stack>
            <IconButton onClick={onClose}><X size={20} /></IconButton>
          </Stack>
        </Box>

        {/* Status Bar */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Chip label={getStatusLabel(rule.status).toUpperCase()} size="small" sx={{ bgcolor: getStatusColor(rule.status) + '15', color: getStatusColor(rule.status), fontWeight: 600 }} />
            <Chip label={getWasteTypeLabel(rule.wasteType)} size="small" sx={{ bgcolor: wasteColor + '15', color: wasteColor, fontWeight: 500 }} />
            <Chip label={getScopeLabel(rule.scope)} size="small" sx={{ bgcolor: getScopeColor(rule.scope) + '15', color: getScopeColor(rule.scope), fontWeight: 500 }} />
            <Chip label={getPickupModeLabel(rule.pickupMode)} size="small" sx={{ bgcolor: getPickupModeColor(rule.pickupMode) + '15', color: getPickupModeColor(rule.pickupMode) }} />
            <Chip label={getPriorityLabel(rule.priority)} size="small" sx={{ bgcolor: getPriorityColor(rule.priority) + '15', color: getPriorityColor(rule.priority) }} />
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Rule Definition */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>Rule Definition</Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>{rule.description}</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Scope</Typography>
                  <Typography variant="body2" fontWeight="600">{getScopeLabel(rule.scope)}{rule.city ? ` — ${rule.city}` : ''}{rule.zone ? ` / ${rule.zone}` : ''}</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Waste Type</Typography>
                  <Typography variant="body2" fontWeight="600">{getWasteTypeLabel(rule.wasteType)}</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Pickup Mode</Typography>
                  <Typography variant="body2" fontWeight="600">{getPickupModeLabel(rule.pickupMode)}</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Priority</Typography>
                  <Typography variant="body2" fontWeight="600">{getPriorityLabel(rule.priority)}</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Pricing Logic */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>Pricing Logic</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ p: 2, bgcolor: '#ECFDF5', borderRadius: 1, border: '1px solid #A7F3D0', textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">User Price</Typography>
                    <Typography variant="h5" fontWeight="700" color="#10B981">{formatRate(rule.userPricePerKg)}</Typography>
                    <Typography variant="caption" color="text.secondary">per kg</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ p: 2, bgcolor: '#FFFBEB', borderRadius: 1, border: '1px solid #FDE68A', textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">Agent Payout</Typography>
                    <Typography variant="h5" fontWeight="700" color="#F59E0B">{formatRate(rule.agentPayoutPerKg)}</Typography>
                    <Typography variant="caption" color="text.secondary">per kg</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ p: 2, bgcolor: '#F5F3FF', borderRadius: 1, border: '1px solid #DDD6FE', textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">Platform Margin</Typography>
                    <Typography variant="h5" fontWeight="700" color="#8B5CF6">{rule.platformMarginPercent}%</Typography>
                    <Typography variant="caption" color="text.secondary">of user price</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">Fixed Fee</Typography>
                    <Typography variant="h5" fontWeight="700">{rule.fixedFee > 0 ? formatRate(rule.fixedFee) : '—'}</Typography>
                    <Typography variant="caption" color="text.secondary">{rule.fixedFee > 0 ? 'per transaction' : 'none'}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Safeguards */}
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Shield size={18} color="#EF4444" />
                <Typography variant="h6" fontWeight="600">Safeguards</Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">Min / Max Price per kg</Typography>
                  <Typography variant="body2" fontWeight="600">
                    {formatRate(rule.safeguards.minPricePerKg)} — {formatRate(rule.safeguards.maxPricePerKg)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">Min / Max Payout per kg</Typography>
                  <Typography variant="body2" fontWeight="600">
                    {formatRate(rule.safeguards.minPayoutPerKg)} — {formatRate(rule.safeguards.maxPayoutPerKg)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">Daily Payout Cap</Typography>
                  <Typography variant="body2" fontWeight="600">{formatCurrency(rule.safeguards.dailyPayoutCap)}</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">Abuse Throttle Limit</Typography>
                  <Typography variant="body2" fontWeight="600">{rule.safeguards.abuseThrottleLimit} txns/day</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Timing & Priority */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>Timing & Priority</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Calendar size={16} color="#6B7280" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Effective Start</Typography>
                      <Typography variant="body2" fontWeight="600">
                        {new Date(rule.effectiveStart).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Clock size={16} color="#6B7280" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Sunset Date</Typography>
                      <Typography variant="body2" fontWeight="600">
                        {rule.effectiveEnd ? new Date(rule.effectiveEnd).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No expiry'}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">Rule Priority</Typography>
                  <Box mt={0.5}>
                    <Chip label={getPriorityLabel(rule.priority)} size="small" sx={{ bgcolor: getPriorityColor(rule.priority) + '15', color: getPriorityColor(rule.priority), fontWeight: 600 }} />
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Visibility */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>Visibility</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ p: 2, bgcolor: '#ECFDF5', borderRadius: 1, border: '1px solid #A7F3D0' }}>
                    <Typography variant="caption" color="text.secondary">User-Facing Label</Typography>
                    <Typography variant="body2" fontWeight="600">{rule.userFacingLabel}</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ p: 2, bgcolor: '#FFFBEB', borderRadius: 1, border: '1px solid #FDE68A' }}>
                    <Typography variant="caption" color="text.secondary">Agent-Facing Label</Typography>
                    <Typography variant="body2" fontWeight="600">{rule.agentFacingLabel}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Impact Preview */}
            {impactPreview && impactPreview.length > 0 && (
              <Paper sx={{ p: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <TrendingUp size={18} color="#8B5CF6" />
                  <Typography variant="h6" fontWeight="600">Impact Preview</Typography>
                </Stack>
                <Stack spacing={1.5}>
                  {impactPreview.map((item, i) => (
                    <Box key={i} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight="500">{item.metric}</Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            {item.unit === '₦' ? formatCurrency(item.current) : `${item.current}${item.unit}`}
                          </Typography>
                          <ArrowRight size={14} color="#6B7280" />
                          <Typography variant="body2" fontWeight="600">
                            {item.unit === '₦' ? formatCurrency(item.proposed) : `${item.proposed}${item.unit}`}
                          </Typography>
                          <Chip
                            label={`${item.changePercent > 0 ? '+' : ''}${item.changePercent}%`}
                            size="small"
                            sx={{
                              bgcolor: item.changePercent > 0 ? '#ECFDF5' : item.changePercent < 0 ? '#FEF2F2' : '#f8fafc',
                              color: item.changePercent > 0 ? '#10B981' : item.changePercent < 0 ? '#EF4444' : '#6B7280',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            )}

            {/* Metadata */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>Metadata</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Created</Typography>
                  <Typography variant="body2">{new Date(rule.createdAt).toLocaleDateString('en-NG')}</Typography>
                  <Typography variant="caption" color="text.secondary">by {rule.createdBy}</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Last Updated</Typography>
                  <Typography variant="body2">{new Date(rule.updatedAt).toLocaleDateString('en-NG')}</Typography>
                  <Typography variant="caption" color="text.secondary">by {rule.lastChangedBy}</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="caption" color="text.secondary">Version</Typography>
                  <Typography variant="body2" fontWeight="600">v{rule.version}</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Actions */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>Actions</Typography>
              <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                All pricing changes are versioned and audited.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button variant="outlined" startIcon={<Play size={16} />} color="success">Activate</Button>
                <Button variant="outlined" startIcon={<Pause size={16} />} color="warning">Pause</Button>
                <Button variant="outlined" startIcon={<Calendar size={16} />}>Schedule Update</Button>
                <Button variant="outlined" startIcon={<Copy size={16} />}>Duplicate</Button>
                <Button variant="outlined" startIcon={<Archive size={16} />} color="error">Retire</Button>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default PricingRuleDetailDrawer;
