"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

const translations = {
  en: {
    prediction: "Prediction",
    probability: "Probability",
    win: "Win",
    lose: "Lose"
  },
  tr: {
    prediction: "Tahmin",
    probability: "Olasılık",
    win: "Kazandı",
    lose: "Kaybetti"
  }
};

export default function PredictionCard({ prediction, showResult = false, language }) {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src={prediction.homeTeamLogo}
            alt={prediction.homeTeam}
            width={40}
            height={40}
          />
          <span className="font-semibold">{prediction.homeTeam}</span>
        </div>
        <span className="font-bold">VS</span>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{prediction.awayTeam}</span>
          <Image
            src={prediction.awayTeamLogo}
            alt={prediction.awayTeam}
            width={40}
            height={40}
          />
        </div>
      </div>

      <div className="text-center">
        <div className="text-sm text-muted-foreground">
          {prediction.date} {prediction.time}
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <span className="text-sm font-medium">
            {translations[language].prediction}:
          </span>
          <span className="ml-2">{prediction.prediction}</span>
        </div>
        <div>
          <span className="text-sm font-medium">
            {translations[language].probability}: {prediction.probability}%
          </span>
          <div className="w-full bg-secondary rounded-full h-2 mt-1">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${prediction.probability}%` }}
            />
          </div>
        </div>
      </div>

      {showResult && prediction.result && (
        <div className={`text-center font-bold ${
          prediction.result === "win" ? "text-green-500" : "text-red-500"
        }`}>
          {translations[language][prediction.result]}
        </div>
      )}
    </Card>
  );
}