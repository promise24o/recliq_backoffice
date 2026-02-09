'use client';
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  Stack,
  Divider,
  Grid,
  Paper,
  Button,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip
} from '@mui/material';
import {
  X,
  Plus,
  Trash2,
  FileText,
  Calendar,
  DollarSign,
  Building,
  Package,
  AlertTriangle,
  CheckCircle,
  Info,
  Calculator,
  Save,
  Send
} from 'lucide-react';
import type { 
  CreateInvoiceRequest, 
  WasteType,
  Currency,
  InvoiceType
} from '../types';
import { formatCurrency } from '../mockData';

interface CreateInvoiceDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (invoice: any) => void;
}

interface ClientOption {
  id: string;
  name: string;
}

interface ContractOption {
  id: string;
  contractNumber: string;
  clientId: string;
}

interface CollectionOption {
  collectionId: string;
  date: string;
  location: string;
  totalWeight: number;
  clientId: string;
  wasteCategories: string[];
}

interface LineItem {
  id: string;
  collectionId?: string;
  wasteType: WasteType;
  weight: number;
  unitPrice: number;
  description: string;
  specialConditions: string[];
}

const CreateInvoiceDrawer: React.FC<CreateInvoiceDrawerProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  // Mock data - in real app this would come from props or API
  const mockClients: ClientOption[] = [
    { id: 'ENT001', name: 'TechHub Nigeria Ltd' },
    { id: 'ENT002', name: 'Lagos Manufacturing Complex' },
    { id: 'ENT003', name: 'EcoTech Solutions' }
  ];

  const mockContracts: ContractOption[] = [
    { id: 'CONTRACT001', contractNumber: 'EC-2024-001', clientId: 'ENT001' },
    { id: 'CONTRACT002', contractNumber: 'EC-2024-002', clientId: 'ENT002' },
    { id: 'CONTRACT003', contractNumber: 'EC-2024-003', clientId: 'ENT003' }
  ];

  const mockCollections: CollectionOption[] = [
    {
      collectionId: 'COLL001',
      date: '2024-01-15',
      location: 'TechHub Headquarters',
      totalWeight: 85,
      clientId: 'ENT001',
      wasteCategories: ['paper', 'e_waste', 'plastic']
    },
    {
      collectionId: 'COLL002',
      date: '2024-01-17',
      location: 'Manufacturing Plant',
      totalWeight: 550,
      clientId: 'ENT002',
      wasteCategories: ['metal', 'industrial', 'plastic']
    },
    {
      collectionId: 'COLL003',
      date: '2024-01-28',
      location: 'EcoTech Office',
      totalWeight: 70,
      clientId: 'ENT003',
      wasteCategories: ['paper', 'e_waste', 'plastic']
    }
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form state
  const [formData, setFormData] = useState<CreateInvoiceRequest>({
    clientId: '',
    contractId: '',
    invoiceType: 'single_collection',
    billingPeriod: {
      startDate: '',
      endDate: ''
    },
    collectionIds: [],
    dueDate: '',
    currency: 'NGN',
    notes: ''
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  // Waste type pricing (mock data - in real app this would come from contract)
  const wasteTypePricing: Record<WasteType, number> = {
    paper: 150,
    plastic: 120,
    metal: 180,
    glass: 100,
    organic: 80,
    e_waste: 250,
    hazardous: 300,
    textile: 90,
    wood: 110,
    industrial: 220,
    mixed: 130
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field: keyof CreateInvoiceRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleClientChange = (clientId: string) => {
    handleInputChange('clientId', clientId);
    
    // Auto-select first contract for this client
    const clientContracts = mockContracts.filter((c: ContractOption) => c.clientId === clientId);
    if (clientContracts.length > 0) {
      handleInputChange('contractId', clientContracts[0].id);
    }
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      wasteType: 'paper',
      weight: 0,
      unitPrice: wasteTypePricing.paper,
      description: '',
      specialConditions: []
    };
    setLineItems(prev => [...prev, newItem]);
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeLineItem = (id: string) => {
    setLineItems(prev => prev.filter(item => item.id !== id));
  };

  const addCollectionToInvoice = (collectionId: string) => {
    if (!selectedCollections.includes(collectionId)) {
      setSelectedCollections(prev => [...prev, collectionId]);
      
      // Add line item for this collection
      const collection = mockCollections.find((c: CollectionOption) => c.collectionId === collectionId);
      if (collection) {
        const newItem: LineItem = {
          id: Date.now().toString(),
          collectionId: collectionId,
          wasteType: collection.wasteCategories[0] as WasteType || 'paper',
          weight: collection.totalWeight,
          unitPrice: wasteTypePricing[collection.wasteCategories[0] as WasteType] || 150,
          description: `Collection from ${collection.location}`,
          specialConditions: []
        };
        setLineItems(prev => [...prev, newItem]);
      }
    }
  };

  const removeCollectionFromInvoice = (collectionId: string) => {
    setSelectedCollections(prev => prev.filter(id => id !== collectionId));
    setLineItems(prev => prev.filter(item => item.collectionId !== collectionId));
  };

  const calculateTotals = () => {
    const subtotal = lineItems.reduce((sum, item) => sum + (item.weight * item.unitPrice), 0);
    const taxAmount = subtotal * 0.15; // 15% tax
    const totalAmount = subtotal + taxAmount;
    
    return { subtotal, taxAmount, totalAmount };
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.clientId) newErrors.clientId = 'Client is required';
    if (!formData.contractId) newErrors.contractId = 'Contract is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (lineItems.length === 0) newErrors.lineItems = 'At least one line item is required';
    
    if (formData.invoiceType !== 'single_collection') {
      if (!formData.billingPeriod.startDate) newErrors.startDate = 'Start date is required';
      if (!formData.billingPeriod.endDate) newErrors.endDate = 'End date is required';
    }
    
    // Validate line items
    lineItems.forEach((item, index) => {
      if (item.weight <= 0) newErrors[`weight_${index}`] = 'Weight must be greater than 0';
      if (item.unitPrice <= 0) newErrors[`unitPrice_${index}`] = 'Unit price must be greater than 0';
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const totals = calculateTotals();
      const newInvoice = {
        id: `INV${Date.now()}`,
        invoiceNumber: `INV-2024-${Date.now()}`,
        ...formData,
        lineItems: lineItems.map(item => ({
          lineItemId: item.id,
          collectionId: item.collectionId,
          wasteType: item.wasteType,
          weight: item.weight,
          unitPrice: item.unitPrice,
          lineTotal: item.weight * item.unitPrice,
          description: item.description,
          specialConditions: item.specialConditions
        })),
        subtotal: totals.subtotal,
        taxAmount: totals.taxAmount,
        totalAmount: totals.totalAmount,
        paidAmount: 0,
        outstandingAmount: totals.totalAmount,
        status: 'draft',
        createdAt: new Date().toISOString(),
        createdBy: 'current_user'
      };
      
      onSuccess(newInvoice);
      onClose();
      resetForm();
    } catch (error) {
      setErrors({ submit: 'Failed to create invoice. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      clientId: '',
      contractId: '',
      invoiceType: 'single_collection',
      billingPeriod: {
        startDate: '',
        endDate: ''
      },
      collectionIds: [],
      dueDate: '',
      currency: 'NGN',
      notes: ''
    });
    setLineItems([]);
    setSelectedCollections([]);
    setErrors({});
    setActiveTab(0);
  };

  const handleClose = () => {
    if (loading) return;
    onClose();
    resetForm();
  };

  const totals = calculateTotals();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', md: 800 },
          p: 0
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: '#f8fafc'
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <FileText size={24} color="#3b82f6" />
              <Box>
                <Typography variant="h6" fontWeight="600">
                  Create New Invoice
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Generate enterprise invoice
                </Typography>
              </Box>
            </Stack>
            
            <IconButton onClick={handleClose} disabled={loading}>
              <X size={20} />
            </IconButton>
          </Stack>
        </Box>

        {/* Form Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Basic Information */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Basic Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth size="small" error={!!errors.clientId}>
                    <InputLabel>Client *</InputLabel>
                    <Select
                      value={formData.clientId}
                      label="Client *"
                      onChange={(e) => handleClientChange(e.target.value)}
                    >
                      {mockClients.map((client: ClientOption) => (
                        <MenuItem key={client.id} value={client.id}>
                          {client.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.clientId && (
                      <Typography variant="caption" color="error">
                        {errors.clientId}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth size="small" error={!!errors.contractId}>
                    <InputLabel>Contract *</InputLabel>
                    <Select
                      value={formData.contractId}
                      label="Contract *"
                      onChange={(e) => handleInputChange('contractId', e.target.value)}
                    >
                      {mockContracts
                        .filter((c: ContractOption) => !formData.clientId || c.clientId === formData.clientId)
                        .map((contract: ContractOption) => (
                          <MenuItem key={contract.id} value={contract.id}>
                            {contract.contractNumber}
                          </MenuItem>
                        ))}
                    </Select>
                    {errors.contractId && (
                      <Typography variant="caption" color="error">
                        {errors.contractId}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Invoice Type</InputLabel>
                    <Select
                      value={formData.invoiceType}
                      label="Invoice Type"
                      onChange={(e) => handleInputChange('invoiceType', e.target.value)}
                    >
                      <MenuItem value="single_collection">Single Collection</MenuItem>
                      <MenuItem value="weekly_billing">Weekly Billing</MenuItem>
                      <MenuItem value="monthly_billing">Monthly Billing</MenuItem>
                      <MenuItem value="custom_period">Custom Period</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={formData.currency}
                      label="Currency"
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                    >
                      <MenuItem value="NGN">NGN</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {formData.invoiceType !== 'single_collection' && (
                  <>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        label="Billing Period Start"
                        value={formData.billingPeriod.startDate}
                        onChange={(e) => handleInputChange('billingPeriod', { 
                          ...formData.billingPeriod, 
                          startDate: e.target.value 
                        })}
                        error={!!errors.startDate}
                        helperText={errors.startDate}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        label="Billing Period End"
                        value={formData.billingPeriod.endDate}
                        onChange={(e) => handleInputChange('billingPeriod', { 
                          ...formData.billingPeriod, 
                          endDate: e.target.value 
                        })}
                        error={!!errors.endDate}
                        helperText={errors.endDate}
                      />
                    </Grid>
                  </>
                )}

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Due Date *"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    error={!!errors.dueDate}
                    helperText={errors.dueDate}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Collections Selection (for single collection) */}
            {formData.invoiceType === 'single_collection' && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Select Collections
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Select collections to include in this invoice
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Collection ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {mockCollections
                            .filter((c: CollectionOption) => !formData.clientId || c.clientId === formData.clientId)
                            .map((collection: CollectionOption) => (
                              <TableRow key={collection.collectionId}>
                                <TableCell>{collection.collectionId}</TableCell>
                                <TableCell>{new Date(collection.date).toLocaleDateString()}</TableCell>
                                <TableCell>{collection.location}</TableCell>
                                <TableCell>{collection.totalWeight} kg</TableCell>
                                <TableCell>
                                  <Button
                                    size="small"
                                    variant={selectedCollections.includes(collection.collectionId) ? "contained" : "outlined"}
                                    onClick={() => 
                                      selectedCollections.includes(collection.collectionId)
                                        ? removeCollectionFromInvoice(collection.collectionId)
                                        : addCollectionToInvoice(collection.collectionId)
                                    }
                                  >
                                    {selectedCollections.includes(collection.collectionId) ? 'Remove' : 'Add'}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            )}

            {/* Line Items */}
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="600">
                  Line Items
                </Typography>
                <Button
                  startIcon={<Plus />}
                  onClick={addLineItem}
                  variant="outlined"
                  size="small"
                >
                  Add Line Item
                </Button>
              </Stack>

              {errors.lineItems && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errors.lineItems}
                </Alert>
              )}

              {lineItems.length === 0 ? (
                <Alert severity="info">
                  No line items added yet. Click "Add Line Item" to start building your invoice.
                </Alert>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Waste Type</TableCell>
                        <TableCell align="right">Weight (kg)</TableCell>
                        <TableCell align="right">Unit Price</TableCell>
                        <TableCell align="right">Line Total</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lineItems.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <FormControl size="small" fullWidth>
                              <Select
                                value={item.wasteType}
                                onChange={(e) => {
                                  const newWasteType = e.target.value as WasteType;
                                  updateLineItem(item.id, 'wasteType', newWasteType);
                                  updateLineItem(item.id, 'unitPrice', wasteTypePricing[newWasteType]);
                                }}
                              >
                                <MenuItem value="paper">Paper</MenuItem>
                                <MenuItem value="plastic">Plastic</MenuItem>
                                <MenuItem value="metal">Metal</MenuItem>
                                <MenuItem value="glass">Glass</MenuItem>
                                <MenuItem value="organic">Organic</MenuItem>
                                <MenuItem value="e_waste">E-Waste</MenuItem>
                                <MenuItem value="hazardous">Hazardous</MenuItem>
                                <MenuItem value="textile">Textile</MenuItem>
                                <MenuItem value="wood">Wood</MenuItem>
                                <MenuItem value="industrial">Industrial</MenuItem>
                                <MenuItem value="mixed">Mixed</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              value={item.weight}
                              onChange={(e) => updateLineItem(item.id, 'weight', parseFloat(e.target.value) || 0)}
                              error={!!errors[`weight_${index}`]}
                              helperText={errors[`weight_${index}`]}
                              InputProps={{ inputProps: { min: 0 } }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                              error={!!errors[`unitPrice_${index}`]}
                              helperText={errors[`unitPrice_${index}`]}
                              InputProps={{ inputProps: { min: 0 } }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight="500">
                              {formatCurrency(item.weight * item.unitPrice, formData.currency)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              value={item.description}
                              onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                              placeholder="Description"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => removeLineItem(item.id)}
                              color="error"
                            >
                              <Trash2 size={16} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>

            {/* Notes */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Add any notes or special instructions for this invoice..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </Paper>

            {/* Summary */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Invoice Summary
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">
                    {formatCurrency(totals.subtotal, formData.currency)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Tax (15%)</Typography>
                  <Typography variant="body2">
                    {formatCurrency(totals.taxAmount, formData.currency)}
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" fontWeight="600">Total Amount</Typography>
                  <Typography variant="body2" fontWeight="600" color="primary">
                    {formatCurrency(totals.totalAmount, formData.currency)}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Box>

        {/* Footer Actions */}
        <Box sx={{ 
          p: 3, 
          borderTop: 1, 
          borderColor: 'divider',
          bgcolor: '#f8fafc'
        }}>
          {errors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.submit}
            </Alert>
          )}
          
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Invoice'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CreateInvoiceDrawer;
