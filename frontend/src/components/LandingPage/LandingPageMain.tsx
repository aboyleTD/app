import SideBarMain from './SideBar/SideBarMain';
import { useState } from 'react';
import { getHello } from '../../router/resources/reader';

const LandingPageMain = () => {

    const [message, setMessage] = useState('Undefined');

    const handleClick = () => {
        getHello().then((res) => {
            if (res === undefined) {
                setMessage('Error');
                return;

            }
            console.log(res);
            setMessage(res.message);
        });

    }
    
    return (
        <div className="flex flex-row items-center justify-center w-full h-full  bg-ghost-white ">
            <div className="flex flex-row items-center justify-center w-full h-full bg-white">
                <SideBarMain />
            </div>
            <div className="flex bg-ghost-white px-[3.75rem] py-8">
                <textarea className="w-20 h-20" placeholder={message} ></textarea>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
                    Click me
                </button>

            </div>
        </div>
    );
}

export default LandingPageMain;