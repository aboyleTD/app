import { PropsWithChildren } from 'react';
import { IoIosCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
interface Props {
    onClick: () => void;
    correct: boolean;
}

const CheckmarkButton = (props: PropsWithChildren<Props>) => {
    console.log("CheckmarkButton selected: ", props.correct);
    // const stylePart = props.correct ? 'bg-green-600 border-green-600 hover:text-red-400 text-white' : 'bg-red-400 hover:text-green-600 border-red-400 text-white';
    const stylePart = props.correct ? 'bg-green-600 border-green-600 hover:border-black hover:text-black text-white' : 'bg-white hover:bg-green-600 border-black text-black';

    return (
        <button
            onClick={props.onClick}
            className={`absolute top-1 right-2 rounded-lg border-2  w-9 items-center justify-center
             transition duration-200 ${stylePart}`}> 
            {/* {props.correct ? <IoIosCheckmark size={30} /> : <RxCross2 size={30} />}  */}
            <IoIosCheckmark size={30} /> 
            {props.children}
        </button>
    );
};

export default CheckmarkButton;
