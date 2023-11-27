import { colors, getRandomNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

type ChartBarProps = {
  isRunning: boolean;
  index: number;
  generationTime: number;
  minRange: number;
  maxRange: number;
};

const ChartBar = ({
  isRunning,
  index,
  generationTime,
  minRange,
  maxRange,
}: ChartBarProps) => {
  const [dataChannel, setDataChannel] = useState<number[]>([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      y: {
        suggestedMax: maxRange,
      },
    },
  };

  console.log("render" + index);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const startGenerators = () => {
      intervalId = setInterval(() => {
        const randomNumber = getRandomNumber(minRange, maxRange);

        setDataChannel((prevData) => [...prevData, randomNumber]);
      }, 1000 * generationTime);
    };

    const stopGenerators = () => {
      clearInterval(intervalId);
    };

    isRunning ? startGenerators() : stopGenerators();

    return () => {
      stopGenerators();
    };
  }, [isRunning]);

  const data = {
    labels:
      dataChannel.length < 10
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        : dataChannel.map((_, index) => index + 1),
    datasets: [
      {
        label: `Dataset ${index + 1} `,
        data: dataChannel,
        backgroundColor: colors[index],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-12">
      <h2 className="font-bold my-8">Channel {index + 1}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartBar;
