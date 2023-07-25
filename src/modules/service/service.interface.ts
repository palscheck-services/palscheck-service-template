import { Types, Document } from 'mongoose'


export interface ServiceModel {
  account:string
}

export type UserDocument = (Document<Types.ObjectId, unknown, ServiceModel> & ServiceModel & { _id: Types.ObjectId }) | null
