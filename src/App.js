import Drawer from './components/Drawer';
import './App.css';

import {
  Switch,
  Route,
} from "react-router-dom";

import {RecoilRoot} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Switch>
          <Route path="/" component={Drawer} />
        </Switch>
      </div>
    </RecoilRoot>
  );
}

export default App;
