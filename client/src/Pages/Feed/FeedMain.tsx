import styled from "styled-components";
import { Outlet } from "react-router-dom";
import CreatorSideBar from "../../Components/CreatorSideBar";
import SideBar from "../../Components/SideBar";
import UserSideBar from "../../Components/UserSideBar";
import { useRecoilValue } from "recoil";
import { loginState } from "../../atoms/atoms";
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: black;
  display: flex;
`;

function FeedMain() {
  const userLoginState = useRecoilValue(loginState);
  return (
    <Wrapper>
      {userLoginState.userType === "" ? (
        <SideBar />
      ) : userLoginState.userType === "user" ? (
        <UserSideBar />
      ) : (
        <CreatorSideBar />
      )}
      <Outlet />
    </Wrapper>
  );
}

export default FeedMain;
