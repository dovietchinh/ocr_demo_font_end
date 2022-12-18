import classNames from 'classnames/bind'
import styles from './Loading.module.scss'
import loading_image from '~/assets/images/loading.png'
import { Container } from 'react-bootstrap'
let cx = classNames.bind(styles)
function Loading({loadingMode,setLoadingMode}){
    const handleClickBlur = (e)=>{
        setLoadingMode(false)
    }
    return(
        loadingMode && <div className={cx("mycontainer")} onClick={handleClickBlur}>
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
export default Loading