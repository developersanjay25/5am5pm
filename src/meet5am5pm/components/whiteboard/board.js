import React, { useEffect,useState } from 'react'
import './board.css'
import socketio from 'socket.io-client';
import $  from 'jquery';
import { socket } from '../../config';
import { useRecoilState } from 'recoil';
import { clearcanvass, colorr, modee, sizee, sockett } from '../../atoms/chatatoms';
// import { socket } from '../conference/Chat';
// import fabric  from 'react-fabricjs';
import { fabric } from 'fabric';
import queryString from "query-string";
import { v1 as uuid } from 'uuid'

export var roomm;
var ctx;
var canvas;
var startx,starty;
var type;
var myCanvas;
var colorvar,sizevar;

var shapeArry = new Array();
var shapenum = 1;

var totArray = new Array;

var reflag = false;
var cstep = 0;
var i = 0;

export function addRect(shapenum,colorvar,id) {

    shapeArry[shapenum] = new fabric.Rect({
        width: 200,
        height: 100,
        left: 30,
        top: 40,
        fill: '',
        stroke: '#000000',
        strokeWidth: 2
    });

    shapeArry[shapenum].set({id: id})
    myCanvas.add(shapeArry[shapenum]);
    myCanvas.centerObject(shapeArry[shapenum]);
    shapeArry[shapenum].setCoords();
    myCanvas.setActiveObject(shapeArry[shapenum]);
    myCanvas.renderAll();

}

export function addSquare(shapenum,colorvar,id) {
    shapeArry[shapenum] = new fabric.Rect({
        width: 100,
        height: 100,
        left: 150,
        top: 50,
        fill: '',
        stroke: colorvar,
        strokeWidth: 2
    });    

    shapeArry[shapenum].set({id: id})
    myCanvas.add(shapeArry[shapenum]);
    myCanvas.centerObject(shapeArry[shapenum]);
    shapeArry[shapenum].setCoords();
    myCanvas.setActiveObject(shapeArry[shapenum]);
    myCanvas.renderAll();
}

export function addCircle(shapenum,colorvar,id) {
    shapeArry[shapenum] = new fabric.Circle({
        radius: 50,
        fill: '',
        stroke: colorvar,
        strokeWidth: 2,
    });
    shapeArry[shapenum].set({id: id})
    myCanvas.add(shapeArry[shapenum]);
    myCanvas.centerObject(shapeArry[shapenum]);
    shapeArry[shapenum].setCoords();
    myCanvas.setActiveObject(shapeArry[shapenum]);
    myCanvas.renderAll();
}


export function addTriangle(shapenum,colorvar,id) {
    shapeArry[shapenum] = new fabric.Triangle({
        width: 100,
        height: 100,
        fill: '',
        stroke: colorvar,
        strokeWidth: 2
    });

    shapeArry[shapenum].set({id: id})
    myCanvas.add(shapeArry[shapenum]);
    myCanvas.centerObject(shapeArry[shapenum]);
    shapeArry[shapenum].setCoords();
    myCanvas.setActiveObject(shapeArry[shapenum]);
    myCanvas.renderAll();
}

export function addLine(shapenum,colorvar,id) {
    shapeArry[shapenum] = new fabric.Line([0, 0, 200, 0], {
        fill: '',
        stroke: colorvar,
        strokeWidth: 2
    });

    shapeArry[shapenum].set({id: id})
    myCanvas.add(shapeArry[shapenum]);
    myCanvas.centerObject(shapeArry[shapenum]);
    shapeArry[shapenum].setCoords();
    myCanvas.setActiveObject(shapeArry[shapenum]);
    myCanvas.renderAll();
}


export function addEllipse(shapenum,colorvar,id) {
    shapeArry[shapenum] = new fabric.Ellipse({
        fill: '',
        stroke: colorvar,
        strokeWidth: 5,
    });

    shapeArry[shapenum].set({id: id})
    myCanvas.add(shapeArry[shapenum])
    myCanvas.centerObject(shapeArry[shapenum]);
    shapeArry[shapenum].setCoords();
    myCanvas.setActiveObject(shapeArry[shapenum]);
    myCanvas.renderAll();
}

