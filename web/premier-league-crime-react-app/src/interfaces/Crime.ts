export interface Crime {
    category: string,
    exactLocation: CrimeLocation,
    outcomeStatus: OutcomeStatus,
    date: string
}

interface CrimeLocation {
    longitude: number,
    latitude: number
}

interface OutcomeStatus {
    date: string
    status: string
}