import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className=" flex justify-center items-center gap-3 w-full bg-black">
            <NavLink style={{textDecoration:"none", fontWeight:"bold", color:"tomato"}} to="/">Home</NavLink>
            <NavLink style={{textDecoration:"none", fontWeight:"bold", color:"tomato"}} to="/login">Login</NavLink>
            <NavLink style={{textDecoration:"none", fontWeight:"bold", color:"tomato"}} to="/profile">Profile</NavLink>
            
        </div>
    );
};

export default Header;