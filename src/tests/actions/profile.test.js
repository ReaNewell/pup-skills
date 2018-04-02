import { setProfile, updateProfile } from '../../actions/profile';
import profileInfo from '../fixtures/profile';

test('should set profile in action object', () => {
    const action = setProfile(profileInfo);
    expect(action).toEqual({
        type: "SET_PROFILE",
        profileInfo
    })
});

test('should update profile in action object', () => {
    const action = updateProfile(profileInfo);
    expect(action).toEqual({
        type: "UPDATE_PROFILE",
        profileInfo
    })
});