export function pencil()
{
    myCanvas.EraserBlock = false;
    myCanvas.isDrawingMode = true;
    myCanvas.forEachObject(function (obj) {
        obj.set({
            hasControls: false,
            hasBorders: false,
            selectable: false
        });
    });
    myCanvas.renderAll();
}


export function removeshapes(){
    var cobj = myCanvas.getActiveObject();
    socket.emit('remove-shape',{obj : cobj,id : cobj.id,room : roomm});
}


export  function moveshapes()
{
    myCanvas.isDrawingMode = false;
    myCanvas.forEachObject(function (obj) {
        if (typeof obj != 'object' || obj.hasOwnProperty('path')) {
            obj.set({
                hasControls: false,
                hasBorders: false,
                selectable: false
            });
        } else {
            obj.set({
                hasControls: true,
                hasBorders: true,
                selectable: true
            });
            myCanvas.setActiveObject(obj);
        }

    });
    myCanvas.renderAll();
}

/*===== Text =====*/

var txtNum = 1;
var iTextArr = new Array();
var textArr = new Array();
var fontArr = new Array();
var alignArr = new Array();
var styleArr = new Array();
var sizeArr = new Array();
var colorArr = new Array();
$('#TextTool').click(function () {
    myCanvas.EraserBlock = false;
    myCanvas.isDrawingMode = false;
    myCanvas.forEachObject(function (obj) {
        obj.set({
            hasControls: false,
            hasBorders: false,
            selectable: false
        });
    });
    myCanvas.renderAll();
    $('ul.toolBox').css({'margin-left': '-350px'});
    $('ul.toolBox.TextToolBox ').css({'margin-left': '0'});
    $('ul.toolBox').removeClass('active');
    $('.whitboard-left-nav li a').removeClass('active');
    $('ul.toolBox.TextToolBox, #TextTool').addClass('active');
    //$('#textOptions').show();
    if (txtNum > 1) {
        for (var i = 1; i <= txtNum - 1; i++) {
            iTextArr[i].set({
                hasControls: true,
                hasBorders: true,
                selectable: true
            });
        }
    }
    addText(txtNum);
    txtNum++;
});


export function addText(num,colorvar,id) {
    textArr[num] = 'Type Here';
    fontArr[num] = 'Times New Roman';
    alignArr[num] = 'left';
    sizeArr[num] = '20';
    styleArr[num] = 'normal';
    colorArr[num] = '#0070ba';
    $('.divStyleBold i, .divStyleItalic i').css({
        'background-color': "#ffffff",
        'color': '#000000'
    });
    $('.divAlign i').css({
        'background-color': "#ffffff",
        'color': '#000000'
    });
    $('#alignleft i').css({
        'background-color': "#424242",
        'color': '#ffffff'
    });
    iTextArr[num] = new fabric.IText(textArr[num], {
        fill: colorvar,
        hasControls: true,
        hasBorders: true,
        hasRotatingPoint: true
    });
    iTextArr[num].set({
        fontFamily: fontArr[num],
        textAlign: alignArr[num],
        fontStyle: styleArr[num],
        fontSize: sizeArr[num],
        padding: 5
    });
    iTextArr[num].on('selected', function (e) {
        var alignopt = 'center';
        var styleopt = '';
        var weightopt = 'italic';
        $('.divAlign i').css({
            'background-color': "#ffffff",
            'color': '#000000'
        });
        $('#align' + alignopt + ' i').css({
            'background-color': "#424242",
            'color': '#ffffff'
        });
        $('.divStyleBold i').css({
            'background-color': "#ffffff",
            'color': '#000000'
        });
        $('#style' + weightopt + ' i').css({
            'background-color': "#424242",
            'color': '#ffffff'
        });
        $('.divStyleItalic i').css({
            'background-color': "#ffffff",
            'color': '#000000'
        });
        $('#style' + styleopt + ' i').css({
            'background-color': "#424242",
            'color': '#ffffff'
        });
    });
    myCanvas.on('text:changed', function (e) {
        var cobj = myCanvas.getActiveObject();
        console.log(cobj.text,cobj.id)
        socket.emit('text-change',{id: cobj.id,text:cobj.text,room:roomm});
    });
    myCanvas.add(iTextArr[num]);
    iTextArr[num].set({id: id})
    myCanvas.setActiveObject(iTextArr[num]);
    myCanvas.centerObject(iTextArr[num]);
    iTextArr[num].setCoords();
    myCanvas.renderAll();
}

