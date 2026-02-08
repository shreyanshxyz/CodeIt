import { useState, useEffect } from "react";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from "react-icons/ai";
import { ISettings } from "../Playground";
import SettingsModal from "@/components/Modals/SettingsModal";

type PreferenceNavProps = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
  setSettings,
  settings,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  return (
    <div className="flex items-center justify-between bg-black-pure h-11 w-full border-b border-border-subtle px-4">
      <div className="flex items-center">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-black-surface text-text-secondary hover:bg-black-hover hover:text-text-primary px-3 py-1.5 font-medium text-sm transition-all duration-150 border border-border-subtle">
          <div className="flex items-center">
            <div className="text-xs font-medium">JavaScript</div>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="preferenceBtn group"
          onClick={() =>
            setSettings({ ...settings, settingsModalIsOpen: true })
          }
          aria-label="Settings"
        >
          <div className="h-4 w-4 text-text-tertiary group-hover:text-text-primary transition-colors duration-150">
            <AiOutlineSetting className="text-lg" />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>

        <button
          className="preferenceBtn group"
          onClick={handleFullScreen}
          aria-label="Toggle fullscreen"
        >
          <div className="h-4 w-4 text-text-tertiary group-hover:text-text-primary transition-colors duration-150">
            {!isFullScreen ? (
              <AiOutlineFullscreen className="text-lg" />
            ) : (
              <AiOutlineFullscreenExit className="text-lg" />
            )}
          </div>
          <div className="preferenceBtn-tooltip">
            {isFullScreen ? "Exit Full Screen" : "Full Screen"}
          </div>
        </button>
      </div>
      {settings.settingsModalIsOpen && (
        <SettingsModal settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
};
export default PreferenceNav;
