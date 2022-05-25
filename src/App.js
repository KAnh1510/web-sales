import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./components/Collections";
import Products from "./components/Collections/Products";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="collections" element={<Shop />}>
            <Route path=":type" element={<Collections />} />
          </Route>
          <Route
            path="products/:productName"
            element={
              <DefaultLayout>
                <Products />
              </DefaultLayout>
            }
          />
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={`pages${route.path}`}
                element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
