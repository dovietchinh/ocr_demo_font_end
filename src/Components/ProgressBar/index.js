import classNames from 'classnames/bind'
import styles from './ProgressBar.module.scss'
import { Container, Button } from "react-bootstrap";
import circle_1 from '~/assets/images/Ellipse1.svg'
import circle_2 from '~/assets/images/Ellipse2.svg'
import { useEffect, useMemo } from 'react';
let cx = classNames.bind(styles)
function ProgressCircle({from_percentage,percentage,children,cls}){
    const calCSSVariable = useEffect(()=>{
        let r = document.querySelector(':root');
        let right_stop,right_start,left_stop,left_start;
        if(percentage < 0.5){
            right_stop = parseInt(percentage*360) + "deg"
            left_stop = "0deg"
        }
        else{
            right_stop = "180deg"
            left_stop = parseInt(percentage*360-180) + "deg"
        }

        if(from_percentage < 0.5){
            right_start = parseInt(from_percentage*360) + "deg"
            left_start = "0deg"
        }
        else{
            right_start = "180deg"
            left_start = parseInt(from_percentage*360-180) + "deg"
        }

        if(cls==cx("progress-circle--1"))
        {   
            
            r.style.setProperty("--value_start_left_1",left_start)
            r.style.setProperty("--value_stop_left_1",left_stop)
            r.style.setProperty("--value_start_right_1",right_start)
            r.style.setProperty("--value_stop_right_1",right_stop)
        }
        else
        {
            
            r.style.setProperty("--value_start_left_2",left_start)
            r.style.setProperty("--value_stop_left_2",left_stop)
            r.style.setProperty("--value_start_right_2",right_start)
            r.style.setProperty("--value_stop_right_2",right_stop)
        }
    },[from_percentage,percentage])
    
    return (
        <div className={cx("progress-circle",cls)}>
            <div className={cx("progress","blue")}>
                <span className={cx("progress-left")}>
                    <span className={cx("progress-bar")}></span>
                </span>
                <span className={cx("progress-right")}>
                    <span className={cx("progress-bar")}></span>
                </span>
            </div>
            <div className={cx("title")}>{children}</div>
            <div className={cx("percent-text")}>{String(percentage*100)+"%"}</div>
        </div>
    )
}
function ProgressBar(){
    return (
        <Container >
            <div className={cx("container")}>
                <div className={cx("progress-group")}>
                    <ProgressCircle from_percentage={0.2} percentage={0.7} cls={cx("progress-circle--1")}>Initializing</ProgressCircle>
                    <ProgressCircle from_percentage={0.1} percentage={0.4}  cls={cx("progress-circle--2")}>Training</ProgressCircle>
                </div>
                <div className={cx("actions")}>
                    <Button variant='secondary'>Cancel</Button>
                    <Button variant="primary">Start test</Button>
                </div>
            </div>
        </Container>
    )   
}

export default ProgressBar