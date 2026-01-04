"use client";
import Link from "next/link";
import { Grid, Box, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../authForms/AuthLogin";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useIsAuthenticated } from "@/hooks/useAuth";

export default function Login() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useIsAuthenticated();

  useEffect(() => {
    // Check if user is already logged in
    if (isLoading) return;
    
    if (isAuthenticated) {
      // User is already logged in, redirect to dashboard
      router.replace('/');
      return;
    }

    // User is not logged in, allow access to login page
    setIsCheckingAuth(false);
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isCheckingAuth || isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>Checking authentication...</Typography>
      </Box>
    );
  }
  return (
    (<PageContainer title="Login Backoffice" description="RecliQ Admin Dashboard">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
          size={{
            xs: 12,
            sm: 12,
            lg: 7,
            xl: 8
          }}>
          <Box position="relative">
            <Box px={3} py={2}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={"calc(100vh - 75px)"}
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
              }}
            >
              <Image
                src={"/images/backgrounds/login-bg.svg"}
                alt="bg"
                width={500}
                height={500}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  maxHeight: "500px",
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          size={{
            xs: 12,
            sm: 12,
            lg: 5,
            xl: 4
          }}>
          <Box p={4}>
            <AuthLogin
              title="Welcome to RecliQ"
              subtext={
                <Typography variant="subtitle1" color="textSecondary" mb={1}>
                  Your Admin Dashboard
                </Typography>
              }
              subtitle={
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="500"
                  >
                    Enter your Login Details to access RecliQ backoffice
                  </Typography>
                   
                </Stack>
              }
            />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>)
  );
}
