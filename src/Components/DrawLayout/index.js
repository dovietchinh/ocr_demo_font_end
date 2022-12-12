import React, { useEffect, useRef, useState } from "react"
import classNames from 'classnames/bind'
import styles from './DrawLayout.module.scss'
let cx = classNames.bind(styles)
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
}
function DrawLayout(){
    let rect = useRef()
    const [mouse,setMouse] = useState({
        'x':0,
        'y':0,
    })
    const [stateDraw,setStateDraw] = useState({
        'enable': false,
        'startpoint': null,
        'endpoint':null,
        'listRect': []
    })
    // console.log('rerendern',stateDraw)
    useEffect(()=>{
        let element = document.getElementById("main-draw")
        Object.assign(element.style,{
            'position':"relative"
        })
        rect.current = element.getBoundingClientRect();

        
    },[])
    const handleClick = (e)=>{
        let x = e.pageX - rect.current.left
        let y = e.pageY - rect.current.top
        if(stateDraw.enable){
            setStateDraw((prev)=>{
                if(prev.startpoint!=null){
                    return{
                        'enable':false,
                        'startpoint':null,
                        'endpoint': [x,y],
                        'listRect':[...prev.listRect,[prev.startpoint,[x,y]]]
                    }
                }
                else{
                    return {
                        'enable': true,
                        'startpoint': [x,y],
                        'endpoint':null,
                        'listRect':[...prev.listRect]
                    }
                }
            })
        }
    }
    const onKeyDown = (e)=>{
        console.log('keyup: ',e.key)
        if(e.key=='n'){
            setStateDraw((prev)=>{
                return{
                    ...prev,
                    'enable':!prev.enable
                }
            }) 
    }
    }
    const handleMouseMove = (e)=>{
        if(stateDraw.enable){
            setMouse({
                'x': e.pageX - rect.current.left,
                'y': e.pageY - rect.current.top,
            })
        }
    }
    const draw = ()=>{
        
        if(stateDraw.enable){
            let startPoint = stateDraw.startpoint
            let x,y,width,height
            // console.log(startPoint)
            if(startPoint!=null){
                x = Math.min(startPoint[0],mouse.x)
                y = Math.min(startPoint[1],mouse.y)
                width = mouse.x - startPoint[0]
                height = mouse.y - startPoint[1]
                width = Math.max(width,-width)
                height = Math.max(height,-height)
            }
            

            return(
                <React.Fragment>
                    <line x1="0" y1={mouse.y} x2="1000" y2={mouse.y} stroke="red" strokeWidth="1.6"></line>
                    <line x1={mouse.x} y1="0" x2={mouse.x} y2="1000" stroke="red" strokeWidth="1.6" ></line>
                    startPoint!=null && (<rect x={x} y={y} width={width} height={height} className={cx("rect")}></rect>)
                </React.Fragment>
            )
        }
    }
    
    // useEffect(()=>{
    //     let listRectx = document.querySelectorAll("rect")
    //     if(listRectx.length==0) return
        
    //     console.log('listRectx: ',listRectx)
        
    //     for(let temp=0;temp<=listRectx.length;temp++){
    //         dragElement(listRectx[temp])
    //     }
    // },[stateDraw])
    return (
        <div className={cx("container")} onClick={handleClick} tabIndex="-1" onKeyUp={onKeyDown} onMouseMove={handleMouseMove}> 
            <svg className={cx("svg")} id="svg-draw">
                {   
                    stateDraw['listRect'].map((ele,index)=>{
                        if(ele==null){
                            return 
                        }
                        let startPoint = ele[0]
                        let endPoint = ele[1]
                        let x = Math.min(startPoint[0],endPoint[0])
                        let y = Math.min(startPoint[1],endPoint[1])
                        let width = endPoint[0] - startPoint[0]
                        let height = endPoint[1] - startPoint[1]
                        width = Math.max(width,-width)
                        height = Math.max(height,-height)
                        let text_height = Math.min(Math.max(height*0.2,30),20)
                        let text_width = Math.min(Math.max(width*0.5,100),64)
                        console.log('input_y2: ',0.2*height)
                        console.log('y: ',y)
                        return (
                            <React.Fragment>
                            <foreignObject width={width} height="100%" x={x} y={y-text_height} className={cx("input-tag")} >
                                <input className={cx("input-tag--inner")} 
                                    contentEditable='true'
                                    style={{maxWidth:width*0.5}}
                                ></input>
                            </foreignObject>
                            <rect key={index} 
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    className={cx("rect")}
                                    tabIndex="-1"
                                    onFocus={(e)=>{
                                        e.target.setAttribute("fill","blue")
                                        e.target.setAttribute("stroke","blue");
                                        console.log('focus',index)}
                                    }
                                    onKeyUp={(e)=>{
                                        console.log(e.key)
                                        if(e.key=='Delete')
                                        {
                                            let newList = [...stateDraw.listRect]
                                            newList.splice(index, 1);
                                            setStateDraw({
                                                ... stateDraw,
                                                'listRect' : newList
                                            })
                                        }
                                    }}
                                    // onMouseDown={(e)=>{
                                    //     e.preventDefault()
                                    //     let x = e.pageX - rect.current.left
                                    //     let y = e.pageY - rect.current.top
                                    //     console.log('MouseDown x: ',x)
                                    //     console.log('MouseDown y: ',y)
                                        
                                    //     e.target.onMouseUp = (e)=>{
                                    //         e.target.onMouseUp=null
                                    //         e.target.onMouseMove=null
                                    //     }
                                    //     e.target.onMouseMove = (e)=>{
                                    //         pos1 = pos3 - e.clientX;
                                    //         pos2 = pos4 - e.clientY;
                                    //         pos3 = e.clientX;
                                    //         pos4 = e.clientY;
                                    //         e.target.style.top = (e.target.offsetTop - pos2) + "px";
                                    //         e.target.style.left = (e.target.offsetLeft - pos1) + "px";
                                    //     }

                                        
                                    // }}
                                    
                                    
                            >
                               
                            </rect>
                            </React.Fragment>
                        )
                    })
                }
                {
                    draw()
                }
            </svg>
        </div>
    )
}




export default DrawLayout