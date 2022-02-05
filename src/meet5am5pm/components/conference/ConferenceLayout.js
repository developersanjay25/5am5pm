import React, { useState,useEffect } from "react";
import "../../styles/conferenceLayout.css";
import { useRecoilState } from "recoil";
import { chatopenn , audioo, videoo, opendialogg, settingspreload, Toastt, Recordon, overflowcheckk, swiperreff, ismutedd} from "../../atoms/chatatoms";
import StartJanusServerRoom, { videoremote1 } from "./StartJanusServerRoom";
import $ from 'jquery';
import { layout } from "../../atoms/conference";
import Container from "../whiteboard/container";
import Devicegetting from "./devicegetting";
import { TextField, Typography, Snackbar, IconButton} from "@material-ui/core";
import { socket } from "../../config";
import queryString from "query-string";


// Swipper
// import 'swiper/swiper.min.css'
// import 'swiper/modules/pagination/pagination.min.css'
// import 'swiper/modules/navigation/navigation.min.css'

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper';


//Elastic carousel 
import Carousel from "react-elastic-carousel";




import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import * as icons from "@mui/icons-material";
import Recordicon from "../../../Images/meetimages/recording.gif"
import Recordofficon from "../../../Images/meetimages/recordoff.png"
import { rolee } from "../../atoms/atoms";


export var layoutforjs;




const ConferenceLayout = (props) => {
  const [chatopen,setChatopen] = useRecoilState(chatopenn);
  const [overflowcheck,setOverflow] = useRecoilState(overflowcheckk);
  const [largevideo,setLargevideo] = useState(false);
  const [leftbutton,setLeftButton] = useState('none');
  const [Rightbutton,setRightButton] = useState('none');
  const [layoutt,setlayout] = useRecoilState(layout);
  const [role,setRole] = useRecoilState(rolee);
  const { room } = queryString.parse(window.location.search);
  
  
  //student Toast 
  const [toast, setToast] = useRecoilState(Toastt);

  // settings dialog
  const [opendialog,setOpendialog] = useRecoilState(opendialogg);
  const [settingspreloader,setSettingspreloader] = useRecoilState(settingspreload);

  const [isRecordon, setIsRecordOn] = useRecoilState(Recordon);

  
  const [swiperRef, setSwiperRef] = useState(null);
  const [swiperRefre, setSwiperRefre] = useRecoilState(swiperreff);
  const [ismuted,setIsMuted] = useRecoilState(ismutedd);


  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
  });
  const { vertical, horizontal, open } = state;

  function startstoprecord(){
    setIsRecordOn(!isRecordon)
  }


    // showing preloader for setting
    useEffect(() => {
      if(opendialog)
        {
          setSettingspreloader(true);
  }
  },[opendialog]);

  useEffect(() => {
        if(layoutt !== 'gallery' &&  layoutt !== 'whiteboard')
        {           
          $(videoremote1).prependTo('#layoutHost');
          $(videoremote1).addClass('largevideo');
          $(videoremote1).removeClass('visitor');
        }
        else {
          $(videoremote1).prependTo('#layoutVisitor');
          $(videoremote1).removeClass('largevideo');
          $(videoremote1).addClass('visitor');
          setLargevideo(true);
  }
    });

console.log('Swiper',swiperRef);
// setSwiperRefre(swiperRef)
  
