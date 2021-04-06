import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "../../styles/survey.module.css";

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
        <input type="text" id="select" />
        <div className={styles.FiChevronDown}>
          <FiChevronDown />
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
