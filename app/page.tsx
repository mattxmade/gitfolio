// export const revalidate = 0;
import Main from "./Main";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="overlay">
        <header></header>
        <Main />
        <footer></footer>
      </div>
    </div>
  );
}
