import React from 'react';
import { connect } from 'react-redux';
import activeDogSelector from '../selectors/activeDog';

import CompletedSkillsList from './CompletedSkillsList';
import InProgressSkillsList from './InProgressSkillsList';
import SkillCard from './SkillCard';
import SkillsForm from './SkillsForm';

class DashboardSkills extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dogs: props.dogs,
            activeDog: props.activeDog,
            completedListIsActive: true
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ dogs: nextProps.dogs, });
        this.setState({ activeDog: nextProps.activeDog });
    }
    toggleActiveList = () => {
        if (this.state.completedListIsActive === true) {
            this.setState(() => ({ completedListIsActive: false }));
        } else {
            this.setState(() => ({ completedListIsActive: true }));
        }
    }
    render() {
        return (
            <div className="dashboard-skills">
                {
                    this.state.activeDog && 
                    <div className="dashboard-skills__container">
                        <h1 className="dashboard-skills__title">Here are {this.state.activeDog.name}'s skills</h1>
                        <SkillsForm activeDog={this.state.activeDog}/>
                        <div className="dashboard-skills__list-titles">
                            <p className={this.state.completedListIsActive ? "dashboard-skills__list-title dashboard-skills__list-title--active" : "dashboard-skills__list-title"} onClick={this.toggleActiveList}>Completed</p>
                            <p className={this.state.completedListIsActive ? "dashboard-skills__list-title" : "dashboard-skills__list-title dashboard-skills__list-title--active"} onClick={this.toggleActiveList}>In Progress</p>
                        </div>
                        <div className="dashboard-skills__lists">
                            <CompletedSkillsList listIsActive={this.state.completedListIsActive} activeDog={this.state.activeDog}/>
                            <InProgressSkillsList listIsActive={!this.state.completedListIsActive} activeDog={this.state.activeDog}/>
                        </div>
                    </div>
                }
                
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return { 
        dogs: state.dogs,
        activeDog: activeDogSelector(state.dogs)
    };
};

export default connect(mapStateToProps)(DashboardSkills);