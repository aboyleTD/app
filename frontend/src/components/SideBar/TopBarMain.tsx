import { FaPen } from 'react-icons/fa';
import IconButton from '../BasicParts/Buttons/IconButton';
import { acknowledgeClick } from '../BasicParts/Mocks/FillerFunctions';


const SideBarMain = () => {
    return (
        <div className="fixed left-3 top-3 flex flex-col gap-1">
            <IconButton onClick={acknowledgeClick}>
                <FaPen size={18} />
            </IconButton>
        </div>
    );
}

export default SideBarMain;