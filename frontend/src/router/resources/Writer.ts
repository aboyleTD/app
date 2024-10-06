import { axiosClientWriter } from '../apiClient';
// import { basicResponse } from '../../types/ResponseTypes';
// import { Compendium } from '../../types/DataTypes';
import { CompendiumCreationRequest, DeckCreationRequest } from '../../types/RequestTypes';

export async function requestCompendiumCreation(CompendiumCreationRequest: CompendiumCreationRequest): Promise<any> {
    console.log("Requesting Compendium Creation with Request: ", CompendiumCreationRequest);
    return axiosClientWriter.post('/create/compendium', CompendiumCreationRequest);
}

export async function requestDeckCreation(request: DeckCreationRequest): Promise<any> {
    console.log("Requesting Compendium Creation with Request: ", request);
    return axiosClientWriter.post('/create/deck', request);
}