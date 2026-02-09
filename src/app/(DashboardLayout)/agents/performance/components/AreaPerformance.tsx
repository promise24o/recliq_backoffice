'use client'
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AreaData {
  area: string;
  activeAgents: number;
  pickups: number;
  avgETA: number;
  successRate: number;
  demandIndex: number;
}

interface AreaPerformanceProps {
  areaData: AreaData[];
  selectedArea: string;
}

const AreaPerformance: React.FC<AreaPerformanceProps> = ({ areaData, selectedArea }) => {
  const getDemandColor = (index: number) => {
    if (index >= 8) return 'error';
    if (index >= 6) return 'warning';
    return 'success';
  };

  const getSuccessColor = (rate: number) => {
    if (rate >= 95) return 'success';
    if (rate >= 90) return 'warning';
    return 'error';
  };

  const filteredData = selectedArea === 'all' 
    ? areaData 
    : areaData.filter(area => 
        area.area.toLowerCase().includes(selectedArea.toLowerCase())
      );

  return (
    <DashboardCard title="Area Performance">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Area</TableCell>
              <TableCell align="center">Active Agents</TableCell>
              <TableCell align="center">Pickups</TableCell>
              <TableCell align="center">Avg ETA</TableCell>
              <TableCell align="center">Success %</TableCell>
              <TableCell align="center">Demand Index</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((area, index) => (
              <TableRow key={area.area} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {area.area}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {area.activeAgents}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" fontWeight={600}>
                    {area.pickups}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {area.avgETA} mins
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Typography 
                      variant="body2" 
                      color={getSuccessColor(area.successRate) + '.main' as any}
                    >
                      {area.successRate}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={area.successRate}
                      color={getSuccessColor(area.successRate) as any}
                      sx={{ width: 30, height: 4, borderRadius: 2 }}
                    />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Typography 
                      variant="body2" 
                      color={getDemandColor(area.demandIndex) + '.main' as any}
                    >
                      {area.demandIndex}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={area.demandIndex * 10}
                      color={getDemandColor(area.demandIndex) as any}
                      sx={{ width: 30, height: 4, borderRadius: 2 }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default AreaPerformance;
