import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import Protect from './Protect';
import ErrorPage from './pages/ErrorPage';
import { Box } from '@mui/material';

function App() {
  return (
      <Box className="App">
        <Router>
          <Routes>
            <Route path='/' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/home' element={<Protect />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </Box>
  );
}

export default App;







// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './LoginPage';
// import RegisterPage from './RegisterPage';
// import HomePage from './HomePage';
// import Protect from './Protect';
// import ErrorPage from './ErrorPage';
// import { useState } from 'react';
// import { Box } from '@mui/material';

// function App() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [pwd, setPwd] = useState('')
//   const [arr, setArr] = useState([])

//   return (
//     <Box className="App">
//       <Router>
//         <Routes>
//           <Route path='/' element={<RegisterPage
//             name={name} setName={setName}
//             email={email} setEmail={setEmail}
//             pwd={pwd} setPwd={setPwd}
//             arr={arr} setArr={setArr} />} />
//           <Route path='/login' element={<LoginPage />} />
//           <Route path='/home' element={<Protect />}>
//             <Route index element={<HomePage />} />
//           </Route>
//           <Route path="*" element={<ErrorPage />} />
//         </Routes>
//       </Router>
//     </Box>
//   );
// }

// export default App;
