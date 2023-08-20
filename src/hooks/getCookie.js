import Cookie from 'js-cookie'


const getCookie = (cookiename) => {
    return Cookie.get(cookiename)
        // const myCookie = JSON.parse(myCookieValueString)
        // return myCookie
}


export default getCookie