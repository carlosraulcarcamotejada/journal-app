import { FC, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Fade, Slide, SlideProps } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export const Notification: FC = (): JSX.Element => {
  const { savedMessage } = useSelector((state: RootState) => state.journal);

  const [state, setState] = useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  useEffect(() => {
    if (savedMessage.length > 0) {
      openSnackbar(SlideTransition);
    }
  }, [savedMessage]);

  const openSnackbar = (
    Transition: React.ComponentType<
      TransitionProps & { children: React.ReactElement<any, any> }
    >
  ) => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <Snackbar
      open={state.open}
      onClose={handleClose}
      autoHideDuration={3000}
      TransitionComponent={state.Transition}
      message={savedMessage}
      key={state.Transition.name}
    />
  );
};
