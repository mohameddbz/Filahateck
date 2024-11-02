import SidebarLayout from './../../components/layout/SidebarLayout'; // Import the SidebarLayout
import Header from '../../components/layout/Header';
import ButtonLang from '../../components/common/Button/ButtonLang';
import { suggestions } from '../../utils/constant/suggestionList';
import ChatCard from '../../components/ui/main/ChatCard';
import { useState } from 'react';
import SearchBar from './../../components/ui/main/SearchBar';
import messages from '../../utils/constant/messages';
import Discussion from '../../components/Descussion/Descussion';


const MessagingPage = ()=> {
    
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
        <SidebarLayout Header={Header} ButtonLang={ButtonLang}>
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
            
        
      </SidebarLayout>
    );
    
    
}


export default MessagingPage ; 