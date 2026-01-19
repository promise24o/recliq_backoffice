'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';

import PageContainer from '@/app/components/container/PageContainer';
import WelcomeCard from '@/app/(DashboardLayout)/dashboards/recliq/WelcomeCard';
// RECLIQ Dashboard Components
import TopSummaryCards from '@/app/(DashboardLayout)/dashboards/recliq/TopSummaryCards';
import RevenueVsPayouts from '@/app/(DashboardLayout)/dashboards/recliq/RevenueVsPayouts';
import FinancialSnapshot from '@/app/(DashboardLayout)/dashboards/recliq/FinancialSnapshot';
import OperationsSnapshot from '@/app/(DashboardLayout)/dashboards/recliq/OperationsSnapshot';
import AgentPerformance from '@/app/(DashboardLayout)/dashboards/recliq/AgentPerformance';
import RewardsEngagement from '@/app/(DashboardLayout)/dashboards/recliq/RewardsEngagement';
import EnvironmentalImpact from '@/app/(DashboardLayout)/dashboards/recliq/EnvironmentalImpact';
import ActionRequired from '@/app/(DashboardLayout)/dashboards/recliq/ActionRequired';
import Welcome from "@/app/(DashboardLayout)/layout/shared/welcome/Welcome";

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuthentication = () => {
      try {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');

        if (!token || !user) {
          // No authentication data found, redirect to login
          router.replace('/auth/login');
          return;
        }

        // Optional: Validate token format/user data
        const userData = JSON.parse(user);
        if (!userData || !userData.id) {
          // Invalid user data, clear storage and redirect
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          router.replace('/auth/login');
          return;
        }

        // Authentication is valid
        setIsCheckingAuth(false);
        setLoading(false);
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Clear any corrupted data and redirect
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        router.replace('/auth/login');
      }
    };

    checkAuthentication();
  }, [router]);

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>Authenticating...</Typography>
      </Box>
    );
  }

  return (
    (<PageContainer title="RECLIQ Dashboard" description="Waste Management Platform Overview">
      <Box mt={3}>
        <Grid container spacing={3}>
          {/* Welcome Card - Row 1 */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <WelcomeCard />
            <Box mt={3}>
              <TopSummaryCards />
            </Box>
            <Box mt={3}>
              <RevenueVsPayouts isLoading={isLoading} />
            </Box>
          </Grid>

          {/* Financial Snapshot - Row 1 Side */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <FinancialSnapshot isLoading={isLoading} />
          </Grid>

          {/* Operations Snapshot - Row 2 Side */}
          <Grid size={{ xs: 12, lg: 12 }}>
            <OperationsSnapshot isLoading={isLoading} />
          </Grid>

          {/* Agent Performance - Row 4 */}
          <Grid size={{ xs: 12, lg: 12 }}>
            <AgentPerformance isLoading={isLoading} />
          </Grid>

          {/* Rewards & User Engagement - Row 4 Side */}
          <Grid size={{ xs: 12, lg: 12 }}>
            <RewardsEngagement isLoading={isLoading} />
          </Grid>

          {/* Environmental Impact - Row 5 */}
          <Grid size={{ xs: 12, lg: 12 }}>
            <EnvironmentalImpact isLoading={isLoading} />
          </Grid>

          {/* Action Required - Row 5 Side */}
          <Grid size={{ xs: 12, lg: 12}}>
            <ActionRequired isLoading={isLoading} />
          </Grid>
        </Grid>
        <Welcome />
      </Box>
    </PageContainer>)
  );
}

