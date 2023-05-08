import styled from "styled-components";
import SideBar from "../../Components/SideBar";
import { AiFillPlusCircle } from "react-icons/ai";
const Wrapper = styled.div`
  height: 250vh;
  width: 100%;
  background-color: black;
  display: flex;
`;
const SubWrapper = styled.div`
  width: 75%;
  border-left: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${(props) => props.theme.textShadow};
  div {
    margin-top: 5vw;
    width: 80%;
    h2 {
      font-size: 2vw;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      margin-bottom: 2vw;
    }
    form {
      width: 100%;
      label {
        margin-top: 1vw;
        color: white;
        text-shadow: ${(props) => props.theme.textShadow};
        display: flex;
        flex-direction: column;
        input {
          border: 1px solid white;
          background-color: black;
          color: white;
          box-shadow: ${(props) => props.theme.textShadow};
          margin-top: 1vw;
          padding: 1vw 1.2vw;
          border-radius: 10px;
        }
        input::placeholder {
          color: white;
          text-shadow: ${(props) => props.theme.textShadow};
        }

        input:focus {
          outline: none;
        }
      }
      hr {
        border: 0.1px solid rgba(255, 255, 255, 0.4);
        margin-top: 4vw;
        box-shadow: ${(props) => props.theme.textShadow};
      }
      input[id="creator_phoneNumber_verification"] {
        width: 80%;
      }

      label[for="creator_phoneNumber_verification"] {
        div {
          margin-top: 1vw;
          width: 100%;
          display: flex;
          align-items: center;
          input {
            margin-top: 0;
            padding: 2vw;
            border-right: none;
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
          }
        }
        button {
          width: 20%;
          color: white;
          box-sizing: border-box;
          font-weight: 600;
          border: 1px solid white;
          box-shadow: ${(props) => props.theme.textShadow};
          padding: 2vw 0;
          background-color: rgba(85, 239, 196, 0.9);
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
      label[for="creator_sns"] {
        div {
          margin-top: 1vw;
          width: 100%;
          display: flex;
          align-items: center;
        }
        select {
          width: 50%;
          background-color: black;
          border: 1px solid white;
          box-shadow: ${(props) => props.theme.textShadow};
          color: white;
          padding: 1.5vw;
          /* border-right: none; */
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        select:hover {
          cursor: pointer;
        }
        select:focus {
          outline: none;
        }
        input {
          width: 40%;
          margin-top: 0;
          padding: 1.5vw;
          border-radius: 0;
          border-left: none;
        }
        button {
          width: 10%;
          height: 100%;
          display: block;
          padding: 1.5vw;
          background-color: black;
          border: 1px solid white;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          box-shadow: ${(props) => props.theme.textShadow};
          box-sizing: border-box;

          svg {
            color: rgba(85, 239, 196, 0.9);
          }
        }
      }
      label[for="creator_evidence"] {
        span {
          border: 1px solid white;
          box-shadow: ${(props) => props.theme.textShadow};
          border-radius: 10px;
          margin-top: 1vw;
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1vw;
          transition: 0.1s ease-in-out;
        }
        span:hover {
          box-shadow: #fbc531 0px 0px 15px;
        }
        small {
          color: white;
          font-size: 1.1vw;
          margin-top: 1vw;
          text-shadow: ${(props) => props.theme.textShadow};
        }
      }
      .image_container {
        width: 100%;
        margin-top: 1vw;
        display: flex;
        justify-content: center;
        div {
          width: 80%;
          height: 100%;
          border: 1px solid white;
          box-shadow: ${(props) => props.theme.textShadow};
          margin-top: 0;
          border-radius: 10px;
          object-fit: contain;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
      }
      input[type="submit"] {
        width: 100%;
        margin-top: 5vw;
        background-color: white;
        box-shadow: #fbc531 0px 0px 10px;
        background-color: black;
        color: white;
        padding: 1.5vw;
        font-size: 1.5vw;
        font-weight: 600;
        border: 1px solid white;
        border-radius: 20px;
        text-shadow: 0 4px 4px #000;
        transition: 0.1s ease-in-out;
      }
      input[type="submit"]:hover {
        box-shadow: #fbc531 0px 0px 15px;
      }
    }
  }
`;
const ImageContainer = styled.div`
  height: 50vh;
`;
const TermsContainer = styled.div`
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
      text-shadow: ${(props) => props.theme.textShadow};
    }
    label {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 0;
      input[type="checkbox"] {
        margin-top: 0;
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
function RegisterCreator() {
  return (
    <Wrapper>
      <SideBar />
      <SubWrapper>
        <div>
          <h2>크리에이터 신청하기</h2>
          <form encType="multipart/form-data">
            <label htmlFor="creator_email">
              이메일
              <input id="creator_email" type="email" placeholder="이메일" />
            </label>
            <label htmlFor="creator_password">
              비밀번호
              <input
                id="creator_password"
                type="password"
                placeholder="비밀번호"
              />
            </label>
            <label htmlFor="creator_password_verification">
              비밀번호 확인
              <input
                id="creator_password_verification"
                type="password"
                placeholder="비밀번호 확인"
              />
            </label>
            <hr />
            <label htmlFor="creator_phoneNumber_verification">
              본인인증
              <div>
                <input
                  id="creator_phoneNumber_verification"
                  type="text"
                  placeholder="이름"
                />
                <button>Verify</button>
              </div>
            </label>
            <label htmlFor="creator_sns">
              사용 중인 SNS 계정
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
                <input id="creator_sns" type="text" placeholder="ID" />
                <button>
                  <AiFillPlusCircle />
                </button>
              </div>
            </label>
            <label htmlFor="creator_evidence">
              <span>증빙자료 업로드</span>
              <input
                id="creator_evidence"
                type="file"
                style={{ display: "none" }}
              />
              <small>
                해당 계정의 소유자임을 증빙할 수 있는 스크린샷을 첨부해주세요.
                (ex. 설정 화면)
              </small>
            </label>
            <ImageContainer className="image_container">
              <div>
                <img
                  src="https://macinjune.com/wp-content/uploads/2018/10/twitter_contents_block_1-1024x515.jpg"
                  alt=""
                />
              </div>
            </ImageContainer>
            <TermsContainer className="termsContiner">
              <div className="checkbox_container">
                <span>이용약관</span>
                <label htmlFor="service_terms">
                  동의하기
                  <input id="service_terms" type="checkbox" />
                </label>
              </div>
              <div className="service_terms_descrition">
                <span>
                  서비스의 이용약관 및 개인정보처리방침을 확인 후 동의하며, 19세
                  이상입니다.
                </span>
              </div>
            </TermsContainer>
            <input type="submit" value="크리에이터 신청하기" />
          </form>
        </div>
      </SubWrapper>
    </Wrapper>
  );
}

export default RegisterCreator;
