import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Grid from "@mui/material/Grid";
import WidgetCard from "./WidgetCard";
import WidgetComponent from "./WidgetComponent";
import { Button } from "@mui/material";

interface DashboardDetailViewProps {
  widgetList: Array<any>;
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

  const [state, setState] = useState({
    breakpoints: "lg",
    layouts: { lg: [] },
  });

  //레이아웃이 변경될 때, 해당 브레이크포인트에 레이아웃 정보를 업데이트 힌다
  const onLayoutChange = (layout: any, layouts: any) => {
    setState((prevState) => ({
      ...prevState,
      layouts: layouts,
    }));
    console.log(state);
  };

  //브레이크포인트가 변경될 때
  const onBreakpointChange = (breakpoint: string) => {
    setState((prevState) => ({
      ...prevState,
      breakpoints: breakpoint,
    }));
    //console.log(state);
  };

  return (
    <>
      {/* 헤더 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <h1>Dashbord</h1>
        {/* 편집 버튼 */}
        <Button onClick={() => setIsEditMode(!isEditMode)}>
          {isEditMode ? "확인" : "편집"}
        </Button>
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
        //브레이크 포인트마다의 column 개수
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 3 }}
        //각 행의 높이
        rowHeight={150}
        width={1000}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        isResizable={isEditMode}
        isDraggable={isEditMode}
      >
        {widgetList.map((widget) => (
          // 초기 위젯 위치와 높이 설정
          <div key={widget.widgetId} data-grid={{ x: 0, y: 0, w: 2, h: 2 }}>
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
