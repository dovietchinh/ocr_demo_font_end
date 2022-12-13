import {HeaderConnect,TrainingConnect,ProgressBarConnect, UploadTestConnect} from '~/connect';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <HeaderConnect></HeaderConnect>
      <Routes>
      <Route path="/" element={<TrainingConnect/>} />
        <Route path="/Training" element={<TrainingConnect/>} />
        <Route path="/Testing" element={<UploadTestConnect/>} />
        <Route path="/Testings" element={<ProgressBarConnect/>} />
      </Routes>
    </Router>
  );
}

export default App;
