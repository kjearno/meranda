import { useDispatch, useSelector } from "react-redux";
import { globalOperations, globalSelectors } from "../modules/global";

export const useSidebar = () => {
  const dispatch = useDispatch();

  const collapsed = useSelector(globalSelectors.sidebarCollapsed);

  const handleToggleSidebar = () => {
    dispatch(globalOperations.toggleSidebarCollapsed());
  };

  return {
    collapsed,
    onToggleSidebar: handleToggleSidebar
  };
};
