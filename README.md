# Letai: “Get Connected to the Internet+TV in 1 Day or We Are Paying for the First Month”—Landing Page

<img src="/readme-images/letai2-behance-website-preview.jpg" alt="Banner" />

«Летай» лендинг «Летай» лендинг «Подключим Интернет+ТВ за 1 день, или месяц за наш счет!»

👍 <a href="https://www.behance.net/gallery/156299371/Letai-InternetTV-Landing-Page">Behance Page</a>

---

<img src="/readme-images/letai2-index.jpg" alt="Preview" />

<img src="/readme-images/letai2-popup.jpg" alt="Preview 2 (popup)" />

---

## Установка

Для разработки, постройте node_modules
```
npm install
```

## Использование

### Разработка / Serve

Запустить проект на локальном сервере:

```
grunt
```

Можно писать JS на ECMAScript 2015+ (используется Babel 7)

### Сборка проекта для продакшена / Build

В `Gruntfile.js` укажите адрес папки с темой в переменной `themePath`. Во время сборки, это значение будет подставлено во все упоминания `@{themePath}` в JS и SCSS коде (например, в src изображений).

```
grunt build
```

JS файлы конкатенируются и проходят через Babel; изображения, JS, HTML, SASS сжимаются; в CSS добавляются вендор-префиксы и rem-fallback; содержимое public переносится без изменения.

## Поддержка
Project created by Anthony Boutinov (@anthonyboutinov) https://boutinov.website
