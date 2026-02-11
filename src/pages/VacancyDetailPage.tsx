import { useEffect, useMemo, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Container,
  Group,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core'
import { useParams } from 'react-router-dom'
import { formatSalary, getWorkFormat } from '../utils/formatters'
import { buildHhUrl } from '../api/hh'

const sanitizeHtml = (value: string) => {
  if (typeof window === 'undefined') return value

  const doc = new DOMParser().parseFromString(value, 'text/html')
  const blockedTags = ['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta']

  blockedTags.forEach((tag) => {
    doc.querySelectorAll(tag).forEach((node) => node.remove())
  })

  doc.querySelectorAll('*').forEach((element) => {
    Array.from(element.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase()
      const valueAttr = attr.value

      if (name.startsWith('on') || name === 'style') {
        element.removeAttribute(attr.name)
        return
      }

      if ((name === 'href' || name === 'src') && /^javascript:/i.test(valueAttr.trim())) {
        element.removeAttribute(attr.name)
      }
    })
  })

  return doc.body.innerHTML
}

type RichTextProps = {
  html: string
}

function RichText({ html }: RichTextProps) {
  const safeHtml = useMemo(() => sanitizeHtml(html), [html])

  return (
    <TypographyStylesProvider>
      <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
    </TypographyStylesProvider>
  )
}

export function VacancyDetailPage() {
  const { id } = useParams()
  const [vacancy, setVacancy] = useState<HhVacancyDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const loadVacancy = async () => {
      try {
        setLoading(true)
        const response = await fetch(buildHhUrl(`/vacancies/${id}`))
        if (!response.ok) {
          throw new Error('Не удалось загрузить вакансию')
        }
        const data = (await response.json()) as HhVacancyDetail
        setVacancy(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
      } finally {
        setLoading(false)
      }
    }

    loadVacancy().catch(() => undefined)
  }, [id])

  const vacancyUrl = useMemo(() => {
    if (!vacancy) return null
    return vacancy.url ?? vacancy.alternate_url
  }, [vacancy])

  return (
    <Box>
      <Container size="md" className="detail-content">
        {loading && <Text>Загрузка...</Text>}
        {error && (
          <Text c="red" role="alert">
            {error}
          </Text>
        )}

        {vacancy && (
          <>
            <Box className="detail-card">
              <Title order={3} c="blue">
                {vacancy.name}
              </Title>
              <Group mt={8} gap={12} wrap="wrap">
                <Text>{formatSalary(vacancy.salary)}</Text>
                <Text c="dimmed">{vacancy.experience?.name ?? 'Опыт не указан'}</Text>
              </Group>

              <Badge mt={10} variant="light">
                {getWorkFormat(vacancy.schedule?.name)}
              </Badge>

              <Text mt={12} c="dimmed">
                {vacancy.employer?.name ?? 'Компания не указана'}
              </Text>
              <Text>{vacancy.area?.name ?? 'Город не указан'}</Text>

              {vacancyUrl && (
                <Button
                  mt={16}
                  color="dark"
                  component="a"
                  href={vacancyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Откликнуться на hh.ru
                </Button>
              )}
            </Box>

            <Box className="detail-description">
              <Title order={4} mb={12}>
                Компания
              </Title>
              {vacancy.snippet?.responsibility && (
                <Box mb={12}>
                  <RichText html={vacancy.snippet.responsibility} />
                </Box>
              )}
              {vacancy.snippet?.requirement && <RichText html={vacancy.snippet.requirement} />}
              {!vacancy.snippet?.responsibility && !vacancy.snippet?.requirement && vacancy.description && (
                <RichText html={vacancy.description} />
              )}
            </Box>
          </>
        )}
      </Container>
    </Box>
  )
}
