import "./App.css";
import MainContainer from "./components/maincontainer";

function App() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen flex flex-col items-center justify-center ">
      <div className="flex-grow">
        <h1 className="text-3xl md:text-xl text-white flex md:justify-center sm:justify-center pt-10 font-bold  ">
          RGIPT CPI GURU 🙏
        </h1>
        <MainContainer />
      </div>
    </div>
  );
}

export default App;
