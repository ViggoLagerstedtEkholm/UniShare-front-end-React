import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Request} from "./Requests/Request";

function Overview() {
    return (
        <div className="container">
            <div className="content-container">
                <div className="flex-item">
                    <div className="user-content">
                        <Tabs>
                            <TabList>
                                <Tab>Course requests</Tab>
                            </TabList>

                            <TabPanel>
                                <Request/>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
