import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 200vh;
  background-color: black;
  padding-top: 5vw;
  padding-left: 10vw;
  padding-right: 10vw;
  h1 {
    font-size: 3vw;
    font-weight: 600;
  }
  h2 {
    margin-top: 1vw;
    font-size: 2vw;
  }
  p {
    margin-top: 1.5vw;
    pre {
      text-align: center;
      white-space: pre-wrap;
    }
  }
`;
const Title = styled.div`
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-shadow: ${(props) => props.theme.textShadow};
`;
const PartnerForm = styled.form`
  width: 100%;
  height: 100vh;
  margin-top: 3vw;

  label {
    margin-top: 1.5vw;
    display: flex;
    flex-direction: column;
    span {
      position: relative;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    #essential {
      color: #d35400;
      text-shadow: none;
      position: absolute;
      top: -0.5vw;
      font-size: 1vw;
    }
    input {
      margin-top: 0.6vw;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      width: 40%;
      background-color: black;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      padding: 1vw;
      border-radius: 5px;
      color: white;
      transition: 0.1s ease-in-out;
    }
    input::placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
    input:focus {
      outline: none;
      box-shadow: #fbc531 0px 0px 9px;
    }
  }
  textarea {
    width: 60%;
    border: 1px solid white;
    color: whilte;
    box-shadow: ${(props) => props.theme.textShadow};
    background-color: black;
    margin-top: 0.6vw;
    padding: 1vw;
    height: 20vw;
    border-radius: 10px;
    transition: 0.1s ease-in-out;
  }
  textarea::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
  textarea:focus {
    outline: none;
    box-shadow: #fbc531 0px 0px 9px;
  }
  label[for="creator_info"] {
    div {
      margin-top: 0.6vw;
      display: flex;
      align-items: center;
    }
    select {
      padding: 1vw;
      background-color: black;
      color: white;
      border-top-left-radius: 10px;
      box-shadow: ${(props) => props.theme.textShadow};
      border: 1px solid white;
      border-bottom-left-radius: 10px;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      height: 45px;
    }
    select:focus {
      outline: none;
    }
    input[id="creator_info"] {
      padding: 1vw;
      display: block;
      border-radius: 0%;
      border-left: none;
      border-right: none;
      margin-top: 0;
      height: 45px;
      /* border-left: none; */
    }
    button {
      padding: 1vw;
      background-color: black;
      border: 1px solid white;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      box-shadow: ${(props) => props.theme.textShadow};
      color: white;
      height: 45px;
    }
  }
  input[type="submit"] {
    padding: 2vw 1vw;
    background-color: black;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    color: white;
    margin-top: 5vw;
    width: 30%;
    border-radius: 10px;
    transition: 0.1s ease-in-out;
  }
  input[type="submit"]:hover {
    box-shadow: #fbc531 0px 0px 9px;
  }
`;
const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  &.termsContiner {
    display: flex;
    margin-top: 2vw;
    flex-direction: column;
    width: 100%;
    height: 10vh;
  }

  .checkbox_container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 5vh;
    margin-top: 0;
    padding-top: 0;
    span {
      display: flex;
      align-items: center;
      color: white;
      position: relative;
      text-shadow: ${(props) => props.theme.textShadow};
      #essential {
        color: #d35400;
        text-shadow: none;
        position: relative;
        top: -0.6vw;
        left: 0.6vw;
        font-size: 1vw;
      }
    }
    label {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      margin-top: 0;
      color: white;
      width: 15%;
      input[type="checkbox"] {
        margin-top: 0;
        margin-bottom: 0;
        width: auto;
        accent-color: ${(props) => props.theme.accentColor};
      }
    }
  }
  .service_terms_descrition {
    width: 100%;
    margin-top: 2vw;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    padding: 1vw;
    border-radius: 10px;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
`;
function RegisterPartner() {
  return (
    <Wrapper>
      <Title>
        <h1>NOBLE FANDOM</h1>
        <h2>NOBLE FANDOM을 찾아주셔서 감사합니다.</h2>
        <p>
          <pre>
            개인 크리에이터가 아닌 단체로 이루어진 팀을 위한 공간입니다.
          </pre>
          <pre>
            에이전시, 기획사, 소속사라면 아래 양식에 맞춰 자세히 작성해주시면
            검토 후 답변드리겠습니다.
          </pre>
        </p>
      </Title>
      <PartnerForm>
        <label htmlFor="company_name">
          <span>
            회사 이름을 적어주세요.<span id="essential">*필수</span>
          </span>
          <input id="company_name" type="text" placeholder="회사명" />
        </label>
        <label htmlFor="company_url">
          <span>
            웹사이트 혹은 회사를 알려줄 수 있는 다른 주소가 있다면 입력해주세요.
          </span>
          <input
            id="company_url"
            type="text"
            placeholder="URL를 입력해주세요."
          />
        </label>
        <label htmlFor="creator_info" id="regist_creator">
          <span>
            크리에이터의 정보를 입력해주세요<span id="essential">*필수</span>
          </span>
          <div>
            <select name="seleted_sns" id="seleted_sns">
              <option value="insta">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
              <option value="youtube">Youtube</option>
              <option value="tictok">Tictok</option>
              <option value="Twitch">Twitch</option>
              <option value="etc">기타</option>
            </select>
            <input id="creator_info" type="text" placeholder="크리에이터 URL" />
            <button>+</button>
          </div>
        </label>
        <label htmlFor="email">
          <span>
            연락받으실 이메일<span id="essential">*필수</span>
          </span>
          <input id="email" type="email" placeholder="EMAIL" />
        </label>
        <label htmlFor="phone_number">
          <span>
            연락받으실 전화번호<span id="essential">*필수</span>
          </span>
          <input id="phone_number" type="text" placeholder="PHONE NUMBER" />
        </label>
        <label htmlFor="inquiry">
          <span>기타 문의사항이 있으시면 자유롭게 적어주세요</span>
          <textarea
            id="inquiry"
            placeholder="기타 세부사항이 있으시면 자세하게 적어주세요."
          />
        </label>
        <TermsContainer className="termsContiner">
          <div className="checkbox_container">
            <span>
              개인정보처리방침<span id="essential">*필수</span>
            </span>
            <label htmlFor="service_terms">
              동의하기
              <input id="service_terms" type="checkbox" />
            </label>
          </div>
          <div className="service_terms_descrition">
            <span>개인정보처리방침을 확인 후 동의합니다.</span>
          </div>
        </TermsContainer>
        <input type="submit" value="제출하기" />
      </PartnerForm>
    </Wrapper>
  );
}

export default RegisterPartner;
