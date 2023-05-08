import styled from "styled-components";

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 30vw;
  height: auto;
  width: 80%;
  border: 1px solid white;
  margin-top: 1vw;
  box-shadow: ${(props) => props.theme.textShadow};
  border-radius: 10px;
  padding: 1vw;
  label {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 2vw;
    #exprie_data {
      display: flex;
      justify-content: flex-start;
      input {
        margin-right: 0.5vw;
      }
    }
    div {
      margin-top: 0.5vw;
      display: flex;
      justify-content: space-between;

      input[type="text"] {
        width: 24%;
        padding: 0.8vw 0;
        background-color: black;
        border: 1px solid white;
        box-shadow: ${(props) => props.theme.textShadow};
        border-radius: 5px;
        color: white;
        text-align: center;
      }
      input[type="text"]:focus {
        outline: none;
      }
    }
    span {
      color: white;
      font-size: 1.2vw;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    input[id="brith_day"] {
      background-color: black;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      border-radius: 5px;
      color: white;
      margin-top: 0.5vw;
      padding: 1vw;
      width: 24%;
      text-align: center;
    }
    input[id="brith_day"]:focus {
      outline: none;
    }
    input[type="password"] {
      background-color: black;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      border-radius: 5px;
      color: white;
      margin-top: 0.5vw;
      padding: 1vw;
      width: 24%;
      text-align: center;
    }
    input[type="password"]:focus {
      outline: none;
    }
  }
  #service_terms {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 10vh;
    height: auto;
    & > span {
      &:nth-child(1) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
        padding-bottom: 0.5vw;
      }
    }
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      font-size: 1.2vw;
    }
    div {
      display: flex;
      flex-direction: column;
      margin-top: 0.5vw;
      span {
        font-weight: 600;
        transition: 0.1s ease-in-out;
      }
      span:hover {
        cursor: pointer;
        color: ${(props) => props.theme.accentColor};
      }
    }
    label[for="agree_terms"] {
      margin-top: 1vw;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background-color: rgba(255, 255, 255, 0.2);
      padding: 2vw 1vw;
      border-radius: 10px;
      input[id="agree_terms"] {
        margin-top: 0;
        margin-bottom: 0;
        width: 1.5vw;
        height: 1.5vw;
        accent-color: ${(props) => props.theme.accentColor};
      }
    }
  }
  input[type="submit"] {
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    background-color: black;
    color: white;
    height: 5vw;
    border-radius: 5px;
    font-weight: 600;
    font-size: 1.3vw;
    transition: 0.1s ease-in-out;
  }
  input[type="submit"]:hover {
    cursor: pointer;
    color: ${(props) => props.theme.accentColor};
    border-color: ${(props) => props.theme.accentColor};
  }
`;
function RegisterCard() {
  return (
    <RegisterForm id="card_register_form">
      <label htmlFor="card_number">
        <span>카드 번호</span>
        <div>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
      </label>
      <label htmlFor="brith_day">
        <span>생년 월일</span>
        <input id="brith_day" type="text" placeholder="YYMMDD" />
      </label>
      <label htmlFor="card_expire_data">
        <span>카드 유효기간</span>
        <div id="exprie_data">
          <input id="card_expire_data" type="text" placeholder="MM" />
          <input id="card_expire_data" type="text" placeholder="YY" />
        </div>
      </label>
      <label htmlFor="card_password">
        <span>카드 비밀번호 앞 두자리</span>
        <input type="password" id="card_password" />
      </label>
      <div id="service_terms">
        <span>서비스 이용약관</span>
        <div>
          <span>자동 결제 서비스 이용약관</span>
          <span>개인정보 제공 및 위탁 안내</span>
          <span>전자금융거래 이용약관</span>
        </div>
        <label htmlFor="agree_terms">
          <span>위의 약관을 모두 확인 후 동의합니다.</span>
          <input type="checkbox" id="agree_terms" />
        </label>
      </div>
      <input type="submit" value="카드 등록하기" />
    </RegisterForm>
  );
}

export default RegisterCard;
