import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SideBarShowResultConnect,MainShowResultConnect } from '~/connect'
import styles from './ShowResult.module.scss'
import mode from '~/myredux/mode'
import store from '~/myredux'
import { asyncActionInfer } from '~/myredux/testing'
import next_img from '~/assets/images/next.png'
import prev_img from '~/assets/images/prev.png'
let cx = classNames.bind(styles)
function SideBarSelectModel(){
    let models = useSelector(state=>state.mode.models)
    
    let selectedModel = useSelector(state=>state.mode.selectedModel)
    let customer_ID = useSelector(state=>state.mode.customer_ID)
    let currentTrainingModel = useSelector(state=>state.training.currentTrainingModel)
    let trainingFlag = useSelector(state=>state.training.trainingFlag)
    
    
    const dispatch = useDispatch ()

    useEffect(()=>{
        let fetchData = async()=>{
            await axios.post('http://10.124.64.125:18001/api/v1/get_models_user',{customer_ID})
                .then((r)=>{
                    dispatch(mode.actions.actionSetModels(r.data.listModels))
                })
                .catch(console.log('error in get models user'))
        }
        fetchData()
    },[])
    return (
        <div className={cx("select")}>
            <small className={cx('label')}>SELECT MODEL</small>
            <div className={cx("select__field")}>
                <select className={cx("select__input")} 
                        defaultValue={selectedModel}
                        onChange={(e)=>{
                            dispatch(mode.actions.actionSetSelectedModel(e.target.value))
                        }}>
                    {/* <option value="audi">Audi</option> */}
                    {
                        models.map((ele,index)=>{
                            let select = ""
                            if(ele==selectedModel) select="selected"
                            let text_display = ele.replaceAll("_"," ").replace(customer_ID,"")
                            let disabled = false
                            if(ele==currentTrainingModel & trainingFlag==true) {
                                text_display += "     (training...)"
                                disabled = true
                            }
                            return(
                                <option key={index}  disabled={disabled} value={ele}>{text_display}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}
function SideBarShowResult({uploadTestImages,activeImage,actionSetActiveImage,actionDeleteTestImages}){
    
    const handleClick = (e)=>{
        let myinput = document.getElementById("browse-file-show-test")
        myinput.setAttribute("display","none")
        myinput.click()
    }
    let refSideBar = useRef()
    useEffect(()=>{
        let offsetHeight= refSideBar.current.offsetHeight
        let scrollHeight = refSideBar.current.scrollHeight
        let firstOffSet = refSideBar.current.firstElementChild.offsetTop
        let x  = document.querySelector('.'+cx('thumbnail--active')).offsetTop -firstOffSet 
        let temp = Math.min(x - offsetHeight/2,scrollHeight-offsetHeight)
        refSideBar.current.scrollTop = temp
    },[activeImage])
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
                                    // actionUploadTestImg(e.target.result)
                                    store.dispatch(asyncActionInfer(e.target.result))
                                    
                                }
                                
                            }
                            e.target.value = ''
                        }}>

                </input>
            </div>
            <div className={cx("sidebar__image-list")}
                ref={refSideBar}
                >
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
                                onKeyDown={(e)=>{
                                    if(e.key=='Delete'){
                                        actionDeleteTestImages(activeImage)
                                    }
                                }}
                                tabIndex="-1"
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
function MainShowResult({activeImage,resultImages,resultFeatures,viewIndex,actionSetViewIndex,
    actionAddViewIndex,actionSubViewIndex}){
    // let check = useRef(false)
    const [imageViews,setImageView] = useState({
        'images':[],
        'features':[],
    })
    
    
    useEffect(()=>{
        if(resultImages[activeImage]==null){
            // check.current = false

            setImageView({
                'images': [],
                'features': []
            })
            
        }
        else{
            // check.current = true
            setImageView({
                'images':resultImages[activeImage],
                'features':resultFeatures[activeImage]
            })
            
        }
        actionSetViewIndex(0)
        
    },[activeImage,resultImages])
    
    useEffect(()=>{
        const myEvent = (e)=>{
            console.log('viewIndex: ',viewIndex)
            console.log(e.key)
            console.log(viewIndex)
            if(e.key=='ArrowRight'){
                // if(viewIndex < (imageViews.images.length - 1))
                // {
                actionAddViewIndex(1)
                // }
            }
            if(e.key=='ArrowLeft'){
                actionSubViewIndex(1)
            }
        }
        document.addEventListener('keydown',myEvent)
        return ()=>{document.removeEventListener('keydown',myEvent)}
    },[])
    const Draw = ()=>{
        let result = []
        
        if(imageViews.features[viewIndex]==null) {
            
            return false
        }
        for (const [key, value] of Object.entries(imageViews.features[viewIndex])) {
            
            let x = (
                <div key={"info__group_"+key} className={cx("info__group")}>
                    <span className={cx("info__group__label")}>{key}</span>
                    <span className={cx("info__group__text")}>{value.text}</span>
                </div>)
            result.push(x)
        }
        return result
    }
    return (
        <div className={cx("main-section")}>
            <div className={cx("main__title")}>
                <span>PREVIEW</span>
            </div>
            {/* <div className={cx("main__container")}>
                <div className={cx("display")}>
                {
                    imageViews.map((ele,index)=>{
                        let cls = ""
                        if(viewIndex!='null')
                        {   
                            if(index==viewIndex){
                                cls = "image-view--action"
                        }}
                        return (
                            <div key={index} className={cx("image-view",cls)}
                                onClick={(e)=>{
                                    console.log(index)
                                    console.log(viewIndex)
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
            </div> */}
            <div className={cx("slide_main")}>
                <div className={cx("slide__btn","slide__btn--prev")}>
                    <img src={prev_img}></img>
                </div>
                <div className={cx("slide__center")}>
                    <div className={cx("slide__content")}>
                        <div className={cx("slide__content__preview")}>
                            <img src={imageViews.images[viewIndex]}
                                atl="no cards foundedaa"
                                // onChange={(e)=>{
                                //     console.log(e.target.src)
                                //     if(typeof(e.target.src)=='undefined'){
                                //         e.target.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6P5ilXnB8MBK1a2oH69J6QirU1T-qa862RA&usqp=CAU'
                                //     }
                                // }}
                            ></img>   
                        </div>
                        <div className={cx("slide__content__info")}>
                        {   
                            // console.log('asd');
                            Draw()
                            // Object.entries(imageViews.features[viewIndex]).map((ele,index)=>{

                            //     return(
                            //         <div key={"info__group_"+index} className={cx("info__group")}>
                            //             <span className={cx("info__group__label")}>{ele[0]}</span>
                            //             <span className={cx("info__group__text")}>{ele[1].text[0]}</span>
                            //         </div>
                            //     )
                            // })
                            
                        }
                            
                        </div>
                    </div>
                    <div className={cx("carouse__list")}>
                        {
                            imageViews.images.map((ele,index)=>{
                                let cls=""
                                if(index==viewIndex) cls="carouse__thumbnail--active"
                                return(
                                    <div key={"carouse_thumbnail_"+index} 
                                        className={cx("carouse__thumbnail",cls)}
                                        onClick={(e)=>{actionSetViewIndex(index)}}
                                        >
                                        <img src={ele}></img>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={cx("slide__btn","slide__btn--next")}>
                    <img src={next_img}></img>
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
                <SideBarSelectModel/>
                <SideBarShowResultConnect/>
            </div>
        </div>

    )

}
export {SideBarShowResult,MainShowResult}
export default ShowResult