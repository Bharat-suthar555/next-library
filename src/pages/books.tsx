import { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import Navbar from "@/components/Nav";
import { type } from "os";
import RecipeReviewCard from "@/components/Card";

type user = {
  id: number;
  books_status: boolean;
  title:string;
  stationary:string;
  image:string;
  price:number;
  books_price: number;
  vendor_code: number;
  library_name: string;
  publisherId: number;
};

type CardProps = {
  title: string;
  description: string;
  price:string;
  imageSrc?: string;
}

export default function Books() {
  const [userData, setUserData] = useState<user[]>([]);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "http://localhost:3500/book_data";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Set the fetched data in the state
        setUserData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleBorrow = (bookId: number) => {
    // Perform the borrowing action here (e.g., update the database or API)

    // Update the book status in the userData state
    setUserData((prevUserData) =>
      prevUserData.map((user) =>
        user.id === bookId ? { ...user, books_status: false } : user
      )
    );
  };

  const handleCheckout = (bookId: number) => {

    // Update the book status in the userData state
    setUserData((prevUserData) =>
      prevUserData.map((user) =>
        user.id === bookId ? { ...user, books_status: true } : user
      )
    );
  };

  return (
    <div>
      <Navbar />

      <h1 className={styles.heading}>-----------Books----------</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th className={styles.tableHeader}>ID</th>
            <th className={styles.tableHeader}>Status</th>
            <th className={styles.tableHeader}>Price</th>
            <th className={styles.tableHeader}>Vendor_code</th>
            <th className={styles.tableHeader}>Library Name</th>
            <th className={styles.tableHeader}>Publisher Id</th> */}

            <th className={styles.tableHeader}>ID</th>
            <th className={styles.tableHeader}>Status</th>
            <th className={styles.tableHeader}>title</th>
            <th className={styles.tableHeader}>stationary</th>
            <th className={styles.tableHeader}>Price</th>

          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.books_status ? "False" : "True"}</td>

              <td>{user.title}</td>
              <td>{user.stationary}</td>
              <td>{user.price}</td>

              {/* <td>{user.books_price}</td>
              <td>{user.vendor_code}</td>
              <td>{user.library_name}</td>
              <td>{user.publisherId}</td>  */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Borrow and Checkout section */}
      <h2 className={styles.heading}>Borrow or Checkout</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Book ID</th>
            <th className={styles.tableHeader}>Status</th>
            <th className={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.books_status ? "Available" : "Checked Out"}</td>
              <td>
                {user.books_status ? (
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleBorrow(user.id)}>Borrow</button>
                ) : (
                  <button onClick={() => handleCheckout(user.id)}>Checkout</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <RecipeReviewCard /> */}
    </div>
    
  );
}
