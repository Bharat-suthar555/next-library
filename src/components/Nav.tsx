
import Link from "next/link";
import styles from "../styles/home.module.css"

type user = {
  id: number;
  books_status: boolean;
  books_price: number;
  vendor_code: number;
  library_name:string;
  publisherId:number;
};


const Navbar = () => {
  return <>
    <nav className="Nav">
      <ul className={styles.menubar}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/books">Status</Link></li>
        <li><Link href="/author">Publish</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  </>
};
export default Navbar;