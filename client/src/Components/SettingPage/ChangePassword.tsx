import styled from "styled-components";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1vw;
`;
const ChangePasswordForm = styled.form`
  width: 80%;
  height: 30vw;
  margin-top: 3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1vw;
    input {
      width: 50%;
      background-color: black;
      border: 1px solid white;
      border-radius: 5px;
      height: 3vw;
      margin-top: 0.5vw;
      color: white;
      padding-left: 0.5vw;
    }
    input:focus {
      outline: none;
    }
    span {
      color: white;
      font-size: 1.2vw;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
  #alert_message {
    margin-top: 3vw;
    font-size: 1vw;
    color: rgba(255, 255, 255, 0.9);
    span {
      color: ${(props) => props.theme.accentColor};
    }
  }
  input[type="submit"] {
    width: 50%;
    height: 4vw;
    border: 1px solid white;
    background-color: black;
    box-shadow: ${(props) => props.theme.textShadow};
    border-radius: 10px;
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    margin-top: 1vw;
    transition: 0.1s ease-in-out;
  }
  input[type="submit"]:hover {
    cursor: pointer;
    color: ${(props) => props.theme.accentColor};
    border-color: ${(props) => props.theme.accentColor};
  }
`;
function ChangePassword() {
  return (
    <SettingSubList>
      <ChangePasswordForm>
        <label htmlFor="current_password">
          <span>현재 비밀번호</span>
          <input
            id="current_password"
            type="password"
            placeholder="현재 비밀번호"
          />
        </label>
        <label htmlFor="change_password">
          <span>변경할 비밀번호</span>
          <input
            id="change_password"
            type="password"
            placeholder="변경할 비밀번호"
          />
        </label>
        <label htmlFor="change_password_confirm">
          <span>비밀번호 확인</span>
          <input
            id="change_password_confirm"
            type="password"
            placeholder="비밀번호 확인"
          />
        </label>
        <span id="alert_message">
          <span>* 이메일로 가입한 유저만</span> 해당되며, SNS로 가입한 경우 해당
          SNS의 비밀번호를 바꿔주세요
        </span>
        <input type="submit" />
      </ChangePasswordForm>
    </SettingSubList>
  );
}

export default ChangePassword;
