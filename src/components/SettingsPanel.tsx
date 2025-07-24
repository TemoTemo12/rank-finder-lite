import { useState, useEffect } from "react";
import { Settings, X, Key, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [googleSearchEngineId, setGoogleSearchEngineId] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load saved API keys from localStorage
    const savedGoogleKey = localStorage.getItem("rankfinder_google_api_key");
    const savedSearchEngineId = localStorage.getItem("rankfinder_search_engine_id");
    const savedOpenAIKey = localStorage.getItem("rankfinder_openai_api_key");
    
    if (savedGoogleKey) setGoogleApiKey(savedGoogleKey);
    if (savedSearchEngineId) setGoogleSearchEngineId(savedSearchEngineId);
    if (savedOpenAIKey) setOpenaiApiKey(savedOpenAIKey);
  }, []);

  const handleSave = () => {
    // Save to localStorage
    if (googleApiKey) localStorage.setItem("rankfinder_google_api_key", googleApiKey);
    if (googleSearchEngineId) localStorage.setItem("rankfinder_search_engine_id", googleSearchEngineId);
    if (openaiApiKey) localStorage.setItem("rankfinder_openai_api_key", openaiApiKey);
    
    toast({
      title: "Settings saved",
      description: "Your API keys have been saved locally.",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-search-border">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-search-primary" />
            <h2 className="text-lg font-semibold text-search-secondary">API Settings</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor="google-api" className="flex items-center gap-2 text-search-secondary mb-2">
              <Key className="h-4 w-4" />
              Google Search API Key
            </Label>
            <Input
              id="google-api"
              type="password"
              value={googleApiKey}
              onChange={(e) => setGoogleApiKey(e.target.value)}
              placeholder="Enter your Google API key"
              className="border-search-border focus:border-search-primary"
            />
            <p className="text-xs text-search-muted mt-1">
              Get your key from Google Cloud Console
            </p>
          </div>

          <div>
            <Label htmlFor="search-engine-id" className="text-search-secondary mb-2 block">
              Google Search Engine ID
            </Label>
            <Input
              id="search-engine-id"
              type="text"
              value={googleSearchEngineId}
              onChange={(e) => setGoogleSearchEngineId(e.target.value)}
              placeholder="Enter your Search Engine ID"
              className="border-search-border focus:border-search-primary"
            />
            <p className="text-xs text-search-muted mt-1">
              Create a custom search engine at cse.google.com
            </p>
          </div>

          <div>
            <Label htmlFor="openai-api" className="flex items-center gap-2 text-search-secondary mb-2">
              <Key className="h-4 w-4" />
              OpenAI API Key (for FinderAI)
            </Label>
            <Input
              id="openai-api"
              type="password"
              value={openaiApiKey}
              onChange={(e) => setOpenaiApiKey(e.target.value)}
              placeholder="Enter your OpenAI API key"
              className="border-search-border focus:border-search-primary"
            />
            <p className="text-xs text-search-muted mt-1">
              Get your key from platform.openai.com
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-search-border">
          <Button 
            onClick={handleSave} 
            className="w-full bg-search-primary hover:bg-search-primary-hover text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};