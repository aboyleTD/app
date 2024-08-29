import { ChangeEvent } from 'react';
import { EnumDisplay } from '../../../types/SettingTypes';

interface Props {
    radioID: string;
    currentCategory: string;
    onChange: (newValue: string) => void;
    categories: Array<EnumDisplay>;
}

const RadialSelector = (props: Props) => {
    // console.log("RadialSelector props: ", props);
    // console.log("RadialSelector props.currentCategory: ", props.currentCategory);

    return (
        <div className="relative flex gap-5 top-2 mb-6 ml-1">
                {props.categories.map((category, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name={props.radioID}
                            value={category.key}
                            checked={props.currentCategory === category.key}
                            onChange={() => props.onChange(category.key)}
                            className="radial-selector-input"
                        />
                        <span className="radial-selector-indicator"></span>
                        <span className="radial-selector-text"> {category.value}</span>
                    </label>
                ))}
        </div>
    );
};

export default RadialSelector;
