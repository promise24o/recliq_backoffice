import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';

import { IconPower } from '@tabler/icons-react';
import { CustomizerContext } from "@/app/context/customizerContext";
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useLogout, getUserDisplayName, getUserPhoto } from '@/hooks/useAuth';

const formatRole = (user: any): string => {
  if (!user) return 'Admin';
  if (user.adminSubRole) {
    return user.adminSubRole
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (l: string) => l.toUpperCase());
  }
  if (user.role) {
    return user.role
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (l: string) => l.toUpperCase());
  }
  return 'Admin';
};

export const Profile = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const router = useRouter();
  const { data: user } = useUser();
  const logout = useLogout();

  const { isSidebarHover, isCollapse } = useContext(CustomizerContext);
  const hideMenu = lgUp ? isCollapse == 'mini-sidebar' && !isSidebarHover : '';

  const displayName = getUserDisplayName(user || null);
  const userPhoto = getUserPhoto(user || null);
  const roleName = formatRole(user);

  const handleLogout = () => {
    logout.mutate();
    router.push('/auth/login');
  };

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt={displayName} src={userPhoto} sx={{ height: 40, width: 40 }} />

          <Box>
            <Typography variant="h6">{displayName}</Typography>
            <Typography variant="caption">{roleName}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                onClick={handleLogout}
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
