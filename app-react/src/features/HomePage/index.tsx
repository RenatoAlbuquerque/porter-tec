import { GridCardInfo } from "./GridCardInfo";
import TableUsers from "../../components/Organisms/TableUsers";
import { TemplateSidebarHeaderComponent } from "../../components/Template/SidebarHeaderContent";

export const HomePageComponente = () => {
  return (
    <TemplateSidebarHeaderComponent>
      <GridCardInfo />
      <TableUsers />
    </TemplateSidebarHeaderComponent>
  );
};
