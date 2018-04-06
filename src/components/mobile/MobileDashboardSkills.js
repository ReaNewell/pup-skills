import React from 'react';
import { connect } from 'react-redux';
import activeDogSelector from '../../selectors/activeDog';
import CompletedSkillsList from '../CompletedSkillsList';
import InProgressSkillsList from '../InProgressSkillsList';
import SkillCard from '../SkillCard';
import SkillsForm from '../SkillsForm';

class MobileDashboardSkills extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dogs: props.dogs,
            activeDog: props.activeDog,
            completedListIsActive: true,
            skillModalOpen: false
        }
    };
    componentWillReceiveProps(nextProps) {
        this.setState({ dogs: nextProps.dogs, });
        this.setState({ activeDog: nextProps.activeDog });
    };
    activateCompletedList = () => {
        this.setState(() => ({ completedListIsActive: true }));
    };
    activateInProgressList = () => {
        this.setState(() => ({ completedListIsActive: false }));
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
                        <div className="dashboard-skills__list-titles">
                            <p className={this.state.completedListIsActive ? "dashboard-skills__list-title dashboard-skills__list-title--active" : "dashboard-skills__list-title"} onClick={this.activateCompletedList}>Completed</p>
                            <p className={this.state.completedListIsActive ? "dashboard-skills__list-title--inprogress " : "dashboard-skills__list-title--inprogress dashboard-skills__list-title--active"} onClick={this.activateInProgressList}>In Progress</p>
                        </div>
                        <div className="dashboard-skills__lists">
                            <CompletedSkillsList listIsActive={this.state.completedListIsActive} activeDog={this.state.activeDog}/>
                            <InProgressSkillsList listIsActive={!this.state.completedListIsActive} activeDog={this.state.activeDog}/>
                        </div>
                        <button className="dashboard-skills__button" onClick={this.openSkillModal}>Add Skill</button>
                        {this.state.skillModalOpen && <SkillsForm closeSkillModal={this.closeSkillModal} activeDog={this.state.activeDog}/>}
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
export default connect(mapStateToProps)(MobileDashboardSkills);