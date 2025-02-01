"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../../components/ui/dialog";

import QueryAutoComplete from "@/app/components/queryAutoComplete";
import { LngLatLike } from "mapbox-gl";
import React, { useEffect, useState, useRef } from "react";
import socket from "@/app/socket";
import handleSendLocation from "@/app/lib/map/handleSendLocation";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Header from "@/app/components/header";

const BikePage = () => {
  const router = useRouter();
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null);
  const [startCoordState, setStartCoordState] = useState<LngLatLike | null>(null);
  const [endCoordState, setEndCoordState] = useState<LngLatLike | null>(null);
  const [startPlaceState, setStartPlaceState] = useState("");
  const [endPlaceState, setEndPlaceState] = useState("");
  const inputPhoneRef = useRef<HTMLInputElement | null>(null);
  const [price, setPrice] = useState("");
  const [isOrder, setIsOrder] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Import the MapComponent only on the client side
    import("@/app/components/map").then((mod) => {
      setMapComponent(() => mod.default);
    });
  }, []);

  const handlePriceCalculated = (price: string) => {
    setPrice(price);
  };

  const sendingDriver = () => {
    const menu = "bike";
    if (inputPhoneRef.current) {
      const phoneNumber = inputPhoneRef.current.value;
      handleSendLocation(startPlaceState, endPlaceState, phoneNumber, menu, price);
    }
    setIsOrder(true);
  };

  const handleRedirect = () => {
    setOpen(false);
    router.push("/dashboard"); // Redirect to the dashboard
  };

  useEffect(() => {
    socket.on("receive-accept", (data) => {
      console.log("Hey");
      setIsAccept(true);
      setMessage(data.message);
    });
    socket.on("receive-redirect", () => {
      console.log("Received signal to show modal");
      setOpen(true); // Open the dialog
    });
  }, []);

  return (
    <div className="min-h-screen px-1 from-gray-200 to-zinc-400">
      <Header />
      {MapComponent && (
        <MapComponent
          startCoordState={startCoordState}
          endCoordState={endCoordState}
          returnPrice={handlePriceCalculated}
        />
      )}
      <p className="my-4 text-2xl max-md:text-base font-semibold text-center">
        Nhập địa chỉ muốn đón và muốn đi giùm nhé
      </p>
      <div className="flex max-md:flex-col">
        <div className="md:w-1/2 mx-3">
          <QueryAutoComplete
            placedefault="Địa chỉ Hưng đón"
            onLocationSelect={(lngLat: LngLatLike, description: string) => {
              setStartCoordState(lngLat);
              setStartPlaceState(description);
            }}
          />
        </div>
        <div className="md:w-1/2 mx-3">
          <QueryAutoComplete
            placedefault="Địa chỉ Hưng đưa"
            onLocationSelect={(lngLat: LngLatLike, description: string) => {
              setEndCoordState(lngLat);
              setEndPlaceState(description);
            }}
          />
        </div>
      </div>
      {startPlaceState && endPlaceState && !isOrder ? (
        <div className="">
          <p className="mx-3 my-6 md:text-xl text-green-600">Giá: {price}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mx-5 my-2">
                Gửi
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Số Điện thoại</DialogTitle>
                <DialogDescription>
                  Nhập số điện thoại vào, không nhập không nhận nhé! :Đ
                </DialogDescription>
              </DialogHeader>
              <div className="">
                <Input type="tel" ref={inputPhoneRef} placeholder="SDT" />
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button variant="outline" onClick={sendingDriver}>Gửi địa chỉ</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        ""
      )}
      {isOrder && isAccept ? (
        <p className="md:text-xl mx-3 my-3 ">Hưng đã chấp nhận đơn đặt của bạn</p>
      ) : isOrder ? (
        <p className="md:text-xl my-3 mx-3 text-red-500">Hưng đang có cuốc, đợi Hưng xíu nhé</p>
      ) : (
        ""
      )}
      <p className="mx-3 md:text-xl my-3">{message}</p>
      {/* ShadCN Dialog */}
      <Dialog open={open} onOpenChange={setOpen} modal={true}>
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Quay lại trang chủ</DialogTitle>
          </DialogHeader>
          <p>Bạn được mời về trang chính bởi hưng đẹp trai.</p>
          <DialogFooter>
            <Button onClick={handleRedirect}>Về trang chính</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BikePage;
