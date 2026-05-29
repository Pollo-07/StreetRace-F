import { Box, Dialog, DialogActions, DialogContent, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import UseChallanges from "../feature/Pilot/hooks/useChallenges";
import ButtonCustom from "./buttonCustom";
import type { challengaAll } from "../types/challangeTypes";
import DarkField from "./darkField";
import MapLibreBox from "../feature/Pilot/components/MapLibreBox";
import SectionBlock from "./sectionBlock";
import { getCoords } from "../utils/getCoords";

type Props = {
  open: boolean;
  challenge: challengaAll;
  Setopen: React.Dispatch<React.SetStateAction<boolean>>;
  readOnly?: boolean;
};


type Coordenadas = {
  lon:number,
  lat:number
}
const ModalFinalizar = ({ open, Setopen, challenge, readOnly = false }: Props) => {
  const [selected, setSelected] = useState<string>("");
  const [notas, setNotas] = useState<string>("");
  const [dir, setDir] = useState<Coordenadas>({ lon: 0, lat: 0});
  const participantes = [challenge.retador, challenge.retado];
  const ganadorId =
    challenge.challenge.ganador_id ||
    challenge.challengeReport.retador_ganador_id ||
    challenge.challengeReport.retado_ganador_id;
  const ganador = participantes.find((p) => p.id === ganadorId);
  const { completeChallenge } = UseChallanges();

useEffect(()=>{
      async function procesarUbicacion() {
      try {        
          const result = await getCoords(`${challenge.challenge.ubicacion_acordada}`);
              if (result) {
                    const {lon, lat,  } = result;
                    setDir({   lon:lon,lat:lat, })   
              } 
      } catch (error:any) {
        console.error("Error obteniendo coordenadas:", error);
         throw new Error(error.messange)
      }
  }
  procesarUbicacion()

},[dir])

  const onClose = () => {
    Setopen(false);
    setSelected("");
  };

  const handleCompleteChallenge = (id: string, id_ganador: string) => {
    if (!selected) return;

    const  notification =  [
          {
            user_id: challenge.retador.id,
            tipo: "resultado",
            mensaje: `Ya hay resultado de tu carrera`,
            leida: false
          },
          {
            user_id: challenge.retado.id,
            tipo: "resultado",
            mensaje: `Ya hay resultado de tu carrera`,
            leida: false
          }
];


    console.log("notification",notification)
    completeChallenge({ id, id_ganador, notas ,notification});
    setSelected("");
    onClose();
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          bgcolor: "#000",
          borderRadius: 3,
          border: "1px solid rgba(0,240,255,0.15)",
          height: "92vh",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 3,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.3fr 1fr" },
          gap: 3,
          overflow: "auto",
        }}
      >
        <SectionBlock label="INFO">
          <Stack spacing={1.5}>
              <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid rgba(0,240,255,0.12)",
              bgcolor: "rgba(255,255,255,0.02)",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                Tipo carrera
              </Box>
              <Box sx={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>
                {challenge?.challenge?.tipo_carrera || "No definido"}
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            >
              <Box sx={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                Descripción
              </Box>
              <Box
                sx={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.75)",
                  textAlign: "right",
                  maxWidth: "70%",
                }}
              >
                {challenge?.challenge?.notas || "Sin descripción"}
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            >
              <Box sx={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                Dirección
              </Box>
              <Box
                sx={{
                  fontSize: 13,
                  color: "rgba(0,240,255,0.9)",
                  textAlign: "right",
                  maxWidth: "70%",
                }}
              >
                📍 {challenge?.challenge?.ubicacion_acordada || "Sin dirección"}
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                Estado
              </Box>
              <Box
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#00ff88",
                }}
              >
                {challenge?.challenge?.estado}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              height: 300,
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid rgba(0,240,255,0.2)",
              bgcolor: "#0a0a0a",
            }}
          >
            <MapLibreBox lon={dir.lon} lat={dir.lat}/>
          </Box>

          </Stack>
         
        </SectionBlock>

        {!readOnly && <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <SectionBlock label="Seleccionar ganador">
              {participantes.map((p) => (
                <ButtonCustom sx={{border:selected === p.id? "1px solid green":""}} key={p.id} onClick={() => setSelected(p.id)} >
                {p.username}
              </ButtonCustom>
             
            ))}
          </SectionBlock>

          <SectionBlock label="Notas">
            <DarkField
              value={notas}
              onChange={(e: any) => setNotas(e.target.value)}
              fullWidth
              multiline
              rows={4}
              label="Tu opinión"
            />
          </SectionBlock>
        </Box>}

        {readOnly && <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <SectionBlock label="Ganador">
            <Box
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid rgba(0,240,255,0.12)",
                bgcolor: "rgba(255,255,255,0.02)",
                color: "#00f0ff",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {ganador?.username || "Ganador no definido"}
            </Box>
          </SectionBlock>
        </Box>}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, bgcolor: "#000" }}>
        <ButtonCustom onClick={onClose}>{readOnly ? "Cerrar" : "Cancelar"}</ButtonCustom>

        {!readOnly && <ButtonCustom
          disabled={!selected}
          onClick={() =>
            handleCompleteChallenge(challenge.challenge.id, selected)
          }
        >
          Confirmar ganador
        </ButtonCustom>}
      </DialogActions>
    </Dialog>
  );
};

export default ModalFinalizar;
