import React from 'react'
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { ExpenseCategory, IncomeCategory } from '../../types';
import AlarmIcon from "@mui/icons-material/Alarm";
import HomeIcon from "@mui/icons-material/Home";
import HailIcon from "@mui/icons-material/Hail";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import HelpIcon from "@mui/icons-material/Help";
import AddCardIcon from "@mui/icons-material/AddCard";
import SavingsIcon from "@mui/icons-material/Savings";

const iconComponents: Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
  食費: <FastfoodIcon fontSize="small" />,
  日用品: <AlarmIcon fontSize="small" />,
  住居費: <HomeIcon fontSize="small" />,
  娯楽: <HailIcon fontSize="small" />,
  医療費: <MedicalInformationIcon fontSize="small" />,
  子供: <BabyChangingStationIcon fontSize="small" />,
  外食: <RestaurantIcon fontSize="small" />,
  自己投資: <LocalLibraryIcon fontSize="small" />,
  その他: <HelpIcon fontSize="small" />,
  副収入: <SavingsIcon fontSize="small" />,
  給与: <AddCardIcon fontSize="small" />,
};
export default iconComponents
