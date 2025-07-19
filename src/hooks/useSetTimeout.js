import { useEffect } from "react";

export function useSetTimeout({delay,logicToExecute}){    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            logicToExecute();
        },delay);    
        return ()=> clearTimeout(timer)
    },[]);
};