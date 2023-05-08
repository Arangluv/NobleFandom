import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const SubBox = styled.div`
  width: 100%;
  height: 20vw;
  border: 1px solid white;
  border-radius: 10px;
  padding: 1vw;
  margin-bottom: 1vw;
  transition: all 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.accentColor};
  }
  #member_ship_title {
    font-size: 1.2vw;
    color: rgba(255, 255, 255, 0.9);
  }
  #member_ship_price {
    margin-top: 1vw;
    font-size: 1.5vw;
    color: ${(props) => props.theme.accentColor};
    text-shadow: ${(props) => props.theme.textShadow};
  }
  #craetor_setting_msg {
    display: flex;
    flex-direction: column;
    margin-top: 0.5vw;
    span {
      font-size: 1.1vw;
      color: white;
      padding-left: 1vw;
    }
  }
  #official_setting {
    display: flex;
    width: 100%;
    margin-top: 1vw;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 1vw;
    border-radius: 10px;
    #official_notice_box {
      width: 60%;
      display: flex;
      flex-direction: column;
      span {
        color: white;
        font-size: 1vw;
        font-weight: 600;
      }
    }
    #payment_box {
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        border: 1px solid white;
        background-color: ${(props) => props.theme.accentColor};
        color: #34495e;
        font-weight: 600;
        box-shadow: ${(props) => props.theme.textShadow};
        padding: 0.5vw 0;
        width: 100%;
        border-radius: 10px;
        font-size: 1.1vw;
        transition: all 0.1s ease-in-out;
      }
      button:hover {
        cursor: pointer;
        background-color: white;
        color: ${(props) => props.theme.accentColor};
        border-color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;
function MembershipTap() {
  return (
    <Wrapper>
      <SubBox>
        <h2 id="member_ship_title">1. 멤버쉽 이름</h2>
        <h3 id="member_ship_price">₩70,000 / 월</h3>
        <div id="craetor_setting_msg">
          <span>크리에이터가 지정 메세지</span>
          <span>유료채팅 3회</span>
          <span>더나은 더보기</span>
          <span>아무게 아무게</span>
        </div>
        <div id="official_setting">
          <div id="official_notice_box">
            <span>🟢 크리에이터에게 유료채팅</span>
            <span>🟢 결제 30일 이전 포스팅까지 공개</span>
          </div>
          <div id="payment_box">
            <button>구독하기</button>
          </div>
        </div>
      </SubBox>
      <SubBox>
        <h2 id="member_ship_title">1. 멤버쉽 이름</h2>
        <h3 id="member_ship_price">₩70,000 / 월</h3>
        <div id="craetor_setting_msg">
          <span>크리에이터가 지정 메세지</span>
          <span>유료채팅 3회</span>
          <span>더나은 더보기</span>
          <span>아무게 아무게</span>
        </div>
        <div id="official_setting">
          <div id="official_notice_box">
            <span>🟢 크리에이터에게 유료채팅</span>
            <span>🟢 결제 30일 이전 포스팅까지 공개</span>
          </div>
          <div id="payment_box">
            <button>구독하기</button>
          </div>
        </div>
      </SubBox>
      <SubBox>
        <h2 id="member_ship_title">1. 멤버쉽 이름</h2>
        <h3 id="member_ship_price">₩70,000 / 월</h3>
        <div id="craetor_setting_msg">
          <span>크리에이터가 지정 메세지</span>
          <span>유료채팅 3회</span>
          <span>더나은 더보기</span>
          <span>아무게 아무게</span>
        </div>
        <div id="official_setting">
          <div id="official_notice_box">
            <span>🟢 크리에이터에게 유료채팅</span>
            <span>🟢 결제 30일 이전 포스팅까지 공개</span>
          </div>
          <div id="payment_box">
            <button>구독하기</button>
          </div>
        </div>
      </SubBox>
    </Wrapper>
  );
}

export default MembershipTap;
