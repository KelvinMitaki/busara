import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "../../styles/survey.module.css";

interface Props {
  dropdown_options: string[];
}

const MultiSelect = () => {
  const [open, setOpen] = useState<boolean>(false);
  const openRef = useRef<HTMLDivElement>();
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
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
  return (
    <div className={styles.select}>
      <label htmlFor="select">select one option</label>
      <div
        onClick={() => setOpen(true)}
        ref={openRef}
        className={styles.select_core}
      >
        <input type="text" id="select" value="Nairobi" disabled />
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
          <div>
            <p>test 1</p>
          </div>
          <div>
            <p>test 2</p>
          </div>
          <div>
            <p>test 3</p>
          </div>
          <div>
            <p>test 4</p>
          </div>
          <div>
            <p>test 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
