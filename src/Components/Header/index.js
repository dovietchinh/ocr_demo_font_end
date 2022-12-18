import  './Header.scss'
import {Link} from 'react-router-dom'
import thungrac from '~/assets/images/thungrac.jpg'
import axios from 'axios';
const { Col,ToggleButton,Navbar,Button } = require("react-bootstrap");

function Header({mode,switchMode,clearMode,clearTesting,clearTraining,customer_ID,setCustomerID}){
    return (
        <Navbar bg="primary">
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
                let convertAPI = async ()=>{
                    console.log('start Convert!')
                    let r = await axios.post('http://10.124.69.195:18002/convert',{customer_ID})
                        // .then((r)=>{
                            // console.log('convert done')
                            // console.log(r.data)
                        // })
                        // .catch((error)=>{
                            // console.log('error convert: ',error)
                        // })
                    console.log(r.data)
                    await axios.post('http://10.124.69.195:18002/reload_models',{customer_ID})
                        .then((r)=>{
                            console.log('reload models done!')
                        })
                        .catch((error)=>{
                            console.log('error reload: ',error)
                        })

                }
                convertAPI();
            }}
            >Convert Model
            </Button>
            <Button variant="primary" 
            onClick={(e)=>{
                clearTesting("a")
                clearTraining("a")
                clearMode("a")
            }}
            >Clear
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
