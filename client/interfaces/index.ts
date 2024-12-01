export interface IPlantRecord {
  id: string
  dateTime: string
  description?: string
  imageUrl: string
  plantInfoUrl?: string
  title: string
  userEmail: string
}

export interface IGeoLocation {
  coords: {
    accuracy: number
    altitude: number
    altitudeAccuracy: number
    heading: number
    latitude: number
    longitude: number
    speed: number
  }
  mocked: boolean
  timestamp: number
}