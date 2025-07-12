import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";

const AiSuggestion = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<null | {
    title: string;
    points: string[];
  }>(null);

  const handleSubmit = async () => {
    if (!input.trim()) return toast.error("Please enter something.");
    if (input.length > 150) return toast.error("Only 150 characters allowed.");

    setLoading(true);
    try {
      const res = await axiosInstance.post("/ai/suggest", { idea: input });
      setAiResponse(res.data); // should include { title, points }
      console.log(res.data)
      toast.success("AI suggestion received!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to get suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-zinc-900 rounded-xl mt-10 text-white">
      <h2 className="text-xl font-bold">Need help? Ask the AI!</h2>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={150}
        placeholder="What do you want to share? (max 150 characters)"
        className="text-white text-xl font-bolo tracking-wide"
      />
      <Button
        className="mt-6 bg-white text-black hover:bg-gray-300"
        onClick={handleSubmit}
        disabled={loading || input.length > 150}
      >
        {loading ? "Generating..." : "Get AI Suggestion"}
      </Button>

      {aiResponse && (
        <div className="mt-4 border-t border-white/20 pt-4 space-y-2">
          <h3 className="text-lg font-semibold">Suggested Title:</h3>
          <p className="text-green-400">{aiResponse.title}</p>

          <h3 className="text-lg font-semibold">Key Points:</h3>
          <ul className="list-disc list-inside text-sm">
            {aiResponse?.points?.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AiSuggestion;
