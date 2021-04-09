import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Ans, Survey } from "../../interfaces/Data";
import styles from "../../styles/survey.module.css";

interface Props {
  dropdown_options: Survey["q_options"];
  select_type: "select" | "multiselect";
  text: string;
  required: boolean;
  setAnswers: React.Dispatch<React.SetStateAction<Ans[]>>;
  column_match: string;
  q_id: string;
}

const MultiSelect: React.FC<Props> = ({
  dropdown_options,
  select_type,
  text,
  required,
  setAnswers,
  column_match,
  q_id
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<
    typeof dropdown_options
  >([]);
  const [singleOption, setSingleOption] = useState<typeof dropdown_options[0]>(
    dropdown_options[0]
  );
  const openRef = useRef<HTMLDivElement>();
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    setAnswers(a => {
      const answers = [...a];
      const ansExist = answers.findIndex(ans => ans.q_id.toString() === q_id);
      if (ansExist !== -1) {
        answers[ansExist] = {
          column_match,
          q_id: parseInt(q_id),
          q_ans: dropdown_options[0].name
        };
        return answers;
      } else {
        return [
          ...a,
          {
            column_match,
            q_id: parseInt(q_id),
            q_ans: dropdown_options[0].name
          }
        ];
      }
    });
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e: Event) => {
    // @ts-ignore
    if (openRef.current && !openRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  const handleSelect = (optn: typeof dropdown_options[0]) => {
    if (select_type === "multiselect") {
      setSelectedOptions(o => {
        const itemExist = o.find(i => i.id === optn.id);
        if (itemExist) {
          return o.filter(i => i.id !== optn.id);
        }
        return [...o, optn];
      });
      setAnswers(a => {
        const answers = [...a];
        const ansExist = answers.findIndex(ans => ans.q_id.toString() === q_id);
        if (ansExist !== -1) {
          answers[ansExist] = {
            column_match,
            q_id: parseInt(q_id),
            q_ans: `${answers[ansExist].q_ans}, ${optn.name}`
          };
          return answers;
        } else {
          return [
            ...a,
            { column_match, q_id: parseInt(q_id), q_ans: optn.name }
          ];
        }
      });
    }
    if (select_type === "select") {
      setSingleOption(optn);
      setAnswers(a => {
        const answers = [...a];
        const ansExist = answers.findIndex(ans => ans.q_id.toString() === q_id);
        if (ansExist !== -1) {
          answers[ansExist] = {
            column_match,
            q_id: parseInt(q_id),
            q_ans: optn.name
          };
          return answers;
        } else {
          return [
            ...a,
            { column_match, q_id: parseInt(q_id), q_ans: optn.name }
          ];
        }
      });
    }
  };
  const setInputValue = (): string | string[] => {
    if (select_type === "multiselect") {
      if (selectedOptions.length) {
        return selectedOptions.map(o => o.name);
      }
      return dropdown_options[0].name;
    }
    return singleOption.name;
  };
  const setSelectedClassName = (o: typeof dropdown_options[0]): string => {
    if (select_type === "multiselect") {
      const isSelected = selectedOptions.some(op => op.id === o.id);
      if (isSelected) {
        return styles.selected;
      }
      return "";
    }
    if (singleOption.id === o.id) {
      return styles.selected;
    }
    return "";
  };
  return (
    <div className={styles.select}>
      <label
        htmlFor="select"
        dangerouslySetInnerHTML={{
          __html: `<div>${text}</div> ${required ? `<span>*</span>` : ""}`
        }}
      />
      <div
        onClick={() => setOpen(true)}
        ref={openRef}
        className={styles.select_core}
      >
        <input type="text" id="select" value={setInputValue()} disabled />
        <div
          className={`${styles.FiChevronDown} ${
            open ? styles.FiChevronDown__open : ""
          }`}
        >
          <FiChevronDown size={20} />
        </div>
        <div
          className={`${styles.dropdown} ${open ? styles.dropdown__show : ""}`}
        >
          {dropdown_options.map(o => (
            <div
              key={o.id}
              onClick={() => handleSelect(o)}
              className={setSelectedClassName(o)}
            >
              <p>{o.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
