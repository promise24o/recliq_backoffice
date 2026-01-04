import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Define role permissions
export const ROLE_PERMISSIONS = {
  'OPS_ADMIN': [
    '/dashboard', '/users', '/agents', '/pickups', '/rewards', 
    '/referrals', '/b2b', '/operations'
  ],
  'FINANCE_ADMIN': [
    '/dashboard', '/finance', '/wallet', '/payments', '/transactions'
  ],
  'STRATEGY_ADMIN': [
    '/dashboard', '/performance', '/insights', '/analytics', '/reports'
  ],
  'SUPER_ADMIN': [
    '/' // Full access to all routes
  ]
};

export interface JWTPayload {
  userId: string;
  email: string;
  adminSubRole: string;
  iat: number;
  exp: number;
}

// Verify JWT token and get user role
export async function verifyToken(request: NextRequest): Promise<JWTPayload | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Check if user has permission to access a route
export function hasPermission(userRole: string, pathname: string): boolean {
  if (!userRole) return false;
  
  // SUPER_ADMIN has access to everything
  if (userRole === 'SUPER_ADMIN') return true;
  
  const allowedRoutes = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS];
  if (!allowedRoutes) return false;
  
  // Check if the pathname starts with any allowed route
  return allowedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
}

// Server-side role validation middleware
export async function validateUserAccess(request: NextRequest, pathname: string): Promise<{
  isValid: boolean;
  userRole?: string;
  error?: string;
}> {
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/auth/login', '/auth/two-steps', '/auth/forgot-password'];
  if (publicRoutes.includes(pathname)) {
    return { isValid: true };
  }

  // Verify token
  const user = await verifyToken(request);
  if (!user) {
    return { 
      isValid: false, 
      error: 'Authentication required' 
    };
  }

  // Check permissions
  if (!hasPermission(user.adminSubRole, pathname)) {
    return { 
      isValid: false, 
      error: 'Insufficient permissions',
      userRole: user.adminSubRole 
    };
  }

  return { 
    isValid: true, 
    userRole: user.adminSubRole 
  };
}
