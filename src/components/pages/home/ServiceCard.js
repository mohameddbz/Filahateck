const ServiceCard = ({ title, description, image }) => {
    return (
      <div className="flex w-[450px] py-6 px-6 shrink-0 flex-col justify-center items-center text-center border-solid border-2 rounded-2xl border-myYellow non-selectable">
        <img className="w-32 h-32" src={image} alt={title} />
        <br/>
        <h1 className="text-3xl font-bold text-whiteBlue">{title}</h1>
        <br/>
        <p className="text-xl" >{description}</p>
      </div>
    );
  };
  
  export default ServiceCard;