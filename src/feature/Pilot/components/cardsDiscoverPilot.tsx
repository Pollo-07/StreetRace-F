import { useState } from "react";
import { Box, Typography, Card, CardMedia, Chip, Grid } from "@mui/material";
import ButtonCustom from "../../../components/buttonCustom";
import { useUser } from "../hooks/useUser";
import { Engangements, streetCred, WinRate } from "../../../utils/winRate";
import { RankConverter } from "../../../utils/rankConverter";
import ModalChallenge from "./ModalChallenge";
import type { DiscoverUserWithVehicle } from "../../../types/vehicleTypes";
import { useNavigate } from "react-router-dom";

const CardsDiscoverPilot = () => {
  const [enableScroll, setEnableScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<DiscoverUserWithVehicle>();
  const navigate = useNavigate();

  const handleOpen = (pilot: DiscoverUserWithVehicle) => {
    setInitialData(pilot);
    setOpen(true);
  };

  const { discoverPilot, respectPilot, respectPilotData } = useUser();
  const imge_default = "https://res.cloudinary.com/di2pvfv0q/image/upload/v1779989724/default-avatar-icon-of-social-media-user-vector_ygyfmk.jpg";
  const imge_defaultCars = "https://res.cloudinary.com/di2pvfv0q/image/upload/v1779991342/cards-defauld_l0shjg.png";
  return (
    <>
      {discoverPilot?.length !== 0 ? (
        <Box
          sx={{
            height: { xs: "auto", md: "70vh" },
            overflowY: enableScroll ? "scroll" : "hidden",
            scrollSnapType: "y mandatory",
            scrollSnapStop: "always",
            scrollBehavior: "smooth",
            transition: "all 0.10s ease",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {discoverPilot?.map((pilot, index) => {
            const pilotRespect = respectPilotData?.find(
              (p) => p.id === pilot.id,
            );

            return (
              <Box
                onMouseEnter={() => setEnableScroll(true)}
                onMouseLeave={() => setEnableScroll(false)}
                key={index}
                sx={{
                  height: "100%",
                  scrollSnapAlign: "start",
                  p: { xs: 2, md: 4 },
                  mb: 4,
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    width: "100%",
                    height: { xs: "auto", md: "60vh" },
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: "#10111A",
                    color: "white",
                    border: "1px solid rgba(0,244,254,0.2)",
                    boxShadow: "0 0 30px rgba(0,244,254,0.1)",
                  }}
                >
                  {/* LEFT */}
                  <Box
                    sx={{
                      width: { xs: "100%", md: "40%" },
                      p: { xs: 2, md: 3 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      borderRight: {
                        xs: "none",
                        md: "1px solid rgba(255,255,255,0.05)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        component="img"
                        src={pilot.foto_perfil || imge_default}
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          border: "2px solid #00f4fe",
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontStyle: "italic",
                            mb: 1,
                          }}
                        >
                          {pilot.username}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Chip
                            label={RankConverter(pilot.rango)}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: "#00f0ff",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                          <Chip
                            label={streetCred(
                              pilot.victorias,
                              pilot.derrotas,
                              pilot.rango,
                            )}
                            size="small"
                            sx={{
                              bgcolor: "#00f0ff",
                              color: "#000",
                              fontWeight: "bold",
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Grid container spacing={1}>
                      <Grid size={6}>
                        <Box sx={{ p: 1, bgcolor: "#000" }} color="#00f0ff">
                          <Typography variant="caption">WINS</Typography>
                          <Typography>{pilot.victorias}</Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Box sx={{ p: 1, bgcolor: "#000" }} color="#FF4B4B">
                          <Typography variant="caption">LOSES</Typography>
                          <Typography>{pilot.derrotas}</Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Box sx={{ p: 1, bgcolor: "#000" }} color="#2FF801">
                          <Typography variant="caption">PRECISION</Typography>
                          <Typography>
                            {WinRate(pilot.victorias, pilot.derrotas)}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Box sx={{ p: 1, bgcolor: "#000" }} color="#90A0B3">
                          <Typography variant="caption">ENGAGEMENTS</Typography>
                          <Typography>
                            {Engangements(pilot.victorias, pilot.derrotas)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* VEHICLE */}
                    <Box
                      sx={{
                        p: { xs: 1.5, md: 2 },
                        bgcolor: "#000",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: { xs: 2, md: 5 },
                        alignItems: { xs: "flex-start", md: "center" },
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="caption">TYPE</Typography>
                        <Typography color="#00f0ff">
                          {pilot.tipo_vehiculo}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="caption">MARCA / MODEL</Typography>
                        <Typography color="#00f0ff">
                          {pilot.marca} {pilot.modelo}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* RIGHT */}
                  <Box
                    sx={{
                      position: "relative",
                      flex: 1,
                      height: { xs: 250, sm: 300, md: "auto" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={pilot.foto|| imge_defaultCars}
                      sx={{
                        height: "100%",
                        objectFit: "cover",
                        transition: "0.5s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        p: 2,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                      }}
                    >
                      <ButtonCustom
                        variant="contained"
                        fullWidth
                        onClick={() => handleOpen(pilot)}
                      >
                        CHALLENGE
                      </ButtonCustom>

                      <ButtonCustom
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                          respectPilot(pilot.id);
                        }}
                        disabled={!!pilotRespect}
                      >
                        RESPECT
                      </ButtonCustom>
                    </Box>
                  </Box>
                </Card>
              </Box>
            );
          })}

          <ModalChallenge
            open={open}
            setOpen={setOpen}
            initialData={initialData}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: "60vh",
            px: 2,
          }}
        >
          <Typography
            sx={{
              color: "#00f0ff",
              textAlign: "center",
              mb: 5,
              fontSize: { xs: 20, md: 35 },
              fontStyle: "italic",
              fontWeight: 600,
            }}
          >
            PARA DESCUBRIR PILOTOS TIENE QUE CONFIGURAR TU ZONA
          </Typography>

          <ButtonCustom
            sx={{ width: 180, mx: "auto", display: "block" }}
            onClick={() => navigate("/edituser")}
          >
            Ir
          </ButtonCustom>
        </Box>
      )}
    </>
  );
};

export default CardsDiscoverPilot;
