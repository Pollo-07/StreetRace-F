import { Box, Typography } from "@mui/material";
import SportsScoreOutlinedIcon from "@mui/icons-material/SportsScoreOutlined";

const RaceNow = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#00f0ff",
        width: "445px",
        height: 150,
        p: 3,
        marginBottom: 2,
        cursor:"pointer",
         "&:hover":{
         background: "rgba(0, 240, 255, .8)"
        }
      }}
    >
      <SportsScoreOutlinedIcon sx={{ fontSize: 50 }} />
      <Typography sx={{ fontWeight: 900, fontSize: 30 }}>RACE NOW</Typography>
      <Typography variant="caption" sx={{ color: "grey" }}>
        JION ACTIVE LOBBY
      </Typography>
    </Box>
  );
};

export default RaceNow;
