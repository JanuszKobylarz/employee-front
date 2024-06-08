import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    Employees: 'Employees'
  },
  pl: {
    Employees: 'Pracownicy',
    Name: 'Imię',
    Surname: 'Nazwisko',
    Position: 'Stanowisko',
    Add: 'Dodaj'
  }
}

export const i18n = createI18n({
  locale: 'pl', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages // set locale messages
})
