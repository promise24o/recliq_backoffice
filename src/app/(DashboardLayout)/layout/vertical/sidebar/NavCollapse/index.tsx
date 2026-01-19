import React, { useContext, useState } from "react";


import { CustomizerContext } from "@/app/context/customizerContext";

import { usePathname } from "next/navigation";

// mui imports
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';

// custom imports
import NavItem from "../NavItem";
import { isNull } from "lodash";

// plugins
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { NavCollapseProps, NavGroup } from "@/app/(DashboardLayout)/types/layout/sidebar";



// FC Component For Dropdown Menu
export default function NavCollapse({
  menu,
  level,
  pathWithoutLastPart,
  pathDirect,
  hideMenu,
  onClick,
}: NavCollapseProps) {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  const { isBorderRadius } = useContext(CustomizerContext);
  const Icon = menu?.icon;
  const theme = useTheme();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);



  const menuIcon = Icon ? (
    level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />
  ) : null;



  const handleClick = () => {
    setOpen(!open);
  };

  // menu collapse for sub-levels
  React.useEffect(() => {
    setOpen(false);
    
    // Check if any child is active (exact match)
    menu?.children?.forEach((item: NavGroup) => {
      if (item?.href === pathname) {
        setOpen(true);
      }
    });
    
    // Check if current pathname starts with parent href (active parent)
    if (menu?.href && pathname.startsWith(menu.href)) {
      setOpen(true);
    }
    
    // Check if any child href is a prefix of current pathname
    menu?.children?.forEach((item: NavGroup) => {
      if (item?.href && pathname.startsWith(item.href)) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children, menu.href]);

  // Helper function to check nested children recursively
  const checkNestedChildren = (children: NavGroup[], pathname: string): boolean => {
    return children.some((child: NavGroup) => {
      if (child?.href === pathname || (child?.href && pathname.startsWith(child?.href))) {
        return true;
      }
      if (child?.children) {
        return checkNestedChildren(child.children, pathname);
      }
      return false;
    });
  };

  // Check if any child is active (including nested children)
  const hasActiveChild = menu?.children?.some((item: NavGroup) => {
    // Check if this item is active
    if (item?.href === pathname) {
      return true;
    }
    
    if (item?.href && pathname.startsWith(item?.href)) {
      return true;
    }
    
    // Check if any nested children are active
    if (item?.children) {
      return checkNestedChildren(item.children, pathname);
    }
    
    return false;
  });

  const ListItemStyled = styled(ListItemButton)(() => ({
    marginBottom: "2px",
    padding: "8px 10px",
    paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",
    backgroundColor: (hasActiveChild || open) && level < 2 ? theme.palette.primary.main : "",
    whiteSpace: "nowrap",
    color:
      (hasActiveChild || open) && level < 2
        ? "white"
        : level > 1 && open
          ? theme.palette.primary.main
          : theme.palette.text.secondary,
    "&:hover": {
      backgroundColor:
        level < 2 && (hasActiveChild || open)
          ? theme.palette.primary.main
          : theme.palette.primary.light,
      color:
        level < 2 && (hasActiveChild || open)
          ? "white"
          : theme.palette.primary.main,
    },
    // Ensure active state overrides hover - only for top-level
    "&.Mui-selected, &[aria-selected='true']": {
      backgroundColor: level < 2 ? theme.palette.primary.main + "!important" : theme.palette.primary.light + "!important",
      color: level < 2 ? "white !important" : theme.palette.primary.main + "!important",
    },
    borderRadius: `${isBorderRadius}px`,
  }));

  // If Menu has Children
  const submenus = menu.children?.map((item: any) => {
    if (item.children) {
      return (
        <NavCollapse
          key={item?.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    } else {
      return (
        <NavItem
          key={item.id}
          item={item}
          level={level + 1}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={lgDown ? onClick : isNull}
        />
      );
    }
  });

  return (
    <>
      <ListItemStyled
        onClick={handleClick}
        selected={pathWithoutLastPart === menu.href}
        key={menu?.id}
      >
        <ListItemIcon
          sx={{
            minWidth: "36px",
            p: "3px 0",
            color: "inherit",
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText color="inherit">
          {hideMenu ? "" : <>{t(`${menu.title}`)}</>}
        </ListItemText>
        {!open ? (
          <IconChevronDown size="1rem" />
        ) : (
          <IconChevronUp size="1rem" />
        )}
      </ListItemStyled>
      <Collapse in={open} timeout="auto">
        {submenus}
      </Collapse>
    </>
  );
}
