const ChatCard = ({photo , userName , role , lastConnection , onClick}) => {


    return (
        <div 
         onClick={onclick}
        className="bg-white py-2 px-4 justify-between items-center flex flex-row cursor-pointer" >

            <div className="flex gap-2 flex-row">
                <img className="h-14 w-14 rounded-full" src={photo}/>
                <div className="flex flex-col">
                    <h1 className="font-semibold">{userName}</h1>
                    <p className="text-sm">{role}</p>
                </div>
            </div>

            <div>
                <p>
                 {lastConnection}
                </p>
            </div>

        </div>
    );

}

export default ChatCard