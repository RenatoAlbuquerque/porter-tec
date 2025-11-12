import { UserAvatarCell } from "./userAvatar";
import { FavoriteButton } from "../../Atoms/Buttons/FavoriteButton";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import type { TableUser } from "../../../api/users/users.utils";

type ColumnKeys =
  | "id"
  | "name"
  | "gender"
  | "email"
  | "birthday"
  | "country"
  | "cellphone"
  | "favorite";

type TranslateFn = (key: ColumnKeys) => string;

export const columnsFactory = (translateColumnTable: TranslateFn): GridColDef[] => [
  { field: "id", headerName: translateColumnTable("id"), minWidth: 120 },
  {
    field: "picture",
    headerName: "Avatar",
    minWidth: 100,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<TableUser>) => (
      <UserAvatarCell src={params.value} name={params.row.name} />
    ),
  },
  { field: "name", headerName: translateColumnTable("name"), flex: 1, minWidth: 150 },
  { field: "gender", headerName: translateColumnTable("gender"), minWidth: 110 },
  { field: "email", headerName: translateColumnTable("email"), flex: 1, minWidth: 200 },
  { field: "dateBirthday", headerName: translateColumnTable("birthday"), minWidth: 150 },
  { field: "country", headerName: translateColumnTable("country"), minWidth: 180 },
  { field: "cellphone", headerName: translateColumnTable("cellphone"), minWidth: 150 },
  {
    field: "favorite",
    headerName: translateColumnTable("favorite"),
    minWidth: 140,
    renderCell: (params: GridRenderCellParams<TableUser>) => <FavoriteButton user={params} />,
  },
];
