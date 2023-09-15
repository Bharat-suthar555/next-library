
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
    <nav>
      <ul className={styles.menubar}>
        <li><a href="/home">Home</a></li>
        <li><a href="/books">Books</a></li>
        <li><a href="/author">Authors</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </>
};
export default Navbar;