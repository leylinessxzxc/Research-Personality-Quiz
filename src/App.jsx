import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const researchQuestions = [
  { question: "Do you prefer working with numbers or narratives?", options: ["Numbers", "Narratives", "Both", "Neither", "Depends on the context"] },
  { question: "Are you more interested in statistical analysis or exploring human experiences?", options: ["Statistical Analysis", "Human Experiences", "Both", "Neither", "A blend of both"] },
  { question: "Do you prefer structured data collection methods or open-ended exploration?", options: ["Structured", "Open-ended", "A mix of both", "Neither", "Flexible approach"] },
  { question: "Do you enjoy working with large datasets?", options: ["Yes", "No", "Sometimes", "Rarely", "Depends on the purpose"] },
  { question: "Would you rather conduct experiments or interviews?", options: ["Experiments", "Interviews", "Both", "Neither", "Combination of both"] }
];

const studyHabitQuestions = [
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

  const startQuiz = () => setShowTitle(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setIndex(index + 1);
    if (newAnswers.length === (isStudyHabits ? studyHabitQuestions.length : researchQuestions.length)) {
      setShowResult(true);
      determineResearchType(newAnswers);
    }
  };

  const determineResearchType = (answers) => {
    const scores = { quantitative: 0, qualitative: 0, mixed: 0, experimental: 0 };
    answers.forEach((answer, idx) => {
      Object.keys(researchTypes).forEach((type) => {
        if (researchTypes[type][idx] === answer) scores[type]++;
      });
    });
    const maxType = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
    setResearchType(maxType.charAt(0).toUpperCase() + maxType.slice(1));
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

  const getCurrentQuestions = () => {
    return isStudyHabits ? studyHabitQuestions : researchQuestions;
  };

  return (
    <div className="container">
      <AnimatePresence>
        {showTitle && (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}>
            <h1 className="logo">Research Quiz</h1>
            <select onChange={toggleQuizType} className="form-select m-3">
              <option value="research">Research Quiz</option>
              <option value="studyHabits">Study Habits Quiz</option>
            </select>
            <button onClick={startQuiz} className="btn btn-primary m-3">Start Quiz</button>
          </motion.div>
        )}
      </AnimatePresence>

      {showResult && (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}>
          <h2>Your research preference is: {researchType}</h2>
{researchType === 'Quantitative' && <p>- is a method of collecting and analyzing numerical data to understand and make predictions about the world.</p>}
{researchType === 'Qualitative' && <p>- is a method of gathering and analyzing non-numerical data to understand people's experiences and behaviors.</p>}
{researchType === 'Mixed' && <p>- is a research method that combines quantitative and qualitative data to gain a more comprehensive understanding of a research question.</p>}
{researchType === 'Experimental' && <p>- is a scientific method that involves manipulating variables to determine the cause-and-effect relationships.</p>}
          <button onClick={resetQuiz} className="btn btn-secondary mt-3">Retry</button>
        </motion.div>
      )}

      {!showTitle && !showResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="card dark-bg">
          <h2 className="white-text">{getCurrentQuestions()[index].question}</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {getCurrentQuestions()[index].options.map((option, idx) => (
              <motion.button key={idx} whileHover={{ scale: 1.1 }} onClick={() => handleAnswer(option)} className="btn btn-outline-primary m-2 dark-bg white-text">{option}</motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
