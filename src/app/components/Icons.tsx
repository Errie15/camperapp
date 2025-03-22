// Icons.tsx - Centralized icon components with consistent styling
'use client';

import {
  Tree,
  Campfire,
  Compass,
  Bell,
  CookingPot,
  Tent,
  FirstAid,
  CloudSun,
  MapTrifold,
  Lasso,
  Mountains,
  Bug,
  Fish,
  Planet,
  Leaf,
  Backpack
} from "@phosphor-icons/react";

// Color constants to ensure consistency
const COLORS = {
  forestGreen: "#2D6A4F",
  sunsetOrange: "#FF7F50",
  skyBlue: "#7EC8E3",
  white: "#FFFFFF",
  mustardYellow: "#E3B448"
};

type IconProps = {
  className?: string;
  size?: number;
  color?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
};

const defaultProps = {
  size: 48,
  weight: "fill" as const
};

export const TreeIcon = ({ className, size, color, weight }: IconProps) => (
  <Tree 
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.forestGreen}
    weight={weight || defaultProps.weight}
  />
);

export const FireIcon = ({ className, size, color, weight }: IconProps) => (
  <Campfire 
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.sunsetOrange}
    weight={weight || defaultProps.weight}
  />
);

export const CompassIcon = ({ className, size, color, weight }: IconProps) => (
  <Compass 
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.skyBlue}
    weight={weight || defaultProps.weight}
  />
);

export const BellIcon = ({ className, size, color, weight }: IconProps) => (
  <Bell 
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.white}
    weight={weight || defaultProps.weight}
  />
);

export const CookingIcon = ({ className, size, color, weight }: IconProps) => (
  <CookingPot 
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.sunsetOrange}
    weight={weight || defaultProps.weight}
  />
);

export const TentIcon = ({ className, size, color, weight }: IconProps) => (
  <Tent 
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.forestGreen}
    weight={weight || defaultProps.weight}
  />
);

export const KnotIcon = ({ className, size, color }: Omit<IconProps, 'weight'>) => (
  <Lasso
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.mustardYellow}
    weight="bold"
  />
);

export const MedicalIcon = ({ className, size, color, weight }: IconProps) => (
  <FirstAid
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.sunsetOrange}
    weight={weight || defaultProps.weight}
  />
);

export const WeatherIcon = ({ className, size, color, weight }: IconProps) => (
  <CloudSun
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.skyBlue}
    weight={weight || defaultProps.weight}
  />
);

export const MapIcon = ({ className, size, color, weight }: IconProps) => (
  <MapTrifold
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.forestGreen}
    weight={weight || defaultProps.weight}
  />
);

export const MountainIcon = ({ className, size, color, weight }: IconProps) => (
  <Mountains
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.forestGreen}
    weight={weight || defaultProps.weight}
  />
);

export const BugIcon = ({ className, size, color, weight }: IconProps) => (
  <Bug
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.forestGreen}
    weight={weight || defaultProps.weight}
  />
);

export const FishIcon = ({ className, size, color, weight }: IconProps) => (
  <Fish
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.skyBlue}
    weight={weight || defaultProps.weight}
  />
);

export const PlanetIcon = ({ className, size, color, weight }: IconProps) => (
  <Planet
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.skyBlue}
    weight={weight || defaultProps.weight}
  />
);

export const LeafIcon = ({ className, size, color, weight }: IconProps) => (
  <Leaf
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.forestGreen}
    weight={weight || defaultProps.weight}
  />
);

export const BackpackIcon = ({ className, size, color, weight }: IconProps) => (
  <Backpack
    className={className} 
    size={size || defaultProps.size}
    color={color || COLORS.forestGreen}
    weight={weight || defaultProps.weight}
  />
); 