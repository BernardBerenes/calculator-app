import "./App.css";
import Calculator from "./Components/Calculator";
import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Support from "./Components/Support";

const Container = styled.div`
  margin: 0px;
  padding: 0px;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  display: flex;
`;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Container>
                  <Calculator />
                </Container>
    }, 
    {
      path: "/Help",
      element: <Support />
    }
  ])

  return(
    <RouterProvider router={router} />
  );
}

export default App;
