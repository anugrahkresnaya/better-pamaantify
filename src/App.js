import "./App.css";
import { useSelector } from "react-redux";
import LoginPage from "./pages/login";
import CreatePlaylistPage from "./pages/CreatePlaylist";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const isLogin = useSelector(state => state.token.isLogin);

  return (
    <>
      <Router>
        <div>
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