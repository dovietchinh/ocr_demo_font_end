import React, { useEffect, useRef, useState, useCallback } from "react"
import classNames from 'classnames/bind'
import styles from './DrawLayout.module.scss'
import dragElement,{makeResizableDiv} from './dragElement'
import { getDropdownMenuPlacement } from "react-bootstrap/esm/DropdownMenu"
let cx = classNames.bind(styles)
const COLOR = ["#FF177B","#6E58FA","#43D2E0",
                "#30B82D","#E958D0",
                '#FF4500',"#9932CC","#FF8C00",
                "#40E0D0","#F4A460",
                "#32CD32","#708090","#7FFFD4",
                "#FFFF00","#9ACD32","#EE82EE",
                "#D2B48C"]
function DrawLayout({stateDraw,setStateDraw,listRect,listLabels}){
    let rect = useRef()
    let refRectItems = useRef([])
    let refInputItems = useRef([])
    const [mouse,setMouse] = useState({
        'x':0,
        'y':0,
    })

    useEffect(()=>{
        let element = document.getElementById("main-draw")
        // Object.assign(element.style,{
        //     'position':"relative"
        // })
        // rect.current = element.getBoundingClientRect();
        rect.current = element
        let container = document.querySelector("."+cx("container"))
        container.addEventListener("keyup",handleKeyUp)
        
    },[])

    
    useEffect(()=>{
        refRectItems.current = refRectItems.current.slice(0, stateDraw.listRect.length);
        refInputItems.current = refInputItems.current.slice(0, stateDraw.listRect.length);
    },[listRect])
    const handleClick = (e)=>{
        let x = e.clientX - rect.current.getBoundingClientRect().left
        let y = e.clientY - rect.current.getBoundingClientRect().top
        if(stateDraw.enable){
            setStateDraw((prev)=>{
                if(prev.startpoint!=null){
                    return{
                        'enable':false,
                        'startpoint':null,
                        'listRect':[...prev.listRect,[prev.startpoint,[x,y]]],
                        'listLabel': [...prev.listLabel,[]]
                    }
                }
                else{
                    return {
                        'enable': true,
                        'startpoint': [x,y],
                        // 'endpoint':null,
                        'listRect':[...prev.listRect],
                        'listLabel': [...prev.listLabel]
                    }
                }
            })
        }
    }
    const handleKeyUp = useCallback((e)=>{
        if(e.key=='n'){
            setStateDraw((prev)=>{
                return{
                    ...prev,
                    'enable':!prev.enable
                }
            })
            setMouse({
                'x': e.clientX - rect.current.getBoundingClientRect().left,
                'y': e.clientY - rect.current.getBoundingClientRect().top,
            }) 
        }
    },[])
    const handleMouseMove = (e)=>{
        if(stateDraw.enable){
            setMouse({
                'x': e.clientX - rect.current.getBoundingClientRect().left,
                'y': e.clientY - rect.current.getBoundingClientRect().top,
            })
        }
    }
    const draw = ()=>{
        if(stateDraw.enable){
            let startPoint = stateDraw.startpoint
            let x,y,width,height
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
    
    return (
        <div className={cx("container")} onClick={handleClick} tabIndex="-1"  onMouseMove={handleMouseMove}> 
            {/* <MyRect></MyRect> */}
            {/* <svg className={cx("svg")} id="svg-draw"> */}
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
                        // let text_height = Math.min(Math.max(height*0.2,30),20)
                        // let text_width = Math.min(Math.max(width*0.5,100),64)
                        let pos1,pos2,pos3,pos4
                        let enableDrag = false
                        // let color = "rgba(0,0,0,0.8)"
                    
                        return (
                            
                            <React.Fragment>
                            
                            <div className={cx("sammple_rect")}
                                // ref={ref}
                                // id={"sammple_rect_"+String(index)}
                                onMouseDown={(e)=>{
                                    if(e.target !== e.currentTarget) return;
                                    
                                    pos3 = e.pageX;
                                    pos4 = e.pageY;
                                    enableDrag = true
                                }}
                                onMouseMove={e=>{
                                    if(e.target !== e.currentTarget) return;
                                    
                                    
                                    e.preventDefault()
                                    if(enableDrag){
                                        pos1 = pos3 - e.pageX;
                                        pos2 = pos4 - e.pageY;
                                        pos3 = e.pageX;
                                        pos4 = e.pageY;
                                        e.target.style.top = (e.target.offsetTop - pos2) + "px"
                                        e.target.style.left = (e.target.offsetLeft - pos1) + "px"
                                    }
                                    
                                }}
                                onMouseOver={(e)=>{
                                    for(let temp of document.querySelectorAll("."+ cx("point"))){
                                        temp.style.display = "block"
                                    }
                                }}
                                onMouseLeave={(e)=>{
                                    for(let temp of document.querySelectorAll("."+ cx("point"))){
                                        temp.style.display = "none"
                                    }
                                    if(e.target !== e.currentTarget) return;         
                                    enableDrag = false
                                }}
                                onMouseUp={(e)=>{     
                                    if(e.target !== e.currentTarget) return;
                                    e.preventDefault()
                                    if(enableDrag){
                                        enableDrag = false
                                        let current_y = parseInt(e.target.offsetTop)
                                        let current_x = parseInt(e.target.offsetLeft)
                                        let current_w = parseInt(e.target.style.width.replace("px",''))
                                        let current_h = parseInt(e.target.style.height.replace("px",''))
                                        let listRect = [...stateDraw.listRect]
                                        listRect[index] = [[current_x,current_y],[current_x+current_w,current_y+current_h]]
                                        setStateDraw({
                                            ...stateDraw,
                                            listRect: listRect
                                        })
                                    }
                                }}
                                tabIndex="1"
                                onKeyDown={(e)=>{
                                    e.preventDefault()
                                    if(e.ctrlKey==true && ['1','2','3','4','5','6','7','8','9'].includes(e.key)){
                                        // color = COLOR[parseInt(e.key)-1]
                                        let newListLabel = [...stateDraw.listLabel]
                                        newListLabel[index] = listLabels[parseInt(e.key)-1]
                                        setStateDraw({
                                            ...stateDraw,
                                            listLabel: newListLabel
                                        })
                                        e.target.style.backgroundColor = COLOR[parseInt(e.key)-1]
                                        // e.target.textContent = e.key
                                        // textContent = e.key
                                        
                                    }
                                }}
                                onKeyUp={(e)=>{
                                    if(e.key=='Delete')
                                    {
                                        let newListRect = [...stateDraw.listRect]
                                        let newListLabel = [...stateDraw.listLabel]
                                        newListRect.splice(index, 1);
                                        newListLabel.splice(index, 1);
                                        setStateDraw({
                                            ... stateDraw,
                                            'listRect' : newListRect,
                                            'listLabel': newListLabel
                                        })
                                    }
                                }}
                                style={{top:y,left:x,width:width,height:height,
                                    backgroundColor: COLOR[parseInt(stateDraw.listLabel[index])-1]}}
                                
                                
                                >
                                <span>{stateDraw.listLabel[index]}</span>
                                <div className={cx("point1","point")}
                                    // style={{display:hover}}
                                    onMouseDown={(e)=>{         
                                        pos3 = e.pageX;
                                        pos4 = e.pageY;
                                        let mousemove = (myevent)=>{
                                            pos1 = pos3 - myevent.pageX;
                                            pos2 = pos4 - myevent.pageY;
                                            pos3 = myevent.pageX;
                                            pos4 = myevent.pageY;
                                            e.target.parentElement.style.height =  parseInt(e.target.parentElement.style.height.replace('px','')) - pos2+ 'px'
                                            e.target.parentElement.style.width =  parseInt(e.target.parentElement.style.width.replace('px','')) - pos1+ 'px'
                                        }
                                        let mouseup = (myevent)=>{
                                            document.removeEventListener('mousemove', mousemove, false);
                                            document.removeEventListener('mouseup',mouseup,false)
                                        }
                                        document.addEventListener('mousemove',mousemove,false)
                                        document.addEventListener('mouseup',mouseup,false)
                                    }}
                                ></div>
                                <div className={cx("point2","point")}
                                    // style={{display:hover}}
                                    onMouseDown={(e)=>{
                                        pos3 = e.pageX;
                                        pos4 = e.pageY;
                                        let mousemove = (myevent)=>{
                                            pos1 = pos3 - myevent.pageX;
                                            pos2 = pos4 - myevent.pageY;
                                            pos3 = myevent.pageX;
                                            pos4 = myevent.pageY;
                                            e.target.parentElement.style.height =  parseInt(e.target.parentElement.style.height.replace('px','')) - pos2+ 'px'
                                            // e.target.parentElement.style.width =  parseInt(e.target.parentElement.style.width.replace('px','')) - pos1+ 'px'
                                        }
                                        let mouseup = (myevent)=>{
                                            document.removeEventListener('mousemove', mousemove, false);
                                            document.removeEventListener('mouseup',mouseup,false)
                                        }
                                        document.addEventListener('mousemove',mousemove,false)
                                        document.addEventListener('mouseup',mouseup,false)
                                    }}
                                ></div>
                                <div className={cx("point3","point")}
                                    // style={{display:hover}}
                                    onMouseDown={(e)=>{
                                        pos3 = e.pageX;
                                        pos4 = e.pageY;
                                        let mousemove = (myevent)=>{
                                            pos1 = pos3 - myevent.pageX;
                                            pos2 = pos4 - myevent.pageY;
                                            pos3 = myevent.pageX;
                                            pos4 = myevent.pageY;
                                            e.target.parentElement.style.height =  parseInt(e.target.parentElement.style.height.replace('px','')) - pos2+ 'px'
                                            e.target.parentElement.style.width =  parseInt(e.target.parentElement.style.width.replace('px','')) + pos1+ 'px'
                                            e.target.parentElement.style.left =  parseInt(e.target.parentElement.style.left.replace('px','')) - pos1+ 'px'
                                        }
                                        let mouseup = (myevent)=>{
                                            document.removeEventListener('mousemove', mousemove, false);
                                            document.removeEventListener('mouseup',mouseup,false)
                                        }
                                        document.addEventListener('mousemove',mousemove,false)
                                        document.addEventListener('mouseup',mouseup,false)
                                    }}
                                ></div>
                                <div className={cx("point4","point")}
                                    // style={{display:hover}}
                                    onMouseDown={(e)=>{
                                        pos3 = e.pageX;
                                        pos4 = e.pageY;
                                        let mousemove = (myevent)=>{
                                            pos1 = pos3 - myevent.pageX;
                                            pos2 = pos4 - myevent.pageY;
                                            pos3 = myevent.pageX;
                                            pos4 = myevent.pageY;
                                            
                                            e.target.parentElement.style.width =  parseInt(e.target.parentElement.style.width.replace('px','')) + pos1+ 'px'
                                            
                                            e.target.parentElement.style.left = parseInt(e.target.parentElement.style.left.replace('px','')) - pos1+ 'px'
                                            
                                        }
                                        let mouseup = (myevent)=>{
                                            document.removeEventListener('mousemove', mousemove, false);
                                            document.removeEventListener('mouseup',mouseup,false)
                                        }
                                        document.addEventListener('mousemove',mousemove,false)
                                        document.addEventListener('mouseup',mouseup,false)
                                    }}
                                ></div>
                                <div className={cx("point5","point")}
                                    // style={{display:hover}}
                                    onMouseDown={(e)=>{
                                        pos3 = e.pageX;
                                        pos4 = e.pageY;
                                        let mousemove = (myevent)=>{
                                            pos1 = pos3 - myevent.pageX;
                                            pos2 = pos4 - myevent.pageY;
                                            pos3 = myevent.pageX;
                                            pos4 = myevent.pageY;
                                            e.target.parentElement.style.height =  parseInt(e.target.parentElement.style.height.replace('px','')) + pos2 + 'px'
                                            e.target.parentElement.style.width =  parseInt(e.target.parentElement.style.width.replace('px','')) + pos1 + 'px'
                                            e.target.parentElement.style.left =  parseInt(e.target.parentElement.style.left.replace('px','')) - pos1 + 'px'
                                            e.target.parentElement.style.top =  parseInt(e.target.parentElement.style.top.replace('px','')) - pos2 + 'px'
                                        }
                                        let mouseup = (myevent)=>{
                                            document.removeEventListener('mousemove', mousemove, false);
                                            document.removeEventListener('mouseup',mouseup,false)
                                        }
                                        document.addEventListener('mousemove',mousemove,false)
                                        document.addEventListener('mouseup',mouseup,false)
                                    }}
                                ></div>
                                <div className={cx("point6","point")}
                                    // style={{display:hover}}
                                    onMouseDown={(e)=>{
                                        pos3 = e.pageX;
                                        pos4 = e.pageY;
                                        let mousemove = (myevent)=>{
                                            pos1 = pos3 - myevent.pageX;
                                            pos2 = pos4 - myevent.pageY;
                                            pos3 = myevent.pageX;
                                            pos4 = myevent.pageY;
                                            
                                            
                                            e.target.parentElement.style.height =  parseInt(e.target.parentElement.style.height.replace('px','')) + pos2+ 'px'
                                            e.target.parentElement.style.top = parseInt(e.target.parentElement.style.top.replace('px','')) - pos2+ 'px'
                                            // e.target.parentElement.style.width =  parseInt(e.target.parentElement.style.width.replace('px','')) - pos1+ 'px'
                                        }
                                        let mouseup = (myevent)=>{
                                            document.removeEventListener('mousemove', mousemove, false);
                                            document.removeEventListener('mouseup',mouseup,false)
                                        }
                                        document.addEventListener('mousemove',mousemove,false)
                                        document.addEventListener('mouseup',mouseup,false)
                                    }}
                                ></div>
                                <div className={cx("point7","point")}
                                    // style={{display:hover}}
                                    onMouseDown={(e)=>{
                                        pos3 = e.pageX;
                                        pos4 = e.pageY;
                                        let mousemove = (myevent)=>{
                                            pos1 = pos3 - myevent.pageX;
                                            pos2 = pos4 - myevent.pageY;
                                            pos3 = myevent.pageX;
                                            pos4 = myevent.pageY;
                                            e.target.parentElement.style.height =  parseInt(e.target.parentElement.style.height.replace('px','')) + pos2+ 'px'
                                            e.target.parentElement.style.width =  parseInt(e.target.parentElement.style.width.replace('px','')) - pos1+ 'px'
                                            e.target.parentElement.style.right =  parseInt(e.target.parentElement.style.right.replace('px','')) - pos1+ 'px'
                                            e.target.parentElement.style.top =  parseInt(e.target.parentElement.style.top.replace('px','')) - pos2+ 'px'
                                        }
                                        let mouseup = (myevent)=>{
                                            document.removeEventListener('mousemove', mousemove, false);
                                            document.removeEventListener('mouseup',mouseup,false)
                                        }
                                        document.addEventListener('mousemove',mousemove,false)
                                        document.addEventListener('mouseup',mouseup,false)
                                    }}
                                ></div>
                                 <div className={cx("point8","point")}
                                    // style={{display:hover}}
                                    onMouseDown={(e)=>{
                                        pos3 = e.pageX;
                                        pos4 = e.pageY;
                                        let mousemove = (myevent)=>{
                                            pos1 = pos3 - myevent.pageX;
                                            pos2 = pos4 - myevent.pageY;
                                            pos3 = myevent.pageX;
                                            pos4 = myevent.pageY;
                                            // e.target.parentElement.style.height =  parseInt(e.target.parentElement.style.height.replace('px','')) - pos2+ 'px'
                                            e.target.parentElement.style.width =  parseInt(e.target.parentElement.style.width.replace('px','')) - pos1+ 'px'
                                        }
                                        let mouseup = (myevent)=>{
                                            document.removeEventListener('mousemove', mousemove, false);
                                            document.removeEventListener('mouseup',mouseup,false)
                                        }
                                        document.addEventListener('mousemove',mousemove,false)
                                        document.addEventListener('mouseup',mouseup,false)
                                    }}
                                ></div>
                                    
                            </div>
                                </React.Fragment>
                        )
                    })
                }
                <svg className={cx("svg")} id="svg-draw">
                {
                    draw()
                }
                </svg>
        </div>
    )
}




export default DrawLayout