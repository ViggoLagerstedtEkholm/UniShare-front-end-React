import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

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

                            <br/>

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
