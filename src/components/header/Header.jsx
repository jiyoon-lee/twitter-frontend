import Logo from "./Logo";
import Navigator from "./Navigator";

export default function Header() {
  return (
    <nav className="border-gray-200 bg-header rounded-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <Navigator />
      </div>
    </nav>
  );
}
