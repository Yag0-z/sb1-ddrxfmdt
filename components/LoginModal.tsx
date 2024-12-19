"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Eye, EyeOff } from "lucide-react";

const translations = {
  en: {
    email: "Email",
    password: "Password",
    login: "Login",
    invalidCredentials: "Invalid email or password"
  },
  tr: {
    email: "E-posta",
    password: "Şifre",
    login: "Giriş",
    invalidCredentials: "Geçersiz e-posta veya şifre"
  }
};

export default function LoginModal({ show, onClose, onLogin, language }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (!show) return null;

  const handleLogin = () => {
    if (email === "kukulyagiz1@gmail.com" && password === "Denemeceli123") {
      onLogin();
      setError("");
    } else {
      setError(translations[language].invalidCredentials);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 hover:bg-accent rounded-full"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder={translations[language].email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={translations[language].password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          <Button onClick={handleLogin} className="w-full">
            {translations[language].login}
          </Button>
        </div>
      </Card>
    </div>
  );
}