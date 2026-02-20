'use client';
import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Maximize2,
  Minimize2,
  Layers,
} from 'lucide-react';
import {
  GoogleMap,
  Polygon,
  InfoWindow,
} from '@react-google-maps/api';
import type { Zone, LatLng } from '../types';
import {
  getZoneMapColor,
  getStatusLabel,
  getStatusColor,
  getCoverageLabel,
  getCoverageColor,
  getSLALabel,
  getSLAColor,
  calculateMapCenter,
} from '../utils/zoneUtils';

interface ZoneMapProps {
  zones: Zone[];
  selectedCity?: string;
  onZoneClick?: (zone: Zone) => void;
  selectedZoneId?: string | null;
  isMapLoaded?: boolean;
  mapLoadError?: Error | undefined;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = { lat: 6.5244, lng: 3.3792 }; // Lagos fallback

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      stylers: [{ visibility: 'simplified' }],
    },
  ],
};

const ZoneMap: React.FC<ZoneMapProps> = ({
  zones,
  selectedCity,
  onZoneClick,
  selectedZoneId,
  isMapLoaded = false,
  mapLoadError,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [hoveredZone, setHoveredZone] = useState<Zone | null>(null);
  const [infoPosition, setInfoPosition] = useState<LatLng | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    const center = calculateMapCenter(zones, selectedCity);
    map.panTo(center);
    map.setZoom(selectedCity ? 12 : 7);
  }, [selectedCity, zones]);

  const handleZoneMouseOver = (zone: Zone) => {
    setHoveredZone(zone);
    if (zone.boundary?.center) {
      setInfoPosition(zone.boundary.center);
    }
  };

  const handleZoneMouseOut = () => {
    setHoveredZone(null);
    setInfoPosition(null);
  };

  const handleZoneClick = (zone: Zone) => {
    onZoneClick?.(zone);
  };

  const getCenter = () => {
    return calculateMapCenter(zones, selectedCity);
  };

  if (mapLoadError) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">Failed to load Google Maps. Check your API key.</Typography>
      </Paper>
    );
  }

  if (!isMapLoaded) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">Loading map...</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Layers size={18} color="#3B82F6" />
            <Typography variant="h6" fontWeight="600">Zone Map</Typography>
            <Typography variant="body2" color="text.secondary" ml={1}>
              {zones.length} zones • Color-coded by coverage
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Legend */}
            <Stack direction="row" spacing={1.5} mr={2}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10B981' }} />
                <Typography variant="caption">High</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                <Typography variant="caption">Medium</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#EF4444' }} />
                <Typography variant="caption">Low</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#9CA3AF' }} />
                <Typography variant="caption">Inactive</Typography>
              </Stack>
            </Stack>
            <Tooltip title={expanded ? 'Collapse' : 'Expand'}>
              <IconButton size="small" onClick={() => setExpanded(!expanded)}>
                {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ height: expanded ? 700 : 450, position: 'relative' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={getCenter()}
          zoom={selectedCity ? 12 : 7}
          onLoad={onMapLoad}
          options={mapOptions}
        >
          {zones.filter(zone => zone.boundary?.polygon && zone.boundary.polygon.length > 0).map((zone) => {
            const color = getZoneMapColor(zone);
            const isSelected = selectedZoneId === zone.id;

            return (
              <Polygon
                key={zone.id}
                paths={zone.boundary.polygon}
                options={{
                  fillColor: color,
                  fillOpacity: isSelected ? 0.5 : 0.25,
                  strokeColor: isSelected ? '#1E40AF' : color,
                  strokeOpacity: 1,
                  strokeWeight: isSelected ? 3 : 1.5,
                  clickable: true,
                  zIndex: isSelected ? 10 : 1,
                }}
                onMouseOver={() => handleZoneMouseOver(zone)}
                onMouseOut={handleZoneMouseOut}
                onClick={() => handleZoneClick(zone)}
              />
            );
          })}

          {hoveredZone && infoPosition && (
            <InfoWindow
              position={infoPosition}
              options={{ disableAutoPan: true }}
              onCloseClick={() => setHoveredZone(null)}
            >
              <Box sx={{ p: 0.5, minWidth: 180 }}>
                <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                  {hoveredZone.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {hoveredZone.city} • {hoveredZone.boundary?.areaKm2 || 0} km²
                </Typography>
                <Stack direction="row" spacing={0.5} mt={1} flexWrap="wrap">
                  <Chip
                    label={getStatusLabel(hoveredZone.status)}
                    size="small"
                    sx={{ bgcolor: getStatusColor(hoveredZone.status) + '15', color: getStatusColor(hoveredZone.status), fontSize: '0.6rem', height: 20 }}
                  />
                  <Chip
                    label={getCoverageLabel(hoveredZone.coverageLevel)}
                    size="small"
                    sx={{ bgcolor: getCoverageColor(hoveredZone.coverageLevel) + '15', color: getCoverageColor(hoveredZone.coverageLevel), fontSize: '0.6rem', height: 20 }}
                  />
                  <Chip
                    label={getSLALabel(hoveredZone.slaTier)}
                    size="small"
                    sx={{ bgcolor: getSLAColor(hoveredZone.slaTier) + '15', color: getSLAColor(hoveredZone.slaTier), fontSize: '0.6rem', height: 20 }}
                  />
                </Stack>
                <Stack spacing={0.25} mt={1}>
                  <Typography variant="caption">Agents: {hoveredZone.activeAgents || 0}/{hoveredZone.totalAgents || 0}</Typography>
                  <Typography variant="caption">Pickups/day: {hoveredZone.avgPickupsPerDay || 0}</Typography>
                  <Typography variant="caption">SLA: {hoveredZone.performance?.slaCompliancePercent || 0}%</Typography>
                </Stack>
              </Box>
            </InfoWindow>
          )}
        </GoogleMap>
      </Box>
    </Paper>
  );
};

export default ZoneMap;
