const ButtonConfirm = ({ text, onClick }) => {
  return (
      <button
        type="submit" 
        onClick={onClick}
        className="bg-myOrange text-white p-2 w-full rounded"
      >
        {text}
      </button>
  );
};

export default ButtonConfirm;