'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  LinearProgress,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  CardContent,
} from '@mui/material';
import {
  IconUserCheck,
  IconSearch,
  IconFilter,
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import VerificationSummaryCards from './components/VerificationSummaryCards';
import VerificationTable from './components/VerificationTable';
import VerificationDetailDrawer from './components/VerificationDetailDrawer';

// Types
interface Agent {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  type: 'individual' | 'company' | 'fleet';
  kycStatus: 'pending' | 'under_review' | 'verified' | 'rejected' | 'suspended';
  submittedOn: string;
  reviewedOn?: string;
  reviewer?: string;
  documents: {
    governmentId: string;
    agentPhoto: string;
    proofOfAddress?: string;
  };
  rejectionReason?: string;
}

interface VerificationSummary {
  totalAgents: number;
  pendingVerification: number;
  verifiedAgents: number;
  rejectedAgents: number;
  suspendedAgents: number;
  incompleteKYC: number;
}

// Mock Data
const mockAgents: Agent[] = [
  {
    id: 'AGT001',
    name: 'Chidi Amadi',
    phone: '+2348031234567',
    city: 'Port Harcourt',
    zone: 'GRA Phase II',
    type: 'individual',
    kycStatus: 'verified',
    submittedOn: '2024-01-11T14:30:00Z',
    reviewedOn: '2024-01-12T09:15:00Z',
    reviewer: 'Admin User',
    documents: {
      governmentId: '/docs/id_front_001.jpg',
      agentPhoto: '/docs/photo_001.jpg',
      proofOfAddress: '/docs/address_001.pdf'
    }
  },
  {
    id: 'AGT002',
    name: 'Ngozi Eze',
    phone: '+2348123456789',
    city: 'Port Harcourt',
    zone: 'Trans-Amadi',
    type: 'company',
    kycStatus: 'pending',
    submittedOn: '2024-01-14T16:20:00Z',
    documents: {
      governmentId: '/docs/id_front_002.jpg',
      agentPhoto: '/docs/photo_002.jpg'
    }
  },
  {
    id: 'AGT003',
    name: 'Tunde Adebayo',
    phone: '+2347069876543',
    city: 'Port Harcourt',
    zone: 'Old GRA',
    type: 'fleet',
    kycStatus: 'under_review',
    submittedOn: '2024-01-13T11:45:00Z',
    documents: {
      governmentId: '/docs/id_front_003.jpg',
      agentPhoto: '/docs/photo_003.jpg',
      proofOfAddress: '/docs/address_003.pdf'
    }
  },
  {
    id: 'AGT004',
    name: 'Fatima Yusuf',
    phone: '+2349056789012',
    city: 'Port Harcourt',
    zone: 'Rumuokoro',
    type: 'individual',
    kycStatus: 'rejected',
    submittedOn: '2024-01-08T10:30:00Z',
    reviewedOn: '2024-01-09T14:20:00Z',
    reviewer: 'System Auto',
    rejectionReason: 'Document quality too low - blurry image',
    documents: {
      governmentId: '/docs/id_front_004.jpg',
      agentPhoto: '/docs/photo_004.jpg'
    }
  },
  {
    id: 'AGT005',
    name: 'Rivers Eco Ltd',
    phone: '+2348098765432',
    city: 'Port Harcourt',
    zone: 'Rumuigbo',
    type: 'company',
    kycStatus: 'pending',
    submittedOn: '',
    documents: {
      governmentId: '',
      agentPhoto: '',
      proofOfAddress: ''
    }
  }
];

const mockSummary: VerificationSummary = {
  totalAgents: 3420,
  pendingVerification: 418,
  verifiedAgents: 2610,
  rejectedAgents: 212,
  suspendedAgents: 180,
  incompleteKYC: 12,
};


// Main Component
const AgentVerificationPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [summary, setSummary] = useState<VerificationSummary>(mockSummary);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' });

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.phone.includes(searchTerm) ||
                         agent.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || agent.kycStatus === selectedStatus;
    const matchesCity = selectedCity === 'all' || agent.city === selectedCity;
    const matchesType = selectedType === 'all' || agent.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesCity && matchesType;
  });

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedAgent(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    setNotification({
      open: true,
      message: `Exporting verification data as ${format.toUpperCase()}`,
      severity: 'success'
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({
        open: true,
        message: 'Verification data refreshed successfully',
        severity: 'success'
      });
    }, 1000);
  };

  return (
    <PageContainer title="Agent Verification (KYC)" description="Identity & compliance status of recycling agents">
      <Breadcrumb title="Agent Verification (KYC)" subtitle="Identity & compliance status of recycling agents" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Agent Verification (KYC)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Identity & compliance status of recycling agents
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="outlined"
                startIcon={<IconRefresh size={16} />}
                onClick={handleRefresh}
                disabled={loading}
              >
                Refresh
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<IconDownload size={16} />}
                onClick={() => handleExport('csv')}
              >
                CSV
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<IconDownload size={16} />}
                onClick={() => handleExport('pdf')}
              >
                PDF
              </Button>
            </Stack>
          </Stack>
        </DashboardCard>
      </Box>

      {/* Filters */}
      <Box mt={3}>
        <DashboardCard>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                placeholder="Search by name, agent ID, or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <IconSearch size={16} style={{ marginRight: 8 }} />,
                }}
                sx={{ minWidth: 300 }}
              />
              
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>City / Zone</InputLabel>
                <Select
                  value={selectedCity}
                  label="City / Zone"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <MenuItem value="all">All Cities</MenuItem>
                  <MenuItem value="Nairobi">Nairobi</MenuItem>
                  <MenuItem value="Mombasa">Mombasa</MenuItem>
                  <MenuItem value="Kisumu">Kisumu</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Verification Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Verification Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="under_review">Under Review</MenuItem>
                  <MenuItem value="verified">Verified</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Agent Type</InputLabel>
                <Select
                  value={selectedType}
                  label="Agent Type"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="company">Company</MenuItem>
                  <MenuItem value="fleet">Fleet</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </DashboardCard>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Verification Summary Cards */}
      <Box mt={3}>
        <VerificationSummaryCards 
          summary={summary} 
          onStatusFilter={(status) => setSelectedStatus(status)}
        />
      </Box>

      {/* Agents Table */}
      <Box mt={3}>
        <VerificationTable
          agents={filteredAgents}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onAgentClick={handleAgentClick}
        />
      </Box>

      {/* Agent Detail Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 600,
            p: 0,
          },
        }}
      >
        <VerificationDetailDrawer
          agent={selectedAgent}
          open={isDrawerOpen}
          onClose={handleDrawerClose}
        />
      </Drawer>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default AgentVerificationPage;
