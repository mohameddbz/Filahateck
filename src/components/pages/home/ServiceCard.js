const ServiceCard = ({ title, description, image }) => {
  return (
    <div className="flex w-full max-w-[450px] py-4 sm:py-6 px-3 sm:px-6 shrink-0 flex-col justify-center items-center text-center border-solid border-2 rounded-2xl border-myYellow non-selectable">
      <img className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32" src={image} alt={title} />
      <br className="hidden sm:block" />
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-whiteBlue mt-2 sm:mt-0">{title}</h1>
      <br className="hidden sm:block" />
      <p className="text-base sm:text-lg md:text-xl mt-1 sm:mt-0">{description}</p>
    </div>
  );
};

export default ServiceCard;