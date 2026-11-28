import type { TemplateTip } from '../templateTips'

export const enTips: Record<string, TemplateTip> = {
  'learning-situation': {
    use: 'Design a complete learning situation: a contextualised challenge, competences, knowledge, activities and assessment.',
    tip: 'Use it when planning a unit. Choose a curriculum profile so it uses the official elements, and check the codes.',
  },
  lesson: {
    use: 'Prepare a specific lesson with an opening, main part, closure and timings.',
    tip: 'Ideal for everyday planning: state the real duration and classroom resources so it is feasible.',
  },
  sequence: {
    use: 'Organise several linked lessons on the same topic, with progression.',
    tip: 'Use it for a fortnight or a short unit; then develop each lesson with «Lesson».',
  },
  'competency-activity': {
    use: 'Create an activity that puts a competence to work in a real situation, not just an exercise.',
    tip: 'State the competence or criterion you want to work on so the activity targets something assessable.',
  },
  project: {
    use: 'Plan a project-based learning project with a final product, phases and roles.',
    tip: 'Meant for several weeks. Define the final product clearly: the rest of the project follows from it.',
  },
  challenge: {
    use: 'Set an open problem or challenge that students solve by investigating.',
    tip: 'Works best with a context close to students (the neighbourhood, the school, the town).',
  },
  rubric: {
    use: 'Create an analytic rubric with observable achievement levels from your criteria.',
    tip: 'Paste the assessment criteria from the official source (for example, from NotebookLM): do not let the AI invent them.',
  },
  checklist: {
    use: 'Make a yes/no checklist to verify whether a task meets its requirements.',
    tip: 'Useful for submissions and for student self-assessment before handing in.',
  },
  'rating-scale': {
    use: 'Create a graded rating scale (for example, 1 to 4) to observe a performance.',
    tip: 'Quicker to apply than a rubric; use it when you do not need to describe each level.',
  },
  'systematic-observation': {
    use: 'Prepare a systematic observation record for classroom work.',
    tip: 'Ideal for group work, lab or oral tasks. Keep to indicators you can really observe in class.',
  },
  portfolio: {
    use: 'Organise a portfolio: what evidence is collected, when, and how students reflect on it.',
    tip: 'Meant to assess the process over a term or a project.',
  },
  production: {
    use: 'Assess a student production (text, poster, video…) with clear criteria.',
    tip: 'Describe the task instructions well: the criteria will come from them.',
  },
  'written-test': {
    use: 'Prepare a written test with an answer key and marks for each question.',
    tip: 'For assessment, not practice: for revision exercises, use «Printable worksheet».',
  },
  product: {
    use: 'Assess the final product of a project or learning situation.',
    tip: 'Combine it with «PBL project»: state the product you defined there.',
  },
  presentation: {
    use: 'Assess a student oral presentation.',
    tip: 'To prepare the teacher’s slides, use «Classroom presentation».',
  },
  h5p: {
    use: 'Get the content of an H5P activity (quiz, drag and drop, flashcards…) to build it in Moodle.',
    tip: 'The AI does not create the .h5p file: it gives you the content to paste into the H5P editor or EduTicTac Play.',
  },
  scorm: {
    use: 'Generate the files of a SCORM 1.2 package to upload to Moodle with grades sent to the gradebook.',
    tip: 'Save the files and zip the files, not the folder. Always test it in Moodle using «Switch role».',
  },
  'html-game': {
    use: 'Create a game or interactive activity in a single HTML file (gap fill, matching, ordering…).',
    tip: 'Run it in Gemini Canvas or Claude to see it working. You can then turn it into SCORM.',
  },
  gift: {
    use: 'Generate a question bank in GIFT format to import into Moodle.',
    tip: 'Copy only the code, save it as a UTF-8 .txt file and import it into the question bank. Check the correct answers.',
  },
  qti: {
    use: 'Generate questions in QTI 2.1 format for platforms that support it.',
    tip: 'For Moodle, GIFT is usually simpler; use QTI if your platform requires it.',
  },
  'common-cartridge': {
    use: 'Prepare a Common Cartridge package with an activity and its resources to import into a platform.',
    tip: 'Advanced use: test the import in a sandbox course before using it with students.',
  },
  feedback: {
    use: 'Write formative feedback for a piece of work: what is good, what to improve and the next step.',
    tip: 'Describe the work without student data. Ask it to talk about the task, not the person.',
  },
  'three-levels': {
    use: 'Adapt the same material to three levels (support, core and extension) with the same objective.',
    tip: 'Paste your text and ask it to keep the original data. Check that the support version keeps the key ideas.',
  },
  'easy-reading': {
    use: 'Adapt a text to easy-to-read: short sentences, one idea per sentence and common vocabulary.',
    tip: 'It is a draft: easy-to-read has its own rules and, if published, should be validated with readers.',
  },
  'bias-check': {
    use: 'Review a text or material for gender, cultural or ability bias.',
    tip: 'Use it before publishing or handing out material, especially if an AI produced it.',
  },
  'glossary-support': {
    use: 'Create a glossary with adapted definitions and suggested visual supports.',
    tip: 'Very useful for newly arrived students or those with vocabulary difficulties. Find pictograms in ARASAAC.',
  },
  'family-note': {
    use: 'Write a short, clear message for families.',
    tip: 'No names or student data in the prompt: add them yourself afterwards in your email or messaging tool.',
  },
  'tutoring-script': {
    use: 'Prepare a script for a tutorial or family meeting: aims, questions and agreements.',
    tip: 'Describe the situation in general terms, without identifiable data or diagnoses.',
  },
  free: {
    use: 'Write a custom prompt with role, context, task, format and limits.',
    tip: 'Use it when no tool fits. If you repeat it often, save it in your library.',
  },
  'scientific-illustration': {
    use: 'Request a scientific or teaching illustration from an image AI.',
    tip: 'Check the scientific accuracy: image AIs often get labels and details wrong.',
  },
  infographic: {
    use: 'Design an educational infographic: structure, short texts and visual elements.',
    tip: 'Run it in Gemini Canvas, Canva or Copilot. Check data and texts before printing.',
  },
  'mind-map': {
    use: 'Create a mind map or outline of a topic, ready to draw or import.',
    tip: 'In Mermaid format it can be pasted into tools that draw it automatically. Useful as a UDL support.',
  },
  'explainer-video': {
    use: 'Plan an animated explainer film from a document: script, scenes and voice.',
    tip: 'Work in phases: approve the script before asking for the animation. It is the longest tool.',
  },
  'udl-review': {
    use: 'Review an activity using UDL principles and detect barriers.',
    tip: 'Paste the activity as you would give it. Keep the proposals you can really apply.',
  },
  'udl-matrix': {
    use: 'Plan a unit with a UDL matrix: options for engagement, representation and expression.',
    tip: 'Use it while designing, before creating materials: it tells you which variants to prepare.',
  },
  'student-tutor': {
    use: 'Prepare a Socratic tutor that helps students study through questions, without giving the answer.',
    tip: 'Meant for students to use. Check that the tutor does not solve the task for them.',
  },
  analogies: {
    use: 'Explain a difficult concept with analogies close to students’ experience.',
    tip: 'Ask for several and keep the best fit; every analogy has limits, point them out in class.',
  },
  participation: {
    use: 'Design routines so the whole group takes part, not just the usual few.',
    tip: 'State the group size and duration: routines change a lot depending on time.',
  },
  'conflict-mediation': {
    use: 'Prepare a calm, restorative response to a classroom conflict.',
    tip: 'Describe the situation without names or blame. The AI helps you prepare; the decision is yours.',
  },
  'multiple-choice': {
    use: 'Create a quiz with plausible distractors and an explanation for each option.',
    tip: 'The explanations work as feedback. For Moodle, «GIFT question bank» is better.',
  },
  worksheet: {
    use: 'Prepare a printable worksheet with varied exercises and a separate answer key.',
    tip: 'Paste your text so it only uses that information. Move it to Word, adjust it and check the answer key.',
  },
  'illustrated-worksheet': {
    use: 'Ask an image AI for an illustrated, themed A4 worksheet, for colouring or in colour, with several activities.',
    tip: 'Write the exact exercises yourself: image AIs get numbers and words wrong. Check the sheet before printing.',
  },
  'case-study': {
    use: 'Set a case study or professional scenario with data, graded tasks and an answer key.',
    tip: 'Well suited to vocational and upper secondary courses. Check that the data are consistent and the case can be solved.',
  },
  'lab-guide': {
    use: 'Write a lab or workshop practical guide: materials, safety, procedure and analysis.',
    tip: 'List the materials you actually have. Always check safety rules against your equipment and products.',
  },
  'class-presentation': {
    use: 'Prepare the outline of a presentation to teach in class, with speaker notes.',
    tip: 'Paste the result into Copilot in PowerPoint, Gamma or Canva to build the slides.',
  },
  'escape-room': {
    use: 'Design an educational escape room or breakout with chained puzzles, hints and solutions.',
    tip: 'Ideal for revision at the end of a unit. Try it yourself first: an ambiguous puzzle blocks the whole group.',
  },
  'reading-comprehension': {
    use: 'Prepare a reading with vocabulary and literal, inferential and critical questions.',
    tip: 'Paste your text so it is not changed. It works for any subject, not just language.',
  },
  'ethical-dilemma': {
    use: 'Create ethical dilemmas that set two legitimate values against each other for class debate.',
    tip: 'Useful in philosophy, ethics or tutorial time. There is no right answer: assess the reasoning.',
  },
  'study-plan': {
    use: 'Build a realistic weekly study plan for students.',
    tip: 'Meant for secondary and beyond, especially before exams. State the real time available.',
  },
  'historical-interview': {
    use: 'Simulate an interview with a historical figure to explore a period or topic.',
    tip: 'Ask it to stick to documented facts and mark what is recreation.',
  },
  'coding-activity': {
    use: 'Prepare a robotics or coding activity sheet for the robot or tool you have in class.',
    tip: 'Choose the tool you actually have (Bee-Bot, Scratch, micro:bit…). Try the activity before class.',
  },
  'code-coach': {
    use: 'Prepare a tutor that reviews students’ code and guides them without giving the solution.',
    tip: 'Meant for students to use. Check that it asks and guides rather than fixing the code.',
  },
  'profile-adaptation': {
    use: 'Adapt a task to a specific learner profile without lowering the learning objective.',
    tip: 'Describe the task as you have it. Add strengths and interests if you know them: the prompt adjusts the approach, not the demand.',
  },
  'school-document': {
    use: 'Draft minutes, activity reports, progress reports, support plans, proposals to the leadership team and replies to complaints.',
    tip: 'Choose the document type and paste your notes. Always review and sign before submitting: AI does not replace the school’s responsibility.',
  },
  'editable-latex': {
    use: 'Ask AI to use LaTeX to display typeset formulas and calculations within the material.',
    tip: 'Describe the material you need. To edit equations in Word, choose DOCX: the prompt asks for native editable equations.',
  },
  'learning-stations': {
    use: 'Organise practical learning stations with realistic instructions and timing.',
    tip: 'Give the total time, group size and available resources.',
  },
  'activity-evidence': {
    use: 'Turn an existing activity into observable evidence and ways to collect it.',
    tip: 'Describe what learners do and provide available objectives or criteria, without personal data.',
  },
  flashcards: {
    use: 'Create cards for retrieval practice with short questions and answers.',
    tip: 'Give the topic and number of questions; optionally add a source text.',
  },
  'prompt-coach': {
    use: 'Prepare a conversation with an AI to create or improve an educational prompt.',
    tip: 'Write your idea or paste a prompt. Copy the result and talk to your chosen AI; the conversation happens there.',
  },
}
