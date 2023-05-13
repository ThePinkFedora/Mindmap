import LinksPanel from '../LinksPanel/LinksPanel';
import NodesPanel from '../NodesPanel/NodesPanel';
import OverviewPanel from '../OverviewPanel/OverviewPanel';
import './Sidebar.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function Sidebar({ onSelect, onUnlink }) {
    return (
        <section className="sidebar">
            <Tabs defaultIndex={1}>
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Nodes</Tab>
                    <Tab>Links</Tab>

                </TabList>

                <TabPanel>
                    <OverviewPanel />
                </TabPanel>
                <TabPanel>
                    <NodesPanel onSelect={onSelect} />
                </TabPanel>
                <TabPanel>
                    <LinksPanel onSelect={onSelect} onUnlink={onUnlink} />
                </TabPanel>


            </Tabs>
        </section>
    );
}
export default Sidebar;