import classNames from 'classnames/bind'
import styles from './Loading.module.scss'
import loading_image from '~/assets/images/loading.png'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import mode,{switchMode1} from '~/myredux/mode'
import store from '~/myredux'
let cx = classNames.bind(styles)

function Loading({}){
    let loadingMode = useSelector(state=>state.mode.loadingMode)
    let dispatch = useDispatch()
    
    // const handleClickBlur = (e)=>{
        
    // }
    return(
        loadingMode && <div className={cx("mycontainer")}>
            <div className={cx("content")}>
                <div className={"spinner-border text-primary " + cx("loading")} role="status">
                    <span className="sr-only"></span>
                </div>
                <span className="sr-only">model is being converted </span>
                <span className="sr-only">please wait ...</span>
            </div>
        </div>
    )
}
// const mapLoadingProp2State = (state) =>{
//     return {
//         'loadingMode':state.mode.loadingMode
//     }
// }
// const mapLoadingProp2Action = {
//     'setLoadingMode': mode.actions.actionSetLoadingMode
// }
export default Loading