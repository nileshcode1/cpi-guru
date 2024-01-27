import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";

import cse from "../static/cse.json";
import ece from "../static/ece.json";
import other from "../static/other.json";

const SPIInputTable = ({ branch, semester }) => {
  const selectedSemesterIndex = parseInt(semester?.split(" ")[1]) || 1;

  let Semester = [];

  if (branch === "CSE") {
    Semester = cse[selectedSemesterIndex - 1] || [];
  } else if (branch === "ECE") {
    Semester = ece[selectedSemesterIndex - 1] || [];
  } else if (branch === "Other") {
    Semester = other[selectedSemesterIndex - 1] || [];
  }

  const [gradeInputs, setGradeInputs] = useState(
    Array(Semester.length).fill("")
  );

  const getScore = (grade) => {
    switch (grade) {
      case "O":
      case "o":
        return 10;
      case "A+":
      case "a+":
        return 10;
      case "A":
      case "a":
        return 9;
      case "B+":
      case "b+":
        return 8;
      case "B":
      case "b":
        return 7;
      case "C+":
      case "c+":
        return 6;
      case "C":
      case "c":
        return 5;
      case "D+":
      case "d+":
        return 4;
      case "D":
      case "d":
        return 3;
      case "F":
      case "f":
        return 2;
      case "SS":
        return 0;
      case "ss":
        return 0;
      default:
        return -1;
    }
  };

  const calculateCreditScore = () => {
    let totalScore = 0;
    let totalCredits = 0;

    const nonEmptyGrades = gradeInputs.filter((grade) => grade.trim() !== "");

    if (nonEmptyGrades.length === 0) {
      return 0; // Set default score to 0 if no grades are entered
    }

    Semester.forEach((course, index) => {
      const courseGrade = gradeInputs[index];
      const credit = course.courseCredits;

      totalScore += getScore(courseGrade) * credit;
      totalCredits += credit;
    });

    const averageScore = totalScore / totalCredits;

    return isNaN(averageScore) ? 0 : averageScore.toFixed(1);
  };

  useEffect(() => {
    // Clear the input fields when the semester changes
    setGradeInputs(Array(Semester.length).fill(""));
  }, [selectedSemesterIndex]);

  const captions = () => {
    const calculatedCreditScore = calculateCreditScore();

    // Check if there are any non-empty grade inputs
    const anyNonEmptyGrade = gradeInputs.some((grade) => grade.trim() !== "");

    if (anyNonEmptyGrade) {
      if (!isNaN(calculatedCreditScore) && calculatedCreditScore >= 0) {
        if (calculatedCreditScore > 8.5) {
          return "Ab To Gold Medal Pakka😜🤓";
        } else if (calculatedCreditScore > 7.8) {
          return "Machaa, Rocked it 😎";
        } else if (calculatedCreditScore > 7) {
          return "Cool, great score 🥂";
        } else if (calculatedCreditScore > 6) {
          return "Needs to put extra effort 🔨";
        } else {
          return "Padh lo thoda bro 😐";
        }
      }

      return "It Seems, you have entered the wrong value ❌";
    }

    // If no input is filled, hide the caption
    return "";
  };

  return (
    <>
      <div>
        <div className="flex flex-auto justify-between ml-10 mb-4">
          <table className="w-full">
            <tbody>
              {Semester.map((course, index) => (
                <tr key={course.courseCode}>
                  <td className="w-1/4 overflow-hidden">
                    {course.courseCode} {course.courseName}
                  </td>
                  <td className="w-1/4"></td>
                  <td className="w-1/4">
                    <div className=" w-full md:w-72 mr-10 mb-2 mt-4">
                      <Input
                        type="text"
                        placeholder="Course Grade"
                        value={gradeInputs[index]}
                        onChange={(e) => {
                          const newGradeInputs = [...gradeInputs];
                          newGradeInputs[index] = e.target.value;
                          setGradeInputs(newGradeInputs);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between">
        <h3
          className="text-black text-xl md:text-xl "
          style={{ fontFamily: "Chelsea Market", fontSize: "24px" }}
        >
          Credit score: {calculateCreditScore()}/10
        </h3>
        <h3
          className="mr-20 text-orange-600 hidden md:block"
          style={{ fontFamily: "Chelsea Market", fontSize: "24px" }}
        >
          {captions()}
        </h3>
      </div>
    </>
  );
};

export default SPIInputTable;
