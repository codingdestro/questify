export interface IConfig {
  task: string;
  topic: string;
  questions: string;
  type: string;
  level: string;
  for: string;
  structured: string;
  format: string;
  heading: string;
}
export const config: IConfig = {
  task: "create a question",
  topic: "javascript",
  questions: "10",
  type: "MCQ",
  level: "medium",
  for: "interview preparation",
  structured: "json parsable",
  format: "{question,options}[]",
  heading: "",
};

