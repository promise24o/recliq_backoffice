'use client';
import React from 'react';
import {
  Box,
  Skeleton,
  Stack,
  Paper,
  Grid,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from '@mui/material';

// Card skeleton for summary cards
export const SummaryCardSkeleton = () => (
  <Paper sx={{ p: 2.5 }}>
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Skeleton variant="circular" width={40} height={40} />
      <Box flex={1}>
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={16} sx={{ mt: 0.5 }} />
        <Skeleton variant="text" width="80%" height={24} sx={{ mt: 1 }} />
      </Box>
    </Stack>
  </Paper>
);

// Table row skeleton - returns array of table cells for proper HTML structure
export const TableRowSkeleton = () => {
  return (
    <>
      <TableCell><Skeleton variant="text" width={120} height={20} /></TableCell>
      <TableCell><Skeleton variant="text" width={100} height={20} /></TableCell>
      <TableCell><Skeleton variant="text" width={80} height={20} /></TableCell>
      <TableCell><Skeleton variant="text" width={120} height={20} /></TableCell>
      <TableCell><Skeleton variant="text" width={60} height={20} /></TableCell>
      <TableCell><Skeleton variant="text" width={100} height={20} /></TableCell>
      <TableCell><Skeleton variant="text" width={80} height={20} /></TableCell>
      <TableCell><Skeleton variant="circular" width={24} height={24} /></TableCell>
    </>
  );
};

// Timeline item skeleton
export const TimelineItemSkeleton = () => (
  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
    <Skeleton variant="circular" width={32} height={32} />
    <Box flex={1}>
      <Skeleton variant="text" width="70%" height={20} />
      <Skeleton variant="text" width="50%" height={16} sx={{ mt: 0.5 }} />
      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 1, borderRadius: 1 }} />
    </Box>
  </Stack>
);

// Security signal skeleton
export const SecuritySignalSkeleton = () => (
  <Paper sx={{ p: 2.5, mb: 2 }}>
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Skeleton variant="circular" width={32} height={32} />
      <Box flex={1}>
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="80%" height={16} sx={{ mt: 0.5 }} />
        <Skeleton variant="text" width="40%" height={14} sx={{ mt: 1 }} />
      </Box>
      <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 1 }} />
    </Stack>
  </Paper>
);

// Activity detail drawer skeleton
export const ActivityDetailSkeleton = () => (
  <Box sx={{ p: 3, minWidth: 400 }}>
    <Stack spacing={3}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Skeleton variant="text" width="40%" height={24} />
        <Skeleton variant="circular" width={32} height={32} />
      </Stack>
      
      {/* Main content */}
      <Stack spacing={2}>
        <Skeleton variant="text" width="70%" height={20} />
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="90%" height={16} />
      </Stack>
      
      {/* Metadata */}
      <Stack spacing={2}>
        <Skeleton variant="rectangular" width="100%" height={1} />
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" width={80} height={16} />
          <Skeleton variant="text" width={120} height={16} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" width={60} height={16} />
          <Skeleton variant="text" width={100} height={16} />
        </Stack>
      </Stack>
    </Stack>
  </Box>
);

// Grid of summary cards skeleton
export const SummaryGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, index) => (
      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
        <SummaryCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

// Multiple table rows skeleton
export const TableRowsSkeleton = ({ count = 5 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <TableRow key={index}>
        <TableCell><Skeleton variant="text" width={120} height={20} /></TableCell>
        <TableCell><Skeleton variant="text" width={100} height={20} /></TableCell>
        <TableCell><Skeleton variant="text" width={80} height={20} /></TableCell>
        <TableCell><Skeleton variant="text" width={120} height={20} /></TableCell>
        <TableCell><Skeleton variant="text" width={60} height={20} /></TableCell>
        <TableCell><Skeleton variant="text" width={100} height={20} /></TableCell>
        <TableCell><Skeleton variant="text" width={80} height={20} /></TableCell>
        <TableCell><Skeleton variant="circular" width={24} height={24} /></TableCell>
      </TableRow>
    ))}
  </>
);

// Multiple timeline items skeleton
export const TimelineSkeleton = ({ count = 3 }: { count?: number }) => (
  <Stack>
    {Array.from({ length: count }).map((_, index) => (
      <TimelineItemSkeleton key={index} />
    ))}
  </Stack>
);

// Multiple security signals skeleton
export const SecuritySignalsSkeleton = ({ count = 3 }: { count?: number }) => (
  <Stack>
    {Array.from({ length: count }).map((_, index) => (
      <SecuritySignalSkeleton key={index} />
    ))}
  </Stack>
);
