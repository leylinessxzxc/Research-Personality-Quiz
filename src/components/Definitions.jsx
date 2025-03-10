import React from 'react';

export default function Definitions() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Research Design Definitions</h1>
      <div className="card mb-3">
        <div className="card-body">
          <h3>Quantitative Research</h3>
          <p>Quantitative research focuses on numerical data and statistical analysis to identify patterns, relationships, and trends. It often uses structured methods like surveys and experiments.</p>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h3>Qualitative Research</h3>
          <p>Qualitative research explores human experiences, beliefs, and behaviors through open-ended methods such as interviews and case studies. It emphasizes context and depth rather than numerical analysis.</p>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h3>Mixed Methods Research</h3>
          <p>Mixed methods research combines both quantitative and qualitative approaches to provide a more comprehensive understanding of the research problem.</p>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h3>Experimental Research</h3>
          <p>Experimental research involves manipulating variables in a controlled environment to test hypotheses and determine cause-and-effect relationships.</p>
        </div>
      </div>
      <a href="/" className="btn btn-primary">Back to Quiz</a>
    </div>
  );
}
