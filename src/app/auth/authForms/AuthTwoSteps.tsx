"use client";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import Link from "next/link";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useVerifyOtp, useResendOtp } from "@/hooks/useAuth";

const AuthTwoSteps = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const verifyOtp = useVerifyOtp();
  const resendOtp = useResendOtp();

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  useEffect(() => {
    // Handle countdown timer
    let interval: NodeJS.Timeout;
    
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendTimer]);

  const handleCloseError = () => {
    setShowError(false);
    setError("");
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSuccessMessage("");
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move to next input if current is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (/^\d{1,6}$/.test(pastedData)) {
      const newOtpValues = [...otpValues];
      pastedData.split("").forEach((digit, index) => {
        newOtpValues[index] = digit;
      });
      setOtpValues(newOtpValues);
      
      // Focus on the next empty input or last one
      const nextEmptyIndex = newOtpValues.findIndex(val => val === "");
      if (nextEmptyIndex === -1) {
        inputRefs.current[5]?.focus();
      } else {
        inputRefs.current[nextEmptyIndex]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const otp = otpValues.join("");
    
    if (otp.length !== 6) {
      setError("Please enter all 6 digits");
      setShowError(true);
      return;
    }

    const email = sessionStorage.getItem('userEmail');
    if (!email) {
      setError("Email not found. Please login again.");
      setShowError(true);
      return;
    }

    verifyOtp.mutate(
      { identifier: email, otp: otp },
      {
        onSuccess: (data) => {
          router.push('/');
        },
        onError: (err: any) => {
          let errorMessage = "Verification failed";
          
          if (err.response) {
            // Use the actual error message from the API response
            errorMessage = err.response.data?.message || "Verification failed";
          } else if (err.request) {
            errorMessage = "Network error. Please check your connection.";
          }
          
          setError(errorMessage);
          setShowError(true);
        }
      }
    );
  };

  const handleResend = () => {
    const email = sessionStorage.getItem('userEmail');
    if (!email) {
      setError("Email not found. Please login again.");
      setShowError(true);
      return;
    }

    resendOtp.mutate(email, {
      onSuccess: (data) => {
        setSuccessMessage("OTP sent successfully!");
        setShowSuccess(true);
        setResendTimer(60); // Start 60 second countdown
      },
      onError: (err: any) => {
          let errorMessage = "Failed to resend OTP";
          
          if (err.response) {
            // Use the actual error message from the API response
            errorMessage = err.response.data?.message || "Failed to resend OTP";
          } else if (err.request) {
            errorMessage = "Network error. Please check your connection.";
          }
          
          setError(errorMessage);
          setShowError(true);
        }
    });
  };

  return (
    <>
      <Box mt={4}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="code">
            Type your 6 digits security code{" "}
          </CustomFormLabel>
          <Stack spacing={2} direction="row">
            {otpValues.map((value, index) => (
              <CustomTextField
                key={index}
                id={`code-${index}`}
                variant="outlined"
                fullWidth
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                inputRef={(el: HTMLInputElement | null) => (inputRefs.current[index] = el)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: 'center', fontSize: '24px', fontWeight: 'bold' },
                }}
                disabled={verifyOtp.isPending}
              />
            ))}
          </Stack>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleVerify}
          disabled={verifyOtp.isPending}
        >
          {verifyOtp.isPending ? "Verifying..." : "Verify My Account"}
        </Button>

        <Stack direction="row" spacing={1} mt={3} alignItems="center">
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            Didn&apos;t get the code?
          </Typography>
          <Button
            onClick={handleResend}
            disabled={resendOtp.isPending || resendTimer > 0}
            sx={{
              textTransform: 'none',
              textDecoration: "none",
              color: resendTimer > 0 ? "text.secondary" : "primary.main",
              minWidth: 'auto',
              px: 1,
              py: 0.5,
              
            }}
          >
            {resendOtp.isPending 
              ? "Sending..." 
              : resendTimer > 0 
                ? `Resend (${resendTimer}s)` 
                : "Resend"
            }
          </Button>
        </Stack>
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthTwoSteps;
