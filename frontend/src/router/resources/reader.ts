import {axiosClient_reader} from '../apiClient';
import { basicResponse } from '../../types/responseTypes';

export function getHello(): Promise<basicResponse | undefined> {
    const promise = axiosClient_reader.get<basicResponse>('hello');
    console.log("Trying to send request to /hello");
    return promise
        .then(res => {
            console.log("Received response from /hello", res.data);
            return res.data;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}