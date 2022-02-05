// import { namee } from '../../containers/Conference';
// // import {vroomHandle} from './StartJanusServerRoom';

// class apicaller{
//     create(myroom,res)
//     {
//         const register  = {
//         "request" : "create",
//         "room" : myroom,
//         "permanent" : false,
//         "description" : localStorage.getItem('role') + " " + namee,
//     }
//     vroomHandle.send({ "message": register,'success': reg});
//     this.joinroom(myroom,res);

//     function reg(ms){
//                 console.log(ms)
//                 return true;
//                     }    
//                 }

//     joinroom(myroom,res) {
//         const role = localStorage.getItem('role');
//         const register =  {"request": "join", "room": myroom, "ptype": "publisher","display": role + " " + namee}
//                 console.log("join register",register)
//                     vroomHandle.send({ "message": register,'success': reg});
//                     function reg(ms){
//                     console.log(ms)
//             }
//     } 
// }

// var api = new apicaller();

// export default api