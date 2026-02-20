'use client';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useJsApiLoader } from '@react-google-maps/api';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  RefreshCw,
  Download,
  Upload,
  Plus,
  Clock,
  MapPin,
} from 'lucide-react';
import ZoneSummaryCards from './components/ZoneSummaryCards';
import ZoneMap from './components/ZoneMap';
import ZonesTable from './components/ZonesTable';
import ZoneDetailDrawer from './components/ZoneDetailDrawer';
import ZonePerformanceInsightsPanel from './components/ZonePerformanceInsightsPanel';
import CreateZoneDialog from './components/CreateZoneDialog';
import CreateCityModal from './components/CreateCityModal';
import CitiesTable from './components/CitiesTable';
import EditCityModal from './components/EditCityModal';
import SplitZoneModal from './components/SplitZoneModal';
import type { Zone, ZoneStatus } from './types';
import { 
  useCreateCity, 
  useCities, 
  useUpdateCity, 
  useDeleteCity, 
  useEnableCity, 
  useDisableCity,
  useZones,
  useCreateZone,
  useUpdateZone,
  useDeleteZone,
  useActivateZone,
  useDeactivateZone,
  useSplitZone,
  useMergeZones,
  City
} from '@/hooks/useZones';
import {
  mockZones,
} from './mockData';

const BCrumb = [
  { to: '/', title: 'Home' },
  { to: '/settings', title: 'System Settings' },
  { title: 'Zones' },
];

const GOOGLE_MAPS_LIBRARIES: ('drawing' | 'geometry' | 'places')[] = ['drawing', 'geometry', 'places'];

const ZonesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { isLoaded: isMapLoaded, loadError: mapLoadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP || '',
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [filterStatus, setFilterStatus] = useState<ZoneStatus | ''>('');
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [zoneDrawerOpen, setZoneDrawerOpen] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createCityModalOpen, setCreateCityModalOpen] = useState(false);
  const [isCreatingCity, setIsCreatingCity] = useState(false);
  const [editCityModalOpen, setEditCityModalOpen] = useState(false);
  const [selectedCityForEdit, setSelectedCityForEdit] = useState<City | null>(null);
  const [isUpdatingCity, setIsUpdatingCity] = useState(false);
  const [splitZoneModalOpen, setSplitZoneModalOpen] = useState(false);
  const [selectedZoneForSplit, setSelectedZoneForSplit] = useState<Zone | null>(null);
  const [isSplittingZone, setIsSplittingZone] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Refetch all data
      await Promise.all([
        refetchCities(),
        refetchZones(),
      ]);
      
      setNotification({ open: true, message: 'Zones data refreshed successfully', severity: 'success' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh data';
      setNotification({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    setNotification({ open: true, message: 'Exporting zones as GeoJSON...', severity: 'info' });
  };

  const handleImport = () => {
    setNotification({ open: true, message: 'Import GeoJSON feature coming soon', severity: 'info' });
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric((prev) => (prev === metricType ? null : metricType));
    setNotification({ open: true, message: `Filtering by: ${metricType.replace(/_/g, ' ')}`, severity: 'info' });
  };

  const handleViewZone = (zoneId: string) => {
    const zone = zonesData.find((z) => z.id === zoneId);
    if (zone) {
      setSelectedZone(zone);
      setSelectedZoneId(zone.id);
      setZoneDrawerOpen(true);
    }
  };

  const handleZoneMapClick = (zone: Zone) => {
    setSelectedZone(zone);
    setSelectedZoneId(zone.id);
    setZoneDrawerOpen(true);
  };

  const handleCreateZone = async (zoneData: any) => {
    try {
      await createZoneMutation.mutateAsync(zoneData);
      setNotification({ open: true, message: `Zone "${zoneData.name}" created successfully`, severity: 'success' });
      setCreateDialogOpen(false);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create zone. Please try again.';
      setNotification({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  // Fetch cities and zones data
  const { data: cities = [], isLoading: citiesLoading, refetch: refetchCities } = useCities();
  const { data: zonesData = [], isLoading: zonesLoading, refetch: refetchZones } = useZones();
  
  const filteredZones = zonesData.filter((zone) => {
    if (selectedCity && zone.city !== selectedCity) return false;
    if (filterStatus && zone.status !== filterStatus) return false;
    return true;
  });
  
  // City mutations
  const createCityMutation = useCreateCity();
  const updateCityMutation = useUpdateCity();
  const deleteCityMutation = useDeleteCity();
  const enableCityMutation = useEnableCity();
  const disableCityMutation = useDisableCity();
  
  // Zone mutations
  const createZoneMutation = useCreateZone();
  const updateZoneMutation = useUpdateZone();
  const deleteZoneMutation = useDeleteZone();
  const activateZoneMutation = useActivateZone();
  const deactivateZoneMutation = useDeactivateZone();
  const splitZoneMutation = useSplitZone();
  const mergeZonesMutation = useMergeZones();

  const handleCreateCity = async (cityData: {
    name: string;
    state: string;
    lat: number;
    lng: number;
    timezone?: string;
    isActive?: boolean;
  }) => {
    setIsCreatingCity(true);
    try {
      await createCityMutation.mutateAsync(cityData);
      
      setNotification({ 
        open: true, 
        message: `City "${cityData.name}" created successfully`, 
        severity: 'success' 
      });
      setCreateCityModalOpen(false);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create city. Please try again.';
      setNotification({ 
        open: true, 
        message: errorMessage, 
        severity: 'error' 
      });
    } finally {
      setIsCreatingCity(false);
    }
  };

  const handleEditCity = (city: City) => {
    setSelectedCityForEdit(city);
    setEditCityModalOpen(true);
  };

  const handleUpdateCity = async (cityId: string, data: { name: string; state: string; lat: number; lng: number; timezone?: string }) => {
    setIsUpdatingCity(true);
    try {
      await updateCityMutation.mutateAsync({ id: cityId, data });
      
      setNotification({ 
        open: true, 
        message: `City "${data.name}" updated successfully`, 
        severity: 'success' 
      });
      setEditCityModalOpen(false);
      setSelectedCityForEdit(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update city. Please try again.';
      setNotification({ 
        open: true, 
        message: errorMessage, 
        severity: 'error' 
      });
    } finally {
      setIsUpdatingCity(false);
    }
  };

  const handleDeleteCity = async (cityId: string) => {
    try {
      await deleteCityMutation.mutateAsync(cityId);
      
      setNotification({ 
        open: true, 
        message: 'City deleted successfully', 
        severity: 'success' 
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete city. Please try again.';
      setNotification({ 
        open: true, 
        message: errorMessage, 
        severity: 'error' 
      });
    }
  };

  const handleEnableCity = async (cityId: string) => {
    try {
      await enableCityMutation.mutateAsync(cityId);
      
      setNotification({ 
        open: true, 
        message: 'City and associated zones enabled successfully', 
        severity: 'success' 
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to enable city. Please try again.';
      setNotification({ 
        open: true, 
        message: errorMessage, 
        severity: 'error' 
      });
    }
  };

  const handleDisableCity = async (cityId: string) => {
    try {
      await disableCityMutation.mutateAsync(cityId);
      
      setNotification({ 
        open: true, 
        message: 'City and associated zones disabled successfully', 
        severity: 'success' 
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to disable city. Please try again.';
      setNotification({ 
        open: true, 
        message: errorMessage, 
        severity: 'error' 
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // Zone action handlers
  const handleActivateZone = async (zoneId: string) => {
    try {
      await activateZoneMutation.mutateAsync(zoneId);
      
      // Update local zone state
      if (selectedZone && selectedZone.id === zoneId) {
        setSelectedZone({ ...selectedZone, status: 'active' });
      }
      
      // Update zones data
      const updatedZones = zonesData.map(zone => 
        zone.id === zoneId ? { ...zone, status: 'active' } : zone
      );
      // Note: In a real app, you'd use React Query's cache update instead
      
      setNotification({ open: true, message: 'Zone activated successfully', severity: 'success' });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to activate zone';
      setNotification({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  const handleDeactivateZone = async (zoneId: string) => {
    try {
      await deactivateZoneMutation.mutateAsync(zoneId);
      
      // Update local zone state
      if (selectedZone && selectedZone.id === zoneId) {
        setSelectedZone({ ...selectedZone, status: 'inactive' });
      }
      
      // Update zones data
      const updatedZones = zonesData.map(zone => 
        zone.id === zoneId ? { ...zone, status: 'inactive' } : zone
      );
      // Note: In a real app, you'd use React Query's cache update instead
      
      setNotification({ open: true, message: 'Zone deactivated successfully', severity: 'success' });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to deactivate zone';
      setNotification({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  const handleEditZone = (zone: Zone) => {
    // TODO: Implement edit zone modal
    setNotification({ open: true, message: 'Edit zone feature coming soon', severity: 'info' });
  };

  const handleSplitZone = (zone: Zone) => {
    setSelectedZoneForSplit(zone);
    setSplitZoneModalOpen(true);
  };

  const handleMergeZone = (zone: Zone) => {
    // TODO: Implement merge zone modal
    setNotification({ open: true, message: 'Merge zone feature coming soon', severity: 'info' });
  };

  const handleReassignPricing = (zone: Zone) => {
    // TODO: Implement pricing reassignment modal
    setNotification({ open: true, message: 'Pricing reassignment feature coming soon', severity: 'info' });
  };

  const handleSplitZoneSubmit = async (splitData: any) => {
    setIsSplittingZone(true);
    try {
      await splitZoneMutation.mutateAsync(splitData);
      
      setNotification({ 
        open: true, 
        message: `Zone "${selectedZoneForSplit?.name}" split successfully`, 
        severity: 'success' 
      });
      setSplitZoneModalOpen(false);
      setSelectedZoneForSplit(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to split zone';
      setNotification({ 
        open: true, 
        message: errorMessage, 
        severity: 'error' 
      });
    } finally {
      setIsSplittingZone(false);
    }
  };

  return (
    <PageContainer title="Zones" description="Geographic operational boundaries & coverage">
      <Breadcrumb title="Zones" subtitle="Geographic operational boundaries & coverage" />

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Zones
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Geographic operational boundaries & coverage
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>City</InputLabel>
              <Select value={selectedCity} label="City" onChange={(e) => setSelectedCity(e.target.value)}>
                <MenuItem value="">All Cities</MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select value={filterStatus} label="Status" onChange={(e) => setFilterStatus(e.target.value as ZoneStatus | '')}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              color="primary"
              onClick={() => setCreateDialogOpen(true)}
            >
              Create Zone
            </Button>
            <Button
              variant="contained"
              startIcon={<MapPin size={16} />}
              color="secondary"
              onClick={() => setCreateCityModalOpen(true)}
            >
              Create City
            </Button>
            <Button variant="outlined" startIcon={<Upload size={16} />} onClick={handleImport}>
              Import
            </Button>
            <Button variant="outlined" startIcon={<Download size={16} />} onClick={handleExport}>
              Export
            </Button>
            <IconButton onClick={handleRefresh} disabled={loading}>
              <RefreshCw size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ mb: 3 }}>
        <ZoneSummaryCards
          onCardClick={handleCardClick}
          selectedMetric={selectedMetric}
        />
      </Box>

      {/* Zone Map */}
      <Box sx={{ mb: 3 }}>
        <ZoneMap
          zones={filteredZones}
          selectedCity={selectedCity || undefined}
          onZoneClick={handleZoneMapClick}
          selectedZoneId={selectedZoneId}
          isMapLoaded={isMapLoaded}
          mapLoadError={mapLoadError}
        />
      </Box>

      {/* Zones Table */}
      <Box sx={{ mb: 3 }}>
        <ZonesTable
          zones={filteredZones}
          onViewZone={handleViewZone}
        />
      </Box>

      {/* Cities Table */}
      <Box sx={{ mb: 3 }}>
        <CitiesTable
          cities={cities}
          onEdit={handleEditCity}
          onDelete={handleDeleteCity}
          onEnable={handleEnableCity}
          onDisable={handleDisableCity}
        />
      </Box>

      {/* Performance & Expansion Insights */}
      <Box sx={{ mb: 3 }}>
        <ZonePerformanceInsightsPanel />
      </Box>

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Create Zone Dialog */}
      <CreateZoneDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateZone}
        isMapLoaded={isMapLoaded}
        cities={cities}
      />

      {/* Zone Detail Drawer */}
      <ZoneDetailDrawer
        open={zoneDrawerOpen}
        onClose={() => {
          setZoneDrawerOpen(false);
          setSelectedZone(null);
          setSelectedZoneId(null);
        }}
        zone={selectedZone}
        isMapLoaded={isMapLoaded}
        onActivate={handleActivateZone}
        onDeactivate={handleDeactivateZone}
        onEdit={handleEditZone}
        onSplit={handleSplitZone}
        onMerge={handleMergeZone}
        onReassignPricing={handleReassignPricing}
      />

      {/* Create City Modal */}
      <CreateCityModal
        open={createCityModalOpen}
        onClose={() => setCreateCityModalOpen(false)}
        onSave={handleCreateCity}
        isSaving={isCreatingCity}
      />

      {/* Edit City Modal */}
      <EditCityModal
        open={editCityModalOpen}
        city={selectedCityForEdit}
        onClose={() => {
          setEditCityModalOpen(false);
          setSelectedCityForEdit(null);
        }}
        onSave={handleUpdateCity}
        isSaving={isUpdatingCity}
      />

      {/* Split Zone Modal */}
      <SplitZoneModal
        open={splitZoneModalOpen}
        onClose={() => {
          setSplitZoneModalOpen(false);
          setSelectedZoneForSplit(null);
        }}
        zone={selectedZoneForSplit}
        onSubmit={handleSplitZoneSubmit}
        isSubmitting={isSplittingZone}
        isMapLoaded={isMapLoaded}
      />
    </PageContainer>
  );
};

export default ZonesPage;
