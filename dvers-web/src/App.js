import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import { Navigation } from './ui/Navigation';
import { Delivers } from './delivers/Delivers';
import { GetDeliverId } from './delivers/Deliver';
import { Register } from './profile/Register';
import { Login } from './profile/Login';
import { Profile } from './profile/Profile';
import { ErrorPage } from './ErrorPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path='/' element={<Delivers/>} exact />
        <Route path='/delivers/:id' element={<GetDeliverId/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Switch>
    </Router>
  );
}

export default App;
