import { Box, Typography } from "@mui/material";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";

const FindRivals = () => {
  return (
    <Box
      sx={{
        color: "white",
        height: "150px",
        backgroundColor: "#161629",
        p: 2,
        border: "1px solid rgba(0,240,255,0.2)",
        cursor:"pointer",
        "&:hover":{
         background: "rgba(22, 22, 30, .2)"
        }
      }}
    >
      <PersonSearchOutlinedIcon sx={{ fontSize: 50, color: "#00F0FF" }} />
      <Typography variant="h4" sx={{ fontWeight: 900, fontStyle: "italic" }}>
        {" "}
        FIND RIVALS
      </Typography>
      <Typography variant="caption"> SCAN LOCAL DRIVERS</Typography>
    </Box>
  );
};

export default FindRivals;
