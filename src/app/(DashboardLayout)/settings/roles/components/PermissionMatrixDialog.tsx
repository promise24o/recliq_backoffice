'use client';
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  X,
  Download,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
} from 'lucide-react';
import type { PermissionMatrixEntry } from '../types';
import { getPermissionLevelColor, getPermissionLevelIcon } from '../mockData';

interface PermissionMatrixDialogProps {
  open: boolean;
  onClose: () => void;
  permissionMatrix: PermissionMatrixEntry[];
}

const PermissionMatrixDialog: React.FC<PermissionMatrixDialogProps> = ({
  open,
  onClose,
  permissionMatrix,
}) => {
  const getPermissionLevelLabel = (level: string): string => {
    const labels: Record<string, string> = {
      full: 'Full Access',
      view: 'View Only',
      none: 'No Access',
    };
    return labels[level] || level;
  };

  const getPermissionIcon = (level: string) => {
    switch (level) {
      case 'full':
        return <CheckCircle size={14} />;
      case 'view':
        return <Eye size={14} />;
      case 'none':
        return <EyeOff size={14} />;
      default:
        return <EyeOff size={14} />;
    }
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Module', 'Ops Admin', 'Finance Admin', 'Strategy Admin', 'Super Admin'];
    const rows = permissionMatrix.map(row => [
      row.moduleLabel,
      row.opsAdmin,
      row.financeAdmin,
      row.strategyAdmin,
      row.superAdmin,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'permission-matrix.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: '#3B82F615',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Shield size={20} color="#3B82F6" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="600">Permission Matrix</Typography>
              <Typography variant="caption" color="text.secondary">
                Module access levels by admin sub-role
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Export as CSV">
              <IconButton onClick={handleExport} size="small">
                <Download size={18} />
              </IconButton>
            </Tooltip>
            <IconButton onClick={onClose} size="small">
              <X size={18} />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircle size={14} color="#10B981" />
              <Typography variant="caption" color="text.secondary">Full Access</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Eye size={14} color="#3B82F6" />
              <Typography variant="caption" color="text.secondary">View Only</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <EyeOff size={14} color="#EF4444" />
              <Typography variant="caption" color="text.secondary">No Access</Typography>
            </Stack>
          </Stack>
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, minWidth: 200 }}>
                  Module
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', minWidth: 120 }}>
                  Ops Admin
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', minWidth: 120 }}>
                  Finance Admin
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', minWidth: 120 }}>
                  Strategy Admin
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center', minWidth: 120 }}>
                  Super Admin
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissionMatrix.map((row, index) => (
                <TableRow key={row.module} hover>
                  <TableCell sx={{ fontWeight: 500 }}>
                    <Typography variant="body2">{row.moduleLabel}</Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Chip
                      icon={getPermissionIcon(row.opsAdmin)}
                      label={getPermissionLevelLabel(row.opsAdmin)}
                      size="small"
                      sx={{
                        bgcolor: getPermissionLevelColor(row.opsAdmin) + '15',
                        color: getPermissionLevelColor(row.opsAdmin),
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        '& .MuiChip-icon': {
                          color: getPermissionLevelColor(row.opsAdmin),
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Chip
                      icon={getPermissionIcon(row.financeAdmin)}
                      label={getPermissionLevelLabel(row.financeAdmin)}
                      size="small"
                      sx={{
                        bgcolor: getPermissionLevelColor(row.financeAdmin) + '15',
                        color: getPermissionLevelColor(row.financeAdmin),
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        '& .MuiChip-icon': {
                          color: getPermissionLevelColor(row.financeAdmin),
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Chip
                      icon={getPermissionIcon(row.strategyAdmin)}
                      label={getPermissionLevelLabel(row.strategyAdmin)}
                      size="small"
                      sx={{
                        bgcolor: getPermissionLevelColor(row.strategyAdmin) + '15',
                        color: getPermissionLevelColor(row.strategyAdmin),
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        '& .MuiChip-icon': {
                          color: getPermissionLevelColor(row.strategyAdmin),
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Chip
                      icon={getPermissionIcon(row.superAdmin)}
                      label={getPermissionLevelLabel(row.superAdmin)}
                      size="small"
                      sx={{
                        bgcolor: getPermissionLevelColor(row.superAdmin) + '15',
                        color: getPermissionLevelColor(row.superAdmin),
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        '& .MuiChip-icon': {
                          color: getPermissionLevelColor(row.superAdmin),
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, p: 2, bgcolor: '#F9FAFB', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight="600">
            Legend:
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            • <strong>Full Access:</strong> View, create, edit, approve, and override actions<br/>
            • <strong>View Only:</strong> Read access without modification capabilities<br/>
            • <strong>No Access:</strong> Completely restricted from the module
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button
          onClick={handleExport}
          variant="contained"
          color="primary"
          startIcon={<Download size={16} />}
        >
          Export CSV
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionMatrixDialog;
