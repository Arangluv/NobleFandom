import styled from "styled-components";
import { useState } from "react";
import SecretFeed from "../../../Components/FeedComponents/SecretFeed";
import OnlyBuyerFeed from "../../../Components/FeedComponents/OnlyBuyerFeed";
import Feed from "../../../Components/Feed";
import PremiumFeed from "../../../Components/FeedComponents/PremiumFeed";
import {
  HiSquares2X2,
  HiOutlineSquares2X2,
  HiSquare2Stack,
  HiOutlineSquare2Stack,
} from "react-icons/hi2";
import CardTypeFeed from "../../../Components/FeedComponents/CardTypeFeed";
import { useSetRecoilState } from "recoil";
import { userFeedLayout } from "../../../atoms/atoms";
const Wrapper = styled.div`
  width: 100%;
  min-height: 30vw;
  height: auto;
  margin-top: 1vw;
`;
const FeedEmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  h2,
  span {
    color: rgba(255, 255, 255, 0.5);
  }
  h2 {
    font-size: 3vw;
  }
`;
const PostFeedBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  button {
    padding: 1vw 4vw;
    font-size: 1.3vw;
    font-weight: 600;
    border: 1px solid white;
    border-radius: 10px;
    background-color: black;
    box-shadow: ${(props) => props.theme.textShadow};
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    transition: 0.1s ease-in-out;
  }
  button:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.accentColor};
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: white;
      font-size: 2.5vw;
    }
    svg:hover {
      cursor: pointer;
    }
  }
`;
function CreatorFeed() {
  // Feed Empty Test
  const [isEmptyFeed, setIsEmptyFeed] = useState(false);
  const [typeCard, setTypeCard] = useState(false);
  const setOverlay = useSetRecoilState(userFeedLayout);
  return (
    <Wrapper>
      <PostFeedBox>
        <button onClick={() => setOverlay("feed")}>피드 작성</button>
        <div>
          {typeCard ? (
            <HiOutlineSquare2Stack onClick={() => setTypeCard((pre) => !pre)} />
          ) : (
            <HiSquare2Stack onClick={() => setTypeCard((pre) => !pre)} />
          )}
          {typeCard ? (
            <HiSquares2X2 onClick={() => setTypeCard((pre) => !pre)} />
          ) : (
            <HiOutlineSquares2X2 onClick={() => setTypeCard((pre) => !pre)} />
          )}
        </div>
      </PostFeedBox>
      {isEmptyFeed ? (
        <FeedEmptyBox>
          <h2>아직 크리에이터가 만든 피드가 없어요</h2>
          <span>새로운 피드까지 조금만 기다려주세요😘</span>
        </FeedEmptyBox>
      ) : typeCard ? (
        <CardTypeFeed />
      ) : (
        <>
          <OnlyBuyerFeed />
          <SecretFeed />
          <PremiumFeed />
          <Feed />
        </>
      )}
    </Wrapper>
  );
}

export default CreatorFeed;
