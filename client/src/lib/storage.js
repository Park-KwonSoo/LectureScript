//localStorage
const store = {
    set : (key, object) => {
        if(!localStorage)   return;
        localStorage[key] = (typeof object) === 'string' ? object : JSON.stringify(object);
    },
    get : (key) => {
        if(!localStorage)   return;
        if(!localStorage[key])  return null;

        try {
            const parsed = JSON.parse(localStorage[key]);
            return parsed;
        }   catch(e) {
            return localStorage[key];
        }
    },
    remove : (key) => {
        if(!localStorage)   return;
        if(!localStorage[key])  return null;

        localStorage.removeItem(key);
    }
};

export default store;