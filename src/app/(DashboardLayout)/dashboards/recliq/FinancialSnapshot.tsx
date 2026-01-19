import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Typography, Box, Stack, Divider, Chip, Avatar } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { IconArrowUpLeft, IconArrowDownRight } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

interface FinancialSnapshotProps {
  isLoading?: boolean;
}

const SkeletonBlock = ({ w, h }: { w: number | string; h: number }) => (
  <Box sx={{ width: w, height: h, bgcolor: 'grey.200', borderRadius: 1 }} />
);

const BaseLineChartOptions = (theme: any, color: string): ApexOptions => ({
  chart: {
    type: "area",
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
    foreColor: "#adb0bb",
    toolbar: { show: false },
    height: 70,
    sparkline: { enabled: true },
    group: "sparklines",
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    colors: [color],
    type: "solid",
    opacity: 0.05,
  },
  markers: {
    size: 0,
  },
  tooltip: {
    theme: theme.palette.mode === "dark" ? "dark" : "light",
    x: { show: false },
  },
});

const BaseDonutOptions = (
  theme: any,
  labels: string[],
  colors: string[]
): ApexOptions => ({
  chart: {
    type: 'donut',
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
    toolbar: { show: false },
  },
  labels,
  colors,
  plotOptions: {
    pie: {
      donut: {
        size: '72%',
        labels: {
          show: true,
          total: {
            show: true,
            showAlways: true,
            fontSize: '12px',
            color: theme.palette.text.secondary,
          },
        },
      },
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: false },
  legend: { show: false },
  tooltip: {
    theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    fillSeriesColor: false,
  },
});

const RevenueCard = ({ isLoading }: { isLoading?: boolean }) => {
  const theme = useTheme();
  
  // Line chart options and data
  const lineOptions = BaseLineChartOptions(theme, theme.palette.primary.light);
  const lineSeries = [
    {
      name: "Revenue",
      color: theme.palette.primary.main,
      data: [42, 48, 52, 45, 58, 62, 48],
    },
  ];

  // Donut chart options
  const options = BaseDonutOptions(
    theme,
    ['Revenue', 'Pending', 'Refunded'],
    [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ]
  );
  const series = [65, 25, 10];

  if (isLoading) {
    return (
      <DashboardCard>
        <Stack spacing={1.5}>
          <SkeletonBlock w={120} h={22} />
          <SkeletonBlock w={160} h={16} />
          <SkeletonBlock w="100%" h={110} />
        </Stack>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <Stack spacing={1.5}>
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Typography variant="h4">₦48,820,000</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ bgcolor: theme.palette.success.light, width: 20, height: 20 }}>
                <IconArrowUpLeft width={18} color="#13DEB9" />
              </Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                +9%
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="subtitle2" color="text.secondary">
            Total Revenue (This Month)
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary">
          All funds collected from users and businesses before payouts and fees.
        </Typography>

        <Divider />

        <Box height={120}>
          <Chart options={options} series={series} type="donut" height={120} />
        </Box>

        <Box height="70px">
          <Chart
            options={lineOptions}
            series={lineSeries}
            type="area"
            width="100%"
            height="70px"
          />
        </Box>

        <Stack direction="row" spacing={1}>
          <Chip size="small" label="Live data" color="success" />
          <Chip size="small" label="+9% MoM" />
        </Stack>
      </Stack>
    </DashboardCard>
  );
};

const PayoutsCard = ({ isLoading }: { isLoading?: boolean }) => {
  const theme = useTheme();
  
  // Line chart options and data
  const lineOptions = BaseLineChartOptions(theme, theme.palette.success.light);
  const lineSeries = [
    {
      name: "Payouts",
      color: theme.palette.success.main,
      data: [38, 42, 45, 48, 44, 52, 49],
    },
  ];

  // Donut chart options
  const options = BaseDonutOptions(
    theme,
    ['Completed', 'Processing', 'Failed'],
    [
      theme.palette.success.main,
      theme.palette.info.main,
      theme.palette.error.main,
    ]
  );
  const series = [75, 20, 5];

  if (isLoading) {
    return (
      <DashboardCard>
        <Stack spacing={1.5}>
          <SkeletonBlock w={120} h={22} />
          <SkeletonBlock w={160} h={16} />
          <SkeletonBlock w="100%" h={110} />
        </Stack>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <Stack spacing={1.5}>
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Typography variant="h4">₦26,498,000</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ bgcolor: theme.palette.success.light, width: 20, height: 20 }}>
                <IconArrowUpLeft width={18} color="#13DEB9" />
              </Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                +12%
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="subtitle2" color="text.secondary">
            Total Payouts (This Month)
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary">
          Amount disbursed to agents for completed pickups and verified jobs.
        </Typography>

        <Divider />

        <Box height={120}>
          <Chart options={options} series={series} type="donut" height={120} />
        </Box>

        <Box height="70px">
          <Chart
            options={lineOptions}
            series={lineSeries}
            type="area"
            width="100%"
            height="70px"
          />
        </Box>

        <Stack direction="row" spacing={1}>
          <Chip size="small" label="Auto payouts" color="primary" />
          <Chip size="small" label="5 failed" color="error" />
        </Stack>
      </Stack>
    </DashboardCard>
  );
};

const PlatformMarginCard = ({ isLoading }: { isLoading?: boolean }) => {
  const theme = useTheme();
  
  // Line chart options and data
  const lineOptions = BaseLineChartOptions(theme, theme.palette.warning.light);
  const lineSeries = [
    {
      name: "Margin",
      color: theme.palette.warning.main,
      data: [18, 22, 20, 24, 26, 23, 28],
    },
  ];

  // Donut chart options
  const options = BaseDonutOptions(
    theme,
    ['Margin', 'Operational Costs', 'Fees'],
    [
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
    ]
  );
  const series = [55, 30, 15];

  if (isLoading) {
    return (
      <DashboardCard>
        <Stack spacing={1.5}>
          <SkeletonBlock w={120} h={22} />
          <SkeletonBlock w={160} h={16} />
          <SkeletonBlock w="100%" h={110} />
        </Stack>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <Stack spacing={1.5}>
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Typography variant="h4">₦22,322,000</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ bgcolor: theme.palette.error.light, width: 20, height: 20 }}>
                <IconArrowDownRight width={18} color="#FF6B6B" />
              </Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                -3%
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="subtitle2" color="text.secondary">
            Platform Margin
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary">
          Net earnings after agent payouts, processing fees, and operations.
        </Typography>

        <Divider />

        <Box height={120}>
          <Chart options={options} series={series} type="donut" height={120} />
        </Box>

        <Box height="70px">
          <Chart
            options={lineOptions}
            series={lineSeries}
            type="area"
            width="100%"
            height="70px"
          />
        </Box>

        <Stack direction="row" spacing={1}>
          <Chip size="small" label="Healthy margin" color="success" />
          <Chip size="small" label="-3% MoM" color="error" />
        </Stack>
      </Stack>
    </DashboardCard>
  );
};

const FinancialSnapshot = ({ isLoading }: FinancialSnapshotProps) => {
  return (
    <Stack spacing={3}>
      <RevenueCard isLoading={isLoading} />
      <PayoutsCard isLoading={isLoading} />
      <PlatformMarginCard isLoading={isLoading} />
    </Stack>
  );
};

export default FinancialSnapshot;
