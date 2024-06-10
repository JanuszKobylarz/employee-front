import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    Employees: 'Employees'
  },
  pl: {
    Employees: 'Lista pracowników',
    Name: 'Imię',
    Surname: 'Nazwisko',
    Position: 'Stanowisko',
    Add: 'Dodaj',
    Supervisor: 'Przełożony',
    'Find supervisor': 'Znajdź przełożonego',
    'Find employee': 'Znajdź pracownika',
    'Show subordinates': 'Pokaż podwładnych',
    'Hide subordinates': 'Ukryj podwładnych',
    'Add subordinate': 'Dodaj podwładnego',
    'Find position': 'Znajdź stanowisko',
    'Employee added successfully': 'Pracownik dodany pomyślnie',
    'Error adding employee': 'Błąd dodawania pracownika',
    'Field is required': 'Pole jest wymagane',
    'Field can`t contain any number': 'Pole nie może zawierać żadnej liczby',
    'All fields are required': 'Wszystkie pola są wymagane',
    'expand/hide': 'rozwiń/zwiń'
  }
}

export const i18n = createI18n({
  locale: 'pl', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages // set locale messages
})
