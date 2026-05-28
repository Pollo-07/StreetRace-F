import { Avatar, Box, Typography } from "@mui/material";
import CardsCars from "../components/cardsCars";
import { RankConverter } from "../../../utils/rankConverter";
import { Engangements, streetCred, WinRate } from "../../../utils/winRate";
import PageWrapper from "../components/pageWrapper";
import { useUser } from "../hooks/useUser";

const Profile = () => {
  const user = useUser().user;

  return (
    <PageWrapper>
      <Box
        sx={{
          color: "white",
          p: { xs: 2, sm: 3, md: "70px 20px" },
        }}
      >
        {/* 🔥 HEADER */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
            },
            alignItems: {
              xs: "center",
              sm: "center",
              md: "flex-start",
            },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* LEFT */}
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
              },
              alignItems: "center",
              textAlign: { xs: "center", md: "left" },
              gap: { xs: 2, sm: 3 },
              flex: 1,
            }}
          >
            {/* 🔥 IMAGE / AVATAR */}
            <Box sx={{ position: "relative" }}>
              {user?.foto_perfil ? (
                <>
                  <Box
                    component="img"
                    src={user?.foto_perfil}
                    sx={{
                      width: { xs: 120, sm: 160, md: 200 },
                      height: { xs: 130, sm: 170, md: 210 },
                      objectFit: "cover",
                      filter: "grayscale(100%)",
                      transition: "0.3s",
                      "&:hover": {
                        filter: "grayscale(0%)",
                      },
                    }}
                  />

                  {/* Esquinas */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -5,
                      left: -5,
                      width: 15,
                      height: 15,
                      borderTop: "3px solid #00f0ff",
                      borderLeft: "3px solid #00f0ff",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -5,
                      right: -5,
                      width: 15,
                      height: 15,
                      borderBottom: "3px solid #00f0ff",
                      borderRight: "3px solid #00f0ff",
                    }}
                  />
                </>
              ) : (
                <Avatar
                  sx={{
                    width: { xs: 100, sm: 130, md: 150 },
                    height: { xs: 100, sm: 130, md: 150 },
                    border: "4px solid white",
                    fontSize: 40,
                  }}
                >
                  {user?.username
                    ? user.username[0].toUpperCase()
                    : "?"}
                </Avatar>
              )}
            </Box>

            {/* 🔥 INFO */}
            <Box>
              <Typography variant="caption" color="#94A3B8">
                SYSTEM STATUS: ACTIVE
              </Typography>

              {user?.zona_pais && user?.zona_ciudad && (
                <Typography variant="caption" color="#2FF801">
                  {" "}
                  ,{user.zona_pais} / {user.zona_ciudad}
                </Typography>
              )}

              <Typography
                sx={{
                  color: "#00f0ff",
                  fontWeight: 900,
                  fontStyle: "italic",
                  textShadow: "0 0 5px #00f0ff",
                  fontSize: {
                    xs: "40px",
                    sm: "55px",
                    md: "80px",
                  },
                }}
              >
                {user?.username}
              </Typography>

              {/* RANK + STREET */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  alignItems: "center",
                  justifyContent: {
                    xs: "center",
                    md: "flex-start",
                  },
                  gap: 2,
                  mt: 1,
                }}
              >
                <Typography
                  sx={{
                    backgroundColor: "#1A1D2D",
                    p: 1,
                    borderLeft: "2px solid #00f0ff",
                  }}
                >
                  RANK: {RankConverter(user?.rango)}
                </Typography>

                <Typography
                  sx={{
                    backgroundColor: "#1A1D2D",
                    p: 1,
                    borderLeft: "2px solid #2FF801",
                    color: "#2FF801",
                  }}
                >
                  STREET CRED:{" "}
                  {streetCred(
                    user?.victorias,
                    user?.derrotas,
                    user?.rango
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 🔥 RIGHT PANEL */}
          <Box
            sx={{
              backgroundColor: "#192232",
              width: {
                xs: "100%",
                sm: "80%",
                md: 350,
              },
              margin: "0 auto",
              p: { xs: 2, sm: 3 },
            }}
          >
            <Typography variant="caption" color="grey">
              GLOBAL PRECISION INDEX
            </Typography>

            <Typography
              sx={{
                color: "#0ff0ff",
                fontWeight: 900,
                fontStyle: "italic",
                fontSize: {
                  xs: "45px",
                  sm: "65px",
                  md: "85px",
                },
              }}
            >
              #42
              <span style={{ fontSize: 14, color: "#94A3B8" }}>
                / 1.2m
              </span>
            </Typography>

            <Box
              sx={{
                border: "1px solid #0ff0ff",
                width: "100%",
                boxShadow: "0 0 5px #00f0ff",
                my: 1,
              }}
            />

            <Typography variant="caption" color="grey">
              TOP 0.1% WORLDWIDE / {RankConverter(user?.rango)}
            </Typography>
          </Box>
        </Box>

        {/* 🔥 STATS */}
        <Box
          sx={{
            mt: 4,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 1,
          }}
        >
          <StatBox label="Wins" value={user?.victorias} color="#00F0FF" />
          <StatBox label="Loses" value={user?.derrotas} color="#FF4B4B" />
          <StatBox
            label="PRECISION RATE"
            value={WinRate(user?.victorias, user?.derrotas)}
            color="#2FF801"
          />
          <StatBox
            label="ENGANGEMENTS"
            value={Engangements(user?.victorias, user?.derrotas)}
          />
        </Box>

        {/* 🔥 CARS */}
        <Box sx={{ p: { xs: 2, sm: 3, md: 6 } }}>
          <Typography
            sx={{
              fontSize: { xs: 18, sm: 22, md: 25 },
              fontStyle: "italic",
              borderLeft: "10px solid #ff6e81",
              pl: 2,
            }}
          >
            ACTIVE CARS
          </Typography>

          <CardsCars active={true} />
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default Profile;

/* 🔥 REUTILIZABLE */
const StatBox = ({ label, value, color = "white" }: any) => (
  <Box
    sx={{
      border: "1px solid rgba(47,47,62,.3)",
      p: { xs: 2, sm: 3 },
      textAlign: "center",
      transition: "0.3s",
      "&:hover": {
        backgroundColor: "rgba(47, 47, 62, 0.2)",
        borderTop: `1px solid ${color}`,
      },
    }}
  >
    <Typography variant="caption" sx={{ fontSize: 10, color: "#90A0B3" }}>
      {label}
    </Typography>
    <Typography sx={{ color }} variant="h5">
      {value}
    </Typography>
  </Box>
);