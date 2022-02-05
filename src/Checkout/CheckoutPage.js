import React from "react";
import MenuBar from "../Home/AppBar/AppBar";
import AppBar2 from "../Home/AppBar2/AppBar2";

//files
import CheckoutContent from "./CheckoutContent";

const CheckoutPage = () => {
    return(
        <React.Fragment>
            <MenuBar/>
            <AppBar2/>
            <CheckoutContent/>
        </React.Fragment>
    );
}
export default CheckoutPage;