import React from "react";
import { IconType } from "react-icons";
import style from "./ProjectsComponents/projectComponent.module.css";

type ListEachItemOtherPropsPropsType = {
  numberValue?: number;
  stringValue?: string;
  Icon: IconType;
  IconSize?: string;
  toolTip?: string;
  backgroundColor?: string;
  padding?: string;
  fontSize?: string;
  getCallBack?: () => void;
  // getFunctionCall?: (value: any) => void;
};

const ListEachItemOtherProps: React.FC<ListEachItemOtherPropsPropsType> = ({
  Icon,
  numberValue,
  stringValue,
  toolTip,
  backgroundColor,
  padding,
  fontSize,
  IconSize,
  getCallBack,
}) => {
  return (
    <span
      className={style.listEachItemOtherProps_container}
      style={{ padding, backgroundColor }}
      onClick={() => getCallBack && getCallBack()}
    >
      <Icon style={{ fontSize: IconSize || 20, color: `var(--navy-blue)` }} />
      {numberValue || (stringValue && <p>{numberValue || stringValue}</p>)}
      <span className={style.tooltip} style={{ fontSize }}>
        {toolTip}
      </span>
    </span>
  );
};

export default ListEachItemOtherProps;
