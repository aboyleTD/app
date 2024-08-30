import { useState } from "react";
import { Compendium } from "../../types/DataTypes";
import CompendiumPage from "./CompendiumPage"
import { getCollections } from "../../router/resources/Reader"
const MainPage = () => {
    const [initCompendium, setInitCompendium] = useState<Compendium | undefined>(undefined);
    const [loaded,setLoaded] = useState<boolean>(false);
    if (!loaded){
        getCollections().then((res) => {
            setInitCompendium(res);
            setLoaded(true);

        });
    }
    
    return (
        <>
            {initCompendium !== undefined &&
            <div className="fixed bottom-0 left-0 right-0 top-0 bg-ghost-white">
                <CompendiumPage compendium={initCompendium} />
            </div>}
        </>
        
    )
}
export default MainPage;