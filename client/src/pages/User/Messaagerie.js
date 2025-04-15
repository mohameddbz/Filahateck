import { suggestions } from '../../data/user/suggestions';
import ChatCard from '../../components/pages/user/Messagerie/ChatCard';
import { useState } from 'react';
import SearchBar from '../../components/pages/user/Messagerie/SearchBar';
import messages from '../../data/user/messages';
import Discussion from '../../components/pages/user/Messagerie/Discusion';


const Messaging = ()=> {
    
     const [Selectedfriend,setSelectedFriendId] = useState("");
     const [textSearched,setTextSearched] = useState("");

    const handleSelectChat = (id) => {
        setSelectedFriendId(id);
    };

    const  handleTextSearch  = (text)  => {
        setTextSearched(text);
    }
 
  const currentUserId  = 1 ; 

    return (
        <>
            <div className=' h-full flex flex-row gap-2'>  
                <div className='flex-1 flex flex-col justify-end'>
                    {messages  && <Discussion  listMessages={messages} currentUserId={currentUserId} /> }    
                </div>
                
                <div className='w-1/3  flex flex-col justify-end'>
                    <div className='flex border rounded-2xl h-96 overflow-y-auto no-scrollbar overflow-hidden py-2 flex-col gap-1 bg-gray-200'>
                        <SearchBar onSearch={handleTextSearch} />
                        {
                            suggestions && suggestions.map((friend)=> {
                                return <ChatCard onClick={()=>handleSelectChat(friend.id)} photo={friend.image} userName={friend.name} role={friend.role} lastConnection="4w" />
                            } )
                        }
                    </div>
                </div>
            </div>
        </>
    );
    
    
}


export default Messaging ; 