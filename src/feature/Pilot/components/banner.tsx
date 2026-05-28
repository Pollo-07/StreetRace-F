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
        width: { xs: "100%", sm: "100%", md: 750 },
        height: { xs: "auto", md: 320 },
        background: "#242442",
        color: "white",
        padding: 2,
        border: "1px solid rgba(0,240,255,0.2)",
        mb:{xs:2}
      }}
    >
      <CardContent sx={{ position: "relative" }}>
        
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: 800,
            color: "rgba(255,255,255,0.05)",
            whiteSpace: "nowrap",
            userSelect: "none",
            display: { xs: "none", sm: "block" },
            fontSize: { sm: "90px", md: "120px" },
          }}
        >
          speed
        </Typography>

        <Box>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: 28, sm: 40, md: 60 },
              fontWeight: 900,
              fontStyle: "italic",
              color: "#00f0ff",
              lineHeight: 0.8,
            }}
          >
            {user?.username}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              mt: 2,
            }}
          >
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
              
        <Box
          sx={{
            display: "flex",
            flexWrap: {
                xs: "wrap",   
                sm: "wrap",   
                lg: "nowrap"  
              },
            gap: 2,
            width: "100%",
            mt: { xs: 3, md: "45px" },
          }}
        >
          <Box sx={{ flex: { flex: "1 1 45%"}, px: 2, borderLeft: "1px solid #00F0FF" }}>
            <Typography sx={{ color: "grey" }} variant="caption">
              TOTAL WINS
            </Typography>
            <Typography sx={{ color: "#00f0ff" }} variant="h5">
              {user?.victorias}
            </Typography>
          </Box>

          <Box sx={{ flex: { flex: "1 1 45%" }, px: 2, borderLeft: "1px solid red" }}>
            <Typography sx={{ color: "grey" }} variant="caption">
              LOSES
            </Typography>
            <Typography sx={{ color: "red" }} variant="h5">
              {user?.derrotas}
            </Typography>
          </Box>

          <Box sx={{ flex: { flex: "1 1 45%" }, px: 2, borderLeft: "1px solid #2FD72F" }}>
            <Typography sx={{ color: "grey" }} variant="caption">
              WIN RATE
            </Typography>
            <Typography sx={{ color: "#2FD72F" }} variant="h5">
              {WinRate(user?.victorias,user?.derrotas)}
            </Typography>
          </Box>

          <Box sx={{ flex: { flex: "1 1 45%" }, px: 2, borderLeft: "1px solid #ECB2FF" }}>
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