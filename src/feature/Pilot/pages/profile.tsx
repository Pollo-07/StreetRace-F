import { Box, Typography } from "@mui/material";
import imgPrueba from "../assets/img-prueba.png";
import CardsCars from "../components/cardsCars";
import { RankConverter } from "../../../utils/rankConverter";
import { Engangements, streetCred, WinRate } from "../../../utils/winRate";
import PageWrapper from "../components/pageWrapper";
import { useUser } from "../hooks/useUser";

const Profile = () => {
  const user = useUser().user

  return (
    <PageWrapper>
      <Box sx={{ color: "white", p: "70px 3px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={user?.foto_perfil }
                sx={{
                  width: { md: "200px", xs: "100%" },
                  height: { md: "210px" },
                  filter: "grayscale(100%)",
                  "&:hover": {
                    filter: "grayscale(0%)",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  width: 20,
                  height: 20,
                  borderTop: "3px solid #00f0ff",
                  borderLeft: "3px solid #00f0ff",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 40,
                  left: 190,
                  width: 20,
                  height: 20,
                  borderBottom: "3px solid #00f0ff",
                  borderRight: "3px solid #00f0ff",
                }}
              />
            </Box>
            <Box sx={{ marginTop: 3, p: "0px 20px" }}>
              <Typography
                variant="caption"
                color="#94A3B8"
                sx={{ lineHeight: 3, fontStyle: "italic" }}
              >
                SYSTEM STATUS: ACTIVE ,{" "}
              </Typography>
              <Typography
                variant="caption"
                color="#2FF801"
                sx={{ lineHeight: 3, fontStyle: "italic" }}
              >
                {" "}
                {user?.zona_pais} ({user?.zona_ciudad}){" "}
              </Typography>
              <Typography
                sx={{
                  color: "#00f0ff",
                  fontSize: "80px",
                  fontWeight: 900,
                  fontStyle: "italic",
                  textShadow: "0 0 5px #00f0ff",
                  marginTop: "-25px",
                }}
              >
                {user?.username}
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 5,
                    height: "55px",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: "#1A1D2D",
                      p: 1,
                      borderLeft: "2px solid #00f0ff",
                      color: "white",
                    }}
                  >
                    RANK: {RankConverter(user?.rango)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 5,
                    height: "55px",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: "#1A1D2D",
                      p: 1,
                      borderLeft: "2px solid #2FF801",
                      color: "#2FF801",
                    }}
                  >
                    STREET CRED:{" "}
                    {streetCred(user?.victorias, user?.derrotas, user?.rango)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "#192232",
              width: "350px",
              height: "262px",
              position: "relative",
              bottom: "53px",
              padding: 5,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "48px",
                left: "320px",
                backgroundColor: "#2FF801",
                borderRadius: "50%",
                width: "10px",
                height: "10px",
              }}
            ></Box>

            <Typography variant="caption" color="grey">
              GLOBAL PRECISION INDEX
            </Typography>
            <Typography
              sx={{
                color: "#0ff0ff",
                fontSize: "85px",
                fontWeight: 900,
                fontStyle: "italic",
              }}
            >
              #42
              <span
                style={{ fontSize: 20, color: "#94A3B8", fontStyle: "italic" }}
              >
                / 1.2m
              </span>{" "}
            </Typography>
            <Box
              sx={{
                border: "1px solid #0ff0ff",
                width: "258px",
                boxShadow: "0 0 5px #00f0ff",
              }}
            ></Box>
            <Typography variant="caption" color="grey" sx={{ lineHeight: 5 }}>
              TOP 0.1% WORLDWIDE / {RankConverter(user?.rango)}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            backgroundColor: "#0A0A12",
          }}
        >
          <Box
            sx={{
              flex: 1,
              border: "1px solid rgba(47,47,62,.3)",
              p: 6,
              "&:hover": {
                backgroundColor: "rgba(47, 47, 62, 0.2)",
                borderTop: "1px solid #00F0FF",
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontSize: 9, color: "#90A0B3" }}
            >
              Wins
            </Typography>
            <Typography color="#00F0FF" variant="h3">
              {user?.victorias}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              border: "1px solid rgba(47,47,62,.3)",
              p: 6,
              "&:hover": {
                backgroundColor: "rgba(47, 47, 62, 0.2)",
                borderTop: "1px solid red",
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontSize: 9, color: "#90A0B3" }}
            >
              Loses
            </Typography>
            <Typography color="#FF4B4B" variant="h3">
              {user?.derrotas}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              border: "1px solid rgba(47,47,62,.3)",
              p: 6,
              "&:hover": {
                backgroundColor: "rgba(47, 47, 62, 0.2)",
                borderTop: "1px solid #2FF801",
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontSize: 9, color: "#90A0B3" }}
            >
              PRECISION RATE
            </Typography>
            <Typography color="#2FF801" variant="h3">
              {WinRate(user?.victorias, user?.derrotas)}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              border: "1px solid rgba(47,47,62,.3)",
              p: 6,
              "&:hover": {
                backgroundColor: "rgba(47, 47, 62, 0.2)",
                borderTop: "1px solid white",
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontSize: 9, color: "#90A0B3" }}
            >
              ENGANGEMENTS
            </Typography>
            <Typography variant="h3">
              {Engangements(user?.victorias, user?.derrotas)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 6 }}>
          <Typography>Mi Vehiulo activo</Typography>
          <CardsCars active={true} />
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default Profile;
