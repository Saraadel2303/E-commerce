import React, { useContext } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../contexts/authContext';



export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {isLoggedIn , setIsLoggedIn} = useContext(authContext);
  const navigate = useNavigate();

  const menuItems = [
    {label:"Home" , href:'/'},
    {label:"Categories" , href:'/categories'},
    {label:"Brands" , href:'/brands'},
    {label:"Orders" , href:'/allorders'},
    {label:"Cart" , href:'/cart'},
    {label:"Wish List" , href:'/wishList'},
  ];

function logout(){
  setIsLoggedIn(false);
  localStorage.removeItem('token');
  navigate("/login");

}



return (
  <Navbar
    className="border-b border-divider"
    isMenuOpen={isMenuOpen}
    onMenuOpenChange={setIsMenuOpen}
  >
    <NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
      <i className="fa-solid fa-cart-shopping text-green-800 me-3"></i>
        <p className="font-bold text-inherit text-lg">Fresh Cart</p>
      </NavbarBrand>
    </NavbarContent>

    {isLoggedIn && (
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link color="foreground" to={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    )}

    {isLoggedIn ?
      <NavbarContent justify="end">
    
      <NavbarItem>
        <Button onPress={logout} as={Link} color="danger" variant="flat">
         Sign Out
        </Button>
      </NavbarItem>
    </NavbarContent>
    :
<NavbarContent justify="end">
<NavbarItem className="hidden lg:flex">
  <Link to={"/login"}>Login</Link>
</NavbarItem>
<NavbarItem>
  <Button as={Link} color="primary" variant="flat">
    <Link to={"/register"}>Sign Up</Link>
  </Button>
</NavbarItem>
</NavbarContent>
    }

   {
    isLoggedIn &&
    <NavbarMenu>
    {menuItems.map((item, index) => (
      <NavbarMenuItem
        onClick={() => setIsMenuOpen(false)}
        key={`${item}-${index}`}
      >
        <Link
          className="w-full"
          color={"foreground"}
          to={item.href}
          size="lg"
        >
          {item.label}
        </Link>
      </NavbarMenuItem>
    ))}
  </NavbarMenu>
   }
  </Navbar>
);
}

