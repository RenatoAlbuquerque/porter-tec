import React from "react";
import { Box, Pagination } from "@mui/material";

interface Props {
  page: number;
  onChangePage: (page: number) => void;
  count: number;
  disabled?: boolean;
}

export const Paginator: React.FC<Props> = ({ page, onChangePage, count, disabled }) => (
  <Box display="flex" justifyContent="center" p={2}>
    <Pagination
      count={count}
      page={page + 1}
      onChange={(_, value) => onChangePage(value - 1)}
      color="primary"
      showFirstButton
      showLastButton
      siblingCount={1}
      boundaryCount={1}
      aria-label="paginator"
      disabled={disabled}
    />
  </Box>
);

export default Paginator;
