import logo from "assets/messenger_icon.svg";
import { useState } from "react";

export default function Dashboard() {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // tweet을 생성한다.
    console.log(text);
  };
  return (
    <>
      <div className=" bg-white rounded-xl p-10 w-1/2">
        <header className="flex justify-between items-center">
          <section className="flex items-center">
            <img src={logo} alt="brand logo" />
            <h1 className=" text-2xl">Twitter</h1>
          </section>
          <nav>
            <button>로그인</button>
          </nav>
        </header>
        <section>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button>검색</button>
          </form>
        </section>
        <main>
          <ul>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </main>
      </div>
    </>
  );
}
