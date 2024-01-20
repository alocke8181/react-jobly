import React, {useContext} from "react";
import UserContext from "./UserContext";



const Home = () =>{

    const {user, setUser} = useContext(UserContext);

    return(
        <>
            {user ? 
                <p>Welcome to Jobly, {user.username}!</p>
                :
                <p>Welcome to Jobly!</p>
            }
        </>
    )
}

export default Home;