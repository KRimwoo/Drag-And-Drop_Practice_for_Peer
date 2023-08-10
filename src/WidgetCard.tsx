import React from "react";
import { Card, CardContent } from "@mui/material";

//랜덤 컬러 생성기


interface WidgetInfo {
  widgetId: number;
  widgetColor: string;
}

interface WidgetCardProps {
  widgetInfo: WidgetInfo;
  children: React.ReactNode;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ widgetInfo, children }) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: widgetInfo.widgetColor,
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default WidgetCard;
