import classNames from 'classnames/bind'
import styles from './ProgressBar.module.scss'
import { Container, Button } from "react-bootstrap";
import circle_1 from '~/assets/images/Ellipse1.svg'
import circle_2 from '~/assets/images/Ellipse2.svg'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
let cx = classNames.bind(styles)
function ProgressCircle({from_percentage,percentage,children,cls}){
    useEffect(()=>{
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
            <div className={cx("percent-text")}>{String(percentage*100).slice(0,5)+"%"}</div>
        </div>
    )
}
function ProgressBar({switchMode,currentPercent,actionSetCurrentPercent,customer_ID}){
    const handleClick = (e)=>{
        switchMode("testing")
        
        let convertAPI = async ()=>{
            console.log('start Convert!')
            await axios.post('http://10.124.69.195:18002/convert',{customer_ID})
                .then((r)=>{
                    console.log('convert done')
                    console.log(r.data)
                })
                .catch((error)=>{
                    console.log('error convert: ',error)
                })
            await axios.post('http://10.124.69.195:18002/reload_models',{customer_ID})
                .then((r)=>{
                    console.log('reload models done!')
                })
                .catch((error)=>{
                    console.log('error reload: ',error)
                })

        }
        convertAPI();
     
    }
    const handleClickCancel = (e)=>{
        let fetchAPI = async ()=>{
            await axios.post("http://10.124.69.195:18002/reload_models",{customer_ID:String(customer_ID)})
                .then((res)=>{
                    console.log(res.data)
                })
                .catch((error)=>{
                    console.log('error at: ',error)
                })
        }
        
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            await axios.post("http://10.124.69.195:18001/progress",{customer_ID:String(customer_ID)})
            // await axios.get(`${process.env.REACT_APP_BACKEND_TRAINING}/progress`)
            
                .then((res)=>{
                    
                    let a = {
                        'data': {
                            'generation_progress': 
                                {
                                    'Card_Detection': 0.0, 
                                    'Corner_Detection': 0.0, 
                                    'Field_Detection': 0.015
                                }, 
                            'train_progress': 
                                {
                                    'Card_Detection': 0.0, 
                                    'Corner_Detection': 0.0, 
                                    'Field_Detection': 0.0
                                }
                        },
                        'message': 'processing', 'status': true
                    }
                    // console.log(res.data)
                    let gen_ = res.data.data.generation_progress.Card_Detection
                             + res.data.data.generation_progress.Corner_Detection
                             + res.data.data.generation_progress.Field_Detection
                    gen_ = gen_/3
                    let train_ = res.data.data.train_progress.Card_Detection
                             + res.data.data.train_progress.Corner_Detection
                             + res.data.data.train_progress.Field_Detection
                    train_ = train_/3
                    actionSetCurrentPercent({
                        'genPercent': gen_.toFixed(4),
                        'trainingPercent': train_.toFixed(4)
                    })
                })
                .catch((error)=>{
                    console.log('error at fetch progress!: ',error)
                })
        } 
        const interval = setInterval(()=>{fetchData()},3000)
        console.log('fetch')
        return ()=>clearInterval(interval)
    },[])

    console.log('currentPercent:' ,currentPercent)
    console.log('currentPercent.genPercent: ',currentPercent.genPercent)
    console.log('currentPercent.trainingPercent: ',currentPercent.trainingPercent)
    return (
        <Container >
            <div className={cx("container")}>
                <div className={cx("progress-group")}>
                    <ProgressCircle from_percentage={0} percentage={currentPercent.genPercent} cls={cx("progress-circle--1")}>Initializing</ProgressCircle>
                    <ProgressCircle from_percentage={currentPercent.trainingPercent} percentage={currentPercent.trainingPercent}  cls={cx("progress-circle--2")}>Training</ProgressCircle>
                </div>
                <div className={cx("actions")}>
                    <Button variant='secondary' onClick={handleClickCancel}>Cancel</Button>
                    <Link to="/Testing"><Button variant="primary" onClick={handleClick}>Start test</Button></Link>
                </div>
            </div>
        </Container>
    )   
}

export default ProgressBar