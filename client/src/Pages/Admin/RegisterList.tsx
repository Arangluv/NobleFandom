import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { CreatorRegisterList } from "../../api/admin/adminApi";
import { TiDelete } from "react-icons/ti";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../../url";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding: 3vw 1vw;
`;
const SubWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  height: auto;
`;
const RegisterForm = styled.div<FormProps>`
  width: 100%;
  min-height: 10vw;
  height: auto;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 1vw;
  padding: 1vw;
  border: 1px solid white;
  box-shadow: ${(props) => props.theme.textShadow};
  span {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  #sns_title_info {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    small:nth-child(2) {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: ${(props) =>
        props.processed ? props.theme.verifyColor : props.theme.textRedColor};
    }
    small:nth-child(3) {
      font-size: 2vw;
      color: ${(props) => props.theme.textRedColor};
    }
    small:nth-child(3):hover {
      cursor: pointer;
    }
  }
  table {
    width: 100%;
    margin: 1vw 0;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
  }
  th {
    color: ${(props) => props.theme.accentColor};
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: 600;
    text-shadow: ${(props) => props.theme.textShadow};
    padding: 0.5vw 0;
    width: 50%;
  }
  td {
    text-align: center;
    color: white;
    padding: 0.5vw 0;
    font-size: 1.1vw;
  }
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 20vw;
  display: flex;
  margin-top: 1vw;
  justify-content: center;
  overflow-x: scroll;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding-bottom: 3vw;
  img {
    object-fit: cover;
    width: 30%;
    height: 100%;
  }
`;
const SelectButtonBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 3vw;
  display: flex;
  justify-content: space-between;
  button {
    width: 48%;
    padding: 1.5vw 0;
    border-radius: 10px;
    font-size: 1.5vw;
    font-weight: 600;
    background-color: inherit;
    transition: all 0.1s ease-in-out;
    &:first-child {
      border: 1px solid #78d002;
      color: #78d002;
    }
    &:last-child {
      border: 1px solid ${(props) => props.theme.textRedColor};
      color: ${(props) => props.theme.textRedColor};
    }
    &:hover {
      cursor: pointer;
      background-color: white;
    }
  }
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OverlayBox = styled(motion.div)`
  border: 1px solid white;
  box-shadow: ${(props) => props.theme.textShadow};
  width: 50%;
  height: auto;
  background-color: black;
  border-radius: 10px;
  form {
    padding: 2vw;
    label {
      display: flex;
      flex-direction: column;
      span {
        color: white;
        text-align: center;
        text-shadow: ${(props) => props.theme.textShadow};
        margin-bottom: 0;
      }
      #error_state {
        color: ${(props) => props.theme.textRedColor};
        font-size: 1.1vw;
        text-shadow: none;
      }
      textarea {
        border: 1px solid white;
        border-radius: 5px;
        background-color: black;
        padding: 1vw;
        color: white;
        margin-top: 1vw;
        height: 20vw;
      }
      textarea:focus {
        outline: none;
        border-color: ${(props) => props.theme.accentColor};
      }
      input[type="submit"] {
        display: none;
      }
    }
    label[for="reject_submit"] {
      span {
        margin-top: 2vw;
        border-radius: 10px;
        border: 1px solid white;
        box-shadow: ${(props) => props.theme.textShadow};
        padding: 1vw;
        transition: all 0.1s ease-in-out;
      }
      span:hover {
        color: ${(props) => props.theme.accentColor};
        border-color: ${(props) => props.theme.accentColor};
        background-color: white;
      }
    }
  }
`;
const EmptyBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 3vw;
    color: white;
  }
