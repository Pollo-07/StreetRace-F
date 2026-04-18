import {
  Box,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import image from "../../Pilot/assets/img-prueba.png"
import { useAdmin } from "../hooks/useAdmin";import { useState } from "react";
import ModalFinalizar from "../../../components/modalFinalizar";
import DisputeOpinionModal from "../../Pilot/components/modalDisputa";

export const DisputeCard = () => {


  const  {challengeDisputed} = useAdmin()
  const [open,Setopen] = useState<boolean>(false)
  const [Select,SetSelect] = useState<any>("")


  console.log(challengeDisputed)

  return (


    <Box>

      {
        challengeDisputed?.map((item)=>(
          <Box
          key={item.challenge.id}
      sx={{
        backgroundColor: "#0C0C15",
        borderLeft: `2px solid #00ffff`,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#353535",
          px: 2,
          py: 0.5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 10, color: "#BC13FE"}}>
          DISPUTE_ID: {item.challenge.id}
        </Typography>
        <Typography sx={{ fontSize: 10, color: "#888" }}>
         {new Date(item.challenge.fecha_acordada).toLocaleDateString("es-CO")}
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          p: 3,
        }}
      >
        {/* Players */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
            <Box sx={{display:"flex",flexDirection:"column", alignItems:"center",gap:1}}>
                  <Avatar
                    src={image}
                    sx={{
                      border:"1px solid red",
                      width: 64,
                      height: 64,
                      filter: "grayscale(1)",
                      "&:hover": { filter: "grayscale(0)" },
                    }}
                  />
               <Typography>{item.retador.username}</Typography>
            </Box>
            
         

          <Typography sx={{ color: "#00ffff", fontWeight: "bold" }}>
            VS
          </Typography>


          <Box sx={{display:"flex",flexDirection:"column", alignItems:"center",gap:1}}>
                <Avatar
          src={image}
          sx={{
            border:"1px solid red",
            width: 64,
            height: 64,
            filter: "grayscale(1)",
            "&:hover": { filter: "grayscale(0)" },
          }}
        />

          <Typography>{item.retado.username}</Typography>

            
            </Box>

          
        </Box>

        {/* Info */}
        <Box sx={{ flex: 1, }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 18,
              color:"#fff" ,
            }}
          >
           Tipo de carrera / <span style={{  color: "#00ffff"}}>{item.challenge.tipo_carrera}</span>
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Typography
             
              sx={{
                width:"100%",
                mb: 1,
                color:"#fff",
                fontSize: 18,
                
              }}
            >

               fecha acordada : <span style={{  color: "#00ffff"}}>{new Date(item.challenge.fecha_acordada).toLocaleDateString("es-CO")}</span> 
         </Typography>

          

            <Typography
              sx={{
                fontSize: 12,
                color:"#BC13FE"
              }}
            >
              NOTAS : <span>{item.challenge.notas}</span>
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 2,
              p: 1.5,
              border: "1px solid #333",
              backgroundColor: "#000",
              display:"flex",
              flexDirection:"column",
              gap:2
            }}
          >
            <Typography sx={{ fontSize: 11, color: "#aaa" }}>
              Retado:  {item.challengeReport.retado_report_description}
            </Typography>

             <Typography sx={{ fontSize: 11, color: "#aaa" }}>
              Retador:  {item.challengeReport.retador_report_description}
            </Typography>
          </Box>
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
          }}
        >
          <Button
          onClick={()=>{SetSelect(item),Setopen(true)}}
            sx={{
              backgroundColor: "#00ffff",
              color: "#000",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#00cccc",
              },
            }}
          >
            RESOLVE
          </Button>
       

        </Box>


      </Box>
        </Box>

        ))
      }


         
       {Select && (
         <DisputeOpinionModal
        open={open}
        Setopen={Setopen}
        challenge={Select}
        
      />
       )
       }


    </Box>
  
  );
};

