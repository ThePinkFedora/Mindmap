import './Map.scss';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function Map() {
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