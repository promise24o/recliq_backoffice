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
  Avatar,
} from '@mui/material';

// Wallet summary card skeleton
export const WalletSummaryCardSkeleton = () => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Skeleton variant="circular" width={48} height={48} />
        <Box flex={1}>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

// Wallet stats grid skeleton
export const WalletStatsGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, index) => (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
        <WalletSummaryCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

// Wallet table row skeleton
export const WalletTableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="circular" width={40} height={40} />
        <Box>
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={100} height={16} sx={{ mt: 0.5 }} />
        </Box>
      </Stack>
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={80} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={90} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={80} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={80} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={80} height={20} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={60} height={20} />
    </TableCell>
  </TableRow>
);

// Multiple wallet table rows skeleton
export const WalletTableRowsSkeleton = ({ count = 10 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <WalletTableRowSkeleton key={index} />
    ))}
  </>
);

// Wallet search results skeleton
export const WalletSearchSkeleton = () => (
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

// Wallet detail skeleton
export const WalletDetailSkeleton = () => (
  <Stack spacing={3}>
    <Box>
      <Skeleton variant="text" width={200} height={32} />
      <Skeleton variant="text" width={300} height={20} sx={{ mt: 1 }} />
    </Box>
    
    <Grid container spacing={3}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6 }} key={index}>
          <Paper sx={{ p: 2 }}>
            <Skeleton variant="text" width={120} height={16} />
            <Skeleton variant="text" width={100} height={24} sx={{ mt: 1 }} />
          </Paper>
        </Grid>
      ))}
    </Grid>
    
    <Paper sx={{ p: 2 }}>
      <Skeleton variant="text" width={150} height={20} />
      <Box sx={{ mt: 2 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Box key={index} sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Stack spacing={1}>
              <Skeleton variant="text" width={100} height={16} />
              <Skeleton variant="text" width={80} height={14} />
            </Stack>
          </Box>
        ))}
      </Box>
    </Paper>
  </Stack>
);
