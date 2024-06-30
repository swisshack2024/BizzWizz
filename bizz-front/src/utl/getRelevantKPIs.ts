import { kpis } from "./loadData.ts";
import {filterCompanies} from "./filterCompanies.ts";

export async function getRelevantKPIs({
    industry,
    country,
    min_number_employees,
    max_number_employees,
}: {industry: string, country: string, min_number_employees: number, max_number_employees: number}) {
    const filteredCompanies = await filterCompanies({industry, country, min_number_employees, max_number_employees})

    // Filter KPIs based on the industries they apply to
    const relevantKPIs = kpis
        .filter(kpi => kpi.industries.includes(industry) || kpi.industries.includes("All industries"))
        .map(kpi => {
            return {
                ...kpi,
                companies: filteredCompanies
            };
        });

    return relevantKPIs;
}
