import Inspector from '../Inspector/Inspector';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import './Workspace.scss';

function Workspace(){
    return (
        <main className="workspace">
            <Sidebar/>
            <Map/>
            <Inspector/>
        </main>
    );
}
export default Workspace;