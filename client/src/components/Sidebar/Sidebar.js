import './Sidebar.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function Sidebar() {
    return (
        <section className="sidebar">
            <Tabs>
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Nodes</Tab>
                </TabList>

                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                
            </Tabs>
        </section>
    );
}
export default Sidebar;