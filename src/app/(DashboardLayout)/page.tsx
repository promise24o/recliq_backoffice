'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';

import PageContainer from '@/app/components/container/PageContainer';
// components
import YearlyBreakup from '@/app/components/dashboards/modern/YearlyBreakup';
import MonthlyEarnings from '@/app/components/dashboards/modern/MonthlyEarnings';
import TopCards from '@/app/components/dashboards/modern/TopCards';
import RevenueUpdates from '@/app/components/dashboards/modern/RevenueUpdates';
import EmployeeSalary from '@/app/components/dashboards/modern/EmployeeSalary';
import Customers from '@/app/components/dashboards/modern/Customers';
import Projects from '@/app/components/dashboards/modern/Projects';
import Social from '@/app/components/dashboards/modern/Social';
import SellingProducts from '@/app/components/dashboards/modern/SellingProducts';
import WeeklyStats from '@/app/components/dashboards/modern/WeeklyStats';
import TopPerformers from '@/app/components/dashboards/modern/TopPerformers';
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
    (<PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 12
            }}>
            <TopCards />
          </Grid>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 8
            }}>
            <RevenueUpdates isLoading={isLoading} />
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
                  sm: 6,
                  lg: 12
                }}>
                <YearlyBreakup isLoading={isLoading} />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 12
                }}>
                <MonthlyEarnings isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
            <EmployeeSalary isLoading={isLoading} />
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
                <Customers isLoading={isLoading} />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 6
                }}>
                <Projects isLoading={isLoading} />
              </Grid>
              <Grid size={12}>
                <Social />
              </Grid>
            </Grid>
          </Grid>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
            <SellingProducts />
          </Grid>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
            <WeeklyStats isLoading={isLoading} />
          </Grid>
          {/* column */}
          <Grid
            size={{
              xs: 12,
              lg: 8
            }}>
            <TopPerformers />
          </Grid>
        </Grid>
        <Welcome />
      </Box>
    </PageContainer>)
  );
}

