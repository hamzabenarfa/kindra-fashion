import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ItemCard = () => {
  return (
    <div className="flex gap-4">
      <div className=" size-52 bg-[rgb(240,240,240)] flex items-center justify-center">
        <Image
          src="/checkout-Images/checkout-img1.jpg"
          alt="White Platform Trainers"
          width={250}
          height={250}
          className="object-contain"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium mb-1">WHITE PLATFORM TRAINERS</h3>
        <p className="text-sm mb-4">219.00TND</p>

        <div className="mb-3">
          <p className="text-sm mb-2">Color</p>
          <div className="flex gap-2">
            <button className="w-5 h-5 border border-gray-300 bg-white"></button>
            <button className="w-5 h-5 bg-[#e3b9d4]"></button>
            <button className="w-5 h-5 bg-[#ade3ea]"></button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 ">
          <div className="relative">
            <select className="appearance-none border border-gray-300 py-1 pl-3 pr-8 text-sm rounded-none w-24">
              <option>Size: 37</option>
              <option>Size: 38</option>
              <option>Size: 39</option>
              <option>Size: 40</option>
            </select>
            <ChevronDown className="absolute right-21 lg:right-2 top-1/2 transform -translate-y-1/2 h-4 w-4" />
          </div>

          <div className="flex">
            <button className="border border-gray-300 w-8 h-8 flex items-center justify-center">
              −
            </button>
            <div className="border-t border-b border-gray-300 w-8 h-8 flex items-center justify-center">
              1
            </div>
            <button className="border border-gray-300 w-8 h-8 flex items-center justify-center">
              +
            </button>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="underline py-3 uppercase text-sm">Delete</button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle className="text-center">
                REMOVE ITEM FROM MY SHOPPING BAG
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className="flex gap-6 py-6 border-b w-full px-4">
              <div className=" size-52 bg-[#f0f0f0] flex items-center justify-center">
                <Image
                  src="/women-page/Shoes2/1.jpg"
                  alt="White Platform Trainers"
                  width={250}
                  height={250}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">WHITE PLATFORM TRAINERS</h3>
                <p className="text-sm mb-4">219.00TND</p>

                <div className="mb-3">
                  <p className="text-sm mb-2">Color</p>
                  <div className="flex gap-2">
                    <button className="w-5 h-5 border border-gray-300 bg-white"></button>
                    <button className="w-5 h-5 bg-[#e3b9d4]"></button>
                    <button className="w-5 h-5 bg-[#ade3ea]"></button>
                  </div>
                </div>

                <h1>Size: 37</h1>
              </div>
            </div>

            <div className="flex flex-row justify-center gap-2">
              <Button
                type="reset"
                variant={"outline"}
                className=" uppercase w-1/2 border-black rounded-none font-bold tracking-wide"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className=" uppercase w-1/2 rounded-none font-bold tracking-wide"
              >
                Yes{" "}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ItemCard;
