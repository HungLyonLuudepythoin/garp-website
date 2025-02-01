import socket from "@/app/socket";
import saveData from "../db/savedb";

export default async function handleSendLocation( startPlaceState: string, 
  endPlaceState: string, 
  phoneNumber: string,
  menu: string,
  price: string ) {
  const locationData = {
    startPlace: startPlaceState,
    endPlace: endPlaceState,
    phoneNumber,
    menu,
    price
  };
  saveData(locationData)
  socket.emit("send-location", locationData);
};