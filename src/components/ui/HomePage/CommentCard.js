import { IoIosHeart } from "react-icons/io";
import image  from "../../../images/solutions/agreculteur.png"


const CommentCard = ({userName,photo,commentText,date,nbJaime}) => {
    return (
      <div className="flex-col border shrink-0 py-6 pb-3 px-4 bg-backgroundComment border-solid rounded-2xl w-[450px] non-selectable">
       <div className=" flex flex-row items-center space-x-4" >
        <img  className="w-10 h-10 rounded-full object-cover"  src={photo}/>
         <p className="text-xl font-bold">
          {userName}
         </p>
       </div>
       <br/>
       <p className="line-clamp-3 font-medium">
      {commentText}
       </p>
       <br/>
       <div className="flex flex-row text-lg font-medium justify-between">
        <p>
            {date}
        </p>
        <div className="flex flex-row items-center">
        <p>{nbJaime}</p>
        <IoIosHeart  color="red"/>
        </div>
       </div>
      </div>
    )
}

export default CommentCard ; 