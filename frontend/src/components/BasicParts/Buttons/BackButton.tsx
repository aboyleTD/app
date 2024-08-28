interface Props {
    onClick: () => void;
}

const IconButton = (props: Props) => {
    return (
        <button
            onClick={props.onClick}
            className="flex aspect-square w-9 items-center justify-center self-start rounded-lg transition duration-200 hover:bg-light-gray">
        </button>
    );
};

export default IconButton;
