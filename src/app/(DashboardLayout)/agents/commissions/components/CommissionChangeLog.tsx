'use client'
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from '@mui/material';
import {
  IconHistory,
  IconUser,
  IconEdit,
  IconTrendingUp,
  IconTrendingDown,
  IconCalendar,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface CommissionChange {
  id: string;
  changedBy: string;
  ruleId: string;
  ruleName: string;
  oldValue: string;
  newValue: string;
  changeDate: string;
  reason: string;
}

interface CommissionChangeLogProps {
  changes: CommissionChange[];
}

const ChangeTypeChip: React.FC<{ oldValue: string; newValue: string }> = ({ oldValue, newValue }) => {
  const isIncrease = () => {
    // Simple logic to determine if it's an increase
    const oldNum = parseFloat(oldValue.replace(/[^0-9.]/g, ''));
    const newNum = parseFloat(newValue.replace(/[^0-9.]/g, ''));
    return newNum > oldNum;
  };

  const isDecrease = () => {
    const oldNum = parseFloat(oldValue.replace(/[^0-9.]/g, ''));
    const newNum = parseFloat(newValue.replace(/[^0-9.]/g, ''));
    return newNum < oldNum;
  };

  if (isIncrease()) {
    return (
      <Chip
        color="success"
        icon={<IconTrendingUp size={14} />}
        label="Increase"
        size="small"
        variant="outlined"
      />
    );
  }

  if (isDecrease()) {
    return (
      <Chip
        color="error"
        icon={<IconTrendingDown size={14} />}
        label="Decrease"
        size="small"
        variant="outlined"
      />
    );
  }

  return (
    <Chip
      color="info"
      icon={<IconEdit size={14} />}
      label="Modified"
      size="small"
        variant="outlined"
    />
  );
};

const CommissionChangeLog: React.FC<CommissionChangeLogProps> = ({ changes }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getChangeType = (oldValue: string, newValue: string) => {
    // Determine if it's a rate change, scope change, etc.
    if (oldValue.includes('%') || newValue.includes('%')) {
      return 'Rate Change';
    }
    if (oldValue.includes('KES') || newValue.includes('KES')) {
      return 'Amount Change';
    }
    return 'Configuration Change';
  };

  return (
    <DashboardCard title="Commission Change Log (Audit)">
      <Box sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconHistory size={20} color="grey" />
          <Typography variant="body2" color="text.secondary">
            Immutable audit trail of all commission changes for compliance and dispute resolution
          </Typography>
        </Stack>
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Changed By</TableCell>
              <TableCell>Rule</TableCell>
              <TableCell>Change Type</TableCell>
              <TableCell>Old Value</TableCell>
              <TableCell>New Value</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {changes.map((change) => (
              <TableRow key={change.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      <IconUser size={18} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {change.changedBy}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {change.ruleName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {change.ruleId}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      {getChangeType(change.oldValue, change.newValue)}
                    </Typography>
                    <ChangeTypeChip oldValue={change.oldValue} newValue={change.newValue} />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="error.main" fontWeight={500}>
                    {change.oldValue}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="success.main" fontWeight={500}>
                    {change.newValue}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconCalendar size={14} />
                      <Typography variant="body2">
                        {formatDate(change.changeDate)}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200 }}>
                    {change.reason}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {changes.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <IconHistory size={48} color="grey" />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            No changes recorded yet
          </Typography>
          <Typography variant="caption" color="text.secondary">
            All commission modifications will appear here
          </Typography>
        </Box>
      )}

      {/* Compliance Notice */}
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconHistory size={16} color="warning.main" />
          <Typography variant="caption" color="text.secondary">
            <strong>Compliance Notice:</strong> This audit log is immutable and required for financial audits, dispute resolution, and regulatory compliance.
          </Typography>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default CommissionChangeLog;
