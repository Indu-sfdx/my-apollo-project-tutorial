import { gql, addErrorLoggingToSchema } from 'apollo-server';
import { Stream } from 'stream';

export default typeDefs = gql;

cosnt  Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    // Queries for the current user
    me: User
}

type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
}

type Rocket {
    id: ID!
    name: String
    type: String
}

type User {
    id: ID!
    email: String!
    trips: [Launch]!
}

type Mission {
    name: String
    missionPatch(size: PatchSize): String
}

enum PatchSize {
    SMALL
    LARGE
}

type Mutation {
    // if false, booking trips failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    // if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String // login token
}

type TripUpdateResponse {
    success: Boolean!
    message: Stream
    launches [Launch]
}

