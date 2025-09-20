import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodButton } from "@/components/MoodButton";
import { ArrowLeft, TrendingUp, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MoodEntry {
  id: string;
  mood: string;
  emoji: string;
  timestamp: Date;
}

const moodOptions = [
  { value: "very-happy", emoji: "😀", label: "Great" },
  { value: "happy", emoji: "🙂", label: "Good" },
  { value: "neutral", emoji: "😐", label: "Okay" },
  { value: "sad", emoji: "😔", label: "Low" },
  { value: "very-sad", emoji: "😢", label: "Struggling" },
];

const Mood = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

  useEffect(() => {
    // Load mood history from localStorage (mock database)
    const stored = localStorage.getItem("moodHistory");
    if (stored) {
      const parsed = JSON.parse(stored).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
      setMoodHistory(parsed);
      
      // Check if user already logged today
      const today = new Date().toDateString();
      const todayEntry = parsed.find((entry: MoodEntry) => 
        entry.timestamp.toDateString() === today
      );
      if (todayEntry) {
        setHasLoggedToday(true);
        setSelectedMood(todayEntry.mood);
      }
    }
  }, []);

  const handleMoodSelect = (moodValue: string) => {
    setSelectedMood(moodValue);
  };

  const handleSaveMood = () => {
    if (!selectedMood) {
      toast.error("Please select a mood first");
      return;
    }

    const moodOption = moodOptions.find(option => option.value === selectedMood);
    if (!moodOption) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      emoji: moodOption.emoji,
      timestamp: new Date(),
    };

    // Remove today's entry if it exists, then add new one
    const today = new Date().toDateString();
    const updatedHistory = moodHistory.filter(entry => 
      entry.timestamp.toDateString() !== today
    );
    updatedHistory.push(newEntry);
    
    // Keep only last 30 entries
    const recentHistory = updatedHistory.slice(-30);
    
    setMoodHistory(recentHistory);
    setHasLoggedToday(true);
    localStorage.setItem("moodHistory", JSON.stringify(recentHistory));
    
    toast.success("Mood logged successfully! 💙");
  };

  const getRecentMoods = () => {
    return moodHistory.slice(-7).reverse();
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "very-happy": return "text-mood-happy";
      case "happy": return "text-mood-good";
      case "neutral": return "text-mood-neutral";
      case "sad": return "text-mood-sad";
      case "very-sad": return "text-mood-very-sad";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="font-semibold text-lg">Mood Tracker</h1>
          <p className="text-sm text-muted-foreground">
            {hasLoggedToday ? "Updated today" : "How are you feeling?"}
          </p>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-8">
        {/* Mood Selection */}
        <Card className="p-6 shadow-card bg-card/80 backdrop-blur-sm">
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {hasLoggedToday ? "Today's Mood" : "How are you feeling today?"}
              </h2>
              <p className="text-muted-foreground">
                {hasLoggedToday 
                  ? "You can update your mood anytime" 
                  : "Select the emoji that best represents your mood"
                }
              </p>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              {moodOptions.map((option) => (
                <MoodButton
                  key={option.value}
                  emoji={option.emoji}
                  label={option.label}
                  value={option.value}
                  isSelected={selectedMood === option.value}
                  onClick={handleMoodSelect}
                />
              ))}
            </div>

            {selectedMood && (
              <Button 
                onClick={handleSaveMood}
                variant="wellness"
                size="lg"
                className="mt-6"
              >
                {hasLoggedToday ? "Update Mood" : "Save Mood"}
              </Button>
            )}
          </div>
        </Card>

        {/* Mood History */}
        {moodHistory.length > 0 && (
          <Card className="p-6 shadow-card bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Recent Moods</h3>
            </div>
            
            <div className="space-y-3">
              {getRecentMoods().map((entry) => {
                const option = moodOptions.find(opt => opt.value === entry.mood);
                return (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{entry.emoji}</span>
                      <div>
                        <p className="font-medium">{option?.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {entry.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Get Tips Button */}
        {hasLoggedToday && (
          <div className="text-center">
            <Button 
              onClick={() => navigate('/tips')}
              variant="secondary"
              size="lg"
              className="group"
            >
              <Lightbulb className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Get Today's Wellness Tip
            </Button>
          </div>
        )}

        {/* Encouragement */}
        <Card className="p-6 shadow-soft bg-gradient-to-br from-primary/5 to-wellness/5 border-primary/20">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-primary">Keep Going! 🌟</h4>
            <p className="text-sm text-muted-foreground">
              Tracking your mood helps you understand patterns and celebrate progress. 
              Every day is a new opportunity to grow.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Mood;
