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
  Grid,
} from '@mui/material';
import {
  IconSearch,
  IconFilter,
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import VerificationSummaryCards from './components/VerificationSummaryCards';
import KYCFunnelChart from './components/KYCFunnelChart';
import VerificationTrendChart from './components/VerificationTrendChart';
import VerificationTable from './components/VerificationTable';
import VerificationDetailDrawer from './components/VerificationDetailDrawer';

// Types
interface KYCDocument {
  id: string;
  type: 'government_id' | 'address_proof' | 'company_registration' | 'vehicle_details' | 'agent_photo';
  status: 'valid' | 'expired' | 'rejected' | 'pending';
  uploadedDate: string;
  reviewerNotes?: string;
  url: string;
}

interface Agent {
  id: string;
  name: string;
  type: 'individual' | 'company' | 'fleet';
  city: string;
  zone: string;
  signupDate: string;
  kycStatus: 'pending' | 'under_review' | 'verified' | 'rejected' | 'suspended';
  submittedDocs: number;
  lastReviewDate?: string;
  riskFlag: 'low' | 'medium' | 'high';
  documents: KYCDocument[];
  verificationTimeline: {
    signup: string;
    documentSubmission?: string;
    reviewStart?: string;
    approval?: string;
    rejection?: string;
    suspension?: string;
  };
  riskHistory: {
    disputes: number;
    missedPickups: number;
    complaints: number;
    priorRejections: number;
  };
  notes?: string;
}

interface VerificationSummary {
  totalAgents: number;
  pendingVerification: number;
  verifiedAgents: number;
  rejectedAgents: number;
  suspendedAgents: number;
  incompleteKYC: number;
}

interface FunnelData {
  stage: string;
  count: number;
  percentage: number;
}

interface TrendData {
  date: string;
  verified: number;
  pending: number;
  rejected: number;
  suspended: number;
}

// Mock Data
const mockAgents: Agent[] = [
  {
    id: 'AGT001',
    name: 'Samuel Kamau',
    type: 'individual',
    city: 'Nairobi',
    zone: 'Westlands',
    signupDate: '2024-01-10',
    kycStatus: 'verified',
    submittedDocs: 5,
    lastReviewDate: '2024-01-12',
    riskFlag: 'low',
    documents: [
      { id: 'doc1', type: 'government_id', status: 'valid', uploadedDate: '2024-01-11', url: '/docs/id1.pdf' },
      { id: 'doc2', type: 'address_proof', status: 'valid', uploadedDate: '2024-01-11', url: '/docs/address1.pdf' },
      { id: 'doc3', type: 'agent_photo', status: 'valid', uploadedDate: '2024-01-11', url: '/docs/photo1.jpg' },
    ],
    verificationTimeline: {
      signup: '2024-01-10',
      documentSubmission: '2024-01-11',
      reviewStart: '2024-01-11',
      approval: '2024-01-12',
    },
    riskHistory: {
      disputes: 0,
      missedPickups: 2,
      complaints: 0,
      priorRejections: 0,
    },
  },
  {
    id: 'AGT002',
    name: 'Grace Wanjiru',
    type: 'company',
    city: 'Nairobi',
    zone: 'Karen',
    signupDate: '2024-01-12',
    kycStatus: 'pending',
    submittedDocs: 3,
    riskFlag: 'medium',
    documents: [
      { id: 'doc4', type: 'government_id', status: 'pending', uploadedDate: '2024-01-13', url: '/docs/id2.pdf' },
      { id: 'doc5', type: 'company_registration', status: 'pending', uploadedDate: '2024-01-13', url: '/docs/company1.pdf' },
      { id: 'doc6', type: 'vehicle_details', status: 'pending', uploadedDate: '2024-01-13', url: '/docs/vehicle1.pdf' },
    ],
    verificationTimeline: {
      signup: '2024-01-12',
      documentSubmission: '2024-01-13',
    },
    riskHistory: {
      disputes: 1,
      missedPickups: 5,
      complaints: 1,
      priorRejections: 0,
    },
  },
  {
    id: 'AGT003',
    name: 'Michael Ochieng',
    type: 'fleet',
    city: 'Mombasa',
    zone: 'Town Center',
    signupDate: '2024-01-08',
    kycStatus: 'rejected',
    submittedDocs: 4,
    lastReviewDate: '2024-01-11',
    riskFlag: 'high',
    documents: [
      { id: 'doc7', type: 'government_id', status: 'rejected', uploadedDate: '2024-01-09', reviewerNotes: 'Document appears to be altered', url: '/docs/id3.pdf' },
      { id: 'doc8', type: 'address_proof', status: 'valid', uploadedDate: '2024-01-09', url: '/docs/address2.pdf' },
      { id: 'doc9', type: 'company_registration', status: 'rejected', uploadedDate: '2024-01-09', reviewerNotes: 'Certificate expired', url: '/docs/company2.pdf' },
    ],
    verificationTimeline: {
      signup: '2024-01-08',
      documentSubmission: '2024-01-09',
      reviewStart: '2024-01-10',
      rejection: '2024-01-11',
    },
    riskHistory: {
      disputes: 3,
      missedPickups: 8,
      complaints: 2,
      priorRejections: 1,
    },
  },
  {
    id: 'AGT004',
    name: 'Sarah Mwangi',
    type: 'individual',
    city: 'Kisumu',
    zone: 'CBD',
    signupDate: '2024-01-05',
    kycStatus: 'suspended',
    submittedDocs: 5,
    lastReviewDate: '2024-01-14',
    riskFlag: 'high',
    documents: [
      { id: 'doc10', type: 'government_id', status: 'valid', uploadedDate: '2024-01-06', url: '/docs/id4.pdf' },
      { id: 'doc11', type: 'address_proof', status: 'valid', uploadedDate: '2024-01-06', url: '/docs/address3.pdf' },
      { id: 'doc12', type: 'agent_photo', status: 'valid', uploadedDate: '2024-01-06', url: '/docs/photo2.jpg' },
    ],
    verificationTimeline: {
      signup: '2024-01-05',
      documentSubmission: '2024-01-06',
      reviewStart: '2024-01-07',
      approval: '2024-01-08',
      suspension: '2024-01-14',
    },
    riskHistory: {
      disputes: 5,
      missedPickups: 12,
      complaints: 4,
      priorRejections: 0,
    },
    notes: 'Suspended due to multiple fraud reports',
  },
];

const mockSummary: VerificationSummary = {
  totalAgents: 3420,
  pendingVerification: 418,
  verifiedAgents: 2610,
  rejectedAgents: 212,
  suspendedAgents: 180,
  incompleteKYC: 12,
};

const mockFunnelData: FunnelData[] = [
  { stage: 'Signup Created', count: 5000, percentage: 100 },
  { stage: 'Documents Submitted', count: 4200, percentage: 84 },
  { stage: 'Under Review', count: 3500, percentage: 70 },
  { stage: 'Verified', count: 2610, percentage: 52 },
  { stage: 'Rejected / Suspended', count: 392, percentage: 8 },
];

const mockTrendData: TrendData[] = [
  { date: '2024-01-01', verified: 2400, pending: 350, rejected: 180, suspended: 150 },
  { date: '2024-01-02', verified: 2420, pending: 360, rejected: 185, suspended: 155 },
  { date: '2024-01-03', verified: 2450, pending: 370, rejected: 190, suspended: 160 },
  { date: '2024-01-04', verified: 2480, pending: 380, rejected: 195, suspended: 165 },
  { date: '2024-01-05', verified: 2510, pending: 390, rejected: 200, suspended: 170 },
  { date: '2024-01-06', verified: 2540, pending: 400, rejected: 205, suspended: 175 },
  { date: '2024-01-07', verified: 2570, pending: 410, rejected: 210, suspended: 180 },
  { date: '2024-01-08', verified: 2610, pending: 418, rejected: 212, suspended: 180 },
];


// Main Component
const AgentVerificationPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [summary, setSummary] = useState<VerificationSummary>(mockSummary);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' });

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || agent.kycStatus === selectedStatus;
    const matchesCity = selectedCity === 'all' || agent.city === selectedCity;
    const matchesType = selectedType === 'all' || agent.type === selectedType;
    const matchesRisk = selectedRisk === 'all' || agent.riskFlag === selectedRisk;
    
    return matchesSearch && matchesStatus && matchesCity && matchesType && matchesRisk;
  });

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedAgent(null);
  };

  const handleAgentAction = (action: string, agent: Agent, reason?: string) => {
    switch (action) {
      case 'approve':
        setNotification({
          open: true,
          message: `Agent ${agent.name} has been approved`,
          severity: 'success'
        });
        break;
      case 'reject':
        setNotification({
          open: true,
          message: `Agent ${agent.name} has been rejected: ${reason}`,
          severity: 'error'
        });
        break;
      case 'suspend':
        setNotification({
          open: true,
          message: `Agent ${agent.name} has been suspended: ${reason}`,
          severity: 'error'
        });
        break;
      case 'add_note':
        const note = prompt('Enter compliance note:');
        if (note) {
          setNotification({
            open: true,
            message: `Note added for ${agent.name}`,
            severity: 'success'
          });
        }
        break;
    }
    handleDrawerClose();
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
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Status"
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
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="7days">Last 7 days</MenuItem>
                  <MenuItem value="30days">Last 30 days</MenuItem>
                  <MenuItem value="90days">Last 90 days</MenuItem>
                  <MenuItem value="all">All time</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
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
              
              <Button
                variant="outlined"
                startIcon={<IconDownload size={16} />}
                onClick={() => handleExport('csv')}
              >
                Export
              </Button>
            </Stack>
          </Stack>
        </DashboardCard>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Summary Cards */}
      <Box mt={3}>
        <VerificationSummaryCards 
          summary={summary} 
          onStatusFilter={(status) => {
            if (status === 'incomplete') {
              // Handle incomplete KYC filter
              setSelectedStatus('pending');
            } else {
              setSelectedStatus(status);
            }
          }}
        />
      </Box>

      {/* Charts Row */}
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <KYCFunnelChart data={mockFunnelData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <VerificationTrendChart data={mockTrendData} />
          </Grid>
        </Grid>
      </Box>

      {/* Filters */}
      <Box mt={3}>
        <DashboardCard>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                placeholder="Search by name or agent ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <IconSearch size={16} style={{ marginRight: 8 }} />,
                }}
                sx={{ minWidth: 300 }}
              />
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Risk Level</InputLabel>
                <Select
                  value={selectedRisk}
                  label="Risk Level"
                  onChange={(e) => setSelectedRisk(e.target.value)}
                >
                  <MenuItem value="all">All Risks</MenuItem>
                  <MenuItem value="low">Low Risk</MenuItem>
                  <MenuItem value="medium">Medium Risk</MenuItem>
                  <MenuItem value="high">High Risk</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="outlined"
                startIcon={<IconRefresh size={16} />}
                onClick={handleRefresh}
                disabled={loading}
              >
                Refresh
              </Button>
            </Stack>
          </CardContent>
        </DashboardCard>
      </Box>

      {/* Agents Table */}
      <Box mt={3}>
        <VerificationTable
          agents={filteredAgents}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onAgentClick={handleAgentClick}
          onAgentAction={handleAgentAction}
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
          onAgentAction={handleAgentAction}
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
