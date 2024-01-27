// import "./App.css";
// import MainContainer from "./components/maincontainer";

// function App() {
//   return (
//     <div className="bg-[#0A0A0A] min-h-screen flex flex-col items-center justify-center ">
//       <div className="flex-grow">
//         <h1 className="text-3xl md:text-xl text-white flex md:justify-center sm:justify-center mt-10 mb-20 font-bold  ">
//           RGIPT CPI GURU 🙏
//         </h1>
      

//         <MainContainer />
//       </div>
//     </div>
//   );
// }

// export default App;
import "./App.css";
import MainContainer from "./components/maincontainer";

function App() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-xl text-white font-bold mt-10 mb-4 z-10">
        
      </h1>
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full max-w-screen-xl">
          <MainContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
