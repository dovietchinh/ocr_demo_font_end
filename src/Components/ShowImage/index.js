import classNames from 'classnames/bind'
import styles from './ShowImage.module.scss'
import {Col,Button,Row} from 'react-bootstrap'
import pred_icon from '~/assets/images/prev.png'
import next_icon from '~/assets/images/next.png'
import image_4 from '~/assets/images/image_4.png'
import image_5 from '~/assets/images/image_5.png'
import tool_item_1 from '~/assets/images/tool_item_1.png'
import tool_item_2 from '~/assets/images/tool_item_2.png'
import { useState,useRef, useEffect } from 'react'

let cx = classNames.bind(styles)
function ShowImage({uploadSamples,setUploadSamples}){
    const [activeIndex,setActiveIndex] = useState(0)
    const startIndex = useRef(0)
    const [modeDraw,setModeDraw] = useState(false)

    const handleClickNewImg = (e)=>{
        let myinput = document.getElementById("browse-file2")
        myinput.setAttribute("display","none")
        myinput.click()
    }
    const handleClickInput = async (e)=>{
        let files = e.target.files
        let length = files.length
        // let fileReader = new FileReader()
        for(let index=0; index< length;index++){
            let fileReader = new FileReader()
            await fileReader.readAsDataURL(files[index])
            fileReader.onload = async (e)=>{
               await setUploadSamples(e.target.result)
            }
        }
    }
    return (
        <Col  className={cx("container")}>
            <div className={cx("upload-image")}>
                <title className={cx("title")}>
                    <span className={cx("title-1")}>UPLOAD IMAGE</span>
                    <button className={cx("title-2")}>
                        <span className={cx("title-2-span")} onClick={handleClickNewImg}>New image</span>
                    </button>
                    <input type="file" 
                            style={{display:"none"}}
                            multiple
                            accept='.jpg,.jpeg,.png'
                            id="browse-file2"
                            onChange={handleClickInput}
                    ></input>
                    {/* <input type="file" id="browse-file" multiple onChange={async (e)=>{ */}
                </title>
                <div className={cx("document-preview")}>
                    <div className={cx("preview")}><img src={uploadSamples[activeIndex]} id="main-draw"></img></div>
                    <div className={cx("list")}>
                        <button className={cx("btn-nav","btn-pred")} 
                                onClick={()=>{
                                    if(activeIndex > 0 )
                                    {setActiveIndex(activeIndex-1)} 
                                    if(activeIndex == startIndex.current & startIndex.current>0){
                                        
                                        startIndex.current -= 1
                                    }      
                                }}>
                            <img src={pred_icon}></img>
                        </button>
                        {/* <ul> */}
                            {uploadSamples.map((ele,index,array)=>
                            {   
                                if(index > startIndex.current+3){
                                    return
                                }
                                if(index<startIndex.current){
                                    return
                                }
                                let temp = ""
                                if(index==activeIndex){
                                    temp = cx("img--active")
                                }
                                return (
                                    <div key={index} className={cx("default-img")+" "+temp}
                                    onClick={(e)=>{
                                        setActiveIndex(index)
                                        }}>
                                        <img src={ele} ></img>
                                    </div>  
                                )
                            }
                            )}
                        {/* </ul> */}
                        <button className={cx("btn-nav","btn-next")} 
                                onClick={()=>{
                                    if(activeIndex<uploadSamples.length-1)
                                    {setActiveIndex(activeIndex+1)}
                                    if(startIndex.current < uploadSamples.length-4 & activeIndex-startIndex.current>2)
                                    {startIndex.current += 1}
                                }}>
                            <img src={next_icon}></img>
                        </button>
                    </div>
                </div>
                <div className={cx("tool")}>
                    <div className={cx("tool-items")} onClick={(e)=>{
                        setModeDraw(!modeDraw)
                        console.log(modeDraw)
                        let modifyClass = "tool-items--active"
                        if(modeDraw) modifyClass = "tool-items--deactive"
                        e.target.className = cx("tool-items",modifyClass)
                    }}>
                        <img src={tool_item_1}></img>
                    </div>
                    <div className={cx("tool-items")}>
                        <img src={tool_item_2}></img>
                    </div>
                </div>
            </div>
            <Row>
                <Button variant="primary" className={cx("btn-action")}>Training</Button>
            </Row>
        </Col>
    )
}
export default ShowImage