import { TestFormat } from "../../types/SettingTypes";

export const getRandomInt = (min:number, max:number) => {
    // The maximum is exclusive and the minimum is inclusive
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

export const createIndexArray = (len:number, lowerBound:number, upperBound:number, format: TestFormat) => {
    console.log("Invoke create index array")
    let indexArray = Array<number>(len);
    if (format === TestFormat.Random) {
        for (let i = 0; i < len; i++) {
            indexArray[i] = getRandomInt(lowerBound,upperBound);
        }
    } else if (format === TestFormat.Sequential) {
        for (let i = 0; i < len; i++) {
            indexArray[i] = ((i % (upperBound-lowerBound)) + lowerBound);
        }
    } else {
        console.log("Invalid Test Format");
    }
    return indexArray;
}

export const modulus = (a:number, b:number) => {
    //Implementing the modulus function that works for negative numbers
    return ((a % b) + b) % b;
}
