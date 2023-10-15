import Login from "./formularios/login";
import Registrar from "./formularios/registrar";
import Inicio from "./formularios/inicio";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/registrar",
      element: <Registrar/>,
    },
    {
      path: "/inicio",
      element: <Inicio/>,
    }
  ]);
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
