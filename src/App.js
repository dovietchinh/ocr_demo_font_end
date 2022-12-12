import {HeaderConnect,UploadConnect,TrainingConnect} from '~/connect';
import ShowImage from '~/Components/ShowImage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <HeaderConnect></HeaderConnect>
      <Routes>
      <Route path="/" element={<TrainingConnect/>} />
        <Route path="/Training" element={<TrainingConnect/>} />
        <Route path="/Testing" element={<TrainingConnect/>} />
        {/* <Route path="/Testing" element={<ShowImage/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
