import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Pages
import Home from './pages/Home';
import Detail from './pages/Detail';
import ImageGallery from './pages/ImageGallery';
import ImageGalleryDetail from './pages/ImageGalleryDetail';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/image_gallery">ImageGallery</Link>
          </li>

        </ul>
      </nav>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:breed_customname" component={Detail} />
          <Route exact path="/image_gallery" component={ImageGallery} />
          <Route path="/image_gallery/:photo_id" component={ImageGalleryDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
