"use client";
import { TemplateSidebarHeaderComponent } from "@/components/Template/SidebarHeaderContent";
import { FavoritesPageComponent } from "@/features/FavoritesPage";
import React from "react";

export default function FavoritesPage() {
  return (
    <TemplateSidebarHeaderComponent>
      <FavoritesPageComponent />
    </TemplateSidebarHeaderComponent>
  );
}
