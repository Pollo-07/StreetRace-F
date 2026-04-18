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


      const handlerAcceptChallenge = (id: string, id_retado: string) => {
    acceptChallenge({ id, id_retado });
  };

  const handlerRejectChallenge = (id: string, id_retado: string) => {
    rejectChallenge({ id, id_retado });
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
            sx={btnGrey}
          >
            Finalizar
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
                  challenge.retado.id
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
                  challenge.retado.id
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
          <Typography variant="caption" color="grey">
            Challenge finalizado.
          </Typography>
        );


        case "disputa":
        return (
          <>
          
          <Typography variant="caption" color="grey">
            Challenge en disputa .
          </Typography>
          
          
              {/* <Button
              onClick={() =>
                handleOpenModal(challenge)
              }
              variant="contained"
              sx={btnGrey}
            >
              dar opinion
            </Button> */}
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