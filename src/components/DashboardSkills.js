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
            completedListIsActive: true,
            skillModalOpen: false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ dogs: nextProps.dogs, });
        this.setState({ activeDog: nextProps.activeDog });
    };

    openSkillModal = () => {
        this.setState(() => ({ skillModalOpen: true }));
    }
    closeSkillModal = () => {
        this.setState(() => ({ skillModalOpen: false }));
    }
    render() {
        return (
            <div className="dashboard-skills">
                {
                    this.state.activeDog && 
                    <div className="dashboard-skills__container">
                        <div className="dashboard-skills__header">
                            <h1 className="dashboard-skills__title">Here are {this.state.activeDog.name}'s skills</h1>
                            <button className="dashboard-skills__button" onClick={this.openSkillModal}>Add Skill</button>
                        </div>
                        {this.state.skillModalOpen && <SkillsForm closeSkillModal={this.closeSkillModal} activeDog={this.state.activeDog}/>}
                        <div className="dashboard-skills__lists">
                            <CompletedSkillsList listIsActive={this.state.completedListIsActive} activeDog={this.state.activeDog}/>
                            <InProgressSkillsList listIsActive={this.state.completedListIsActive} activeDog={this.state.activeDog}/>
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