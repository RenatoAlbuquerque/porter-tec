"use client";

import React, { useMemo, useState } from "react";
import { DataGrid, type GridColDef, type GridPaginationModel, type GridRowParams } from "@mui/x-data-grid";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { columnsFactory } from "./columns";
import { TableHeader } from "./headerTable";
import { Paginator } from "./paginator";
import useFavorites from "../../../hooks/useFavorites";
import { usePushNavigation } from "../../../hooks/useNavigation";
import { useRandomUsers } from "../../../api/users";
import { useTranslations } from "../../../hooks/useTranslations";
import { tableInformationUsers, type TableUser } from "../../../api/users/users.utils";
import { SkeletonTableUsers } from "../../Atoms/Skeleton/TableUsers";

export const TOTAL_PAGES = 50;
export const TableUsers: React.FC = () => {
  const pushNavigation = usePushNavigation();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const {
    palette: { primary, background },
  } = useTheme();

  const [inputName, setInputName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavorites();

  const { data, isError, refetch, isPending, isRefetching } = useRandomUsers({
    results: paginationModel.pageSize,
    page: paginationModel.page + 1,
    nat: filterName,
  });

  const translateColumnTable = useTranslations("Components.Organism.TableUser.Columns");
  const translateTable = useTranslations("Components.Organism.TableUser");

  const isLoading = isPending || isRefetching;
  const columns = useMemo<GridColDef[]>(
    () => columnsFactory(translateColumnTable),
    [translateColumnTable],
  );

  const usersList = useMemo<TableUser[]>(
    () => (data?.results ? tableInformationUsers(data.results) : []),
    [data],
  );

  const hasData = usersList.length > 0;
  const page = paginationModel.page;
  const pageSize = paginationModel.pageSize ?? 10;
  const favoriteRows = useMemo(() => favorites ?? [], [favorites]);
  const favoriteTotal = favoriteRows.length;
  const favoritePageCount = Math.max(1, Math.ceil(favoriteTotal / pageSize));

  const rowsToDisplay = useMemo<TableUser[]>(() => {
    if (showFavorites) {
      const start = page * pageSize;
      return favoriteRows.slice(start, start + pageSize);
    }
    return usersList;
  }, [showFavorites, favoriteRows, usersList, page, pageSize]);

  const totalRows = showFavorites ? favoriteTotal : TOTAL_PAGES * pageSize;
  const totalPages = showFavorites
    ? favoritePageCount
    : Math.max(1, Math.ceil(totalRows / pageSize));

  const handleRowClick = (params: GridRowParams<TableUser>) => {
    const userId = params.row.id;
    if (userId) {
      pushNavigation(`/user/${userId}`);
    }
  };

  const handleFilterClick = () => {
    setFilterName(inputName);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  const toggleShowFavorites = () => {
    setShowFavorites((s) => {
      const next = !s;
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
      return next;
    });
  };

  const renderContent = () => {
    if (!showFavorites && isLoading && !hasData) {
      return <SkeletonTableUsers />;
    }

    if (!showFavorites && isError && !hasData) {
      return (
        <Box p={4} textAlign="center">
          <Typography color="error" mb={1}>
            {translateTable("ErrorTitle")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {translateTable("ErrorSubitle")}
          </Typography>
        </Box>
      );
    }

    return (
      <DataGrid
        rows={rowsToDisplay}
        columns={columns}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        checkboxSelection={false}
        rowCount={totalRows}
        disableColumnMenu
        onRowClick={handleRowClick}
        hideFooter
        getRowId={(row) => row.id}
        loading={!showFavorites ? isRefetching : false}
        slots={{
          noRowsOverlay: () => (
            <Box p={4} display="flex" justifyContent="center">
              <Typography variant="body2" color="text.secondary">
                {showFavorites
                  ? translateTable("NotFavoritesUsers")
                  : translateTable("NotFoundUsers")}
              </Typography>
            </Box>
          ),
        }}
        sx={{
          border: 1,
          cursor: "pointer",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #eee",
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: background.default,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: primary.dark,
          },
        }}
      />
    );
  };

  return (
    <Box>
      <Paper sx={{ maxWidth: "100%", border: "1px solid transparent" }}>
        <TableHeader
          title={translateTable("TitleTableHeader")}
          onRefetch={refetch}
          loading={isLoading}
          color={primary.main}
        />
        <Box
          width={"100%"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          display="flex"
          gap="16px"
          mb="20px"
          flexWrap="wrap"
        >
          <TextField
            sx={{ maxWidth: "400px" }}
            fullWidth
            label={translateTable("FilterByNationalityLabel")}
            placeholder={translateTable("FilterByNationalityPlaceholder")}
            size="small"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            disabled={showFavorites}
          />
          <Button
            size="small"
            variant="contained"
            onClick={handleFilterClick}
            disabled={showFavorites}
          >
            {translateTable("FilterButton")}
          </Button>

          <Button
            size="small"
            variant={showFavorites ? "contained" : "outlined"}
            onClick={toggleShowFavorites}
          >
            {showFavorites
              ? translateTable("ShowAllButton")
              : `${translateTable("ShowFavoritesButton")} (${favoriteTotal})`}
          </Button>
        </Box>

        <Box sx={{ width: "100%", overflow: "hidden" }}>{renderContent()}</Box>

        {isError && hasData && (
          <Box p={2}>
            <Typography color="warning.main">{translateTable("ErrorAlert")}</Typography>
          </Box>
        )}

        <Paginator
          page={paginationModel.page}
          onChangePage={(page) => setPaginationModel({ ...paginationModel, page })}
          count={totalPages}
          disabled={!showFavorites ? isLoading || isError : false}
        />
      </Paper>
    </Box>
  );
};

export default TableUsers;
