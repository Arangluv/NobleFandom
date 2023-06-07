import styled from "styled-components";
import { BsAlarm } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAlarms, postAlarmDelete } from "../../../api/user/usesApi";
import { toast } from "react-toastify";
const Wrapper = styled.div`
  width: 80%;
  min-height: 100vh;
  height: auto;
  background-color: black;
  padding-left: 2vw;
  padding-right: 200px;
  padding-top: 1.5vw;
  border-left: 1px solid white;
  margin-left: 2vw;
`;
const SubWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1vw;

  h1 {
    color: white;
    font-size: 1.5vw;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  svg {
    color: white;
    font-size: 1.5vw;
    margin-right: 0.3vw;
  }
`;
const AlarmContainer = styled.div`
  width: 100%;
  height: 15vh;
  border-radius: 10px;
  border: 1px solid white;
  margin-bottom: 1vw;
  box-shadow: ${(props) => props.theme.textShadow};
  display: flex;
`;
const ProfileImageBox = styled.div`
  min-width: 20%;
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  border-right: 1px solid white;
  align-items: center;
  flex-direction: column;
  padding: 1vw;
  span {
    color: ${(props) => props.theme.accentColor};
    font-weight: 600;
    margin-top: 1vw;
    font-size: 1.1vw;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  div {
    width: 4vw;
    height: 4vw;
    border-radius: 100%;
    object-fit: contain;
    img {
      border: 1px solid rgba(255, 255, 255, 0.5);
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
`;
const AlarmContentBox = styled.div`
  width: 70%;
  height: 100%;
  padding: 1vw;
  p {
    color: white;
    font-size: 1.2vw;
    padding: 1vw;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    height: 100%;
    position: relative;
    text-shadow: ${(props) => props.theme.textShadow};
    font-size: 1.1vw;
    small {
      position: absolute;
      bottom: 0.5vw;
      right: 0.5vw;
      color: rgba(255, 255, 255, 0.9);
      font-size: 1vw;
      text-shadow: none;
      span:first-child {
        margin-right: 0.5vw;
      }
    }
  }
`;
const AlarmDeleteBox = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    svg {
      color: ${(props) => props.theme.textRedColor};
    }
  }
  svg {
    transition: 0.1s ease-in-out;
    color: white;
    font-size: 2vw;
  }
`;
const EmptyNotice = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: rgba(255, 255, 255, 0.5);
    font-size: 2vw;
  }
`;
interface DProps {
  alarms: AlarmProps;
}
interface AlarmProps {
  alarms: IProps[];
  owner: string;
}
interface IProps {
  sender: SenderProps;
  content: string;
  createdAt: string;
  _id: string;
}
interface SenderProps {
  userId: string;
  userProfileImg: string;
}
function Alarm() {
  const { data, isLoading } = useQuery<DProps>({
    queryKey: ["alarmPageAlarms"],
    queryFn: getAlarms,
    staleTime: 1000 * 60 * 5,
    cacheTime: Infinity,
    meta: {
      message: "알람상태를 업데이트 하는데 실패했습니다",
    },
  });
  console.log(data?.alarms);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: postAlarmDelete,
    onSuccess: () => {
      toast.success("알람을 삭제했습니다");
      return queryClient.invalidateQueries({
        queryKey: ["alarmPageAlarms"],
      });
    },
    onError: () => {
      toast.error("알람을 삭제하는데 실패했습니다");
    },
  });
  const handleAlarmsDelete = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    if (!event.currentTarget.dataset.id) {
      return;
    }
    if (!data?.alarms.owner) {
      return;
    }
    mutate({
      deleteId: event.currentTarget.dataset.id,
      owner: data?.alarms.owner,
    });
  };
  return isLoading ? null : (
    <Wrapper>
      <SubWrapper>
        <Title>
          <BsAlarm />
          <h1>알림</h1>
        </Title>
        {data?.alarms?.alarms?.map((alarm) => {
          return (
            <AlarmContainer key={alarm._id}>
              <ProfileImageBox>
                <div>
                  <img src={alarm.sender.userProfileImg} alt="" />
                </div>
                <span>{alarm.sender.userId}</span>
              </ProfileImageBox>

              <AlarmContentBox>
                <p>
                  {alarm.content}
                  <small>
                    <span>{alarm.createdAt.slice(0, 10)}</span>
                    <span>{alarm.createdAt.slice(11, 19)}</span>
                  </small>
                </p>
              </AlarmContentBox>

              <AlarmDeleteBox>
                <AiFillDelete
                  onClick={handleAlarmsDelete}
                  data-id={alarm._id}
                />
              </AlarmDeleteBox>
            </AlarmContainer>
          );
        })}
        {data?.alarms?.alarms.length === 0 ||
        data?.alarms?.alarms === undefined ? (
          <EmptyNotice>
            <span>불러올 알림이 없습니다</span>
          </EmptyNotice>
        ) : null}
      </SubWrapper>
    </Wrapper>
  );
}

export default Alarm;
