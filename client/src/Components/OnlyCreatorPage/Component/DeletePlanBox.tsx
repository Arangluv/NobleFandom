import styled from "styled-components";

const DeletePlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
  span {
    text-shadow: ${(props) => props.theme.textShadow};
    color: white;
  }
  p {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 1vw;
    white-space: pre-wrap;
    margin: 0.5vw 0;
    font-size: 1vw;
    color: white;
  }
  button {
    width: 100%;
    color: ${(props) => props.theme.textRedColor};
    text-shadow: ${(props) => props.theme.textRedShadow};
    padding: 1vw 0;
    background-color: black;
    border: 1px solid ${(props) => props.theme.textRedColor};
    border-radius: 10px;
    font-weight: 600;
    font-size: 1.3vw;
    margin-top: 1vw;
    transition: all 0.1s ease-in-out;
  }
  button:hover {
    cursor: pointer;
    background-color: white;
  }
`;

function DeletePlanBox() {
  return (
    <DeletePlanContainer>
      <span>플랜삭제하기</span>
      <p>
        {`플랜 삭제에 대한 블라 블라 설명글이 들어갑니다
      블라블라 블라블라
      브랇ㄴ블르르르
      ㄴㅁㅇㅁㄴㅇㅁㄴㅇㅁ넝ㄴㅁ언ㅁ언ㅁ어ㅑ
      ㅁㄴ엄ㄴ언ㅁ야넘언ㅁ다파ㅓ랴;채퍄ㅓㄴㅂ어ㅓ냐ㅗ넌마
    `}
      </p>
      <button>플랜 삭제하기</button>
    </DeletePlanContainer>
  );
}

export default DeletePlanBox;
