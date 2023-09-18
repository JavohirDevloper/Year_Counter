import AgeCard from "./components/AgeCard";

function App() {
  return (
    <main className="App font-poppins bg-off-white min-h-screen flex lg:items-center justify-center p-4 pt-20 lg:pt-4 font-extrabold">
      <h1 className="sr-only">Age calculator</h1>
      <AgeCard />
    </main>
  );
}

export default App;
