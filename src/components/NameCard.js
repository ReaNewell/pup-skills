import React from 'react';
import { connect } from 'react-redux';

const NameCard = (props) => (
    <div className="name-card">
        <h2>Hello, {props.profileName}.</h2>
    </div>
);

const mapStateToProps = (state) => ({
    profileName: state.profileInfo.profileName
})

export default connect(mapStateToProps)(NameCard);