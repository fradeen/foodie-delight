import { useEffect, useRef } from "react";

export function useDebounced(callBack: () => void, dependencies: any[], timeOut = 5000) {
    let debounceTimeout = useRef<NodeJS.Timeout | null>(null)
    let isFirstRun = useRef(true)
    useEffect(() => {
        if (isFirstRun.current)
            isFirstRun.current = false
        else {
            if (debounceTimeout.current)
                clearTimeout(debounceTimeout.current)
            debounceTimeout.current = setTimeout(() => {
                callBack()
            }, timeOut)
        }

        return () => {
            if (debounceTimeout.current)
                clearTimeout(debounceTimeout.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callBack, ...dependencies])
}

export function useThrottled(callBack: () => void, dependencies: any[], freq = 1) {
    let throttleTimeout = useRef<NodeJS.Timeout | null>(null)
    let storedCallback = useRef<(() => void) | null>(null)
    let isFirstRun = useRef(true)
    let isThrottled = useRef(false)
    useEffect(() => {
        if (isFirstRun.current)
            isFirstRun.current = false
        else {
            if (isThrottled.current) {
                storedCallback.current = callBack
            } else {
                isThrottled.current = true
                callBack()
                throttleTimeout.current = setTimeout(() => {
                    if (storedCallback.current)
                        storedCallback.current()
                    isThrottled.current = false
                }, (Math.round(1000 / freq)))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callBack, ...dependencies])
}
