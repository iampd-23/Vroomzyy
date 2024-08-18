import { TbCar, TbMotorbike, TbTruckDelivery } from "react-icons/tb";
import { TbCarSuv } from "react-icons/tb";
import { IoCarSport } from "react-icons/io5";
import { IoCarSportSharp } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaVanShuttle } from "react-icons/fa6";
import { FaTruckMoving } from "react-icons/fa";
import {
  GiCargoCrate,
  GiSpeedometer,
  GiTowTruck,
} from "react-icons/gi";
import {
  FaGasPump,
  FaToolbox,
  FaChargingStation,
  FaCarCrash,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { BiSolidCarGarage, BiSolidDoorOpen, BiSolidThermometer } from "react-icons/bi";
import { MdAirlineSeatReclineNormal, MdOutlineAirlineSeatLegroomNormal, MdPets } from "react-icons/md";
import {
  PiSnowflakeFill,
  PiGpsFill,
} from "react-icons/pi";
import { AiFillCar, AiOutlineKey } from "react-icons/ai";

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
    icon: <TbCarSuv />, 
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
    label: "Electric Vehicles",
    icon: <FaChargingStation />,
    description: "Environmentally friendly electric cars.",
  },
  {
    img: "path",
    label: "Vans",
    icon: <FaVanShuttle />,
    description: "Spacious vans for group travel or cargo.",
  },
  {
    img: "path",
    label: "Trucks",
    icon: <TbTruckDelivery />,
    description: "Heavy-duty vehicles for transportation and hauling.",
  }
];

export const types = [
  {
    name: "Daily Rental",
    description: "Rent a vehicle for a day or two.",
    icon: <FaToolbox />,
  },
  {
    name: "Weekly Rental",
    description: "Rent a vehicle for a week or more.",
    icon: <GiSpeedometer />,
  },
  {
    name: "Monthly Rental",
    description: "Rent a vehicle for an extended period.",
    icon: <BiSolidCarGarage />,
  },
  {
    name: "Long-Term Lease",
    description: "Lease a vehicle for several months or a year.",
    icon: <AiOutlineKey />,
  },
];

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
    icon: <BiSolidDoorOpen />,
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
];
