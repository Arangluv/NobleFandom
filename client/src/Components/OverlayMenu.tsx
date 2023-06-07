import { BsDoorClosed } from "react-icons/bs";
import { MdOutlineReportProblem, MdOutlineBlock } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { RiVipDiamondLine } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { loginState } from "../atoms/atoms";
interface IProps {
  setCurrentMenu: React.Dispatch<
    React.SetStateAction<"menu" | "premium" | "media" | null>
  >;
}
function OverlayMenu({ setCurrentMenu }: IProps) {
  const userLoginState = useRecoilValue(loginState);
  return (
    <>
      <div>
        <MdOutlineReportProblem />
        <span>신고하기</span>
      </div>
      {userLoginState.userType === "creator" ? (
        <div>
          <MdOutlineBlock />
          <span>차단하기</span>
        </div>
      ) : null}
      {userLoginState.userType === "creator" ? (
        <div>
          <RiVipDiamondLine />
          <span>VIP 지정</span>
        </div>
      ) : null}
      <div>
        <BsDoorClosed />
        <span>채팅방 나가기</span>
      </div>
      <div onClick={() => setCurrentMenu(null)}>
        <AiOutlineClose />
        <span>닫기</span>
      </div>
    </>
  );
}

export default OverlayMenu;
