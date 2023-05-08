import styled from "styled-components";
import { GiCrownCoin } from "react-icons/gi";
const Wrapper = styled.div`
  width: 100%;
  height: 5vw;
  border-radius: 10px;
  border: 1px solid white;
  box-shadow: ${(props) => props.theme.textShadow};
  margin-bottom: 1vw;
  display: flex;
  align-items: center;
  transition: border-color 0.1s ease-in-out;
  &:hover {
    border-color: ${(props) => props.theme.accentColor};
  }
  label {
    padding-left: 2vw;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;

    input[id="price_10"] {
      accent-color: ${(props) => props.theme.textRedColor};
      margin-top: 0;
    }

    #coin_item {
      margin-left: 1.5vw;
      display: flex;
      align-items: center;
      svg {
        color: ${(props) => props.theme.accentColor};
        width: 1.8vw;
        height: 1.8vw;
      }
      span {
        margin-left: 0.5vw;
        color: white;
        font-weight: 600;
        text-shadow: ${(props) => props.theme.textShadow};
      }
    }
    #coin_price_info {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      right: 3vw;
      #discount_price_value {
        color: white;
        font-size: 1.2vw;
        text-shadow: ${(props) => props.theme.textRedShadow};
      }
      #original_price_value {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1vw;
        text-decoration: line-through;
      }
    }
  }
  label:hover {
    cursor: pointer;
  }
`;
const ChargeCoin = styled.input`
  width: 100%;
  height: 5vw;
  background-color: black;
  border: 1px solid white;
  box-shadow: ${(props) => props.theme.textShadow};
  border-radius: 10px;
  color: white;
  font-weight: 600;
  font-size: 1.5vw;
  text-shadow: ${(props) => props.theme.textShadow};
  transition: 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.accentColor};
    background-color: white;
    color: ${(props) => props.theme.accentColor};
    text-shadow: none;
  }
`;
function PaymentItem() {
  return (
    <>
      <Wrapper>
        <label htmlFor="price_10">
          <input id="price_10" type="radio" name="coin_price" />
          <div id="coin_item">
            <GiCrownCoin />
            <span>10 코인</span>
          </div>
          <div id="coin_price_info">
            <span id="discount_price_value">￦1,800</span>
            <span id="original_price_value">￦2,400</span>
          </div>
        </label>
      </Wrapper>
      <Wrapper>
        <label htmlFor="price_10">
          <input id="price_10" type="radio" name="coin_price" />
          <div id="coin_item">
            <GiCrownCoin />
            <span>10 코인</span>
          </div>
          <div id="coin_price_info">
            <span id="discount_price_value">￦1,800</span>
            <span id="original_price_value">￦2,400</span>
          </div>
        </label>
      </Wrapper>
      <Wrapper>
        <label htmlFor="price_10">
          <input id="price_10" type="radio" name="coin_price" />
          <div id="coin_item">
            <GiCrownCoin />
            <span>10 코인</span>
          </div>
          <div id="coin_price_info">
            <span id="discount_price_value">￦1,800</span>
            <span id="original_price_value">￦2,400</span>
          </div>
        </label>
      </Wrapper>
      <Wrapper>
        <label htmlFor="price_10">
          <input id="price_10" type="radio" name="coin_price" />
          <div id="coin_item">
            <GiCrownCoin />
            <span>10 코인</span>
          </div>
          <div id="coin_price_info">
            <span id="discount_price_value">￦1,800</span>
            <span id="original_price_value">￦2,400</span>
          </div>
        </label>
      </Wrapper>
      <Wrapper>
        <label htmlFor="price_10">
          <input id="price_10" type="radio" name="coin_price" />
          <div id="coin_item">
            <GiCrownCoin />
            <span>10 코인</span>
          </div>
          <div id="coin_price_info">
            <span id="discount_price_value">￦1,800</span>
            <span id="original_price_value">￦2,400</span>
          </div>
        </label>
      </Wrapper>
      <Wrapper>
        <label htmlFor="price_10">
          <input id="price_10" type="radio" name="coin_price" />
          <div id="coin_item">
            <GiCrownCoin />
            <span>10 코인</span>
          </div>
          <div id="coin_price_info">
            <span id="discount_price_value">￦1,800</span>
            <span id="original_price_value">￦2,400</span>
          </div>
        </label>
      </Wrapper>
      <Wrapper>
        <label htmlFor="price_10">
          <input id="price_10" type="radio" name="coin_price" />
          <div id="coin_item">
            <GiCrownCoin />
            <span>10 코인</span>
          </div>
          <div id="coin_price_info">
            <span id="discount_price_value">￦1,800</span>
            <span id="original_price_value">￦2,400</span>
          </div>
        </label>
      </Wrapper>
      <Wrapper>
        <label htmlFor="price_10">
          <input id="price_10" type="radio" name="coin_price" />
          <div id="coin_item">
            <GiCrownCoin />
            <span>10 코인</span>
          </div>
          <div id="coin_price_info">
            <span id="discount_price_value">￦1,800</span>
            <span id="original_price_value">￦2,400</span>
          </div>
        </label>
      </Wrapper>
      <Wrapper>
        <label htmlFor="price_10">
          <input id="price_10" type="radio" name="coin_price" />
          <div id="coin_item">
            <GiCrownCoin />
            <span>10 코인</span>
          </div>
          <div id="coin_price_info">
            <span id="discount_price_value">￦1,800</span>
            <span id="original_price_value">￦2,400</span>
          </div>
        </label>
      </Wrapper>
      <ChargeCoin type="submit" value="결제하기" id="charge_coin" />
    </>
  );
}

export default PaymentItem;
