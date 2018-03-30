import React from 'react';

import DogList from './DogList';
import NameCard from './NameCard';

class DashboardSideBar extends React.Component {
    render() {
        return (
            <div className="dashboard-sidebar__container">
                <div className="dashboard-sidebar">
                    <NameCard />
                    <DogList />
                </div>
            </div>
        )
    };
};

export default DashboardSideBar;