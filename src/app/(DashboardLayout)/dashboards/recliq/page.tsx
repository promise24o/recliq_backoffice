"use client"
import React from 'react';
import { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';

import WelcomeCard from './WelcomeCard';
// RECLIQ Dashboard Components
import TopSummaryCards from './TopSummaryCards';
import RevenueVsPayouts from './RevenueVsPayouts';
import FinancialSnapshot from './FinancialSnapshot';
import OperationsSnapshot from './OperationsSnapshot';
import AgentPerformance from './AgentPerformance';
import RewardsEngagement from './RewardsEngagement';
import EnvironmentalImpact from './EnvironmentalImpact';
import ActionRequired from './ActionRequired';

const RecliqDashboard = () => {

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="RECLIQ Dashboard" description="Waste Management Platform Overview">
      <Box mt={3}>
        <Grid container spacing={3}>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 8
            }}>
            <WelcomeCard />
          </Grid>

          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
            <Grid container spacing={3}>
              <Grid
                size={{
                  xs: 12,
                  sm: 6
                }}>
                <FinancialSnapshot isLoading={isLoading} />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6
                }}>
                <ActionRequired isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
          
          {/* Top Summary Cards - Full Width */}
          <Grid size={{ xs: 12, lg: 12 }}>
            <TopSummaryCards />
          </Grid>
          
          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 4
            }}>
            <RevenueVsPayouts isLoading={isLoading} />
          </Grid>
          
          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 4
            }}>
            <OperationsSnapshot isLoading={isLoading} />
          </Grid>
          
          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 4
            }}>
            <Grid container spacing={3}>
              <Grid
                size={{
                  xs: 12,
                  sm: 6
                }}>
                <RewardsEngagement isLoading={isLoading} />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6
                }}>
                <EnvironmentalImpact isLoading={isLoading} />
              </Grid>
              <Grid size={12}>
                <AgentPerformance isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
          
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 8
            }}>
            <AgentPerformance isLoading={isLoading} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default RecliqDashboard;
