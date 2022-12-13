import classNames from 'classnames/bind'
import { useEffect, useRef } from 'react'
import { SideBarShowResultConnect,MainShowResultConnect } from '~/connect'
import styles from './ShowResult.module.scss'
let cx = classNames.bind(styles)
function SideBarShowResult({uploadTestImages,activeImage,actionSetActiveImage,actionUploadTestImg}){
    const handleClick = (e)=>{

        let myinput = document.getElementById("browse-file-show-test")
        myinput.setAttribute("display","none")
        myinput.click()
    
    }
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
                        onChange={async (e)=>{
                        let files = e.target.files
                        for(let index = 0 ; index < files.length;index++){
                            let fileReader = new FileReader()
                            fileReader.readAsDataURL(files[index])
                            fileReader.onload = (e) => {
                                actionUploadTestImg(e.target.result)
                            }
      
                        }
                    }}></input>
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
    useEffect(()=>{
        
        if(resultImages[activeImage]==null){
            check.current = false
        }
        else{
            check.current = true
        }
    },[activeImage])
    return (
        <div className={cx("main-section")}>
            <div className={cx("main__title")}>
                <span>PREVIEW</span>
            </div>
            <div className={cx("main__container")}>
                <div className={cx("display")}>
                {
                    check.current && resultImages[activeImage].map((ele,index)=>{
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