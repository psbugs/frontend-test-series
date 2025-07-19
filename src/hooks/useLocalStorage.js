import { useEffect, useState } from "react";
export function useLocalStorage({key,defaultValue}){
    const [value,setValue] = useState(localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultValue );
    useEffect(()=>{
        localStorage.setItem(key,defaultValue)
    },[value,setValue]);
    return {value,setValue}
};