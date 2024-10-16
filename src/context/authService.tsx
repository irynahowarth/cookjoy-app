export const loginService = (credentials) => {
    if (credentials.email === 'user@user.com' && credentials.password === '123') {
      return { success: true, user: { name: 'Admin' } };
    } else {
      throw(
        { success:false, message: 'Invalid credetials'})
    }
  };  
  