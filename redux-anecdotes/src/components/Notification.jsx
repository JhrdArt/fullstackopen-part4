import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log(notification);

  const style = {
    border: "solid 2px red",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    color: "rgb(100,100,200)"
  };
  return notification && <div style={style}>{notification}</div>;
};

export default Notification;
