import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import MainHeader from "../Components/MainHeader";
import { Outlet } from "react-router-dom";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  height: auto;
  background-color: ${(props) => props.theme.bgColor};
  justify-content: center;
  align-items: center;
`;

function Main() {
  return (
    <Wrapper>
      <MainHeader></MainHeader>
      <Outlet />
    </Wrapper>
  );
}

export default Main;
