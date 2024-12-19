"use client";

import { useState } from "react";
import { Sun, Moon, Edit3, X, Menu, User } from "lucide-react";
import PredictionCard from "@/components/PredictionCard";
import EditPredictionCard from "@/components/EditPredictionCard";
import LoginModal from "@/components/LoginModal";
import LanguageToggle from "@/components/LanguageToggle";
import { useTheme } from "next-themes";

export default function Home() {
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentView, setCurrentView] = useState("predictions");
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("en");

  const initialPrediction = {
    homeTeam: "Inter",
    awayTeam: "Udinese",
    homeTeamLogo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
    awayTeamLogo: "https://upload.wikimedia.org/wikipedia/en/c/ce/Udinese_Calcio_logo.svg",
    prediction: "Home Over 1.5",
    probability: 60,
    date: "2024-03-20",
    time: "20:45",
    result: null
  };

  const [predictions, setPredictions] = useState([initialPrediction]);

  const addNewPrediction = () => {
    const newPrediction = {
      homeTeam: "",
      awayTeam: "",
      homeTeamLogo: "",
      awayTeamLogo: "",
      prediction: "",
      probability: 50,
      date: new Date().toISOString().split('T')[0],
      time: "20:00",
      result: null
    };
    setPredictions([...predictions, newPrediction]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="p-4 flex justify-between items-center border-b">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-accent rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-accent rounded-lg"
          >
            {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          
          {isEditorMode ? (
            <>
              <button
                onClick={() => setShowProfile(true)}
                className="p-2 hover:bg-accent rounded-lg"
              >
                <User className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsEditorMode(false)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                {language === "en" ? "Exit Editor" : "Editörden Çık"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              {language === "en" ? "Editor Mode" : "Editör Modu"}
            </button>
          )}
        </div>
      </nav>

      {showMenu && (
        <div className="absolute top-16 left-0 bg-background border rounded-lg shadow-lg p-2 z-50">
          <button
            onClick={() => {
              setCurrentView("predictions");
              setShowMenu(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-accent rounded-lg"
          >
            {language === "en" ? "Predictions" : "Tahminler"}
          </button>
          <button
            onClick={() => {
              setCurrentView("passed");
              setShowMenu(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-accent rounded-lg"
          >
            {language === "en" ? "Passed Predictions" : "Geçmiş Tahminler"}
          </button>
        </div>
      )}

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentView === "predictions" ? (
            predictions.map((prediction, index) => (
              isEditorMode ? (
                <EditPredictionCard
                  key={index}
                  prediction={prediction}
                  onUpdate={(updatedPrediction) => {
                    const newPredictions = [...predictions];
                    newPredictions[index] = updatedPrediction;
                    setPredictions(newPredictions);
                  }}
                  onDelete={() => {
                    const newPredictions = predictions.filter((_, i) => i !== index);
                    setPredictions(newPredictions);
                  }}
                  language={language}
                />
              ) : (
                <PredictionCard
                  key={index}
                  prediction={prediction}
                  language={language}
                />
              )
            ))
          ) : (
            predictions
              .filter(pred => pred.result !== null)
              .map((prediction, index) => (
                <PredictionCard
                  key={index}
                  prediction={prediction}
                  showResult
                  language={language}
                />
              ))
          )}
        </div>

        {isEditorMode && currentView === "predictions" && (
          <button
            onClick={addNewPrediction}
            className="fixed bottom-6 right-6 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-opacity"
          >
            <Edit3 className="w-6 h-6" />
          </button>
        )}
      </main>

      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          setIsEditorMode(true);
          setShowLoginModal(false);
        }}
        language={language}
      />
    </div>
  );
}