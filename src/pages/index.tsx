// import { useEffect, useState } from "react";
// export default function Home() {
//   const [userData, setUserData] = useState<any[]>([]);

//   useEffect(() => {
//     fetch("http://localhost:3500/books")
//       .then((res) => res.json())
//       .then((data) => setUserData(data));
//   }, []);

//   console.log({ userData });
//   return (

//     <table border="1" cellpadding="50" id="printTable">
//       {userData.map((user) => (
//         <tr key={user.id}>
//           <td>{user.id}</td>
//           <td>{user.books_status}</td>
//           <td>{user.books_price}</td>
//           <td>{user.vendor_code}</td>
//           <td>{user.library_name}</td>
//           <td>{user.publisherId}</td>
//         </tr>
//       ))}
//     </table>
//   );
// }

import Navbar from "../components/Nav"
import styles from "../styles/home.module.css";
export default function Home() {
  return (
    <>
      <Navbar />
      <div>
      <h1 className={styles.heading}>Home Page</h1>
      </div>
    </>
  )
}