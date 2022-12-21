import {HeaderConnect,TrainingConnect,TestingConnect,ProgressBarConnect, UploadTestConnect, ToastMessageConnect,LoadingConnect} from '~/connect';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ToastMessage from './Components/ToastMessage';
import Loading from './Components/Loading';
import Login from '~/Components/Login'
import { useSelector } from 'react-redux';
function App() {
  const modeLoginSuccess = useSelector(state=>state.mode.modeLoginSuccess)
  const toastMode = useSelector(state=>state.mode.toastMode)
  console.log('modeLoginSuccess: ',modeLoginSuccess)
  
  if(modeLoginSuccess){
    return (
      <Router>
      <Routes>
        {
          ['/Training','/'].map((path_router,index)=>{
            return(
          <Route path={path_router} key={'path_router'+index} element={
            <>
            <HeaderConnect></HeaderConnect>
            {toastMode && <ToastMessageConnect/>}
            <Loading></Loading>
            <TrainingConnect/>
            </>
            }/>
          )})
        }
        
        <Route extract path='/Testing' element={
                <>
                <HeaderConnect></HeaderConnect>
                {toastMode &&<ToastMessageConnect/>}
                <Loading></Loading>
                <TestingConnect/>
                </>
                }>
        </Route>
      </Routes>
      </Router>
    )
  }
  else{
    return (
      <Login></Login>
    )
  }
}

export default App;