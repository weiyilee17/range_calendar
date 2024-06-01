import RangeCalendar from './components/RangeCalendar';

function App() {
  return (
    <>
      <RangeCalendar currentMonthOnly currentDate={new Date(2022, 6, 27)} />
    </>
  );
}

export default App;
