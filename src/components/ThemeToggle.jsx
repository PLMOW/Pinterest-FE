import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from 'redux/modules/themeSlicer';
import useSound from 'use-sound';
import downSFX from 'assets/audio/down.mp3';
import upDarkSFX from 'assets/audio/upDark.mp3';
import upLightSFX from 'assets/audio/upLight.mp3';

const ThemeToggle = () => {
  const isDark = useSelector((state) => state.themeSlicer);
  const [down] = useSound(downSFX);
  const [upDark] = useSound(upDarkSFX);
  const [upLight] = useSound(upLightSFX);
  const dispatch = useDispatch();

  const themeToggle = () => dispatch(toggle());
  const downHandler = () => down();
  const toggleSoundHandler = () => {
    if (isDark) return upLight();
    return upDark();
  };

  return (
    <>
      <input
        hidden
        type="checkbox"
        id="toggleCheck"
        onClick={themeToggle}
      ></input>
      <label htmlFor="toggleCheck">
        <ToggleBox
          toggleProps={isDark}
          onMouseDown={downHandler}
          onClick={toggleSoundHandler}
        >
          <ToggleBtn toggleProps={isDark} />
        </ToggleBox>
      </label>
    </>
  );
};

export default ThemeToggle;

const ToggleBox = styled.div`
  position: relative;
  margin-right: 0px 40px 0px 0px;
  background: ${(props) =>
    props.toggleProps ? 'rgba(111,111,111,0.5)' : 'rgba(111,111,111,0.5)'};
  border-radius: 10px;
  width: 60px;
  height: 30px;
  :hover {
    cursor: pointer;
  }
`;

const ToggleBtn = styled.div`
  position: absolute;
  top: 2.5px;
  left: ${(props) => (props.toggleProps ? '5px' : '30px')};
  background: ${(props) => (props.toggleProps ? '#D8D8D8' : '#111')};
  width: 25px;
  height: 25px;
  border-radius: 9px;
  transition: 0.2s ease-in-out;
`;
