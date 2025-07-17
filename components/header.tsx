import Link from 'next/link';
import classes from './header.module.css';
import { ReactNode } from 'react';
const pages = [
  { href: '/', title: 'Каталог' }
  
];


export default function Header({ children = null }: { children: ReactNode }) {
     
  return  <>
  <header>

   {children}

   <nav className={classes.header}>
    <ul>
      {pages.map(({ href, title }) =>
        <li key={href}>
          <Link href={href}> {title} </Link>
        </li>)}
    </ul>
  </nav>
    </header>
  </>;
}