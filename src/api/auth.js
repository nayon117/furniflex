import axiosPublic from ".";

// save user information to database
export const saveUser = async (user) => {
    const currentUser = {
        name:user?.displayName,
        email: user?.email,
        role: 'user',
        image:user?.photoURL
        
    }
    const { data } = await axiosPublic.put(`/users/${user?.email}`,currentUser)
    return data;
}