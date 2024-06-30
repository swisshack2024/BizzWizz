import create from 'zustand'

type Choices = {
  framework: string
  kpis: string[]
  tools: string[]
  resetChoices: () => void
}

type ChoicesState = {
  choices: Choices
  setChoices: (choices: Partial<Choices>) => void
}

const useChoicesStore = create<ChoicesState>((set) => ({
  choices: {
    framework: '',
    kpis: [],
    tools: [],
  },
  setChoices: (newChoices) =>
    set((state) => ({
      choices: {
        ...state.choices,
        ...newChoices,
      },
    })),
  resetChoices: () =>
    set({
      choices: {
        framework: '',
        kpis: [],
        tools: [],
      },
    }),
}))

export default useChoicesStore
