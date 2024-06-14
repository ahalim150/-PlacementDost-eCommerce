import axios from "axios";
import { useEffect, useState } from "react";




export function useFetch(api){

    const { data, setData } = useState()

    useEffect( () => {
        (async function () {
            let { data } = await axios.get(api);
            setData(data.data);
        })();
    }, [])
    return data;
}