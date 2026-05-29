import { Box, Button, Typography } from "@mui/material";
import { btnGrey, btnPrimary } from "../components/buttonStyles";
import UseChallanges from "../hooks/useChallenges";
import type { challengaAll, ChallengeStatus } from "../../../types/challangeTypes";

type Props = {
  challenge: challengaAll;
  status:ChallengeStatus,
  soyRetador: boolean;
  yoReporte: boolean;
  handleOpenModal: (c: challengaAll) => void;
};

export const ChallengeActions = ({challenge,status,soyRetador,yoReporte,handleOpenModal,
}: Props) => {
 
const { acceptChallenge, rejectChallenge,cancelChallenge, startChallenge} = UseChallanges();


      const handlerAcceptChallenge = (id: string, id_retado: string,id_retador:string) => {
        const  notification = {
          user_id: id_retador,
          tipo: "reto_aceptado",
          mensaje:`el Pilot ${challenge.retado.username} ha aceptado el challenge`,
          leida: false,
        }
    acceptChallenge({ id, id_retado,notification });
  };

  
  const handlerRejectChallenge = (id: string, id_retado: string,id_retador:string) => {
    const  notification = {
          user_id: id_retador,
          tipo: "reto_rechazado",
          mensaje:`el Pilot ${challenge.retado.username} ha rechado el challenge`,
          leida: false,
        }
    rejectChallenge({ id, id_retado,notification });
  };


  const handlercancelChallenge = (id: string) => {
    cancelChallenge({ id });
  };

  const handleStartChallenge = (id: string) => {
    startChallenge({ id });
  };



  const renderActions = () => {
    switch (status) {
      case "resultado_pendiente":
        if (yoReporte) {
          return (
            <Typography variant="caption" color="grey">
              Ya reportaste. Esperando que el otro jugador confirme.
            </Typography>
          );
        }

        return (
          <>
            <Typography variant="caption" color="#00f0ff">
              El otro jugador ya reportó. ¡Confirma el tuyo!
            </Typography>
            <Button
              onClick={() => {handleOpenModal(challenge)}}
              variant="contained"
              sx={btnGrey}
            >
              Finalizar
            </Button>
          </>
        );

      case "en_curso":
        return (
          <Button
            onClick={() => handleOpenModal(challenge)}
            variant="contained"
            sx={{backgroundColor:"#BC13FE",color:"#fff"}}
          >
            Visualizar
          </Button>
        );

      case "aceptado":
        return (
          <>
            <Button
              onClick={() => handleStartChallenge(challenge.challenge.id)}
              variant="contained"
              sx={btnPrimary}
            >
              Poner en curso
            </Button>

            <Button
              onClick={() =>
                handlercancelChallenge(challenge.challenge.id)
              }
              variant="contained"
              sx={btnGrey}
            >
              Cancelar
            </Button>
          </>
        );

      case "pendiente":
        if (soyRetador) {
          return (
            <Typography variant="caption" color="grey">
              Esperando que el otro jugador acepte el challenge.
            </Typography>
          );
        }

        return (
          <>
            <Button
              onClick={() =>
                handlerAcceptChallenge(
                  challenge.challenge.id,
                  challenge.retado.id,
                  challenge.retador.id
                )
              }
              variant="contained"
              sx={btnPrimary}
            >
              Aceptar
            </Button>

            <Button
              onClick={() =>
                handlerRejectChallenge(
                  challenge.challenge.id,
                  challenge.retado.id,
                  challenge.retador.id
                )
              }
              variant="contained"
              sx={btnGrey}
            >
              REJECT
            </Button>
          </>
        );

      case "completado":
        return (
          <Button
            onClick={() => handleOpenModal(challenge)}
            variant="contained"
            sx={{backgroundColor:"#BC13FE",color:"#fff"}}
          >
            Visualizar
          </Button>
        );


        case "disputa":
        return (
          <>
          
          <Typography variant="caption" color="grey">
            Challenge en disputa .
          </Typography>
            </>
          
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "flex-end",
        flex: 2,
      }}
    >
      {renderActions()}
    </Box>
  );
};
