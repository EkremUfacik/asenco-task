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
import { use, useEffect, useState } from "react";
import ChartBar from "./components/ChartBar";
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

const ChannelGenerator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [channelNumber, setChannelNumber] = useState(2);
  const [generationTime, setGenerationTime] = useState(1);
  const [numberRange, setNumberRange] = useState({
    min: 1,
    max: 10,
  });

  const handleGenerate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const channel = e.currentTarget.channel.value;
    const generation = e.currentTarget.generation.value;
    const minRange = e.currentTarget.minRange.value;
    const maxRange = e.currentTarget.maxRange.value;

    if (minRange && maxRange) {
      setNumberRange({
        min: Number(minRange),
        max: Number(maxRange),
      });
    }
    channel && setChannelNumber(Number(channel));
    generation && setGenerationTime(Number(generation));
    setIsGenerated(true);
  };

  return (
    <div className="">
      <h1 className="text-center pt-10 text-2xl font-bold">
        Asenco Data Visualizer Task
      </h1>
      {!isGenerated ? (
        <form onSubmit={handleGenerate} className="text-center mt-28">
          <Input
            id="channel"
            name="channel"
            type="number"
            placeholder="Enter Number of Channels"
            className="w-64 mx-auto"
            min={1}
            max={10}
          />

          <Input
            id="generation"
            name="generation"
            type="number"
            placeholder="Enter Generation Time"
            className="w-64 mx-auto my-6"
            min={1}
          />

          <p className="font-semibold">Number Range</p>
          <div className="flex items-center gap-4 mt-2 justify-center">
            <Input
              id="minRange"
              name="minRange"
              type="number"
              placeholder="Enter Min"
              className="w-32 "
              min={1}
            />
            <Input
              id="maxRange"
              name="maxRange"
              type="number"
              placeholder="Enter Max"
              className="w-32 "
              max={200}
            />
          </div>
          <Button type="submit" className="w-48 mt-10">
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
            <Button
              variant={"destructive"}
              className=""
              onClick={() => setIsGenerated(false)}
            >
              Reset
            </Button>
          </div>

          <div className="pb-20">
            {new Array(channelNumber).fill(0).map((_, index) => (
              <ChartBar
                key={index}
                index={index}
                isRunning={isRunning}
                generationTime={generationTime}
                numberRange={numberRange}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChannelGenerator;
