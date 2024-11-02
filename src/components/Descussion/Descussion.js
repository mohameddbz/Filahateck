import { useEffect, useRef, useState } from 'react';
import { FaCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { AiOutlinePicture } from "react-icons/ai";



const Discussion = ({ listMessages, currentUserId }) => {
    const [inputValue, setInputValue] = useState('');

    const messagesEndRef = useRef(null);
   const status = 'hors'
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [listMessages]);

    const handleChange = (event) => {
        setInputValue(event.target.value);
      };
      
    const  handleSendMessage = () => {

    }

    return (
        <div className='border border-gray-400 rounded-2xl overflow-hidden shadow-xl' >
           
           <div 
         
        className="bg-white py-2 px-4 justify-between  border  border-t-0 border-l-0 border-r-0 border-b-2 border-gray-400 items-center flex flex-row shadow-4xl" >

            <div className="flex gap-2 flex-row">
                <img className="h-14 w-14 rounded-full" src={"photo"}/>
                <div className="flex flex-col">
                    <h1 className="font-semibold">{"userName"}</h1>
                    <p className="text-sm">{"role"}</p>
                </div>
            </div>

           {status==="active" ? <div  className='flex flex-row font-bold text-white bg-myGreen py-1 px-2 rounded-lg items-center gap-1' > <span>En ligne</span> <FaCircle /> </div> :
           <div  className='flex flex-row font-bold text-white bg-red-500 py-1 px-2 rounded-lg items-center gap-1' > <span>Hors ligne</span> <FaCircle /> </div>  }
        </div>
        <div className="flex flex-col space-y-4 p-4 no-scrollbar bg-white h-[400px] overflow-y-auto">
            {listMessages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex ${
                        msg.idSender === currentUserId ? "justify-end" : "justify-start"
                    }`}
                >
                    <div
                        className={`p-3 rounded-3xl max-w-xs ${
                            msg.idSender === currentUserId
                                ? "bg-myOrange text-white"
                                : "bg-myGreen text-white"
                        }`}
                    >
                        {msg.text}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} /> {/* This div will act as a scroll anchor */}
        </div>
        <div className='flex flex-row mx-1 gap-2 mb-2 '>
            <div className='flex flex-row  flex-1 bg-gray-200 px-5 py-2 gap-2 rounded-2xl'> 
             <AiOutlinePicture className='text-myOrange  h-7 w-7'/>
             <input
              className='flex-1 outline-none bg-transparent'
              type='text'
              value={inputValue} 
              onChange={handleChange}
             />
            </div>
            <button onClick={handleSendMessage}>
            <IoSend className='text-myOrange h-7 w-7'  />
            </button>
        </div>
        </div>
    );
};

export default Discussion;
