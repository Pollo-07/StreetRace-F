import { Box, Typography } from "@mui/material";
import CardsCars from "../components/cardsCars";
import CardsChallenge from "../components/cardsChallenge";
import FindRivals from "../components/findRivals";
import RaceNow from "../components/raceNow";
import Banner from "../components/banner";
import PageWrapper from "../components/pageWrapper";
import UseChallenges from "../hooks/useChallenges";
const Dashboard = () => {

  const {challenges} = UseChallenges()

   const challengesSize = challenges?.filter(
        (challenge) =>
          challenge.challenge.estado === "aceptado" || challenge.challenge.estado === "en_curso",
      ).length
  



      console.log(challengesSize)
  return (
    <PageWrapper>
      <Box sx={{ width: "100%", height: "auto", pb: 5 }}>
        <Box
          sx={{ display: "flex", alignItems: "flex-start", padding: 6, gap: 3 }}
        >
          <Banner />
          <Box>
            <RaceNow />
            <FindRivals />
          </Box>
        </Box>

        <Box sx={{ color: "white", paddingLeft: 6, pr: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "25px",
                fontStyle: "italic",
                borderLeft: "10px solid #00f0ff",
                pl: 2,
              }}
            >
              ACTIVE CHALLENGES
            </Typography>
            {
              challengesSize !==0 || challengesSize === undefined &&  <Box
              sx={{
                border: "1px solid red",
                padding: 0.5,
                background: "#231118",
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  color: "red",
                  width: "160px",
                  textAlign: "center",
                  fontWeight: 800,
                }}
              >
                URGENT: {challengesSize} EXPIRING SOON
              </Typography>
            </Box>
            }
           
          </Box>
           <Box sx={{display:"flex",gap:2,flexWrap: "wrap",justifyContent:"center"}}>
               <CardsChallenge active={true} />
           </Box>

          
        </Box>

        <Box sx={{ p: "25px 0px 0px 47px"}}>
            <Typography
              sx={{
                color:"white",
                fontSize: "25px",
                fontStyle: "italic",
                borderLeft: "10px solid #ff6e81",
                pl: 2,
              }}
            >
              ACTIVE CARS
            </Typography>
          <CardsCars active={true}/>
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default Dashboard;
