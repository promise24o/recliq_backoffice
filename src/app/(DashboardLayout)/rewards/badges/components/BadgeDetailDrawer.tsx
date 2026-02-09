'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  Typography, 
  Stack, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Switch, 
  FormControlLabel,
  Card,
  CardContent,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
  Alert
} from '@mui/material';
import { 
  X, 
  Edit, 
  Save, 
  Play, 
  Pause, 
  Archive, 
  Copy, 
  Calendar, 
  ChevronDown,
  Plus,
  Trash2,
  Star,
  Users,
  Target,
  Zap
} from 'lucide-react';
import type { Badge, BadgeCategory, BadgeRarity, BadgeStatus, EligibilityType } from '../types';
import { getBadgeRarityColor, getBadgeCategoryColor, getBadgeStatusColor } from '../mockData';

interface BadgeDetailDrawerProps {
  badge: Badge | null;
  open: boolean;
  onClose: () => void;
  onSave: (badge: Badge) => void;
  onActivate: (badge: Badge) => void;
  onPause: (badge: Badge) => void;
  onRetire: (badge: Badge) => void;
  onDuplicate: (badge: Badge) => void;
}

const BadgeDetailDrawer: React.FC<BadgeDetailDrawerProps> = ({
  badge,
  open,
  onClose,
  onSave,
  onActivate,
  onPause,
  onRetire,
  onDuplicate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBadge, setEditedBadge] = useState<Badge | null>(null);

  React.useEffect(() => {
    if (badge) {
      setEditedBadge({ ...badge });
    }
  }, [badge]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedBadge) {
      onSave(editedBadge);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedBadge(badge);
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof Badge, value: any) => {
    if (editedBadge) {
      setEditedBadge({ ...editedBadge, [field]: value });
    }
  };

  const getCategoryLabel = (category: BadgeCategory): string => {
    switch (category) {
      case 'consistency': return 'Consistency';
      case 'impact': return 'Impact';
      case 'trust': return 'Trust';
      case 'growth': return 'Growth';
      case 'special': return 'Special';
      default: return category;
    }
  };

  const getRarityLabel = (rarity: BadgeRarity): string => {
    switch (rarity) {
      case 'common': return 'Common';
      case 'uncommon': return 'Uncommon';
      case 'rare': return 'Rare';
      case 'epic': return 'Epic';
      case 'legendary': return 'Legendary';
      default: return rarity;
    }
  };

  const getConditionTypeLabel = (type: string): string => {
    switch (type) {
      case 'pickups_completed': return 'Pickups Completed';
      case 'kg_recycled': return 'KG Recycled';
      case 'streak_days': return 'Streak Days';
      case 'referral_count': return 'Referral Count';
      case 'quality_score': return 'Quality Score';
      case 'dispute_free_days': return 'Dispute-Free Days';
      case 'custom': return 'Custom';
      default: return type;
    }
  };

  const getPerkTypeLabel = (type: string): string => {
    switch (type) {
      case 'points_multiplier': return 'Points Multiplier';
      case 'priority_matching': return 'Priority Matching';
      case 'reduced_fees': return 'Reduced Fees';
      case 'exclusive_access': return 'Exclusive Access';
      case 'profile_highlight': return 'Profile Highlight';
      default: return type;
    }
  };

  if (!badge || !editedBadge) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 600,
          p: 0
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: '#f8fafc'
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h4" sx={{ fontSize: '2rem' }}>
                {editedBadge.icon}
              </Typography>
              <Box>
                {isEditing ? (
                  <TextField
                    value={editedBadge.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    variant="standard"
                    sx={{ fontWeight: 600 }}
                  />
                ) : (
                  <Typography variant="h6" fontWeight="600">
                    {editedBadge.name}
                  </Typography>
                )}
                <Stack direction="row" spacing={1} mt={0.5}>
                  <Chip
                    label={getCategoryLabel(editedBadge.category)}
                    size="small"
                    sx={{
                      bgcolor: `${getBadgeCategoryColor(editedBadge.category)}15`,
                      color: getBadgeCategoryColor(editedBadge.category),
                      fontSize: '0.75rem'
                    }}
                  />
                  <Chip
                    label={getRarityLabel(editedBadge.rarity)}
                    size="small"
                    sx={{
                      bgcolor: `${getBadgeRarityColor(editedBadge.rarity)}15`,
                      color: getBadgeRarityColor(editedBadge.rarity),
                      fontSize: '0.75rem'
                    }}
                  />
                  <Chip
                    label={editedBadge.status.toUpperCase()}
                    size="small"
                    sx={{
                      bgcolor: `${getBadgeStatusColor(editedBadge.status)}15`,
                      color: getBadgeStatusColor(editedBadge.status),
                      fontSize: '0.75rem'
                    }}
                  />
                </Stack>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1}>
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<X />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <IconButton onClick={handleEdit}>
                    <Edit size={20} />
                  </IconButton>
                  <IconButton onClick={() => onDuplicate(badge)}>
                    <Copy size={20} />
                  </IconButton>
                </>
              )}
              <IconButton onClick={onClose}>
                <X size={20} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Badge Definition */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Badge Definition
                </Typography>
                
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Description
                    </Typography>
                    {isEditing ? (
                      <TextField
                        value={editedBadge.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                        multiline
                        rows={3}
                        fullWidth
                        size="small"
                      />
                    ) : (
                      <Typography variant="body2">
                        {editedBadge.description}
                      </Typography>
                    )}
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Category
                        </Typography>
                        {isEditing ? (
                          <FormControl size="small" fullWidth>
                            <Select
                              value={editedBadge.category}
                              onChange={(e) => handleFieldChange('category', e.target.value)}
                            >
                              <MenuItem value="consistency">Consistency</MenuItem>
                              <MenuItem value="impact">Impact</MenuItem>
                              <MenuItem value="trust">Trust</MenuItem>
                              <MenuItem value="growth">Growth</MenuItem>
                              <MenuItem value="special">Special</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography variant="body2">
                            {getCategoryLabel(editedBadge.category)}
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Rarity
                        </Typography>
                        {isEditing ? (
                          <FormControl size="small" fullWidth>
                            <Select
                              value={editedBadge.rarity}
                              onChange={(e) => handleFieldChange('rarity', e.target.value)}
                            >
                              <MenuItem value="common">Common</MenuItem>
                              <MenuItem value="uncommon">Uncommon</MenuItem>
                              <MenuItem value="rare">Rare</MenuItem>
                              <MenuItem value="epic">Epic</MenuItem>
                              <MenuItem value="legendary">Legendary</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography variant="body2">
                            {getRarityLabel(editedBadge.rarity)}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>

                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Eligibility
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {(isEditing ? editedBadge.eligibility : badge.eligibility).map((eligibility) => (
                        <Chip
                          key={eligibility}
                          label={eligibility.charAt(0).toUpperCase() + eligibility.slice(1)}
                          size="small"
                          sx={{ bgcolor: '#3b82f615', color: '#3b82f6' }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Unlock Conditions */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Unlock Conditions
                </Typography>
                
                <Stack spacing={2}>
                  {editedBadge.unlockConditions.map((condition, index) => (
                    <Box key={condition.id} sx={{ 
                      p: 2, 
                      bgcolor: '#f8fafc', 
                      borderRadius: 2,
                      border: '1px solid #e2e8f0'
                    }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="body2" fontWeight="500">
                            {getConditionTypeLabel(condition.type)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {condition.operator === 'greater_than_or_equal' ? '≥' : 
                             condition.operator === 'greater_than' ? '>' :
                             condition.operator === 'less_than' ? '<' : '='} {condition.value}
                            {condition.timeFrame && ` (${condition.timeFrame.replace('_', ' ')})`}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {condition.description}
                          </Typography>
                        </Box>
                        {isEditing && (
                          <IconButton size="small">
                            <Trash2 size={16} />
                          </IconButton>
                        )}
                      </Stack>
                    </Box>
                  ))}
                  
                  {isEditing && (
                    <Button
                      variant="outlined"
                      startIcon={<Plus />}
                      size="small"
                    >
                      Add Condition
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* Perks */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Perks & Effects
                </Typography>
                
                {editedBadge.perks.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    No perks configured for this badge
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {editedBadge.perks.map((perk) => (
                      <Box key={perk.id} sx={{ 
                        p: 2, 
                        bgcolor: '#f59e0b15', 
                        borderRadius: 2,
                        border: '1px solid #f59e0b30'
                      }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="body2" fontWeight="500">
                              {getPerkTypeLabel(perk.type)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {typeof perk.value === 'number' ? 
                                (perk.type === 'points_multiplier' || perk.type === 'reduced_fees' ? 
                                  `${(perk.value * 100).toFixed(0)}%` : perk.value) : 
                                perk.value}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {perk.description}
                            </Typography>
                          </Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                              label={perk.isActive ? 'Active' : 'Inactive'}
                              size="small"
                              color={perk.isActive ? 'success' : 'default'}
                            />
                            {isEditing && (
                              <IconButton size="small">
                                <Trash2 size={16} />
                              </IconButton>
                            )}
                          </Stack>
                        </Stack>
                      </Box>
                    ))}
                    
                    {isEditing && (
                      <Button
                        variant="outlined"
                        startIcon={<Plus />}
                        size="small"
                      >
                        Add Perk
                      </Button>
                    )}
                  </Stack>
                )}
              </CardContent>
            </Card>

            {/* Visibility */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Visibility
                </Typography>
                
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      User-Facing Copy
                    </Typography>
                    {isEditing ? (
                      <TextField
                        value={editedBadge.visibility.userFacingCopy}
                        onChange={(e) => handleFieldChange('visibility', { 
                          ...editedBadge.visibility, 
                          userFacingCopy: e.target.value 
                        })}
                        multiline
                        rows={2}
                        fullWidth
                        size="small"
                      />
                    ) : (
                      <Typography variant="body2">
                        {editedBadge.visibility.userFacingCopy}
                      </Typography>
                    )}
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editedBadge.visibility.showProgress}
                            onChange={(e) => handleFieldChange('visibility', { 
                              ...editedBadge.visibility, 
                              showProgress: e.target.checked 
                            })}
                            disabled={!isEditing}
                          />
                        }
                        label="Show Progress"
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editedBadge.visibility.shareable}
                            onChange={(e) => handleFieldChange('visibility', { 
                              ...editedBadge.visibility, 
                              shareable: e.target.checked 
                            })}
                            disabled={!isEditing}
                          />
                        }
                        label="Shareable"
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Performance Stats
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Total Earned
                      </Typography>
                      <Typography variant="h6" fontWeight="600">
                        {editedBadge.stats.totalEarned.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Active Earners
                      </Typography>
                      <Typography variant="h6" fontWeight="600">
                        {editedBadge.stats.activeEarners.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Earn Rate
                      </Typography>
                      <Typography variant="h6" fontWeight="600">
                        {editedBadge.stats.earnRate.toFixed(1)}/day
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Retention Impact
                      </Typography>
                      <Typography variant="h6" fontWeight="600" color="#10b981">
                        +{editedBadge.stats.retentionImpact.toFixed(1)}%
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Audit Trail */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown />}>
                <Typography variant="h6">Audit Trail</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {editedBadge.auditTrail.map((entry) => (
                    <Box key={entry.id} sx={{ 
                      p: 2, 
                      bgcolor: '#f8fafc', 
                      borderRadius: 2,
                      border: '1px solid #e2e8f0'
                    }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="body2" fontWeight="500">
                            {entry.action.toUpperCase()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            by {entry.performedBy}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString()}
                          </Typography>
                        </Box>
                      </Stack>
                      <Typography variant="caption" color="text.secondary" mt={1}>
                        {entry.details}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Box>

        {/* Actions */}
        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Stack direction="row" spacing={2}>
            {editedBadge.status === 'active' ? (
              <Button
                variant="outlined"
                startIcon={<Pause />}
                onClick={() => onPause(badge)}
                sx={{ color: '#f59e0b', borderColor: '#f59e0b' }}
              >
                Pause Badge
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<Play />}
                onClick={() => onActivate(badge)}
                disabled={editedBadge.status === 'retired'}
              >
                Activate Badge
              </Button>
            )}
            
            <Button
              variant="outlined"
              startIcon={<Archive />}
              onClick={() => onRetire(badge)}
              sx={{ color: '#6b7280', borderColor: '#6b7280' }}
            >
              Retire Badge
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Copy />}
              onClick={() => onDuplicate(badge)}
            >
              Duplicate
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default BadgeDetailDrawer;
