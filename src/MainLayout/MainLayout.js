import { useContext } from "react";

// project import
import { drawerContext } from "../Context/Contexts";
import Counter from "../Counter/Counter";
import Switch from "../Switch/Switch";
import ControlledForm from "../Forms/ControlledForm";
import UncontrolledForm from "../Forms/UncontrolledForm";
import ContentCard from "../components/ContentCard";

// mui components
import { Box, Divider, Stack, Toolbar } from "@mui/material";

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
      <Stack direction="row" spacing={5}>
        <ContentCard>
          <ControlledForm />
        </ContentCard>
        <ContentCard>
          <UncontrolledForm />
        </ContentCard>
      </Stack>
    </Box>
  );
}

export default MainLayout;
