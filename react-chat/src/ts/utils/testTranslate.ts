// ./ts/testTranslate.ts
import { translate } from './translate';

(async () => {
  const result = await translate({
    text: 'Hello World!',
    fromLanguage: 'en',
    toLanguage: 'it',
    autoDetect: false,
  });

  if (result) {
    console.log(`Translated text: ${result.translatedText}`);
  } else {
    console.log('Translation failed');
  }
})();
