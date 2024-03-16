import { useCallback, useEffect, useRef, useState } from 'react'

function App() {


  const [passwordLength, setPasswordLength] = useState(8)
  const [isNumberAllowed, setIsNumberAllowed] = useState(false)
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // Function for creating random passwords used with callback for optimization
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberAllowed) str += "123456789";
    if (isCharacterAllowed) str += "!@~#$%^&*()_+-={}[]|\<>/?`"

    for (let i = 1; i <= passwordLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [passwordLength, isNumberAllowed, isCharacterAllowed, setPassword])


  useEffect(()=>{
    passwordGenerator()
  }, [passwordLength,isNumberAllowed,isCharacterAllowed, passwordGenerator])

  // creating a reference of the password state
  const passRef=useRef(null)

  const copyPasswordToClipBoard=()=>{
    // to highlight the text selected for copying
    passRef.current?.select()
    // to copy the password state(we can use document here since it's core reactjs and it will be converted to JS)
    window.navigator.clipboard.writeText(password)
  }

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 font-semibold bg-gray-500'>

        <h1 className='text-4xl text-center text-white my-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-8'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passRef}
          />

          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500'
          onClick={copyPasswordToClipBoard}>Copy</button>

        </div>

        <div className='flex text-sm gap-x-2 mb-8'>
          <div className="flex items-center gap-x-1">
            <input type="range"
              min={6}
              max={50}
              value={passwordLength}
              className='cursor-pointer'
              onChange={(e) => {
                setPasswordLength(e.target.value)
              }}
            />
            <label>Length: {passwordLength}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={isNumberAllowed}
              id='numberInput'
              onChange={() => setIsNumberAllowed((prev) => !prev)} />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={isCharacterAllowed}
              id='characterInput'
              onChange={() => setIsCharacterAllowed(!isCharacterAllowed)} />
            <label htmlFor='characterInput'>Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
