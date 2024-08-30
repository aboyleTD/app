interface CardButtonProps {
    text: string;
    onClick: () => void;
}

const CardButton = (props: CardButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            className="bg-inherit border-2 border-gray-700 w-20 h-14 rounded-xl hover:bg-gray-200">
            {props.text}
        </button>
    );
};

export default CardButton;