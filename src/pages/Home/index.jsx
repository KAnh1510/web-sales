import { DefaultLayout } from "~/components/Layout";
import Cover from "~/components/Layout/components/Cover";

function Home() {
  return <DefaultLayout cover={<Cover />} />;
}

export default Home;
