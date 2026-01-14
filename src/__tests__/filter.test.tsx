import { act, render, screen } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { createAppStore } from '../store/store'
import { addSkill, removeSkill, setArea, setSearchText } from '../store/filtersSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

function FiltersHarness() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.filters)

  return (
    <div>
      <div data-testid="skills">{filters.skills.join(', ')}</div>
      <div data-testid="area">{filters.area}</div>
      <div data-testid="search">{filters.searchText}</div>
      <div data-testid="page">{filters.page}</div>
      <button type="button" onClick={() => dispatch(addSkill('GraphQL'))}>
        Add skill
      </button>
      <button type="button" onClick={() => dispatch(removeSkill('React'))}>
        Remove React
      </button>
      <button type="button" onClick={() => dispatch(setArea('Москва'))}>
        Set area
      </button>
      <button type="button" onClick={() => dispatch(setSearchText('Kata'))}>
        Set search
      </button>
    </div>
  )
}

describe('filters slice', () => {
  it('renders a basic component', () => {
    render(React.createElement('div', null, 'ok'))
    expect(screen.getByText('ok')).toBeInTheDocument()
  })

  it('starts with default skills', () => {
    const store = createAppStore()
    render(
      <Provider store={store}>
        <FiltersHarness />
      </Provider>,
    )

    expect(screen.getByTestId('skills').textContent).toContain('TypeScript')
    expect(screen.getByTestId('skills').textContent).toContain('React')
    expect(screen.getByTestId('skills').textContent).toContain('Redux')
  })

  it('adds and removes skills', async () => {
    const store = createAppStore()
    render(
      <Provider store={store}>
        <FiltersHarness />
      </Provider>,
    )

    const user = userEvent.setup()
    await user.click(screen.getByText('Add skill'))

    expect(screen.getByTestId('skills').textContent).toContain('GraphQL')

    await user.click(screen.getByText('Remove React'))
    expect(screen.getByTestId('skills').textContent).not.toContain('React')
  })

  it('resets page on search or area change', async () => {
    const store = createAppStore()
    store.dispatch({ type: 'filters/setPage', payload: 3 })

    render(
      <Provider store={store}>
        <FiltersHarness />
      </Provider>,
    )

    expect(screen.getByTestId('page').textContent).toBe('3')

    const user = userEvent.setup()
    await user.click(screen.getByText('Set area'))
    expect(screen.getByTestId('area').textContent).toBe('Москва')
    expect(screen.getByTestId('page').textContent).toBe('1')

    act(() => {
      store.dispatch({ type: 'filters/setPage', payload: 2 })
    })
    await user.click(screen.getByText('Set search'))
    expect(screen.getByTestId('search').textContent).toBe('Kata')
    expect(screen.getByTestId('page').textContent).toBe('1')
  })
})
