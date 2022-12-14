import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { SideBarShowResultConnect,MainShowResultConnect } from '~/connect'
import styles from './ShowResult.module.scss'
let cx = classNames.bind(styles)
function SideBarShowResult({uploadTestImages,actionUploadTestImg,activeImage,actionSetActiveImage,actionSetResultImages}){
    
    const handleClick = (e)=>{

        let myinput = document.getElementById("browse-file-show-test")
        myinput.setAttribute("display","none")
        myinput.click()
    }
    useEffect( ()=>{
        const fetchData = async () => {
            
            const response = await axios.
                                get(`${process.env.REACT_APP_BACKEND}/api/v1/test_img`)
                                .then((r)=>{
                                    
                                    let data = r.data.data
                                    data = data.map((x)=>{return "data:image/png;base64,"+x})
                                    actionSetResultImages(data)
                                })
                                .catch((e)=>{
                                    console.log(e)
                                })
        }
        
        fetchData()
    },[uploadTestImages])
    return (
        <div className={cx("sidebar-content")}>
            <div className={cx("sidebar__title")}>
                <span className={cx("sidebar__title-upload")}>UPLOAD IMAGE</span>
                <div className={cx("sidebar__title-new")} onClick={handleClick}>
                    <span >New image</span>
                </div>
                <input type="file" 
                        id="browse-file-show-test" 
                        multiple 
                        accept=".jpg,.jpeg,.png"
                        style={{display:"none"}}
                        onChange={(e)=>{
                            let files = e.target.files
                            for(let index = 0 ; index < files.length;index++){
                                let fileReader = new FileReader()
                                fileReader.readAsDataURL(files[index])
                                fileReader.onload = (e) => {
                                    actionUploadTestImg(e.target.result)
                                }
        
                                }
                        }}>

                </input>
            </div>
            <div className={cx("sidebar__image-list")}>
                {
                    uploadTestImages.map((ele,index)=>{
                        let cls = ""
                        if(index==activeImage){
                            cls = "thumbnail--active"
                        }
                        return(
                            <div key={index} 
                                onClick={(e)=>{
                                    actionSetActiveImage(index)
                                }}
                                className={cx("sidebar__default-thumbnail",cls)}
                                > 
                                <img src={ele}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
function MainShowResult({activeImage,resultImages,viewIndex,actionSetViewIndex}){
    let check = useRef(false)
    const [imageViews,setImageView] = useState([])
    // console.log('resultImages:',resultImages)
    // console.log('activeImage:', activeImage)
    // console.log('resultImages[activeImage]: ',typeof(resultImages[activeImage]))
    useEffect(()=>{
        
        if(resultImages[activeImage]==null & typeof(resultImages[activeImage])=='undefined'){
            check.current = false
            setImageView([])
        }
        else{
            check.current = true
            setImageView(resultImages[activeImage])
        }
    },[activeImage,resultImages])
    // const draw = ()=>{
    //     if(check.current)
    //     {   
            
    //         resultImages[activeImage].map((ele,index)=>{
    //             let cls = ""
    //             if(viewIndex)
    //             {
    //                 if(index==viewIndex){
    //                     cls = "image-view--action"
    //             }}
    //             return (
    //                 <div key={index} className={cx("image-view",cls)}
    //                     onClick={(e)=>{
    //                         actionSetViewIndex(index)
    //                     }}
    //                     >
    //                     <img src={ele} style={{
    //                         width:"100%",
    //                         height:"100%",
    //                         objectFit: "contain"
    //                         }}></img>
    //                 </div>
    //             )
    //         })
    //     }
        
    // }
    return (
        <div className={cx("main-section")}>
            <div className={cx("main__title")}>
                <span>PREVIEW</span>
            </div>
            <div className={cx("main__container")}>
                <div className={cx("display")}>
                {
                    imageViews.map((ele,index)=>{
                        let cls = ""
                        if(viewIndex)
                        {
                            if(index==viewIndex){
                                cls = "image-view--action"
                        }}
                        return (
                            <div key={index} className={cx("image-view",cls)}
                                onClick={(e)=>{
                                    actionSetViewIndex(index)
                                }}
                                >
                                <img src={ele} style={{
                                    width:"100%",
                                    height:"100%",
                                    objectFit: "contain"
                                    }}></img>
                            </div>
                        )
                    })
                }
                {/* {draw()} */}
                </div>
            </div>
        </div>
    )

}
function ShowResult(){
    return (
        <div className={cx("container-fluid")}>
            <div className={cx("main")}>
                <MainShowResultConnect></MainShowResultConnect>
            </div>
            <div className={cx("sidebar")}>
                <SideBarShowResultConnect/>
            </div>
        </div>

    )

}
export {SideBarShowResult,MainShowResult}
export default ShowResult