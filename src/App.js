import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:breed_customname" component={Detail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
