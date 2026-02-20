'use client';
import React from 'react';
import {
  Box,
  Skeleton,
  Stack,
  Paper,
  Grid,
  Card,
  CardContent,
  TableRow,
  TableCell,
} from '@mui/material';

// User summary card skeleton
export const UserSummaryCardSkeleton = () => (
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

// User table row skeleton
export const UserTableRowSkeleton = () => (
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
      <Stack spacing={0.5}>
        <Skeleton variant="text" width={150} height={16} />
        <Skeleton variant="text" width={120} height={16} />
      </Stack>
    </TableCell>
    <TableCell>
      <Stack spacing={0.5}>
        <Skeleton variant="text" width={100} height={16} />
        <Skeleton variant="text" width={80} height={14} />
      </Stack>
    </TableCell>
    <TableCell>
      <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={60} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={80} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="circular" width={24} height={24} />
    </TableCell>
  </TableRow>
);

// User detail card skeleton
export const UserDetailCardSkeleton = () => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="circular" width={56} height={56} />
            <Box>
              <Skeleton variant="text" width={150} height={24} />
              <Skeleton variant="text" width={100} height={16} sx={{ mt: 0.5 }} />
            </Box>
          </Stack>
          <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 1 }} />
        </Stack>
        <Stack direction="row" spacing={3}>
          <Box flex={1}>
            <Skeleton variant="text" width={80} height={16} />
            <Skeleton variant="text" width={120} height={20} sx={{ mt: 0.5 }} />
          </Box>
          <Box flex={1}>
            <Skeleton variant="text" width={80} height={16} />
            <Skeleton variant="text" width={100} height={20} sx={{ mt: 0.5 }} />
          </Box>
          <Box flex={1}>
            <Skeleton variant="text" width={80} height={16} />
            <Skeleton variant="text" width={90} height={20} sx={{ mt: 0.5 }} />
          </Box>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

// Grid of user summary cards skeleton
export const UserSummaryGridSkeleton = ({ count = 5 }: { count?: number }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, index) => (
      <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={index}>
        <UserSummaryCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

// Multiple user table rows skeleton
export const UserTableRowsSkeleton = ({ count = 10 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <UserTableRowSkeleton key={index} />
    ))}
  </>
);

// User stats skeleton
export const UserStatsSkeleton = () => (
  <Paper sx={{ p: 3 }}>
    <Stack spacing={3}>
      <Skeleton variant="text" width="40%" height={28} />
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Stack spacing={1}>
              <Skeleton variant="text" width={60} height={16} />
              <Skeleton variant="text" width={80} height={24} />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  </Paper>
);

// User search skeleton
export const UserSearchSkeleton = () => (
  <Paper sx={{ p: 2, mb: 3 }}>
    <Stack spacing={2}>
      <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
      <Stack direction="row" spacing={2}>
        <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 1 }} />
      </Stack>
    </Stack>
  </Paper>
);
