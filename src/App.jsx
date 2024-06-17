import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { HistoryPage } from "./pages/history-page";
import SearchWeather from "./pages/search-weather";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchWeather />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
