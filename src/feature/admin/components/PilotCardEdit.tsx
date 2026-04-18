import { Card, CardContent, Avatar, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/EditNote";
import type { User } from "../../../types/userTypes";
import { RankConverter } from "../../../utils/rankConverter";


interface PilotCardEditPops {
  setPilotData:React.Dispatch<React.SetStateAction<User>>
  user:{data:User[] ,totalUser:{total:number}} | undefined
}

export default function PilotCardEdit({setPilotData,user}:PilotCardEditPops) {



   const  image= "https://i.pravatar.cc/100?img=1"


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
            borderLeft: `3px solid #BC13FE}`,
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2,"&:hover": { bgcolor: "#1f1f1f" },
 }}>
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







