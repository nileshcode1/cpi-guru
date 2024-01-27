

import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

import DropdownSemeter from "./dropdown";
import SPIInputTable from "./SPI";
import CPIInputTable from "./CPI";

const MainContainer = () => {
  const [selectedTab, setSelectedTab] = useState("SPI"); // Default to SPI
  const [selectedButton, setSelectedButton] = useState("CSE"); // Default to CSE
  const [selectedSemester, setSelectedSemester] = useState("Semester 1"); // Default to Semester 1

  const handleTapClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName === selectedButton ? null : buttonName);
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  useEffect(() => {
    // Set default values when the page loads
    setSelectedTab("SPI");
    setSelectedButton("CSE");
    setSelectedSemester("Semester 1");
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-fixed bg-cover  md:text-wrap ">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-3xl md:text-xl">
          <h1 className=" flex justify-center items-center text-3xl md:text-xl text-black font-bold mb-2">
            RGIPT CPI GURU 🙏
          </h1>
          <nav className="flex flex-wrap justify-between mb-6 text-xl">
            <label className="text-gray-800 hover:text-blue-500 font-semibold m-2 p-2 ">
              Branch 📚
            </label>
            <Button
              variant={selectedButton === "CSE" ? "solid" : "outline"}
              className={`text-gray-800 ${
                selectedButton === "CSE" ? "bg-blue-500" : "hover:text-blue-500"
              } font-semibold m-2 p-2`}
              onClick={() => handleButtonClick("CSE")}
            >
              CSE 💻
            </Button>
            <Button
              variant={selectedButton === "ECE" ? "solid" : "outline"}
              className={`text-gray-800 ${
                selectedButton === "ECE" ? "bg-blue-500" : "hover:text-blue-500"
              } font-semibold m-2 p-2`}
              onClick={() => handleButtonClick("ECE")}
            >
              ECE 💡
            </Button>
            <Button
              variant={selectedButton === "Other" ? "solid" : "outline"}
              className={`text-gray-800 ${
                selectedButton === "Other"
                  ? "bg-blue-500"
                  : "hover:text-blue-500"
              } font-semibold m-2 p-2`}
              onClick={() => handleButtonClick("Other")}
            >
              Other 🤖
            </Button>

            <div className="w-8"></div>
            {selectedTab === "SPI" ? (
              <label className="m-2 p-2 ">Semester 🎉</label>
            ) : (
              <label className="m-2 p-2 ">
                {selectedTab === "CPI" ? "Semester 4 🎉" : "Semester 🎉"}
              </label>
            )}
            {selectedTab === "SPI" && (
              <DropdownSemeter onChange={handleSemesterChange} />
            )}
          </nav>
        </div>
        <div className="flex justify-between">
          <Button
            fullWidth
            variant="outlined"
            className="m-1 hover:bg-blue-300 transition duration-300  "
            onClick={() => handleTapClick("SPI")}
          >
            Semester Performance Index (SPI)
          </Button>
          <Button
            fullWidth
            variant="outlined"
            className="m-1 hover:bg-blue-300 transition duration-300"
            onClick={() => handleTapClick("CPI")}
          >
            Cumulative Performance Index (CPI)
          </Button>
        </div>

        {selectedTab === "SPI" && (
          <SPIInputTable branch={selectedButton} semester={selectedSemester} />
        )}
        {selectedTab === "CPI" && <CPIInputTable />}
        <footer className="bg-[#ffffff] text-black flex justify-center ">
          <span>Made by-</span>
          <a
            href="https://github.com/nileshcode1"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline cursor-pointer hover:text-blue-500"
          >
            nileshpandey😷
          </a>
        </footer>
      </div>
    </div>
  );
};

export default MainContainer;
