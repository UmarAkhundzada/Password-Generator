import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [pass, setPass] = useState("");
  const [length, setLength] = useState(10);
  const [allowChar, setAllowChar] = useState(false);
  const [allowNum, setAllowNum] = useState(false);

  const passRef =  useRef(null);

  const generatePass = useCallback(() => {
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    allowChar ? (string += "!@#$%^&()_-[]{}") : "";
    allowNum ? (string += "0123456789") : "";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      password += string.charAt(char);
    }
    setPass(password);
  }, [setPass, length, allowChar, allowNum]);

const copyPass = () => {
  passRef.current?.select();
  window.navigator.clipboard.writeText(pass);

}
  useEffect(()=>{
    generatePass();  
  },[allowChar,allowNum,setPass, length]);

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg p-8 my-8 bg-lime-950">
        <h1 className="text-white text-lg text-center">Password Generator</h1>
        <div className="flex overflow-hidden shadow mb-2">
          <input
            type="text"
            className="w-full py-1 my-2 px-3 rounded-l-md"
            placeholder="Password"
            readOnly
            value={pass}
            ref={passRef}
          />
          <button 
          onClick={copyPass}
          className="text-white bg-orange-600  py-1 my-2 px-3 rounded-r-md hover:bg-slate-500">
            Copy
          </button>
        </div>
        <button
          onClick={generatePass}
          className="text-white bg-orange-600 p-1 rounded-md w-full max-w-sm"
        >
          Generate Random
        </button>

        <div className="flex text-sm gap-x-2 my-4">
          <div className="flex gap-x-1 items-center">
            <input
              type="range"
              min={10}
              max={100}
              defaultValue={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-white" htmlFor="">
              Length({length})
            </label>
          </div>
          <div className="flex gap-x-1 items-center">
            <input
              type="checkbox"
              defaultChecked={allowNum}
              id="allowNum"
              className="cursor-pointer"
              onChange={() => {
               setAllowNum((prev) => !prev)
              }}
            />
            <label className="text-white" htmlFor="allowNum">
              Numbers
            </label>
          </div>

          <div className="flex gap-x-1 items-center">
            <input
              type="checkbox"
              defaultChecked={allowNum}
              id="allowChar"
              className="cursor-pointer"
              onChange={() => {
               setAllowChar((prev) => !prev)
              }}
            />
            <label className="text-white" htmlFor="allowNum">
              Characters
            </label>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
