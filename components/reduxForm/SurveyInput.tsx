import React, { useEffect, useState } from "react";
import { Ans } from "../../interfaces/Data";
import styles from "../../styles/survey.module.css";

interface Props {
  label: string;
  type: "text" | "number";
  required: boolean;
  setAnswers: React.Dispatch<React.SetStateAction<Ans[]>>;
  column_match: string;
  q_id: string;
  answers: Ans[];
}

const SurveyInput: React.FC<Props> = ({
  label,
  type,
  required,
  setAnswers,
  column_match,
  q_id,
  answers
}) => {
  const [input, setInput] = useState<string>("");
  useEffect(() => {
    const ans = answers.find(a => a.q_id.toString() === q_id);
    if (ans) {
      setInput(ans.q_ans.toString());
    }
  }, []);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setAnswers(a => {
      const answers = [...a];
      const ansExist = answers.findIndex(ans => ans.q_id.toString() === q_id);
      if (ansExist !== -1) {
        answers[ansExist] = {
          column_match,
          q_id: parseInt(q_id),
          q_ans: type === "number" ? parseInt(e.target.value) : e.target.value
        };
        return answers;
      } else {
        return [
          ...a,
          {
            column_match,
            q_id: parseInt(q_id),
            q_ans: type === "number" ? parseInt(e.target.value) : e.target.value
          }
        ];
      }
    });
  };
  return (
    <div className={styles.input}>
      <label
        htmlFor="survery_inp"
        dangerouslySetInnerHTML={{
          __html: `<div>${label}</div> ${required ? `<span>*</span>` : ""}`
        }}
      />

      <input
        type={type}
        id="survery_inp"
        onChange={onInputChange}
        value={input}
      />
    </div>
  );
};

export default SurveyInput;
