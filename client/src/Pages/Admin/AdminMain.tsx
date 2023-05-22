import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import BASE_URL from "../../url";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-color: black;
  display: flex;
  justify-content: flex-end;
`;
const FunctionList = styled.ul`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  a {
    text-decoration: none;
  }
  li {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    margin-bottom: 0.5vw;
    transition: all 0.1s ease-in-out;
  }
  a:hover {
    li {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const SubWrapper = styled.div`
  width: 85%;
  min-height: 100%;
  height: auto;
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background-color: black;
`;
const OverlayBox = styled.div`
  width: 60%;
  height: 50%;
  form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    label[for="access_token"] {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      small {
        font-size: 1.2vw;
        color: ${(props) => props.theme.textRedColor};
        margin-bottom: 1vw;
      }
      span {
        font-weight: 600;
        font-size: 1.6vw;
        color: white;
        margin-bottom: 1vw;
        text-shadow: ${(props) => props.theme.textShadow};
      }
      input {
        border: 1px solid white;
        background-color: black;
        padding: 1vw;
        border-radius: 5px;
        text-align: center;
        color: white;
        width: 80%;
      }
      input:focus {
        outline: none;
        border-color: ${(props) => props.theme.accentColor};
      }
    }
    label[for="token_submit"] {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      span {
        margin-top: 1vw;
        padding: 1vw;
        border: 1px solid white;
        box-shadow: ${(props) => props.theme.textShadow};
        text-shadow: ${(props) => props.theme.textShadow};
        font-weight: 600;
        font-size: 1.6vw;
        color: white;
        margin-bottom: 3vw;
        width: 80%;
        text-align: center;
        border-radius: 10px;
        text-shadow: ${(props) => props.theme.textShadow};
      }
      input {
        display: none;
      }
    }
  }
`;
interface TokenProps {
  access_token: string;
}
function AdminMain() {
  const [loading, setLoading] = useState(true);
  const [tokenCount, setTokenCount] = useState(4);
  const [overlayView, setOverlayView] = useState(true);
  const { register, formState, watch, setError, handleSubmit } =
    useForm<TokenProps>();
  const navigator = useNavigate();
  useEffect(() => {
    const adminInspect = async () => {
      await axios
        .get(`${BASE_URL}/admin/admin-validation`, {
          withCredentials: true,
        })
        .then((result) => {
          if (result.status === 200) {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.response?.data?.message);
        });
    };

    adminInspect();
  }, []);
  const onValid = async (data: TokenProps) => {
    await axios
      .post(
        `${BASE_URL}/admin/access_token`,
        {
          access_token: data.access_token,
        },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
        setOverlayView(false);
      })
      .catch((error) => {
        setTokenCount((pre) => pre - 1);
        console.log("일치하지않으면 여기가 실행");
        console.log(error);
      });
  };
  useEffect(() => {
    if (tokenCount < 1) {
      window.alert("비정상적인 접근입니다. 모든 로그는 기록되었습니다");
      navigator("/", { replace: false });
    }
  }, [tokenCount]);
  return loading ? null : (
    <>
      {!overlayView ? (
        <Wrapper>
          <FunctionList>
            <Link to={""}>
              <li>관리자 메인화면으로</li>
            </Link>
            <Link to={"register-list"}>
              <li>크리에이터 신청서 보기</li>
            </Link>
            <Link to={"register-list"}>
              <li>크리에이터 신청서 보기</li>
            </Link>
            <Link to={"register-list"}>
              <li>크리에이터 신청서 보기</li>
            </Link>
            <Link to={"register-list"}>
              <li>크리에이터 신청서 보기</li>
            </Link>
            <Link to={"register-list"}>
              <li>크리에이터 신청서 보기</li>
            </Link>
            <Link to={"register-list"}>
              <li>크리에이터 신청서 보기</li>
            </Link>
            <Link to={"register-list"}>
              <li>크리에이터 신청서 보기</li>
            </Link>
          </FunctionList>
          <SubWrapper>
            <Outlet />
          </SubWrapper>
        </Wrapper>
      ) : (
        <Overlay>
          <OverlayBox>
            <form action="post" onSubmit={handleSubmit(onValid)}>
              <label htmlFor="access_token">
                <span>Access Token을 입력해주세요</span>
                {formState.errors.access_token ? (
                  <small>{formState.errors.access_token.message}</small>
                ) : null}
                <input
                  {...register("access_token", {
                    required: "토큰을 입력해주세요",
                  })}
                  id="access_token"
                  type="text"
                />
              </label>
              <label htmlFor="token_submit">
                <span>토큰 제출</span>
                <input id="token_submit" type="submit" />
              </label>
            </form>
          </OverlayBox>
        </Overlay>
      )}
    </>
  );
}

export default AdminMain;