useEffect(() => {

      if(layoutt === 'gallery'){
        layoutforjs = 'gallery'
        $('#layoutHost').removeClass();
        $('#layoutVisitor').removeClass();
        $('#layout').removeClass();
        $('#white-board').removeClass();
        $('#white-board').removeClass();
        $('#yourvideo').removeClass();

        $('#white-board').addClass('hide');
        if(videoremote1){
        $(videoremote1).prependTo('#layoutVisitor');
        $(videoremote1).removeClass('largevideo');
        $(videoremote1).addClass('visitor');
        }

        $('#layoutHost').addClass('layouthostgallery');
        $('#layoutVisitor').addClass('layoutvisitorgallery');
        $('#layout').addClass('layoutgallery');
        $('#layout').css('flex-direction','row');
      }
      else if(layoutt === 'row'){
        layoutforjs = 'row'
        $('#layoutHost').removeClass();
        $('#layoutVisitor').removeClass();
        $('#layout').removeClass();
        $('#white-board').removeClass();

        $('#white-board').addClass('hide');
        $('#layoutHost').addClass('layouthostrow');
        $('#layoutVisitor').addClass('layoutvisitorrow');
        $('#layout').addClass('layoutrow');        
      }
      else if(layoutt === 'column'){
        layoutforjs = 'column';

        $('#layoutHost').removeClass();
        $('#layoutVisitor').removeClass();
        $('#layout').removeClass();
        $('#white-board').removeClass();

        $('#white-board').addClass('hide');
        $('#yourvideo').addClass('yourvideocolumn');
        $('#layoutHost').addClass('layouthostcolumn');
        $('#layoutVisitor').addClass('layoutvisitorcolumn');
        $('#layout').addClass('layoutcolumn');    
      }
      else if(layoutt === 'whiteboard'){
        layoutforjs = 'whiteboard';
        
        if(role == 'Staf')
        { 
          socket.emit('layoutchange',{layout : 'whiteboard' , room : room })
        }
      
        if(videoremote1){
            $(videoremote1).prependTo('#layoutVisitor');
            $(videoremote1).removeClass('largevideo');
            $(videoremote1).addClass('visitor');
        }

          $('#layoutHost').removeClass();
          $('#layoutVisitor').removeClass();
          $('#layout').removeClass();
          $('#white-board').removeClass();
  
          $('#layoutHost').addClass('layouthostrow');
          $('#layoutVisitor').addClass('layoutvisitorrow');
          $('#layout').addClass('layoutrow'); 
          $('#layout').css('flex-direction','row');
      }
},[layoutt]);


useEffect(() => {
    socket.on('layoutchange',(data) => {
        if(data)
        {
          setlayout('whiteboard');
        }
    });

    // For mic muting
    navigator.mediaDevices.getUserMedia({audio : true})
    .then(function(stream) {
      stream.getTracks().forEach(function(track) {
        track.stop();
      });
    })
    .catch(function(err) {  
      setIsMuted(true);
    });
},[])



  if(chatopen){
    if(layoutt !== 'row' || layout !== 'whiteboard'){
    $('#layout').css('margin','0');
    $('#layout').css('width','74%');
    }
  }
  else{
    $('#layout').css('margin','auto');
    $('#layout').css('width','100%');
  }

// scroll arrows
let videocontainer = document.getElementById('layoutVisitor');

useEffect(() => {
var videocontainer = document.getElementById('layoutVisitor');


if(layoutt == 'column'){
  if(videocontainer){
  setLeftButton((videocontainer.scrollLeft > 0) ? 'block' : 'none');
  setRightButton((videocontainer.scrollLeft != videocontainer.scrollWidth - videocontainer.clientWidth) ? 'block' : 'none');
  }
}
  else if(layoutt == 'row' || 'whiteboard'){
  
    setLeftButton((videocontainer.scrollTop > 0) ? 'block' : 'none');
    setRightButton((videocontainer.scrollTop != videocontainer.scrollHeight - videocontainer.clientHeight) ? 'block' : 'none');
    
  }
  else if(layoutt == 'gallery'){
    setLeftButton('none');
    setRightButton('none');
  }

},[overflowcheck,layoutt])


useEffect(() => {
  let videocontainer = document.getElementById('layoutVisitor');
  setRightButton('block')
  // videocontainer.onscroll =  function() { myFunction() }
  // function myFunction() {
    
  //   console.log('top leftt',layoutt);

  //   if(layoutt == 'column'){
      
  //   console.log('top leftt',videocontainer.scrollLeft);
  //   console.log('top leftt',videocontainer.scrollWidth - videocontainer.clientWidth);
  //     setLeftButton((videocontainer.scrollLeft > 0) ? 'block' : 'none');
  //     setRightButton((videocontainer.scrollLeft != videocontainer.scrollWidth - videocontainer.clientWidth) ? 'block' : 'none');
  //     }
  //     else if(layoutt == 'row' || 'whiteboard'){
  //       console.log('top',videocontainer.scrollTop);
  //       console.log('top',videocontainer.scrollHeight - videocontainer.clientHeight);
  //       setLeftButton((videocontainer.scrollTop > 0) ? 'block' : 'none');
  //       setRightButton((videocontainer.scrollTop != videocontainer.scrollHeight - videocontainer.clientHeight) ? 'block' : 'none');
        
  //     }
  //     else if(layoutt == 'gallery'){
  //       setLeftButton('none');
  //       setRightButton('none');
  //     }  }

},[layoutt]);


