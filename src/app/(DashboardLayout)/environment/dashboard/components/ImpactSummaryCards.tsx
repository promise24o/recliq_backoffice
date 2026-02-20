'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Tooltip,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Recycle,
  Leaf,
  TreePine,
  Landmark,
  Target,
  Building,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Info
} from 'lucide-react';
import { ImpactSummary, ImpactMetric } from '../types';
import { 
  formatWeight, 
  formatCO2, 
  formatTrees, 
  formatPercentage,
  getVerificationStatusColor 
} from '../mockData';

interface ImpactSummaryCardsProps {
  summary: ImpactSummary;
  onCardClick?: (metricType: ImpactMetric) => void;
  showActions?: boolean;
}

const ImpactSummaryCards: React.FC<ImpactSummaryCardsProps> = ({
  summary,
  onCardClick,
  showActions = true
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, cardId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedCard(cardId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCard(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality
    console.log(`Exporting ${selectedCard} as ${format}`);
    handleMenuClose();
  };

  const handleCardClick = (metricType: ImpactMetric) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  const cards = [
    {
      id: 'total_waste',
      title: 'Total Waste Recycled',
      value: formatWeight(summary?.totalWasteRecycled || 0),
      subtitle: 'Verified weight from all activities',
      icon: <Recycle size={24} color="#10B981" />,
      color: '#10B981',
      bgColor: '#10B98115',
      metricType: 'waste_recycled' as ImpactMetric,
      growth: summary?.monthlyGrowthRate || 0,
      trend: (summary?.monthlyGrowthRate || 0) >= 0 ? 'up' : 'down',
      tooltip: 'Total weight of waste diverted from landfill through verified recycling activities'
    },
    {
      id: 'co2_avoided',
      title: 'CO₂ Emissions Avoided',
      value: formatCO2(summary?.totalCO2Avoided || 0),
      subtitle: 'Greenhouse gas emissions prevented',
      icon: <Leaf size={24} color="#3B82F6" />,
      color: '#3B82F6',
      bgColor: '#3B82F615',
      metricType: 'co2_avoided' as ImpactMetric,
      growth: 18.7,
      trend: 'up',
      tooltip: 'CO₂ equivalent emissions avoided through recycling vs landfill disposal'
    },
    {
      id: 'trees_equivalent',
      title: 'Trees Equivalent Saved',
      value: formatTrees(summary?.totalTreesSaved || 0),
      subtitle: 'Environmental impact translated to trees',
      icon: <TreePine size={24} color="#84CC16" />,
      color: '#84CC16',
      bgColor: '#84CC1615',
      metricType: 'trees_saved' as ImpactMetric,
      growth: 15.2,
      trend: 'up',
      tooltip: 'Number of trees that would absorb the same amount of CO₂ in one year'
    },
    {
      id: 'landfill_diversion',
      title: 'Landfill Diversion Rate',
      value: formatPercentage(summary?.landfillDiversionRate || 0),
      subtitle: 'Percentage of waste diverted from landfill',
      icon: <Landmark size={24} color="#F59E0B" />,
      color: '#F59E0B',
      bgColor: '#F59E0B15',
      metricType: 'landfill_diversion' as ImpactMetric,
      growth: 5.3,
      trend: 'up',
      tooltip: 'Percentage of collected waste that is recycled rather than sent to landfill'
    },
    {
      id: 'sdg_contributions',
      title: 'SDG Contributions',
      value: summary?.sdgContributions?.totalContributions?.toString() || '0',
      subtitle: 'UN Sustainable Development Goals impacted',
      icon: <Target size={24} color="#8B5CF6" />,
      color: '#8B5CF6',
      bgColor: '#8B5CF615',
      metricType: 'sdg_contributions' as ImpactMetric,
      growth: 12.5,
      trend: 'up',
      tooltip: 'Number of UN Sustainable Development Goals positively impacted'
    },
    {
      id: 'active_cities',
      title: 'Active Impact Cities',
      value: summary?.activeImpactCities?.toString() || '0',
      subtitle: 'Cities with verified recycling activity',
      icon: <Building size={24} color="#EF4444" />,
      color: '#EF4444',
      bgColor: '#EF444415',
      metricType: 'sdg_contributions' as ImpactMetric,
      growth: 8.7,
      trend: 'up',
      tooltip: 'Number of cities with verified recycling activities in the selected period'
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.id}>
          <Card
            sx={{
              cursor: onCardClick ? 'pointer' : 'default',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: onCardClick ? 'translateY(-4px)' : 'none',
                boxShadow: onCardClick ? 4 : 1
              },
              border: `1px solid ${card.color}20`,
              position: 'relative'
            }}
            onClick={() => handleCardClick(card.metricType)}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Header */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 2
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: card.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {card.icon}
                </Box>
                
                {showActions && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, card.id);
                    }}
                    sx={{ opacity: 0.7 }}
                  >
                    <MoreVertical size={16} />
                  </IconButton>
                )}
              </Box>

              {/* Content */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h4"
                  fontWeight="600"
                  color={card.color}
                  sx={{ mb: 0.5 }}
                >
                  {card.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', lineHeight: 1.4 }}
                >
                  {card.subtitle}
                </Typography>
              </Box>

              {/* Growth Indicator */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {card.trend === 'up' ? (
                    <TrendingUp size={16} color="#10B981" />
                  ) : (
                    <TrendingDown size={16} color="#EF4444" />
                  )}
                  <Typography
                    variant="caption"
                    color={card.trend === 'up' ? '#10B981' : '#EF4444'}
                    sx={{ ml: 0.5, fontWeight: 500 }}
                  >
                    {card.growth >= 0 ? '+' : ''}{card.growth.toFixed(1)}%
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 0.5 }}
                  >
                    vs last period
                  </Typography>
                </Box>

                <Tooltip title={card.tooltip} arrow>
                  <IconButton size="small" sx={{ opacity: 0.5 }}>
                    <Info size={14} />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Verification Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: getVerificationStatusColor('verified') + '20',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: getVerificationStatusColor('verified'),
                    mr: 0.5
                  }}
                />
                <Typography
                  variant="caption"
                  color={getVerificationStatusColor('verified')}
                  sx={{ fontSize: '0.65rem', fontWeight: 500 }}
                >
                  Verified
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            minWidth: 150,
            '& .MuiMenuItem-root': {
              fontSize: '0.875rem'
            }
          }
        }}
      >
        <MenuItem onClick={() => handleExport('csv')}>
          Export as CSV
        </MenuItem>
        <MenuItem onClick={() => handleExport('pdf')}>
          Export as PDF
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          View Details
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default ImpactSummaryCards;
