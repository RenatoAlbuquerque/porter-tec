"use client";

import type React from "react";
import { useMemo } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

export interface IMenuListProps {
  id?: string;
  path: string;
  name: string;
  role?: string[];
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const useMenuList = (t: (key: string) => string) => {
  const menuList = useMemo<Array<IMenuListProps>>(
    () => [
      {
        id: "btn_dashboard",
        name: t("Dashboard"),
        icon: <HomeOutlinedIcon />,
        path: "/construction",
      },
      {
        id: "btn_users",
        name: t("Users"),
        icon: <GroupOutlinedIcon />,
        path: "/",
      },
      {
        id: "btn_features",
        name: t("UsersFavorites"),
        icon: <StarBorderOutlinedIcon />,
        path: "/construction",
      },
      {
        id: "btn_pricing",
        name: t("Pricing"),
        icon: <AttachMoneyOutlinedIcon />,
        path: "/construction",
      },
      {
        id: "btn_integration",
        name: t("Integration"),
        icon: <SmartToyOutlinedIcon />,
        path: "/construction",
      },
    ],
    [t],
  );

  return menuList;
};
