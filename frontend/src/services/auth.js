// set the browser data so it can be loged until token expire
export const setToken = (token) =>{
 localStorage.setItem('apiKey', token)
}


export const getToken = () =>{
 return localStorage.getItem('apiKey')
}

export const logout = () => {
 localStorage.removeItem('apiKey')
}