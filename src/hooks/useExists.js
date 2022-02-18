import {useEffect, useState} from "react";

async function exists(url) {
    const result = await fetch(url, {method: 'HEAD'});
    return result.ok;
}

const useExists = (url) => {
    const [isExists, setIsExists] = useState(false);

    useEffect(() => {
        exists(url)
            .then(() => setIsExists(false))
            .catch(() => setIsExists(true))
    }, [url])

    return isExists
}

export default useExists;