import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/leaderboard")
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {data.map((d, i) => (
        <div key={i}>
          {d.name} - {d.score}
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;