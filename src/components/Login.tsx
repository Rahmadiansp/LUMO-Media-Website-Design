import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Sparkles } from "lucide-react";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onNavigateToRegister: () => void;
  onNavigateToLanding: () => void;
}

export function Login({ onLogin, onNavigateToRegister, onNavigateToLanding }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <button 
          onClick={onNavigateToLanding}
          className="flex items-center gap-2 mx-auto mb-8 hover:opacity-80 transition-opacity"
        >
          <span className="text-4xl">LUMO</span>
          <div className="w-2 h-2 rounded-full bg-orange-400"></div>
        </button>

        <Card className="p-8 rounded-3xl shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-700">Selamat Datang Kembali!</span>
            </div>
            <h2 className="text-2xl mb-2">Masuk ke LUMO</h2>
            <p className="text-gray-600">Lanjutkan petualangan jurnalistikmu</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl h-12 bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl h-12 bg-input-background"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full rounded-xl h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Masuk
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{" "}
              <button 
                onClick={onNavigateToRegister}
                className="text-purple-600 hover:text-purple-700"
              >
                Daftar sekarang
              </button>
            </p>
          </div>
        </Card>

        {/* Demo Info */}
        <div className="mt-6 text-center">
          <Card className="p-4 rounded-2xl bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-800">
              💡 Demo: Gunakan email dan password apa saja untuk masuk
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