export function doUndo() {
    if (myCanvas.i > 0) {
        reflag = true;
        myCanvas.remove(myCanvas.totArray[myCanvas.i - 1]);
        myCanvas.i--;
    }
}

export function doRedo() {
    if (myCanvas.i < myCanvas.totArray.length) {
        myCanvas.add(myCanvas.totArray[myCanvas.i]);
        if (!reflag) {
            myCanvas.i++;
        }
    }
}

export function canvasclear()
{
    myCanvas.clear();
}

function Board(props)
{
   const [color,setcolor] =useRecoilState(colorr);
   const [size,setsize] = useRecoilState(sizee);
   const [mode,setMode] = useRecoilState(modee);
   const [clearcanvas,setClearcanvas] = useRecoilState(clearcanvass);
   const initialRender = React.useRef(true);
   const {room} = queryString.parse(window.location.search);
   roomm = room; 


   function canvasready()
   {
    myCanvas = new fabric.Canvas('board',{
        isDrawingMode: true,
        height:  window.innerHeight - 100,
        width: window.innerWidth - 400,
        backgroundColor: '#ffffff'
     })
     myCanvas.totArray = new Array();
     myCanvas.i = 0;
   }

   function canvasfeatures()
   {
    myCanvas.on('object:added', function (opt) {
        myCanvas.totArray[myCanvas.i] = opt.target;
        myCanvas.i++;

        // socket.emit('white-board',{img:myCanvas.toJSON() , room : room});            
    });


    // Sending dataurl to socketio
    myCanvas.on('mouse:down',(e) => {
                
        const pointer = myCanvas.getPointer(e);
        socket.emit('mouse-down',{room: roomm,pointer : pointer})
    });

    myCanvas.on('path:created', function(e) {
        e.path.set();
        myCanvas.renderAll();
        var dataURL = myCanvas.toDataURL({
            format: 'jpeg',
            quality: 0.8
          });
        // socket.emit('white-board',{img:myCanvas.toDataURL('jpeg') , room : room});     
        socket.emit('white-board',{img:myCanvas.toJSON() , room : room});            

      });

    myCanvas.on('mouse:up',(e) => {
        myCanvas.off('mouse:move',mousemove(e))
    })

function mousemove(e){

}

    // Object modification
    myCanvas.on('object:modified', function (options) {
    if (options.target) {
      const modifiedObj = {
        obj: options.target,
        id: options.target.id,
      }
      var dataURL = myCanvas.toDataURL({
        format: 'jpeg',
        quality: 0.8
      });

      socket.emit('object-modify',{obj : modifiedObj,room : room});
    //   socket.emit('white-board',{img:myCanvas.toDataURL('jpeg') , room : room}); 
    socket.emit('white-board',{img:myCanvas.toJSON() , room : room});            
    }
  });


    //   Object moving
    myCanvas.on('object:moving', function (options) {
        if (options.target) {
        const modifiedObj = {
            obj: options.target,
            id: options.target.id,
        }
        var dataURL = myCanvas.toDataURL({
            format: 'jpeg',
            quality: 0.8
          });
    //   socket.emit('white-board',{img:myCanvas.toDataURL('jpeg') , room : room}); 
    //   socket.emit('object-move',{obj : modifiedObj,room : room});
    // socket.emit('white-board',{img:myCanvas.toJSON() , room : room});            
    socket.emit('white-board',{img:myCanvas.toJSON() , room : room});            
        }
    })
}

    useEffect(() => {
                draww();

                canvasready();
                canvasfeatures();

                // Draw on white board
                socket.on('white-board',(img) => {
                //     console.log(img);
                //     fabric.Image.fromURL(img.img, function(img) {
                //         // img.set({ left: ui.offset.left, top: ui.offset.top});
                //         img.selectable = false;
                //         img.lockMovementX = true;
                //         img.lockMovementY = true;
                //         myCanvas.add(img);       
                //     });

                    myCanvas.loadFromJSON(img.img,function() {
                        myCanvas.renderAll();
                    },function(o,object){
                        // if(o.type != 'path')
                        object.selectable = false;
                        object.lockMovementX = true;
                        object.lockMovementY = true;                           
                     });

                      
                // fabric.loadSVGFromString( img.img , function (objects, options) {
                //     var obj = fabric.util.groupSVGElements(objects, options);
                //     myCanvas.add(obj).centerObject(obj);
                //     obj.setCoords();
                //     myCanvas.calcOffset();
                //     myCanvas.renderAll();
                //     //alert('sss');  
                // }); 
            // });

            });


                // add shapes
                socket.on('addshape',(obj) => {
                   console.log(obj.id);
                    if(obj.obj == 'addCircle')
                    {
                        addCircle(shapenum,obj.color,obj.id);
                    }
                    else if(obj.obj == 'rectangle')
                    {
                        addRect(shapenum,obj.color,obj.id);   
                    }      
                    else if(obj.obj == 'square')
                    {
                        addSquare(shapenum,obj.color,obj.id);   
                    }
                    else if(obj.obj == 'triangle')
                    {
                        addTriangle(shapenum,obj.color,obj.id);   
                    }
                    else if(obj.obj == 'line')
                    {
                        addLine(shapenum,obj.color,obj.id);   
                    } 
                    if(obj.obj == 'text')
                    {
                        addText(shapenum,obj.color,obj.id);
                    }
                    else if(obj.obj == 'undo')
                    {
                        doUndo();
                    }
                    else if(obj.obj == 'redo')
                    {
                        doRedo();
                    }
                    else if(obj.obj == 'delete')
                    {
                        
                    }
                })

                socket.on('object-modify',(data) =>  {
                    const { obj, id } = data.obj
                    myCanvas.getObjects().forEach(object => {
                      if (object.id === id) {
                        object.set(obj)
                        object.setCoords()
                        myCanvas.renderAll()
                      }
                      else if(object.id == undefined){
                          object.isPanning = false;
                          object.selectable = false;
                      }
                    })
                })

                
                socket.on('object-movee',(data) =>  {
                    const { obj, id } = data.obj
                    myCanvas.getObjects().forEach(object => {
                      if (object.id === id) {
                        object.set(obj)
                        object.setCoords()
                        myCanvas.renderAll()
                      }
                    })
                })

                socket.on('remove-shape',(data) => {

                    myCanvas.getObjects().forEach(function(obj) {
                        console.log('remove shapes',data.id,obj.id);
                        if(obj.id == data.id)
                        {
                            myCanvas.remove(obj);
                        }
                    })
                })

                
                socket.on('text-change',(data) => {

                    myCanvas.getObjects().forEach(function(obj) {
                        if(obj.id == data.id)
                        {
                            console.log(obj,obj.text,data);
                            obj.text = data.text;
                            myCanvas.renderAll();
                        }
                    })
                })

                socket.on('clearcanvas', () => {
                    alert('clear canvas');
                    canvasclear();
                })
    },[])


type = props.brushtype;

    // Color
    useEffect(() => {
        if(ctx){
        colorvar = color;

        myCanvas.freeDrawingBrush.color = color;
    }
    })

    // size
    useEffect(() => {
        if(ctx){
        sizevar = size;
        myCanvas.freeDrawingBrush.width = size;
    }
    },[size])

    // Send clear data canvas
    useEffect(()=> {
        if(!initialRender.current)
        {
            socket.emit('clearcanvas',{msg: 'clear',room : room});
    }
    initialRender.current = false;
    },[clearcanvas])


  function draww()
  {
    canvas = document.querySelector('#board');
    ctx = canvas.getContext('2d');
    // ctx = myCanvas;

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var mouse = {x: 0, y: 0};
    var last_mouse = {x: 0, y: 0};

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);


    /* Drawing on Paint App */
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    canvas.addEventListener('mousedown', function(e) {
        startx = mouse.x;
        starty = mouse.y;
       
        // alert('mouse down');
        if(type == 'pen'){
        canvas.addEventListener('mousemove', onPaint, false);
        }
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    var onPaint = function() {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.closePath();
        
        var dataURL = myCanvas.toDataURL({
            format: 'jpeg',
            quality: 0.8
          });

        // socket.emit('white-board',{img : myCanvas.toJSON() ,room : room});
};

       
  }
    return(
        <div>
        <div id='sketch' className='sketch'>
        <canvas className='board' id='board'>

        </canvas>
        </div>

        </div>
    );
}

export default Board