import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import Navbar from "@/components/Nav";

type User = {
  id: number;
  title: string;
  stationary: string;
  price: string;
  image:String;
};

export default function Publisher() {
  const [userData, setUserData] = useState<User[]>([]);
  const [title, settitle] = useState("");
  const [stationary, setstationary] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState("");
  const [Pid, setPid] = useState("");
  const [formError, setFormError] = useState(""); // To store and display form validation errors

  useEffect(() => {
    bookData();
  }, []);

  const bookData = () => {
    const apiUrl = "http://localhost:3500/book_data";
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log({data})
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSubmit = () => {
    // Check if required fields are empty
    if (!title || !stationary || !price) {
      setFormError("All fields are required"); // Set an error message
      return;
    }

    const apiUrl = "http://localhost:3500/createdata";
    const postData = {
      title: title,
      stationary: stationary,
      price: price,
    };
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
     console.log({response})
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
      window.location.reload();
  };

  const handleDelete = () => {
    // Check if the Publisher ID is empty
    if (!Pid) {
      setFormError("Publisher ID is required"); // Set an error message
      return;
    }

    const delUrl = `http://localhost:3500/book_data/${Pid}`;
    fetch(delUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setPid("");
        setFormError(""); // Clear the error message
        bookData();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
    window.location.reload();
  };

  return (
    <div>
      <Navbar />
      {/* Display publisher data here */}
      <h1 className={styles.heading}>-----------Publish Your Book----------</h1>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableline}>
            <th className={styles.tableHeader}>ID</th>
            <th className={styles.tableHeader}>Title</th>
            <th className={styles.tableHeader}>Stationary</th>
            <th className={styles.tableHeader}>Price</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.title}</td>
              <td>{user.stationary}</td>
              <td>{user.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add new Book data*/}
      <h1 className={styles.heading}>------Publish Your Book Here------</h1>
      <div className={styles.error}>{formError}</div>{" "}
      {/* Display the error message */}
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableline}>
            <th className={styles.tableHeader}>Title</th>
            <th className={styles.tableHeader}>Stationary</th>
            <th className={styles.tableHeader}>Price</th>
            <th className={styles.tableHeader}>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input className="inputtext"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                type="text"
              />
            </td>
            <td>
              <input className="inputtext"
                value={stationary}
                onChange={(e) => setstationary(e.target.value)}
                type="text"
              />
            </td>
            <td>
              <input className="inputtext"
                value={price}
                onChange={(e) => setprice(e.target.value)}
                type="text"
              />
            </td>
            <td>
              
              <input className="inputtext"
                value={image}
                onChange={(e) => setimage(e.target.value)}
                type="text"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" onClick={handleSubmit} className={styles.center}>
        Submit
      </button>
      {/* Delete Data Form */}
      <h1 className={styles.heading}>-----Delete From Here-----</h1>
      <div className={styles.error}>{formError}</div>{" "}
      {/* Display the error message */}
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableline}>
            <th className={styles.tableHeader}>Book Id</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                value={Pid}
                onChange={(e) => setPid(e.target.value)}
                type="text"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" onClick={handleDelete} className={styles.center}>
        Delete
      </button>
    </div>
  );
}
