import { IoArrowBack } from "react-icons/io5";
interface Props {
    onClick: () => void;
}

const BackButton = (props: Props) => {
    return (
        <button
            onClick={props.onClick}
            className="absolute top-3 right-5 flex aspect-square w-9 items-center justify-center self-start rounded-lg transition duration-200 hover:bg-light-gray">
            <IoArrowBack size={40} />
        </button>
    );
};

export default BackButton;
