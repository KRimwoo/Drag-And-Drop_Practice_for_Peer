import React from "react";
import { Input } from "@mui/material";

interface WidgetInfo {
  widgetTitle: string;
  widgetContent?: string;
  widgetImage?: string
}

interface WidgetComponentProps {
  widgetInfo: WidgetInfo;
}

const WidgetComponent: React.FC<WidgetComponentProps> = ({ widgetInfo }) => {
  //위젯 내용을 표시
  return (
    <div>
        <h2>{widgetInfo.widgetTitle}</h2>
      {widgetInfo.widgetContent && 
        <p>{widgetInfo.widgetContent}</p>
      }
      {widgetInfo.widgetImage &&
        <img src={widgetInfo.widgetImage} alt="widget-image" />
      }
    </div>
  );
};

export default WidgetComponent;
