import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ROUTES from "./routes";
import { AddPost, Home, Layouts, Login, Post, Register } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.Home} element={<Layouts />}>
      <Route index element={<Home />} />
      <Route path={ROUTES.Post} element={<Post />} />
      <Route path={ROUTES.AddPost} element={<AddPost />} />
      <Route path={ROUTES.Login} element={<Login />} />
      <Route path={ROUTES.Register} element={<Register />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
