import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import Grid from "@mui/material/Grid";
import WidgetCard from "./WidgetCard";
//import WidgetComponent from "./WidgetComponent";
import { Button, Card, CardContent, Input } from "@mui/material";
import { randomPastelColor } from "./App";
//import Image42 from "./assets/image42.jpeg";
import TextInputWidget from "./components/TextInputWidget";
import ImageInputWidget from "./components/ImageInputWidget";

const Dummy1 = {
  widgetId: 10,
  widgetColor: "#ffffff",
}


interface DashboardProps {
  widgetList: Array<any>;
}


//interface LayoutItem {
//  x: number;
//  y: number;
//  w: number;
//  h: number;
//}

//반응형 그리드 레이아웃 사용
//여러 브레이크 포인트에 대한 레이아웃을 정의할 수 있다.
const ResponsiveGridLayout = WidthProvider(Responsive);

//고정된 그리드를 기준으로 부모요소의 너비에 따라 반응한다.
//const ResponsiveGridLayout = WidthProvider(React-grid-layout);

const Dashboard: React.FC<DashboardProps> = ({
  widgetList,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  
  //현재 break point
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");

  //아이템 추가시의 index값
  const [index, setIndex] = useState(widgetList.length);
  
  //그리드 영역이 꽉 차면 더이상 drop할 수 없음
  const [droppable, setDroppable] = useState(true);

  //drag-drop중 onLayoutChange막기위함
  const [isDroppaing, setIsDropping] = useState(false);
  //droppable item 속성 설정
  const [droppingItem, setDroppingItem] = useState({ i: "__dropping-elem__", w: 1, h: 1 });

  //위젯 리스트
  const [widgets, setWidgets] = useState(widgetList);
  
  const [state, setState] = useState<{
    breakpoints: string;
    layouts: {
      [key: string]: {
        x: number; 
        y: number;
        w: number;
        h: number;
        i: string;
        minW?: number; 
        minH?: number; 
      }[];
    };
  }>({
    breakpoints: "lg",
    layouts: {
      lg: [
      ],
      md: [
      ],
      sm: [
      ],
      xs: [
      ],
      xxs: [
      ],
    },
  });

  //레이아웃 공간 계산
  useEffect(() => {
    let totalVol = 0;
    widgets.map(
      (widget, index) =>
        (totalVol +=
          state.layouts[currentBreakpoint][index].w *
          state.layouts[currentBreakpoint][index].h)
    );
    console.log("totalVolume: ", totalVol);
    if (totalVol >= 30) {
      console.log("grid is full!");
      setDroppable(false);
    }
  }, [state]);

  //레이아웃이 변경될 때, 그 정보를 업데이트 한다.
  const onLayoutChange = (layout: any, layouts: any) => {
    console.log("on change layout", layout);
    //console.log("breakpoint", currentBreakpoint, "layouts", layouts);

    //아이템이 dropping중 이라면 return
    if (isDroppaing) {
      return ;
    }
    // 모든 breakpoint에 동일한 변경 사항을 반영
    const updatedLayouts = Object.keys(layouts).reduce((acc: any, breakpoint) => {
      acc[breakpoint] = layout;
      return acc;
    }, {});
    setState((prevState) => ({
      ...prevState,
      layouts: updatedLayouts,
    }));
  };
  
  //Drag시작할 때
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    //isDropping state 변경
    setIsDropping(true);

    //drag하는 item 종류 (id)에 따라 dropping item 속성 변경
    if (event.currentTarget.id === 'text-input') {
      setDroppingItem({ i: "__dropping-elem__", w: 2, h: 1 });
    }
    else if (event.currentTarget.id === 'image-input') {
      setDroppingItem({ i: "__dropping-elem__", w: 2, h: 2 });
    }
    //drag 하는 item의 종류를 나중에 판별할 수 있도록 setData
    event.dataTransfer.setData("text/plain", event.currentTarget.id);
  };



  //onDrop함수!!!!
  const onDrop = (layout: Layout[], layoutItem: Layout, event: Event) => {
    //레이아웃 업데이트
    //console.log("item:", layoutItem);
    //console.log("event:", event);
    
    //drop하는 element의 종류(id) 가져옴 - handleDragStart에서 set했던 data를 get
    const droppedElementId = (event as any).dataTransfer.getData("text/plain");
    //console.log("Dropped element ID:", droppedElementId);
    
    //drop의 위치가 grid 벗어날 경우
    if (layoutItem.x + layoutItem.w > 5 || layoutItem.y + layoutItem.h > 6){
      console.log("wrong-drop!");
      return ;
    }

    setState((prevState) => {
      const newLayouts = { ...prevState.layouts };
      const newItem = {
        x: layoutItem.x,
        y: layoutItem.y,
        w: layoutItem.w,
        h: layoutItem.h,
        i: String(index),
        //text-input의 최소 크기 2 * 1
        ...(droppedElementId === "text-input" ? { minW: 2 } : {}),
        //image-input의 최소 크기 2 * 2
        ...(droppedElementId === "image-input" ? { minW: 2, minH: 2 } : {})
      };
      // 모든 breakpoint에 대해 동일한 항목 추가
      Object.keys(newLayouts).forEach((breakpoint) => {
        if (newLayouts[breakpoint]) {
          newLayouts[breakpoint].push(newItem);
        }
      });
      return {
        ...prevState,
        layouts: newLayouts,
      };
    });

    //위젯내용 업데이트
    setWidgets((prevWidgets) => [
      ...prevWidgets,
      {
        widgetId: index,
        widgetType: droppedElementId,
        widgetColor: randomPastelColor(),
      },
    ]);
    console.log("ondrop:", state);
    setIndex(index + 1);
    //drag-drop 종료
    setIsDropping(false);
  };

  //브레이크포인트가 변경될 때
  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
    setState((prevState) => ({
      ...prevState,
      breakpoints: breakpoint,
    }));
    console.log("breakpoint change!: ", breakpoint);
  };

  return (
    <>
      {/* 헤더 영역 */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          maxWidth: "1200px",
        }}
      >
        <h1>Dashbord</h1>
        {/* 편집 버튼 */}
        <Button onClick={() => setIsEditMode(!isEditMode)} size="large" sx={{fontWeight: "bold"}}>
          {isEditMode ? "확인" : "편집"}
        </Button>
      </div>
      {/* 툴박스 영역 */}
      <div style={{ backgroundColor: "skyblue", borderRadius: "5px", padding: 10, display: "flex", maxWidth: "1185px",}}>
        {/* 드롭할 수 있는 요소1 - 텍스트 박스 놓기 */}
        <Card
          style={{
            backgroundColor: "white",
            width: "100px",
            alignItems: "center",
            margin: 10,
          }}
          //드롭 가능한 요소 표시
          className="droppable-element"
          //드래그 가능한 요소 표시
          draggable={true}
          //요소의 type을 id로 지정
          id="text-input"
          //드래그가 시작될 때 실행되는 함수
          onDragStart={handleDragStart}
        >
          <CardContent>
            <h3>Text Box</h3>
          </CardContent>
        </Card>
        {/* 드롭할 수 있는 요소2 - 이미지 박스 놓기 */}
        <Card
          style={{
            width: "100px",
            alignItems: "center",
            margin: 10,
          }}
          //드롭 가능한 요소 표시
          className="droppable-element"
          //드래그 가능한 요소 표시
          draggable={true}
          //요소의 type을 id로 지정
          id="image-input"
          //드래그가 시작될 때 실행되는 함수
          onDragStart={handleDragStart}
        >
          <CardContent>
            <h3>Image Box</h3>
          </CardContent>
        </Card>
      </div>

      {/* 그리드 영역 */}
      <ResponsiveGridLayout
        layouts={state.layouts}
        //브레이크 포인트 기준
        breakpoints={{
          lg: 1200,
          md: 996,
          sm: 768,
          xs: 480,
          xxs: 0,
        }}
        //한 행이나 열에서 아이템 배치에 따라 컴팩트하게 재배치되는 것을 방지
        compactType={null}
        //하나의 그리드 아이템이 다른 아이템 위로 드래그되거나 리사이즈되는 것을 방지
        preventCollision={true}
        //브레이크 포인트마다의 column 개수
        cols={{ lg: 5, md: 5, sm: 5, xs: 5, xxs: 5 }}
        //각 행의 높이 (px)
        rowHeight={150}
        //그리드 너비
        width={1200}
        //최대 행 개수
        maxRows={6}
        //isEditMode일때만 grid내의 resize, drag가능
        //그리드 아이템의 resize 가능 여부
        isResizable={isEditMode}
        //그리드 아이템의 drag 가능 여부
        isDraggable={isEditMode}
        //그리드에 외부요소 drop 가능 여부
        isDroppable={droppable}
        //그리드에 drop되는 item의 속성 default => {i: "__dropping-elem__", h: 1, w: 1}
        droppingItem={droppingItem}

        //그리드 크기 제한
        style={{
          //너비는 reponsive에 맞게 최소 480~1200
          maxWidth: "1200px",
          minWidth: "480px",
          //높이 고정 (행이 6개일 때 기준, 150 * 6 + margin, padding 값 포함)
          minHeight: "970px", 
          maxHeight: "970px",
          borderRadius: "5px",
          border: "2px solid #3a3a3a",
        }}

        //그리드 내에 변화가 생겼을 때 호출되는 함수
        onLayoutChange={onLayoutChange}
        //화면상의 그리드의 너비에 따라 breakpoint가 바뀌었을 때 호출되는 함수
        onBreakpointChange={onBreakpointChange}
        //외부 요소가 drop 되었을 때 호출되는 함수
        onDrop={onDrop}
      >
        {widgets.map((widget, index) => (
          // 초기 위젯 위치와 높이 설정
          // 위젯의 인덱스 값 -> state의 layout index값으로 찾아옴
          <div
            key={widget.widgetId}
            data-grid={{
              x: state.layouts[currentBreakpoint][index].x,
              y: state.layouts[currentBreakpoint][index].y,
              w: state.layouts[currentBreakpoint][index].w,
              h: state.layouts[currentBreakpoint][index].h,
              minW: state.layouts[currentBreakpoint][index].minW,
              minH: state.layouts[currentBreakpoint][index].minH,
            }}
          >
            <Grid item sx={{ width: "100%", height: "100%" }}>
              <WidgetCard widgetInfo={widget}>
                {widget.widgetType === "text-input" &&
                  <TextInputWidget/>
                }
                {widget.widgetType === "image-input" &&
                  <ImageInputWidget/>
                }
              </WidgetCard>
            </Grid>
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
};

export default Dashboard;
