'use client';
import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Skeleton,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
} from '@mui/material';

// User header skeleton
export const UserHeaderSkeleton = () => (
  <Card>
    <CardContent>
      <Stack direction="row" spacing={3} alignItems="center">
        <Skeleton variant="circular" width={64} height={64} />
        <Box flex={1}>
          <Skeleton variant="text" width={200} height={32} />
          <Stack direction="row" spacing={2} mt={1}>
            <Skeleton variant="text" width={150} height={20} />
            <Skeleton variant="text" width={120} height={20} />
          </Stack>
          <Stack direction="row" spacing={1} mt={1}>
            <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
          </Stack>
        </Box>
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>
    </CardContent>
  </Card>
);

// Financial metrics card skeleton
export const FinancialMetricCardSkeleton = () => (
  <Card>
    <CardContent>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={120} height={16} />
        </Stack>
        <Skeleton variant="text" width={100} height={32} />
      </Stack>
    </CardContent>
  </Card>
);

// Financial metrics grid skeleton
export const FinancialMetricsGridSkeleton = () => (
  <Grid container spacing={3}>
    {Array.from({ length: 4 }).map((_, index) => (
      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
        <FinancialMetricCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

// Filters skeleton
export const FiltersSkeleton = () => (
  <Card>
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
      </Stack>
    </CardContent>
  </Card>
);

// Transaction table row skeleton
export const TransactionTableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Skeleton variant="circular" width={16} height={16} />
        <Skeleton variant="text" width={60} height={16} />
      </Stack>
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={120} height={16} />
    </TableCell>
    <TableCell>
      <Box>
        <Skeleton variant="text" width={150} height={16} />
        <Skeleton variant="text" width={80} height={12} sx={{ mt: 0.5 }} />
      </Box>
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={80} height={16} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} height={16} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={80} height={16} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rectangular" width={60} height={20} sx={{ borderRadius: 1 }} />
    </TableCell>
  </TableRow>
);

// Transaction table skeleton
export const TransactionTableSkeleton = ({ rows = 10 }: { rows?: number }) => (
  <Card>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Skeleton variant="text" width={200} height={24} />
        <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
      </Stack>

      <Box sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Skeleton variant="text" width={40} height={16} /></TableCell>
              <TableCell><Skeleton variant="text" width={40} height={16} /></TableCell>
              <TableCell><Skeleton variant="text" width={80} height={16} /></TableCell>
              <TableCell><Skeleton variant="text" width={60} height={16} /></TableCell>
              <TableCell><Skeleton variant="text" width={100} height={16} /></TableCell>
              <TableCell><Skeleton variant="text" width={80} height={16} /></TableCell>
              <TableCell><Skeleton variant="text" width={60} height={16} /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TransactionTableRowSkeleton key={index} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </CardContent>
  </Card>
);

// Complete page skeleton
export const FinancePageSkeleton = () => (
  <Stack spacing={3}>
    <UserHeaderSkeleton />
    <FinancialMetricsGridSkeleton />
    <FiltersSkeleton />
    <TransactionTableSkeleton />
  </Stack>
);
