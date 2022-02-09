import "../styles/home.css";
import { useRecoilState } from "recoil";
import {useState,useEffect} from 'react';
import Tabs from "../components/home/Tabs";
import Mediacontainer from "../components/home/Mediacontainer";
import Devicegetting from '../components/conference/devicegetting';
import { emaill, joinn, namee, namejoinn, roomjoinn, rolee, roomm, sidepanell, courseidd, profilee } from "../atoms/atoms";
import Header from "../components/initial/Header";
import "../styles/main.css";
import { Drawer, Typography } from "@material-ui/core";
import { audiodevicee, audioo, olddeviceid, opendialogg, settingspreload, videodevicee, videoo } from "../atoms/chatatoms";
import axios from 'axios';
import queryString from "query-string";
import { formatAMPM } from "../utils/genFunc";
import Drawer_Account_staff from "./AccountSettings";
import Audiovideo from "./audiovideoinputchange";

export var audiodeviceexport,videodeviceexport;


function Home() {
  const [yourName, setName] = useRecoilState(namee);
  console.log(yourName);


  const [namejoin, setNamejoin] = useRecoilState(namejoinn);
  const [lastname, setLastname] = useState();
  const [roomjoin, setRoomjoin] = useRecoilState(roomjoinn);
  const [join, setjoin] = useRecoilState(joinn);
  const [email, setEmail] = useRecoilState(emaill);
  const [role, setRole] = useRecoilState(rolee);
  const [courseid, setCourseid] = useRecoilState(courseidd);
  const [profile, setprofile] = useRecoilState(profilee);
  const [date,setDate] = useState();
  const [time,setTime] = useState();
  
  //settings 
  const [opendialog,setOpendialog] = useRecoilState(opendialogg);
  const [settingspreloader,setSettingspreloader] = useRecoilState(settingspreload);
  const [sidepanel,setSidepanel] = useRecoilState(sidepanell);

  
    const { room } = queryString.parse(window.location.search);
    console.log("home",room);

    axios.get('https://app.5am5pm.com:3000/meeting/sheduletime/'+room).then((res) => {
      console.log(res);
      setDate(res.data.data.date);
      setTime(res.data.data.time);
      setCourseid(res.data.data.course_id);

    }).catch((err) => {
      console.log(err);
    })

    
    axios.get('https://app.5am5pm.com:3000/commonapi/allProfile').then((resp) => {
      setEmail(resp.data.data[0].mobile);
      setNamejoin(resp.data.data[0].first_name);
      setRole(resp.data.data[0].role);
      setprofile(resp.data.data[0].profile_dp);
      // setLastname(resp.data.data[0].last_name)

          console.log(resp.data.data[0].first_name);
  
          console.log(resp.data);
      
      }).catch((err) => {
      if(err){
          console.log(err.response);
      }
      });
  
  console.log('side panel',sidepanel);
  
  // [])
  
  
    // showing preloader for setting
  useEffect(() => {
    if(opendialog)
      {
        setSettingspreloader(true);
}

},[opendialog]);
    


document.body.style= "background:linear-gradient(180deg,#004590 60%,#1c8cbd); overflow:hidden}"

  return (
    <div id='wholebackground' style={{height:'100vh'}}>
       {/* <style>{'body { background:linear-gradient(180deg,#004590 60%,#1c8cbd); overflow:hidden}'}</style> */}
      <Header />
      <div className="home">
        {/* <div id="welcome">{yourName}</div> */}
        <Typography className='welcome'>Hi, {namejoin}</Typography>
        <Typography id='scheduledtime'>scheduled at {date} ,{time}</Typography>
          <div id="holecontainer">
            {/* <div className="tab-wrapper"> */}
              <div className="buttonconatiner">
              {/* </div> */}
            </div>
            <div id="mediacon">
              <Mediacontainer />
              
      <div>
              <Audiovideo/>
      </div>
      
            </div>
            <Tabs />
            <Devicegetting/>

            {/* <MediaDevices/> */}
         
          </div>
        <input type="hidden" value="test"></input>
      </div>
      <Drawer
            anchor='right'
            open={sidepanel}
            onClose={(e) => setSidepanel(false)}
          >
            <Drawer_Account_staff name={namejoin} lastname={lastname} courseid={courseid} />
          </Drawer>
    </div>
  );
}
export default Home;
