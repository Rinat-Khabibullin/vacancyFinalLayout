import { ActionIcon, Box, Group, Pill, Text, TextInput } from '@mantine/core'

type SkillsFilterProps = {
  skills: string[]
  newSkill: string
  onNewSkillChange: (value: string) => void
  onAddSkill: () => void
  onRemoveSkill: (skill: string) => void
}

export function SkillsFilter({
  skills,
  newSkill,
  onNewSkillChange,
  onAddSkill,
  onRemoveSkill,
}: SkillsFilterProps) {
  return (
    <Box className="filters">
      <Text fw={600} mb={12}>
        Ключевые навыки
      </Text>
      <Group gap={8} wrap="nowrap">
        <TextInput
          placeholder="Навык"
          value={newSkill}
          onChange={(event) => onNewSkillChange(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              onAddSkill()
            }
          }}
        />
        <ActionIcon
          variant="filled"
          radius="md"
          onClick={onAddSkill}
          aria-label="Добавить навык"
        >
          +
        </ActionIcon>
      </Group>
      <Pill.Group mt={12}>
        {skills.map((skill) => (
          <Pill
            key={skill}
            withRemoveButton
            onRemove={() => onRemoveSkill(skill)}
            removeButtonProps={{ 'aria-label': `Удалить ${skill}` }}
          >
            {skill}
          </Pill>
        ))}
      </Pill.Group>
    </Box>
  )
}
