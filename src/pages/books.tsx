import { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import { type } from "os";
import Navbar from "@/components/Nav";

type user = {
    id: number;
    books_status: boolean;
    books_price: number;
    vendor_code: number;
    library_name:string;
    publisherId:number;
};

export default function Books() {
    const [userData, setUserData] = useState<user[]>([]);

    useEffect(() => {
        // Define the API endpoint URL
        const apiUrl = "http://localhost:3500/books";

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
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    console.log({userData})

    return (
        <div>
            <Navbar />
            <h1 className={styles.heading}>Books</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.tableHeader}>ID</th>
                        <th className={styles.tableHeader}>Status</th>
                        <th className={styles.tableHeader}>Price</th>
                        <th className={styles.tableHeader}>Vendor_code</th>
                        <th className={styles.tableHeader}>library Name</th>
                        <th className={styles.tableHeader}>Publisher Id</th>

                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.books_status ? "True":"False"}</td>
                            <td>{user.books_price}</td>
                            <td>{user.vendor_code}</td>
                            <td>{user.library_name}</td>
                            <td>{user.publisherId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}