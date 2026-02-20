'use client';
import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Stack,
  Typography,
  Skeleton,
  Table,
  TableCell,
  TableRow,
} from '@mui/material';

// KYC stats card skeleton
export const KYCStatsCardSkeleton = () => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Skeleton variant="circular" width={48} height={48} />
        <Box flex={1}>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mt: 0.5 }} />
          <Skeleton variant="text" width="80%" height={32} sx={{ mt: 1 }} />
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

// KYC table row skeleton
export const KYCTableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="circular" width={40} height={40} />
        <Box>
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={80} height={16} />
        </Box>
      </Stack>
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={80} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="circular" width={24} height={24} />
    </TableCell>
  </TableRow>
);

// Multiple KYC table rows skeleton
export const KYCTableRowsSkeleton = ({ count = 10 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <KYCTableRowSkeleton key={index} />
    ))}
  </>
);

// KYC search results skeleton
export const KYCSearchSkeleton = () => (
  <>
    {Array.from({ length: 3 }).map((_, index) => (
      <Box key={index} sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack spacing={1}>
          <Skeleton variant="text" width={150} height={20} />
          <Skeleton variant="text" width={200} height={16} />
        </Stack>
      </Box>
    ))}
  </>
);

// KYC stats grid skeleton
export const KYCStatsGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, index) => (
      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
        <KYCStatsCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

// KYC detail card skeleton
export const KYCDetailCardSkeleton = () => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="circular" width={56} height={56} />
            <Box>
              <Skeleton variant="text" width={150} height={20} />
              <Skeleton variant="text" width={100} height={16} />
            </Box>
          </Stack>
          <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 1 }} />
        </Stack>
        <Stack spacing={1}>
          <Skeleton variant="text" width="40%" height={16} />
          <Skeleton variant="text" width="60%" height={16} />
          <Skeleton variant="text" width="50%" height={16} />
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

// KYC verification checklist skeleton
export const KYCChecklistSkeleton = () => (
  <Paper sx={{ p: 3, mb: 2 }}>
    <Stack spacing={2}>
      <Skeleton variant="text" width="30%" height={24} />
      {Array.from({ length: 6 }).map((_, index) => (
        <Stack key={index} direction="row" spacing={2} alignItems="center">
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width="80%" height={16} />
        </Stack>
      ))}
    </Stack>
  </Paper>
);
