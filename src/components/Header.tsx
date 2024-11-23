import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div style={{ display: "Flex", gap:"20px", textDecoration:"none", justifyContent:"center", color:"black" }}>
            <NavLink style={{textDecoration:"none", fontWeight:"bold", color:"tomato"}} to="/">Home</NavLink>
            <NavLink style={{textDecoration:"none", fontWeight:"bold", color:"tomato"}} to="/login">Login</NavLink>
            <NavLink style={{textDecoration:"none", fontWeight:"bold", color:"tomato"}} to="/profile">Profile</NavLink>
            
        </div>
    );
};

export default Header;