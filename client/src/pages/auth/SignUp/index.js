
import SignUpForm from '../../../components/pages/auth/forms/signUpForm';
import SignupImage from './../../../assets/auth/SignUp/image.jpg'


const SignUp = () => {
    return(
        <><div className="flex w-full items-center md:w-2/3">
            <SignUpForm />
        </div>
        <div className="hidden md:block w-2/3 ">
                <img
                    src={SignupImage}
                    alt="Plant Image"
                    className="h-full w-full" />
        </div>
        </>
    );
}

export default SignUp;