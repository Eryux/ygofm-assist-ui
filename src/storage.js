import { reactive } from 'vue';
import Cookies from 'js-cookie'

const defaultUserdata = {};

export const userdata = reactive({
    data: null
});

export function SaveUserdata(cookie_name)
{
    Cookies.set(cookie_name, btoa(JSON.stringify(userdata.data)), { expires: 90, sameSite: 'strict' });
}

export function LoadUserdata(cookie_name)
{
    let rawUserData = Cookies.get('userdata');

    if (rawUserData != undefined) {
      try {
        userdata.data = JSON.parse(atob(rawUserData));
      } catch(e) {
        userdata.data = defaultUserdata;
      }
    }
    else {
      userdata.data = defaultUserdata;
    }
}