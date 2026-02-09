'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Menu } from '@mui/material';
import { Search, Filter, MoreVertical, Eye, Edit, Play, Pause, Archive, Copy, Download, Grid3X3, List } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { Badge, BadgeCategory, BadgeRarity, BadgeStatus, EligibilityType } from '../types';
import { getBadgeRarityColor, getBadgeCategoryColor, getBadgeStatusColor } from '../mockData';

interface BadgesCatalogProps {
  badges: Badge[];
  onBadgeClick: (badge: Badge) => void;
  onActivateBadge: (badge: Badge) => void;
  onPauseBadge: (badge: Badge) => void;
  onRetireBadge: (badge: Badge) => void;
  onDuplicateBadge: (badge: Badge) => void;
  onExport: (badges: Badge[]) => void;
}

interface BadgesCatalogFilters {
  category: BadgeCategory | '';
  eligibility: EligibilityType | '';
  status: BadgeStatus | '';
  rarity: BadgeRarity | '';
  search: string;
}

const BadgesCatalog: React.FC<BadgesCatalogProps> = ({
  badges,
  onBadgeClick,
  onActivateBadge,
  onPauseBadge,
  onRetireBadge,
  onDuplicateBadge,
  onExport
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<BadgesCatalogFilters>({
    category: '',
    eligibility: '',
    status: '',
    rarity: '',
    search: ''
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, badge: Badge) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedBadge(badge);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBadge(null);
  };

  const handleAction = (action: string) => {
    if (selectedBadge) {
      switch (action) {
        case 'activate':
          onActivateBadge(selectedBadge);
          break;
        case 'pause':
          onPauseBadge(selectedBadge);
          break;
        case 'retire':
          onRetireBadge(selectedBadge);
          break;
        case 'duplicate':
          onDuplicateBadge(selectedBadge);
          break;
        case 'export':
          onExport([selectedBadge]);
          break;
      }
    }
    handleMenuClose();
  };

  const filteredBadges = badges.filter(badge => {
    const matchesSearch = filters.search === '' || 
      badge.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      badge.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = filters.category === '' || badge.category === filters.category;
    const matchesEligibility = filters.eligibility === '' || badge.eligibility.includes(filters.eligibility);
    const matchesStatus = filters.status === '' || badge.status === filters.status;
    const matchesRarity = filters.rarity === '' || badge.rarity === filters.rarity;

    return matchesSearch && matchesCategory && matchesEligibility && matchesStatus && matchesRarity;
  });

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

  const getEligibilityLabel = (eligibility: EligibilityType[]): string => {
    if (eligibility.includes('all')) return 'All';
    if (eligibility.length === 1) return eligibility[0].charAt(0).toUpperCase() + eligibility[0].slice(1);
    return eligibility.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(', ');
  };

  const BadgeCard = ({ badge }: { badge: Badge }) => (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        border: `1px solid ${badge.status === 'active' ? '#10b98130' : '#6b728030'}`,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 2
        }
      }}
      onClick={() => onBadgeClick(badge)}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h4" sx={{ fontSize: '2rem' }}>
                {badge.icon}
              </Typography>
              <Box>
                <Typography variant="h6" fontWeight="600" mb={0.5}>
                  {badge.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {badge.description}
                </Typography>
              </Box>
            </Stack>
            
            <IconButton
              size="small"
              onClick={(e) => handleMenuOpen(e, badge)}
            >
              <MoreVertical size={16} />
            </IconButton>
          </Stack>

          {/* Tags */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              label={getCategoryLabel(badge.category)}
              size="small"
              sx={{
                bgcolor: `${getBadgeCategoryColor(badge.category)}15`,
                color: getBadgeCategoryColor(badge.category),
                fontSize: '0.75rem'
              }}
            />
            <Chip
              label={getRarityLabel(badge.rarity)}
              size="small"
              sx={{
                bgcolor: `${getBadgeRarityColor(badge.rarity)}15`,
                color: getBadgeRarityColor(badge.rarity),
                fontSize: '0.75rem'
              }}
            />
            <Chip
              label={badge.status.toUpperCase()}
              size="small"
              sx={{
                bgcolor: `${getBadgeStatusColor(badge.status)}15`,
                color: getBadgeStatusColor(badge.status),
                fontSize: '0.75rem'
              }}
            />
          </Stack>

          {/* Stats */}
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Eligibility
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {getEligibilityLabel(badge.eligibility)}
              </Typography>
            </Stack>
            
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Earned by
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {badge.stats.totalEarned.toLocaleString()} users
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Earn rate
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {badge.stats.earnRate.toFixed(1)}/day
              </Typography>
            </Stack>
          </Stack>

          {/* Perks Indicator */}
          {badge.perks.length > 0 && (
            <Box sx={{ 
              p: 1, 
              bgcolor: '#f59e0b15', 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Typography variant="caption" color="#f59e0b" fontWeight="500">
                ✨ {badge.perks.length} perk{badge.perks.length > 1 ? 's' : ''} available
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );

  const BadgeListItem = ({ badge }: { badge: Badge }) => (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        border: `1px solid ${badge.status === 'active' ? '#10b98130' : '#6b728030'}`,
        '&:hover': {
          transform: 'translateX(2px)',
          boxShadow: 1
        }
      }}
      onClick={() => onBadgeClick(badge)}
    >
      <CardContent>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h3" sx={{ fontSize: '2rem' }}>
            {badge.icon}
          </Typography>
          
          <Box flex={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Box>
                <Typography variant="h6" fontWeight="600" mb={0.5}>
                  {badge.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
                  {badge.description}
                </Typography>
              </Box>
              
              <IconButton
                size="small"
                onClick={(e) => handleMenuOpen(e, badge)}
              >
                <MoreVertical size={16} />
              </IconButton>
            </Stack>
            
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                label={getCategoryLabel(badge.category)}
                size="small"
                sx={{
                  bgcolor: `${getBadgeCategoryColor(badge.category)}15`,
                  color: getBadgeCategoryColor(badge.category),
                  fontSize: '0.75rem'
                }}
              />
              <Chip
                label={getRarityLabel(badge.rarity)}
                size="small"
                sx={{
                  bgcolor: `${getBadgeRarityColor(badge.rarity)}15`,
                  color: getBadgeRarityColor(badge.rarity),
                  fontSize: '0.75rem'
                }}
              />
              <Chip
                label={badge.status.toUpperCase()}
                size="small"
                sx={{
                  bgcolor: `${getBadgeStatusColor(badge.status)}15`,
                  color: getBadgeStatusColor(badge.status),
                  fontSize: '0.75rem'
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {getEligibilityLabel(badge.eligibility)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {badge.stats.totalEarned.toLocaleString()} earned
              </Typography>
              {badge.perks.length > 0 && (
                <Typography variant="body2" color="#f59e0b" fontWeight="500">
                  ✨ {badge.perks.length} perks
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <DashboardCard title="Badges Catalog">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🏅 Achievement-based recognition for recycling impact • Manage badge definitions and requirements
          </Typography>
        </Box>

        {/* Controls */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3} flexWrap="wrap">
          <TextField
            placeholder="Search badges..."
            size="small"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            InputProps={{
              startAdornment: <Search size={20} color="#6b7280" style={{ marginRight: 8 }} />
            }}
            sx={{ minWidth: 300 }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as BadgeCategory | '' }))}
              label="Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="consistency">Consistency</MenuItem>
              <MenuItem value="impact">Impact</MenuItem>
              <MenuItem value="trust">Trust</MenuItem>
              <MenuItem value="growth">Growth</MenuItem>
              <MenuItem value="special">Special</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Eligibility</InputLabel>
            <Select
              value={filters.eligibility}
              onChange={(e) => setFilters(prev => ({ ...prev, eligibility: e.target.value as EligibilityType | '' }))}
              label="Eligibility"
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="agent">Agent</MenuItem>
              <MenuItem value="business">Business</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as BadgeStatus | '' }))}
              label="Status"
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="retired">Retired</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Rarity</InputLabel>
            <Select
              value={filters.rarity}
              onChange={(e) => setFilters(prev => ({ ...prev, rarity: e.target.value as BadgeRarity | '' }))}
              label="Rarity"
            >
              <MenuItem value="">All Rarities</MenuItem>
              <MenuItem value="common">Common</MenuItem>
              <MenuItem value="uncommon">Uncommon</MenuItem>
              <MenuItem value="rare">Rare</MenuItem>
              <MenuItem value="epic">Epic</MenuItem>
              <MenuItem value="legendary">Legendary</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flex: 1 }} />

          <Stack direction="row" spacing={1}>
            <Button
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              size="small"
              startIcon={<Grid3X3 size={16} />}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              size="small"
              startIcon={<List size={16} />}
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
            <IconButton onClick={() => onExport(filteredBadges)}>
              <Download size={20} />
            </IconButton>
          </Stack>
        </Stack>

        {/* Results Summary */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredBadges.length} of {badges.length} badges
          </Typography>
        </Box>

        {/* Badges Display */}
        {filteredBadges.length === 0 ? (
          <Box sx={{ 
            py: 8, 
            textAlign: 'center',
            bgcolor: '#f8fafc',
            borderRadius: 2,
            border: '2px dashed #e2e8f0'
          }}>
            <Typography variant="h6" color="text.secondary" mb={1}>
              No badges found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your filters or search terms
            </Typography>
          </Box>
        ) : (
          viewMode === 'grid' ? (
            <Grid container spacing={3}>
              {filteredBadges.map((badge) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={badge.id}>
                  <BadgeCard badge={badge} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Stack spacing={2}>
              {filteredBadges.map((badge) => (
                <BadgeListItem key={badge.id} badge={badge} />
              ))}
            </Stack>
          )
        )}

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleAction('activate')} disabled={!selectedBadge || selectedBadge.status === 'active'}>
            <Play size={16} style={{ marginRight: 8 }} />
            Activate
          </MenuItem>
          <MenuItem onClick={() => handleAction('pause')} disabled={!selectedBadge || selectedBadge.status !== 'active'}>
            <Pause size={16} style={{ marginRight: 8 }} />
            Pause
          </MenuItem>
          <MenuItem onClick={() => handleAction('retire')} disabled={!selectedBadge || selectedBadge.status === 'retired'}>
            <Archive size={16} style={{ marginRight: 8 }} />
            Retire
          </MenuItem>
          <MenuItem onClick={() => handleAction('duplicate')}>
            <Copy size={16} style={{ marginRight: 8 }} />
            Duplicate
          </MenuItem>
          <MenuItem onClick={() => handleAction('export')}>
            <Download size={16} style={{ marginRight: 8 }} />
            Export
          </MenuItem>
        </Menu>
      </CardContent>
    </DashboardCard>
  );
};

export default BadgesCatalog;
