import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, BarChart3 } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-wellness/15 blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-8">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full gradient-wellness flex items-center justify-center shadow-glow">
            <Heart className="w-10 h-10 text-wellness-foreground" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            YouthAI
          </h1>
          <div className="text-xl md:text-2xl font-semibold gradient-primary bg-clip-text text-transparent">
            Your Wellness Companion
          </div>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Talk. Track. Thrive.
          </p>
        </div>

        {/* Main CTA */}
        <div className="pt-6">
          <Button 
            variant="hero" 
            onClick={() => navigate('/chat')}
            className="group"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Start Your Wellness Journey
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button 
            variant="wellness" 
            size="lg"
            onClick={() => navigate('/mood')}
            className="group"
          >
            <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Track Your Mood
          </Button>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-card border border-border/50">
            <MessageCircle className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">AI Companion</h3>
            <p className="text-muted-foreground text-sm">
              Chat with an empathetic AI that understands and supports you
            </p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-card border border-border/50">
            <BarChart3 className="w-8 h-8 text-wellness mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Mood Tracking</h3>
            <p className="text-muted-foreground text-sm">
              Daily mood logging with visual progress tracking
            </p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-card border border-border/50">
            <Heart className="w-8 h-8 text-secondary mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Personalized Tips</h3>
            <p className="text-muted-foreground text-sm">
              AI-generated wellness tips tailored to your mood
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;