`;
const LoadingOverlayBox = styled(motion.div)`
  width: 20%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface FormProps {
  processed: boolean;
}
interface Dprops {
  register: RegiProps[];
}
interface RegiProps {
  owner: string;
  snsInfo: Array<SnsProps>;
  evidenceUrl: string[];
  processed: boolean;
}
interface SnsProps {
  snsAccount: string;
  snsId: string;
}
interface DataProps {
  reject: string;
}
const variant = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
function RegisterList() {
  const { isLoading, data } = useQuery<Dprops>(["creator-register"], {
    queryFn: CreatorRegisterList,
  });
  const [apiLoading, setApiLoading] = useState(false);
  const { register, watch, formState, handleSubmit } = useForm<DataProps>();
  const [overlay, setOverlay] = useState(false);
  const [rejectRegisterNum, setRejectRegisterNum] = useState<null | number>(
    null
  );
  const handleApprove = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setApiLoading(true);
    const owner = event?.currentTarget.dataset.owner;
    await axios
      .post(`${BASE_URL}/admin/approve`, {
        owner,
      })
      .then((result) => {
        console.log(result);
        setApiLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setApiLoading(false);
      });
  };
  const handleDeleteRegister = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const processState = event.currentTarget.dataset.processed;
    if (window.confirm("삭제하시겠습니까?")) {
      if (processState === "false") {
        window.alert("처리중인 신청서는 삭제할 수 없습니다.");
        return;
      }
      const deleteNum = Number(event.currentTarget.dataset.idx);
      await axios
        .post(`${BASE_URL}/admin/deleteRegister`, {
          owner: data?.register[deleteNum].owner,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const onValid = async (formData: DataProps) => {
    setApiLoading(true);
    if (rejectRegisterNum === null) {
      setApiLoading(false);
      return;
    }
    await axios
      .post(`${BASE_URL}/admin/register-reject`, {
        reject: formData.reject,
        owner: data?.register[rejectRegisterNum].owner,
      })
      .then((result) => {
        console.log(result);
        setOverlay(false);
        setApiLoading(false);
      })
      .catch((errors) => {
        console.log(errors);
        setApiLoading(false);
      });
  };
  const handleReject = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOverlay(true);
    setRejectRegisterNum(Number(event.currentTarget.dataset.idx));
  };
  return (
    <Wrapper>
      {isLoading ? null : (
        <>
          <SubWrapper>
            {data?.register.length === 0 ? (
              <EmptyBox>
                <span>신청서가 없습니다</span>
              </EmptyBox>
            ) : (
              data?.register.map((register, idx) => {
                return (
                  <RegisterForm processed={register.processed}>
                    {/* <span>제출된 SNS 정보</span> */}
                    <span id="sns_title_info">
                      <small>제출된 SNS 정보</small>
                      {register.processed ? (
                        <small>처리완료</small>
                      ) : (
                        <small>처리중</small>
                      )}
                      <small
                        onClick={handleDeleteRegister}
                        data-processed={register.processed}
                        data-idx={idx}
                      >
                        <TiDelete />
                      </small>
                    </span>
                    <table>
                      <th>활동하는 SNS</th>
                      <th>ID</th>
                      {register.snsInfo.map((info) => {
                        return (
                          <tr>
                            <td>{info.snsAccount}</td>
                            <td>{info.snsId}</td>
                          </tr>
                        );
                      })}
                    </table>
                    <span>증빙 자료</span>
                    <ImageContainer>
                      {register.evidenceUrl.map((url) => {
                        return (
                          <img
                            src={url}
                            alt="creator register validation url"
                          />
                        );
                      })}
                    </ImageContainer>
                    <SelectButtonBox>
                      <button
                        onClick={handleApprove}
                        data-owner={register.owner}
                        disabled={register.processed}
                      >
                        승인하기
                      </button>
                      <button
                        onClick={handleReject}
                        data-idx={idx}
                        disabled={register.processed}
                      >
                        반려하기
                      </button>
                    </SelectButtonBox>
                  </RegisterForm>
                );
              })
            )}
          </SubWrapper>
          {overlay ? (
            <AnimatePresence>
              <Overlay
                variants={variant}
                initial="start"
                animate="end"
                exit="exit"
                onClick={() => setOverlay(false)}
              >
                <OverlayBox onClick={(event) => event.stopPropagation()}>
                  <form method="post" onSubmit={handleSubmit(onValid)}>
                    <label htmlFor="reject_reason">
                      <span>반려사유</span>
                      {formState.errors.reject ? (
                        <span id="error_state">
                          {formState.errors.reject.message}
                        </span>
                      ) : null}
                      <textarea
                        {...register("reject", {
                          required: "사유를 작성해주세요",
                          minLength: {
                            value: 10,
                            message: "최소 10글자 이상은 작성해야합니다.",
                          },
                        })}
                        id="reject_reason"
                      ></textarea>
                    </label>
                    <label htmlFor="reject_submit">
                      <span>보내기</span>
                      <input id="reject_submit" type="submit" />
                    </label>
                  </form>
                </OverlayBox>
              </Overlay>
            </AnimatePresence>
          ) : null}
          {apiLoading ? (
            <AnimatePresence>
              <Overlay>
                <LoadingOverlayBox>
                  <HashLoader color="#f1c40f" loading={apiLoading} />
                </LoadingOverlayBox>
              </Overlay>
            </AnimatePresence>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}
export default RegisterList;
