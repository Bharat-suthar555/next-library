import { Card } from "@mui/material";
import Navbar from "../components/Nav";
import styles from "../styles/home.module.css";
import RecipeReviewCard from "@/components/Card";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3500/book_data")
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);
  return (
    <>
      <Navbar />
      <div
        className={styles.datas}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {userData.map((data, index) => (
          <RecipeReviewCard
            key={index}
            title={data.title}
            stationary={data.stationary}
            price={data.price}
            image={data.image}
          />
        ))}
      </div>
    </>
  );
}
