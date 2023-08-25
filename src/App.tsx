import './App.css';
import Dashboard from './Dashboard';

//랜덤 컬러 생성
export const randomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.floor(Math.random() * 30);
  const lightness = 70 + Math.floor(Math.random() * 30);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};


//const widgetList = [
//  {
//    widgetId: 0,
//    widgetTitle: "Weather Widget",
//    widgetContent: "Today's weather: Sunny",
//    widgetColor: randomPastelColor(),
//  },
//  {
//    widgetId: 1,
//    widgetTitle: "News Widget",
//    widgetContent: "Latest news: React 18 Released!",
//    widgetColor: randomPastelColor(),
//  },
//  {
//    widgetId: 2,
//    widgetTitle: "Stock Widget",
//    widgetContent: "AAPL: $150.25 (+0.5%)",
//    widgetColor: randomPastelColor(),
//  },
//  {
//    widgetId: 3,
//    widgetTitle: "Todo List Widget",
//    widgetContent: "Tasks: Buy groceries, Finish project",
//    widgetColor: randomPastelColor(),
//  },
//  {
//    widgetId: 4,
//    widgetTitle: "Calendar Widget",
//    widgetContent: "Upcoming events: Meeting at 3 PM, Dinner with friends",
//    widgetColor: randomPastelColor(),
//  },
//  {
//    widgetId: 5,
//    widgetTitle: "Fitness Tracker Widget",
//    widgetContent: "Today's steps: 7500, Calories burned: 300",
//    widgetColor: randomPastelColor(),
//  },
//];

interface Widget {
  widgetId: number;
  widgetType: string;
  widgetColor: string;
}

const widgetList: Widget[] = [];



function App() {

  return (
    <div>
      <Dashboard
        widgetList={widgetList}
      />
    </div>
  );
}

export default App;
