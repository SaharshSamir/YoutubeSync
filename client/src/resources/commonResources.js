import axios from 'axios';

export const fetchEndpoint = async () => {
    const ENDPOINT = await axios.get('/api/endpoint');

    return ENDPOINT;
}