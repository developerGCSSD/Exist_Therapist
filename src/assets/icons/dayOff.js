import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DayOff(props) {
  return (
    <Svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M26.667 6.667v10M53.333 6.667v10M53.333 11.667c11.1.6 16.667 4.833 16.667 20.5v20.6c0 13.733-3.333 20.6-20 20.6H30c-16.667 0-20-6.867-20-20.6v-20.6c0-15.667 5.567-19.867 16.667-20.5h26.666zM69.167 58.667H10.833M46.533 32.617l-13.2 13.2M46.667 45.683l-13.2-13.2"
        stroke="#292D32"
        strokeWidth={4}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default DayOff;
