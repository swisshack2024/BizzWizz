import create from 'zustand'

type Filters = {
  industry: string
  country: string
  size: string
  companyType: string
}

type FiltersState = {
  filters: Filters
  setFilters: (filters: Partial<Filters>) => void
  setIndustry: (industry: string) => void
  setCountry: (country: string) => void
  setSize: (size: string) => void
  setCompanyType: (companyType: string) => void
  resetFilters: () => void
}

const initialFilters: Filters = {
  industry: 'Software',
  country: 'Switzerland',
  size: '5000+ employees',
  companyType: 'Public',
}

const useFiltersStore = create<FiltersState>((set) => ({
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),
  setIndustry: (industry) =>
    set((state) => ({
      filters: {
        ...state.filters,
        industry,
      },
    })),
  setCountry: (country) =>
    set((state) => ({
      filters: {
        ...state.filters,
        country,
      },
    })),
  setSize: (size) =>
    set((state) => ({
      filters: {
        ...state.filters,
        size,
      },
    })),
  setCompanyType: (companyType) =>
    set((state) => ({
      filters: {
        ...state.filters,
        companyType,
      },
    })),
  resetFilters: () =>
    set({
      filters: initialFilters,
    }),
}))

export default useFiltersStore