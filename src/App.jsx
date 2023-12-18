import { useState,useCallback, useEffect, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import 'mathjs' 

function App() {
  const [color,setColor] = useState('white')
  const [length,setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password,setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{   //to memorize the function and will render just once when page reloads or dependency array changes
    console.log("called")
    console.log(numAllowed,charAllowed)
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str+="1234567890"
    if (charAllowed) str+="!@#$%^&*"
    let pass = ""
    for(let i=1;i<length;i++)
    {
      let ind =  Math.floor(Math.random() *(str.length)+1)
      pass+=str.charAt(ind)
    }
    setPassword(pass)
    console.log(pass)

  },[length,numAllowed,charAllowed])

  useEffect(()=>{generatePassword()},[length,numAllowed,charAllowed])  //everytime dependency changes

  const copyToClipboard = ()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }

  return (
    <>
    <div className='w-full h-screen duration-200' style={{backgroundColor:color}}>
      <div className='fixed flex flex-wap justify-center bottom-12 insext-x-0 px-2'>
        
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
          
          <h1 className='text-white text-center my-3'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text" value={password} placeholder='Password' readOnly className='outline-none w-full py-1 px-3' ref={passwordRef}></input>
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ' onClick={copyToClipboard}>copy</button>
          </div>

          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range" min={6} max={20} name="" id="" value={length} onChange={(e)=>{setLength(e.target.value)}} className='cursor-pointer'></input>
              <label htmlFor='length'>Length : {length}</label>
              <input type="checkbox" name="" id="" defaultChecked={numAllowed} onClick={()=>{setNumAllowed(!numAllowed)}} className='cursor-pointer'></input>
              <label htmlFor='length'> Number</label>
              <input type="checkbox" name="" id="" defaultChecked={charAllowed} onClick={()=>{setCharAllowed(!charAllowed)}} className='cursor-pointer'></input>
              <label htmlFor='length'> Character </label>
            </div>

          </div>
        </div>


        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
          <button onClick={()=>{setColor('red')}} className='outline-none px-4 py-1 rounded-full shadow-lg text-black' style={{backgroundColor:'red'}}>Red</button>
          <button onClick={()=>{setColor('aqua')}} className='outline-none px-4 py-1 rounded-full shadow-lg text-black' style={{backgroundColor:'aqua'}}>Blue</button>
          <button onClick={()=>{setColor('green')}} className='outline-none px-4 py-1 rounded-full shadow-lg text-black' style={{backgroundColor:'green'}}>Green</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
