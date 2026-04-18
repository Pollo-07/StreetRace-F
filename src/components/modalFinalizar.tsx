import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useState } from 'react'
import SectionBlock from './sectionBlock';
import UseChallanges from "../feature/Pilot/hooks/useChallenges";
import ButtonCustom from './buttonCustom';
import type { challengaAll } from '../types/challangeTypes';
import DarkField from './darkField';
import { useUser } from '../feature/Pilot/hooks/useUser';
type Props = {
  open: boolean;
  challenge: challengaAll;
    Setopen: React.Dispatch<React.SetStateAction<boolean>>;
  
};

const ModalFinalizar = ({ open,Setopen,challenge,}: Props) => {

  const [selected, setSelected] = useState<string>("");
    const [notas, setNotas] = useState<string>("");

  const {completeChallenge} = UseChallanges();
  const  {user} = useUser()

 const handleCompleteChallenge=(id:string,id_ganador:string)=>{

      if (!selected) return;
             completeChallenge({id,id_ganador,notas})
            setSelected("");
             onClose();
    }

  const onClose =()=>{
    Setopen(false)
    setSelected("");

  }

  const Yoreporte =()=>{
     const soyRetador = user?.id === challenge.retador.id;
           return  soyRetador
            ? challenge.challengeReport.retador_ganador_id != null
            : challenge.challengeReport.retado_ganador_id != null;
  }
 
  return (
     <Dialog open={open} onClose={onClose} fullWidth >
      
      <DialogTitle sx={{ textAlign: "center", fontWeight: 700,bgcolor:"#000" ,color:"white"}}>
        ¿Quién ganó el reto?
      </DialogTitle>

      <DialogContent sx={{bgcolor:"#000",}}>
       
        <SectionBlock label={"Indicar ganador"}>
  <Box display="flex" flexDirection="column" gap={2}>
    
    <ButtonCustom
      disabled={Yoreporte()}
     onClick={() => {setSelected(challenge.retador.id)}}
      sx={{border:selected === challenge.retador.id ? "1px solid green" : " 1px solid rgba(0,240,255,0.3)",}}
     >
      {challenge?.retador.username}
    </ButtonCustom>

    <ButtonCustom
    disabled={Yoreporte()}
      sx={{border:selected === challenge.retado.id ? "1px solid green" : " 1px solid rgba(0,240,255,0.3)"}}
      onClick={() => setSelected(challenge.retado.id)}
      >
      {challenge?.retado.username}
    </ButtonCustom>

         <DarkField
         value={notas}
         onChange={(e:any)=>{
          setNotas(e.target.value)
         }}
                    sx={{mt:5}}
                fullWidth
                multiline
                rows={4}
                label="Tu opinión"
                />

  </Box>
</SectionBlock>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2,bgcolor:"#000" ,color:"white" }}>
        <ButtonCustom onClick={() => console.log("heloo")} >
                 cancelar
          </ButtonCustom>
       <ButtonCustom onClick={() =>handleCompleteChallenge(challenge.challenge.id,selected) } >
             Confirma ganador
          </ButtonCustom>
      </DialogActions>

    </Dialog>


  )
}

export default ModalFinalizar
