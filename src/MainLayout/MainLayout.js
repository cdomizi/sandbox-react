import { useContext } from "react";

// project import
import { drawerContext } from "../Context/Contexts";
import Counter from "../Counter/Counter";
import Switch from "../Switch/Switch";
import TestForm from "../TestForm";

// mui components
import { Box, Card, CardContent, Divider, Stack, Toolbar } from "@mui/material";

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

function MainLayout() {
  const drawer = useContext(drawerContext);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawer.width}px)` },
      }}
    >
      <Toolbar />
      <Stack direction="row" spacing={5}>
        <ContentCard minWidth={250}>
          <Switch />
        </ContentCard>
        <ContentCard minWidth={250}>
          <Counter />
        </ContentCard>
      </Stack>
      <Divider sx={{ my: 6 }} />
      <TestForm />
    </Box>
  );
}

export default MainLayout;
