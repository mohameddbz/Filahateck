import React, {useState, useContext , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from './../../../../context/LanguageContext';
import { Link, Navigate } from 'react-router-dom';
import InputEmail from '../common/InputEmail';
import InputText from '../SignUp/InputText';
import InputPhone from '../SignUp/InputPhon';
import SelectorWilaya from '../SignUp/SelectorWilaya';
import InputPassword from '../common/InputPassword';
import ButtonConfirm from './../common/ButtonConfirm';
import SelectorRole from './../SignUp/selectedRole';
import translations from './../../../../utils/constant/SignUp'; 
import {makeRequest} from './../../../../utils/api/httpService'
import Error from './../../../common/Error'
import Success from './../../../common/Success';

const SignUpForm = () => {
  const { isArabic } = useContext(LanguageContext);
  const navigate = useNavigate();
  const text = isArabic ? translations.arabic : translations.french;

   // Form State
   const [formData, setFormData] = useState({
    email: '',
    Name:'',
    password: '',
    confirmPassword: '',
    role: '2',
    phone_number:'',
    wilaya:'',
    sellerRole : ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess,setShowSuccess] = useState(false);
  const [showError,setShowError] = useState(false);  
  const [sellerRoles, setSellerRoles] = useState([]);
  useEffect(() => {
   const fetchRoles = async () => {
    try {
      const response = await makeRequest('/sellerRoles', 'GET');
    
      
      const transformedOptions = response.data.data.map((role) => ({
        value: role.id, // Utilisez l'ID comme valeur
        label: role.roleName, // Utilisez le label en anglais
        labelArabic: role.roleName, // Utilisez le label en arabe
      }));
      setSellerRoles(transformedOptions);
    } catch (error) {
      setErrorMessage(error);
    }
   }
  fetchRoles();

  }, []);

   const handleErrorShow=()=>{
    setShowError(false) 
  }
  const handleSuccessShow=()=>{
    setShowSuccess(false)
    navigate("/auth/SignIn")
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
     
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage(text.passwordMismatch);
      return;
    }
    const data = {
      email: formData.email,
      userName: formData.Name,
      password: formData.password,
      phone_number: formData.phone_number,
      profile_picture: 'profile.jpg',
      wilaya: formData.wilaya,
      role_id: formData.role,
      sellerRole_id : formData.role === '6' ? formData.sellerRole : ''
    };

    try {
     

      const response = await makeRequest('/auth/register', 'POST', data);
      console.log(response)
      if (response.status === 201){
        setSuccessMessage(text.accountCreated);
        setShowSuccess(true);
      }
      if (response.status === 400){
        setErrorMessage(text.emailAlreadyUsed);
        setShowError(true);
      }
     
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-myGreen text-2xl font-bold mb-2 text-center">
        {text.createAccount}
      </h2>
      <form onSubmit={handleSubmit}>
        <InputText value={formData.Name} onChange={handleInputChange} />
        <InputPhone value={formData.phone_number} onChange={handleInputChange} />
        <InputEmail value={formData.email} onChange={handleInputChange} />
        <InputPassword
          text="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <InputPassword
          text="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <SelectorWilaya value={formData.wilaya} onChange={handleInputChange} />
        <SelectorRole
          value={formData.role}
          onChange={handleInputChange}
          options={[
            { value: '2', label: 'Farmer', labelArabic: 'الفلاح' },
            { value: 'Investor', label: 'Investor', labelArabic: 'ممول' },
            { value: '6', label: 'Vendeur', labelArabic: 'بائع' }
          ]}
        />
        {
          formData.role === '6' && (
            <SelectorRole
              value={formData.sellerRole}
              onChange={handleInputChange}
              options={sellerRoles}
              name='sellerRole'
            />
          )
        }
       
        <ButtonConfirm text={text.createAccount} />
      </form>
        {/* Error Message */}
        {showError && <Error message={errorMessage} onClose={handleErrorShow} />}

        {/* Success Message */}
        {showSuccess &&   <Success message={successMessage} onClose={handleSuccessShow} />
        }
      <div className="mt-4 text-center">
        <p className="text-sm">
          {text.alreadyHaveAccount}{' '}
          <Link to="/auth/SignIn" className="text-myGreen">
            {text.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
