import { createContext, useContext, useState, useEffect } from 'react';
import {userSignUp, userSignIn, userSignOut, updateProfileData, sendActivationCode, getProfileData, resendActivationCode, getForgottenPasswordCode, passwordReset , sendForgottenPasswordData, getCountryListOrNumbers, getUserNumbers, claimNumber, deleteUserNumber, getNumberMessages} from './services/API'
import { base_API_URL } from './services/API';
export const UserDataContext = createContext(null);

function localStorageToState({ itemName, stateSetters = null, update = false }) {

    if (itemName === 'userToken') {
            const storedToken = localStorage.getItem('userToken');
            const data = storedToken && storedToken != 'undefined'? JSON.parse(storedToken) : null
            return update? stateSetters['userToken'](data) : data
    };
    if (itemName === 'userData') {
            const storedData = localStorage.getItem('userData');
             
            const data = storedData && storedData != 'undefined'? JSON.parse(storedData) : null
            return update? stateSetters['userData'](data) : data
    };
    if (itemName === 'tempNewSignupData') {
            const StoredtempNewSignupData = localStorage.getItem('tempNewSignupData'); 
            const data = StoredtempNewSignupData && StoredtempNewSignupData != 'undefined'? JSON.parse(StoredtempNewSignupData) : null
            return update? stateSetters['tempNewSignupData'](data) : data

    };
    if (itemName === 'themeType') {
            const storedThemeType = localStorage.getItem('themeType'); 
            const data =  storedThemeType && storedThemeType != 'undefined'? JSON.parse(storedThemeType) : 'Dark'
            return update? stateSetters['themeType'](data) : data
    };
}

