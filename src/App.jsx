import Header from "components/header/Header";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div className="bg-opacity-80 bg-white rounded-xl w-1/2 y-3/4">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
