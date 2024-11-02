const SolutionCard = ({title,image}) => {
    return(
        <div   className="flex border-solid rounded-2xl  overflow-hidden  shadow-bottom-right flex-col w-80">
            <img src={image}/>
           
           <div className="flex justify-center h-full items-center">
                 <p  className="text-whiteBlue  py-4 px-12  text-center text-2xl font-semibold">
                {title}
            </p>
           </div>
           
        </div>
    )
}

export default SolutionCard ; 