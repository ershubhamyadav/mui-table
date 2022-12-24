import { Button } from "@mui/material";

const CustomButton = (props) => {
  const { title = "", icon = false, onClick = () => {} } = props;
  return (
    <Button {...props} onClick={onClick}>
      {icon && icon}
      {title}
    </Button>
  );
};
export default CustomButton;
