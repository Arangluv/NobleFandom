import styled from "styled-components";
import { FaFileUpload } from "react-icons/fa";
import { GiCrownCoin } from "react-icons/gi";
import { useState } from "react";
const Wrapper = styled.div`
  &#chat_premium_content {
    width: 100%;
    height: 55vw;
    overflow-y: scroll;
    margin-bottom: 0;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    border-bottom: none;
    h2 {
      text-align: center;
      font-weight: 600;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
  &#chat_premium_content:hover {
    cursor: default;
    background-color: black;
  }
`;
const MediaContentBox = styled.div`
  &#media_box {
    width: 100%;
    height: 20vw;
    display: flex;
    justify-content: center;
    margin-top: 1vw;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.textShadowThin};
    label {
      border-right: 1px solid rgba(255, 255, 255, 0.3);
      border-left: 1px solid rgba(255, 255, 255, 0.3);
      width: 50%;
      height: 100%;
      margin-bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.1s ease-in-out;
      svg {
        font-size: 4vw;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    label:hover {
      background-color: rgba(255, 255, 255, 0.1);
      cursor: pointer;
    }
  }
  &#media_box:hover {
    cursor: default;
    background-color: black;
  }
`;
const ContentForm = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  input[type="file"] {
    display: none;
  }
  label[for="contents_price_setting"] {
    display: flex;
    flex-direction: column;
    span {
      margin-bottom: 0.5vw;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    #price_setting_box {
      justify-content: flex-start;
      margin-bottom: 0;
      border-bottom: none;
      svg {
        font-size: 2vw;
      }
      input[type="number"] {
        width: 30%;
        background-color: black;
        border: none;
        border-bottom: 1px solid white;
        color: white;
        font-size: 1.3vw;
        padding-bottom: 0.5vw;
        padding-left: 0.5vw;
      }
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
      input[type="number"]:focus {
        outline: none;
      }
      span {
        font-size: 1vw;
        margin-left: 2vw;
        color: ${(props) => props.theme.textRedColor};
        text-shadow: ${(props) => props.theme.textRedShadow};
      }
    }
    #price_setting_box:hover {
      cursor: default;
      background-color: black;
    }
    #price_custom_box {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
      margin-top: 1vw;
      div {
        padding-bottom: 0;
        margin-bottom: 0;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        border-bottom: none;

        span {
          border: 1px solid white;
          box-shadow: ${(props) => props.theme.textShadowThin};
          width: 32%;
          text-align: center;
          padding: 0.5vw 0;
          border-radius: 10px;
          transition: all 0.1s ease-in-out;
          font-size: 1vw;
        }
        span:hover {
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.1);
          color: ${(props) => props.theme.accentColor};
        }
      }
      div:hover {
        background-color: black;
        cursor: default;
      }
    }
    #price_custom_box:hover {
      background-color: black;
      cursor: default;
    }
    #content_price_notice {
      color: rgba(255, 255, 255, 0.6);
      text-shadow: none;
      font-size: 0.9vw;
    }
  }
  label[for="content_message"] {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5vw;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    textarea {
      margin-top: 0.5vw;
      background-color: black;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadowThin};
      border-radius: 10px;
      color: white;
      padding: 0.5vw;
      width: 80%;
      min-height: 10vw;
      height: auto;
    }
    textarea:focus {
      outline: none;
    }
  }
  input[type="submit"] {
    width: 100%;
    background-color: black;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadowThin};
    border-radius: 10px;
    color: white;
    padding: 1vw 0;
    transition: all 0.1s ease-in-out;
    font-weight: 600;
  }
  input[type="submit"]:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.accentColor};
  }
`;
function PremiumContent() {
  const [price, setPrice] = useState<number>(0);
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };
  return (
    <Wrapper id="chat_premium_content">
      <h2>유료 컨텐츠 보내기 🔥</h2>
      <MediaContentBox id="media_box">
        <label htmlFor="upload_premium_content">
          <FaFileUpload />
        </label>
      </MediaContentBox>
      <ContentForm>
        <input id="upload_premium_content" type="file" accept="image/*" />
        <label htmlFor="contents_price_setting">
          <span>컨텐츠 가격 설정</span>
          <div id="price_setting_box">
            <GiCrownCoin />
            <input
              onChange={handlePriceChange}
              type="number"
              value={price.toString()}
            />
            <span>코인 가격은 3000을 초과할 수 없습니다.</span>
          </div>
          <div id="price_custom_box">
            <div>
              <span onClick={() => setPrice(10)}>10코인</span>
              <span onClick={() => setPrice(50)}>50코인</span>
              <span onClick={() => setPrice(100)}>100코인</span>
            </div>
            <div>
              <span onClick={() => setPrice(500)}>500코인</span>
              <span onClick={() => setPrice(1000)}>1000코인</span>
              <span onClick={() => setPrice(0)}>무료</span>
            </div>
          </div>
          <span id="content_price_notice">
            무료 혹은 코인 가격 설정을 0으로 할 시, 모자이크 처리없이 사진이
            공개됩니다.
          </span>
        </label>
        <label htmlFor="content_message">
          <span>메세지</span>
          <textarea id="content_message" placeholder="메세지를 입력하세요" />
        </label>
        <input type="submit" value="보내기" />
      </ContentForm>
    </Wrapper>
  );
}

export default PremiumContent;
