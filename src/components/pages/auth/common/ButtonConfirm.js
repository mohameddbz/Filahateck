

const  ButtonConfirm = ({text}) => {
    return (
        <button 
          type="submit" 
          className="bg-myOrange text-white p-2 w-full rounded">
          {text}
        </button>
    );
}

export default ButtonConfirm;