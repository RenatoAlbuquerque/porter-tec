import { useParams } from "react-router-dom";
import { TemplateSidebarHeaderComponent } from "../../../components/Template/SidebarHeaderContent";
import { UserPageComponent } from "../../../features/UserPage";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <TemplateSidebarHeaderComponent>
      <UserPageComponent idUser={id!} />
    </TemplateSidebarHeaderComponent>
  );
}
