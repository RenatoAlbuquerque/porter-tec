"use client";

import React, { useMemo, useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel, GridRowParams } from "@mui/x-data-grid";
import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRandomUsers } from "@/api/users";
import { tableInformationUsers, TableUser } from "@/api/users/users.utils";
import { columnsFactory } from "./columns";
import { TableHeader } from "./headerTable";
import { Paginator } from "./paginator";
import { SkeletonTableUsers } from "@/components/Atoms/Skeleton/TableUsers";
import { usePushNavigation } from "@/hooks/useNavigation";
import { useTranslations } from "next-intl";

export const TOTAL_PAGES = 50;
export const TableUsers: React.FC = () => {
  const pushNavigation = usePushNavigation();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const {
    palette: { primary },
  } = useTheme();
  const { data, isError, refetch, isPending, isRefetching } = useRandomUsers({
    results: paginationModel.pageSize,
    page: paginationModel.page + 1,
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
  const totalRows = TOTAL_PAGES * paginationModel.pageSize;
  const totalPages = Math.max(1, Math.ceil(totalRows / paginationModel.pageSize));

  const handleRowClick = (params: GridRowParams<TableUser>) => {
    const userId = params.row.id;
    if (userId) {
      pushNavigation(`/user/${userId}`);
    }
  };

  const renderContent = () => {
    if (isLoading && !hasData) {
      return <SkeletonTableUsers />;
    }

    if (isError && !hasData) {
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
        rows={usersList}
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
        loading={isRefetching}
        slots={{
          noRowsOverlay: () => (
            <Box p={4} display="flex" justifyContent="center">
              <Typography variant="body2" color="text.secondary">
                {translateTable("NotFoundUsers")}
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
          disabled={isLoading || isError}
        />
      </Paper>
    </Box>
  );
};

export default TableUsers;
