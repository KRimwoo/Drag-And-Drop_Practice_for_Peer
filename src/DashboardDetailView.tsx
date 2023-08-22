import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import Grid from "@mui/material/Grid";
import WidgetCard from "./WidgetCard";
import WidgetComponent from "./WidgetComponent";
import { Button, Input } from "@mui/material";
import { randomPastelColor } from "./App";
import Image42 from "./assets/image42.jpeg";

interface DashboardDetailViewProps {
  widgetList: Array<any>;
}

interface LayoutItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

//반응형 그리드 레이아웃 사용
//여러 브레이크 포인트에 대한 레이아웃을 정의할 수 있다.
const ResponsiveGridLayout = WidthProvider(Responsive);

//고정된 그리드를 기준으로 부모요소의 너비에 따라 반응한다.
//const ResponsiveGridLayout = WidthProvider(React-grid-layout);

const DashboardDetailView: React.FC<DashboardDetailViewProps> = ({
  widgetList,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [widgets, setWidgets] = useState(widgetList);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [index, setIndex] = useState(widgetList.length);

  const [droppable, setDroppable] = useState(true);

  const [droppingItem, setDroppingItem] = useState({ i: "__dropping-elem__", w: 1, h: 1 });

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
        { x: 0, y: 0, w: 1, h: 1, i: "0" },
        { x: 0, y: 0, w: 1, h: 1, i: "1" },
        { x: 0, y: 0, w: 1, h: 1, i: "2" },
        { x: 0, y: 0, w: 1, h: 1, i: "3" },
        { x: 0, y: 0, w: 1, h: 1, i: "4" },
        { x: 0, y: 0, w: 1, h: 1, i: "5" },
      ],
      md: [
        { x: 0, y: 0, w: 1, h: 1, i: "0" },
        { x: 0, y: 0, w: 1, h: 1, i: "1" },
        { x: 0, y: 0, w: 1, h: 1, i: "2" },
        { x: 0, y: 0, w: 1, h: 1, i: "3" },
        { x: 0, y: 0, w: 1, h: 1, i: "4" },
        { x: 0, y: 0, w: 1, h: 1, i: "5" },
      ],
      sm: [
        { x: 0, y: 0, w: 1, h: 1, i: "0" },
        { x: 0, y: 0, w: 1, h: 1, i: "1" },
        { x: 0, y: 0, w: 1, h: 1, i: "2" },
        { x: 0, y: 0, w: 1, h: 1, i: "3" },
        { x: 0, y: 0, w: 1, h: 1, i: "4" },
        { x: 0, y: 0, w: 1, h: 1, i: "5" },
      ],
      xs: [
        { x: 0, y: 0, w: 1, h: 1, i: "0" },
        { x: 0, y: 0, w: 1, h: 1, i: "1" },
        { x: 0, y: 0, w: 1, h: 1, i: "2" },
        { x: 0, y: 0, w: 1, h: 1, i: "3" },
        { x: 0, y: 0, w: 1, h: 1, i: "4" },
        { x: 0, y: 0, w: 1, h: 1, i: "5" },
      ],
      xxs: [
        { x: 0, y: 0, w: 1, h: 1, i: "0" },
        { x: 0, y: 0, w: 1, h: 1, i: "1" },
        { x: 0, y: 0, w: 1, h: 1, i: "2" },
        { x: 0, y: 0, w: 1, h: 1, i: "3" },
        { x: 0, y: 0, w: 1, h: 1, i: "4" },
        { x: 0, y: 0, w: 1, h: 1, i: "5" },
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
    console.log(totalVol);
    if (totalVol >= 30) {
      setDroppable(false);
    }
  }, [state]);

  //레이아웃이 변경될 때, 해당 브레이크포인트에 레이아웃 정보를 업데이트 힌다
  const onLayoutChange = (layout: any, layouts: any) => {
    console.log("layout", layout);
    // setState((prevState) => ({
    //   ...prevState,
    //   layouts: layouts,
    // }));
    // console.log("layoutchange:", state);
    // //drop이 있을경우
    // const currentLayout = layouts[currentBreakpoint];
    // console.log("currentlayout:", currentLayout);
    // if (currentLayout) {
    //   const droppingElem = currentLayout.find(
    //     (item: any) => item.i === "__dropping-elem__"
    //   );
    //   console.log(droppingElem);
    //   if (droppingElem) {
    //     setWidgets((prevWidgets) => [
    //       ...prevWidgets,
    //       {
    //         widgetId: index,
    //         widgetTitle: title,
    //         widgetContent: content,
    //         widgetColor: randomPastelColor(),
    //       },
    //     ]);
    //   }
    // }
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: any) => {
    setContent(event.target.value);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    if (event.currentTarget.id === 'text-input') {
      setDroppingItem({ i: "__dropping-elem__", w: 2, h: 1 });
    }
    else if (event.currentTarget.id === 'image-input') {
      setDroppingItem({ i: "__dropping-elem__", w: 2, h: 2 });
    }
    event.dataTransfer.setData("text/plain", event.currentTarget.id);
  };

  const onDrop = (layout: Layout[], layoutItem: Layout, event: Event) => {
    //레이아웃 업데이트
    console.log("item:", layoutItem);
    console.log("event:", event);
    const droppedElementId = (event as any).dataTransfer.getData("text/plain");
    console.log("Dropped element ID:", droppedElementId);
    
    if (droppedElementId === "text-input") {
      if (layoutItem.x + 2 > 5 || layoutItem.y + layoutItem.h > 6){
        console.log("wrong-drop!");
        return ;
      }
      setState((prevState) => {
        const newLayouts = { ...prevState.layouts };
        const newItem = {
          x: layoutItem.x,
          y: layoutItem.y,
          w: 2,
          h: layoutItem.h,
          i: String(index),
          minW: 2,
        };
        // 모든 브레이크포인트에 대해 동일한 항목 추가
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
          widgetTitle: title,
          widgetContent: content? content : "",
          widgetImage: "",
          widgetColor: randomPastelColor(),
        },
      ]);
    }
    if (droppedElementId === "image-input") {
      if (layoutItem.x + 2 > 5 || layoutItem.y + 2 > 6){
        console.log("wrong-drop!");
        return ;
      }
      setState((prevState) => {
        const newLayouts = { ...prevState.layouts };
        const newItem = {
          x: layoutItem.x,
          y: layoutItem.y,
          w: 2,
          h: 2,
          i: String(index),
          minW: 2,
          minH: 2,
        };
        // 모든 브레이크포인트에 대해 동일한 항목 추가
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
          widgetTitle: title,
          widgetContent: "",
          widgetImage: Image42,
          widgetColor: randomPastelColor(),
        },
      ]);
    }
    console.log("ondrop:", state);
    setTitle("");
    setContent("");
    setIndex(index + 1);
  };

  //브레이크포인트가 변경될 때
  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
    setState((prevState) => ({
      ...prevState,
      breakpoints: breakpoint,
    }));
    console.log("breakpoint change!: ", state);
  };

  return (
    <>
      {/* 헤더 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          width: "500px",
        }}
      >
        <h1>Dashbord</h1>
        {/* 편집 버튼 */}
        <Button onClick={() => setIsEditMode(!isEditMode)}>
          {isEditMode ? "확인" : "편집"}
        </Button>
      </div>
      <div style={{ backgroundColor: "skyblue", padding: 10, display: "flex" }}>
        <div
          style={{
            backgroundColor: "green",
            width: "100px",
            alignItems: "center",
            margin: 10,
          }}
          className="droppable-element"
          id="text-input"
          draggable={true}
          onDragStart={handleDragStart}
        >
          <Input
            value={title}
            onChange={handleTitleChange}
            fullWidth
            sx={{ height: "50%", backgroundColor: "white" }}
          />
          <Input
            value={content}
            onChange={handleContentChange}
            fullWidth
            sx={{ height: "50%", backgroundColor: "white" }}
          />
        </div>
        <div
          style={{
            width: "100px",
            alignItems: "center",
            margin: 10,
          }}
          className="droppable-element"
          id="image-input"
          draggable={true}
          onDragStart={handleDragStart}
        >
          <img src={Image42} alt="image-42" style={{width: "100%", height: "100%"}}/>
        </div>
      </div>
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
        compactType={null}
        preventCollision={true}
        //브레이크 포인트마다의 column 개수
        cols={{ lg: 5, md: 5, sm: 5, xs: 5, xxs: 5 }}
        //각 행의 높이
        rowHeight={150}
        width={1000}
        //최대 행 개수
        maxRows={6}
        //브레이크 포인트 체인지도 꼭 필요한지 검증 필요
        isResizable={isEditMode}
        isDraggable={isEditMode}
        isDroppable={droppable}
        droppingItem={droppingItem}
        style={{
          //너비는 reponsive에 맞게 최소 480~1200
          maxWidth: "1200px",
          minWidth: "480px",
          //높이 고정
          minHeight: "970px",
          maxHeight: "970px",
          borderRadius: "5px",
          border: "2px solid #3a3a3a",
        }}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        onDrop={onDrop}
      >
        {widgets.map((widget, index) => (
          // 초기 위젯 위치와 높이 설정
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
                <WidgetComponent widgetInfo={widget} />
              </WidgetCard>
            </Grid>
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
};

export default DashboardDetailView;
