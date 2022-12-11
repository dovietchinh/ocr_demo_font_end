import  './Header.scss'
import {Link} from 'react-router-dom'
const { Col,ToggleButton,Navbar } = require("react-bootstrap");

function Header({mode,changeMode}){
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
            <Col></Col>
        </Navbar>
        
    )
}

export default Header
