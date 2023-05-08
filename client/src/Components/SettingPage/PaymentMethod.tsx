import styled from "styled-components";
import { AiOutlineCreditCard } from "react-icons/ai";
import { GiCrownCoin } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";
import PaymentItem from "./PaymenetItem";
import RegisterCard from "./RegisterCard";
import { useState } from "react";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 1vw;
`;
const CreditCardBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  & > span {
    width: 100%;
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    font-weight: 600;
    padding-bottom: 0.5vw;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    border: 1px dotted #3498db;
    height: 10vw;
    border-radius: 10px;
    margin-top: 2vw;
    svg {
      color: white;
      width: 2vw;
      height: 2vw;
      margin-right: 1vw;
    }
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
  div:hover {
    cursor: pointer;
  }
`;
const HaveCrownCoinBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
  align-items: center;
  width: 100%;
  height: 100%;
  #coin_box {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: space-between;
    #coin_name {
      display: flex;
      align-items: center;
      color: white;
      padding-bottom: 0.5vw;
      text-shadow: ${(props) => props.theme.textShadow};
      font-weight: 600;
    }
    #have_coin_value {
      display: flex;
      align-items: center;
      color: white;
      padding-bottom: 0.5vw;
      text-shadow: ${(props) => props.theme.textShadow};
      font-weight: 600;
      svg {
        width: 2vw;
        height: 2vw;
        margin-right: 0.5vw;
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
  #charge_coin_title {
    margin-top: 1vw;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 1.5vw;
    text-shadow: ${(props) => props.theme.textShadow};
    svg {
      color: white;
      width: 2vw;
      height: 2vw;
      margin-left: 0.5vw;
    }
  }
  #charge_container {
    width: 80%;
    height: auto;
    border-radius: 10px;
    margin-top: 1vw;
    /* box-shadow: ${(props) => props.theme.textShadow}; */
    padding: 1vw 1vw 0 1vw;
  }
`;
function PaymentMethod() {
  const [registerClick, setRegisterClick] = useState(false);
  const handleRegisterClick = () => {
    setRegisterClick((pre) => !pre);
  };
  return (
    <SettingSubList>
      <CreditCardBox>
        <span>내 지불 카드</span>
        <div onClick={handleRegisterClick}>
          <AiOutlineCreditCard />
          <span>카드를 등록해주세요</span>
        </div>
        {registerClick ? <RegisterCard /> : null}
      </CreditCardBox>
      <HaveCrownCoinBox>
        <div id="coin_box">
          <span id="coin_name">크라운코인</span>
          <span id="have_coin_value">
            <GiCrownCoin />
            보유코인 2,300
          </span>
        </div>
        <span id="charge_coin_title">
          코인 충전하기 <MdOutlinePayment />
        </span>
        <form id="charge_container">
          <PaymentItem />
        </form>
      </HaveCrownCoinBox>
    </SettingSubList>
  );
}

export default PaymentMethod;
