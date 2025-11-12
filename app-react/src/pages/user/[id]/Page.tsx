import { useParams } from "react-router-dom";
import { TemplateSidebarHeaderComponent } from "../../../components/Template/SidebarHeaderContent";
import { UserPageComponent } from "../../../features/UserPage";

export default function UserPage() {
  const { id } = useParams<{ id: string }>(); // pega o parâmetro da rota /user/:id

  return (
    <TemplateSidebarHeaderComponent>
      <UserPageComponent idUser={id!} />
    </TemplateSidebarHeaderComponent>
  );
}
