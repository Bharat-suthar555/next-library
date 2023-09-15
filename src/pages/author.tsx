import React, { useEffect, useState } from 'react';
import styles from "../styles/home.module.css";
import Navbar from "@/components/Nav";

type User = {
  id: number;
  publisher_code: string;
  publisher_name: string;
  publisher_country: string;
};

export default function Publisher() {
  const [userData, setUserData] = useState<User[]>([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [Pid, setPid] = useState("");
  const [formError, setFormError] = useState(""); // To store and display form validation errors

  useEffect(() => {
    fetchPublisherData();
  }, []);

  const fetchPublisherData = () => {
    const apiUrl = "http://localhost:3500/Publisher";
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSubmit = () => {
    // Check if required fields are empty
    if (!code || !name || !country) {
      setFormError("All fields are required"); // Set an error message
      return;
    }

    const apiUrl = "http://localhost:3500/createPublisher";
    const postData = {
      publisher_code: code,
      publisher_name: name,
      publisher_country: country,
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
        setCode("");
        setName("");
        setCountry("");
        setFormError(""); // Clear the error message
        fetchPublisherData();
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  const handleDelete = () => {
    // Check if the Publisher ID is empty
    if (!Pid) {
      setFormError("Publisher ID is required"); // Set an error message
      return;
    }

    const delUrl = `http://localhost:3500/Publisher/${Pid}`;
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
        fetchPublisherData();
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
      <h1 className={styles.heading}>-----------Publisher----------</h1>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableline}>
                        <th className={styles.tableHeader}>ID</th>
                        <th className={styles.tableHeader}>Publisher Code</th>
                        <th className={styles.tableHeader}>Publisher Name</th>
                        <th className={styles.tableHeader}>Country</th>
                    </tr>

                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.publisher_code}</td>
                            <td>{user.publisher_name}</td>
                            <td>{user.publisher_country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


      {/* Add new publisher data form */}
      <h1 className={styles.heading}>------Publish Your Book Here------</h1>
      <div className={styles.error}>{formError}</div> {/* Display the error message */}
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableline}>
            <th className={styles.tableHeader}>Publisher Code</th>
            <th className={styles.tableHeader}>Publisher Name</th>
            <th className={styles.tableHeader}>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input value={code} onChange={(e) => setCode(e.target.value)} type="text" /></td>
            <td><input value={name} onChange={(e) => setName(e.target.value)} type="text" /></td>
            <td><input value={country} onChange={(e) => setCountry(e.target.value)} type="text" /></td>
          </tr>
        </tbody>
      </table>
      <button type="submit" onClick={handleSubmit} className={styles.center}>Submit</button>

      {/* Delete Data Form */}
      <h1 className={styles.heading}>-----Delete From Here-----</h1>
      <div className={styles.error}>{formError}</div> {/* Display the error message */}
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableline}>
            <th className={styles.tableHeader}>Publisher Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input value={Pid} onChange={(e) => setPid(e.target.value)} type="text" /></td>
          </tr>
        </tbody>
      </table>
      <button type="submit" onClick={handleDelete} className={styles.center}>Delete</button>
    </div>
  );
}
