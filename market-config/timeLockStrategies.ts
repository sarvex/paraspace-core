import {parseUnits} from "ethers/lib/utils";
import {ITimeLockStrategyParams} from "../helpers/types";

export const timeLockStrategyUSDC: ITimeLockStrategyParams = {
  name: "timeLockStrategyUSDC",
  minThreshold: parseUnits("105000", 6).toString(),
  midThreshold: parseUnits("400000", 6).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1875000", 6).toString(),
  period: "86400",
};

export const timeLockStrategyUSDT: ITimeLockStrategyParams = {
  name: "timeLockStrategyUSDT",
  minThreshold: parseUnits("105000", 6).toString(),
  midThreshold: parseUnits("200500", 6).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("400000", 6).toString(),
  period: "86400",
};

export const timeLockStrategyDAI: ITimeLockStrategyParams = {
  name: "timeLockStrategyDAI",
  minThreshold: parseUnits("40000", 18).toString(),
  midThreshold: parseUnits("100000", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("17500", 18).toString(),
  period: "86400",
};

export const timeLockStrategyFRAX: ITimeLockStrategyParams = {
  name: "timeLockStrategyFRAX",
  minThreshold: parseUnits("30000", 18).toString(),
  midThreshold: parseUnits("50000", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("15000", 18).toString(),
  period: "86400",
};

export const timeLockStrategyWETH: ITimeLockStrategyParams = {
  name: "timeLockStrategyWETH",
  minThreshold: parseUnits("51.5", 18).toString(),
  midThreshold: parseUnits("155", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1900", 18).toString(),
  period: "86400",
};

export const timeLockStrategyCBETH: ITimeLockStrategyParams = {
  name: "timeLockStrategyCBETH",
  minThreshold: parseUnits("51.5", 18).toString(),
  midThreshold: parseUnits("155", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1900", 18).toString(),
  period: "86400",
};

export const timeLockStrategyRETH: ITimeLockStrategyParams = {
  name: "timeLockStrategyRETH",
  minThreshold: parseUnits("51.5", 18).toString(),
  midThreshold: parseUnits("155", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1900", 18).toString(),
  period: "86400",
};

export const timeLockStrategySTETH: ITimeLockStrategyParams = {
  name: "timeLockStrategySTETH",
  minThreshold: parseUnits("51.5", 18).toString(),
  midThreshold: parseUnits("155", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1900", 18).toString(),
  period: "86400",
};

export const timeLockStrategyASTETH: ITimeLockStrategyParams = {
  name: "timeLockStrategyASTETH",
  minThreshold: parseUnits("51.5", 18).toString(),
  midThreshold: parseUnits("155", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1900", 18).toString(),
  period: "86400",
};

export const timeLockStrategyWSTETH: ITimeLockStrategyParams = {
  name: "timeLockStrategyWSTETH",
  minThreshold: parseUnits("51.5", 18).toString(),
  midThreshold: parseUnits("155", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1900", 18).toString(),
  period: "86400",
};

export const timeLockStrategyBENDETH: ITimeLockStrategyParams = {
  name: "timeLockStrategyBENDETH",
  minThreshold: parseUnits("51.5", 18).toString(),
  midThreshold: parseUnits("155", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1900", 18).toString(),
  period: "86400",
};

export const timeLockStrategyAWSTETH: ITimeLockStrategyParams = {
  name: "timeLockStrategyAWSTETH",
  minThreshold: parseUnits("51.5", 18).toString(),
  midThreshold: parseUnits("155", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1900", 18).toString(),
  period: "86400",
};

export const timeLockStrategyAWETH: ITimeLockStrategyParams = {
  name: "timeLockStrategyAWETH",
  minThreshold: parseUnits("51.5", 18).toString(),
  midThreshold: parseUnits("155", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1900", 18).toString(),
  period: "86400",
};

export const timeLockStrategyCETH: ITimeLockStrategyParams = {
  name: "timeLockStrategyCETH",
  minThreshold: parseUnits("51.5", 18).toString(),
  midThreshold: parseUnits("155", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1900", 18).toString(),
  period: "86400",
};

export const timeLockStrategyPUNK: ITimeLockStrategyParams = {
  name: "timeLockStrategyPUNK",
  minThreshold: parseUnits("1000", 18).toString(),
  midThreshold: parseUnits("5000", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("50000", 18).toString(),
  period: "86400",
};

export const timeLockStrategyWBTC: ITimeLockStrategyParams = {
  name: "timeLockStrategyWBTC",
  minThreshold: parseUnits("2.5", 8).toString(),
  midThreshold: parseUnits("2.8", 8).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("3", 8).toString(),
  period: "86400",
};

export const timeLockStrategyAPE: ITimeLockStrategyParams = {
  name: "timeLockStrategyAPE",
  minThreshold: parseUnits("10975", 18).toString(),
  midThreshold: parseUnits("20100", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("30000", 18).toString(),
  period: "86400",
};

export const timeLockStrategySAPE: ITimeLockStrategyParams = {
  name: "timeLockStrategySAPE",
  minThreshold: parseUnits("10975", 18).toString(),
  midThreshold: parseUnits("53000", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1000000", 18).toString(),
  period: "86400",
};

export const timeLockStrategyCAPE: ITimeLockStrategyParams = {
  name: "timeLockStrategyCAPE",
  minThreshold: parseUnits("10975", 18).toString(),
  midThreshold: parseUnits("53000", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1000000", 18).toString(),
  period: "86400",
};

export const timeLockStrategyYAPE: ITimeLockStrategyParams = {
  name: "timeLockStrategyYAPE",
  minThreshold: parseUnits("10975", 18).toString(),
  midThreshold: parseUnits("53000", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("1000000", 18).toString(),
  period: "86400",
};

export const timeLockStrategyXCDOT: ITimeLockStrategyParams = {
  name: "timeLockStrategyXCDOT",
  minThreshold: parseUnits("1000", 10).toString(),
  midThreshold: parseUnits("5000", 10).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("50000", 10).toString(),
  period: "86400",
};

export const timeLockStrategyWGLMR: ITimeLockStrategyParams = {
  name: "timeLockStrategyWGLMR",
  minThreshold: parseUnits("1000", 18).toString(),
  midThreshold: parseUnits("5000", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("50000", 18).toString(),
  period: "86400",
};

export const timeLockStrategyBLUR: ITimeLockStrategyParams = {
  name: "timeLockStrategyBLUR",
  minThreshold: parseUnits("71500", 18).toString(),
  midThreshold: parseUnits("118750", 18).toString(),
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: parseUnits("200000", 18).toString(),
  period: "86400",
};

export const timeLockStrategyBAYC: ITimeLockStrategyParams = {
  name: "timeLockStrategyBAYC",
  minThreshold: "2",
  midThreshold: "4",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "100",
  period: "86400",
};

export const timeLockStrategyMAYC: ITimeLockStrategyParams = {
  name: "timeLockStrategyMAYC",
  minThreshold: "2",
  midThreshold: "6",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "200",
  period: "86400",
};

export const timeLockStrategyBAKC: ITimeLockStrategyParams = {
  name: "timeLockStrategyBAKC",
  minThreshold: "4",
  midThreshold: "12",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "57",
  period: "86400",
};

export const timeLockStrategyDoodles: ITimeLockStrategyParams = {
  name: "timeLockStrategyDoodles",
  minThreshold: "5",
  midThreshold: "20",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "2",
  period: "86400",
};

export const timeLockStrategyOTHR: ITimeLockStrategyParams = {
  name: "timeLockStrategyOTHR",
  minThreshold: "5",
  midThreshold: "20",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "125",
  period: "86400",
};

export const timeLockStrategyCloneX: ITimeLockStrategyParams = {
  name: "timeLockStrategyCloneX",
  minThreshold: "5",
  midThreshold: "20",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "8",
  period: "86400",
};

export const timeLockStrategyMoonbird: ITimeLockStrategyParams = {
  name: "timeLockStrategyMoonbird",
  minThreshold: "5",
  midThreshold: "20",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "3",
  period: "86400",
};

export const timeLockStrategyMeebits: ITimeLockStrategyParams = {
  name: "timeLockStrategyMeebits",
  minThreshold: "5",
  midThreshold: "20",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "13",
  period: "86400",
};

export const timeLockStrategyAzuki: ITimeLockStrategyParams = {
  name: "timeLockStrategyAzuki",
  minThreshold: "2",
  midThreshold: "6",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "9",
  period: "86400",
};

export const timeLockStrategyWPunks: ITimeLockStrategyParams = {
  name: "timeLockStrategyWPunks",
  minThreshold: "2",
  midThreshold: "4",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "2",
  period: "86400",
};

export const timeLockStrategyUniswapV3: ITimeLockStrategyParams = {
  name: "timeLockStrategyUniswapV3",
  minThreshold: "5",
  midThreshold: "10",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "50",
  period: "86400",
};

export const timeLockStrategySEWER: ITimeLockStrategyParams = {
  name: "timeLockStrategySEWER",
  minThreshold: "5",
  midThreshold: "20",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "2",
  period: "86400",
};

export const timeLockStrategyPenguins: ITimeLockStrategyParams = {
  name: "timeLockStrategyPenguins",
  minThreshold: "4",
  midThreshold: "12",
  minWaitTime: "12",
  midWaitTime: "7200",
  maxWaitTime: "43200",
  poolPeriodWaitTime: "600",
  poolPeriodLimit: "2",
  period: "86400",
};
