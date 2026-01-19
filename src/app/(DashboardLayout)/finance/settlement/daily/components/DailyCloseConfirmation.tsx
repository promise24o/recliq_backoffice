'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Card, CardContent, Button, Checkbox, FormControlLabel, Alert, AlertTitle, Divider, Chip } from '@mui/material';
import { 
  IconLock,
  IconCheck,
  IconAlertTriangle,
  IconUser,
  IconCalendar,
  IconClock,
  IconCurrencyNaira,
  IconFileDescription
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface DailyCloseConfirmationProps {
  onCloseDay: () => void;
}

const DailyCloseConfirmation: React.FC<DailyCloseConfirmationProps> = ({ onCloseDay }) => {
  const [checkedItems, setCheckedItems] = useState({
    varianceZero: false,
    allMatched: false,
    exceptionsResolved: false,
    reportsGenerated: false,
    backupComplete: false
  });

  const [isClosing, setIsClosing] = useState(false);

  // Mock reconciliation summary
  const reconciliationSummary = {
    totalTransactions: 1248,
    matchedTransactions: 1236,
    variance: 0,
    exceptionsResolved: 5,
    reportsGenerated: true,
    backupComplete: true,
    closedBy: 'Finance Admin',
    timestamp: new Date().toISOString()
  };

  const handleCheckboxChange = (item: keyof typeof checkedItems) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleCloseDay = () => {
    setIsClosing(true);
    // Simulate closing process
    setTimeout(() => {
      setIsClosing(false);
      onCloseDay();
    }, 2000);
  };

  const allItemsChecked = Object.values(checkedItems).every(checked => checked);

  return (
    <DashboardCard title="Daily Close Confirmation">
      <Box sx={{ width: '100%' }}>
        {/* Success Alert */}
        <Alert 
          severity="success" 
          variant="outlined"
          sx={{ mb: 3 }}
          icon={<IconCheck size={20} />}
        >
          <AlertTitle sx={{ fontWeight: 600 }}>
            Ready to Close Day
          </AlertTitle>
          <Typography variant="body2">
            All reconciliation checks passed. Day can be safely closed.
          </Typography>
        </Alert>

        {/* Reconciliation Summary */}
        <Card sx={{ mb: 3, border: '1px solid', borderColor: 'success.light' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="success.main">
              Reconciliation Summary
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Total Transactions</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {reconciliationSummary.totalTransactions.toLocaleString()}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Matched Transactions</Typography>
                <Typography variant="body2" fontWeight={600} color="success.main">
                  {reconciliationSummary.matchedTransactions.toLocaleString()}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Total Variance</Typography>
                <Typography variant="body2" fontWeight={600} color={reconciliationSummary.variance === 0 ? 'success.main' : 'error.main'}>
                  ₦{reconciliationSummary.variance.toLocaleString()}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Exceptions Resolved</Typography>
                <Typography variant="body2" fontWeight={600} color="success.main">
                  {reconciliationSummary.exceptionsResolved}
                </Typography>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Success Rate</Typography>
                <Chip
                  size="small"
                  label={`${((reconciliationSummary.matchedTransactions / reconciliationSummary.totalTransactions) * 100).toFixed(1)}%`}
                  color="success"
                  variant="outlined"
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Reconciliation Checklist */}
        <Card sx={{ mb: 3, border: '1px solid', borderColor: 'divider' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Reconciliation Checklist
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please confirm all items before closing the day:
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.varianceZero}
                    onChange={() => handleCheckboxChange('varianceZero')}
                    color="success"
                  />
                }
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconCurrencyNaira size={16} />
                    <Typography variant="body2">
                      Variance is zero (₦{reconciliationSummary.variance.toLocaleString()})
                    </Typography>
                  </Stack>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.allMatched}
                    onChange={() => handleCheckboxChange('allMatched')}
                    color="success"
                  />
                }
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconCheck size={16} />
                    <Typography variant="body2">
                      All transactions matched ({reconciliationSummary.matchedTransactions}/{reconciliationSummary.totalTransactions})
                    </Typography>
                  </Stack>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.exceptionsResolved}
                    onChange={() => handleCheckboxChange('exceptionsResolved')}
                    color="success"
                  />
                }
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconAlertTriangle size={16} />
                    <Typography variant="body2">
                      All exceptions resolved ({reconciliationSummary.exceptionsResolved} items)
                    </Typography>
                  </Stack>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.reportsGenerated}
                    onChange={() => handleCheckboxChange('reportsGenerated')}
                    color="success"
                  />
                }
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconFileDescription size={16} />
                    <Typography variant="body2">
                      Daily reports generated and archived
                    </Typography>
                  </Stack>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.backupComplete}
                    onChange={() => handleCheckboxChange('backupComplete')}
                    color="success"
                  />
                }
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconLock size={16} />
                    <Typography variant="body2">
                      Data backup completed successfully
                    </Typography>
                  </Stack>
                }
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Closing Information */}
        <Card sx={{ mb: 3, border: '1px solid', borderColor: 'info.light' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="info.main">
              Closing Information
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconUser size={16} />
                <Typography variant="body2">
                  <strong>Day Closed By:</strong> {reconciliationSummary.closedBy}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconCalendar size={16} />
                <Typography variant="body2">
                  <strong>Date:</strong> {new Date().toLocaleDateString()}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconClock size={16} />
                <Typography variant="body2">
                  <strong>Time:</strong> {new Date().toLocaleTimeString()}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Warning Alert */}
        {!allItemsChecked && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            <AlertTitle>Checklist Incomplete</AlertTitle>
            <Typography variant="body2">
              Please complete all checklist items before closing the day.
            </Typography>
          </Alert>
        )}

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="success"
            startIcon={<IconLock size={16} />}
            onClick={handleCloseDay}
            disabled={!allItemsChecked || isClosing}
            size="large"
            sx={{ minWidth: 200 }}
          >
            {isClosing ? 'Closing Day...' : 'Close Day'}
          </Button>
          <Button
            variant="outlined"
            disabled={isClosing}
            size="large"
          >
            Cancel
          </Button>
        </Stack>

        {/* Final Warning */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center', display: 'block' }}>
            ⚠️ Once the day is closed, all records become immutable and cannot be modified without audit authorization.
            This action is irreversible and will be logged in the system audit trail.
          </Typography>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default DailyCloseConfirmation;
