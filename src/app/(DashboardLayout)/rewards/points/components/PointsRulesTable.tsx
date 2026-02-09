'use client'
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip, 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem,
  TablePagination,
  TextField,
  InputAdornment,
  Stack,
  CardContent
} from '@mui/material';
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Download, 
  Copy,
  Play,
  Pause,
  Calendar,
  MapPin,
  Users,
  Coins,
  Shield,
  Zap,
  Target
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { PointsRule } from '../types';

interface PointsRulesTableProps {
  rules: PointsRule[];
  onRowClick: (rule: PointsRule) => void;
  onExport: (rules: PointsRule[]) => void;
  onDuplicateRule: (rule: PointsRule) => void;
  onActivateRule: (rule: PointsRule) => void;
  onPauseRule: (rule: PointsRule) => void;
  onScheduleRule: (rule: PointsRule) => void;
  onRetireRule: (rule: PointsRule) => void;
}

const PointsRulesTable: React.FC<PointsRulesTableProps> = ({
  rules,
  onRowClick,
  onExport,
  onDuplicateRule,
  onActivateRule,
  onPauseRule,
  onScheduleRule,
  onRetireRule
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRule, setSelectedRule] = useState<PointsRule | null>(null);

  // Filter rules based on search
  const filteredRules = rules.filter(rule =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.triggerAction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.modifiedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, rule: PointsRule) => {
    setAnchorEl(event.currentTarget);
    setSelectedRule(rule);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRule(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'scheduled':
        return 'info';
      case 'retired':
        return 'default';
      default:
        return 'default';
    }
  };

  const getTriggerActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      'completed_pickup': 'Completed Pickup',
      'completed_dropoff': 'Completed Drop-off',
      'kg_recycled': 'Kg Recycled',
      'daily_streak': 'Daily Streak',
      'weekly_streak': 'Weekly Streak',
      'referral_completion': 'Referral Completion',
      'high_quality_waste': 'High Quality Waste',
      'peak_hour_recycling': 'Peak Hour Recycling',
      'first_pickup': 'First Pickup',
      'milestone_achievement': 'Milestone Achievement',
      'campaign_participation': 'Campaign Participation'
    };
    return labels[action] || action;
  };

  const getScopeIcon = (scope: string) => {
    switch (scope) {
      case 'global':
        return <MapPin size={16} />;
      case 'city':
        return <MapPin size={16} />;
      case 'zone':
        return <MapPin size={16} />;
      case 'campaign':
        return <Target size={16} />;
      default:
        return <MapPin size={16} />;
    }
  };

  const getScopeLabel = (scope: string, locations?: string[]) => {
    switch (scope) {
      case 'global':
        return 'Global';
      case 'city':
        return locations ? locations.join(', ') : 'City';
      case 'zone':
        return locations ? locations.join(', ') : 'Zone';
      case 'campaign':
        return 'Campaign';
      default:
        return scope;
    }
  };

  const paginatedRules = filteredRules.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardCard title="Points Rules">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🎯 Configure reward incentives safely • Align points with business outcomes • Prevent abuse
          </Typography>
        </Box>
        
        {/* Controls */}
        <Stack direction="row" spacing={2} mb={3} alignItems="center">
          <TextField
            placeholder="Search rules..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color="#6b7280" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <IconButton onClick={() => onExport(filteredRules)}>
            <Download size={20} />
          </IconButton>
        </Stack>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Rule Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Trigger Action</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>User Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Base Points</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Multipliers</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Scope</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Last Modified</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRules.map((rule) => (
                <TableRow
                  key={rule.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onRowClick(rule)}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#3b82f6' }}>
                        <Coins size={16} color="white" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="500">
                          {rule.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {rule.id}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 150 }}>
                      {getTriggerActionLabel(rule.triggerAction)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {rule.eligibleUserTypes.map((userType, index) => (
                        <Chip
                          key={index}
                          label={userType.charAt(0).toUpperCase() + userType.slice(1)}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.6rem' }}
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" fontWeight="500">
                        {rule.pointsLogic.basePoints}
                      </Typography>
                      {rule.pointsLogic.weightBasedScaling && (
                        <Typography variant="caption" color="text.secondary">
                          +{rule.pointsLogic.weightBasedScaling.pointsPerKg}/kg
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Zap size={16} color="#f59e0b" />
                      <Typography variant="body2">
                        {rule.pointsLogic.multipliers.length}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getScopeIcon(rule.scope.type)}
                      <Typography variant="body2">
                        {getScopeLabel(rule.scope.type, rule.scope.locations)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={rule.status.toUpperCase()}
                      size="small"
                      color={getStatusColor(rule.status) as any}
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">
                        {new Date(rule.lastModified).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {rule.modifiedBy}
                      </Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(e, rule);
                      }}
                    >
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredRules.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count} rules`
          }
        />

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              if (selectedRule) {
                onRowClick(selectedRule);
              }
              handleMenuClose();
            }}
          >
            <Eye size={16} style={{ marginRight: 8 }} />
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (selectedRule) {
                onDuplicateRule(selectedRule);
              }
              handleMenuClose();
            }}
          >
            <Copy size={16} style={{ marginRight: 8 }} />
            Duplicate Rule
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (selectedRule) {
                onExport([selectedRule]);
              }
              handleMenuClose();
            }}
          >
            <Download size={16} style={{ marginRight: 8 }} />
            Export Rule
          </MenuItem>
          {selectedRule?.status === 'paused' && (
            <MenuItem
              onClick={() => {
                if (selectedRule) {
                  onActivateRule(selectedRule);
                }
                handleMenuClose();
              }}
            >
              <Play size={16} style={{ marginRight: 8 }} />
              Activate Rule
            </MenuItem>
          )}
          {selectedRule?.status === 'active' && (
            <MenuItem
              onClick={() => {
                if (selectedRule) {
                  onPauseRule(selectedRule);
                }
                handleMenuClose();
              }}
            >
              <Pause size={16} style={{ marginRight: 8 }} />
              Pause Rule
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              if (selectedRule) {
                onScheduleRule(selectedRule);
              }
              handleMenuClose();
            }}
          >
            <Calendar size={16} style={{ marginRight: 8 }} />
            Schedule Rule
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (selectedRule) {
                onRetireRule(selectedRule);
              }
              handleMenuClose();
            }}
          >
            <Shield size={16} style={{ marginRight: 8 }} />
            Retire Rule
          </MenuItem>
        </Menu>
      </CardContent>
    </DashboardCard>
  );
};

export default PointsRulesTable;
