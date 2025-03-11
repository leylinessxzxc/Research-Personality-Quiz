import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const researchQuestions = [
  { question: "Do you prefer working independently or collaboratively?", options: ["Independently", "Collaboratively", "Both", "Neither", "Depends on the project"] },
  { question: "Are you more comfortable with numerical analysis or qualitative interpretation?", options: ["Numerical Analysis", "Qualitative Interpretation", "Both", "Neither", "Context-based"] },
  { question: "Do you enjoy researching past studies or conducting your own experiments?", options: ["Past Studies", "Own Experiments", "Both", "Neither", "Combination"] },
  { question: "Do you prefer working with numbers or narratives?", options: ["Numbers", "Narratives", "Both", "Neither", "Depends on the context"] },
  { question: "Are you more interested in statistical analysis or exploring human experiences?", options: ["Statistical Analysis", "Human Experiences", "Both", "Neither", "A blend of both"] },
  { question: "Do you prefer structured data collection methods or open-ended exploration?", options: ["Structured", "Open-ended", "A mix of both", "Neither", "Flexible approach"] },
  { question: "Do you enjoy working with large datasets?", options: ["Yes", "No", "Sometimes", "Rarely", "Depends on the purpose"] },
  { question: "Would you rather conduct experiments or interviews?", options: ["Experiments", "Interviews", "Both", "Neither", "Combination of both"] }
];

const studyHabitQuestions = [
  { question: "How often do you take breaks while studying?", options: ["Every hour", "Occasionally", "Rarely", "Never", "Only when tired"] },
  { question: "Do you use digital tools to organize your study materials?", options: ["Always", "Sometimes", "Rarely", "Never", "Only during exams"] },
  { question: "Do you prefer visual aids like diagrams and charts or text-based notes?", options: ["Visual Aids", "Text-Based", "Both", "Neither", "Depends on the topic"] },
  { question: "How often do you review your notes after class?", options: ["Daily", "Weekly", "Before exams", "Rarely", "Never"] },
  { question: "Do you prefer studying alone or with a group?", options: ["Alone", "Group", "Depends on the subject", "No preference", "Both"] },
  { question: "How do you usually take notes?", options: ["Typed", "Handwritten", "Voice recordings", "Summarized", "Detailed"] },
  { question: "Do you follow a strict study schedule?", options: ["Always", "Sometimes", "Rarely", "Never", "Only during exams"] },
  { question: "What study environment do you prefer?", options: ["Quiet", "Background music", "Coffee shop", "Library", "At home"] }
];

const researchTypes = {
  quantitative: ["Numbers", "Statistical Analysis", "Structured", "Yes", "Experiments"],
  qualitative: ["Narratives", "Human Experiences", "Open-ended", "No", "Interviews"],
  mixed: ["Both", "Both", "A mix of both", "Sometimes", "Both"],
  experimental: ["Numbers", "Statistical Analysis", "Open-ended", "No", "Experiments"]
};

export default function ResearchQuiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [isStudyHabits, setIsStudyHabits] = useState(false);
  const [researchType, setResearchType] = useState("");
  const [resultHistory, setResultHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("resultHistory")) || [];
    setResultHistory(savedResults);
  }, []);

  const saveResult = (type) => {
    const updatedResults = [...resultHistory, { type, date: new Date().toLocaleString() }];
    setResultHistory(updatedResults);
    localStorage.setItem("resultHistory", JSON.stringify(updatedResults));
  };

  const startQuiz = () => setShowTitle(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setIndex(index + 1);
    const currentQuestions = getCurrentQuestions();
    if (newAnswers.length === currentQuestions.length) {
      setShowResult(true);
      determineResearchType(newAnswers);
    }
  };

  const determineResearchType = (answers) => {
    const scores = { quantitative: 0, qualitative: 0, mixed: 0, experimental: 0 };
    answers.forEach((answer) => {
      Object.keys(researchTypes).forEach((type) => {
        if (researchTypes[type].includes(answer)) scores[type]++;
      });
    });
    const maxType = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
    const finalType = maxType.charAt(0).toUpperCase() + maxType.slice(1);
    setResearchType(finalType);
    saveResult(finalType);
  };

  const resetQuiz = () => {
    setIndex(0);
    setAnswers([]);
    setShowResult(false);
    setShowTitle(true);
    setResearchType("");
  };

  const toggleQuizType = (event) => {
    setIsStudyHabits(event.target.value === "studyHabits");
    resetQuiz();
  };

  const toggleHistory = () => setShowHistory(!showHistory);

  const getCurrentQuestions = () => {
    return isStudyHabits ? studyHabitQuestions : researchQuestions;
  };

  return (
    <div className="container">
      {showHistory ? (
        <div>
          <h2>Quiz Results History</h2>
          <ul>
            {resultHistory.map((result, idx) => (
              <li key={idx}>{result.type} - {result.date}</li>
            ))}
          </ul>
          <button onClick={toggleHistory} className="btn btn-secondary">Back</button>
        </div>
      ) : (
        <div>
          <button onClick={toggleHistory} className="btn btn-info">View Results History</button>
        </div>
      )}
    </div>
  );
}
