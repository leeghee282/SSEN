import React, { useState, useEffect, useRef } from "react";

function CommunityForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
          />
          <button onClick={handleSubmit}>Update</button>
        </>
      ) : (
        <>
          <input
            placeholder="댓글을 달아주세엽"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
          />
          <button onClick={handleSubmit}>Add</button>
        </>
      )}
    </form>
  );
}

export default CommunityForm;
