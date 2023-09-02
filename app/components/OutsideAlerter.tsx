/**
 * This component is used to close the dropdown menu when the user clicks outside of it.
 * It is used in the Dropdown component.
 * It is a modified version of the component found at the following link:
 * https://codesandbox.io/s/outside-alerter-hooks-forked-mxrp65?file=/src/OutsideAlerter.js:765-1104
 **/

import { useRef } from "react";
import { useOutsideAlerter } from "../hooks/useOutsideAlerter";

interface Props {
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter({ children, setOpen }: Props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideAlerter;
