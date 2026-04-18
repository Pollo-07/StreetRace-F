import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useState, } from "react";
import type { challengaAll } from "../../../types/challangeTypes";
import SectionBlock from "../../../components/sectionBlock";
import ButtonCustom from "../../../components/buttonCustom";
import { useAdmin } from "../../admin/hooks/useAdmin";

type Props = {
  open: boolean;
  challenge:challengaAll;
  Setopen:React.Dispatch<React.SetStateAction<boolean>>
};

export default function DisputeOpinionModal({
  open,
  challenge,
  Setopen
}: Props) {
 
  const [selected, setSelected] = useState<string>("");
  const {challengeComplete} = useAdmin()

  const handleSubmit = () => {

     challengeComplete({id:challenge?.challenge.id,ganador_id:selected})
  };
const onClose=()=>{
  Setopen(false)

}
    return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          background: "#000",
          border: "1px solid rgba(200,200,200,.3)",
         
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle>
        <Typography
          sx={{
            color: "#0ff",
            fontWeight: "bold",
            fontSize: 35,
            fontStyle:"italic",
            textAlign: "",
          }}
        >
          Disputed Race 
        </Typography>
      </DialogTitle>

      <DialogContent>
    
        <SectionBlock label={" Carrera en disputa"}>

            <Stack spacing={2.5}>
                 <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ color: "#aaa", fontSize: 13 }}>
                        Tipo de carrera
                    </Typography>
                    <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>
                        {challenge.challenge.tipo_carrera}
                    </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ color: "#aaa", fontSize: 13 }}>
                        Ubicación
                    </Typography>
                    <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>
                        {challenge.challenge.ubicacion_acordada}
                    </Typography>
                    </Box>

                    <Box >
                    <Typography sx={{ color: "#aaa", fontSize: 13, mb: 1 }}>
                        Notas
                    </Typography>
                    <Typography sx={{ color: "#fff", fontSize: 14, lineHeight: 1.4,mb:1 }}>
                       Retador:  {challenge.challengeReport.retador_report_description|| "Sin notas"}
                    </Typography>
                    <Typography sx={{ color: "#fff", fontSize: 14, lineHeight: 1.4 }}>
                       Retado:  {challenge.challengeReport.retado_report_description|| "Sin notas"}
                    </Typography>

                    </Box>

                    <Box>
                        <ButtonCustom 
                        onClick={() => setSelected(challenge.retador.id)}
                        sx={{border:selected === challenge.retador.id ? "1px solid green" : " 1px solid rgba(0,240,255,0.3)",}}>
                       Retador:  {challenge.retador.username}
                    </ButtonCustom>
                    <ButtonCustom 
                    onClick={() => setSelected(challenge.retado.id)}
                    sx={{border:selected === challenge.retado.id ? "1px solid green" : " 1px solid rgba(0,240,255,0.3)",}}>
                       Retado:  {challenge.retado.username}
                    </ButtonCustom>
                    </Box>

                    

            </Stack>
           

        </SectionBlock>


      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 ,alignItems:"center"}}>
        <ButtonCustom
          onClick={()=>Setopen(false)}
          sx={{
            color: "#f00",
            border: "1px solid #f00",
              width:250,
               "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
            },
          }}
        >
          Cancelar
        </ButtonCustom>

        <ButtonCustom
          onClick={handleSubmit}
          variant="contained"
          sx={{
            width:250
          }}
        >
          Resolve challenge
        </ButtonCustom>
      </DialogActions>
    </Dialog>
  );
}