import './App.css';
import { Route, useLocation } from 'react-router-dom';
import { Landing, Home, Detail, Form } from './views';
import NavBar from './components/NavBar/NavBar';

function App() {
  //const location = useLocation();
  return (
    <div className="App">
      {useLocation().pathname !== "/" && <NavBar />}
      <Route exact path ="/" render={()=> <Landing/>}/>
      <Route path ="/home" render={()=> <Home/>}/>
      <Route path ="/detail" render={()=> <Detail/>}/>
      <Route path ="/form" render={()=> <Form/>}/>
    </div>
  );
}

export default App;
