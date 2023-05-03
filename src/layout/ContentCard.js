import { Card, CardContent } from "@mui/material";

const ContentCard = ({ children, minWidth }) => {
  return (
    <Card
      sx={{
        minWidth: minWidth ?? "auto",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ContentCard;
