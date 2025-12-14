import { useAppStateMgtContext } from "../../../Utils/AppContext";
import style from "./builderPageComponents.module.css";

// type FormHeaderProps = {
//   onGetSurveyTitle: React.Dispatch<React.SetStateAction<string>>;
//   onGetSurveyDescription: React.Dispatch<React.SetStateAction<string>>;
// };
// const FormHeader: React.FC<FormHeaderProps> = ({onGetSurveyTitle, onGetSurveyDescription}) => {
const FormHeader: React.FC = () => {

  const {setSurveyTitle, setSurveyDescription} = useAppStateMgtContext();

  return (
    <header className={style.formHeader_header}>
      <input type="text" placeholder="Enter survey title" onChange={(e) => setSurveyTitle(e.target.value)} />
      <textarea placeholder="Enter survey description" onChange={(e)=> setSurveyDescription(e.target.value)}></textarea>
    </header>
  );
};

export default FormHeader;
