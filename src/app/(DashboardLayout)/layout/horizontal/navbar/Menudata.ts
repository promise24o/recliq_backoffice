import {
  IconHome,
  IconCurrencyDollar,
  IconChartLine,
  IconUsers,
  IconUserCheck,
  IconRecycle,
  IconGift,
  IconBuilding,
  IconLeaf,
  IconShieldCheck,
  IconSettings,
  IconUser,
  IconLogout,
  IconTrendingUp,
  IconWallet,
  IconArrowUp,
  IconArrowDown,
  IconFileText,
  IconClock,
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconEye,
  IconBan,
  IconEdit,
  IconMapPin,
  IconCalendar,
  IconScale,
  IconTrophy,
  IconStar,
  IconCoins,
  IconHistory,
  IconFileCertificate,
  IconReceipt,
  IconTree,
  IconCloud,
  IconDownload,
  IconFlag,
  IconClipboard,
  IconLock,
  IconKey,
  IconBell,
  IconPlug,
  IconActivity,
  IconUserCircle,
  IconPercentage,
  IconToggleLeft,
  IconMessage,
  IconMail,
  IconPoint,
} from '@tabler/icons-react';
import { uniqueId } from "lodash";

interface NavItem {
  id?: string;
  title?: string;
  href?: string;
  icon?: any;
  badge?: string;
  roles?: string[];
  subheader?: string;
  children?: NavItem[];
  chip?: string;
  chipColor?: string;
  description?: string;
}

// Role-based menu visibility configuration
const ROLE_ACCESS = {
  'OPS_ADMIN': ['Dashboard', 'Users (Recyclers)', 'Agents', 'Pickups & Recycling'],
  'FINANCE_ADMIN': ['Finance', 'Wallet Float', 'Outgoing Payments'],
  'STRATEGY_ADMIN': ['Performance & Insights'],
  'SUPER_ADMIN': ['all'] // Full access
};

// Role constants for better maintainability
const ROLES = {
  OPS_ADMIN: ['OPS_ADMIN'] as string[],
  FINANCE_ADMIN: ['FINANCE_ADMIN'] as string[],
  STRATEGY_ADMIN: ['STRATEGY_ADMIN'] as string[],
  SUPER_ADMIN: ['SUPER_ADMIN'] as string[],
  OPS_AND_SUPER: ['OPS_ADMIN', 'SUPER_ADMIN'] as string[],
  FINANCE_AND_SUPER: ['FINANCE_ADMIN', 'SUPER_ADMIN'] as string[],
  STRATEGY_AND_SUPER: ['STRATEGY_ADMIN', 'SUPER_ADMIN'] as string[],
  ALL_ROLES: ['OPS_ADMIN', 'FINANCE_ADMIN', 'STRATEGY_ADMIN', 'SUPER_ADMIN'] as string[]
};

// Check if user role has access to menu item
const hasAccess = (itemTitle: string | undefined, userRole?: string): boolean => {
  if (!userRole || !itemTitle) return false;
  
  const roleAccess = ROLE_ACCESS[userRole as keyof typeof ROLE_ACCESS];
  if (!roleAccess) return false;
  
  if (roleAccess.includes('all')) return true;
  return roleAccess.includes(itemTitle);
};

