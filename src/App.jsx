import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout, { loader as RootLoader } from "./pages/Root";
import Home, { loader as HomeLoader } from "./pages/Home";
import Authantication from "./pages/Authantication";
import Movies, { loader as MoviesLoader } from "./pages/Movies";
import TvShows, { loader as TvLoader } from "./pages/TvShows";
import People, { loader as PeopleLoader } from "./pages/People";
import About, { loader as AboutLoader } from "./pages/About";
import Network, { loader as NetworkLoader } from "./pages/Network";
import { action as AuthAction } from "./pages/Authantication";
import Error from "./pages/Error";
import VerifyPage, { loader as verifyLoader } from "./pages/VerifyPage";
import ConfirmCode, { action as confirmCodeAction } from "./pages/ConfirmCode";
import UpdatePassword, {
  action as updatePasswordAction,
} from "./pages/updatePassword";
import MediaDetails, {
  loader as MediaDetailsLoader,
} from "./pages/MediaDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    loader: RootLoader,
    children: [
      {
        index: true,
        element: <Navigate replace to="home" />,
      },
      {
        path: "home",
        element: <Home />,
        loader: HomeLoader,
      },
      {
        path: "movies",
        element: <Movies />,
        loader: MoviesLoader,
      },
      {
        path: "tv",
        element: <TvShows />,
        loader: TvLoader,
      },
      {
        path: "details/:mediaType/:id",
        element: <MediaDetails />,
        loader: MediaDetailsLoader,
      },
      {
        path: "people",
        element: <People />,
        loader: PeopleLoader,
      },
      {
        path: "about",
        element: <About />,
        loader: AboutLoader,
      },
      {
        path: "network",
        element: <Network />,
        loader: NetworkLoader,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "auth",
        element: <Authantication />,
        action: AuthAction,
      },
      {
        path: "password",
        children: [
          {
            path: "verify",
            loader: verifyLoader,
            element: <VerifyPage />,
          },
          {
            path: "recover",
            element: <ConfirmCode />,
            action: confirmCodeAction,
          },
          {
            path: "update",
            element: <UpdatePassword />,
            action: updatePasswordAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
