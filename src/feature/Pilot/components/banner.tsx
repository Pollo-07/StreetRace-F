import { Box, Card, CardContent, Typography } from "@mui/material";
import { RankConverter } from "../../../utils/rankConverter";
import { Engangements, streetCred, WinRate } from "../../../utils/winRate";
import { useUser } from "../hooks/useUser";

const Banner = () => {

  const user = useUser().user


  return (
    <Card
      sx={{
        minWidth: 275,
        width: 750,
        height: "320px",
        background: "#242442",
        color: "white",
        padding: 2,
        border: "1px solid rgba(0,240,255,0.2)",
      }}
    >
      <CardContent sx={{ position: "relative" }}>
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "120px",
            fontWeight: 800,
            color: "rgba(255,255,255,0.05)",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          speed
        </Typography>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: 35, md: 60 },
              fontWeight: 900,
              fontStyle: "italic",
              color: "#00f0ff",
              lineHeight: 0.8,
            }}
          >
            {user?.username}
          </Typography>
          <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
            <Typography
              variant="caption"
              sx={{
                color: "#00F0FF",
                lineHeight: "15px",
                backgroundColor: "#104153",
                padding: 1,
              }}
            >
              RANK: {RankConverter(user?.rango)}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "grey",
                border: "1px solid",
                lineHeight: "15px",
                p: 1,
              }}
            >
              STREET CRED: {streetCred(user?.victorias,user?.derrotas,user?.rango)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", width: "100%", marginTop: "45px" }}>
          <Box sx={{ flex: 1, px: 2, borderLeft: "1px solid #00F0FF" }}>
            <Typography sx={{ color: "grey" }} variant="caption">
              TOTAL WINS
            </Typography>
            <Typography sx={{ color: "#00f0ff" }} variant="h5">
              {user?.victorias}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, px: 2, borderLeft: "1px solid red" }}>
            <Typography sx={{ color: "grey" }} variant="caption">
              LOSES
            </Typography>
            <Typography sx={{ color: "red" }} variant="h5">
              {user?.derrotas}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, px: 2, borderLeft: "1px solid #2FD72F" }}>
            <Typography sx={{ color: "grey" }} variant="caption">
              WIN RATE
            </Typography>
            <Typography sx={{ color: "#2FD72F" }} variant="h5">
              {WinRate(user?.victorias,user?.derrotas)}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, px: 2, borderLeft: "1px solid #ECB2FF" }}>
            <Typography sx={{ color: "grey" }} variant="caption">
              ENGANGEMENTS
            </Typography>
            <Typography sx={{ color: "#ECB2FF" }} variant="h5">
              {Engangements(user?.victorias,user?.derrotas)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Banner;
