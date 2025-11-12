"use client";
import React, { useState } from "react";
import { Avatar, Box, Button, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useTranslations } from "next-intl";

type Props = {
  displayName?: string;
  avatarColor?: string;
  onProfile?: () => void;
  onLogout?: () => void;
};

export const UserMenu: React.FC<Props> = ({
  displayName = "Porter User",
  avatarColor,
  onProfile,
  onLogout,
}) => {
  const {
    palette: { secondary },
  } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const translateUserMenu = useTranslations("Components.Molecules.UserMenu");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <Button
        onClick={handleClick}
        endIcon={
          <KeyboardArrowDownOutlinedIcon
            htmlColor={secondary.contrastText}
            sx={{ transition: "0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        }
        sx={{
          display: "flex",
          gap: "8px",
          borderColor: "secondary.light",
          border: "1px solid",
          textTransform: "none",
        }}
      >
        <Avatar
          sx={{ height: 24, width: 24, bgcolor: avatarColor ?? secondary.contrastText }}
          variant="rounded"
        />
        <Typography variant="body1" fontWeight={500} color="secondary.contrastText">
          {displayName}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          elevation: 3,
          sx: {
            width: "128px",
            p: 0,
            mt: 1,
            borderRadius: 2,
            bgcolor: "background.paper",
            border: `1px solid ${secondary.light}`,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            "& .MuiMenuItem-root": {
              fontSize: 14,
              py: 1,
              "&:hover": { bgcolor: secondary.light },
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onProfile?.();
          }}
        >
          {translateUserMenu("MyPerfil")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onLogout?.();
          }}
        >
          {translateUserMenu("Exit")}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
