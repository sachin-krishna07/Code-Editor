
import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Import the Prism CSS for styling
import './CodeEditor.css'; // Import custom CSS

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const textareaRef = useRef(null);
  const preRef = useRef(null);
  const lineNumbersRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleChange = (e) => {
    setCode(e.target.value);
    updateLineNumbers(e.target.value);
  };

  const handleScroll = () => {
    preRef.current.scrollTop = textareaRef.current.scrollTop;
    preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
  };

  const updateLineNumbers = (code) => {
    const lines = code.split('\n').length;
    const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
    lineNumbersRef.current.textContent = lineNumbers;
  };

  useEffect(() => {
    updateLineNumbers(code);
  }, [code]);

  return (
    <div className="code-editor">
      <div className="line-numbers" ref={lineNumbersRef}></div>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        spellCheck="false"
        className="code-input"
        onScroll={handleScroll}
      />
      <pre ref={preRef} className="code-output">
        <code className="language-js">{code}</code>
      </pre>
    </div>
  );
};

export default CodeEditor;
