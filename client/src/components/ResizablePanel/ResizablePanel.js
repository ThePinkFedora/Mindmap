import { useState } from 'react';
import './ResizablePanel.scss';

function ResizablePanel({initialWidth=350}){
    const [width,setWidth] = useState();
    return (
        <div className="resizable-panel" style={{width:width+"px"}}>
        
        </div>
    );
}
export default ResizablePanel;