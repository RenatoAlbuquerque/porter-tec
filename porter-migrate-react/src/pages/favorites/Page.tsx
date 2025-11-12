import { FavoritesPageComponent } from "../../features/FavoritesPage";
import { TemplateSidebarHeaderComponent } from "../../components/Template/SidebarHeaderContent";

export default function FavoritesPage() {
  return (
    <TemplateSidebarHeaderComponent>
      <FavoritesPageComponent />
    </TemplateSidebarHeaderComponent>
  );
}
