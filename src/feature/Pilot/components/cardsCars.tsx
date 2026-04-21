import { Box, Button, Card, Tooltip, Typography } from "@mui/material";
import UseVehicle from "../hooks/useVehicle";
import CloseIcon from "@mui/icons-material/Close";
import type { Vehiculo } from "../../../types/vehicleTypes";
import CardsEmpty from "./cardsEmpty";
type Props = {
  active?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setMode?: React.Dispatch<React.SetStateAction<"create" | "edit">>;
  setDataEdit?: React.Dispatch<React.SetStateAction<Vehiculo | undefined>>;
};

const CardsCars = ({ active, setOpen, setMode, setDataEdit }: Props) => {
  // const carImage =
  //   "https://images.unsplash.com/photo-1503376780353-7e6692767b70";

  const { activeVehicle, deleteVehicle } = UseVehicle();

  const {vehicles} = UseVehicle();
  const vehiculoFilter = active
    ? vehicles?.filter((vehiculo) => vehiculo.activo === true)
    : vehicles;

  const activarVehiculo = (id: string) => {
    try {
      activeVehicle(id);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  const deleteVehiculo = (id: string) => {
    try {
      deleteVehicle(id);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  const hanlderModel = (data: Vehiculo) => {
    setMode?.("edit");
    setOpen?.(true);
    setDataEdit?.(data);
  };

  return (
    <>
      {!vehiculoFilter || vehiculoFilter.length === 0 ? (
        <CardsEmpty setOpen={setOpen} setMode={setMode} />
      ) : (
        vehiculoFilter?.map((vehiculo, index) => {
          return (
            <Card
              key={index}
              sx={{
                flex: "0 0 400px",

                width: { xs: "90%", sm: 400 },
                height: "auto",
                backgroundColor: "#0C0C15",
                border: vehiculo.activo
                  ? ""
                  : "1px solid rgba(255,255,255,0.2)",
                borderRadius: 2,
                cursor: "pointer",
                color: "white",
                "&:hover": {
                  boxShadow: vehiculo.activo
                    ? " 0 0 12px rgb(0, 255, 132)"
                    : "0 0 12px #00f0ff",
                },
                overflow: "hidden",
                position: "relative",
                mt: 5,
                boxShadow: vehiculo.activo
                  ? " 0 5px 12px rgba(0, 230, 118, 0.4)"
                  : "",
              }}
            >
              <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
                <Box
                  component="img"
                  src={vehiculo.foto}
                  alt="Car"
                  sx={{
                    width: "400px",
                    height: "250px",
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />

                <Typography
                  variant="body1"
                  sx={{
                    position: "absolute",
                    bottom: 25,
                    left: 10,
                    fontWeight: "bold",
                    color: "#00F0FF",
                    backgroundColor: "#104153",
                    padding: "2px 5px",
                    borderRadius: 2,
                    p: "5px 15px",
                    borderTop: "1px solid white",
                  }}
                >
                  {vehiculo.tipo_vehiculo} / {vehiculo.modelo}
                </Typography>

                {vehiculo.activo ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 5,
                      borderRadius: 50,
                      width: 20,
                      height: 20,
                      backgroundColor: "#2FF801",
                    }}
                  />
                ) : (
                  <Tooltip
                    title="Eliminar vehiculo"
                    sx={{ backgroundColor: "red" }}
                  >
                    <CloseIcon
                      onClick={() => deleteVehiculo(vehiculo.id)}
                      sx={{
                        color: "red",
                        position: "absolute",
                        top: 12,
                        right: 5,
                        fontSize: 30,
                      }}
                    />
                  </Tooltip>
                )}
              </Box>

              <Box
                onClick={() => hanlderModel(vehiculo)}
                sx={{
                  flex: 1,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  position: "relative",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="caption">{vehiculo.marca}</Typography>
                    <Typography variant="h5">{vehiculo.modelo}</Typography>
                  </Box>

                  <Box sx={{ color: "grey" }}>{vehiculo.año}</Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Box sx={{ backgroundColor: "#1c1b1b", flex: 1, p: 1 }}>
                    <Typography variant="caption" color="grey">
                      Color
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 15,
                          backgroundColor: vehiculo.color ?? "grey",
                          height: 15,
                          borderRadius: "50%",
                        }}
                      ></Box>
                      <Typography>{vehiculo.color}</Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: "#1c1b1b",
                      flex: 1,
                      p: 1,
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="caption" color="grey">
                      Placa
                    </Typography>
                    <Typography>{vehiculo.placa}</Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="caption">Premium Attributes </Typography>
                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    <Box
                      sx={{ backgroundColor: "#1c1b1b", p: 1, borderRadius: 5 }}
                    >
                      <Typography variant="caption">
                        {vehiculo.modificaciones
                          ? vehiculo.modificaciones
                          : "no disponible"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {!vehiculo.activo && (
                  <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        activarVehiculo(vehiculo.id);
                      }}

                    variant="contained"
                    sx={{
                      fontSize: 15,
                      backgroundColor: "#104153",
                      color: "#00F0FF",
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontStyle: "italic",
                      fontWeight: 600,
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    activar vehiclo
                  </Button>
                )}
              </Box>
            </Card>
          );
        })
      )}
    </>
  );
};

export default CardsCars;
