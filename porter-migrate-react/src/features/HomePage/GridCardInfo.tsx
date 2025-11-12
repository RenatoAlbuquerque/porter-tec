import { useMemo } from "react";
import { Box, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useTranslations } from "../../hooks/useTranslations";
import { useRandomUsers } from "../../api/users";
import { calculateUserMetrics } from "../../api/users/users.utils";
import { CardInfoUsers } from "../../components/Atoms/CardInfoUsers";

export const GridCardInfo = () => {
  const translateGridCard = useTranslations("Features.HomePage");
  const translateTitleCards = useTranslations("Features.HomePage.TitleCards");

  const {
    data,
    isLoading: isLoadingRandomUsers,
    isError: isErrorRandomUsers,
    refetch: refetchRandomUsers,
  } = useRandomUsers({ results: 1000 });

  const {
    palette: { primary },
  } = useTheme();

  const metrics = useMemo(() => (data ? calculateUserMetrics(data) : null), [data]);

  const cardItems = [
    {
      label: translateTitleCards("TopByCountry"),
      value: metrics?.topCountry ? `${metrics.topCountry.name}: ${metrics.topCountry.count}` : "-",
      icon: <PeopleAltIcon htmlColor="#FDB52A" />,
      iconBgColor: "#fdb72a7d",
    },
    {
      label: translateTitleCards("UsersHigh65"),
      value: metrics?.topUsersAge ?? "-",
      icon: <PeopleAltIcon htmlColor="#05C168" />,
      iconBgColor: "#05c1697f",
    },
    {
      label: translateTitleCards("Men"),
      value: metrics?.maleCount ?? "-",
      icon: <PeopleAltIcon htmlColor="#086CD9" />,
      iconBgColor: "#086dd986",
    },
    {
      label: translateTitleCards("Women"),
      value: metrics?.femaleCount ?? "-",
      icon: <PeopleAltIcon htmlColor="#CB3CFF" />,
      iconBgColor: "#cb3cff1a",
    },
  ];

  return (
    <Grid
      container
      spacing={{ xs: 1 }}
      mt={{ xs: "20px", md: "30px", lg: "40px" }}
      mb={{ xs: "25px" }}
    >
      <Grid size={{ xs: 12 }}>
        <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
          <Typography variant="h3">{translateGridCard("TitleInfoRegister")}</Typography>

          <Tooltip title={translateTitleCards("RefetchTooltip")}>
            <IconButton
              disabled={isLoadingRandomUsers}
              size="small"
              onClick={() => refetchRandomUsers()}
              sx={{ border: `1px solid ${primary.main}` }}
            >
              <ReplayIcon color="primary" fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>

      {cardItems.map((item, index) => (
        <Grid key={index} size={{ xs: 12, md: 12, lg: 6, xl: 3 }}>
          <CardInfoUsers
            label={item.label}
            value={item.value}
            icon={item.icon}
            iconBgColor={item.iconBgColor}
            isLoading={isLoadingRandomUsers}
            isError={isErrorRandomUsers}
          />
        </Grid>
      ))}
    </Grid>
  );
};
