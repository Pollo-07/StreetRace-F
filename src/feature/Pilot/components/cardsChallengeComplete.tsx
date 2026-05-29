import type { challengaAll } from "../../../types/challangeTypes";
import CardsChallenge from "./cardsChallenge";

type Props = {
  challenges?: challengaAll[];
};

const CardsChallengeComplete = ({ challenges }: Props) => {
  return <CardsChallenge challengesData={challenges} readOnly />;
};

export default CardsChallengeComplete;
