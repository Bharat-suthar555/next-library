// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [data, fetchdata] = useState<any[]>([]);
//   useEffect(() => {
//     fetch("localhost:3500/Publisher").then((res) => res.json().then(fetchdata));
//   }, []);
//   // eslint-disable-next-line react/jsx-key
//   return <h1>{data.map((bharat)=>(<div>{bharat.id}</div>))}</h1>;
// }

import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3500/Publisher")
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  console.log({ userData });
  return (
    <table>
      {userData.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.publisher_name}</td>
          <td>{user.publisher_country}</td>
        </tr>
      ))}
    </table>
  );
}
