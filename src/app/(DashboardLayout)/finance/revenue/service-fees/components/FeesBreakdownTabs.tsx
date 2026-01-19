import React from 'react';
import { Grid, Typography, Box, Card, CardContent, Stack, LinearProgress, Chip } from '@mui/material';
import { 
  IconReceipt, 
  IconScale, 
  IconTruck, 
  IconPackage,
  IconMapPin
} from '@tabler/icons-react';

interface FeeTypeCardProps {
  title: string;
  amount: string;
  percentage: number;
  transactionCount: number;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

const FeeTypeCard: React.FC<FeeTypeCardProps> = ({ 
  title, 
  amount, 
  percentage, 
  transactionCount, 
  icon, 
  color 
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: `${color}.light`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: `${color}.main`,
              }}
            >
              {icon}
            </Box>
            
            <Chip 
              label={`${percentage}%`} 
              size="small" 
              color={color} 
              variant="outlined"
            />
          </Box>
          
          <Box>
            <Typography variant="h6" fontWeight={700} color={`${color}.main`}>
              {amount}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {transactionCount} transactions
            </Typography>
          </Box>
          
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                bgcolor: `${color}.main`,
                borderRadius: 3,
              },
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

interface MaterialBarProps {
  name: string;
  kgProcessed: string;
  feesGenerated: string;
  percentage: number;
}

const MaterialBar: React.FC<MaterialBarProps> = ({ name, kgProcessed, feesGenerated, percentage }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" fontWeight={600}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {kgProcessed} kg
            </Typography>
          </Box>
          
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'primary.main',
                borderRadius: 4,
              },
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              {percentage}% of total
            </Typography>
            <Typography variant="body2" fontWeight={600} color="primary.main">
              {feesGenerated}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

interface PickupTypeStatsProps {
  type: string;
  volume: string;
  fees: string;
  conversionRate: string;
  color: 'primary' | 'success' | 'warning';
}

const PickupTypeStats: React.FC<PickupTypeStatsProps> = ({ 
  type, 
  volume, 
  fees, 
  conversionRate, 
  color 
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600} color={`${color}.main`}>
            {type}
          </Typography>
          
          <Box>
            <Typography variant="body2" color="text.secondary">
              Volume
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {volume}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" color="text.secondary">
              Fees Generated
            </Typography>
            <Typography variant="h5" fontWeight={700} color={`${color}.main`}>
              {fees}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" color="text.secondary">
              Priority Conversion
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {conversionRate}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

interface LocationRowProps {
  area: string;
  transactions: number;
  feesEarned: string;
  heatLevel: number; // 0-100 for heatmap intensity
}

const LocationRow: React.FC<LocationRowProps> = ({ area, transactions, feesEarned, heatLevel }) => {
  const getHeatColor = (level: number) => {
    if (level >= 80) return 'error.main';
    if (level >= 60) return 'warning.main';
    if (level >= 40) return 'info.main';
    return 'success.main';
  };

  return (
    <Card sx={{ mb: 1 }}>
      <CardContent sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconMapPin size={18} color={getHeatColor(heatLevel)} />
            <Typography variant="body1" fontWeight={600}>
              {area}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Transactions
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {transactions}
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Fees Earned
              </Typography>
              <Typography variant="body1" fontWeight={600} color="primary.main">
                {feesEarned}
              </Typography>
            </Box>
            
            <Box
              sx={{
                width: 60,
                height: 20,
                borderRadius: 1,
                bgcolor: getHeatColor(heatLevel),
                opacity: heatLevel / 100,
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

interface FeesBreakdownTabsProps {
  type: 'feeType' | 'material' | 'pickupType' | 'location';
}

const FeesBreakdownTabs: React.FC<FeesBreakdownTabsProps> = ({ type }) => {
  // Mock data for different breakdown types
  const feeTypeData = [
    {
      title: 'Per-Transaction Fees',
      amount: '₦8,450,000',
      percentage: 68,
      transactionCount: 4892,
      icon: <IconReceipt size={20} />,
      color: 'primary' as const,
    },
    {
      title: 'Weight-Based Fees',
      amount: '₦2,890,000',
      percentage: 23,
      transactionCount: 3245,
      icon: <IconScale size={20} />,
      color: 'success' as const,
    },
    {
      title: 'Pickup Convenience Fees',
      amount: '₦780,000',
      percentage: 6,
      transactionCount: 1234,
      icon: <IconTruck size={20} />,
      color: 'warning' as const,
    },
    {
      title: 'Drop-off Fees',
      amount: '₦360,000',
      percentage: 3,
      transactionCount: 567,
      icon: <IconPackage size={20} />,
      color: 'info' as const,
    },
  ];

  const materialData = [
    { name: 'PET Plastic', kgProcessed: '12,450', feesGenerated: '₦4,580,000', percentage: 37 },
    { name: 'Metal', kgProcessed: '8,230', feesGenerated: '₦3,120,000', percentage: 25 },
    { name: 'Mixed Materials', kgProcessed: '6,780', feesGenerated: '₦2,450,000', percentage: 20 },
    { name: 'E-waste', kgProcessed: '2,340', feesGenerated: '₦1,890,000', percentage: 15 },
    { name: 'Glass', kgProcessed: '1,890', feesGenerated: '₦440,000', percentage: 3 },
  ];

  const pickupTypeData = [
    {
      type: 'Standard Pickup',
      volume: '3,245',
      fees: '₦8,450,000',
      conversionRate: '12%',
      color: 'primary' as const,
    },
    {
      type: 'Priority Pickup',
      volume: '1,234',
      fees: '₦3,670,000',
      conversionRate: 'N/A',
      color: 'success' as const,
    },
    {
      type: 'Drop-off',
      volume: '567',
      fees: '₦360,000',
      conversionRate: 'N/A',
      color: 'warning' as const,
    },
  ];

  const locationData = [
    { area: 'Obio/Akpor', transactions: 1847, feesEarned: '₦4,780,000', heatLevel: 85 },
    { area: 'Port Harcourt', transactions: 1234, feesEarned: '₦3,190,000', heatLevel: 70 },
    { area: 'Warri', transactions: 987, feesEarned: '₦2,540,000', heatLevel: 55 },
    { area: 'Aba', transactions: 567, feesEarned: '₦1,460,000', heatLevel: 40 },
    { area: 'Uyo', transactions: 257, feesEarned: '₦660,000', heatLevel: 25 },
  ];

  const renderContent = () => {
    switch (type) {
      case 'feeType':
        return (
          <Grid container spacing={3}>
            {feeTypeData.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
                <FeeTypeCard {...item} />
              </Grid>
            ))}
          </Grid>
        );

      case 'material':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Material Breakdown by KG Processed
            </Typography>
            {materialData.map((material, index) => (
              <MaterialBar key={index} {...material} />
            ))}
          </Box>
        );

      case 'pickupType':
        return (
          <Grid container spacing={3}>
            {pickupTypeData.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                <PickupTypeStats {...item} />
              </Grid>
            ))}
          </Grid>
        );

      case 'location':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Geographic Distribution (Heatmap Intensity)
            </Typography>
            {locationData.map((location, index) => (
              <LocationRow key={index} {...location} />
            ))}
          </Box>
        );

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default FeesBreakdownTabs;
