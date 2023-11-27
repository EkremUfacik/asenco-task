"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import ChartBar from "@/components/ChartBar";
import { Input } from "@/components/ui/input";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ChannelOptions = {
  channelNumber: number;
  generationTime: number;
  minRange: number;
  maxRange: number;
};

const initialChannelOptions: ChannelOptions = {
  channelNumber: 2,
  generationTime: 1,
  minRange: 1,
  maxRange: 10,
};

const ChannelGenerator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [channelOptions, setChannelOptions] = useState(initialChannelOptions);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setChannelOptions((prevOptions) => ({
      ...prevOptions,
      [name]: Number(value),
    }));
  };

  const handleGenerate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { minRange, maxRange } = channelOptions;
    if (maxRange < minRange) {
      alert("Max Range must be greater than Min Range");
      return;
    }
    setIsGenerated(true);
  };

  const handleReset = () => {
    setIsGenerated(false);
    setIsRunning(false);
    setChannelOptions(initialChannelOptions);
  };

  return (
    <div className="">
      <h1 className="text-center pt-10 text-2xl font-bold border-b pb-4">
        Asenco Data Visualizer Task
      </h1>
      {!isGenerated ? (
        <form onSubmit={handleGenerate} className="w-fit mx-auto mt-28 ">
          <label htmlFor="channelNumber" className="font-semibold">
            Enter Number of Channels
          </label>
          <Input
            id="channelNumber"
            name="channelNumber"
            type="number"
            value={channelOptions.channelNumber}
            className=" mt-2"
            min={1}
            max={10}
            onChange={handleChange}
          />

          <label
            htmlFor="generationTime"
            className="font-semibold mt-8 inline-block"
          >
            Enter Generation Time (in seconds)
          </label>
          <Input
            id="generationTime"
            name="generationTime"
            type="number"
            value={channelOptions.generationTime}
            className="mt-2 mb-8"
            min={1}
            onChange={handleChange}
          />

          <p className="font-semibold ">Number Range</p>
          <div className="flex items-center gap-4 mt-2 justify-center">
            <Input
              id="minRange"
              name="minRange"
              type="number"
              value={channelOptions.minRange}
              className="flex-1"
              min={1}
              onChange={handleChange}
            />
            -
            <Input
              id="maxRange"
              name="maxRange"
              type="number"
              value={channelOptions.maxRange}
              className="flex-1"
              max={200}
              min={2}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full my-10">
            Generate
          </Button>
        </form>
      ) : (
        <>
          <div className="space-x-4 my-16 flex justify-center items-center">
            {isRunning ? (
              <Button onClick={() => setIsRunning(false)}>
                <Pause className="mr-2 h-4 w-4" /> Stop
              </Button>
            ) : (
              <Button
                variant={"ghost"}
                className=""
                onClick={() => setIsRunning(true)}
              >
                <Play className="mr-2 h-4 w-4" /> Play
              </Button>
            )}
            <Button variant={"destructive"} className="" onClick={handleReset}>
              Reset
            </Button>
          </div>

          <div className="pb-20">
            {new Array(channelOptions.channelNumber).fill(0).map((_, index) => (
              <ChartBar
                key={index}
                index={index}
                isRunning={isRunning}
                generationTime={channelOptions.generationTime}
                minRange={channelOptions.minRange}
                maxRange={channelOptions.maxRange}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChannelGenerator;
