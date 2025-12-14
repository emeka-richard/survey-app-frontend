import React from "react";
import { useAppStateMgtContext } from "../../../Utils/AppContext";
import style from "./builderPageComponents.module.css";
import FormHeader from "./FormHeader";
import QuestionFrame from "./QuestionComponents/QuestionFrame";
import { MdDeleteOutline } from "react-icons/md";
// import { sectionTypeProps } from "../../../Utils/dataTypes";
// import { QuestionTypeSelectList } from "./QuestionComponents/questionTypeSelectListArray";
import ListEachItemOtherProps from "../../ListEachItemOtherProps";
import { IoMdAddCircleOutline } from "react-icons/io"; //for add question
import { QuestionTypeSelectList } from "../../../Utils/dataTypes";
import { SortableListAbstractComponent } from "../../../Utils/SortableAbstractComponent/SortableListAbstractComponent";

type BuilderContentBodyProps = {
  addSection: (prop: QuestionTypeSelectList[]) => void;
  addQuestionFrameToSection: (sectionId: string) => void;
  onRemoveQuestionFrame: (sectionId: string, questionId: string) => void;
  deleteSection: (sectionId: string) => void;
};

const BuilderContentBody: React.FC<BuilderContentBodyProps> = ({
  addQuestionFrameToSection,
  onRemoveQuestionFrame,
  deleteSection,
}) => {
  const { frameCall, sections, setSections } =
    useAppStateMgtContext();

  return (
    <div className={style.builderContentBody_main}>
      {frameCall && <FormHeader />}
      <section className={style.builderContentBody_main}>
        <SortableListAbstractComponent
          items={sections}
          getId={(section) => section.id}
          onReorder={(newOrders) => setSections(newOrders)}
          renderItem={(section, sectionIndex) => (
            <div key={section.id} className={style.builderContentBody_section}>
              {sections.length > 1 && (
                <>
                  <hr></hr>
                  <span className={style.builderContentBody_sectionHeader}>
                    <p>{section.title}</p>
                    <div
                      className={style.builderContentBody_sectionHeaderActions}
                    >
                      <span>
                        <ListEachItemOtherProps
                          Icon={IoMdAddCircleOutline}
                          toolTip="Add question"
                          IconSize="20px"
                          fontSize="10px"
                          getCallBack={() => {
                            addQuestionFrameToSection(section.id);
                          }}
                        />
                        <span onClick={() => deleteSection(section.id)}>
                          <ListEachItemOtherProps
                            Icon={MdDeleteOutline}
                            toolTip="Delete"
                            IconSize="20px"
                            fontSize="10px"
                            // getCallBack={onRemoveQuestionFrame}
                          />
                        </span>
                      </span>
                    </div>
                  </span>
                </>
              )}
              <SortableListAbstractComponent
                items={section.questionFrames}
                getId={(QuestionFrame) => QuestionFrame.id}
                onReorder={(newSectionOrders) =>
                  setSections((prevSectionOrders) =>
                    prevSectionOrders.map((prevQuestionFrameOrders) =>
                      prevQuestionFrameOrders.id === section.id
                        ? {
                            ...prevQuestionFrameOrders,
                            questionFrames: newSectionOrders,
                          }
                        : prevQuestionFrameOrders
                    )
                  )
                }
                renderItem={(questionFrame, index, dragHandleProps) => (
                  <QuestionFrame
                    key={questionFrame.id}
                    sectionId={section.id}
                    questionType={questionFrame}
                    onRemoveQuestionFrame={onRemoveQuestionFrame}
                    dragHandleProps={dragHandleProps}
                    itemIndex={index}
                    sectionIndex={sectionIndex}
                    totalSections={sections.length}
                  />
                )}
              />
            </div>
          )}
        />
      </section>
    </div>
  );
};

export default BuilderContentBody;
