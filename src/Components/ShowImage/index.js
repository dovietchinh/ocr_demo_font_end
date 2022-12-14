import classNames from 'classnames/bind'
import styles from './ShowImage.module.scss'
import {Col,Button,Row} from 'react-bootstrap'
import pred_icon from '~/assets/images/prev.png'
import next_icon from '~/assets/images/next.png'
import image_4 from '~/assets/images/image_4.png'
import image_5 from '~/assets/images/image_5.png'
import tool_item_1 from '~/assets/images/tool_item_1.png'
import tool_item_2 from '~/assets/images/tool_item_2.png'
import { useState,useRef, useEffect, Children } from 'react'
import axios from 'axios'

let cx = classNames.bind(styles)
function ShowImage({uploadSamples,setUploadSamples,modeDraw,setModeDraw,children,setProgressBar,customer_ID}){
    const [activeIndex,setActiveIndex] = useState(0)
    const startIndex = useRef(0)
    // const [modeDraw,setModeDraw] = useState(false)

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
    const handleClickTraining = (e) => {
        let fetchData = async ()=>{
            let fake_json = {
                "QR_code": {
                    "output": false,
                    "field_info": [
                        [
                            "Image",
                            "QR_code",
                            null
                        ]
                    ],
                    "bounding_box": [
                        [
                            547,
                            34,
                            636,
                            124
                        ]
                    ]
                },
                "Portrait": {
                    "output": true,
                    "field_info": [
                        [
                            "Image",
                            "Portrait",
                            null
                        ]
                    ],
                    "bounding_box": [
                        [
                            21,
                            141,
                            186,
                            372
                        ]
                    ]
                },
                "ID": {
                    "output": true,
                    "field_info": [
                        [
                            "Text",
                            "Characters",
                            "X_numbers"
                        ]
                    ],
                    "additional_info": 12,
                    "bounding_box": [
                        [
                            269,
                            175,
                            502,
                            210
                        ]
                    ],
                    "font": [
                        "Times New Roman 1"
                    ],
                    "font_size": [
                        38
                    ],
                    "font_type": [
                        "bold"
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
                },
                "Name": {
                    "output": true,
                    "field_info": [
                        [
                            "Text",
                            "Name",
                            "Vn"
                        ]
                    ],
                    "bounding_box": [
                        [
                            203,
                            231,
                            660,
                            262
                        ]
                    ],
                    "font": [
                        "Times New Roman 1"
                    ],
                    "font_size": [
                        30
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
                        "upper"
                    ]
                },
                "Dob": {
                    "output": true,
                    "field_info": [
                        [
                            "Text",
                            "Time",
                            "Full_slash"
                        ]
                    ],
                    "bounding_box": [
                        [
                            397,
                            265,
                            507,
                            287
                        ]
                    ],
                    "font": [
                        "Times New Roman 1"
                    ],
                    "font_size": [
                        27
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
                },
                "Sex": {
                    "output": true,
                    "field_info": [
                        [
                            "Text",
                            "Sex",
                            "Vn"
                        ]
                    ],
                    "bounding_box": [
                        [
                            315,
                            281,
                            375,
                            308
                        ]
                    ],
                    "font": [
                        "Times New Roman 1"
                    ],
                    "font_size": [
                        27
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
                },
                "Nat": {
                    "output": true,
                    "field_info": [
                        [
                            "Text",
                            "Place",
                            "Nationality"
                        ]
                    ],
                    "bounding_box": [
                        [
                            546,
                            281,
                            660,
                            308
                        ]
                    ],
                    "font": [
                        "Times New Roman 1"
                    ],
                    "font_size": [
                        27
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
                },
                "Hometown": {
                    "output": true,
                    "field_info": [
                        [
                            "Text",
                            "Place",
                            "Brief"
                        ]
                    ],
                    "bounding_box": [
                        [
                            397,
                            317,
                            660,
                            341
                        ],
                        [
                            203,
                            338,
                            660,
                            363
                        ]
                    ],
                    "font": [
                        "Times New Roman 1"
                    ],
                    "font_size": [
                        27
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
                },
                "Doe": {
                    "output": true,
                    "field_info": [
                        [
                            "Text",
                            "Time",
                            "Full_slash"
                        ],
                        [
                            "Text",
                            "Time",
                            "Special"
                        ]
                    ],
                    "bounding_box": [
                        [
                            110,
                            377,
                            194,
                            394
                        ],
                        [
                            50,
                            403,
                            194,
                            421
                        ]
                    ],
                    "font": [
                        "Times New Roman 1"
                    ],
                    "font_size": [
                        22
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
                },
                "Address": {
                    "output": true,
                    "field_info": [
                        [
                            "Text",
                            "Place",
                            "Full"
                        ]
                    ],
                    "bounding_box": [
                        [
                            461,
                            364,
                            660,
                            389
                        ],
                        [
                            203,
                            386,
                            660,
                            410
                        ]
                    ],
                    "font": [
                        "Times New Roman 1"
                    ],
                    "font_size": [
                        27
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
            let fake_data = {
                "customer_ID": customer_ID,
                "is_blank_template":false,
                "image_features": fake_json,
                "image_info": uploadSamples
            }
            console.log('adress: ',`${process.env.REACT_APP_BACKEND_TRAINING}/train`)
            // await axios.post(`${process.env.REACT_APP_BACKEND_TRAINING}/train`,fake_data)
            // await axios.post("http://10.124.69.43:9001/clear",{customer_ID:"*"})
            await axios.post("http://10.124.69.43:9001/train",fake_data)
                .then((res)=>{
                    console.log('start_training: ',res.data)
                    setProgressBar(true)
                })
                .catch((error)=>{
                    console.log('error_training: ',error)
                })
            }
        fetchData()
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
                <Button variant="primary" className={cx("btn-action")} onClick={handleClickTraining}>Training</Button>
            </Row>
        </Col>
    )
}
export default ShowImage