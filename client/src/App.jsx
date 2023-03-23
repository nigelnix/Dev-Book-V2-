import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout/Layout";
import SignInPage from "./components/SignInPage/SignInPage";
import Home from "./components/Home/Home";
import ProfileLarge from "./components/ProfileLarge/ProfileLarge";
import AppWrapper from "./components/AppWrapper";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppWrapper />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:profileID" element={<ProfileLarge />} />
        </Route>
        <Route path="/login" element={<SignInPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
