import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const UserLayout = () => {
  return (
    <div className="bacground">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
