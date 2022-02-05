import $, { event } from "jquery";
import camera from "../assets/icons/video-camera.png";
import mic from "../assets/icons/mic.png";
import chatlogo from "../assets/icons/chaticon.png";
import endcall from "../assets/icons/endcall.png";
import { useRecoilState } from "recoil";
import { audioo, chatopenn, messagecountt } from "../atoms/chatatoms.js";
import mutedmic from "../assets/icons/mutedmic.png";
import "./main.css";
import Sidepanel from "./sidepanel.js";
import { joinn } from "../atoms/atoms";
import Joinpromt from "../containers/Joinprompt";
import StartJanusServerRoom from "./conference";

function Chat(props) {
  const [chatopen, setChatopen] = useRecoilState(chatopenn);
  const [messagecount, setMessagecount] = useRecoilState(messagecountt);
  const [audio, setaudio] = useRecoilState(audioo);
  const [join, setjoin] = useRecoilState(joinn);

  function micmuteunmute() {
    if (audio) {
      setaudio(false);
      $("#micmute").attr("src", `${mutedmic}`);
    } else {
      $("#micmute").attr("src", `${mic}`);
      setaudio(true);
    }
  }

  const name = props.name;
  const room = props.room;
  console.log("Props 1 check", name, room);
  const openchat = () => {
    if (!chatopen) {
      $("#messageonline").css("display", "inline");
      $("#onlinwrap").css("display", "none");
      $(".peopleopen").css("border-bottom", "none");
      $(".chatopen").css("border-bottom", "2px solid black");
      $("#messagewrap").css("display", "block");
      setChatopen(true);
      setMessagecount(0);
    } else {
      $("#messageonline").css("display", "none");
      setChatopen(false);
    }
  };

  // counter css
  const spanstyle = {
    color: "blue",
    marginLeft: "-20px",
    fontFamily: "ariel",
  };
  return join ? (
    <div id="conference">
      <div id="chatwrap">
        <div id="logo">
          <img id="chatlogo" onClick={openchat} src={chatlogo}></img>
          <span id="messagecounter" style={spanstyle}>
            {messagecount}
          </span>
          <img src={audio ? mic : mutedmic} onClick={micmuteunmute} />
          <img src={camera} />
          <img src={endcall} />
        </div>
        <Sidepanel name={name} room={room} />
        <StartJanusServerRoom />
      </div>
    </div>
  ) : (
    <Joinpromt />
  );
}
export default Chat;
