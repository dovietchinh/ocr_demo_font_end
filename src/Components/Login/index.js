import axios from 'axios'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import styles from './Login.module.scss'
import mode,{login} from '~/myredux/mode'

let cx = classNames.bind(styles)
function Login(){
    const [user,setUser] = useState("")
    const [pass,setPass] = useState("")
    const [message,setMessage] = useState("")
    let dispatch = useDispatch()
    const handleClick = (e)=>{
        let login_submit = async () =>{
            let res = await axios.post('http://10.124.69.195:9000/api/v1/login',{user,pass})
                .then((r)=>{
                    console.log(r.data.message)
                    if(r.data.status){
                        setMessage(r.data.message)
                        dispatch(mode.actions.actionSetModeLoginSuccess(true))
                        dispatch(mode.actions.actionSetCustomerID(user))
                    }
                    
                    else{
                        setMessage(r.data.message)
                    }
                    
                })
                .then({})
                .catch((error)=>{
                    if(typeof(error)=='string') return {message:error}

                    return{message:'server error'}
                })
                
            setMessage(res.message)
            
        }
        login_submit()
    }
    return(
        <div className={cx("container")}>
            <form className={cx("container__inner")}>
                <title className={cx("title")}><span>Log in</span></title>
                <div className={cx("fields")}>
                    <div className={cx("fields__content")}>
                        <label className={cx("fields__label")}>Username</label>
                        <input  className={cx("fields__input")}
                                type='text' 
                                placeholder='Enter your username'
                                value={user}
                                onChange={(e)=>setUser(e.target.value)}
                                ></input>
                        {/* <span>invalid user</span> */}
                    </div>
                    <div className={cx("fields__content")}>
                        <label className={cx("fields__label")}>Password</label>
                        <input className={cx("fields__input")}
                                type='password' 
                                placeholder='Enter your password'
                                value={pass}
                                onChange={(e)=>setPass(e.target.value)}
                                ></input>
                    </div>
                </div>
                <Button className={cx("button")} variant="primary" onClick={handleClick}>Login</Button>
                
            </form>
            <span className={cx("message")}>{message}</span>
        </div>
    )
}
export default Login