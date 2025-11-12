import { TableRow, TableCell, Typography } from "@mui/material";

interface INoResultsRow {
  translate: (k: string) => string;
}

export const NoResultsRow = ({ translate }: INoResultsRow) => (
  <TableRow>
    <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="body1">{translate("noResults")}</Typography>
    </TableCell>
  </TableRow>
);
