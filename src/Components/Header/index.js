import  './Header.scss'
import {Link} from 'react-router-dom'
import thungrac from '~/assets/images/thungrac.jpg'
import axios from 'axios';
import { useDispatch } from 'react-redux';
const { Col,ToggleButton,Navbar,Button } = require("react-bootstrap");

function Header({mode,switchMode,clearMode,clearTesting,clearTraining,customer_ID,setCustomerID,actionSetModeLoginSuccess}){
    return (
        <Navbar bg="primary" className='NavBar--Header'>
            <Col></Col>
            <Link to="/Training">
                <ToggleButton variant="outline-primary" 
                checked={mode!='training'}
                type="checkbox"
                onClick={(e)=>{
                    switchMode("training")
                    
                  
                }}
                className={mode=="training" ? "me-2 untoggled-button-active" : "me-2 untoggled-button"}
                >Training
                </ToggleButton>
            </Link>
            <Link to="/Testing">
                <ToggleButton variant="outline-primary" 
                // className={"ms-2 " + mode=="testing" ? untoggled-button-active" : "untoggled-button" }
                className={mode=="testing" ? "me-2 + untoggled-button-active" : "me-2 untoggled-button"}
                type="checkbox"
                checked={mode!='testing'}
                onClick={(e)=>{
                    switchMode("testing")
                    
                  
                    
                }}
                id="bt-2"
                >Test
                </ToggleButton>
            </Link>
            <Button variant="primary" 
            onClick={(e)=>{
                clearTesting()
                clearTraining()
                clearMode()
            }}
            >Clear
            </Button>
            {/* <input type='text' 
                className="input_ID"
                // placeholder='ID' 
                value={customer_ID} 
                onChange={e=>setCustomerID(e.target.value)}
                
                /> */}
            <Col></Col>
            <Button variant="primary" 
                    className='logout-btn'
                    onClick={(e)=>{
                        setCustomerID('0')
                        actionSetModeLoginSuccess(false)
                    }}
                    >Logout
            </Button>
            
        </Navbar>
    )
}

export default Header
