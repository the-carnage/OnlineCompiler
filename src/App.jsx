import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import "./App.css";

const URL = import.meta.env.VITE_BACKEND_URL;

const options = [
  { value: "python", label: "Python", defaultValue: "#Write your code here" },
  { value: "cpp", label: "C++", defaultValue: "//Write your code here" },
  { value: "javascript", label: "JavaScript", defaultValue: "//Write your code here" },
];

const themeOptions = [
  { value: "vs-dark", label: "Dark" },
  { value: "light", label: "Light" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'var(--bg-tertiary)',
    borderColor: 'var(--border-color)',
    color: 'var(--text-primary)',
    minHeight: '38px',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--bg-tertiary)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--accent-color)' : 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--text-primary)',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--text-primary)',
  }),
};

function App() {
  const [language, setLanguage] = useState(options[0]);
  const [codes, setCodes] = useState(options[0].defaultValue);
  const [inputs, setInputs] = useState("");
  const [outputs, setOutputs] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [theme, setTheme] = useState(themeOptions[0]);

  // Fix: useEffect must be at the top level
  useEffect(() => {
    fetch(URL + "/start").catch(err => console.error("Warmup failed", err));
  }, []);

  const onLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
    setCodes(selectedOption.defaultValue);
  };

  const submit = async () => {
    setIsCompiling(true);
    setOutputs("Running...");
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
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <span>&lt;/&gt;</span> Online Compiler
        </div>
        <div className="controls">
          <div style={{ width: "150px" }}>
            <Select
              value={theme}
              onChange={setTheme}
              options={themeOptions}
              styles={customStyles}
              classNamePrefix="react-select"
              placeholder="Theme"
            />
          </div>
          <div style={{ width: "200px" }}>
            <Select
              value={language}
              onChange={onLanguageChange}
              options={options}
              styles={customStyles}
              classNamePrefix="react-select"
            />
          </div>
          <button
            className="run-button"
            onClick={submit}
            disabled={isCompiling}
          >
            {isCompiling ? (
              <>
                <div className="loading-spinner"></div>
                Running...
              </>
            ) : (
              "Run Code"
            )}
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="editor-container">
          <Editor
            height="100%"
            width="100%"
            theme={theme.value}
            language={language.value}
            defaultValue={language.defaultValue}
            value={codes}
            onChange={setCodes}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        <div className="io-container">
          <div className="io-panel">
            <label className="panel-title">Input</label>
            <textarea
              className="io-textarea"
              placeholder="Enter input here..."
              value={inputs}
              onChange={(e) => setInputs(e.target.value)}
              spellCheck="false"
            />
          </div>
          <div className="io-panel">
            <label className="panel-title">Output</label>
            <textarea
              readOnly
              className="io-textarea"
              placeholder="Output will appear here..."
              value={outputs}
              spellCheck="false"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
