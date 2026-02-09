'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Menu, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Search, Filter, MoreVertical, Eye, Download, Copy, Play, Pause, Calendar, MapPin, Users, Target, Zap, Clock, Award, TrendingUp, Coins, List, Grid3X3 } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { Challenge, ChallengeCategory, ChallengeStatus, ChallengeScope, ChallengeUserType, ChallengeRewardType, ChallengeWinnerLogic } from '../types';
import { getChallengeCategoryColor, getChallengeStatusColor, getChallengeScopeColor, formatDuration, getTimeRemaining } from '../mockData';

interface ChallengesTableProps {
  challenges: Challenge[];
  onChallengeClick: (challenge: Challenge) => void;
  onExport: (challenges: Challenge[]) => void;
  onActivateChallenge: (challenge: Challenge) => void;
  onPauseChallenge: (challenge: Challenge) => void;
  onEndChallenge: (challenge: Challenge) => void;
  onDuplicateChallenge: (challenge: Challenge) => void;
}

interface ChallengesTableFilters {
  status: ChallengeStatus | '';
  category: ChallengeCategory | '';
  scope: ChallengeScope | '';
  userType: ChallengeUserType | '';
  location: string;
  search: string;
}

const ChallengesTable: React.FC<ChallengesTableProps> = ({
  challenges,
  onChallengeClick,
  onExport,
  onActivateChallenge,
  onPauseChallenge,
  onEndChallenge,
  onDuplicateChallenge
}) => {
  const [filters, setFilters] = useState<ChallengesTableFilters>({
    status: '',
    category: '',
    scope: '',
    userType: '',
    location: '',
    search: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, challenge: Challenge) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedChallenge(challenge);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChallenge(null);
  };

  const handleAction = (action: string) => {
    if (selectedChallenge) {
      switch (action) {
        case 'activate':
          onActivateChallenge(selectedChallenge);
          break;
        case 'pause':
          onPauseChallenge(selectedChallenge);
          break;
        case 'end':
          onEndChallenge(selectedChallenge);
          break;
        case 'duplicate':
          onDuplicateChallenge(selectedChallenge);
          break;
        case 'export':
          onExport([selectedChallenge]);
          break;
      }
    }
    handleMenuClose();
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = searchTerm === '' || 
      challenge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === '' || challenge.status === filters.status;
    const matchesCategory = filters.category === '' || challenge.category === filters.category;
    const matchesScope = filters.scope === '' || challenge.scope === filters.scope;
    const matchesUserType = filters.userType === '' || challenge.targetUserType === filters.userType;
    const matchesLocation = filters.location === '' || 
      challenge.targetLocations.some(loc => loc.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesStatus && matchesCategory && matchesScope && matchesUserType && matchesLocation;
  });

  const getStatusColor = (status: ChallengeStatus): string => {
    switch (status) {
      case 'active': return '#10b981';
      case 'upcoming': return '#f59e0b';
      case 'completed': return '#6b7280';
      case 'paused': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category: ChallengeCategory) => {
    switch (category) {
      case 'volume': return <Target size={16} />;
      case 'consistency': return <Clock size={16} />;
      case 'quality': return <Award size={16} />;
      case 'growth': return <TrendingUp size={16} />;
      default: return <Target size={16} />;
    }
  };

  const getRewardIcon = (rewardType: ChallengeRewardType) => {
    switch (rewardType) {
      case 'points': return <Coins size={16} />;
      case 'badge': return <Award size={16} />;
      case 'perks': return <Zap size={16} />;
      case 'mixed': return <Target size={16} />;
      default: return <Coins size={16} />;
    }
  };

  const formatRewardValue = (challenge: Challenge): string => {
    switch (challenge.reward.type) {
      case 'points':
        return `${challenge.reward.pointsAwarded} points`;
      case 'badge':
        return challenge.reward.badgeUnlock || 'No badge';
      case 'perks':
        return `${challenge.reward.perks?.length || 0} perks`;
      case 'mixed':
        return `${challenge.reward.pointsAwarded || 0} points + ${challenge.reward.badgeUnlock ? ' + challenge.reward.badgeUnlock : ''} + (challenge.reward.perks?.length || 0) perks`;
      default:
        return 'No reward';
    }
  };

  const getWinnerLogicIcon = (logic: ChallengeWinnerLogic): React.ReactNode => {
    switch (logic) {
      case 'all': return <Users size={16} />;
      case 'top_performers': return <Target size={16} />;
      case 'lottery': return <Clock size={16} />;
      default: return <Users size={16} />;
    }
  };

  const getScopeIcon = (scope: ChallengeScope): string => {
    switch (scope) {
      case 'global': return <Target size={16} />;
      case 'city': <MapPin size={16} />;
      case 'zone': <MapPin size={16} />;
      default: <Target size={16} />;
    }
  };

  const getUserTypeIcon = (userType: ChallengeUserType): string => {
    switch (userType) {
      case 'user': return <Users size={16} />;
      case 'agent': return <Users size={16} />;
      case 'business': return <Users size={16} />;
      case 'all': return <Users size={16} />;
      default: return <Users size={16} />;
    }
  };

  return (
    <DashboardCard title="Challenges Table">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📊 Manage challenge lifecycle • Configure objectives and rewards • Monitor participation and effectiveness
          </Typography>
        </Box>

        {/* Controls */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3} flexWrap="wrap">
          <TextField
            placeholder="Search challenges..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search size={20} color="#6b7280" style={{ marginRight: 8 }} />
            }}
            sx={{ minWidth: 300 }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as ChallengeStatus | '' }))}
              label="Status"
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="paused">Paused</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as ChallengeCategory | '' }))}
              label="Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="volume">Volume</MenuItem>
              <MenuItem value="consistency">Consistency</MenuItem>
              <MenuItem value="quality">Quality</MenuItem>
              <MenuItem value="growth">Growth</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Scope</InputLabel>
            <Select
              value={filters.scope}
              onChange={(e) => setFilters(prev => ({ ...prev, scope: e.target.value as ChallengeScope | '' }))}
              label="Scope"
            >
              <MenuItem value="">All Scopes</MenuItem>
              <MenuItem value="global">Global</MenuItem>
              <MenuItem value="city">City</MenuItem>
              <MenuItem value="zone">Zone</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>User Type</InputLabel>
            <Select
              value={filters.userType}
              onChange={(e) => setFilters(prev => ({ ...prev, userType: e.target.value as ChallengeUserType | '' }))}
              label="User Type"
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="user">Users</MenuItem>
              <MenuItem value="agent">Agents</MenuItem>
              <MenuItem value="business">Businesses</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Location</InputLabel>
            <Select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              label="Location"
            >
              <MenuItem value="">All Locations</MenuItem>
              <MenuItem value="Lagos">Lagos</MenuItem>
              <MenuItem value="Abuja">Abuja</MenuItem>
              <MenuItem value="Port Harcourt">Port Harcourt</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flex: 1 }} />

          <Stack direction="row" spacing={1}>
            <Button
              variant={viewMode === 'table' ? 'contained' : 'outlined'}
              size="small"
              startIcon={viewMode === 'table' ? <List size={16} /> : <Grid3X3 size={16} />}
              onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
            >
              {viewMode === 'table' ? 'Table View' : 'Grid View'}
            </Button>
            <IconButton onClick={() => handleExport(filteredChallenges)}>
              <Download size={20} />
            </IconButton>
          </Stack>
        </Stack>

        {/* Results Summary */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredChallenges.length} of {challenges.length} challenges
          </Typography>
        </Box>

        {/* Challenges Display */}
        {filteredChallenges.length === 0 ? (
          <Box sx={{ 
            py: 8, 
            textAlign: 'center',
            bgcolor: '#f8fafc',
            borderRadius: 2,
            border: '2px dashed #e2e8f0'
          }}>
            <Typography variant="h6" color="text.secondary" mb={1}>
              No challenges found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your filters or search terms
            </Typography>
          </Box>
        ) : viewMode === 'table' ? (
          <TableContainer>
            <TableHeader>
              <TableRow>
                <TableCell>Challenge Name</TableCell>
                <TableCell>Objective</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell>Scope</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Participants</TableCell>
                <TableCell>Completion Rate</TableCell>
                <TableCell>Reward Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChallenges.map((challenge) => (
                <TableRow
                  key={challenge.id}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#f8fafc'
                    }
                  }}
                  onClick={() => onChallengeClick(challenge)}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="body2" fontWeight="500">
                        {challenge.name}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
                          size="small"
                          sx={{
                            bgcolor: `${getChallengeCategoryColor(challenge.category)}15`,
                            color: getChallengeCategoryColor(challenge.category),
                            fontSize: '0.75rem'
                          }}
                        />
                        <Chip
                          label={challenge.scope.charAt(0).toUpperCase() + challenge.scope.slice(1)}
                          size="small"
                          sx={{
                            bgcolor: `${getChallengeScopeColor(challenge.scope)}15`,
                            color: getChallengeScopeColor(challenge.scope),
                            fontSize: '0.75rem'
                          }}
                        />
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getCategoryIcon(challenge.category)}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {challenge.objective.type.replace('_', ' ').toUpperCase()}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {getUserTypeIcon(challenge.targetUserType)}
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {challenge.targetUserType === 'all' ? 'All' : challenge.targetUserType.charAt(0).toUpperCase() + challenge.targetUserType.slice(1)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {getScopeIcon(challenge.scope)}
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {challenge.scope === 'global' ? 'Global' : challenge.scope.charAt(0).toUpperCase() + challenge.scope.slice(1)}
                    </Typography>
                  </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDuration(challenge.startDate, challenge.endDate)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {getTimeRemaining(challenge.endDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">
                      {challenge.metrics.totalParticipants.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">
                      {challenge.metrics.completionRate.toFixed(1)}%
                    </Typography>
                  </TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {getRewardIcon(challenge.reward.type)}
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {formatRewardValue(challenge)}
                    </Typography>
                  </Stack>
                  </TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={challenge.status.toUpperCase()}
                      size="small"
                      color={getStatusColor(challenge.status)}
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </Stack>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, challenge)}
                    >
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        ) : (
          <Grid container spacing={3}>
            {filteredChallenges.map((challenge) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={challenge.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    border: `1px solid ${getStatusColor(challenge.status)}30`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 2
                    }
                  }}
                  onClick={() => onChallengeClick(challenge)}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      {/* Header */}
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography variant="h6" fontWeight="600" mb={1}>
                            {challenge.name}
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                              label={challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
                              size="small"
                              sx={{
                                bgcolor: `${getChallengeCategoryColor(challenge.category)}15`,
                                color: getChallengeCategoryColor(challenge.category),
                                fontSize: '0.75rem'
                              }}
                            />
                            <Chip
                              label={challenge.scope.charAt(0).toUpperCase() + challenge.scope.slice(1)}
                              size="small"
                              sx={{
                                bgcolor: `${getChallengeScopeColor(challenge.scope)}15`,
                                color: getChallengeScopeColor(challenge.scope),
                                fontSize: '0.75rem'
                              }}
                            />
                            <Chip
                              label={challenge.status.toUpperCase()}
                              size="small"
                              color={getStatusColor(challenge.status)}
                              sx={{ fontSize: '0.75rem' }}
                            />
                          </Stack>
                          <Typography variant="body2" color="text.secondary" sx={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {challenge.description}
                          </Typography>
                        </Box>
                        
                        <Stack direction="row" spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            {formatDuration(challenge.startDate, challenge.endDate)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {getTimeRemaining(challenge.endDate)}
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Stats */}
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Participants
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {challenge.metrics.totalParticipants.toLocaleString()}
                          </Typography>
                        </Stack>
                        
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Completion Rate
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {challenge.metrics.completionRate.toFixed(1)}%
                          </Typography>
                        </Stack>
                        
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Reward Type
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {getRewardIcon(challenge.reward.type)}
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              {formatRewardValue(challenge)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>

                      {/* Progress Bar */}
                      <Box sx={{ mt: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}}>
                          <Typography variant="body2" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {challenge.metrics.averageProgress.toFixed(1)}/{challenge.objective.value}
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={(challenge.metrics.averageProgress / challenge.objective.value) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: '#e2e8f0',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              bgcolor: getChallengeStatusColor(challenge.status)
                            }
                          }}
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
          <MenuItem onClick={() => handleAction('duplicate')}>
            <Copy size={16} style={{ marginRight: 8 }} />
            Duplicate
          </MenuItem>
          <MenuItem onClick={() => handleAction('activate')} disabled={!selectedChallenge || selectedChallenge.status !== 'paused'}>
            <Play size={16} style={{ marginRight: 8 }} />
            Activate
          </MenuItem>
          <MenuItem onClick={() => handleAction('pause')} disabled={!selectedChallenge || selectedChallenge.status !== 'active'}>
            <Pause size={16} style={{ marginRight: 8 }} />
            Pause
          </MenuItem>
          <MenuItem onClick={() => handleAction('end')} disabled={!selectedChallenge || selectedChallenge.status === 'completed'}>
            <Calendar size={16} style={{ marginRight: 8 }} />
            End Early
          </MenuItem>
        </Menu>
      </CardContent>
    </DashboardCard>
  );
};

export default ChallengesTable;
