import { useEffect } from "react"

const useTitle = title => {
    useEffect(()=>{
        document.title = `${title} | Athletic Excellence School`
    },[title])
}


export default useTitle;