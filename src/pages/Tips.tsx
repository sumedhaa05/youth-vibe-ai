import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Lightbulb, RefreshCw, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Tips = () => {
  const navigate = useNavigate();
  const [currentTip, setCurrentTip] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastMood, setLastMood] = useState<string>("");

  const wellnessTips = {
    "very-happy": [
      "You're radiating positive energy! Share this joy with someone special today. Consider writing in a gratitude journal to capture this wonderful feeling. 🌟",
      "What a beautiful day to be you! Channel this amazing energy into a creative activity or help someone else feel great too. Your happiness is contagious! ✨",
      "You're glowing with positivity! This is the perfect time to set some exciting goals or try something new you've been wanting to do. Keep shining! 🌈"
    ],
    "happy": [
      "Your positive energy is lovely! Take a moment to appreciate what's going well in your life. Maybe call a friend or family member to spread the good vibes. 😊",
      "You're in a great headspace! This could be a wonderful time for some light exercise, creative expression, or planning something fun for the weekend. 🌸",
      "Feeling good looks great on you! Consider spending some time in nature today, or try a new hobby that brings you joy. Your happiness matters! 🌺"
    ],
    "neutral": [
      "Sometimes neutral is exactly where we need to be. Try some gentle movement like stretching or a short walk to boost your energy naturally. 🌿",
      "Balanced energy can be powerful! This might be a perfect time for mindfulness, reading, or organizing something in your space to create calm clarity. 🧘‍♀️",
      "Feeling steady? That's actually wonderful! Consider trying something new today - maybe a new recipe, podcast, or creative activity to add some sparkle. 🌱"
    ],
    "sad": [
      "It's okay to feel low sometimes. Be gentle with yourself today. Try some deep breathing, listen to comforting music, or reach out to someone who cares about you. 💙",
      "Your feelings are valid. Consider doing something nurturing for yourself - a warm bath, herbal tea, or curling up with a good book or movie. You deserve kindness. 🫖",
      "Tough days happen to everyone. Try some light movement when you're ready, or practice self-compassion. Remember: this feeling is temporary, and you're stronger than you know. 🌙"
    ],
    "very-sad": [
      "I see you're struggling, and that takes courage to acknowledge. Please be extra gentle with yourself. Consider reaching out to a trusted friend, counselor, or call 988 if you need support. You matter. 💜",
      "Difficult emotions are part of being human. Focus on basic self-care today - staying hydrated, getting some rest, and being patient with yourself. Professional support is always available. 🤗",
      "You're not alone in this. Sometimes the smallest acts of self-care - like making tea, taking a shower, or stepping outside - can help. Consider talking to someone who cares about you. 🌅"
    ]
  };

  useEffect(() => {
    // Get the last logged mood
    const stored = localStorage.getItem("moodHistory");
    if (stored) {
      const moodHistory = JSON.parse(stored).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
      
      if (moodHistory.length > 0) {
        const mostRecent = moodHistory[moodHistory.length - 1];
        setLastMood(mostRecent.mood);
        generateTip(mostRecent.mood);
      } else {
        generateTip("neutral");
      }
    } else {
      generateTip("neutral");
    }
  }, []);

  const generateTip = (mood: string = lastMood) => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const tips = wellnessTips[mood as keyof typeof wellnessTips] || wellnessTips.neutral;
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setCurrentTip(randomTip);
      setIsGenerating(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleRegenerateTip = () => {
    if (!isGenerating) {
      generateTip();
      toast.success("Generating a fresh tip for you! ✨");
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "very-happy": return "😀";
      case "happy": return "🙂";
      case "neutral": return "😐";
      case "sad": return "😔";
      case "very-sad": return "😢";
      default: return "💙";
    }
  };

  const getMoodLabel = (mood: string) => {
    switch (mood) {
      case "very-happy": return "Great";
      case "happy": return "Good";
      case "neutral": return "Okay";
      case "sad": return "Low";
      case "very-sad": return "Struggling";
      default: return "Balanced";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/mood')}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full gradient-wellness flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-wellness-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Wellness Tips</h1>
            <p className="text-sm text-muted-foreground">Personalized for you</p>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Current Mood Context */}
        {lastMood && (
          <Card className="p-4 shadow-soft bg-gradient-to-r from-primary/5 to-wellness/5 border-primary/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getMoodEmoji(lastMood)}</span>
              <div>
                <p className="text-sm text-muted-foreground">Based on your mood:</p>
                <p className="font-semibold">{getMoodLabel(lastMood)}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Daily Tip */}
        <Card className="p-6 shadow-card bg-card/90 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-wellness" />
                <h2 className="text-xl font-semibold">Today's Wellness Tip</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRegenerateTip}
                disabled={isGenerating}
                className="hover:bg-primary/10"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            <div className="min-h-[120px] flex items-center">
              {isGenerating ? (
                <div className="w-full text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full gradient-wellness animate-pulse" />
                  </div>
                  <p className="text-muted-foreground">Generating a personalized tip for you...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-foreground">
                    {currentTip}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Generated just for you • {new Date().toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleRegenerateTip}
            disabled={isGenerating}
            variant="wellness"
            size="lg"
            className="flex-1 group"
          >
            <RefreshCw className={`w-4 h-4 group-hover:scale-110 transition-transform ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Get Another Tip'}
          </Button>
          
          <Button 
            onClick={() => navigate('/mood')}
            variant="secondary"
            size="lg"
            className="flex-1"
          >
            Update Mood
          </Button>
        </div>

        {/* Encouragement */}
        <Card className="p-6 shadow-soft bg-gradient-to-br from-wellness/5 to-secondary/5 border-wellness/20">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-wellness">You're Doing Great! 🌟</h4>
            <p className="text-sm text-muted-foreground">
              Taking time for your mental wellness shows incredible strength. 
              Small steps like this create lasting positive change in your life.
            </p>
          </div>
        </Card>

        {/* Support Resources */}
        <Card className="p-4 shadow-soft bg-card/60 border-border/50">
          <h4 className="font-medium text-sm mb-2 text-muted-foreground">Need Additional Support?</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>• Crisis Text Line: Text HOME to 741741</p>
            <p>• National Suicide Prevention Lifeline: 988</p>
            <p>• Crisis support is available 24/7</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Tips;