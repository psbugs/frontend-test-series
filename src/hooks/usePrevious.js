import { useRef } from "react";

export function usePrevious(value){
    const ref = useRef();
    ref.current = value;
    return ref.current;
};