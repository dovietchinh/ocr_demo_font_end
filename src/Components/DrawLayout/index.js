import React, { useEffect, useRef, useState, useCallback } from "react"
import classNames from 'classnames/bind'
import styles from './DrawLayout.module.scss'
import dragElement,{makeResizableDiv} from './dragElement'
let cx = classNames.bind(styles)

function MyRect(){
    let enableDrag = useRef(false)
    let pos1 = useRef()
    let pos2 = useRef()
    let pos3 = useRef()
    let pos4 = useRef()
    let ref = useRef()
    let ref2 = useRef()
    let ref3 = useRef()
    let ref4 = useRef()
    let ref5 = useRef()
    // useEffect(()=>{
    //     makeResizableDiv('.resizers')
    // },[])
    return(
        <div className={cx("sammple_rect")}
            ref={ref}

                onMouseDown={(e)=>{
                    if(e.target !== e.currentTarget) return;
                    console.log('parent')              
                    pos3.current = e.pageX;
                    pos4.current = e.pageY;
                    enableDrag.current = true
                }}
                onMouseMove={e=>{
                    if(e.target !== e.currentTarget) return;
                    
                    console.log('parent')              
                    console.log(e.pageX,e.pageY)
                    e.preventDefault()
                    if(enableDrag.current){
                        pos1.current = pos3.current - e.pageX;
                        pos2.current = pos4.current - e.pageY;
                        pos3.current = e.pageX;
                        pos4.current = e.pageY;
                        // let x = e.target.getAttribute('x')
                        // let y = e.target.getAttribute('y')
                        // x = parseFloat(x)
                        // y = parseFloat(y)
                        // e.target.setAttribute('x',x - pos1)
                        // e.target.setAttribute('y',y - pos2)
                        // e.target.style.transform
                        e.target.style.top = (e.target.offsetTop - pos2.current) + "px"
                        e.target.style.left = (e.target.offsetLeft - pos1.current) + "px"
                    }
                }}
                onMouseLeave={(e)=>{
                    if(e.target !== e.currentTarget) return;
                    
                    // console.log('parent')              
                    enableDrag.current = false
                }}
                onMouseUp={(e)=>{     
                    if(e.target !== e.currentTarget) return;
                    console.log('parent')              
                    enableDrag.current = false
                }}
                >
                    {/* <div className={cx('resizers')} >
                        <div className={cx("resizer","top")} ref={ref2}></div>
                        <div className={cx("resizer","right")} ref={ref3}></div>
                        <div className={cx("resizer","bottom")} ref={ref4}></div>
                        <div className={cx("resizer","left")} ref={ref5}></div>
                    </div> */}
                    {/* <div className='resizers'>
                        <div className='resizer top'></div>
                        <div className='resizer right'></div>
                        <div className='resizer bottom'></div>
                        <div className='resizer left'></div>
                    </div> */}
                    <div className={cx("point1")}
                        onMouseDown={e=>{
                            pos3.current = e.pageX;
                            pos4.current = e.pageY;
                            enableDrag.current = true
                        }}
                        onMouseMove={e=>{
                            console.log('children')
                        }}
                        // onMouseLeave={e=>{
                        //     // console.log('children')
                        // }}
                        onMouseUp={e=>{
                            console.log('children')
                        }}
                    ></div> 
                    
                </div>
    )
}


function DrawLayout({stateDraw,setStateDraw,listRect}){
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
        rect.current = element.getBoundingClientRect();
        let container = document.querySelector("."+cx("container"))
        container.addEventListener("keyup",handleKeyUp)
    },[])
    useEffect(()=>{
        refRectItems.current = refRectItems.current.slice(0, stateDraw.listRect.length);
        refInputItems.current = refInputItems.current.slice(0, stateDraw.listRect.length);
    },[listRect])
    const handleClick = (e)=>{
        let x = e.pageX - rect.current.left
        let y = e.pageY - rect.current.top
        if(stateDraw.enable){
            setStateDraw((prev)=>{
                if(prev.startpoint!=null){
                    return{
                        'enable':false,
                        'startpoint':null,
                        // 'endpoint': [x,y],
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
        }
    },[])
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
            <MyRect></MyRect>
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
                        // let text_height = Math.min(Math.max(height*0.2,30),20)
                        // let text_width = Math.min(Math.max(width*0.5,100),64)
                        let pos1,pos2,pos3,pos4
                        let enableDrag = false
                        return (
                            <React.Fragment>
                            {/* <foreignObject key={index+"_input"} width={width} height={text_height} x={x} y={y-text_height} className={cx("input-tag")} 
                            style={{maxWidth:width,minWidth:"16px"}}
                            // ref={el=>refInputItems.current[index]=el}
                            id={`foreingnObject_${index}`}
                            >
                                <input key={index+"_input2"} className={cx("input-tag--inner")} 
                                    onFocus={(e)=>{
                                        let container = document.querySelector("."+cx("container"))
                                        container.onkeyup=null
                                        container.removeEventListener("keyup",handleKeyUp)
                                    }}
                                    
                                    value={stateDraw.listLabel[index]}
                                    onChange = {(e)=>{
                                        let newListLabel = [...stateDraw.listLabel]
                                        newListLabel[index] = e.target.value
                                        setStateDraw({
                                            ...stateDraw,
                                            listLabel: newListLabel
                                        })
                                    }}
                                    onBlur={(e)=>{
                                        
                                        let container = document.querySelector("."+cx("container"))
                                        container.addEventListener("keyup",handleKeyUp)
                                    }}
                                    style={{maxWidth:width,minWidth:"16px"}}
                                ></input>
                            </foreignObject> */}
                            <rect key={index+"_rect"} 
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    strokeWidth={10}
                                    ref={el=>refRectItems.current[index]=el}
                                    className={cx("rect")}
                                    tabIndex="1"
                                    style={{"zIndex": index+100}}
                                    onMouseDown={(e)=>{
                                        // let temp = document.getElementById(`foreingnObject_${index}`)                      
                                        // dragElement(e.target)
                                        // e = e || window.event;
                                        pos3 = e.pageX;
                                        pos4 = e.pageY;
                                        enableDrag = true
                                    }}
                                    onMouseMove={e=>{
                                        if(enableDrag){
                                            pos1 = pos3 - e.pageX;
                                            pos2 = pos4 - e.pageY;
                                            pos3 = e.pageX;
                                            pos4 = e.pageY;
                                            let x = e.target.getAttribute('x')
                                            let y = e.target.getAttribute('y')
                                            x = parseFloat(x)
                                            y = parseFloat(y)
                                            e.target.setAttribute('x',x - pos1)
                                            e.target.setAttribute('y',y - pos2)
                                        }
                                    }}
                                    onMouseLeave={(e)=>{
                                        enableDrag = false
                                    }}
                                    onMouseUp={(e)=>{
                                        // let temp = document.getElementById(`foreingnObject_${index}`)                      
                                        enableDrag = false
                                        // dragElement(e.target)
                                    }}
                                    onKeyDown={(e)=>{
                                        console.log(e.key)
                                        e.preventDefault()
                                        if(e.ctrlKey==true && e.key=='1'){
                                            console.log('ok')
                                        }
                                    }}
                                    onKeyUp={(e)=>{
                                        console.log(e.key)
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