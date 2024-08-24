import { TbCar, TbTruckDelivery, TbCarSuv, TbCamper } from "react-icons/tb";
import { IoCarSportSharp } from "react-icons/io5";
import { FaCarSide, FaCaravan, FaCarCrash, FaMapMarkedAlt, FaGasPump, FaBluetooth, FaCamera, FaChair, FaEyeSlash, FaWifi, FaTv, FaChargingStation } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";
import { LuCar } from "react-icons/lu";
import { GiRaceCar, GiScooter, GiSpeedometer, GiCarDoor, GiTowTruck } from "react-icons/gi";
import { CgViewMonth } from "react-icons/cg";
import { MdDateRange, MdElectricCar, MdAirlineSeatReclineNormal, MdPets } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { BsBicycle, BsCalendar2Month } from "react-icons/bs";
import { BiSolidThermometer, BiSolidDoorOpen } from "react-icons/bi";
import { PiGpsFill, PiSnowflakeFill, PiVanDuotone } from "react-icons/pi";
import { AiOutlineKey } from "react-icons/ai";
import { LiaCarSideSolid } from "react-icons/lia";

// Vehicle Categories
export const categories = [
  {
    label: "All Vehicles",
    icon: <TbCar />,
  },
  {
    img: "/assets/Sedan Background.webp",
    label: "Sedans",
    icon: <FaCarSide />,
    description: "Comfortable and fuel-efficient cars for city driving.",
  },
  {
    img: "/assets/Suv Background.jpg",
    label: "SUVs",
    icon: <LuCar />,
    description: "Spacious vehicles suitable for all terrains.",
  },
  {
    img: "/assets/luxuryCar Background.png",
    label: "Luxury Cars",
    icon: <IoCarSportSharp />,
    description: "High-end cars for a premium experience.",
  },
  {
    img: "/assets/Bike Background.jpg",
    label: "Motorcycles",
    icon: <RiMotorbikeFill />,
    description: "Two-wheeled vehicles for the adventurous rider.",
  },
  {
    img: "/assets/Ev Background.webp",
    label: "Electric",
    icon: <MdElectricCar />,
    description: "Environmentally friendly electric cars.",
  },
  {
    img: "path",
    label: "Vans",
    icon: <PiVanDuotone />,
    description: "Spacious vans for group travel or cargo.",
  },
  {
    img: "path",
    label: "Trucks",
    icon: <TbTruckDelivery />,
    description: "Heavy-duty vehicles for transportation and hauling.",
  },
  {
    img: "path",
    label: "Convertibles",
    icon: <GiRaceCar />,
    description: "Stylish open-top cars perfect for sunny days.",
  },
  {
    img: "path",
    label: "Minivans",
    icon: <FaCaravan />,
    description: "Ideal for family trips and group travel.",
  },
  {
    img: "path",
    label: "Coupes",
    icon: <LiaCarSideSolid />,
    description: "Compact and sporty two-door cars.",
  },
  {
    img: "path",
    label: "Off-Road",
    icon: <TbCarSuv />,
    description: "Rugged vehicles for off-road adventures.",
  },
  {
    img: "path",
    label: "Campervans",
    icon: <TbCamper />,
    description: "Vehicles equipped with sleeping and cooking facilities for road trips.",
  },
  {
    img: "path",
    label: "Scooters",
    icon: <GiScooter />,
    description: "Lightweight, fuel-efficient two-wheelers for quick city trips.",
  },
  {
    img: "path",
    label: "Bicycles",
    icon: <BsBicycle />,
    description: "Eco-friendly bikes for urban commuting or leisure rides.",
  },
];

// Rental Types
export const types = [
  {
    name: "Daily Rental",
    description: "Rent a vehicle for a day or two.",
    icon: <CiCalendarDate />,
  },
  {
    name: "Weekly Rental",
    description: "Rent a vehicle for a week or more.",
    icon: <MdDateRange />,
  },
  {
    name: "Monthly Rental",
    description: "Rent a vehicle for an extended period.",
    icon: <BsCalendar2Month />,
  },
  {
    name: "Long-Term Lease",
    description: "Lease a vehicle for several months or a year.",
    icon: <CgViewMonth />,
  },
];

// Vehicle Facilities
export const facilities = [
  {
    name: "Air Conditioning",
    icon: <BiSolidThermometer />,
  },
  {
    name: "GPS",
    icon: <PiGpsFill />,
  },
  {
    name: "Snow Tires",
    icon: <PiSnowflakeFill />,
  },
  {
    name: "Child Seat",
    icon: <MdAirlineSeatReclineNormal />,
  },
  {
    name: "Pet Friendly",
    icon: <MdPets />,
  },
  {
    name: "Parking Assistance",
    icon: <GiCarDoor />,
  },
  {
    name: "Roadside Assistance",
    icon: <GiTowTruck />,
  },
  {
    name: "Collision Damage Waiver",
    icon: <FaCarCrash />,
  },
  {
    name: "Unlimited Mileage",
    icon: <GiSpeedometer />,
  },
  {
    name: "Map & Navigation",
    icon: <FaMapMarkedAlt />,
  },
  {
    name: "Full Fuel Tank",
    icon: <FaGasPump />,
  },
  {
    name: "Free Cancellation",
    icon: <AiOutlineKey />,
  },
  {
    name: "Bluetooth Connectivity",
    icon: <FaBluetooth />,
  },
  {
    name: "Backup Camera",
    icon: <FaCamera />,
  },
  {
    name: "Heated Seats",
    icon: <FaChair />,
  },
  {
    name: "Sunroof",
    icon: <LiaCarSideSolid />, 
  },
  {
    name: "Blind Spot Monitor",
    icon: <BiSolidDoorOpen />,  
  },
  {
    name: "Wi-Fi Hotspot",
    icon: <FaWifi />,
  },
  {
    name: "Entertainment System",
    icon: <FaTv />,
  },
  {
    name: "Electric Vehicle",
    icon: <MdElectricCar />,  
  },
  {
    name: "Dashcam",
    icon: <FaCamera />,
  },
  {
    name: "Remote Start",
    icon: <AiOutlineKey />,
  },
  {
    name: "Adaptive Cruise Control",
    icon: <GiSpeedometer />,
  },
  {
    name: "Lane Departure Warning",
    icon: <FaEyeSlash />,
  },
  {
    name: "Keyless Entry",
    icon: <BiSolidDoorOpen />,  
  },
  {
    name: "360-Degree Camera",
    icon: <PiGpsFill />,  
  },
  {
    name: "Premium Audio System",
    icon: <GiScooter />,  
  },
  {
    name: "Massage Seats",
    icon: <MdAirlineSeatReclineNormal />,  
  },
  {
    name: "Tinted Windows",
    icon: <GiCarDoor />,  
  },
  {
    name: "Wireless Charging",
    icon: <FaChargingStation />,
  },
];
