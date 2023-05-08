import LinksPanel from '../LinksPanel/LinksPanel';
import NodesPanel from '../NodesPanel/NodesPanel';
import './Sidebar.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function Sidebar({onSelect, onUnlink}) {
    return (
        <section className="sidebar">
            <Tabs defaultIndex={1}>
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Nodes</Tab>
                    <Tab>Links</Tab>
                    
                </TabList>

                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <NodesPanel onSelect={onSelect}/>
                </TabPanel>
                <TabPanel>
                    <LinksPanel onSelect={onSelect} onUnlink={onUnlink}/>
                </TabPanel>
                

            </Tabs>
        </section>
    );
}
export default Sidebar;