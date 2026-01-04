import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Stack,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  FormGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import Link from "next/link";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import { useLogin } from "@/hooks/useAuth";

interface loginType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const login = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      setShowError(true);
      return;
    }

    login.mutate(
      { identifier: email, password },
      {
        onSuccess: (data) => {
          // Check if login was successful and OTP is required
          // If we get a successful response (not an error), it means OTP was sent
          if (data.message && data.identifier) {
            router.push('/auth/two-steps');
          } else {
            // Handle unexpected response
            setError("Unexpected response from server");
            setShowError(true);
          }
        },
        onError: (err: any) => {
          let errorMessage = "An error occurred during login";
          
          if (err.response) {
            // Use the actual error message from the API response
            errorMessage = err.response.data?.message || "Login failed. Please try again.";
          } else if (err.request) {
            errorMessage = "Network error. Please check your connection.";
          }
          
          setError(errorMessage);
          setShowError(true);
        }
      }
    );
  };

  const handleCloseError = () => {
    setShowError(false);
    setError("");
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      {/* <AuthSocialButtons title="Sign in with" /> */}
      {/* <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box> */}

      <form onSubmit={handleLogin}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="username">Email Address</CustomFormLabel>
            <CustomTextField 
              id="username" 
              variant="outlined" 
              fullWidth 
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              disabled={login.isPending}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              disabled={login.isPending}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={login.isPending}
          >
            {login.isPending ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
      </form>
      {subtitle}

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
    </>
  );
};

export default AuthLogin;
