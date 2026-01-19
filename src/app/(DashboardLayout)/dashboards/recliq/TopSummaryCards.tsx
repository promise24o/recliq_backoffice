'use client'
import Image from "next/image";
import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const summaryCards = [
  {
    icon: '/images/svgs/icon-user-male.svg',
    title: "Users",
    digits: "12,480",
    subtext: "+320 this month",
    bgcolor: "primary",
  },
  {
    icon: '/images/svgs/icon-briefcase.svg',
    title: "Active Agents",
    digits: "214",
    subtext: "18 currently on pickups",
    bgcolor: "success",
  },
  {
    icon: '/images/svgs/icon-mailbox.svg',
    title: "Pickups Today",
    digits: "96",
    subtext: "12 pending",
    bgcolor: "warning",
  },
  {
    icon: '/images/svgs/icon-favorites.svg',
    title: "Waste Collected",
    digits: "4,320 kg",
    subtext: "Today",
    bgcolor: "info",
  },
  {
    icon: '/images/svgs/icon-speech-bubble.svg',
    title: "Revenue (₦)",
    digits: "₦1,245,000",
    subtext: "+8% vs yesterday",
    bgcolor: "secondary",
  },
  {
    icon: '/images/svgs/icon-connect.svg',
    title: "Alerts",
    digits: "7",
    subtext: "disputes / failed payouts",
    bgcolor: "error",
  },
];

const TopSummaryCards = () => {
  return (
    <DashboardCard title="">
      <Grid container spacing={3}>
        {summaryCards.map((card, i) => (
          <Grid
            key={i}
            size={{ xs: 12, sm: 6, lg: 4 }}
          >
            <Box
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              <Box
                bgcolor={card.bgcolor + ".light"}
                p={2}
                borderRadius={2}
                sx={{
                  minHeight: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                  }}
                >
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={50}
                    height={50}
                  />
                </Box>

                <Typography
                  color={card.bgcolor + ".main"}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  {card.title}
                </Typography>

                <Typography
                  color={card.bgcolor + ".main"}
                  variant="h4"
                  fontWeight={600}
                >
                  {card.digits}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">
                  {card.subtext}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default TopSummaryCards;
