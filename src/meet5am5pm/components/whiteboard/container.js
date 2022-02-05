import React from 'react'
import Board, { doRedo, doUndo, moveshapes,canvasclear,addRect,addCircle,addLine,addTriangle,addSquare,pencil,addText,removeshapes,roomm } from './board'
import './conatiner.css';
import * as icons from '@material-ui/icons';
import TextField from '@material-ui/core/TextField'
import { useRecoilState } from 'recoil';
import { clearcanvass, colorr, modee, sizee } from '../../atoms/chatatoms';
import { IconButton, Tooltip , Zoom , Box , Slide, Popover, Slider, Popper, Fade, Paper, ClickAwayListener } from '@material-ui/core';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import {FaEraser} from  'react-icons/fa'
import {BiRectangle} from  'react-icons/bi'
import {AiOutlineMinus} from  'react-icons/ai'
import { socket } from '../../config';
import { v1 as uuid } from 'uuid'

import * as  muiicons from '@mui/icons-material';

function Container()
{
    const [color,setcolor] =useRecoilState(colorr);
    const [brushcolor,setBrushcolor] = React.useState(color);
    const [shapebox,setshapesbox] = React.useState(false);
    const [type,setType] = React.useState('pen');
    const [size,setsize] = useRecoilState(sizee);
    const [mode,setMode] = useRecoilState(modee);
    const [clearcanvas,setClearcanvas] = useRecoilState(clearcanvass);
    

    console.log('size',size);

    // Popover for size of brush
    const [popoverE1,setPopoverE1] = React.useState(null);
    const openpopover = Boolean(popoverE1);


    
    function popoverclose() {
        setPopoverE1(null);
    }

    // Speed dial for shapea
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



    function setcoloringg(){
        if(color !== '#FFFFFF'){
        setBrushcolor(color);
        }
        setcolor("#FFFFFF");
    }

    const boxstyle =  {
        backgroundColor : 'white',
        width: '200px',
        position:'absolute',
        zIndex:'4',
        left:'50%',
        right:'50%',
        top:'20px',
        boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    } 

function circle(){
    addCircle(1,color,uuid());
}
function square()
{
    addSquare(1,color,uuid())
}
function line(){
    addLine(1,color,uuid())
}
function triangle(){
    addTriangle(1,color,uuid())
}
function rectangle(){
    addRect(1,color,uuid())
}
    

    // Drop down
    const actions = [
        { icon: <muiicons.CircleOutlined />, name: 'Circle' , onclick : circle},
        { icon: <icons.CropSquareOutlined />, name: 'Square', onclick : square},
        { icon: <BiRectangle />, name: 'Rectangle',  onclick :rectangle},
        { icon: <muiicons.ChangeHistoryOutlined />, name: 'Triangle', onclick : triangle},
        { icon: <AiOutlineMinus />, name: 'Line', onclick : line},
        { icon: <icons.Delete />, name: 'Delete', onclick : removeshapes},
      ];
      

    return(
        <div className='container'>
            <div>
            <Paper elevation={12} className='color-picker'>

            <Tooltip title="Move" TransitionComponent={Zoom}>
                    <IconButton style={{color:'black'}} onClick={(e) => {moveshapes()}}>
                        <icons.PanToolOutlined/>
                    </IconButton>
                    </Tooltip>
                    <br/>
                    {/* <Typography>Change Color</Typography> */}
                    <Tooltip TransitionComponent={Zoom} title="Brush Color">
                    <input type='color' onChange={(e) => setcolor(e.target.value)}/>
                    </Tooltip>
                    <br/>

                   
                    <Tooltip title="Pen" TransitionComponent={Zoom}>
                    <IconButton  style={{color:'black'}} onClick={(e) => {setcolor(brushcolor);setType('pen');pencil()}}>
                        <icons.Create/>
                    </IconButton>
                    </Tooltip>
                    
                    <br/>

                    {/* <TextField variant='filled' value={size} size='small' label='size' style={{width:'50px'}} onChange={(e) => {setsize(e.target.value)}} /> */}
                    
                    <Tooltip title="Size" TransitionComponent={Zoom}>
                    <IconButton  style={{color:'black'}} onClick={(e) => {setPopoverE1(e.currentTarget);}}>
                        <icons.BrushOutlined/>
                    </IconButton>
                    </Tooltip>

                    {/* <Popover
                    open={openpopover}
                    anchorEl={popoverE1}
                    onClose={popoverclose}
                    style={{background : 'none',boxShadow : 'none'}}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    >
                        <div
                        style={{width:'200px', height: '',padding : '0 10px',marginTop : '40px'}}>
                        <Slider defaultValue={size} onChange={(e,newvalue) => {setsize(newvalue)}} aria-label="Default" valueLabelDisplay="auto" />
                        </div>
                        </Popover> */}
 
 <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={(e) => setPopoverE1(null)}
    >

                        <Popper style={{marginLeft:'15px'}} open={openpopover} anchorEl={popoverE1} placement={'right-end'} onClose={popoverclose} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={6}>
                    <div
                         style={{width:'200px', height: '',padding : '0 10px',marginTop : '40px'}}>
                        <Slider defaultValue={size} onChange={(e,newvalue) => {setsize(newvalue)}} aria-label="Default" valueLabelDisplay="auto" />
                    </div>
          </Paper>
          </Fade>
        )}
      </Popper>
      </ClickAwayListener>

                    <br/>

                    
                    
                    <Tooltip title="Eraser" TransitionComponent={Zoom}>
                    <IconButton style={{color:'black'}} onClick={setcoloringg}>
                        <FaEraser/>
                    </IconButton>
                    </Tooltip>

                    <br/>
                    
                    <Tooltip title="Clear Board" TransitionComponent={Zoom}>
                    <IconButton style={{color:'black'}} onClick={(e) => {setClearcanvas(clearcanvas ? false : true);canvasclear();}}>
                        <icons.ClearAll/>
                    </IconButton>
                    </Tooltip>
                    
                    <br/>
                    
                    <Tooltip title="Add shapes" TransitionComponent={Zoom}>
                    <IconButton style={{color:'black'}} onClick={(e) => {setOpen(true);}}
        >
                        <muiicons.CircleOutlined/>
                   
                             <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: 'absolute',left : '-2px'}}
        icon={<muiicons.CircleOutlined />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={"right"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(e) => { action.onclick(); }}
          />
        ))}
      </SpeedDial>
      </IconButton>
                 
                    </Tooltip>
                    <br/>                   
                    <Tooltip title="Text" TransitionComponent={Zoom}>
                    <IconButton style={{color:'black'}} onClick={(e) => {
                        socket.emit('add-shapes',{obj : 'text', color : color,room : roomm,id : uuid()}) 
                        // addText()
                        }}>
                        <icons.TextFieldsOutlined/>
                    </IconButton>
                    </Tooltip>  

                    <br/>

                    <Tooltip title="Undo" TransitionComponent={Zoom}>
                    <IconButton style={{color:'black'}} onClick={(e) => {
                        socket.emit('add-shapes',{obj : 'undo', color : color,room : roomm,id : uuid()}) 
                        // doUndo()
                        }}>
                        <icons.UndoOutlined/>
                    </IconButton>
                    </Tooltip> 
                    
                    <br/>

                    <Tooltip title="Redo" TransitionComponent={Zoom}>
                    <IconButton style={{color:'black'}} onClick={(e) => {
                        socket.emit('add-shapes',{obj : 'redo', color : color,room : roomm,id : uuid()}) 
                        // doRedo()
                        }}>
                        <icons.RedoOutlined/>
                    </IconButton>
                    </Tooltip>
                    </Paper>
                      </div>
            <br/>

            <div className='board-container' style={{position:'relative'}}>
            {/* <Slide direction="down" in={shapebox}  mountOnEnter unmountOnExit>
                <Box style={boxstyle} elevation={4}>
                    <IconButton  onClick={(e) => {
                        addCircle(1,color,uuid());
                        // socket.emit('add-shapes',{obj : 'addCircle', color : color,room : roomm,id : uuid()}) 
                        setshapesbox(false)}}>
                        <muiicons.CircleOutlined/>
                    </IconButton>
                    <IconButton onClick={(e) => {
                        // socket.emit('add-shapes',{obj : 'square', color : color,room : roomm,id : uuid()}) 
                        setshapesbox(false)}}>
                        <muiicons.CropSquareOutlined/>
                    </IconButton>
                    <IconButton onClick={(e) => {
                        socket.emit('add-shapes',{obj : 'rectangle', color : color,room : roomm,id : uuid()}) 
                        setshapesbox(false)}}>
                        <BiRectangle/>
                    </IconButton>

                    <IconButton onClick={(e) => {
                        socket.emit('add-shapes',{obj : 'line', color : color,room : roomm,id : uuid()}) 
                        setshapesbox(false)}}>
                        <AiOutlineMinus/>
                    </IconButton>

                    <IconButton onClick={(e) => {
                        socket.emit('add-shapes',{obj : 'triangle', color : color,room : roomm,id : uuid()}) 
                        setshapesbox(false)}}>
                        <muiicons.ChangeHistoryOutlined/>
                    </IconButton>
                    <IconButton onClick={(e) => {
                        removeshapes(); 
                        setshapesbox(false)}}>
                        <muiicons.Delete/>
                    </IconButton>
                   </Box>
            </Slide> */}

                <Board color={color} size={size} brushtype={type}/>
            </div>
        </div>
    );
}

export default Container