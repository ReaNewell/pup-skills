import React from 'react';

import DogList from '../DogList';
import NameCard from '../NameCard';

class MobileDashboardSideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            barIsOpen: false
        }
    }
    toggleBar = () => {
        this.state.barIsOpen ? (
            this.setState(() => ({ barIsOpen: false }))
        ) : (
            this.setState(() => ({ barIsOpen: true }))
        )
    }
    render() {
        return (
            <div className="dashboard-sidebar" >
                <NameCard toggleBar={this.toggleBar}/>
                { this.state.barIsOpen && <DogList />}
            </div>
        )
    };
};

export default MobileDashboardSideBar;