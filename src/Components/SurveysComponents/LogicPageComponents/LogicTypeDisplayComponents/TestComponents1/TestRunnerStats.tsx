import React from "react";
import { TestRunnerStatsProps } from "../../../../../Utils/dataTypes";


const TestRunnerStats: React.FC<TestRunnerStatsProps> = ({ statFigure, label }) => {
    return <pre>Total {label}: {`${statFigure}`}</pre>;
};

export default TestRunnerStats;