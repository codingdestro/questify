export const JSONPrompt = {
  task: "Generate multiple choice questions (MCQ) based on the provided configuration",
  instructions: [
    "Generate the specified number of MCQ questions based on the topic and difficulty level",
    "Each question must have exactly one correct answer",
    "All options should be plausible to avoid obvious answers",
    "Ensure questions test understanding, not just memorization",
    "Provide clear and concise explanations for correct answers",
    "Avoid ambiguous wording or trick questions unless specifically requested",
    "Options should be roughly similar in length and complexity",
    "IMPORTANT: Return ONLY valid JSON. Do NOT wrap the response in markdown code blocks or any other formatting",
    "The response must start with { and end with } - no other text before or after",
  ],
  input: {
    topic: "{{TOPIC}}",
    subtopics: ["{{SUBTOPIC_1}}", "{{SUBTOPIC_2}}"],
    numberOfQuestions: 10,
    difficulty: "medium",
    questionStyle: "application",
    bloomsTaxonomyLevel: "understanding",
    language: "en",
    targetAudience: "college students",
    avoidTopics: [],
    additionalContext: "",
  },
  configuration: {
    difficulty_levels: {
      easy: "Basic recall and simple comprehension questions",
      medium: "Application and analysis of concepts",
      hard: "Complex problem-solving and synthesis",
    },
    question_styles: {
      recall: "Test memorization of facts and definitions",
      application: "Test ability to apply concepts to new situations",
      analysis: "Test ability to break down and examine information",
      evaluation: "Test ability to make judgments and defend positions",
    },
    blooms_taxonomy: {
      remember: "Recall facts and basic concepts",
      understand: "Explain ideas or concepts",
      apply: "Use information in new situations",
      analyze: "Draw connections among ideas",
      evaluate: "Justify a decision or course of action",
      create: "Produce new or original work",
    },
  },
  output_format: {
    questions: [
      {
        id: "string (auto-generated unique identifier)",
        type: "mcq",
        question: "string (the question text)",
        options: [
          {
            id: "string (a, b, c, d)",
            text: "string (option text)",
            isCorrect: "boolean",
          },
        ],
        correctAnswer: "string (id of correct option)",
        points: "number (default: 10)",
        difficulty: "string (easy/medium/hard)",
        category: "string (topic/subtopic)",
        explanation: "string (why the answer is correct)",
        tags: ["array of relevant tags"],
        estimatedTime: "number (seconds to answer)",
      },
    ],
    metadata: {
      totalQuestions: "number",
      generatedAt: "ISO 8601 timestamp",
      topic: "string",
      averageDifficulty: "string",
    },
  },
  quality_criteria: {
    question_quality: [
      "Clear and unambiguous wording",
      "Free from grammatical errors",
      "Appropriate difficulty level",
      "Relevant to the specified topic",
      "Tests meaningful knowledge",
    ],
    option_quality: [
      "All distractors are plausible",
      "No options like 'All of the above' or 'None of the above' unless specifically requested",
      "Options are mutually exclusive",
      "Similar length and grammatical structure",
      "No obvious patterns in correct answer placement",
    ],
    explanation_quality: [
      "Clearly explains why the answer is correct",
      "References relevant concepts or principles",
      "Helps learners understand the topic better",
    ],
  },
  example_output: {
    questions: [
      {
        id: "q1_mcq_001",
        type: "mcq",
        question:
          "In React, what is the primary purpose of the useEffect hook?",
        options: [
          {
            id: "a",
            text: "To manage component state",
            isCorrect: false,
          },
          {
            id: "b",
            text: "To perform side effects in functional components",
            isCorrect: true,
          },
          {
            id: "c",
            text: "To create context providers",
            isCorrect: false,
          },
          {
            id: "d",
            text: "To optimize component rendering",
            isCorrect: false,
          },
        ],
        correctAnswer: "b",
        points: 10,
        difficulty: "medium",
        category: "React Hooks",
        explanation:
          "The useEffect hook is specifically designed to handle side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. While other hooks like useState manage state and useMemo optimizes rendering, useEffect is the primary tool for side effects.",
        tags: ["react", "hooks", "useEffect", "functional-components"],
        estimatedTime: 30,
      },
    ],
    metadata: {
      totalQuestions: 1,
      generatedAt: "2025-01-15T10:30:00Z",
      topic: "React Fundamentals",
      averageDifficulty: "medium",
    },
  },
  validation_rules: {
    required_fields: [
      "id",
      "type",
      "question",
      "options",
      "correctAnswer",
      "explanation",
    ],
    options_count: {
      minimum: 3,
      maximum: 6,
      recommended: 4,
    },
    correct_answers_count: 1,
    question_length: {
      minimum: 10,
      maximum: 300,
    },
    option_length: {
      minimum: 2,
      maximum: 150,
    },
  },
};
