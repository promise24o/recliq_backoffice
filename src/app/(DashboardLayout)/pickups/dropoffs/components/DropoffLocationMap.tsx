'use client'
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Avatar, Chip, Tooltip } from '@mui/material';
import { MapPin, Users, Scale, Star, TrendingUp, AlertCircle } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { DropoffLocation } from '../types';

interface DropoffLocationMapProps {
  locations: DropoffLocation[];
  onLocationClick: (location: DropoffLocation) => void;
}

const DropoffLocationMap: React.FC<DropoffLocationMapProps> = ({ locations, onLocationClick }) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Calculate density for color coding
  const getDensityColor = (totalDropoffs: number) => {
    if (totalDropoffs >= 200) return '#ef4444'; // High - Red
    if (totalDropoffs >= 100) return '#f59e0b'; // Medium - Orange
    return '#10b981'; // Low - Green
  };

  const getDensityLevel = (totalDropoffs: number) => {
    if (totalDropoffs >= 200) return 'High Traffic';
    if (totalDropoffs >= 100) return 'Medium Traffic';
    return 'Low Traffic';
  };

  // Mock map visualization - in real app, integrate with actual map component
  const MapVisualization = () => (
    <Box
      sx={{
        height: 400,
        bgcolor: '#f8fafc',
        border: '2px dashed #e2e8f0',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Mock map background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: '#f1f5f9',
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0, 0, 0, 0.02) 10px,
            rgba(0, 0, 0, 0.02) 20px
          )`
        }}
      />
      
      {/* Location markers */}
      <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
        {locations.map((location, index) => (
          <Tooltip
            key={location.id}
            title={
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {location.name}
                </Typography>
                <Typography variant="caption">
                  {location.totalDropoffs} drop-offs • {getDensityLevel(location.totalDropoffs)}
                </Typography>
              </Box>
            }
            arrow
          >
            <Box
              sx={{
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
              onClick={() => {
                setSelectedLocation(location.id);
                onLocationClick(location);
              }}
            >
              <Avatar
                sx={{
                  bgcolor: getDensityColor(location.totalDropoffs),
                  width: 48,
                  height: 48,
                  border: selectedLocation === location.id ? '3px solid #1e40af' : '3px solid white',
                  boxShadow: 2
                }}
              >
                <MapPin size={24} color="white" />
              </Avatar>
              
              {/* Activity indicator */}
              {location.isActive && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 12,
                    height: 12,
                    bgcolor: '#10b981',
                    borderRadius: '50%',
                    border: '2px solid white'
                  }}
                />
              )}
            </Box>
          </Tooltip>
        ))}
      </Stack>

      {/* Legend */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          bgcolor: 'white',
          p: 2,
          borderRadius: 1,
          boxShadow: 1
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 12, height: 12, bgcolor: '#10b981', borderRadius: '50%' }} />
          <Typography variant="caption">Low Traffic</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 12, height: 12, bgcolor: '#f59e0b', borderRadius: '50%' }} />
          <Typography variant="caption">Medium Traffic</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 12, height: 12, bgcolor: '#ef4444', borderRadius: '50%' }} />
          <Typography variant="caption">High Traffic</Typography>
        </Stack>
      </Stack>
    </Box>
  );

  return (
    <DashboardCard title="Drop-off Location Performance">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📍 Geographic adoption patterns • Click locations for details
          </Typography>
        </Box>
        
        <MapVisualization />
        
        {/* Location Stats Grid */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" mb={2}>
            Location Performance Overview
          </Typography>
          <Stack spacing={2}>
            {locations.map((location) => (
              <Card
                key={location.id}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: selectedLocation === location.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                  '&:hover': {
                    boxShadow: 2,
                    transform: 'translateX(2px)'
                  }
                }}
                onClick={() => {
                  setSelectedLocation(location.id);
                  onLocationClick(location);
                }}
              >
                <CardContent sx={{ py: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      sx={{
                        bgcolor: getDensityColor(location.totalDropoffs),
                        width: 40,
                        height: 40
                      }}
                    >
                      <MapPin size={20} color="white" />
                    </Avatar>
                    
                    <Box flex={1}>
                      <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                        <Typography variant="body1" fontWeight="600">
                          {location.name}
                        </Typography>
                        <Chip
                          label={getDensityLevel(location.totalDropoffs)}
                          size="small"
                          sx={{
                            bgcolor: `${getDensityColor(location.totalDropoffs)}15`,
                            color: getDensityColor(location.totalDropoffs),
                            fontSize: '0.7rem'
                          }}
                        />
                        {location.isActive && (
                          <Chip
                            label="Active"
                            size="small"
                            color="success"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        )}
                      </Stack>
                      
                      <Typography variant="caption" color="text.secondary">
                        {location.address}
                      </Typography>
                      
                      <Stack direction="row" spacing={3} mt={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Users size={14} color="#6b7280" />
                          <Typography variant="caption">
                            {location.totalDropoffs} drop-offs
                          </Typography>
                        </Stack>
                        
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Scale size={14} color="#6b7280" />
                          <Typography variant="caption">
                            {location.totalWeight.toLocaleString()} kg
                          </Typography>
                        </Stack>
                        
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Star size={14} color="#6b7280" />
                          <Typography variant="caption">
                            {location.averageRating.toFixed(1)} ⭐
                          </Typography>
                        </Stack>
                        
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="caption" color="text.secondary">
                            {location.agentName}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                    
                    <TrendingUp
                      size={20}
                      color={getDensityColor(location.totalDropoffs)}
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

export default DropoffLocationMap;
