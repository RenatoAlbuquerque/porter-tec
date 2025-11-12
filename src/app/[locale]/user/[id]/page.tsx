"use client";
import { TemplateSidebarHeaderComponent } from "@/components/Template/SidebarHeaderContent";
import { UserPageComponent } from "@/features/UserPage";
import React, { use } from "react";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default function UserPage({ params }: UserPageProps) {
  const { id } = use(params);
  return (
    <TemplateSidebarHeaderComponent>
      <UserPageComponent idUser={id} />
    </TemplateSidebarHeaderComponent>
  );
}
