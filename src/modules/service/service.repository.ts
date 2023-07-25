import { Schema, model } from 'mongoose'
import { ServiceModel } from './service.interface'

interface ServiceMethods {
  generateAuthToken(): Promise<string>
  toJSON(): ServiceModel
}


const userSchema = new Schema<ServiceModel, ServiceMethods>()

export const ServiceRepository = model<ServiceModel>('service', userSchema)
