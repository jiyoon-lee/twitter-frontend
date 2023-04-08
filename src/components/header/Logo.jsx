import logo from "assets/brand-logo.png";

export default function Logo() {
  return (
    <a href="https://flowbite.com/" className="flex items-center">
      <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
      <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
        Twitter
      </span>
    </a>
  );
}
