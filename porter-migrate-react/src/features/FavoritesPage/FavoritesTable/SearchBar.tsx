import { Box, TextField, Typography } from "@mui/material";

interface ISearchBarProps {
  rawQuery: string;
  setRawQuery: (v: string) => void;
  resultsCount: number;
  translate: (k: string) => string;
}

export const SearchBar = ({ rawQuery, setRawQuery, resultsCount, translate }: ISearchBarProps) => (
  <Box
    display="flex"
    gap={2}
    alignItems="center"
    mb={2}
    flexDirection={{ xs: "column", md: "row" }}
  >
    <TextField
      label={translate("searchLabel")}
      size="small"
      value={rawQuery}
      onChange={(e) => setRawQuery(e.target.value)}
      placeholder={translate("searchPlaceholder")}
      color="secondary"
      sx={{ maxWidth: 300 }}
      fullWidth
    />
    <Typography color="text.secondary">
      {resultsCount} {translate("results")}
    </Typography>
  </Box>
);
