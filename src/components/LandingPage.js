import React from 'react';
import AuthModal from './AuthModal';

export class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginModalIsOpen: false
        }
    }
    closeLoginModal = () => {
        this.setState(() => ({ loginModalIsOpen: false }));
    }
    openLoginModal = () => {
        this.setState(() => ({ loginModalIsOpen: true }));
        window.scrollTo(0, 0);
    }
    render() {
        window.onscroll = () => {
            const element = document.getElementsByClassName('landing-page__description');
            const elementTop = element[0].getBoundingClientRect().top;

            if (document.body.scrollTop > elementTop || document.documentElement.scrollTop > elementTop) {
                element[0].classList.add('animation__appear');
            }
        }

        return (
            <div className="landing-page">
                <div className='landing-page__jumbotron'></div>
                <div id='desc' className='landing-page__description'>
                    <p>
                        Pup Skills is a place for you to keep track of the skills you have been working on with your dog. 
                        Record and update the progress you are having with your pups.
                    </p>
                </div>
                <div className='landing-page__screenshot'>
                    <img src='/images/screenshot.jpg'/>
                </div>
                <div className='landing-page__points'>
                    <div className='landing-page__point'>
                        <img src='/images/list.png'/>
                        <p>Separate lists to keep completed and in-progress skills organized.</p>
                    </div>
                    <div className='landing-page__point'>
                        <img src='/images/three.png'/>
                        <p>Keep track of up to three different dogs.</p>
                    </div>
                    <div className='landing-page__point'>
                        <img src='/images/devices.png'/>
                        <p>Access your account on all devices with an internet connection.</p>
                    </div>
                </div>
                <div className='landing-page__join-banner'>
                    <p onClick={this.openLoginModal}>Click here to start tracking your dog's progress.</p>
                </div>
                { this.state.loginModalIsOpen && <AuthModal closeLoginModal={this.closeLoginModal} /> }
            </div>
        );
    }
}

export default LandingPage;