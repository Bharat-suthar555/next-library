import Navbar from "../components/Nav"
import  FooterWithSitemap  from "@/components/footer";
import styles from "../styles/home.module.css";
import RecipeReviewCard from "@/components/Card";

export default function Cantact() {
  return (
    <>
      <Navbar />
      <div>
      <h1 className={styles.heading}>Home Page</h1>
      </div>
      <FooterWithSitemap />
    </>
  )
}