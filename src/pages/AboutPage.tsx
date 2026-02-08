import { Box, Container, Text, Title } from '@mantine/core'

const resumeText = ` Я Frontend Developer (Junior+/Middle) с сильной практикой в создании SPA на React + TypeScript: уверенно строю архитектуру интерфейсов, работаю с состоянием через Redux Toolkit/RTK Query, пишу переиспользуемые компоненты и хуки, настраиваю качество кода (ESLint/Prettier/Husky), умею доводить учебные и pet-проекты до уровня, близкого к production (включая UI на Mantine, роутинг, работу с API, локальное хранилище, обработку ошибок и оптимизацию UX), быстро вхожу в продуктовые задачи и нацелен на удалённую команду с ростом до уверенного Middle.

Ключевые навыки:

Frontend: React, TypeScript, JavaScript (ES6+), HTML5, CSS3

State/Data: Redux Toolkit, RTK Query, async logic, API integration

UI/UX: Mantine UI, адаптивная вёрстка, компонентный подход

Tools: Vite, Git/GitHub, ESLint, Prettier, Husky

Практика: кастомные хуки, роутинг, модальные окна, формы, localStorage, рефакторинг

Подход к работе: аккуратность в коде, подробная проработка задач, умение учиться и расти на обратной связи`

export function AboutPage() {
  return (
    <Box>
      <Container size="md" className="about-content">
        <Box className="about-card">
          <Title order={2} mb={12}>
            Ринат Хабибуллин
          </Title>
          <Text className="about-text" component="div">
            {resumeText}
          </Text>
        </Box>
      </Container>
    </Box>
  )
}
