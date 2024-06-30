async function fetchJson(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        console.error(url);
        return null;
    }
}

export const companyToEmployees = await fetchJson('/data/company_to_employees.json');
export const countries = await fetchJson('/data/countries.json');
export const countryToIndustryToCompany = await fetchJson('/data/country_to_industry_to_company.json');
export const industries = await fetchJson('/data/industries.json');
export const sustainabilityTools = await fetchJson('/data/sustainability_tools.json');
export const kpis = await fetchJson('/data/kpis.json');
export const tools = await fetchJson('/data/tools.json');
