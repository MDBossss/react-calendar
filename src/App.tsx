import Calendar from "./components/Calendar"

const App = () => {

  return (
    <main className="mx-auto max-w-7xl py-20 h-full"> 
      <Calendar weekStartsOn={1}/>
    </main>
  )
}

export default App