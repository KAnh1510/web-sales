import Payment from "~/pages/Payment";
import About from "~/pages/About";
import Contact from "~/pages/Contact";
import PrivatePolicy from "~/pages/PrivatePolicy";
import ReturnPolicy from "~/pages/ReturnPolicy";
import Service from "~/pages/Service";

const publicRoutes = [
  { path: "/payment", component: Payment },
  { path: "/about", component: About },
  { path: "/contact", component: Contact, pages: null },
  { path: "/private", component: PrivatePolicy },
  { path: "/return", component: ReturnPolicy },
  { path: "/service", component: Service },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
