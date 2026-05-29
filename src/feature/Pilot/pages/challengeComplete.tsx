import { Box, Typography } from "@mui/material";
import CardsChallengeComplete from "../components/cardsChallengeComplete";
import PageWrapper from "../components/pageWrapper";
import UseChallenges from "../hooks/useChallenges";

const ChallengeComplete = () => {
  const { challengeComplete, isLoadingChallengeComplete } = UseChallenges({
    enableChallenges: false,
    enableCompleteChallenges: true,
  });

  if (isLoadingChallengeComplete) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "white",
        }}
      >
        Cargando challenges...
      </Box>
    );
  }

  return (
    <PageWrapper>
      <Box sx={{ color: "white", p: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontStyle: "italic", fontWeight: 900, color: "#BC13FE" }}
        >
          Complete Feed
        </Typography>
        <Typography variant="h3" sx={{ fontStyle: "italic", fontWeight: 900 }}>
          Completed <span style={{ color: "#00f0ff" }}>Challenges</span>
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <CardsChallengeComplete challenges={challengeComplete} />
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default ChallengeComplete;
