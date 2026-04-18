import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import image from "../../Pilot/assets/img-prueba.png"
import { useAdmin } from "../hooks/useAdmin";
import { getStreetCredValue, streetCred } from "../../../utils/winRate";
import { RankConverter } from "../../../utils/rankConverter";



export default function RankingTable() {


    const {userAll} = useAdmin()
  return (
    <Table sx={{ bgcolor: "#000"   }}>
      <TableHead>
        <TableRow sx={{backgroundColor:"#191B1B"}}>
          <TableCell sx={{ color: "#888" }}>RANK</TableCell>
          <TableCell sx={{ color: "#888" }}>PILOT</TableCell>
          <TableCell sx={{ color: "#888" }}>TEAM</TableCell>
          <TableCell sx={{ color: "#888" }}>WINS</TableCell>
          <TableCell sx={{ color: "#888" }}>POINTS</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {(userAll?? []).slice() 
            .sort((a, b) =>   
              getStreetCredValue(b.victorias, b.derrotas, b.rango) -
              getStreetCredValue(a.victorias, a.derrotas, a.rango)
            ).map((row) => (
          <TableRow
            key={row.id}
            sx={{
              
              "&:hover": {
                bgcolor: "#111",
              },
            }}
          >
            <TableCell sx={{ color: "#BC13FE" }}>
            { RankConverter(row.rango) }
            </TableCell>

            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                <Typography sx={{ color: "#fff" }}>
                  {row.username}
                </Typography>
              </Box>
            </TableCell>

            <TableCell sx={{ color: "#888" }}>
             {row.CompetitionCategory}
            </TableCell>

            <TableCell sx={{ color: "#BC13FE" }}>
              {row.victorias}
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
             {streetCred(row.victorias,row.derrotas,row.rango)} 
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}