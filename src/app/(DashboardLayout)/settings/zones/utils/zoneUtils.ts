import type { Zone, ZoneStatus, SLATier, CoverageLevel, DemandIntensity } from '../types';

export const getStatusColor = (status: ZoneStatus): string => {
  const colors: Record<ZoneStatus, string> = {
    active: '#10B981',
    inactive: '#EF4444',
    pending: '#F59E0B',
    archived: '#6B7280',
  };
  return colors[status] || '#6B7280';
};

export const getStatusLabel = (status: ZoneStatus): string => {
  const labels: Record<ZoneStatus, string> = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    archived: 'Archived',
  };
  return labels[status] || status;
};

export const getSLAColor = (tier: SLATier): string => {
  const colors: Record<SLATier, string> = {
    platinum: '#9333EA',
    gold: '#F59E0B',
    silver: '#6B7280',
    bronze: '#92400E',
  };
  return colors[tier] || '#6B7280';
};

export const getSLALabel = (tier: SLATier): string => {
  const labels: Record<SLATier, string> = {
    platinum: 'Platinum',
    gold: 'Gold',
    silver: 'Silver',
    bronze: 'Bronze',
  };
  return labels[tier] || tier;
};

export const getCoverageColor = (level: CoverageLevel): string => {
  const colors: Record<CoverageLevel, string> = {
    critical: '#DC2626',
    high: '#10B981',
    medium: '#F59E0B',
    low: '#EF4444',
  };
  return colors[level] || '#6B7280';
};

export const getCoverageLabel = (level: CoverageLevel): string => {
  const labels: Record<CoverageLevel, string> = {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };
  return labels[level] || level;
};

export const getDemandIntensityColor = (intensity: DemandIntensity): string => {
  const colors: Record<DemandIntensity, string> = {
    high: '#DC2626',
    medium: '#F59E0B',
    low: '#10B981',
  };
  return colors[intensity] || '#6B7280';
};

export const getDemandIntensityLabel = (intensity: DemandIntensity): string => {
  const labels: Record<DemandIntensity, string> = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };
  return labels[intensity] || intensity;
};

export const getZoneMapColor = (zone: Zone): string => {
  if (zone.status === 'inactive') return '#9CA3AF';
  if (zone.coverageLevel === 'critical') return '#DC2626';
  if (zone.coverageLevel === 'low') return '#EF4444';
  if (zone.coverageLevel === 'medium') return '#F59E0B';
  if (zone.coverageLevel === 'high') return '#10B981';
  return '#6B7280';
};

// Calculate map center based on zones
export const calculateMapCenter = (zones: Zone[], selectedCity?: string): { lat: number; lng: number } => {
  if (zones.length === 0) {
    return { lat: 6.5244, lng: 3.3792 }; // Default to Lagos
  }

  // If city is selected, filter zones by city and calculate center
  if (selectedCity) {
    const cityZones = zones.filter(zone => zone.city === selectedCity);
    if (cityZones.length > 0) {
      const totalLat = cityZones.reduce((sum, zone) => sum + (zone.boundary?.center?.lat || 0), 0);
      const totalLng = cityZones.reduce((sum, zone) => sum + (zone.boundary?.center?.lng || 0), 0);
      return {
        lat: totalLat / cityZones.length,
        lng: totalLng / cityZones.length,
      };
    }
  }

  // Calculate center of all zones
  const totalLat = zones.reduce((sum, zone) => sum + (zone.boundary?.center?.lat || 0), 0);
  const totalLng = zones.reduce((sum, zone) => sum + (zone.boundary?.center?.lng || 0), 0);
  return {
    lat: totalLat / zones.length,
    lng: totalLng / zones.length,
  };
};
