import { BsDoorClosed } from "react-icons/bs";
import { MdOutlineReportProblem, MdOutlineBlock } from "react-icons/md";
import { RiVipDiamondLine } from "react-icons/ri";
interface IProps {
  setCurrentMenu: React.Dispatch<
    React.SetStateAction<"menu" | "premium" | "media" | null>
  >;
}
function OverlayMenu({ setCurrentMenu }: IProps) {
  return (
    <>
      <div>
        <MdOutlineReportProblem />
        <span>신고하기</span>
      </div>
      <div>
        <MdOutlineBlock />
        <span>차단하기</span>
      </div>
      <div>
        <RiVipDiamondLine />
        <span>VIP 지정</span>
      </div>
      <div onClick={() => setCurrentMenu(null)}>
        <BsDoorClosed />
        <span>닫기</span>
      </div>
    </>
  );
}

export default OverlayMenu;
