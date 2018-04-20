import React from 'react';
import DogList from '../DogList';
import NameCard from '../NameCard';

export default class MobileDashboardSideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            barIsOpen: false
        }
    };
    // Passed down to the Dog List, then passed to each Dog Card.
    toggleBar = () => {
        this.state.barIsOpen ? (
            this.setState(() => ({ barIsOpen: false }))
        ) : (
            this.setState(() => ({ barIsOpen: true }))
        )
    };
    render() {
        return (
            <div className="dashboard-sidebar__container">
                <div className="dashboard-sidebar" >
                    <NameCard toggleBar={this.toggleBar}/>
                    { this.state.barIsOpen && <DogList toggleBar={this.toggleBar}/>}
                </div>
            </div>
        )
    };
};