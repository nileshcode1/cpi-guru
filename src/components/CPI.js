import { Input } from "@material-tailwind/react";

import React, { useState, useEffect } from "react";

const CPIInputTable = () => {
  const [spis, setSpis] = useState([]);
  const [totalCPI, setTotalCPI] = useState(0);

  const credits = require("../static/credits.json");
  const selectedBranch = "cse";
  const totalSemesters = 4;

  const textfield = (i) => `SPI of Semester ${i}`;

  const getSemCredit = (sem) => {
    let branch = 0;
    if (selectedBranch === "ece") {
      branch = 1;
    } else if (selectedBranch === "me") {
      branch = 2;
    }
    return parseInt(credits[`sem${sem}`][branch]);
  };

  const calc = (num) => {
    let numstr = num.toString();
    numstr = numstr.slice(0, numstr.indexOf(".") + 4);
    return Number(numstr);
  };

  useEffect(() => {
    // Update totalCPI when spis state changes
    const calculatedCPI = calc(
      spis.reduce((acc, value, index) => {
        const semCredit = getSemCredit(index + 1);
        return acc + semCredit * value;
      }, 0) / spis.reduce((acc, _, index) => acc + getSemCredit(index + 1), 0)
    );

    setTotalCPI(calculatedCPI);
  }, [spis]);

    // const captions = () => {
    //   if (totalCPI <= 10 && totalCPI > 8.5) {
    //     return "Can expect to go to JAPAN 🇯🇵 🤓";
    //   } else if (totalCPI <= 8.5 && totalCPI > 7.8) {
    //     return "Macchaa! Rocked it 😎";
    //   } else if (totalCPI <= 7.8 && totalCPI > 7) {
    //     return "Cool, great score 🥂";
    //   } else if (totalCPI <= 7 && totalCPI > 6) {
    //     return "Needs to put extra effort 🔨";
    //   } else if (totalCPI <= 6) {
    //     return "Padh lo thoda bro 😐";
    //   }
    //   return "It Seems, you have entered the wrong value ❌";
    // };
    const captions = () => {
      // Check if there are any non-empty SPI inputs
      const anyNonEmptySPI = spis.some((spi) => spi !== 0);

      if (anyNonEmptySPI) {
        const totalCPI = calc(
          spis.reduce((acc, value, index) => {
            const semCredit = getSemCredit(index + 1);
            return acc + semCredit * value;
          }, 0) /
            spis.reduce((acc, _, index) => acc + getSemCredit(index + 1), 0)
        );

        if (!isNaN(totalCPI)) {
          if (totalCPI <= 10 && totalCPI > 8.5) {
            return "Can expect to go to JAPAN 🇯🇵 🤓";
          } else if (totalCPI <= 8.5 && totalCPI > 7.8) {
            return "Macchaa! Rocked it 😎";
          } else if (totalCPI <= 7.8 && totalCPI > 7) {
            return "Cool, great score 🥂";
          } else if (totalCPI <= 7 && totalCPI > 6) {
            return "Needs to put extra effort 🔨";
          } else if (totalCPI <= 6) {
            return "Padh lo thoda bro 😐";
          }
        }
        return "It Seems, you have entered the wrong value ❌";
      }

      // If no input is filled, hide the caption
      return "";
    };


  const tweenCPI = totalCPI.toFixed(1);

  return (
    <>
      <div>
        <div className="flex flex-auto justify-between ml-10 mb-4">
          <table className="w-full">
            <tbody>
              {Array.from({ length: totalSemesters }, (_, index) => (
                <tr key={index}>
                  <td className="w-1/4 overflow-hidden">
                    {textfield(index + 1)}
                  </td>
                  <td className="w-1/4"></td>
                  <td className="w-1/4">
                    <div className="w-full md:w-50 mr-10 mb-2 mt-4">
                      <Input
                        className="  w-full md:w-40 h-10 mb-2 mt-4  border border-gray-300 outline-none transition duration-300 hover:border-bold"
                        type="number"
                        step={0.1}
                        placeholder="Enter SPI"
                        onChange={(e) => {
                          const newValue = parseFloat(e.target.value);
                          setSpis((prevSpis) => {
                            const updatedSpis = [...prevSpis];
                            updatedSpis[index] = isNaN(newValue) ? 0 : newValue;
                            return updatedSpis;
                          });
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
          className="text-black text-3xl mr-10"
          style={{ fontFamily: "Chelsea Market", fontSize: "24px" }}
        >
          Credit score: {tweenCPI}
        </h3>
        <h3
          className="mr-2 text-orange-600"
          style={{ fontFamily: "Chelsea Market", fontSize: "24px" }}
        >
          {captions()}
        </h3>
      </div>
    </>
  );
};

export default CPIInputTable;
