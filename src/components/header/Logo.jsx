import logo from "assets/brand-logo.png";

export default function Logo() {
  return (
    <a href="/" className="flex items-center">
      <img src={logo} className="h-8 mr-3" alt="Logo" />
      <span className="self-center text-3xl font-semibold whitespace-nowrap">
        Twitter
      </span>
    </a>
  );
}
