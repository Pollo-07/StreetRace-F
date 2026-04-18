import { Box, Typography } from '@mui/material'
import CardsDiscoverPilot from '../components/cardsDiscoverPilot'

const DiscoverPilot = () => {


 

  return (
    <Box sx={{p: 4,}}>
         <Box sx={{ mb: 4, borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 2 }}>
        <Typography
          variant="h4"
          sx={{ color: "#fff", fontWeight: "bold", fontStyle: "italic" }}
        >
          PILOT_DISCOVERY
        </Typography>
        <Typography variant="caption" sx={{ color: "#00f4fe", letterSpacing: 4 }}>
          ACTIVE_DRIVERS_IN_YOUR_SECTOR
        </Typography>
      </Box>
      <CardsDiscoverPilot/>
    </Box>
  )
}

export default DiscoverPilot
