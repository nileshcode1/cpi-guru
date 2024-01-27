import React, { useState } from "react";
import Select from "react-select";

const DropdownSemester = ({ onChange }) => {
  const [selectedVersion, setSelectedVersion] = useState({
    value: "Semester 1",
    label: "Semester 1",
  });

  const handleVersionChange = (selectedOption) => {
    setSelectedVersion(selectedOption);
    // Call the parent component's onChange callback with the selected semester
    if (onChange) {
      onChange(selectedOption.value);
    }
  };

  const semesterOptions = [];
  for (let i = 1; i <= 8; i++) {
    const semesterValue = `Semester ${i}`;
    semesterOptions.push({ value: semesterValue, label: semesterValue });
  }

  return (
    <div className="w-25 relative inline-flex mt-2 text-xl ">
      <Select
        options={semesterOptions}
        onChange={handleVersionChange}
        value={selectedVersion}
        placeholder="Select Version"
      />
    </div>
  );
};

export default DropdownSemester;
