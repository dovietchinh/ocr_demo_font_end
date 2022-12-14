import  './Header.scss'
import {Link} from 'react-router-dom'
import thungrac from '~/assets/images/thungrac.jpg'
import axios from 'axios';
const { Col,ToggleButton,Navbar,Button } = require("react-bootstrap");

function Header({mode,changeMode,clearMode,clearTesting,clearTraining,customer_ID,setCustomerID}){
    return (
        <Navbar bg="primary">
            <Col></Col>
            <Link to="/Training">
                <ToggleButton variant="outline-primary" 
                checked={mode!='training'}
                type="checkbox"
                onClick={(e)=>{
                    changeMode("training")
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
                    changeMode("testing")
                }}
                id="bt-2"
                >Test
                </ToggleButton>
            </Link>
            <Button variant="primary" 
            onClick={(e)=>{
                clearTesting("a")
                clearTraining("a")
                clearMode("a")
                // let remove_api = async ()=>{
                //     await axios.post('http://10.124.69.43:9001/clear',{customer_ID:'*'})
                //         .then((r)=>{
                //             console.log()
                //         })
                //         .catch((error)=>{
                //             console.log('error: ',error)
                //         })
                // }
                
            }}
            >Clear
            {/* <img src={thungrac} style={{height:"40px",width:"100%",objectFit:"contain"}}/> */}
            </Button>
            <input type='text' 
                className="input_ID"
                // placeholder='ID' 
                value={customer_ID} 
                onChange={e=>setCustomerID(e.target.value)}
                
                />
            <Col></Col>
        </Navbar>
        
    )
}

export default Header
