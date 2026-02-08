import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { ISettings } from "../Workspace/Playground/Playground";
import useLocalStorage from "@/hooks/useLocalStorage";

const EDITOR_FONT_SIZES = [
  "12px",
  "13px",
  "14px",
  "15px",
  "16px",
  "17px",
  "18px",
];

interface SettingsModalProps {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  setSettings,
  settings,
}) => {
  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

  const handleClickDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setSettings({ ...settings, dropdownIsOpen: !settings.dropdownIsOpen });
  };

  return (
    <div className="text-text-primary z-40">
      <div
        aria-modal="true"
        role="dialog"
        className="fixed inset-0 overflow-y-auto z-modal"
      >
        <div className="flex min-h-screen items-center justify-center px-4">
          {/* overlay */}
          <div
            className="opacity-100"
            onClick={() =>
              setSettings({ ...settings, settingsModalIsOpen: false })
            }
          >
            <div className="fixed inset-0 bg-black-pure opacity-80"></div>
          </div>

          <div className="my-8 inline-block min-w-full transform rounded-lg text-left transition-all bg-black-elevated border border-border-subtle md:min-w-[420px] shadow-level4 w-[500px] !overflow-visible opacity-100 scale-100">
            {/* setting header */}
            <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
              <span className="text-base font-medium text-text-primary">
                Settings
              </span>
              <button
                className="cursor-pointer rounded transition-all duration-150 text-text-tertiary hover:text-text-primary"
                onClick={() =>
                  setSettings({ ...settings, settingsModalIsOpen: false })
                }
                aria-label="Close settings"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            <div className="px-6 pt-4 pb-6">
              <div className="mt-6 flex justify-between first:mt-0">
                <div className="w-[340px]">
                  <h3 className="text-base font-medium text-text-primary">
                    Font size
                  </h3>
                  <p className="text-text-tertiary text-sm mt-1.5">
                    Choose your preferred font size for the code editor.
                  </p>
                </div>
                <div className="w-[120px]">
                  <div className="relative">
                    <button
                      onClick={handleClickDropdown}
                      className="flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap bg-black-surface hover:bg-black-hover active:bg-black-surface w-full justify-between border border-border-subtle text-sm transition-all duration-150"
                      type="button"
                    >
                      <span className="text-text-primary">{fontSize}</span>
                      <BsChevronDown className="text-text-tertiary text-xs" />
                    </button>
                    {/* Show dropdown for fontsizes */}
                    {settings.dropdownIsOpen && (
                      <ul className="absolute mt-1 max-h-56 overflow-auto rounded-lg p-1 z-50 focus:outline-none w-full bg-black-elevated border border-border-subtle">
                        {EDITOR_FONT_SIZES.map((fontSize, idx) => (
                          <SettingsListItem
                            key={idx}
                            fontSize={fontSize}
                            selectedOption={settings.fontSize}
                            handleFontSizeChange={(fontSize) => {
                              setFontSize(fontSize);
                              setSettings({ ...settings, fontSize: fontSize });
                            }}
                          />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsModal;

interface SettingsListItemProps {
  fontSize: string;
  selectedOption: string;
  handleFontSizeChange: (fontSize: string) => void;
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({
  fontSize,
  selectedOption,
  handleFontSizeChange,
}) => {
  return (
    <li
      className="relative flex h-8 cursor-pointer select-none py-1.5 px-2 text-text-secondary hover:bg-black-hover hover:text-text-primary rounded transition-all duration-150"
      onClick={() => handleFontSizeChange(fontSize)}
    >
      <div
        className={`flex h-5 flex-1 items-center pr-2 ${
          selectedOption === fontSize ? "font-medium text-text-primary" : ""
        }`}
      >
        <div className="whitespace-nowrap text-sm">{fontSize}</div>
      </div>
      <span
        className={`text-accent-green flex items-center pr-2 ${
          selectedOption === fontSize ? "visible" : "invisible"
        }`}
      >
        <BsCheckLg className="text-sm" />
      </span>
    </li>
  );
};
