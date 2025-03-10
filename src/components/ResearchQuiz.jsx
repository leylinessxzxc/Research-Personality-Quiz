import { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const questions = [
  { question: "Do you prefer working with numbers or narratives?", options: ["Numbers", "Narratives", "Both"] },
  { question: "Are you more interested in statistical analysis or exploring human experiences?", options: ["Statistical Analysis", "Human Experiences", "Both"] },
  { question: "Do you prefer structured data collection methods or open-ended exploration?", options: ["Structured", "Open-ended", "A mix of both"] },
  { question: "Do you enjoy working with large datasets?", options: ["Yes", "No", "Sometimes"] },
  { question: "Would you rather conduct experiments or interviews?", options: ["Experiments", "Interviews", "Both"] },
  { question: "Do you find mathematical models and equations appealing?", options: ["Yes", "No", "Somewhat"] },
  { question: "Are you more comfortable with surveys or case studies?", options: ["Surveys", "Case Studies", "Both"] },
  { question: "Do you prefer proving hypotheses or discovering new patterns?", options: ["Proving Hypotheses", "Discovering Patterns", "Both"] },
  { question: "Would you rather analyze trends or study individual behaviors?", options: ["Trends", "Individual Behaviors", "Both"] },
  { question: "Are you more inclined towards objective data or subjective insights?", options: ["Objective", "Subjective", "A mix of both"] },
];

const researchTypes = {
  quantitative: ["Numbers", "Statistical Analysis", "Structured", "Yes", "Experiments", "Yes", "Surveys", "Proving Hypotheses", "Trends", "Objective"],
  qualitative: ["Narratives", "Human Experiences", "Open-ended", "No", "Interviews", "No", "Case Studies", "Discovering Patterns", "Individual Behaviors", "Subjective"],
  mixed: ["Both", "Both", "A mix of both", "Sometimes", "Both", "Somewhat", "Both", "Both", "Both", "A mix of both"],
  experimental: ["Numbers", "Statistical Analysis", "Open-ended", "No", "Experiments", "Somewhat", "Surveys", "Discovering Patterns", "Trends", "A mix of both"],
};

export default function ResearchQuiz() {
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [started, setStarted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const startQuiz = () => {
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));
    setStarted(true);
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (newAnswers.length === questions.length) {
      const scores = { quantitative: 0, qualitative: 0, mixed: 0, experimental: 0 };
      newAnswers.forEach(answer => {
        Object.keys(researchTypes).forEach(type => {
          if (researchTypes[type].includes(answer)) {
            scores[type] += 1;
          }
        });
      });

      const bestMatch = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
      const resultMap = {
        quantitative: "Quantitative Research",
        qualitative: "Qualitative Research",
        mixed: "Mixed Methods Research",
        experimental: "Experimental Research",
      };

      setResult(resultMap[bestMatch] || "Your research style is unique!");
    }
  };

  const restartQuiz = () => {
    setAnswers([]);
    setResult(null);
    setStarted(false);
    setShuffledQuestions([]);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: "#f5f5f5", backgroundImage: "url('/notebook-lines.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <motion.div className="card p-4 shadow-lg text-center" style={{ maxWidth: "500px", width: "100%", margin: "auto" }}>
          <div className="card-body">
            {!started ? (
              <motion.div>
                <h1>Welcome to the Research Quiz</h1>
                <p>Find out what type of research best suits you based on your preferences!</p>
                <motion.button onClick={startQuiz}>Start Quiz</motion.button>
              </motion.div>
            ) : result ? (
              <motion.div>
                <h2>You are suited for:</h2>
                <p>{result}</p>
                <motion.button onClick={restartQuiz}>Retry</motion.button>
                <Link to="/definitions" className="btn btn-info mt-3">See Definitions</Link>
              </motion.div>
            ) : (
              <motion.div>
                <h2>Question {answers.length + 1} of {shuffledQuestions.length}</h2>
                <p>{shuffledQuestions[answers.length].question}</p>
                {shuffledQuestions[answers.length].options.map((option) => (
                  <motion.button key={option} onClick={() => handleAnswer(option)}>{option}</motion.button>
                ))}
              </motion.div>
            )}
          </div>
          <footer className="text-center mt-4">Programmed by Leigh Ellis M. Velasco from 12 - STEM B<br />For Research Capstone Purposes</footer>
        </motion.div>
      </div>
    </div>
  );
}