export function UserAuthProvider({ children }) {

    const [themeType, setThemeType] = useState(() => localStorageToState({ itemName: 'themeType' }));
    const [userToken, setUserToken] = useState(() => localStorageToState({ itemName: 'userToken' }));
    const [userData, setUserData] = useState(() => localStorageToState({ itemName: 'userData' }));
    const [tempNewSignupData, settempNewSignupData] = useState(() => localStorageToState({ itemName: 'tempNewSignupData' }));
    
    useEffect(() => {
        const handleStorageChange = (event) => {
            localStorageToState({
                itemName: event.key,
                stateSetters: {
                    'themeType': setThemeType,
                    'userToken': setUserToken,
                    'userData': setUserData,
                    'tempNewSignupData': settempNewSignupData
                },
                update: true
            });
        }        
        window.addEventListener('storage', handleStorageChange);
    
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);


      function storeToken(token) {
        if (token === null) {
            localStorage.removeItem('userToken');
        } else {
            localStorage.setItem('userToken', JSON.stringify(token));
        }
        setUserToken(token)
    }
    
    function storeUserData(userData) {        
        if (userData === null) {
            localStorage.removeItem('userData');
        } else {
            if (userData.picture){
                userData.picture = base_API_URL + userData.picture;
            }
            localStorage.setItem('userData', JSON.stringify(userData));
        }
        setUserData(userData)
    }
    
    function storetempNewSignupData(tempNewSignupData) {
        if (tempNewSignupData === null) {
            localStorage.removeItem('tempNewSignupData');
        } else {
            localStorage.setItem('tempNewSignupData', JSON.stringify(tempNewSignupData));
        }
        settempNewSignupData(tempNewSignupData)
    }

    function storeThemeType(themeType) {
        if (themeType === null) {
            localStorage.removeItem('themeType');
        } else {
            localStorage.setItem('themeType', JSON.stringify(themeType));
        }
        setThemeType(themeType)
    }
    

    function loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData){
        if (responseData.message == "Authentication credentials were not provided." || responseData.detail == "Given token not valid for any token type"){
            result.errorMessage = "Please Login again."
            handleLogout()
        }
        !result.errorMessage? result.errorMessage = "There was an error" : result.errorMessage 

        return result.errorMessage
    }

    const handleToggleTheme = () => {
        themeType === 'Light'? storeThemeType('Dark') : storeThemeType('Light')
      };

    const handleSignUp = async (credentials) => {
        let result = {success: false}
        const userdata = Object.fromEntries(
            Object.entries(credentials)
                  .filter(([key, value]) => value !== "null" && value !== '')
        );
        const formUserData = new FormData();
        Object.keys(userdata).forEach(key => {
            formUserData.append(key, userdata[key]);
        });

        const response = await userSignUp(formUserData);
        const responseData = response.data
        if (responseData.success){
            storetempNewSignupData(response.data)
            result.success = true;
        } else{
            responseData.email && responseData.email[0] == "user with this email already exists." &&
                (result.errorMessage = "This email is already registered. Please Sign in.")

            if (responseData.message == "The password is too similar to the first name."){
                result.errorMessage = "Password is too similar to First Name"
            }
            if (responseData.message == "The password is too similar to the last name."){
                result.errorMessage = "Password is too similar to Last Name"
            }
            if (responseData.message == "This password is too common."){
                result.errorMessage = "This password is too common"
            }
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData)
        }
        return result;
    };

    const handleLogin = async (credentials) => {

        let result = {success: false}
        const response_1 = await userSignIn(credentials);
        const responseData_1 = response_1.data
        const response_2 = await getProfileData(responseData_1)
        const responseData_2 = response_2.data
        if (responseData_1.success && responseData_2.success){
            let token = {access: responseData_1.access, refresh: responseData_1.refresh}
            storeToken(token)
            storeUserData(responseData_2.profile_details)
            result.success = true;
        } else{
            if (responseData_2.detail == ["Given token not valid for any token type"]){
                result.errorMessage = "There was a problem. Please try again";
            }
            if (responseData_1.non_field_errors[0] == ["Invalid login credentials"]){
                result.errorMessage = "Invalid email or password";
            }
            if (responseData_1.detail == ["No active account found with the given credentials"]){
                result.errorMessage = "Activation needed";
            }
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData_1)
        }
        return result;
    };

    const handleLogout = async () => {
        const response = await userSignOut(userToken);
        storeToken(null)
        storeUserData(null)
        return response;
    };

    const handleProfileDataUpdate = async (newData, editingPassword) => {
        let result = {success: false}
        const formUserData = new FormData();
        Object.keys(newData).forEach(key => {
          if (key === 'first_name' || key === 'last_name' ||  key === 'picture') {
            formUserData.append(key, newData[key]);
          }
        });
          const passwordData = {old_password: newData.old_password,
            new_password: newData.new_password,
            confirm_new_password: newData.confirm_new_password
        }
        const response_1 = await updateProfileData(userToken, formUserData);
        const response_2 = editingPassword && await passwordReset(userToken, passwordData);
        const responseData_1 = response_1.data;
        const responseData_2 = editingPassword? response_2.data : {success: true};

        if (responseData_1.success && responseData_2.success){
            result.success = true;
            storeUserData(responseData_1.profile_details)
        } else {
            if (responseData_2.message == "old_password id wrong."){
                result.errorMessage = "Old password is incorrect"
            }
            if (responseData_2.message == "new_password must be different than old_password."){
                result.errorMessage = "New password must be different from old password"
            }
            if (responseData_2.message == "The password is too similar to the first name."){
                result.errorMessage = "Password is too similar to First Name"
            }
            if (responseData_2.message == "The password is too similar to the last name."){
                result.errorMessage = "Password is too similar to Last Name"
            }
            if (responseData_2.message == "This password is too common."){
                result.errorMessage = "This password is too common"
            }
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData_1)
        }
        
        return result;
    };

    const handleSendActivation = async ({activationCode, email}) => {
        let result = {success: false}
        const response = await sendActivationCode(email, activationCode);
        const responseData = response.data
        if (responseData.success){
            result.success = true;
            storetempNewSignupData(null)
        } else{
            if (responseData.message == "account already activated"){
                result.errorMessage = "Account is already activated.";
            }
            if (responseData.message == ["there is no account associated with this email"]){
                result.errorMessage = "There is no account associated with this email"
            }
            if (responseData.message == ["Invalid activation_code"]){
                result.errorMessage = "Invalid activation code. Please try again."
            }
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData)

        }
        return result;
    };

    const handleResendActivation = async (email) => {
        let result = {success: false}
        const response = await resendActivationCode(email);
        const responseData = response.data
        if (responseData.success){
            result.success = true;
        } else{
            if (responseData.message == "account already activated"){
                result.errorMessage = "Account is already activated.";
            }
            if (responseData[0] == ["there is no account associated with this email"]){
                result.errorMessage = "There is no account associated with this email"
            }
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData)

        }
        return result;
    }

    const handleGetForgottenPasswordCode = async (email) => {
        let result = {success: false}
        const response = await getForgottenPasswordCode(email);
        const responseData = response.data
        if (responseData.password_reset_code_success){
            result.success = true;
        } else{
            if (responseData[0] == ["there is no account associated with this email"]){
                result.errorMessage = "There is no account associated with this email"
            }
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData)

        }
        return result;
    }

    const handleForgottenPassword = async (formUserData) => {
        let result = {success: false}
        const response = await sendForgottenPasswordData(formUserData);
        const responseData = response.data
        if (responseData.success){
            result.success = true;
        } else{
            if (responseData.message == ["there is no account associated with this email"]){
                result.errorMessage = "There is no account associated with this email"
            }
            if (responseData.message == ["Invalid password_reset_code"]){
                result.errorMessage = "Invalid password reset code. Please try again."
            }
            if (responseData.message == "The password is too similar to the first name."){
                result.errorMessage = "Password is too similar to First Name"
            }
            if (responseData.message == "The password is too similar to the last name."){
                result.errorMessage = "Password is too similar to Last Name"
            }
            if (responseData.message == "This password is too common."){
                result.errorMessage = "This password is too common"
            }
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData)
        }
        return result;
    };

    const handlegetCountryListOrNumbers = async (params = null) => {
        let result = {success: false}
        const response = await getCountryListOrNumbers(userToken, params);
        console.log(response)
        const responseData = response.data
        if (responseData.success){
            result.success = true;
            result.content = responseData.countries_list || responseData.numbers_list
        } else{
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData)
        }
        return result;
    }

    const handlegetUserNumbers = async () => {
        let result = {success: false}
        const response = await getUserNumbers(userToken);
        const responseData = response.data
        if (responseData.success){
            result.success = true;
            result.content = responseData.numbers_list
        } else{
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData)
        }
        return result;
    }

    const handleClaimNumber = async (number_id) => {
        let result = {success: false}
        const response = await claimNumber(userToken, number_id);
        const responseData = response.data
        if (responseData.success){
            result.success = true;
        } else{
            if (responseData.message == "You reached you maximum numbers limit."){
                result.errorMessage = "You reached the maximum number of claimed numbers."
            }
            if (responseData.message == "number_id must be integer."){
                result.errorMessage = "There was a problem."
            }
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData)
        }
        return result;
    }

    
    const handleDeleteNumber = async (number_id= null) => {
        let result = {success: false}
        const response = await deleteUserNumber(userToken, number_id);
        const responseData = response.data
        if (responseData.success){
            result.success = true;
            console.log(responseData)
            console.log('flag')

        } else{
            console.log('flag')
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData)
        }
        return result;
    }

    const handleGetNumberMessages = async (number_id) => {
        let result = {success: false}
        const response = await getNumberMessages(userToken, number_id);
        const responseData = response.data
        if (responseData.success){
            result.success = true;
            console.log(responseData)
            result.content = responseData.number_messages

        } else{
            if (responseData.message == "UserNumber matching query does not exist."){
                result.errorMessage = "Number is Unavailable"
            }
            result.errorMessage = loginErrorOrGenericErrorMessageIfNoneSpecific(result, responseData)
        }
        return result;
    }


    return (
        <UserDataContext.Provider value={{themeType, setThemeType, userToken, userData, tempNewSignupData, handleToggleTheme , handleSignUp, handleLogin, handleLogout, handleProfileDataUpdate, handleSendActivation, handleResendActivation, handleGetForgottenPasswordCode, handleForgottenPassword, handlegetCountryListOrNumbers, handlegetUserNumbers, handleClaimNumber, handleDeleteNumber, handleGetNumberMessages }}>
            {children}
        </UserDataContext.Provider>
    );
}

export function useAuth() {
    return useContext(UserDataContext);
}