import { Box, Card, CardContent, Typography } from "@mui/material";
import img_prueba from "../assets/img-prueba.png";
import { WinRate } from "../../../utils/winRate";
import UseChallanges from "../hooks/useChallenges";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import { ChallengeActions } from "../utils/challengeActions ";
import ModalFinalizar from "../../../components/modalFinalizar";
import ChallangeEmpty from "./challangeEmpty";
type Props = {
  active?: boolean;
};

const CardsChallenge = ({ active }: Props) => {
  const [open, Setopen] = useState<boolean>(true);

  const [selectedChallenge, setSelectedChallenge] = useState<any>(null)
  const {
    challenges,
  } = UseChallanges();

  const { user } = useUser();
  const userId = user?.id;

  const challengesFilter = active
    ? challenges?.filter(
        (challenge) =>
          challenge.challenge.estado === "aceptado" ||
          challenge.challenge.estado === "en_curso"
      )
    : challenges;

  const handleOpenModal = (challengeItem: any) => {
  setSelectedChallenge(challengeItem);
  Setopen(true);
};
 
  return (
    <>
      {!challengesFilter || challengesFilter.length === 0 ? <ChallangeEmpty/> : (
        challengesFilter.map((challenge, index) => {

          const soyRetador = userId === challenge.retador.id;
           const yoReporte = soyRetador
            ? challenge.challengeReport.retador_ganador_id != null
            : challenge.challengeReport.retado_ganador_id != null;

          return (
            <Card
              key={index}
              sx={{
                width: "550px",
                mt: 4,
                height: 220,
                backgroundColor: "#0C0C15",
                color: "white",
                "&:hover": {
                  boxShadow: "0 0 5px #00f0ff",
                },
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <CardContent sx={{ display: "flex",  height: "100%" }}>
                <Box sx={{ flex: 3, }}>

                  <Box sx={{ position: "relative", }}>
                    <Box
                      component="img"
                      src={img_prueba}
                      sx={{ width: 100, border: "1px solid #00f0ff" }}
                    />


                    <Box
                      sx={{
                        width: 20,
                        backgroundColor: "#BC13FE",
                        position: "absolute",
                        top: 85,
                        left: 85,
                        p: "1px",
                        borderRadius:"25px"
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: 10,
                          textAlign: "center",
                        }}
                      >
                        {soyRetador? challenge.retado.rango : challenge.retador.rango}
                      </Typography>
                    </Box>

                  </Box>

                  <Typography sx={{ fontWeight: 600, }}>
                    {soyRetador? challenge.retado.username:challenge.retador.username}                  
                  </Typography>

                  <Typography variant="caption" color={"#00f0ff"} sx={{ 
                     display: "flex",alignItems:"center"}}>
                   <StarPurple500OutlinedIcon sx={{fontSize:15}}/>
                     WIN RATE:
                    {soyRetador?
                    WinRate(
                      challenge.retado.victorias,
                      challenge.retado.derrotas
                    )
                    :WinRate(
                      challenge.retador.victorias,
                      challenge.retador.derrotas
                    )}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: 1,
                   
                    
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="#838392">
                      MACHINE ENTRY
                    </Typography>

                    <Typography variant="h5" sx={{ fontStyle: "italic",color:"#00f0ff"  }}>

                     {
                        soyRetador
                          ? `${challenge.retado.vehiculo.marca} ${challenge.retado.vehiculo.modelo}`
                          : `${challenge.retador.vehiculo.marca} ${challenge.retador.vehiculo.modelo}`
                      }
                    </Typography>

                    <Typography variant="caption" color="grey">
                      TRACK 
                    </Typography>

                    <Typography sx={{ fontStyle: "italic",color:"#BC13FE" }}>
                      {challenge.challenge.ubicacion_acordada}
                    </Typography>
                  </Box>

                  <Box >
                    <Box sx={{ display: "flex", gap: 1 }}> 
                      <Typography>Carrera:</Typography>
                    <Typography sx={{color:"#00f0ff"}}>{challenge.challenge.tipo_carrera}</Typography>

                    </Box>
                    {
                      challenge.challenge.notas &&  
                        <Box sx={{ display: "flex", gap: 1,width:280 }}> 
                       <Typography>Notas:</Typography>
                    <Typography sx={{color:"#BC13FE"}}>{challenge.challenge.notas}</Typography>

                    </Box>
                    }
                  
                   
                  </Box>
                  
                </Box>

         
                <ChallengeActions   challenge={challenge} handleOpenModal={handleOpenModal} soyRetador={soyRetador} status={challenge.challenge.estado} yoReporte={yoReporte} />

              </CardContent>
            </Card>
          );
        })
      )
      
      }

   {selectedChallenge && open && (
  <ModalFinalizar
    key={selectedChallenge.id}
    open={open}
    challenge={selectedChallenge}
    Setopen={Setopen}
  />
)}





    
    </>

    
  );
};

export default CardsChallenge;













