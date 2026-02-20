'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TablePagination,
  Menu,
  MenuItem,
  Stack,
  TextField,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import {
  MoreVertical,
  Search,
  MapPin,
  Edit,
  Trash2,
  Power,
  PowerOff,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { City } from '@/hooks/useZones';
import { format } from 'date-fns';

interface CitiesTableProps {
  cities: City[];
  onEdit: (city: City) => void;
  onDelete: (cityId: string) => void;
  onEnable: (cityId: string) => void;
  onDisable: (cityId: string) => void;
}

const CitiesTable: React.FC<CitiesTableProps> = ({
  cities,
  onEdit,
  onDelete,
  onEnable,
  onDisable,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, city: City) => {
    setAnchorEl(event.currentTarget);
    setSelectedCity(city);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCity(null);
  };

  const handleEdit = () => {
    if (selectedCity) {
      onEdit(selectedCity);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (selectedCity) {
      onDelete(selectedCity.id);
    }
    setDeleteDialogOpen(false);
    setSelectedCity(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleToggleStatus = () => {
    if (selectedCity) {
      if (selectedCity.isActive) {
        onDisable(selectedCity.id);
      } else {
        onEnable(selectedCity.id);
      }
    }
    handleMenuClose();
  };

  const filteredCities = cities.filter((city) => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        city.name.toLowerCase().includes(search) ||
        city.state.toLowerCase().includes(search) ||
        city.timezone.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const paginatedCities = filteredCities.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={600}>
            Cities ({filteredCities.length})
          </Typography>
          <TextField
            size="small"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
        </Stack>
      </Box>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>City Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>State</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Coordinates</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Timezone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <Stack spacing={2} alignItems="center">
                    <MapPin size={48} color="#9CA3AF" />
                    <Typography variant="body1" color="text.secondary">
                      {searchTerm ? 'No cities found matching your search' : 'No cities available'}
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : (
              paginatedCities.map((city) => (
                <TableRow key={city.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <MapPin size={16} color="#3B82F6" />
                      <Typography variant="body2" fontWeight={500}>
                        {city.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{city.state}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {city.center.lat.toFixed(4)}, {city.center.lng.toFixed(4)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{city.timezone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={city.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      icon={city.isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      sx={{
                        bgcolor: city.isActive ? 'success.lighter' : 'error.lighter',
                        color: city.isActive ? 'success.main' : 'error.main',
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: city.isActive ? 'success.main' : 'error.main',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(city.createdAt), 'MMM dd, yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, city)}
                    >
                      <MoreVertical size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredCities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleEdit}>
          <Edit size={16} style={{ marginRight: 8 }} />
          Edit City
        </MenuItem>
        <MenuItem onClick={handleToggleStatus}>
          {selectedCity?.isActive ? (
            <>
              <PowerOff size={16} style={{ marginRight: 8 }} />
              Disable City
            </>
          ) : (
            <>
              <Power size={16} style={{ marginRight: 8 }} />
              Enable City
            </>
          )}
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete City
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete City</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{selectedCity?.name}</strong>?
            <br />
            <br />
            <Typography variant="body2" color="error.main">
              ⚠️ Note: You cannot delete a city if it has associated zones. Please delete or reassign zones first.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CitiesTable;
