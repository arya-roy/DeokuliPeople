import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => changeLanguage('en')}>{t('English')}</button>
      <button onClick={() => changeLanguage('hi')}>{t('Hindi')}</button>
      <button onClick={() => changeLanguage('mai')}>{t('Maithili')}</button>
      <button onClick={() => changeLanguage('kaithi')}>{t('Kaithi')}</button>
    </div>
  );
}

export default App;
