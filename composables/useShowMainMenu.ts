export default function useShowMainMenu() {
  const isShowMenu = useState(() => false);

  const setShowMenu = (newVal: boolean) => {
    isShowMenu.value = newVal;
  };

  return {
    isShowMenu,
    setShowMenu
  };
}
