import { useEffect, useState } from "react"
import { server_calls } from "../api/server"

export const useGetData = () => {
    // Rename contactData to fighterData to better reflect the data it handles
    const [fighterData, setFighterData] = useState<[]>([])

    async function handleDataFetch() {
        const result = await server_calls.get();
        setFighterData(result)
    }

    // useEffect to call handleDataFetch on component mount
    useEffect(() => {
        handleDataFetch();
    }, [])

    // Return the fighterData and the getData function for re-fetching the data
    return { fighterData, getData: handleDataFetch }
}
