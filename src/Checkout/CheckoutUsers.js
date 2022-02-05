import React from "react";

import { useRecoilState } from "recoil";
import {useryes} from './CheckoutRecoil';

import CheckoutLogin from "./CheckoutLogin";
import CheckoutSignup from "./CheckoutSignup";
import { ResetTvRounded } from "@mui/icons-material";

const CheckoutUsers = () => {

    const[isuseryes,setisuseryes] = useRecoilState(useryes);

    if(isuseryes){
        return<CheckoutLogin/>
    }else{
        return<CheckoutSignup/>
    }
  

}

export default CheckoutUsers;