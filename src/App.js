import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Magazine from "./pages/Magazine";
import Collections from "./components/Collections";
import Products from "./components/Collections/Products";
import { publicRoutes } from "./routes";

import Account from "./pages/Account";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Address from "./components/Address";
import News from "./pages/News";
import Recruitment from "./pages/Recruitment";
import DefaultLayout from "./layout/DefaultLayout";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import OrderDone from "./components/OrderDone";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="collections" element={<Shop />}>
            <Route path=":type" element={<Collections />} />
          </Route>
          <Route path="magazine" element={<Magazine />} />
          <Route path="magazine/news" element={<News />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route
            path="products/:productName"
            element={
              <DefaultLayout>
                <Products />
              </DefaultLayout>
            }
          />
          <Route
            path="cart"
            element={
              <DefaultLayout>
                <Cart />
              </DefaultLayout>
            }
          />
          <Route
            path="cart/payment"
            element={
              <DefaultLayout>
                <Payment />
              </DefaultLayout>
            }
          />
          <Route
            path="orders"
            element={
              <DefaultLayout>
                <OrderDone />
              </DefaultLayout>
            }
          />
          <Route
            path="account/:id"
            element={
              <DefaultLayout>
                <Account />
              </DefaultLayout>
            }
          />
          <Route
            path="account/login"
            element={
              <DefaultLayout>
                <Login />
              </DefaultLayout>
            }
          />
          <Route
            path="account/register"
            element={
              <DefaultLayout>
                <Register />
              </DefaultLayout>
            }
          />
          <Route
            path="account/address/:id"
            element={
              <DefaultLayout>
                <Address />
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
