import AssessmentScreen from "@/screens/AssessmentScreen";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Assessment() {
    return (
        <LanguageProvider initialLanguage="ru">
            <div className="w-full bg-whitey text-blacky">
                <AssessmentScreen />
            </div>
        </LanguageProvider>
    );
}
