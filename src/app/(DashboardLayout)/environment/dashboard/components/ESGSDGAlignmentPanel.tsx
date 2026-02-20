'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  ChevronDown,
  Download,
  RefreshCw,
  Info,
  Target,
  Globe,
  Shield,
  TrendingUp,
  Award,
  FileText,
  CheckCircle
} from 'lucide-react';
import { ESGReport } from '../types';
import { 
  formatWeight, 
  formatCO2, 
  formatTrees,
  formatPercentage,
  getSDGGoalColor
} from '../mockData';

interface ESGSDGAlignmentPanelProps {
  esgReport: ESGReport;
  onExport?: (format: 'pdf' | 'excel') => void;
  showActions?: boolean;
}

const ESGSDGAlignmentPanel: React.FC<ESGSDGAlignmentPanelProps> = ({
  esgReport,
  onExport,
  showActions = true
}) => {
  const [expandedSDG, setExpandedSDG] = useState<string | false>(false);

  const handleSDGChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSDG(isExpanded ? panel : false);
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    if (onExport) {
      onExport(format);
    }
  };

  const handleRefresh = () => {
    console.log('Refreshing ESG and SDG alignment data');
  };

  // Calculate ESG category totals
  const environmentalMetrics = esgReport?.sdgAlignment?.reportableMetrics?.filter((m: any) => m.category === 'environmental') || [];
  const socialMetrics = esgReport?.sdgAlignment?.reportableMetrics?.filter((m: any) => m.category === 'social') || [];
  const governanceMetrics = esgReport?.sdgAlignment?.reportableMetrics?.filter((m: any) => m.category === 'governance') || [];

  const getESGIcon = (category: string) => {
    switch (category) {
      case 'environmental':
        return <Globe size={20} color="#10B981" />;
      case 'social':
        return <Target size={20} color="#3B82F6" />;
      case 'governance':
        return <Shield size={20} color="#8B5CF6" />;
      default:
        return <FileText size={20} color="#6B7280" />;
    }
  };

  const getESGColor = (category: string) => {
    switch (category) {
      case 'environmental':
        return '#10B981';
      case 'social':
        return '#3B82F6';
      case 'governance':
        return '#8B5CF6';
      default:
        return '#6B7280';
    }
  };

  return (
    <Grid container spacing={3}>
      {/* ESG Summary Cards */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: '#10B98120',
                  mr: 1
                }}
              >
                <Globe size={16} color="#10B981" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Environmental
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#10B981">
              {environmentalMetrics.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Metrics tracked
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: '#3B82F620',
                  mr: 1
                }}
              >
                <Target size={16} color="#3B82F6" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Social
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#3B82F6">
              {socialMetrics.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Metrics tracked
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: '#8B5CF620',
                  mr: 1
                }}
              >
                <Shield size={16} color="#8B5CF6" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Governance
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#8B5CF6">
              {governanceMetrics.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Metrics tracked
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: '#F59E0B20',
                  mr: 1
                }}
              >
                <Award size={16} color="#F59E0B" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                SDG Goals
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="600" color="#F59E0B">
              {esgReport?.sdgContributions?.length || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Goals impacted
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* ESG Metrics Panel */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}
            >
              <Typography variant="h6" fontWeight="600">
                ESG Metrics
              </Typography>
              {showActions && (
                <IconButton size="small" onClick={handleRefresh}>
                  <RefreshCw size={16} />
                </IconButton>
              )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['environmental', 'social', 'governance'].map((category) => {
                const categoryMetrics = esgReport?.metrics?.filter(m => m.category === category) || [];
                return (
                  <Box key={category} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {getESGIcon(category)}
                      <Typography variant="subtitle1" fontWeight="600" sx={{ ml: 1 }}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Typography>
                    </Box>
                    
                    {categoryMetrics.map((metric: any) => (
                      <Box key={metric.metricId || metric.metricName} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" fontWeight="500">
                            {metric.metricName.replace(/_/g, ' ').charAt(0).toUpperCase() + 
                             metric.metricName.replace(/_/g, ' ').slice(1)}
                          </Typography>
                          <Typography variant="body2" color={getESGColor(category)}>
                            {metric.value} {metric.unit}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                          {metric.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={metric.verificationStatus}
                            size="small"
                            color={metric.verificationStatus === 'verified' ? 'success' : 'default'}
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            Source: {metric.dataSource}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* SDG Contributions Panel */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}
            >
              <Typography variant="h6" fontWeight="600">
                UN SDG Alignment
              </Typography>
              {showActions && (
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Download size={16} />}
                  onClick={() => handleExport('pdf')}
                >
                  Export Report
                </Button>
              )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {esgReport?.sdgContributions?.map((sdg: any) => {
                const sdgGoal = sdg.goal || `SDG_${sdg.sdgNumber}`;
                const sdgNumber = sdg.sdgNumber || sdgGoal.replace('SDG_', '');
                const sdgTitle = sdg.sdgTitle || sdg.description || sdgGoal;
                const sdgDescription = sdg.sdgDescription || sdg.description || '';
                const progressPct = sdg.progressPercentage ?? sdg.targetAchievement ?? 0;
                const contribution = sdg.totalContribution ?? sdg.impactWeight ?? 0;
                const unit = sdg.unit || 'kg';
                const initiatives = sdg.initiatives || [];

                return (
                  <Accordion
                    key={sdgGoal}
                    expanded={expandedSDG === `sdg-${sdgNumber}`}
                    onChange={handleSDGChange(`sdg-${sdgNumber}`)}
                  >
                    <AccordionSummary expandIcon={<ChevronDown />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: getSDGGoalColor(sdgGoal),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            mr: 2
                          }}
                        >
                          {sdgNumber}
                        </Box>
                        <Box flex={1}>
                          <Typography variant="subtitle2" fontWeight="600">
                            {sdgTitle}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {sdgDescription}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" fontWeight="600" color="primary">
                            {contribution} {unit}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatPercentage(progressPct)}
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ p: 2 }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" fontWeight="500" mb={1}>
                            Target Achievement
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(progressPct, 100)}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: '#e0e0e0',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: getSDGGoalColor(sdgGoal),
                                borderRadius: 4
                              }
                            }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            {progressPct >= 100 ? (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CheckCircle size={12} color="#10B981" />
                                Target achieved
                              </Box>
                            ) : (
                              `${(100 - progressPct).toFixed(1)}% to target`
                            )}
                          </Typography>
                        </Box>

                        {initiatives.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight="500" mb={1}>
                              Contributing Initiatives
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {initiatives.map((initiative: string) => (
                                <Chip
                                  key={initiative}
                                  label={initiative.replace(/_/g, ' ').charAt(0).toUpperCase() + 
                                         initiative.replace(/_/g, ' ').slice(1)}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </Box>
                        )}

                        <Box>
                          <Typography variant="body2" fontWeight="500" mb={1}>
                            Impact Details
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Total contribution: {contribution} {unit}
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Compliance Frameworks */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="600" mb={2}>
              Compliance Frameworks
            </Typography>
              <Typography variant="body2" color="text.secondary">
                Alignment Score: {formatPercentage(esgReport?.sdgAlignment?.alignmentScore || 0)}
              </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Info */}
      <Grid size={{ xs: 12 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: 2
          }}
        >
          <Typography variant="caption" color="text.secondary">
            ESG and SDG alignment data is calculated from verified impact metrics and follows international reporting standards
          </Typography>
          <Tooltip title="All ESG metrics are verified and auditable">
            <IconButton size="small">
              <Info size={14} />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ESGSDGAlignmentPanel;
