import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function PeriodOff(props) {
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
        d="M40 73.333c-16.1 0-29.167-13.066-29.167-29.166S23.9 15 40 15s29.167 13.067 29.167 29.167M40 26.667v16.666"
        stroke="#292D32"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M30 6.667h20"
        stroke="#292D32"
        strokeWidth={4}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M63.333 56.667V70M53.333 56.667V70"
        stroke="#292D32"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default PeriodOff;
