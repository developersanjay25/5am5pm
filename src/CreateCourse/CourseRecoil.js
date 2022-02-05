import { atom } from "recoil";

const CType = new atom ({
    key:'CType',
    default:"Public",
})

const CTypeButton = new atom ({
    key:'CTypeButton',
    default:true,
})


const Ccategory = new atom ({
    key:'Ccategory',
    default:''
})


const Ccategoryerr = new atom ({
    key:'Ccategoryerr',
    default:false
})

const CcategoryTexterr = new atom ({
    key:'Ccategoryerr',
    default:''
});


const CSub_Category = new atom({
    key:'CSub_Category',
    default:''
})


const CSub_Categoryerr = new atom({
    key:'CSub_Categoryerr',
    default:''
})


const CSub_Categorytexterr = new atom({
    key:'CSub_Categorytexterr',
    default:''
})

const Cvideo = new atom({
    key:'Cvideo',
    default:'',
})

const CLevel = new atom({
    key:'CLevel',
    default:'',
})

const CLeveltexterr = new atom({
    key:'CLeveltexterr',
    default:'',
})

const CReviews = new atom({
    key:'CReviews',
    default:'',
})

const CReviewstexterr = new atom({
    key:'CReviewstexterr',
    default:'',
})

const Ccount = new atom({
    key:'Ccount',
    default:'',
})

const Ccounttexterr = new atom({
    key:'Ccounttexterr',
    default:'',
})

const Cabout = new atom({
    key:'Cabout',
    default:'',
})

const Cabouttexterr = new atom({
    key:'Cabouttexterr',
    default:'',
})

const Cinstructor = new atom({
    key:'Cinstructor',
    default:'',
})

const Cinstructortexterr = new atom({
    key:'Cinstructortexterr',
    default:'',
})

const Ctitle = new atom({
    key:'Ctitle',
    default:'',
})

const Ctitleerr = new atom({
    key:'Ctitleerr',
    default:'',
})
const Ctitletexterr = new atom({
    key:'Ctitletexterr',
    default:'',
})
const CaboutTitle = new atom({
    key:'CaboutTitle',
    default:'',
})

const CaboutTitleerr = new atom({
    key:'CaboutTitleerr',
    default:'',
})
const CaboutTitletexterr = new atom({
    key:'CaboutTitletexterr',
    default:'',
})
const Cdate = new atom({
    key:'Cdate',
    default:'',
})

const Cdateerr = new atom({
    key:'Cdatetexterr',
    default:'',
})

const Ctime = new atom({
    key:'Ctime',
    default:'',
})

const Ctimeerr = new atom({
    key:'Ctimetexterr',
    default:'',
})

const Cpay = new atom({
    key:'Cpay',
    default:'',
})

const Camount = new atom({
    key:'Camount',
    default:'',
})

const Cname = new atom({
    key:'Cname',
    default:'',
})

const Cnameerr = new atom({
    key:'Cnameerr',
    default:'',
})

const Cnametexterr = new atom({
    key:'Cnametexterr',
    default:'',
})

const CSubname = new atom({
    key:'CSubname',
    default:'',
})

const CSubnameerr = new atom({
    key:'CSubnameerr',
    default:'',
})

const CSubnametexterr = new atom({
    key:'CSubnametexterr',
    default:'',
})
const Cimage = new atom({
    key:'Cimage',
    default:'',
})

const Cimageerr = new atom({
    key:'Cimageerr',
    default: false,
})

const Cimagetexterr = new atom({
    key:'Cimagetexterr',
    default:'',
})

const CpreLoader = new atom({
    key:'CpreLoader',
    default:false,
})

const nextStep = new atom({
    key:'nextStep',
    default:''
})

const checkfornextStep = new atom({
    key:'checkfornextStep',
    default:false
})
 
export {
    CType,
    Ccategory,
    Ccategoryerr,
    CcategoryTexterr,
    CSub_Category,
    CSub_Categoryerr,
    CSub_Categorytexterr,
    Cvideo,
    CLevel,
    CLeveltexterr,
    CReviews,
    CReviewstexterr,
    Ccount,
    Ccounttexterr,
    Cabout,
    Cabouttexterr,
    Cinstructor,
    Cinstructortexterr,
    Ctitle,
    Ctitleerr,
    Ctitletexterr,
    CaboutTitle,
    CaboutTitleerr,
    CaboutTitletexterr,
    Cdate,
    Cdateerr,
    Ctime,
    Ctimeerr,
    Cpay,
    Camount,
    Cname,
    Cnameerr,
    Cnametexterr,
    CSubname,
    CSubnameerr,
    CSubnametexterr,
    Cimage,
    Cimageerr,
    Cimagetexterr,
    CTypeButton,
    CpreLoader,
    nextStep,
    checkfornextStep,
        };