import {atom} from 'recoil'

var sessiontitlee = atom({
    key : 'sessiontitlee',
    default : [{
        id : '',
        error : false,
        errormessage : ''
    }]
});


var sessiondiscriptionn= atom({
    key : 'sessiondiscriptionn',
    default : [{
        id : '',
        error : false,
        errormessage : ''
    }]
});

var sessiondatee = atom({
    key : 'sessiondatee',
    default : [{
        id : '',
        error : false,
        errormessage : ''
    }]
});

var sessiontimee = atom({
    key : 'sessiontimee',
    default :[ {
        id : '',
        error : false,
        errormessage : ''
    }]
});


var dynamicformdataa = atom({
    key : 'sessiontimee',
    default : []
});


var dynamicformdataa = atom({
    key : 'sessiontimee',
    default : []
});

var triggersend= atom({
    key : 'triggersend',
    default : false
});

var activestepp= atom({
    key : 'activestepp',
    default : 0
});

export {sessiondiscriptionn , sessiontitlee , dynamicformdataa , sessiondatee , triggersend  , activestepp ,  sessiontimee}