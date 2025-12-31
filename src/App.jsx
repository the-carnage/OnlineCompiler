import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Select from "react-select";

const URL = "http://localhost:3000/compile";

const options = [
  { value: "python", label: "Python" },
  { value: "cpp", label: "C++" },
  { value: "javascript", label: "JavaScript" },
];

import "./App.css";

function App() {
  const [language, setLanguage] = useState(options[0]);
  const [codes, setCodes] = useState("");
  const [inputs, setInputs] = useState("");
  const [outputs, setOutputs] = useState("");

  const submit = async () => {
    try {
      const response = await fetch(URL + `/${language.value}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codes, input: inputs }),
      });

      const data = await response.json();
      console.log(data);

      setOutputs(data.stdout || data.stderr || "No output");
    } catch (err) {
      console.log(err);
      setOutputs("Failed to connect to server");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <div>
          <div>
            <label>
              <strong>Input</strong>
            </label>
            <textarea
              name="inputBox"
              placeholder="Enter input here..."
              style={{
                width: "200px",
                height: "200px",
                resize: "none",
                padding: "10px",
                fontFamily: "monospace",
              }}
              value={inputs}
              onChange={(e) => setInputs(e.target.value)}
            />
          </div>
          <div>
            <label>
              <strong>Output</strong>
            </label>
            <textarea
              readOnly
              name="Output Box"
              placeholder="OUTPUT BOX"
              style={{
                width: "200px",
                height: "200px",
                resize: "none",
                padding: "10px",
                fontFamily: "monospace",
              }}
              value={outputs}
              onChange={(e) => setOutputs(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "200px" }}>
              <Select
                value={language}
                onChange={setLanguage}
                options={options}
              />
            </div>

            <div>
              <button onClick={submit}>Submit</button>
            </div>
          </div>

          <Editor
            height="90vh"
            width="90vw"
            language={language.value}
            defaultValue="#Write your code here"
            value={codes}
            onChange={setCodes}
          />
        </div>
      </div>
    </>
  );
}

export default App;
