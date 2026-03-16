import { ConfigService } from '@config/env.config';
import fs from 'fs';
import i18next from 'i18next';
import path from 'path';

const languages = ['en', 'pt-BR', 'es'];
const configService: ConfigService = new ConfigService();
const resources: any = {};

const candidatePaths = [
  path.resolve(process.cwd(), 'dist', 'translations'),
  path.resolve(process.cwd(), 'src', 'utils', 'translations'),
];

const translationsPath = candidatePaths.find((dir) => fs.existsSync(dir)) || candidatePaths[0];

languages.forEach((language) => {
  const languagePath = path.join(translationsPath, `${language}.json`);

  if (fs.existsSync(languagePath)) {
    const translationContent = fs.readFileSync(languagePath, 'utf8');
    resources[language] = {
      translation: JSON.parse(translationContent),
    };
  }
});

i18next.init({
  resources,
  fallbackLng: 'en',
  lng: configService.get('LANGUAGE'),
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