// Main navigation structure
const navigationItems: NavItem[] = [
  {
    subheader: 'MAIN',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    href: '/',
    icon: IconHome,
    roles: ROLES.OPS_AND_SUPER,
    children: [
      {
        id: uniqueId(),
        title: 'Overview',
        href: '/',
        icon: IconActivity,
      },
      {
        id: uniqueId(),
        title: 'System Health',
        href: '/dashboard/health',
        icon: IconTrendingUp,
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Finance',
    href: '/finance',
    icon: IconCurrencyDollar,
    roles: ROLES.FINANCE_AND_SUPER,
    children: [
      {
        id: uniqueId(),
        title: 'Revenue Overview',
        href: '/finance/revenue',
        icon: IconArrowUp,
        children: [
          {
            id: uniqueId(),
            title: 'Service Fees',
            href: '/finance/revenue/service-fees',
            icon: IconWallet,
          },
          {
            id: uniqueId(),
            title: 'B2B Payments',
            href: '/finance/revenue/b2b',
            icon: IconBuilding,
          },
          {
            id: uniqueId(),
            title: 'Agent Commissions',
            href: '/finance/revenue/commissions',
            icon: IconUserCheck,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Incoming Payments',
        href: '/finance/incoming',
        icon: IconArrowDown,
        children: [
          {
            id: uniqueId(),
            title: 'User Payments',
            href: '/finance/incoming/users',
            icon: IconUsers,
          },
          {
            id: uniqueId(),
            title: 'Enterprise Payments',
            href: '/finance/incoming/enterprise',
            icon: IconBuilding,
          },
          {
            id: uniqueId(),
            title: 'Payment Status',
            href: '/finance/incoming/status',
            icon: IconCheck,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Outgoing Payments',
        href: '/finance/outgoing',
        icon: IconArrowUp,
        children: [
          {
            id: uniqueId(),
            title: 'Agent Payouts',
            href: '/finance/outgoing/agents',
            icon: IconUserCheck,
          },
          {
            id: uniqueId(),
            title: 'User Withdrawals',
            href: '/finance/outgoing/withdrawals',
            icon: IconWallet,
          },
          {
            id: uniqueId(),
            title: 'Refunds & Reversals',
            href: '/finance/outgoing/refunds',
            icon: IconX,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Wallet Float',
        href: '/finance/wallet',
        icon: IconWallet,
        children: [
          {
            id: uniqueId(),
            title: 'Platform Balance',
            href: '/finance/wallet/balance',
            icon: IconScale,
          },
          {
            id: uniqueId(),
            title: 'Escrow Amounts',
            href: '/finance/wallet/escrow',
            icon: IconLock,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Settlement & Reconciliation',
        href: '/finance/settlement',
        icon: IconFileText,
        children: [
          {
            id: uniqueId(),
            title: 'Daily Reconciliation',
            href: '/finance/settlement/daily',
            icon: IconCalendar,
          },
          {
            id: uniqueId(),
            title: 'Provider Reports',
            href: '/finance/settlement/providers',
            icon: IconReceipt,
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Performance & Insights',
    href: '/performance',
    icon: IconChartLine,
    roles: ROLES.STRATEGY_AND_SUPER,
    children: [
      {
        id: uniqueId(),
        title: 'Agent Performance',
        href: '/performance/agents',
        icon: IconUserCheck,
        children: [
          {
            id: uniqueId(),
            title: 'Pickups Completed',
            href: '/performance/agents/pickups',
            icon: IconCheck,
          },
          {
            id: uniqueId(),
            title: 'Response Time',
            href: '/performance/agents/response',
            icon: IconClock,
          },
          {
            id: uniqueId(),
            title: 'Dispute Rate',
            href: '/performance/agents/disputes',
            icon: IconAlertTriangle,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'User Activity',
        href: '/performance/users',
        icon: IconUsers,
        children: [
          {
            id: uniqueId(),
            title: 'Active Users',
            href: '/performance/users/active',
            icon: IconActivity,
          },
          {
            id: uniqueId(),
            title: 'Recycling Frequency',
            href: '/performance/users/frequency',
            icon: IconRecycle,
          },
          {
            id: uniqueId(),
            title: 'Retention & Churn',
            href: '/performance/users/retention',
            icon: IconTrendingUp,
          },
        ],
      },
    ],
  },
  {
    subheader: 'USER MANAGEMENT',
  },
  {
    id: uniqueId(),
    title: 'Users (Recyclers)',
    href: '/users',
    icon: IconUsers,
    roles: ROLES.OPS_AND_SUPER,
    children: [
      {
        id: uniqueId(),
        title: 'All Users',
        href: '/users/all',
        icon: IconUsers,
      },
      {
        id: uniqueId(),
        title: 'KYC Status',
        href: '/users/kyc',
        icon: IconFileCertificate,
      },
      {
        id: uniqueId(),
        title: 'Wallet (Read-only)',
        href: '/users/wallets',
        icon: IconWallet,
      },
      {
        id: uniqueId(),
        title: 'Suspended/Flagged Users',
        href: '/users/suspended',
        icon: IconBan,
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Agents',
    href: '/agents',
    icon: IconUserCheck,
    roles: ROLES.OPS_AND_SUPER,
    children: [
      {
        id: uniqueId(),
        title: 'All Agents',
        href: '/agents/all',
        icon: IconUserCheck,
      },
      {
        id: uniqueId(),
        title: 'Agent Verification (KYC)',
        href: '/agents/verification',
        icon: IconFileCertificate,
      },
      {
        id: uniqueId(),
        title: 'Agent Wallets',
        href: '/agents/wallets',
        icon: IconWallet,
      },
      {
        id: uniqueId(),
        title: 'Commission Rates',
        href: '/agents/commissions',
        icon: IconPercentage,
      },
      {
        id: uniqueId(),
        title: 'Performance Summary',
        href: '/agents/performance',
        icon: IconChartLine,
      },
      {
        id: uniqueId(),
        title: 'Availability Status',
        href: '/agents/availability',
        icon: IconClock,
      },
      {
        id: uniqueId(),
        title: 'Suspended Agents',
        href: '/agents/suspended',
        icon: IconBan,
      },
    ],
  },
  {
    subheader: 'OPERATIONS',
  },
  {
    id: uniqueId(),
    title: 'Pickups & Recycling',
    href: '/pickups',
    icon: IconRecycle,
    roles: ROLES.OPS_AND_SUPER,
    children: [
      {
        id: uniqueId(),
        title: 'Pickup Requests',
        href: '/pickups/requests',
        icon: IconRecycle,
      },
      {
        id: uniqueId(),
        title: 'Scheduled Pickups',
        href: '/pickups/scheduled',
        icon: IconCalendar,
      },
      {
        id: uniqueId(),
        title: 'Completed Pickups',
        href: '/pickups/completed',
        icon: IconCheck,
      },
      {
        id: uniqueId(),
        title: 'Failed/Cancelled Pickups',
        href: '/pickups/failed',
        icon: IconX,
      },
      {
        id: uniqueId(),
        title: 'Drop-off Records',
        href: '/pickups/dropoffs',
        icon: IconMapPin,
      },
      {
        id: uniqueId(),
        title: 'Weight Logs',
        href: '/pickups/weights',
        icon: IconScale,
      },
      {
        id: uniqueId(),
        title: 'Disputes',
        href: '/pickups/disputes',
        icon: IconAlertTriangle,
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Rewards & Gamification',
    href: '/rewards',
    icon: IconGift,
    roles: ROLES.OPS_AND_SUPER,
    children: [
      {
        id: uniqueId(),
        title: 'Points Rules',
        href: '/rewards/points',
        icon: IconCoins,
      },
      {
        id: uniqueId(),
        title: 'Badges',
        href: '/rewards/badges',
        icon: IconTrophy,
      },
      {
        id: uniqueId(),
        title: 'Challenges',
        href: '/rewards/challenges',
        icon: IconStar,
      },
      {
        id: uniqueId(),
        title: 'Rewards & Benefits',
        href: '/rewards/benefits',
        icon: IconGift,
      },
      {
        id: uniqueId(),
        title: 'Redemptions Log',
        href: '/rewards/redemptions',
        icon: IconHistory,
      },
      {
        id: uniqueId(),
        title: 'Activity Feed',
        href: '/rewards/activity',
        icon: IconActivity,
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Referrals',
    href: '/referrals',
    icon: IconUsers,
    roles: ROLES.OPS_AND_SUPER,
    children: [
      {
        id: uniqueId(),
        title: 'Referral Overview',
        href: '/referrals/overview',
        icon: IconEye,
      },
      {
        id: uniqueId(),
        title: 'Pending Referrals',
        href: '/referrals/pending',
        icon: IconClock,
      },
      {
        id: uniqueId(),
        title: 'Completed Referrals',
        href: '/referrals/completed',
        icon: IconCheck,
      },
      {
        id: uniqueId(),
        title: 'Fraud Checks',
        href: '/referrals/fraud',
        icon: IconFlag,
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'B2B / Enterprise',
    href: '/enterprise',
    icon: IconBuilding,
    roles: ROLES.OPS_AND_SUPER,
    children: [
      {
        id: uniqueId(),
        title: 'Enterprise Clients',
        href: '/enterprise/clients',
        icon: IconBuilding,
      },
      {
        id: uniqueId(),
        title: 'Contracts & Pricing',
        href: '/enterprise/contracts',
        icon: IconFileText,
      },
      {
        id: uniqueId(),
        title: 'Scheduled Collections',
        href: '/enterprise/collections',
        icon: IconCalendar,
      },
      {
        id: uniqueId(),
        title: 'Invoices',
        href: '/enterprise/invoices',
        icon: IconReceipt,
      },
      {
        id: uniqueId(),
        title: 'Agent Assignments',
        href: '/enterprise/assignments',
        icon: IconUserCheck,
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Environmental Impact',
    href: '/environment',
    icon: IconLeaf,
    roles: ROLES.SUPER_ADMIN,
    children: [
      {
        id: uniqueId(),
        title: 'Impact Dashboard',
        href: '/environment/dashboard',
        icon: IconChartLine,
      },
      // {
      //   id: uniqueId(),
      //   title: 'CO₂ Saved',
      //   href: '/environment/co2',
      //   icon: IconCloud,
      // },
      // {
      //   id: uniqueId(),
      //   title: 'Material Breakdown',
      //   href: '/environment/materials',
      //   icon: IconRecycle,
      // },
      // {
      //   id: uniqueId(),
      //   title: 'SDG Metrics',
      //   href: '/environment/sdg',
      //   icon: IconTree,
      // },
    ],
  },
  {
    subheader: 'RISK & COMPLIANCE',
  },
  {
    id: uniqueId(),
    title: 'Risk, Disputes & Audits',
    href: '/risk',
    icon: IconShieldCheck,
    roles: ROLES.SUPER_ADMIN,
    children: [
      {
        id: uniqueId(),
        title: 'Disputes',
        href: '/risk/disputes',
        icon: IconAlertTriangle,
      },
      {
        id: uniqueId(),
        title: 'Fraud Flags',
        href: '/risk/fraud',
        icon: IconFlag,
      },
      {
        id: uniqueId(),
        title: 'Audit Logs',
        href: '/risk/audit',
        icon: IconClipboard,
      },
    ],
  },
  {
    subheader: 'SYSTEM',
  },
  {
    id: uniqueId(),
    title: 'System Settings',
    href: '/settings',
    icon: IconSettings,
    roles: ROLES.SUPER_ADMIN,
    children: [
      {
        id: uniqueId(),
        title: 'Roles & Permissions',
        href: '/settings/roles',
        icon: IconKey,
      },
      {
        id: uniqueId(),
        title: 'Pricing Rules',
        href: '/settings/pricing',
        icon: IconCurrencyDollar,
      },
      {
        id: uniqueId(),
        title: 'Zones',
        href: '/settings/zones',
        icon: IconMapPin,
      },
    ],
  },
  {
    subheader: 'ACCOUNT',
  },
  {
    id: uniqueId(),
    title: 'Admin Account',
    href: '/account',
    icon: IconUser,
    children: [
      {
        id: uniqueId(),
        title: 'My Profile',
        href: '/account/profile',
        icon: IconUserCircle,
      },
      {
        id: uniqueId(),
        title: 'Activity Log',
        href: '/account/activity',
        icon: IconHistory,
      },
      // {
      //   id: uniqueId(),
      //   title: 'Logout',
      //   href: '/auth/login',
      //   icon: IconLogout,
      // },
    ],
  },
];

// Filter menu items based on user role with server-side validation
export const getMenuItems = async (userRole?: string): Promise<NavItem[]> => {
  if (!userRole) return [];
  
  // Get fresh user data from server to validate role
  try {
    const response = await fetch('/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    
    if (!response.ok) {
      console.error('Server validation failed');
      return [];
    }
    
    const userData = await response.json();
    
    // Use validated role from server response
    const validatedRole = userData.adminSubRole || userRole;
    
    const filteredItems = navigationItems.map(item => {
      // Process subheaders separately
      if (item.subheader) {
        return item; // Keep subheaders for now, we'll filter them later
      }
      
      // Check if user has access to this item
      if (!hasAccess(item.title, validatedRole)) {
        return null; // Remove items user doesn't have access to
      }
      
      // Filter children based on role access
      if (item.children) {
        const filteredChildren = item.children.filter(child => 
          !child.roles || hasAccess(child.title, validatedRole)
        ).map(child => {
          // Filter nested children
          if (child.children) {
            const filteredNestedChildren = child.children.filter(nestedChild => 
              !nestedChild.roles || hasAccess(nestedChild.title, validatedRole)
            );
            
            return {
              ...child,
              children: filteredNestedChildren
            };
          }
          return child;
        });
        
        // If no children remain, remove this item
        if (filteredChildren.length === 0) {
          return null;
        }
        
        return {
          ...item,
          children: filteredChildren
        };
      }
      
      return item;
    }).filter(item => item !== null) as NavItem[];
    
    // Now filter out empty subheaders (subheaders with no items after them)
    const result: NavItem[] = [];
    for (let i = 0; i < filteredItems.length; i++) {
      const currentItem = filteredItems[i];
      
      // If it's a subheader, check if there are any non-subheader items after it
      if (currentItem.subheader) {
        let hasItemsAfter = false;
        
        // Look ahead to see if there are any menu items after this subheader
        for (let j = i + 1; j < filteredItems.length; j++) {
          if (!filteredItems[j].subheader) {
            hasItemsAfter = true;
            break;
          }
          // If we hit another subheader, stop looking
          if (filteredItems[j].subheader) {
            break;
          }
        }
        
        // Only include subheader if there are items after it
        if (hasItemsAfter) {
          result.push(currentItem);
        }
      } else {
        // Always include non-subheader items
        result.push(currentItem);
      }
    }
    
    return result;
  } catch (error) {
    console.error('Error validating user role:', error);
    return [];
  }
};

export const Menuitems = navigationItems;
export default navigationItems;
