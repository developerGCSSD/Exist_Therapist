import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function OnlineMethodIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.92 7.375H5.557a3.313 3.313 0 00-3.307 3.307v5.025a3.308 3.308 0 003.308 3.308h2.88c.412 0 .75.337.75.75v.727c0 .413-.338.75-.75.75H6.622a.567.567 0 000 1.133h6.263a.567.567 0 00.563-.563.567.567 0 00-.563-.562H11.07a.752.752 0 01-.75-.75v-.727c0-.413.338-.75.75-.75h2.857a3.308 3.308 0 003.308-3.308V10.69a3.326 3.326 0 00-3.315-3.315z"
        fill="#3463E9"
      />
      <Path
        d="M15.719 9.688H15.5c-1.75 0-2.625-.438-2.625-2.626V4.876c0-1.75.875-2.625 2.625-2.625H19c1.75 0 2.625.875 2.625 2.625v2.188c0 1.75-.875 2.625-2.625 2.625h-.219a.444.444 0 00-.35.175l-.656.875c-.289.385-.761.385-1.05 0l-.656-.875a.495.495 0 00-.35-.175z"
        fill="#3463E9"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.998 6.188h.004M17.248 6.188h.004M15.498 6.188h.004"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.75 12.625a1.562 1.562 0 100-3.125 1.562 1.562 0 000 3.125zM9.75 13.406c-1.566 0-2.84 1.05-2.84 2.344 0 .088.068.156.156.156h5.369a.155.155 0 00.156-.156c0-1.294-1.275-2.344-2.84-2.344z"
        fill="#fff"
      />
    </Svg>
  );
}

export default OnlineMethodIcon;
