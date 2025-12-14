import { TestRunnerButtonTypes } from "../../../../../Utils/dataTypes";


const TestRunnerActionButton: React.FC<TestRunnerButtonTypes> = ({
    buttonLabel,
    className,
    type,
    onClick,
}) => {
  return <button className={className} type={type} onClick={onClick}>{buttonLabel}</button>;
};

export default TestRunnerActionButton;