import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import Woman2OutlinedIcon from "@mui/icons-material/Woman2Outlined";
import Man2OutlinedIcon from "@mui/icons-material/Man2Outlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import EditRoadOutlinedIcon from "@mui/icons-material/EditRoadOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { RowLabelValue } from "./RowLabelValue";
import ReplayIcon from "@mui/icons-material/Replay";
import { useDayjsFormatter } from "../../hooks/useDayjsFormatter";
import { useTranslations } from "../../hooks/useTranslations";
import { tableInformationUsers } from "../../api/users/users.utils";
import { FavoriteButton } from "../../components/Atoms/Buttons/FavoriteButton";
import { useRandomUsers } from "../../api/users";
export const UserPageComponent = ({ idUser }: { idUser: string }) => {
  const { data, isError, isPending, refetch } = useRandomUsers({ id: idUser });
  const userData = data?.results[0];
  const {
    palette: { primary, background, secondary },
  } = useTheme();
  const { formatDateTime } = useDayjsFormatter();
  const translateUserPage = useTranslations("Features.UserPage");

  if (isError) {
    return (
      <Box
        mt="10px"
        display={"flex"}
        gap="20px"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"6px"}
        border={`1px solid ${primary.dark}`}
        p="30px"
        bgcolor={`${background.default}`}
      >
        <Typography variant="h3" color="error.main">
          {translateUserPage("errorTitle")}
        </Typography>
        <Typography variant="h4" color="error.main">
          {translateUserPage("errorRetry")}
        </Typography>
        <IconButton
          disabled={isPending}
          size="small"
          onClick={() => refetch}
          sx={{ border: `1px solid ${secondary.main}` }}
        >
          <ReplayIcon color="primary" fontSize="small" />
        </IconButton>
      </Box>
    );
  }

  const formatedUserData = userData && tableInformationUsers([userData]);

  return (
    <>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap="10px"
      >
        {translateUserPage("userFavorite")}:
        {isPending ? (
          <CircularProgress size={20} />
        ) : (
          <FavoriteButton user={formatedUserData?.[0]} />
        )}
      </Box>
      <Box
        width={"100%"}
        mt="20px"
        display={"flex"}
        flexDirection={{ xs: "column", xl: "row" }}
        gap="30px"
      >
        <Box width={"100%"}>
          <Typography variant="h3" pb="20px">
            {translateUserPage("personalInformation")}
          </Typography>
          <Box
            borderRadius={"6px"}
            border={`1px solid ${primary.dark}`}
            p="30px"
            bgcolor={`${background.default}`}
          >
            <Grid container>
              <RowLabelValue
                first
                value={`${userData?.name.title} ${userData?.name.first} ${userData?.name.last}`}
                label={translateUserPage("fullName")}
                icon={<PersonIcon fontSize="medium" />}
                isLoading={isPending}
              />
              <RowLabelValue
                value={userData?.login.username}
                label={translateUserPage("username")}
                icon={<AbcOutlinedIcon fontSize="medium" />}
                isLoading={isPending}
              />
              <RowLabelValue
                value={userData?.email}
                label={translateUserPage("email")}
                icon={<EmailIcon fontSize="medium" />}
                isLoading={isPending}
              />
              <RowLabelValue
                value={userData?.cell}
                label={translateUserPage("cellphone")}
                icon={<PhoneIphoneOutlinedIcon fontSize="medium" />}
                isLoading={isPending}
              />
              <Grid
                container
                size={12}
                borderBottom={`2px solid ${secondary.dark}`}
                py="20px"
                rowSpacing={1}
              >
                <Grid
                  size={{ xs: 6, sm: 4, md: 2.5 }}
                  display={"flex"}
                  alignItems={"center"}
                  gap="10px"
                >
                  <PhotoOutlinedIcon fontSize="medium" />
                  <Typography variant="body1">{translateUserPage("photo")}</Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 8, md: 3.5 }} display={"flex"}>
                  <Box
                    width={124}
                    border={`2px solid ${secondary.dark}`}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    p="20px"
                    alignItems={"center"}
                    borderRadius={"10px"}
                  >
                    {isPending ? (
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        width={"100%"}
                        alignItems={"center"}
                        height={"100%"}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Avatar
                        src={userData?.picture.medium}
                        alt={`${userData?.name.first} ${userData?.name.last}-image-perfil`}
                        sx={{ width: 80, height: 80 }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid
                  size={{ xs: 6, sm: 4, md: 2.5 }}
                  display={"flex"}
                  alignItems={"center"}
                  gap="10px"
                >
                  <WcOutlinedIcon fontSize="medium" />
                  <Typography variant="body1">{translateUserPage("gender")}</Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 8, md: 3.5 }} display={"flex"}>
                  <Box
                    textTransform={"capitalize"}
                    flexDirection={"column"}
                    width={124}
                    border={`2px solid ${secondary.dark}`}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    p="20px"
                    alignItems={"center"}
                    borderRadius={"10px"}
                  >
                    {isPending ? (
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        width={"100%"}
                        alignItems={"center"}
                        height={"100%"}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        <Avatar
                          alt={`${userData?.name.first} ${userData?.name.last}-image-perfil`}
                          sx={{ width: 60, height: 60 }}
                        >
                          {userData?.gender === "male" ? (
                            <Woman2OutlinedIcon fontSize="large" />
                          ) : (
                            <Man2OutlinedIcon fontSize="large" />
                          )}
                        </Avatar>
                        {userData?.gender}
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box width={"100%"}>
          <Typography variant="h3" pb="20px">
            {translateUserPage("locationInformation")}
          </Typography>
          <Box
            borderRadius={"6px"}
            border={`1px solid ${primary.dark}`}
            p="30px"
            bgcolor={`${background.default}`}
          >
            <Grid container>
              <RowLabelValue
                first
                value={userData?.location?.country}
                label={translateUserPage("country")}
                icon={<LanguageOutlinedIcon fontSize="medium" />}
                isLoading={isPending}
              />
              <RowLabelValue
                value={userData?.location?.state}
                label={translateUserPage("state")}
                icon={<MapOutlinedIcon fontSize="medium" />}
                isLoading={isPending}
              />
              <RowLabelValue
                value={userData?.location?.city}
                label={translateUserPage("city")}
                icon={<PlaceOutlinedIcon fontSize="medium" />}
                isLoading={isPending}
              />
              <RowLabelValue
                value={`${userData?.location?.street?.name} - ${userData?.location?.street?.number}`}
                label={translateUserPage("street")}
                icon={<EditRoadOutlinedIcon fontSize="medium" />}
                isLoading={isPending}
              />
              <Grid
                container
                size={12}
                borderBottom={`2px solid ${secondary.dark}`}
                py="20px"
                rowSpacing={1}
              >
                <Grid size={{ xs: 4, md: 2.5 }} display={"flex"} alignItems={"center"} gap="10px">
                  <CakeOutlinedIcon fontSize="medium" />
                  <Typography variant="body1">{translateUserPage("birthday")}</Typography>
                </Grid>
                <Grid size={{ xs: 8, md: 3.5 }} display={"flex"}>
                  <Box
                    width={{ xs: "100%", md: 124 }}
                    border={`2px solid ${secondary.dark}`}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    p="20px"
                    alignItems={"center"}
                    borderRadius={"10px"}
                  >
                    {isPending ? (
                      <Box display={"flex"} justifyContent={"center"} width={"100%"}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      formatDateTime(userData?.dob?.date)
                    )}
                  </Box>
                </Grid>
                <Grid size={{ xs: 4, md: 2.5 }} display={"flex"} alignItems={"center"} gap="10px">
                  <CakeOutlinedIcon fontSize="medium" />
                  <Typography variant="body1">{translateUserPage("age")}</Typography>
                </Grid>
                <Grid size={{ xs: 8, md: 3.5 }} display={"flex"}>
                  <Box
                    width={124}
                    border={`2px solid ${secondary.dark}`}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    p="20px"
                    alignItems={"center"}
                    borderRadius={"10px"}
                  >
                    {isPending ? (
                      <Box display={"flex"} justifyContent={"center"} width={"100%"}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Avatar
                        alt={`${userData?.name.first} ${userData?.name.last}-age`}
                        sx={{ width: 80, height: 80, fontSize: "50px" }}
                      >
                        {userData?.dob?.age}
                      </Avatar>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
