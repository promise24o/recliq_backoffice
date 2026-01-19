import React from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { MenuItem, Grid, Stack, Typography, Button, Avatar, Box } from '@mui/material';
import { IconGridDots } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';
import SkeletonRevenueUpdatesTwoCard from '../../../components/dashboards/skeleton/RevenueUpdatesTwoCard';
import { ApexOptions } from 'apexcharts';

interface RevenueVsPayoutsProps {
  isLoading?: boolean;
}

const RevenueVsPayouts = ({ isLoading }: RevenueVsPayoutsProps) => {
  const [timeRange, setTimeRange] = React.useState('today');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeRange(event.target.value);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const success = theme.palette.success.main;

  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 360,
      stacked: false,
    },
    colors: [primary, secondary, success],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '20%',
        borderRadius: 6,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'top',
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: 0,
      tickAmount: 5,
      labels: {
        formatter: function (val) {
          return '₦' + (val / 1000000).toFixed(1) + 'M';
        }
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
      y: {
        formatter: function (val) {
          return '₦' + val.toLocaleString();
        }
      }
    },
  };

  const seriescolumnchart = [
    {
      name: 'Revenue Collected',
      data: [1200000, 1500000, 1800000, 1400000, 2000000, 1600000, 1245000],
    },
    {
      name: 'Agent Payouts',
      data: [600000, 750000, 900000, 700000, 1000000, 800000, 650000],
    },
    {
      name: 'Platform Margin',
      data: [600000, 750000, 900000, 700000, 1000000, 800000, 595000],
    },
  ];

  return (
    <>
      {
        isLoading ? (
          <SkeletonRevenueUpdatesTwoCard />
        ) : (
          <DashboardCard
            title="Revenue vs Payouts"
            subtitle="Financial Performance Overview"
            action={
              <CustomSelect
                labelId="time-range-dd"
                id="time-range-dd"
                size="small"
                value={timeRange}
                onChange={handleChange}
              >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This week</MenuItem>
                <MenuItem value="month">This month</MenuItem>
                <MenuItem value="custom">Custom range</MenuItem>
              </CustomSelect>
            }
          >
            <Grid container spacing={3}>
              <Grid
                size={{
                  xs: 12,
                  sm: 8
                }}>
                <Box className="rounded-bars">
                  <Chart
                    options={optionscolumnchart}
                    series={seriescolumnchart}
                    type="bar"
                    height={360}
                    width={"100%"}
                  />
                </Box>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 4
                }}>
                <Stack spacing={3} mt={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      width={40}
                      height={40}
                      bgcolor="primary.light"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography color="primary" variant="h6" display="flex">
                        <IconGridDots size={24} />
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h3" fontWeight="700">
                        ₦10.7M
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        Total Revenue (Week)
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
                <Stack spacing={3} my={5}>
                  <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{ width: 9, mt: 1, height: 9, bgcolor: primary, svg: { display: 'none' } }}
                    ></Avatar>
                    <Box >
                      <Typography variant="subtitle1" color="textSecondary">
                        Revenue Collected
                      </Typography>
                      <Typography variant="h5">₦48.8M</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{ width: 9, mt: 1, height: 9, bgcolor: secondary, svg: { display: 'none' } }}
                    ></Avatar>
                    <Box>
                      <Typography variant="subtitle1" color="textSecondary">
                        Agent Payouts
                      </Typography>
                      <Typography variant="h5">₦26.5M</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{ width: 9, mt: 1, height: 9, bgcolor: success, svg: { display: 'none' } }}
                    ></Avatar>
                    <Box>
                      <Typography variant="subtitle1" color="textSecondary">
                        Platform Margin
                      </Typography>
                      <Typography variant="h5">₦22.3M</Typography>
                    </Box>
                  </Stack>
                </Stack>
                <Button color="primary" variant="contained" fullWidth>
                  View Full Report
                </Button>
              </Grid>
            </Grid>
          </DashboardCard>
        )}
    </>
  );
};

export default RevenueVsPayouts;
