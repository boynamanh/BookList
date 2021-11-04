import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
export const configAppString = (jsons: any[]) => {
  const combineJson = jsons.reduce((prev, current) => {
    return {
      ...prev,
      ...current,
    };
  });
  const en = {
    translation: {...combineJson},
  };
  i18n.use(initReactI18next).init({
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {en},
  });
  return i18n;
};
