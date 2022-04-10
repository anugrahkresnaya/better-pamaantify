import "./App.css";
import { useSelector } from "react-redux";
import LoginPage from "./pages/login";
import CreatePlaylistPage from "./pages/CreatePlaylist";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
  const isLogin = useSelector(state => state.token.isLogin);

  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/create-playlist">Create Playlist</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/create-playlist">
              {isLogin ? <CreatePlaylistPage /> : <Redirect to="/" />}
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}
export default App;