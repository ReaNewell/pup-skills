import React from 'react';
import { Link } from 'react-router-dom';

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
                <div>
                    <Link to='/settings'>Edit Profile</Link>
                </div>
            </div>
        )
    };
};

export default DashboardSideBar;