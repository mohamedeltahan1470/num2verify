import axios from 'axios';

//export const base_API_URL = 'https://philosophical-amity-mgcenter-8000e7e0.koyeb.app';
export const base_API_URL = 'http://ec2-18-214-13-65.compute-1.amazonaws.com:5000';

export async function userSignUp(formUserData) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/register/', formUserData, { headers: { 'Content-Type': 'application/json' } });
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error in userSignUp:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function userSignIn(formUserData) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/login/', formUserData, { headers: { 'Content-Type': 'application/json' } });
        return response;
    } catch (error) {
        console.error('Error in userSignIn:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function userSignOut(userToken) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/logout/', { refresh: userToken?.refresh },
            { headers: { 'Authorization': 'Bearer ' + userToken?.access, 'Content-Type': 'application/json' } }
        );
        return response;
    } catch (error) {
        console.error('Error in userSignOut:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function passwordReset(userToken, newPasswordData) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/password-reset/', {
            old_password: newPasswordData.old_password,
            new_password: newPasswordData.new_password,
            confirm_new_password: newPasswordData.confirm_new_password
        }, { headers: { 'Authorization': 'Bearer ' + userToken?.access, 'Content-Type': 'application/json' } });

        return response;
    } catch (error) {
        console.error('Error in passwordReset:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function updateProfileData(userToken, newData) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/profile/', newData,
        { headers: { 'Authorization': 'Bearer ' + userToken?.access, 'Content-Type': 'application/json' } });

        return response;
    } catch (error) {
        console.error('Error in updateProfileData:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function getProfileData(userToken) {
    try {
        const response = await axios.get(base_API_URL + '/api/user/profile/',
            { headers: { 'Authorization': 'Bearer ' + userToken?.access, 'Content-Type': 'application/json' } }
        );
        return response;
    } catch (error) {
        console.error('Error in getProfileData:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function sendActivationCode(email, activation_code) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/activation-code/',
            { email: email, activation_code: parseInt(activation_code, 10) },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response;
    } catch (error) {
        console.error('Error in sendActivationCode:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function resendActivationCode(email) {
    try {
        const response = await axios.get(base_API_URL + '/api/user/activation-code/', {
            params: { 'email': email },
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (error) {
        console.error('Error in resendActivationCode:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}



export async function getForgottenPasswordCode(email) {
    try {
        const response = await axios.get(base_API_URL + '/api/user/forget-password/', {
            params: { 'email': email },
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (error) {
        console.error('Error in getForgotForgottenPasswordCode:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}


export async function sendForgottenPasswordData(formUserData) {
    try {
        const response = await axios.post(base_API_URL + '/api/user/forget-password/', formUserData,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response;
    } catch (error) {
        console.error('Error in sendActivationCode:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function getCountryListOrNumbers(userToken, params = null) {
    console.log(userToken)
    try {
        const response = await axios.get(`${base_API_URL}/api/numbers/list/`,
            {
            params: params,
            headers: {'Authorization': `Bearer ${userToken?.access}`, 'Content-Type': 'application/json'}
        });
        return response;
    } catch (error) {
        console.error('Error in getCountryListOrNumbers:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function getUserNumbers(userToken) {
    try {
        const response = await axios.get(`${base_API_URL}/api/user/numbers/`,
            {
            headers: {'Authorization': `Bearer ${userToken?.access}`, 'Content-Type': 'application/json'}
        });
        return response;
    } catch (error) {
        console.error('Error in getUserNumbers:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function claimNumber(userToken, number_id) {
    console.log(userToken)
    try {
        const response = await axios.post(`${base_API_URL}/api/user/numbers/`,
            {number_id: number_id},
            {
            headers: {'Authorization': `Bearer ${userToken?.access}`, 'Content-Type': 'application/json'}
        });
        return response;
    } catch (error) {
        console.error('Error in claimNumber:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function deleteUserNumber(userToken, number_id= null) {
    console.log(userToken)
    try {
        const response = await axios.delete(`${base_API_URL}/api/user/numbers/`,
            {params:{number_id: number_id},
            headers: {'Authorization': `Bearer ${userToken?.access}`, 'Content-Type': 'application/json'}
        });
        return response;
    } catch (error) {
        console.error('Error in deleteUserNumber:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}

export async function getNumberMessages(userToken, number_id) {
    try {
        const response = await axios.get(`${base_API_URL}/api/user/number/messages/`,
            {
            params:{user_number_id : number_id},
            headers: {'Authorization': `Bearer ${userToken?.access}`, 'Content-Type': 'application/json'}
        });
        return response;
    } catch (error) {
        console.error('Error in getNumberMessages:', error);
        return error.response || { error: error.message || 'An error occurred' };
    }
}