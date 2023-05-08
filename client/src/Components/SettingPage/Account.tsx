import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 1vw;
  padding-left: 3vw;
`;
const AccountInfo = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 1vw;
  label {
    display: flex;
    flex-direction: column;
    margin-top: 1vw;
    input[type="text"] {
      width: 50%;
      margin-top: 0.5vw;
      background-color: black;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      border-radius: 10px;
      padding: 0.6vw 1vw;
      color: rgba(255, 255, 255, 0.7);
    }
    input[type="text"]:focus {
      outline: none;
    }
    span {
      color: white;
      font-size: 1.2vw;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
  label[for="brith_data"] {
    div {
      width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 1vw;
      #setting_public_brith_date {
        display: flex;
        align-items: center;
        border: 1px solid white;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 0.2vw;
        width: 4vw;
        height: 100%;
        div {
          border: 1px solid rgba(255, 255, 255, 0.8);
          background-color: black;
          height: 1.5vw;
          width: 1.5vw;
          border-radius: 100%;
        }
      }
      #setting_public_brith_date:hover {
        cursor: pointer;
      }
    }
  }
  label[for="delete_account"] {
    margin-top: 3vw;
    a {
      margin-top: 0.5vw;
      display: flex;
      span {
        color: ${(props) => props.theme.textRedColor};
        text-shadow: ${(props) => props.theme.textRedShadow};
      }
    }
  }
`;
interface IProps {
  publish: boolean;
}
function Account() {
  const [publish, setPublish] = useState(false);

  return (
    <SettingSubList>
      <AccountInfo>
        <label htmlFor="register_email">
          <span>가입 이메일</span>
          <input
            id="register_email"
            type="text"
            readOnly
            value="slfzkvmfl2@naver.com"
          />
        </label>
        <label htmlFor="gender">
          <span>성별</span>
          <input id="gender" type="text" readOnly value="남자" />
        </label>
        <label htmlFor="brith_data">
          <div>
            <span>생년월일 및 공개여부</span>
            <motion.div
              onClick={() => setPublish((pre) => !pre)}
              style={{
                justifyContent: publish ? "flex-end" : "flex-start",
              }}
              id="setting_public_brith_date"
            >
              <motion.div
                layout
                style={{ backgroundColor: publish ? "#f1c40f" : "white" }}
              ></motion.div>
            </motion.div>
          </div>
          <input id="brith_data" type="text" readOnly value="1998.02.14" />
        </label>
        <label htmlFor="delete_account">
          <Link to="/">
            <span>화원 탈퇴</span>
          </Link>
        </label>
      </AccountInfo>
    </SettingSubList>
  );
}

export default Account;
