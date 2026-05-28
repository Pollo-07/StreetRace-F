import { Box, Typography } from "@mui/material";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import { useNavigate } from "react-router-dom";

const FindRivals = () => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate("/discoverPilot")}
      sx={{
        color: "white",
        width: {
          xs: "100%",
          sm: "100%",
        },
        height: {
          xs: "auto",
          sm: 140,
          md: 150,
        },
        backgroundColor: "#161629",
        p: { xs: 2, sm: 3 },
        border: "1px solid rgba(0,240,255,0.2)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        "&:hover": {
          background: "rgba(22, 22, 30, .2)",
        },
      }}
    >
      <PersonSearchOutlinedIcon
        sx={{
          fontSize: {
            xs: 35,
            sm: 45,
            md: 50,
          },
          color: "#00F0FF",
        }}
      />

      <Typography
        sx={{
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: {
            xs: 22,
            sm: 28,
            md: 34,
          },
        }}
      >
        FIND RIVALS
      </Typography>

      <Typography
        variant="caption"
        sx={{
          fontSize: {
            xs: 10,
            sm: 12,
          },
        }}
      >
        SCAN LOCAL DRIVERS
      </Typography>
    </Box>
  );
};

export default FindRivals;
