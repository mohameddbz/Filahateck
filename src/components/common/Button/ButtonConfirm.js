

const  ButtonConfirm = ({text}) => {
    return (
        <button 
          type="submit" 
          className="bg-orange-500 text-white p-2 w-full rounded">
          {text}
        </button>
    );
}

export default ButtonConfirm;