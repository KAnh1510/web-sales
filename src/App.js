import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Magazine from "./pages/Magazine";
import Collections from "./components/Collections";
import Products from "./components/Collections/Products";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./components/Layout";
import { Fragment } from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="collections" element={<Shop />}>
            <Route path=":type" element={<Collections />} />
          </Route>
          <Route path="blog/news" element={<Magazine />} />
          <Route
            path="products/:productName"
            element={
              <DefaultLayout>
                <Products />
              </DefaultLayout>
            }
          />
          {publicRoutes.map((route, index) => {
            let Page = route.component;
            let Layout = DefaultLayout;

            return (
              <Route
                key={index}
                path={`pages${route.path}`}
                element={
                  <Layout>
                    <Page />
                  </Layout>
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
