"use client";
import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import { IconArrowUpRight, IconLeaf, IconRecycle } from "@tabler/icons-react";
import Image from "next/image";
import { useUser, getUserDisplayName, getUserPhoto } from '@/hooks/useAuth';

const WelcomeCard = () => {
  const { data: user, isLoading } = useUser();
  const displayName = getUserDisplayName(user || null);
  const userPhoto = getUserPhoto(user || null);
  return (
    (<Card
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        py: 0,
        position: "relative",
      }}
    >
      <CardContent sx={{ py: 4, px: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid
            display="flex"
            alignItems="center"
            size={{
              sm: 6
            }}>
            <Box>
              <Box
                gap="16px"
                mb={5}
                sx={{
                  display: {
                    xs: "block",
                    sm: "flex",
                  },
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={userPhoto}
                  alt={displayName}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography variant="h5" whiteSpace="nowrap">
                  Welcome back{displayName ? `, ${displayName}` : ''} to RECLIQ!
                </Typography>
              </Box>

              <Stack mt={8}
                spacing={2}
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Box>
                  <Typography variant="h2" whiteSpace="nowrap">
                    ₦45,280{" "}
                    <span>
                      <IconArrowUpRight width={18} color="#39B69A" />
                    </span>
                  </Typography>
                  <Typography variant="subtitle1" whiteSpace="nowrap">
                    Today’s Revenue
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h2" whiteSpace="nowrap">
                    89%
                    <span>
                      <IconArrowUpRight width={18} color="#39B69A" />
                    </span>
                  </Typography>
                  <Typography variant="subtitle1" whiteSpace="nowrap">
                    Collection Rate
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid
            size={{
              sm: 6
            }}>
            <Box
              sx={{
                width: "340px",
                height: "246px",
                position: "absolute",
                right: "-26px",
                bottom: "-70px",
                marginTop: "20px",
              }}
            >
              <Image
                src="/images/backgrounds/welcome-bg2.png"
                alt="img"
                width={340}
                height={250}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>)
  );
};

export default WelcomeCard;
