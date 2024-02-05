import { useFire } from "./store/useFire";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import AuthLoginPage from "./pages/AuthLoginPage";
import AuthRegisterPage from "./pages/AuthRegisterPage";
import QuizListPage from "./pages/QuizListPage";
import RunQuizPage from "./pages/RunQuizPage";
import EditQuizPage from "./pages/EditQuizPage";
import NewQuizPage from "./pages/NewQuizPage";
import AuthContextProvider from "./store/AuthContentProvider";
import DataContextProvider from "./store/DataContextProvider";

const router = createBrowserRouter([
  { path: "/", element: <Root />, children: [
    { index: true, element: <AuthLoginPage /> },
    { path: "/register", element: <AuthRegisterPage /> },
    { path: "/quizes", element: <QuizListPage /> },
    { path: "/quiz/new", element: <NewQuizPage /> },
    { path: "/quiz/:id/run", element: <RunQuizPage /> },
    { path: "/quiz/:id/edit", element: <EditQuizPage /> }
  ]}
]);

function App() {
  // useFire();
  
  return (
    <>
      <AuthContextProvider>
        <DataContextProvider>
          <RouterProvider router={router} />
        </DataContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
