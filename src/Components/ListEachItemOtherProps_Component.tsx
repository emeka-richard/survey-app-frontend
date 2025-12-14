import React from "react";
import ListEachItemOtherProps from "./ListEachItemOtherProps";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { BsPersonCheck } from "react-icons/bs";
// import { FcSurvey } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";

const ListEachItemOtherPropsComponent: React.FC = () => {
  return (
    <>
      {" "}
      <ListEachItemOtherProps
        Icon={MdOutlinePeopleOutline}
        numberValue={2}
        toolTip="Number of Collaborators"
      />{" "}
      {/* Number of Collaborators */}
      <ListEachItemOtherProps
        Icon={BsPersonCheck}
        //   stringValue={"Collaborator"}
        toolTip="Collaborators"
      />{" "}
      {/* Number of Collaborators */}
      <ListEachItemOtherProps Icon={RiFileEditFill} toolTip="Edit" />{" "}
      {/* Edit Button */}
      <ListEachItemOtherProps Icon={MdDelete} toolTip="Delete" />{" "}
      {/* Delete Button */}
    </>
  );
};

export default ListEachItemOtherPropsComponent;
