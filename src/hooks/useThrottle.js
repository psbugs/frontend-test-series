import { useEffect, useState } from "react"

export function useThrottle({value,delay}){
    const [throttleValue,setThrottleValue] = useState();
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setThrottleValue(value);
        },delay);
        return ()=> clearTimeout(timer);
    },[]);

    return throttleValue;
}