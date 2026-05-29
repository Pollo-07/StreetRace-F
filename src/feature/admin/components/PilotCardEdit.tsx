import { Card, CardContent, Avatar, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/EditNote";
import type { User } from "../../../types/userTypes";
import { RankConverter } from "../../../utils/rankConverter";


interface PilotCardEditPops {
  setPilotData:React.Dispatch<React.SetStateAction<User>>
  user:{data:User[] ,totalUser:{total:number}} | undefined
}

export default function PilotCardEdit({setPilotData,user}:PilotCardEditPops) {



  const imge_default = "https://res.cloudinary.com/di2pvfv0q/image/upload/v1779989724/default-avatar-icon-of-social-media-user-vector_ygyfmk.jpg";

console.log(user,"esto es user en pilot card edit")
  return (
        <Box>
        {user?.data?.map((user) => {
      return (
        <Card
        key={user.id}
        onClick={()=>setPilotData(user)}
          sx={{
            mb: 2,
            bgcolor: "#0C0C15",
            borderLeft: `3px solid #BC13FE`,
            cursor: "pointer",
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2,"&:hover": { bgcolor: "#1f1f1f" },
 }}>
            <Avatar
              src={user.foto_perfil || imge_default}
              sx={{
                border:"1px solid red",
                width: 64,
                height: 64,
                filter: "grayscale(1)",
                "&:hover": { filter: "grayscale(0)" },
              }}
            />

            <Box sx={{ flex: 1 }}>
              <Typography fontWeight="bold" sx={{color:"white"}}>{user.username}</Typography>
              <Typography sx={{ fontSize: "12px", color: "#888" }}>
                 • Rank - {RankConverter(user.rango)}
              </Typography>
            </Box>

            <IconButton sx={{ color: "#00f0ff" }}>
              <EditIcon />
            </IconButton>
          </CardContent>
        </Card>
       
      );
    })}

    </Box>
  );
}







