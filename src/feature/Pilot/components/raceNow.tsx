import { Box, Typography } from "@mui/material";
import SportsScoreOutlinedIcon from "@mui/icons-material/SportsScoreOutlined";

const RaceNow = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#00f0ff",
        width: {
          xs: "100%", // 🔥 móvil ocupa todo
          sm: "100%",
          md: 445, // 🔥 desktop como lo tenías
        },
        height: {
          xs: "auto",
          sm: 140,
          md: 150,
        },
        p: { xs: 2, sm: 3 },
        mb: 2,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        "&:hover": {
          background: "rgba(0, 240, 255, .8)",
        },
      }}
    >
      <SportsScoreOutlinedIcon
        sx={{
          fontSize: {
            xs: 35,
            sm: 45,
            md: 50,
          },
        }}
      />

      <Typography
        sx={{
          fontWeight: 900,
          fontSize: {
            xs: 22,
            sm: 26,
            md: 30,
          },
        }}
      >
        RACE NOW
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color: "grey",
          fontSize: {
            xs: 10,
            sm: 12,
          },
        }}
      >
        JOIN ACTIVE LOBBY
      </Typography>
    </Box>
  );
};

export default RaceNow;