const lefttop = () => {
  let videocontainer = document.getElementById('layoutVisitor');

if(layoutt == 'column' && videocontainer){
  videocontainer.scrollLeft -=  videocontainer.clientWidth;
  }
  else if(layoutt == 'row' || 'whiteboard' && videocontainer){
    videocontainer.scrollTop -=  videocontainer.clientHeight;
  }

}

const rightbottom = () => {
  let videocontainer = document.getElementById('layoutVisitor');

  if(layoutt == 'column' && videocontainer){
    videocontainer.scrollLeft +=  videocontainer.clientWidth;
    }
    else if(layoutt == 'row' || 'whiteboard' && videocontainer){
      videocontainer.scrollTop +=  videocontainer.clientHeight;
    }
}

  // toast for students
  const handleClose = () => {
    setToast(false);
  };

  // Swiper js
  useEffect(() => {
      document.getElementsByClassName('swiper-wrapper').id = "layoutVisitor";
      console.log('id of clas',document.getElementsByClassName('swiper-wrapper'));
  })

  var clicked = false,clickY;
  $(document.getElementById('layoutVisitor')).on({
    'mousemove': function(e) {
        // clicked && updateScrollPos(e);
        if(clicked){
          console.log(e);
        }
    },
    'mousedown': function(e) {
        clicked = true;
        clickY = e.pageY;
    },
    'mouseup': function() {
        clicked = false;
        $('html').css('cursor', 'auto');
    }
});
  
  return (
    <div style= {{width:'100%'}}>

{/* Toast for students*/}
<Snackbar
  anchorOrigin={{ vertical , horizontal }}     
  open={toast}
  autoHideDuration={6000}
  onClose={handleClose}
  message="staff only have permission"
  key={vertical + horizontal}
/>
<div className="recordbtn">
<Tooltip TransitionComponent={Zoom} title={ isRecordon ? "Stop Recording" : "Start Recording"}>
        {/* <IconButton color="default" className="recordbtn"aria-label="add an alarm"> */}
           {isRecordon ? <img className="recordbtn"  src={Recordicon} onClick={() => setIsRecordOn(!Recordon)}/> : <img className="recordbtn"  onClick={startstoprecord} src={Recordofficon} />}
        {/* </IconButton> */}
      </Tooltip>
</div>
<Devicegetting/>
    
      <div id="layout" 
    style={{ flexDirection: props.layout }}
    >
      <div id="layoutHost">
     
      <div id='white-board'>
        <Container/>
      </div>  


      </div>

<div className="visitorcntainer" style={{display:'flex',position : 'relative', flexDirection: ((layoutt == ('column' || 'whiteboard')) ? 'row' : 'column')}}>
{(layoutt == (('column' || 'whiteboard'))) ? 
<IconButton onClick={lefttop} className="arrowbutton" style={{position : 'absolute', zIndex : '3', backgroundColor:'blue', color:'white', display : leftbutton,position : 'absolute',zIndex:'3', top : '50%'}} color="secondary"><icons.ArrowBack/> </IconButton>     
: <IconButton onClick={lefttop} className="arrowbutton" style={{position : 'absolute', zIndex : '3', backgroundColor:'blue', color:'white', display : leftbutton,position : 'absolute',zIndex:'3', left : '50%'}} color="secondary"><icons.ArrowUpward/> </IconButton> } 

<div id= 'layoutVisitor'  >


      <div width="300" height="230"  style={{display : 'none'}}  id ='yourvideo' >
        <video width="300" height="230" id="localvideo"className='yourvideocolumn' autoPlay muted='muted' playsinline/>
        <Typography id='myrole' style={{color:'white',display:'none'}}>You</Typography>

        </div>
  

      </div>
      {(layoutt == (('column' || 'whiteboard'))) ? 
<IconButton onClick={rightbottom} className="arrowbutton" style={{position : 'absolute', zIndex : '3', backgroundColor:'blue', color:'white', display : Rightbutton,right : '0' , top: '50%'}} color="secondary"><icons.ArrowForward/> </IconButton>     
: <IconButton onClick={rightbottom} className= "arrowbutton" style={{position : 'absolute', zIndex : '3', backgroundColor:'blue', color:'white',display : Rightbutton,bottom:'0', left : '50%'}} color="secondary"><icons.ArrowDownward/> </IconButton> } 

</div>
</div>
    </div>
  );
};

ConferenceLayout.propTypes = {};

export default ConferenceLayout;