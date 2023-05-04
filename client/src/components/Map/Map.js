import { useContext } from 'react';
import './Map.scss';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { NodesContext, SelectionContext } from '../Workspace/Workspace';

function Map() {
    const nodes = useContext(NodesContext);
    const selection = useContext(SelectionContext);


    return (
        <section className="map">
            <TransformWrapper>
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%", }}>
                    <div className="map__sheet"></div>
                </TransformComponent>
            </TransformWrapper>
        </section >
    );
}
export default Map;