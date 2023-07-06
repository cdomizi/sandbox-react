import { useContext } from "react";

// project import
import { drawerContext } from "../../context/Contexts";
import CustomSelect from "../../components/Select/CustomSelect";
import MultiSelect from "../../components/Select/MultiSelect";
import SelectHook from "../../components/Select/SelectHook";
import CheckboxForm from "../../components/Forms/CheckboxForm";
import PrefillForm from "../../components/Forms/PrefillForm";
import ControlledForm from "../../components/Forms/ControlledForm";
import UncontrolledForm from "../../components/Forms/UncontrolledForm";
import ControlledHook from "../../components/Forms/ControlledHook";
import UncontrolledHook from "../../components/Forms/UncontrolledHook";
import Counter from "../../components/Counter/Counter";
import Switch from "../../components/Switch/Switch";
import ContentCard from "../ContentCard";

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
          <CustomSelect />
        </ContentCard>
        <ContentCard minWidth={250}>
          <MultiSelect />
        </ContentCard>
        <ContentCard minWidth={250}>
          <SelectHook />
        </ContentCard>
        <ContentCard minWidth={250}>
          <CheckboxForm />
        </ContentCard>
        <ContentCard minWidth={250}>
          <PrefillForm />
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
        <ContentCard>
          <ControlledHook />
        </ContentCard>
        <ContentCard>
          <UncontrolledHook />
        </ContentCard>
      </Stack>
      <Divider sx={{ my: 6 }} />
      <Stack direction="row" spacing={5}>
        <ContentCard minWidth={250}>
          <Switch />
        </ContentCard>
        <ContentCard minWidth={250}>
          <Counter />
        </ContentCard>
      </Stack>
    </Box>
  );
}

export default MainLayout;
