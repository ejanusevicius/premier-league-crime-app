import axios from "axios";
import { useState } from "react";

type HookConfig = { defaultLoadingState?: boolean };
export function useHttp(config?: HookConfig) {
    const { defaultLoadingState } = config || {};
    const [loading, setLoading] = useState(defaultLoadingState ? defaultLoadingState : false);

    async function get(endpoint: string) {
        const axiosResponse = await axios(endpoint);
        const { data: { message: body } } = axiosResponse;
        return body;
    }

    return { get, loading, setLoading };
};