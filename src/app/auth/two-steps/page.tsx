"use client";
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Link from "next/link";
import AuthTwoSteps from "../authForms/AuthTwoSteps";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TwoSteps() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in first
    const checkExistingAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        
        if (token && user) {
          const userData = JSON.parse(user);
          if (userData && userData.id) {
            // User is already logged in, redirect to dashboard
            router.replace('/');
            return;
          }
        }
      } catch (error) {
        // Clear corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    };

    // Check existing authentication first
    checkExistingAuth();

    // Then check for email in sessionStorage for OTP flow
    const email = sessionStorage.getItem('userEmail');
    
    if (!email) {
      // No email found, redirect to login page
      router.replace('/auth/login');
      return;
    }

    // Mask email for display
    const maskedEmail = email.replace(/(.{2}).*(@.*)/, "$1***$2");
    setUserEmail(maskedEmail);
    setIsLoading(false);
  }, [router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    (<PageContainer title="Two steps Page" description="this is Sample page">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ overflowX: "hidden" }}
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
            lg: 8,
            xl: 9
          }}>
          <Box position="relative">
            <Box px={3} py={2}>
              <Link href="/">
                <Image
                  src="/images/logos/logo-v4.png"
                  alt="RecliQ Logo"
                  width={180}
                  height={70}
                  priority
                />
              </Link>
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
            lg: 4,
            xl: 3
          }}>
          <Box p={4}>
            <Typography variant="h4" fontWeight="700">
              Two Step Verification
            </Typography>

            <Typography variant="subtitle1" color="textSecondary" mt={2} mb={1}>
              We sent a verification code to your email. Enter the code from
              the email in the field below.
            </Typography>
            <Typography variant="subtitle1" fontWeight="700" mb={1}>
              {userEmail || "Loading..."}
            </Typography>
            <AuthTwoSteps />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>)
  );
}
