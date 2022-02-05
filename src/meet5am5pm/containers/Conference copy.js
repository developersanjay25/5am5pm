import { useRecoilState } from "recoil";
import Sidepanel from "../components/conference/sidepanel";
import { joinn } from "../atoms/atoms";
import Joinpromt from "./Joinprompt";
import StartJanusServerRoom from "../components/conference/StartJanusServerRoom";
import ControlBarBottom from "../components/conference/ControlBarBottom";
import "../styles/conference.css";

function Conference(props) {
  const [join, setjoin] = useRecoilState(joinn);
  const localJoin = true;
  console.log("join ####", join);

  const name = props.name;
  const room = props.room;
  return (
    <div id="conference">
      <ControlBarBottom />
    </div>
  );
  // return localJoin ? (
  //   <div id="conference">
  //     <ControlBarBottom />
  //     <Sidepanel name={name} room={room} />
  //     <StartJanusServerRoom />
  //   </div>
  // ) : (
  //   <Joinpromt />
  // );
}
export default Conference;
