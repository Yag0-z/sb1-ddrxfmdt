"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

const translations = {
  en: {
    prediction: "Prediction",
    probability: "Probability",
    date: "Date",
    time: "Time",
    delete: "Delete",
    win: "Win",
    lose: "Lose",
    save: "Save",
    homeTeam: "Home Team",
    awayTeam: "Away Team",
    homeTeamLogo: "Home Team Logo URL",
    awayTeamLogo: "Away Team Logo URL",
    predictions: {
      "Home Over 1.5": "Home Over 1.5",
      "Away Over 1.5": "Away Over 1.5",
      "Home Win": "Home Win",
      "Away Win": "Away Win",
      "Draw": "Draw"
    }
  },
  tr: {
    prediction: "Tahmin",
    probability: "Olasılık",
    date: "Tarih",
    time: "Saat",
    delete: "Sil",
    win: "Kazandı",
    lose: "Kaybetti",
    save: "Kaydet",
    homeTeam: "Ev Sahibi",
    awayTeam: "Deplasman",
    homeTeamLogo: "Ev Sahibi Logo URL",
    awayTeamLogo: "Deplasman Logo URL",
    predictions: {
      "Home Over 1.5": "Ev Sahibi 1.5 Üst",
      "Away Over 1.5": "Deplasman 1.5 Üst",
      "Home Win": "Ev Sahibi Kazanır",
      "Away Win": "Deplasman Kazanır",
      "Draw": "Beraberlik"
    }
  }
};

export default function EditPredictionCard({ prediction, onUpdate, onDelete, language }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrediction, setEditedPrediction] = useState(prediction);

  const translatePrediction = (predictionText) => {
    // Find the English key that matches the current prediction
    const englishKey = Object.keys(translations.en.predictions).find(
      key => translations.en.predictions[key] === predictionText || 
            translations.tr.predictions[key] === predictionText
    );

    // Return the translated prediction if found, otherwise return the original text
    return englishKey ? translations[language].predictions[englishKey] : predictionText;
  };

  // Update prediction text when language changes
  const displayPrediction = translatePrediction(editedPrediction.prediction);

  return (
    <Card className="p-4 space-y-4 relative">
      {!isEditing ? (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 p-2 hover:bg-accent rounded-full"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src={editedPrediction.homeTeamLogo}
                alt={editedPrediction.homeTeam}
                width={40}
                height={40}
              />
              <span className="font-semibold">{editedPrediction.homeTeam}</span>
            </div>
            <span className="font-bold">VS</span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{editedPrediction.awayTeam}</span>
              <Image
                src={editedPrediction.awayTeamLogo}
                alt={editedPrediction.awayTeam}
                width={40}
                height={40}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              {editedPrediction.date} {editedPrediction.time}
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium">
                {translations[language].prediction}:
              </span>
              <span className="ml-2">{displayPrediction}</span>
            </div>
            <div>
              <span className="text-sm font-medium">
                {translations[language].probability}: {editedPrediction.probability}%
              </span>
              <div className="w-full bg-secondary rounded-full h-2 mt-1">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${editedPrediction.probability}%` }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                placeholder={translations[language].homeTeam}
                value={editedPrediction.homeTeam}
                onChange={(e) =>
                  setEditedPrediction({
                    ...editedPrediction,
                    homeTeam: e.target.value
                  })
                }
              />
              <Input
                placeholder={translations[language].homeTeamLogo}
                value={editedPrediction.homeTeamLogo}
                onChange={(e) =>
                  setEditedPrediction({
                    ...editedPrediction,
                    homeTeamLogo: e.target.value
                  })
                }
              />
            </div>
            <div>
              <Input
                placeholder={translations[language].awayTeam}
                value={editedPrediction.awayTeam}
                onChange={(e) =>
                  setEditedPrediction({
                    ...editedPrediction,
                    awayTeam: e.target.value
                  })
                }
              />
              <Input
                placeholder={translations[language].awayTeamLogo}
                value={editedPrediction.awayTeamLogo}
                onChange={(e) =>
                  setEditedPrediction({
                    ...editedPrediction,
                    awayTeamLogo: e.target.value
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              value={editedPrediction.date}
              onChange={(e) =>
                setEditedPrediction({
                  ...editedPrediction,
                  date: e.target.value
                })
              }
            />
            <Input
              type="time"
              value={editedPrediction.time}
              onChange={(e) =>
                setEditedPrediction({
                  ...editedPrediction,
                  time: e.target.value
                })
              }
            />
          </div>

          <select
            className="w-full p-2 border rounded-md"
            value={displayPrediction}
            onChange={(e) =>
              setEditedPrediction({
                ...editedPrediction,
                prediction: e.target.value
              })
            }
          >
            {Object.entries(translations[language].predictions).map(([key, value]) => (
              <option key={key} value={translations.en.predictions[key]}>
                {value}
              </option>
            ))}
          </select>

          <Input
            type="number"
            placeholder={translations[language].probability}
            value={editedPrediction.probability}
            onChange={(e) =>
              setEditedPrediction({
                ...editedPrediction,
                probability: parseInt(e.target.value)
              })
            }
          />

          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="text-green-500"
              onClick={() =>
                setEditedPrediction({
                  ...editedPrediction,
                  result: "win"
                })
              }
            >
              {translations[language].win}
            </Button>
            <Button
              variant="outline"
              className="text-red-500"
              onClick={() =>
                setEditedPrediction({
                  ...editedPrediction,
                  result: "lose"
                })
              }
            >
              {translations[language].lose}
            </Button>
          </div>

          <div className="flex justify-between">
            <Button
              variant="destructive"
              onClick={onDelete}
              className="flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>{translations[language].delete}</span>
            </Button>
            <Button
              onClick={() => {
                onUpdate(editedPrediction);
                setIsEditing(false);
              }}
            >
              {translations[language].save}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}