import { useState } from "react";
import axios from "axios";

function Editor() {
  const [code, setCode] = useState("console.log('Hello World')");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    const res = await axios.post("http://localhost:5000/run", { code });
    setOutput(res.data.output || res.data.error);
  };

  const submit = async () => {
    await axios.post("http://localhost:5000/submit", {
      name: "User",
      score: output.includes("Hello") ? 100 : 0
    });
    alert("Submitted!");
  };

  return (
    <div>
      <textarea
        rows="10"
        cols="50"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br />
      <button onClick={runCode}>Run</button>
      <button onClick={submit}>Submit</button>

      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
}

export default Editor;