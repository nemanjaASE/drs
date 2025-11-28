//Reusable button
import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  //maybe an attribute if the btn will be at the left or right side of the text 
  loading?: boolean;
  children: ReactNode;
}