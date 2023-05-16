import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { CreatorRegisterList } from "../../api/admin/adminApi";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  border: 1px solid purple;
  padding: 3vw 1vw;
`;
const SubWrapper = styled.div`
  border: 1px solid blue;
  width: 100%;
  min-height: 100vh;
  height: auto;
`;
interface Dprops {
  register: {
    owner: string;
    snsInfo: Array<SnsProps>;
    evidenceUrl: string[];
  };
}
interface SnsProps {
  snsAccount: string;
  snsId: string;
}
function RegisterList() {
  const { isLoading, data } = useQuery<Dprops>(["creator-register"], {
    queryFn: CreatorRegisterList,
  });
  console.log(data?.register);
  console.log(data);
  return <Wrapper>{isLoading ? null : <SubWrapper></SubWrapper>}</Wrapper>;
}
export default RegisterList;
