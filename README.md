## Практическая задача 5.3.3 Проверяемое задание «Добавление роута, Layout, Link и useMatch»

- **Деплой:**  
  
  https://rinat-khabibullin.github.io/vacancyFinalLayout/
- **Репозиторий:**  
  https://github.com/Rinat-Khabibullin/vacancyFinalLayout

##  Что реализовано
- добавлен в проект роутер с двумя роутами: /vacancies и /about;

- создан общий Layout;

- реализована страница «Обо мне»: на странице заголовок «Обо мне» и краткое резюме в свободной форме;

- реализовано выделение стилями активного роута.



Тесты проходят <img width="972" height="332" alt="Снимок экрана 2026-02-07 в 19 39 34" src="https://github.com/user-attachments/assets/e09bd1b6-2777-484e-822c-a38e17a40379" />

**Страницу notFoundPage вызываем в консоли, пушая в хистори стейт:**
window.history.pushState({}, '', '/jobVacancyWebsite/does-not-exist')
window.dispatchEvent(new PopStateEvent('popstate'))
<img width="600" height="332" alt="Снимок экрана 2026-02-07 в 18 38 31" src="https://github.com/user-attachments/assets/e8a10024-4783-4a26-8540-75a75b84c3b2" />
