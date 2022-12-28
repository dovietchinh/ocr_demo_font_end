import classNames from 'classnames/bind'
import styles from './ShowImage.module.scss'
import {Col,Button,Row} from 'react-bootstrap'
import pred_icon from '~/assets/images/prev.png'
import next_icon from '~/assets/images/next.png'
// import image_4 from '~/assets/images/image_4.png'
import trash from '~/assets/images/trash.svg'
import tool_item_1 from '~/assets/images/tool_item_1.png'
import tool_item_2 from '~/assets/images/tool_item_2.png'
import plus_icon from '~/assets/images/plus.png'
import setting_icon from '~/assets/images/setting.png'
import { useState,useRef, useEffect, Children } from 'react'
import axios from 'axios'





const COLOR = ["#FF177B","#6E58FA","#43D2E0",
                "#30B82D","#E958D0",
                '#FF4500',"#9932CC","#FF8C00",
                "#40E0D0","#F4A460",
                "#32CD32","#708090","#7FFFD4",
                "#FFFF00","#9ACD32","#EE82EE",
                "#D2B48C"]




let cx = classNames.bind(styles)
function ShowImage({uploadSamples,setUploadSamples,modeDraw,
                    setModeDraw,children,setProgressBar,
                    customer_ID,stateDraw,actionSetLoadingMode,
                    actionSetCurrentTrainingModel,actionSetToastMode,
                    actionRemoveUploadSample,
                    activeIndex,setActiveIndex,
                    listLabels,setListLabels,
                    actionSetCreateLabelMode}){
    // const [listLabels,setListLabels] = useState(["asdasd",'asdkgasdssssss asdhaklsh askhdklashdaslhd asdhlaskhdlh'])
    // const [activeIndex,setActiveIndex] = useState(0)
    const startIndex = useRef(0)
    const [text,setText] = useState("")
    const [showModal,setShowModal] = useState("none")

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
            fileReader.readAsDataURL(files[index])
            fileReader.onload = async (e)=>{
               await setUploadSamples(e.target.result)
            }
        }
    }
    const handleClickTraining = (e) => {
        actionSetCurrentTrainingModel(customer_ID+"_"+text)
        let fetchData = async ()=>{
            // actionSetLoadingMode(true)
            let fake_json1 = {}
            if(stateDraw[activeIndex].listRect.length!=0){
                for(let i=0;i<stateDraw[activeIndex].listRect.length;i++){
                    fake_json1[stateDraw[activeIndex].listLabel[i]] = {
                        "output":true,
                        "field_info":[
                            [
                            "Text",
                            "Name",
                            "Vn",
                        ]
                        ],
                        "bounding_box":[],
                        "font": [
                            "Times New Roman 1"
                        ],
                        "font_size": [
                            "default"
                        ],
                        "font_type": [
                            "regular"
                        ],
                        "font_color": [
                            [
                                0,
                                0,
                                0
                            ]
                        ],
                        "font_align": [
                            "left"
                        ],
                        "font_capitalize": [
                            "default"
                        ]
                        
                    }
                }
                

                
                for(let i=0;i<stateDraw[activeIndex].listRect.length;i++){
                    let bbox = stateDraw[activeIndex].listRect[i]

                    
                    let xtl = Math.min(bbox[0][0],bbox[1][0])
                    let ytl = Math.min(bbox[0][1],bbox[1][1])
                    let xbr = Math.max(bbox[0][0],bbox[1][0])
                    let ybr = Math.max(bbox[0][1],bbox[1][1])
                    xtl = parseInt(xtl)
                    ytl = parseInt(ytl)
                    xbr = parseInt(xbr)
                    ybr = parseInt(ybr)
                    let new_bbox = [xtl,ytl,xbr,ybr]
                    // new_bbox = [547,
                    //     34,
                    //     636,
                    //     124]
                    fake_json1[stateDraw[activeIndex].listLabel[i]].bounding_box.push(new_bbox)
                }
                }
            let fake_json2 = {"QR_code":{"output":false,"field_info":[["Image","QR_code",null]],"bounding_box":[[660,30,760,130]]},"Portrait":{"output":true,"field_info":[["Image","Portrait",null]],"bounding_box":[[20,165,220,440]]},"ID":{"output":true,"field_info":[["Text","Characters","X_numbers"]],"additional_info":12,"bounding_box":[[330,205,600,240]],"font":["Times New Roman 1"],"font_size":[38],"font_type":["bold"],"font_color":[[0,0,0]],"font_align":["left"],"font_capitalize":["default"]},"Name":{"output":true,"field_info":[["Text","Name","Vn"]],"bounding_box":[[240,270,780,305]],"font":["Times New Roman 1"],"font_size":[30],"font_type":["regular"],"font_color":[[0,0,0]],"font_align":["left"],"font_capitalize":["upper"]},"Dob":{"output":true,"field_info":[["Text","Time","Full_slash"]],"bounding_box":[[470,310,600,335]],"font":["Times New Roman 1"],"font_size":[27],"font_type":["regular"],"font_color":[[0,0,0]],"font_align":["left"],"font_capitalize":["default"]},"Sex":{"output":true,"field_info":[["Text","Sex","Vn"]],"bounding_box":[[385,340,420,365]],"font":["Times New Roman 1"],"font_size":[27],"font_type":["regular"],"font_color":[[0,0,0]],"font_align":["left"],"font_capitalize":["default"]},"Nat":{"output":true,"field_info":[["Text","Place","Nationality"]],"bounding_box":[[670,340,780,365]],"font":["Times New Roman 1"],"font_size":[27],"font_type":["regular"],"font_color":[[0,0,0]],"font_align":["left"],"font_capitalize":["default"]},"Hometown":{"output":true,"field_info":[["Text","Place","Brief"]],"bounding_box":[[470,370,780,395],[240,395,780,420]],"font":["Times New Roman 1"],"font_size":[27],"font_type":["regular"],"font_color":[[0,0,0]],"font_align":["left"],"font_capitalize":["default"]},"Doe":{"output":true,"field_info":[["Text","Time","Full_slash"],["Text","Time","Special"]],"bounding_box":[[130,440,230,460],[60,465,230,485]],"font":["Times New Roman 1"],"font_size":[22],"font_type":["regular"],"font_color":[[0,0,0]],"font_align":["left"],"font_capitalize":["default"]},"Address":{"output":true,"field_info":[["Text","Place","Full"]],"bounding_box":[[560,425,780,450],[240,450,780,475]],"font":["Times New Roman 1"],"font_size":[27],"font_type":["regular"],"font_color":[[0,0,0]],"font_align":["left"],"font_capitalize":["default"]}}
                

            let fake_json,is_blank_template
            if(stateDraw[activeIndex].listRect.length==0){
                fake_json = fake_json2
                is_blank_template = true
            }
            else{
                fake_json = fake_json1
                is_blank_template = false
            }
            let fake_data = {
                "customer_ID": customer_ID+"_"+text,
                // "is_blank_template":is_blank_template,
                "is_blank_template":false,
                "image_features": fake_json,
                "image_info": uploadSamples, 
            }
            
            
            await axios.post("http://10.124.64.125:18001/api/v1/train",fake_data)
                .then((res)=>{
                    if(res.data.status==false){
                        actionSetToastMode({toastText:res.data.message, toastMode:true})
                    }
                    setProgressBar(true)
                })
                .catch((error)=>{
                    console.log('error_training: ',error)
                })
            // actionSetLoadingMode(false)
            }
        
        fetchData()
        
    }
    return (
        <>
        <div className={cx("Modal")} style={{display:showModal}}>
            <div className={cx("Modal__content")}>
                <div className={cx("Modal__title")}><span>Model Name</span></div>
                <div className={cx("Modal__body")}>
                    <input type='text'
                            value={text}
                            onChange={e=>setText(e.target.value)}
                            placeholder="what is your model name?"
                    ></input>
                </div>
                <div className={cx("Modal__footer")}>
                    <Button variant='secondary' onClick={e=>setShowModal("none")}>Close</Button>
                    <Button variant='primary' onClick={handleClickTraining}>Next</Button>
                </div>
            </div>
        </div>
        
        <div className={cx("temp")}>
        <div  className={cx("container")}>
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
                    <div className={cx("preview")}>
                        <img src={uploadSamples[activeIndex]} id="main-draw"></img>
                        {children}
                    </div>
                    <div className={cx("list")}>
                        <button className={cx("btn-nav","btn-pred")} 
                                onClick={()=>{
                                    if(activeIndex > 0 )
                                    {setActiveIndex(activeIndex-1)} 

                                    if(activeIndex == startIndex.current & startIndex.current>0){    
                                        startIndex.current -= 1
                                    }      
                                }}
                                >
                            <img src={pred_icon}></img>
                        </button>
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
                                        }}
                                        onKeyDown={(e)=>{
                                            if(e.key=='Delete')
                                            {   
                                                if(index==uploadSamples.length-1){setActiveIndex(index-1)}
                                                actionRemoveUploadSample(index)
                                            }
                                        }}
                                        tabIndex={0}
                                        >
                                        <img src={ele} ></img>
                                    </div>  
                                )
                            }
                            )}
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
                        let modifyClass = "tool-items--active"
                        if(modeDraw) modifyClass = "tool-items--deactive"
                        e.target.className = cx("tool-items",modifyClass)
                    }}>
                        <img src={tool_item_1}></img>
                    </div>
                    {/* <div className={cx("tool-items")}>
                        <img src={tool_item_2}></img>
                    </div> */}
                    <div className={cx("tool-items")} onClick={(e)=>{
                        if(activeIndex==uploadSamples.length-1){setActiveIndex(activeIndex-1)}
                        actionRemoveUploadSample(activeIndex)
                    }}>
                        <img src={trash} ></img>
                    </div>
                </div>
            </div>
            <div>
                <Button variant="primary" className={cx("btn-action")} onClick={e=>setShowModal("")}>Training</Button>
            </div>
            
            
        </div>
        <div className={cx("sidebar")}>
            <div className={cx("sidebar__content")}>
                <div className={cx("sidebar__title")}>
                    <span className={cx("sidebar__title__span")}>LABELS</span>
                    <div className={cx("sidebar__title__plus")} 
                        onClick={(e)=>{
                            // setListLabels(prev=>[...prev,''])
                            actionSetCreateLabelMode(true)
                            
                        }}>
                        <img src={plus_icon}/>
                    </div>
                </div>
                <div className={cx("sidebar__labels")}>
                    {   
                        
                        (listLabels || []).map((ele,index)=>{
                            return(
                                <div className={cx("sidebar__labels__items")}
                                key={"sidebar__labels__items_"+index}
                                onMouseOver={(e)=>{
                                    let x = e.target.querySelector("div")
                                    if(x!=null){x.style.display="block"}
                                }}
                                onMouseLeave={(e)=>{
                                    let x = e.target.querySelector("div")
                                    if(x!=null){x.style.display="none"}
                                }}
                                style={{backgroundColor:COLOR[index]}}
                                >   
                                    <div className={cx("delete")} onClick={(e)=>{
                                        setListLabels((prev)=>{
                                            let new_list = [...prev]
                                            new_list.splice(index,1)
                                            return new_list
                                        })
                                    }}>
                                        <img src={trash}></img>
                                    </div>
                                    <span className={cx("sidebar__labels__items__number")}>{index+1}</span>
                                    <input className={cx("sidebar__labels__items__text")}
                                            value={ele}
                                            onChange={(e)=>{
                                                setListLabels(prev=>{
                                                    let a = [...prev]
                                                    a[index] = e.target.value
                                                    return a
                                                })
                                            }}
                                            placeholder='new labels'
                                            ></input>
                                    <div className={cx("sidebar__labels__items__circle")} 
                                        onClick={(e)=>{
                                            // setListLabels(prev=>[...prev,''])
                                            actionSetCreateLabelMode(true)
                                        }}>
                                        <img src={plus_icon}/>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </div>
        </>
    )
}


export default ShowImage