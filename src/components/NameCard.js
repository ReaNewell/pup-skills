import React from 'react';
import { connect } from 'react-redux';
import activeDogSelector from '../selectors/activeDog';

class NameCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeDog: props.activeDog,
            width: window.innerWidth
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ activeDog: nextProps.activeDog });
    }
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
      }
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };
    render() {
        return (
            <div className="name-card">
                <h2>Hello, {this.props.profileName}.</h2>
                {(this.state.width < 720 && this.state.activeDog) && <h2>{this.state.activeDog.name}</h2>}
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    profileName: state.profileInfo.profileName,
    activeDog: activeDogSelector(state.dogs)
})

export default connect(mapStateToProps)(NameCard);