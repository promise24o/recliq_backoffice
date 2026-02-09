'use client'
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  CardContent,
  Stack,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  IconPackage,
  IconSearch,
  IconCheck,
  IconWalk,
  IconX,
  IconUsers,
  IconMap,
} from '@tabler/icons-react';
import { User, Users } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';

interface PickupRequest {
  id: string;
  userName: string;
  city: string;
  zone: string;
  pickupMode: 'pickup' | 'dropoff';
  status:
    | 'new'
    | 'matching'
    | 'assigned'
    | 'agent_en_route'
    | 'arrived'
    | 'completed'
    | 'cancelled'
    | 'failed';
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  assignedAgentName?: string;
}

interface Agent {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'busy' | 'offline';
}

interface PickupRequestMapProps {
  requests?: PickupRequest[];
  agents?: Agent[];
  showAgents?: boolean;
  onAgentToggle?: (show: boolean) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px',
};

const defaultMapCenter = {
  lat: 4.8156,
  lng: 7.0498,
};

const PickupRequestMap: React.FC<PickupRequestMapProps> = ({
  requests = [],
  agents = [],
  showAgents = false,
  onAgentToggle,
}) => {
  const [showAgentsOverlay, setShowAgentsOverlay] = useState(showAgents);
  const [selectedRequest, setSelectedRequest] = useState<PickupRequest | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP as string,
    libraries: ['places'],
  });

  const mockRequests: PickupRequest[] = [
    {
      id: 'REQ001',
      userName: 'Adewale Johnson',
      city: 'Port Harcourt',
      zone: 'GRA',
      pickupMode: 'pickup',
      status: 'assigned',
      coordinates: { lat: 4.8156, lng: 7.0498 },
      address: '45 Forces Avenue, GRA',
      assignedAgentName: 'Sadiq Bello',
    },
    {
      id: 'REQ002',
      userName: 'Blessing Okorie',
      city: 'Port Harcourt',
      zone: 'Trans-Amadi',
      pickupMode: 'dropoff',
      status: 'new',
      coordinates: { lat: 4.8251, lng: 7.0382 },
      address: '12 Trans-Amadi Industrial Layout',
    },
    {
      id: 'REQ003',
      userName: 'Emeka Nwoye',
      city: 'Port Harcourt',
      zone: 'Old GRA',
      pickupMode: 'pickup',
      status: 'matching',
      coordinates: { lat: 4.8102, lng: 7.0554 },
      address: '28 Old GRA Road',
    },
    {
      id: 'REQ004',
      userName: 'Fatima Yusuf',
      city: 'Port Harcourt',
      zone: 'Rumuokoro',
      pickupMode: 'dropoff',
      status: 'agent_en_route',
      coordinates: { lat: 4.8623, lng: 6.9987 },
      address: 'Plot 15 Rumuokoro Market Road',
    },
  ];

  const mockAgents: Agent[] = [
    {
      id: 'AGT001',
      name: 'Sadiq Bello',
      coordinates: { lat: 4.8168, lng: 7.0512 },
      status: 'busy',
    },
    {
      id: 'AGT002',
      name: 'Ngozi Okafor',
      coordinates: { lat: 4.8210, lng: 7.0456 },
      status: 'available',
    },
    {
      id: 'AGT003',
      name: 'Chinedu Eze',
      coordinates: { lat: 4.8301, lng: 7.0324 },
      status: 'available',
    },
  ];

  const displayRequests = requests.length ? requests : mockRequests;
  const displayAgents = agents.length ? agents : mockAgents;

  console.log("These are list of agents")
  console.log(displayRequests)

  useEffect(() => {
    if (mapRef.current && isLoaded) {
      const bounds = new google.maps.LatLngBounds();
      
      displayRequests.forEach((request) => {
        bounds.extend(request.coordinates);
      });
      
      if (showAgentsOverlay) {
        displayAgents.forEach((agent) => {
          bounds.extend(agent.coordinates);
        });
      }
      
      if (!bounds.isEmpty()) {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [displayRequests, displayAgents, showAgentsOverlay, isLoaded]);

  const handleAgentToggle = (_: React.MouseEvent<HTMLElement>, value: boolean | null) => {
    if (value !== null) {
      setShowAgentsOverlay(value);
      onAgentToggle?.(value);
    }
  };

  if (!isLoaded) {
    return (
      <DashboardCard title="Live Pickup Request Map">
        <CardContent>
          <Box
            sx={{
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Typography>Loading Map…</Typography>
          </Box>
        </CardContent>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="Live Pickup Request Map">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Stack direction="row" spacing={1}>
            <Chip icon={<IconPackage size={14} />} label="New" size="small" />
            <Chip icon={<IconSearch size={14} />} label="Matching" size="small" />
            <Chip icon={<IconCheck size={14} />} label="Assigned" size="small" />
            <Chip icon={<IconWalk size={14} />} label="Drop-off" size="small" />
            <Chip icon={<IconX size={14} />} label="Failed" size="small" />
          </Stack>
          <ToggleButtonGroup value={showAgentsOverlay} exclusive onChange={handleAgentToggle}>
            <ToggleButton value>
              <IconUsers size={16} />
            </ToggleButton>
            <ToggleButton value={false}>
              <IconMap size={16} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultMapCenter}
          zoom={13}
          options={{
            zoomControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            mapTypeControl: true,
          }}
          onLoad={(map) => {
            mapRef.current = map;
            
            const bounds = new google.maps.LatLngBounds();
            
            displayRequests.forEach((request) => {
              bounds.extend(request.coordinates);
            });
            
            if (showAgentsOverlay) {
              displayAgents.forEach((agent) => {
                bounds.extend(agent.coordinates);
              });
            }
            
            if (!bounds.isEmpty()) {
              map.fitBounds(bounds);
            }
          }}
        >
          {(() => {
            const createUserIcon = () => {
              const svgString = `
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" fill="#2196F3" stroke="white" stroke-width="2"/>
                  <circle cx="16" cy="12" r="4" fill="white"/>
                  <path d="M8 24 C8 20, 12 18, 16 18 C20 18, 24 20, 24 24" stroke="white" stroke-width="2" fill="none"/>
                </svg>
              `;
              return {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString),
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 16),
              };
            };

            const createAgentIcon = () => {
              const svgString = `
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" fill="#4CAF50" stroke="white" stroke-width="2"/>
                  <circle cx="16" cy="12" r="4" fill="white"/>
                  <path d="M8 24 C8 20, 12 18, 16 18 C20 18, 24 20, 24 24" stroke="white" stroke-width="2" fill="none"/>
                </svg>
              `;
              return {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString),
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 16),
              };
            };

            const userIcon = createUserIcon();
            const agentIcon = createAgentIcon();

            return (
              <>
                {displayRequests.map((request) => (
                  <Marker
                    key={request.id}
                    position={request.coordinates}
                    icon={userIcon}
                    onClick={() => {
                      setSelectedAgent(null);
                      setSelectedRequest(request);
                    }}
                  />
                ))}

                {showAgentsOverlay &&
                  displayAgents.map((agent) => (
                    <Marker
                      key={agent.id}
                      position={agent.coordinates}
                      icon={agentIcon}
                      onClick={() => {
                        setSelectedRequest(null);
                        setSelectedAgent(agent);
                      }}
                    />
                  ))}

                {selectedRequest && (
                  <InfoWindow
                    position={selectedRequest.coordinates}
                    onCloseClick={() => setSelectedRequest(null)}
                  >
                    <Box sx={{ p: 1, minWidth: 200 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <User size={16} color="#2196F3" style={{ marginRight: 8 }} />
                        <Typography fontWeight={600} variant="body2">
                          {selectedRequest.userName}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          ID: {selectedRequest.id}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          📍 {selectedRequest.city} · {selectedRequest.zone}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          📧 {selectedRequest.pickupMode === 'pickup' ? 'Agent → User' : 'User → Agent'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          🏠 {selectedRequest.address}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            px: 1, 
                            py: 0.5, 
                            borderRadius: 1, 
                            bgcolor: '#2196F3', 
                            color: 'white',
                            fontSize: '10px'
                          }}
                        >
                          {selectedRequest.status.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>
                  </InfoWindow>
                )}

                {selectedAgent && (
                  <InfoWindow
                    position={selectedAgent.coordinates}
                    onCloseClick={() => setSelectedAgent(null)}
                  >
                    <Box sx={{ p: 1, minWidth: 200 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Users size={16} color="#4CAF50" style={{ marginRight: 8 }} />
                        <Typography fontWeight={600} variant="body2">
                          {selectedAgent.name}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          ID: {selectedAgent.id}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            px: 1, 
                            py: 0.5, 
                            borderRadius: 1, 
                            bgcolor: selectedAgent.status === 'available' ? '#4CAF50' : '#FF9800', 
                            color: 'white',
                            fontSize: '10px'
                          }}
                        >
                          {selectedAgent.status.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>
                  </InfoWindow>
                )}
              </>
            );
          })()}
        </GoogleMap>
      </CardContent>
    </DashboardCard>
  );
};

export default PickupRequestMap;