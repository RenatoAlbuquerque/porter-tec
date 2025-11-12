"use client";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import PorterLogo from "@/assets/logo/porterLogoSmall.svg";
import { useMenuList } from "@/constants/sidebarMenuList";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useTranslations } from "next-intl";
import { usePushNavigation } from "@/hooks/useNavigation";
import { SettingsContext } from "@/context/settingsContext";

const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 300;

export default function SidebarDrawer() {
  const {
    palette: { primary, text },
    breakpoints,
    transitions,
  } = useTheme();

  const isMobile = useMediaQuery(breakpoints.down("sm"));
  const { displaySideBar, setDisplaySideBar } = useContext(SettingsContext);

  const collapsed = !displaySideBar;
  const mobileOpen = Boolean(displaySideBar && isMobile);

  const translateSideNav = useTranslations("SideNavTitles");
  const pathname = useLocalePath();
  const menuList = useMenuList(translateSideNav);
  const pushNavigation = usePushNavigation();

  const drawerWidth = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  const handleToggleCollapse = () => {
    setDisplaySideBar(!displaySideBar);
  };

  const handleMobileToggle = () => {
    setDisplaySideBar(!displaySideBar);
  };

  const DrawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        transition: transitions.create("width", {
          easing: transitions.easing.sharp,
          duration: transitions.duration.shortest,
        }),
        boxShadow: 3,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: drawerWidth,
          bgcolor: "transparent",
          zIndex: -1,
        }}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent={collapsed ? "center" : "space-between"}
        gap={collapsed ? 0 : 1}
        p={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {!collapsed && <Image src={PorterLogo} alt="Logo Porter" />}
        </Box>

        {isMobile ? (
          <IconButton onClick={handleMobileToggle} size="large" aria-label="abrir menu">
            <MenuIcon htmlColor={primary.contrastText} />
          </IconButton>
        ) : (
          <Tooltip title={collapsed ? "Expandir" : "Encolher"}>
            <IconButton onClick={handleToggleCollapse} size="large" aria-label="toggle sidebar">
              {collapsed ? (
                <ChevronRightIcon htmlColor={primary.contrastText} />
              ) : (
                <ChevronLeftIcon htmlColor={primary.contrastText} />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Divider />

      <Box px={collapsed ? 0 : 1} py={1} flexGrow={1}>
        {menuList.map((item) => {
          const isActive = pathname === item.path;
          if (collapsed) {
            return (
              <Tooltip key={item.id} title={item.name} placement="right">
                <IconButton
                  onClick={() => {
                    pushNavigation(item.path);
                    if (isMobile) setDisplaySideBar(false);
                  }}
                  sx={{
                    width: "100%",
                    height: 48,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: isActive ? "#CB3CFF" : text.primary,
                    mb: "6px",
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            );
          }

          return (
            <Button
              key={item.id}
              onClick={() => {
                pushNavigation(item.path);
                if (isMobile) setDisplaySideBar(false);
              }}
              startIcon={item.icon}
              fullWidth
              sx={{
                height: "42px",
                paddingLeft: "10px",
                borderRadius: "4px",
                justifyContent: "flex-start",
                textAlign: "left",
                textTransform: "none",
                color: isActive ? "#CB3CFF" : text.primary,
                backgroundColor: isActive ? "#0A1330" : "transparent",
                marginBottom: "8px",
                "&:hover": {
                  backgroundColor: primary.main,
                },
              }}
            >
              <Typography variant="body1">{item.name}</Typography>
            </Button>
          );
        })}
      </Box>

      <Divider />

      <Box p={2}>
        {!collapsed && (
          <Typography variant="caption" color="text.secondary">
            {translateSideNav("By")}: Renato Albuquerque
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "relative",
        width: drawerWidth,
        flexShrink: 0,
        display: {
          xs: "none",
          sm: "inline-block",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: drawerWidth,
          bgcolor: "transparent",
          pointerEvents: "none",
        }}
      />

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleMobileToggle}
        anchor="left"
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: drawerWidth,
            overflowX: "hidden",
            transition: transitions.create("width", {
              easing: transitions.easing.sharp,
              duration: transitions.duration.shortest,
            }),
          },
        }}
      >
        {DrawerContent}
      </Drawer>
    </Box>
  );
}
