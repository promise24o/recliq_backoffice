// Base API response type
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  profile?: {
    avatar?: string;
    phone?: string;
    address?: string;
  };
}

export type UserRole = 'admin' | 'ops' | 'finance' | 'support' | 'agent' | 'recycler';

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export type Permission = 
  | 'users:read' | 'users:write' | 'users:delete'
  | 'agents:read' | 'agents:write' | 'agents:verify'
  | 'transactions:read' | 'transactions:write' | 'transactions:approve'
  | 'wallets:read' | 'wallets:write' | 'wallets:withdraw'
  | 'rewards:read' | 'rewards:write'
  | 'analytics:read'
  | 'system:read' | 'system:write';

// Agent types
export interface Agent {
  id: string;
  userId: string;
  user: User;
  status: AgentStatus;
  verificationStatus: VerificationStatus;
  serviceArea: ServiceArea;
  rating: number;
  totalPickups: number;
  equipment: Equipment[];
  documents: AgentDocument[];
  createdAt: string;
  verifiedAt?: string;
}

export type AgentStatus = 'active' | 'inactive' | 'on_duty' | 'off_duty';

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'needs_review';

export interface ServiceArea {
  type: 'polygon' | 'circle';
  coordinates: number[][] | { center: [number, number]; radius: number };
  address: string;
  city: string;
  state: string;
}

export interface Equipment {
  id: string;
  type: string;
  model: string;
  capacity: number;
  status: 'available' | 'in_use' | 'maintenance';
}

export interface AgentDocument {
  id: string;
  type: 'id_card' | 'license' | 'insurance' | 'certification';
  url: string;
  status: 'pending' | 'verified' | 'rejected';
  expiresAt?: string;
}

// Transaction types
export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  user: User;
  agent?: Agent;
  items: TransactionItem[];
  totalWeight: number;
  totalValue: number;
  rewardPoints: number;
  pickup?: PickupDetails;
  dropOff?: DropOffDetails;
  createdAt: string;
  completedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
}

export type TransactionType = 'pickup' | 'drop_off' | 'withdrawal' | 'reward_claim';

export type TransactionStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rejected';

export interface TransactionItem {
  materialId: string;
  material: Material;
  weight: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  unitPrice: number;
  rewardPoints: number;
  co2Impact: number;
}

export type MaterialCategory = 'plastic' | 'paper' | 'glass' | 'metal' | 'electronics' | 'organic' | 'hazardous';

export interface PickupDetails {
  address: string;
  coordinates: [number, number];
  scheduledAt: string;
  completedAt?: string;
  notes?: string;
  images?: string[];
}

export interface DropOffDetails {
  locationId: string;
  location: DropOffLocation;
  receiptNumber?: string;
  images?: string[];
}

export interface DropOffLocation {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  operatingHours: {
    [key: string]: { open: string; close: string };
  };
  acceptedMaterials: string[];
}

// Wallet types
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  frozenBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
  rewardPoints: number;
  transactions: WalletTransaction[];
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'freeze' | 'unfreeze';
  amount: number;
  description: string;
  referenceId?: string;
  referenceType?: string;
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  bankDetails: BankDetails;
  createdAt: string;
  processedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber?: string;
  swiftCode?: string;
}

// Reward types
export interface Reward {
  id: string;
  title: string;
  description: string;
  type: RewardType;
  value: number;
  pointsRequired: number;
  category: string;
  imageUrl?: string;
  terms?: string;
  isActive: boolean;
  stock?: number;
  claimedCount: number;
  validUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export type RewardType = 'discount' | 'voucher' | 'cashback' | 'product' | 'service';

export interface RewardClaim {
  id: string;
  userId: string;
  rewardId: string;
  reward: Reward;
  status: 'pending' | 'approved' | 'rejected' | 'redeemed';
  claimedAt: string;
  processedAt?: string;
  redemptionCode?: string;
  expiryDate?: string;
}

// Analytics types
export interface OverviewStats {
  totalUsers: number;
  activeUsers: number;
  totalAgents: number;
  activeAgents: number;
  totalTransactions: number;
  pendingTransactions: number;
  completedTransactions: number;
  totalRevenue: number;
  totalWithdrawals: number;
  growthRate: {
    users: number;
    transactions: number;
    revenue: number;
  };
  period: string;
}

export interface EnvironmentalImpact {
  totalWasteRecycled: number;
  totalCO2Saved: number;
  treesEquivalent: number;
  waterSaved: number;
  energySaved: number;
  breakdown: {
    [category in MaterialCategory]: {
      weight: number;
      co2Saved: number;
      trend: number;
    };
  };
  trend: {
    daily: Array<{
      date: string;
      waste: number;
      co2: number;
    }>;
    monthly: Array<{
      month: string;
      waste: number;
      co2: number;
    }>;
  };
}

export interface FinancialMetrics {
  totalRevenue: number;
  totalWithdrawals: number;
  pendingWithdrawals: number;
  averageTransactionValue: number;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
    transactions: number;
    withdrawals: number;
  }>;
  revenueByCategory: {
    [category: string]: number;
  };
  topEarners: Array<{
    userId: string;
    userName: string;
    totalEarned: number;
    transactions: number;
  }>;
}

export interface OperationsMetrics {
  pickupRequests: number;
  completedPickups: number;
  averageCompletionTime: number;
  pickupSuccessRate: number;
  agentPerformance: Array<{
    agentId: string;
    agentName: string;
    completedPickups: number;
    averageRating: number;
    completionTime: number;
  }>;
  locationMetrics: Array<{
    locationId: string;
    locationName: string;
    dropOffs: number;
    totalWeight: number;
  }>;
}

// System types
export interface SystemSettings {
  id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object';
  description: string;
  category: string;
  isPublic: boolean;
  updatedBy: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  user: User;
  action: string;
  resource: string;
  resourceId?: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  field?: string;
}

// Filter and search types
export interface FilterOptions {
  search?: string;
  status?: string | string[];
  role?: string | string[];
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Common request types
export interface CreateRequest<T> {
  data: T;
}

export interface UpdateRequest<T> {
  id: string;
  data: Partial<T>;
}

export interface BulkUpdateRequest<T> {
  ids: string[];
  data: Partial<T>;
}
