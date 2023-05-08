import styled from "styled-components";

// SubRank Park
const LowerRankContainer = styled.div`
  margin-top: 3vw;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 4vw;
`;
const LowerRankCard = styled.div`
  width: calc(81% + 6vw);
  display: flex;
  height: 25vh;
  margin-bottom: 2vw;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.textShadow};
`;
const LowerRankCardImageBox = styled.div`
  width: 20%;
  height: 100%;
  object-fit: contain;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`;
const UserMetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 1vw;
  padding-left: 3vw;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  span {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  #username {
    font-size: 1.8vw;
    margin-bottom: 0.8vw;
    span {
      font-weight: 700;
      margin-right: 1vw;
    }
  }
  #user_id {
    margin-bottom: 0.5vw;
  }
  .info {
    .follwer {
      margin-right: 0.5vw;
      font-size: 1vw;
    }
    span {
      font-size: 1vw;
    }
  }
`;
const UserDescription = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  #theme_container {
    display: flex;
    align-items: center;
    padding-left: 1vw;
    padding-top: 1vw;
    height: 30%;
    box-sizing: border-box;
    span {
      color: #eb2f06;
      text-shadow: ${(props) => props.theme.textRedShadow};
      padding: 0.3vw 0.7vw;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textRedShadow};
      margin-right: 1vw;
      border-radius: 10px;
    }
  }
  #user_description {
    height: 100%;
    padding: 1vw;
    color: white;
    overflow: scroll;
  }
`;

function LowerRatingCard() {
  return (
    <LowerRankContainer>
      <LowerRankCard>
        <LowerRankCardImageBox>
          <img
            src="https://blog.kakaocdn.net/dn/bJIpg4/btrWqH4vJcZ/GHWnXId18DypiQ4frdIHIk/img.png"
            alt=""
          />
        </LowerRankCardImageBox>
        <UserMetaInfo>
          <span id="username">
            <span>4</span> 헤롱헤롱쿨쿨방울
          </span>
          <span id="user_id">@user_id</span>
          <div className="info">
            <span className="follwer">팔로워</span>
            <span>2302</span>
          </div>
          <div className="info">
            <span className="follwer">포스트</span>
            <span>2302</span>
          </div>
        </UserMetaInfo>
        <UserDescription>
          <div id="theme_container">
            <span>cosplay</span>
            <span>daily</span>
            <span>lost</span>
            <span>start</span>
            <span>god</span>
          </div>
          <p id="user_description">
            Hello, my name is Kanra & I adore cosplay and cute outfits👙 Thanks
            for joining - subscribe for surprise Hello, my name is Kanra & I
            adore cosplay and cute outfits👙
          </p>
        </UserDescription>
      </LowerRankCard>
      <LowerRankCard>
        <LowerRankCardImageBox>
          <img
            src="https://blog.kakaocdn.net/dn/bJIpg4/btrWqH4vJcZ/GHWnXId18DypiQ4frdIHIk/img.png"
            alt=""
          />
        </LowerRankCardImageBox>
        <UserMetaInfo>
          <span id="username">
            <span>4</span> 헤롱헤롱쿨쿨방울
          </span>
          <span id="user_id">@user_id</span>
          <div className="info">
            <span className="follwer">팔로워</span>
            <span>2302</span>
          </div>
          <div className="info">
            <span className="follwer">포스트</span>
            <span>2302</span>
          </div>
        </UserMetaInfo>
        <UserDescription>
          <div id="theme_container">
            <span>cosplay</span>
            <span>daily</span>
            <span>lost</span>
            <span>start</span>
            <span>god</span>
          </div>
          <p id="user_description">ㅁㄴㅇㅁㄴㅇㄴㅁㅇㅁㄴㅇ</p>
        </UserDescription>
      </LowerRankCard>
      <LowerRankCard>
        <LowerRankCardImageBox>
          <img
            src="https://blog.kakaocdn.net/dn/bJIpg4/btrWqH4vJcZ/GHWnXId18DypiQ4frdIHIk/img.png"
            alt=""
          />
        </LowerRankCardImageBox>
        <UserMetaInfo>
          <span id="username">
            <span>4</span> 헤롱헤롱쿨쿨방울
          </span>
          <span id="user_id">@user_id</span>
          <div className="info">
            <span className="follwer">팔로워</span>
            <span>2302</span>
          </div>
          <div className="info">
            <span className="follwer">포스트</span>
            <span>2302</span>
          </div>
        </UserMetaInfo>
        <UserDescription>
          <div id="theme_container">
            <span>cosplay</span>
            <span>daily</span>
            <span>lost</span>
            <span>start</span>
            <span>god</span>
          </div>
          <p id="user_description">
            Hello, my name is Kanra & I adore cosplay and cute outfits👙 Thanks
            for joining - subscribe for surprise Hello, my name is Kanra & I
            adore cosplay and cute outfits👙
          </p>
        </UserDescription>
      </LowerRankCard>
    </LowerRankContainer>
  );
}

export default LowerRatingCard;
