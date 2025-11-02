Test Mode / Simulation

This folder contains a lightweight simulation engine and a small UI for testing survey flows locally.

How to use

1. Import the TestRunner component into a dev-only route or page, e.g.:

   import TestRunner from "../Components/TestComponents/TestRunner";

   // render <TestRunner /> somewhere in your app where the AppContext is available.

2. The TestRunner reads `sections` and `surveyData` from the app context (read-only) and runs an ephemeral simulation.

Limitations
- This engine intentionally does not write to indexedDB or backend.
- It implements a focused subset of logic operators (equal, not_equal, includes, greater_than, less_than, true_false) and actions (skip_to, end_survey).
- Advanced logic expressions or custom action handlers might need additional adapters to reuse the project's full logic evaluation utilities.

Files
- SimulationEngine.ts — core simulation runner
- TestRunner.tsx — small UI to configure and run simulations
- TestSidebar.tsx — inspection panel
- testComponents.module.css — styles

If you want this mounted at a route (e.g., /__testmode), I can add a small route component and a dev-only entry — let me know.