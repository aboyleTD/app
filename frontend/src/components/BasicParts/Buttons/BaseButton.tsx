import { PropsWithChildren } from 'react';

interface Props {
    onClick: () => void;
    order: number; // 1: primary, 2: secondary, 3: ternary
    disabled?: boolean;
    noTextPaddings?: boolean;
    pos?: number; // 1: left, 2: center, 3: right
    absolute?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const Button = (props: PropsWithChildren<Props>) => {
    let orderClasses: string;
    switch (props.order) {
        case 1:
            orderClasses =
                'bg-blue-500 hover:bg-blue-700 text-white text-white font-bold';
            break;


        default:
            return null;
    }
    if (props.absolute) {
        orderClasses += ' absolute bottom-10 right-10';
    } else {
        switch (props.pos) {
            case 1:
                orderClasses += ' self-start';
                break;
            case 2:
                orderClasses += ' self-center';
                break;
            case 3:
                orderClasses += ' self-end';
                break;
            default:
                return null;
        }
    }
    

    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            className={`flex ${props.noTextPaddings ? '' : 'px-4 py-1.5'} items-center justify-center rounded-lg ${orderClasses} transition-all duration-200 disabled:cursor-default mt-3`}>
            {props.children}
        </button>
    );
};

export default Button;
