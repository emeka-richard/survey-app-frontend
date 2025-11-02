// import { simulateSurvey } from "../SimulationEngine";

// const sampleSections = [
//   {
//     id: "s-1",
//     title: "Section 1",
//     questionFrames: [
//       { id: "q1", questionText: "What is A?", assignedPoint: 0, questionTypeValue: "multiple-choice", questionTypeLabel: "Multiple choice", questionTypeIcon: null, questionTypeOptions: ["a","b","c"], required: false, logic: null },
//       { id: "q2", questionText: "What is B?", assignedPoint: 0, questionTypeValue: "short-answer", questionTypeLabel: "Short answer", questionTypeIcon: null, required: false, logic: null },
//     ],
//   },
// ];

// describe("simulateSurvey basics", () => {
//   it("runs and returns a log", () => {
//     const res = simulateSurvey(sampleSections as any, null, { mode: "deterministic", seed: 1 });
//     expect(res.log.length).toBeGreaterThan(0);
//     expect(res.finalState.ended).toBe(true);
//   });
// });
