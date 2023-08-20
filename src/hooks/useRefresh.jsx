import axios from "axios";
import { url } from "constants";
import { useContext } from "react";
import { AuthContext } from "./authContext";
import useAuth from "./useAuth";


const useGrapAuth = (props) => {

    const { setAuthState,authState } = useContext(AuthContext)
    const storedValue = localStorage.getItem('User');

    // const navigate = useNavigate()
    const userData = storedValue ? JSON.parse(storedValue) : undefined;
    // If token is already being refreshed, exit early to avoid infinite loop

    const refresh = async() => {
        try {
            const resp = await axios.post(`${url}/login/refreshToken`, { id: userData?.id });
            const data = resp.data;
            const usersData = {
                id: data.id,
                username: data.name,
                email: data.email,
                image: data.image,
                role: data.role,
                state: true,
                // Add other properties as needed
            };
            const stringFied = JSON.stringify(usersData);
            localStorage.setItem('User', stringFied);
            setAuthState({ id: data?.id, username: data?.name, email: data?.email, image: data?.image, role: data?.role, state: true });
            const token = data.token; // Store the token in a variable
            console.log('sent the refresh success');
            return console.log(token); // Return the token
        } catch (error) {
            console.error('Error from the grapauth', error);
            setAuthState({ id: '', username: '', email: '', image: '', role: '', state: false });
            throw error; // Rethrow the error to be caught by the interceptor
        }
    };

    return refresh;


};


export default useGrapAuth