// src/App.js

import React from 'react';
import Home from './pages/Home/Home.js';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;





// import { useEffect } from 'react';

// import React from 'react';
// // import './App.css'
// import SearchIcon from './search.svg'
// import Timer from './components/Timer'
// import NavbarComponent from "./components/navbar";


// const App = () => {


//     useEffect(() => {

//     }, []);

//     return (
//         <div className="app">
//             <NavbarComponent/>
//             <h1>Timely</h1>

//             <div className="search">
//                 <input
//                     placeholder='Search for something'
//                     value='Where do I find this?'
//                     // implement state later
//                     onChange={() => {}}
//                  />
//                 <img 
//                     src={SearchIcon}
//                     alt='search'
//                     // implement so it calls a function that uses the text in the bar to search
//                     onClick={() => {}}
//                 />
//             </div>

//             <div className='container'>
//                 <div className="App">
//                     <Timer />
//                 </div>
//             </div>
//         </div>
//         )
// }

// export default App;