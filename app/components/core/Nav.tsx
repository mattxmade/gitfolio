import Link from "next/link";
import { links } from "@/app/data/content";

type NavProps = JSX.IntrinsicElements["nav"];

const Nav = (props: NavProps) => (
  <nav {...props}>
    <ul>
      {links.map((link) => (
        <li key={link.id}>
          <Link href={link.href}>
            <p>{link.text}</p>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
