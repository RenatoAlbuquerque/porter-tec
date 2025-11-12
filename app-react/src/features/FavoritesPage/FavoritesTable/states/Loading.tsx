import { TableRow, TableCell, Box, CircularProgress, Typography } from "@mui/material";

interface ILoadingRow {
  translate: (k: string) => string;
}

export const LoadingRow = ({ translate }: ILoadingRow) => (
  <TableRow>
    <TableCell colSpan={5} sx={{ textAlign: "center", py: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <CircularProgress size={20} />
        <Typography variant="body2">{translate("loadingMore")}</Typography>
      </Box>
    </TableCell>
  </TableRow>
);
