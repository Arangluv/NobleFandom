import styled from "styled-components";
import { TiDelete } from "react-icons/ti";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Title = styled.div`
  width: 100%;
  height: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  h2 {
    color: white;
    font-weight: 600;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  span {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0.5vw;
    font-size: 2.5vw;
    color: ${(props) => props.theme.accentColor};
    svg:hover {
      cursor: pointer;
    }
  }
`;
const RegisterForm = styled.form`
  width: 100%;
  height: 100%;
  margin-top: 1vw;
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1vw;
    span {
      margin-left: 0.5vw;
      color: ${(props) => props.theme.accentColor};
      font-size: 1.2vw;
      text-shadow: ${(props) => props.theme.textShadow};
      margin-bottom: 0.5vw;
    }
    input[type="text"],
    input[type="email"] {
      background-color: black;
      color: white;
      margin-bottom: 0.8vw;
      width: 50%;
      font-size: 1.1vw;
      padding: 0.5vw;
      border: none;
      border-bottom: 1px solid white;
    }
    input[type="text"]:focus {
      outline: none;
    }
    input[type="email"]:focus {
      outline: none;
    }
    select {
      border: none;
      border-bottom: 1px solid white;
      background-color: black;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      width: 50%;
      padding: 0.5vw;
    }
    select:focus {
      outline: none;
    }
  }
  label[for="account_id_card"] {
    border: 1px solid ${(props) => props.theme.accentColor};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 0.5vw;
    transition: 0.1s ease-in-out;
    span {
      margin-bottom: 0;
    }
    input[type="file"] {
      display: none;
    }
  }
  label[for="account_id_card"]:hover {
    cursor: pointer;
    font-weight: 600;
  }
  input[type="submit"] {
    width: 100%;
    font-size: 1.2vw;
    font-weight: 600;
    padding: 0.7vw 0;
    color: white;
    background-color: black;
    border: 1px solid white;
    border-radius: 10px;
  }
  input[type="submit"]:hover {
    cursor: pointer;
    font-weight: 600;
  }
`;
function AccountRegister() {
  return (
    <Wrapper>
      <Title>
        <h2>정산 계좌 등록</h2>
        <span>
          <TiDelete />
        </span>
      </Title>
      <RegisterForm>
        <label htmlFor="account_name">
          <span>예금주 명</span>
          <input id="account_name" type="text" placeholder="한글이름" />
          <input type="text" placeholder="영문이름" />
        </label>
        <label htmlFor="account_address">
          <span>주소</span>
          <input id="account_address" type="text" placeholder="거주지 주소" />
        </label>
        <label htmlFor="account_email">
          <span>이메일</span>
          <input id="account_email" type="email" placeholder="이메일" />
        </label>
        <label htmlFor="account_bank">
          <span>은행 선택</span>
          <select name="account_bank" id="account_bank">
            <option value="">은행을 선택해주세요</option>
            <option value="NH농협">NH농협</option>
            <option value="카카오뱅크">카카오뱅크</option>
            <option value="KB국민">KB국민</option>
            <option value="신한은행">신한은행</option>
            <option value="우리은행">우리은행</option>
            <option value="토스뱅크">토스뱅크</option>
            <option value="IBK기업">IBK기업</option>
            <option value="하나">하나</option>
            <option value="새마을">새마을</option>
            <option value="부산">부산</option>
            <option value="대구">대구</option>
            <option value="케이뱅크">케이뱅크</option>
            <option value="신협">신협</option>
            <option value="우체국">우체국</option>
            <option value="SC제일">SC제일</option>
            <option value="">경남</option>
            <option value="">광주</option>
            <option value="">수협</option>
            <option value="">전북</option>
            <option value="">저축은행</option>
            <option value="">재주</option>
            <option value="">씨티</option>
            <option value="">KDB산업</option>
            <option value="">산림조합</option>
          </select>
        </label>
        <label htmlFor="account_number">
          <span>계좌번호</span>
          <input
            id="account_number"
            type="text"
            placeholder="'-' 는 제외하고 입력"
          />
        </label>
        <label htmlFor="account_id_card">
          <span>신분증 등록</span>
          <input id="account_id_card" type="file" accept="image/*" />
        </label>
        <input type="submit" value="등록하기" />
      </RegisterForm>
    </Wrapper>
  );
}

export default AccountRegister;
