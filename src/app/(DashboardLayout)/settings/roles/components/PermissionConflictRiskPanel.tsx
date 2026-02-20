'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  AlertTriangle,
  AlertOctagon,
  Shield,
  CheckCircle,
} from 'lucide-react';
import type { PermissionConflict, PermissionMatrixEntry } from '../types';
import {
  getPermissionLevelColor,
  getPermissionLevelIcon,
  getRoleColor,
} from '../mockData';

interface PermissionConflictRiskPanelProps {
  conflicts: PermissionConflict[];
  permissionMatrix: PermissionMatrixEntry[];
}

const PermissionConflictRiskPanel: React.FC<PermissionConflictRiskPanelProps> = ({
  conflicts,
  permissionMatrix,
}) => {
  const getConflictTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      segregation_violation: 'Segregation of Duties',
      excess_privilege: 'Excess Privilege',
      conflicting_scope: 'Conflicting Scope',
    };
    return labels[type] || type;
  };

  const getConflictTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      segregation_violation: '#F59E0B',
      excess_privilege: '#EF4444',
      conflicting_scope: '#8B5CF6',
    };
    return colors[type] || '#6B7280';
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box mb={3}>
        <Typography variant="h6" fontWeight="600">
          Permission Conflict & Risk Analysis
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Segregation-of-duties violations, excess privileges, and cross-role permission matrix
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Conflicts */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <AlertOctagon size={18} color="#EF4444" />
              <Typography variant="subtitle2" fontWeight="600">
                Active Conflicts ({conflicts.length})
              </Typography>
            </Stack>
            <Stack spacing={2}>
              {conflicts.map((conflict) => (
                <Box
                  key={conflict.id}
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: conflict.severity === 'critical' ? '#EF444440' : '#F59E0B40',
                    borderRadius: 1,
                    bgcolor: conflict.severity === 'critical' ? '#FEF2F2' : '#FFFBEB',
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Chip
                      label={getConflictTypeLabel(conflict.type)}
                      size="small"
                      sx={{
                        bgcolor: getConflictTypeColor(conflict.type) + '15',
                        color: getConflictTypeColor(conflict.type),
                        fontSize: '0.65rem',
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      label={conflict.severity.toUpperCase()}
                      size="small"
                      color={conflict.severity === 'critical' ? 'error' : 'warning'}
                      variant="outlined"
                      sx={{ fontSize: '0.65rem' }}
                    />
                  </Stack>
                  <Typography variant="body2" mb={1}>
                    {conflict.description}
                  </Typography>
                  <Stack direction="row" spacing={0.5} mb={1} flexWrap="wrap">
                    {conflict.affectedRoles.map((role) => (
                      <Chip
                        key={role}
                        label={role}
                        size="small"
                        sx={{
                          bgcolor: getRoleColor(role) + '15',
                          color: getRoleColor(role),
                          fontSize: '0.6rem',
                          height: 20,
                          mb: 0.5,
                        }}
                      />
                    ))}
                  </Stack>
                  <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <CheckCircle size={14} color="#10B981" style={{ marginTop: 2, flexShrink: 0 }} />
                      <Typography variant="caption" color="text.secondary">
                        {conflict.recommendation}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* Permission Matrix Overview */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Shield size={18} color="#3B82F6" />
              <Typography variant="subtitle2" fontWeight="600">
                Cross-Role Permission Matrix
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} mb={2}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="caption">✅ Full</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="caption">👀 View</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="caption">❌ None</Typography>
              </Stack>
            </Stack>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.7rem' }}>Module</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.7rem', color: getRoleColor('OPS_ADMIN' as any) }}>Ops</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.7rem', color: getRoleColor('FINANCE_ADMIN' as any) }}>Finance</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.7rem', color: getRoleColor('STRATEGY_ADMIN' as any) }}>Strategy</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.7rem', color: getRoleColor('SUPER_ADMIN' as any) }}>Super</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {permissionMatrix.map((entry) => (
                    <TableRow key={entry.module} hover>
                      <TableCell>
                        <Typography variant="caption" fontWeight="500">
                          {entry.moduleLabel}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={getPermissionLevelIcon(entry.opsAdmin)}
                          size="small"
                          sx={{
                            bgcolor: getPermissionLevelColor(entry.opsAdmin) + '10',
                            fontSize: '0.75rem',
                            height: 24,
                            minWidth: 32,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={getPermissionLevelIcon(entry.financeAdmin)}
                          size="small"
                          sx={{
                            bgcolor: getPermissionLevelColor(entry.financeAdmin) + '10',
                            fontSize: '0.75rem',
                            height: 24,
                            minWidth: 32,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={getPermissionLevelIcon(entry.strategyAdmin)}
                          size="small"
                          sx={{
                            bgcolor: getPermissionLevelColor(entry.strategyAdmin) + '10',
                            fontSize: '0.75rem',
                            height: 24,
                            minWidth: 32,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={getPermissionLevelIcon(entry.superAdmin)}
                          size="small"
                          sx={{
                            bgcolor: getPermissionLevelColor(entry.superAdmin) + '10',
                            fontSize: '0.75rem',
                            height: 24,
                            minWidth: 32,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PermissionConflictRiskPanel;
