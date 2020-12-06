const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const app = express();

const interviewees = [
  { id: 1, name: "Alex", surname: "Fernandes" },
  { id: 2, name: "John", surname: "Doe" },
  { id: 3, name: "Jane", surname: "Mary" },
];

const interviewers = [{ id: 1, name: "Dirk", surname: "Naude" }];

const interviews = [
  {
    id: 1,
    intervieweeId: 1,
    interviewerId: 1,
    interview_typeId: 1,
    interview_statusId: 1,
    date: "2020-01-01",
  },
  {
    id: 2,
    intervieweeId: 1,
    interviewerId: 1,
    interview_typeId: 2,
    interview_statusId: 1,
    date: "2020-01-11",
  },
  {
    id: 3,
    intervieweeId: 1,
    interviewerId: 1,
    interview_typeId: 3,
    interview_statusId: 1,
    date: "2020-01-25",
  },
  {
    id: 4,
    intervieweeId: 2,
    interviewerId: 1,
    interview_typeId: 1,
    interview_statusId: 1,
    date: "2020-03-17",
  },
  {
    id: 5,
    intervieweeId: 2,
    interviewerId: 1,
    interview_typeId: 2,
    interview_statusId: 2,
    date: "2020-03-22",
  },
  {
    id: 6,
    intervieweeId: 3,
    interviewerId: 1,
    interview_typeId: 1,
    interview_statusId: 1,
    date: "2020-05-04",
  },
  {
    id: 7,
    intervieweeId: 3,
    interviewerId: 1,
    interview_typeId: 2,
    interview_statusId: 1,
    date: "2020-05-15",
  },
  {
    id: 8,
    intervieweeId: 3,
    interviewerId: 1,
    interview_typeId: 3,
    interview_statusId: 1,
    date: "2020-05-30",
  },
];

const interview_types = [
  { id: 1, type: "Initial interview" },
  { id: 2, type: "Coding/Technical interview" },
  { id: 3, type: "Final interview" },
];

const interview_status = [
  { id: 1, status: "Pass" },
  { id: 2, status: "Failed" },
];

const Interviewee = new GraphQLObjectType({
  name: "Interviewee",
  description: "Tnterviewee",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    surname: { type: GraphQLNonNull(GraphQLString) },
    interviews: {
      type: GraphQLList(Interview),
      resolve: (interviewee) => {
        return interviews.filter(
          (interview) => interview.intervieweeId === interviewee.id
        );
      },
    },
  }),
});

const Interviewer = new GraphQLObjectType({
  name: "Interviewer",
  description: "Interviewer",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    surname: { type: GraphQLNonNull(GraphQLString) },
    interviews: {
      type: GraphQLList(Interview),
      resolve: (interviewer) => {
        return interviews.filter(
          (interview) => interview.interviewerId === interviewer.id
        );
      },
    },
  }),
});

const InterviewType = new GraphQLObjectType({
  name: "InterviewType",
  description: "Interview Type",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    type: { type: GraphQLNonNull(GraphQLString) },
    interviews: {
      type: GraphQLList(Interview),
      resolve: (interview_type) => {
        return interviews.filter(
          (interview) => interview.interview_typeId === interview_type.id
        );
      },
    },
  }),
});

const InterviewStatus = new GraphQLObjectType({
  name: "InterviewStatus",
  description: "Interview Status",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    status: { type: GraphQLNonNull(GraphQLString) },
    interviews: {
      type: GraphQLList(Interview),
      resolve: (interview_status) => {
        return interviews.filter(
          (interview) => interview.interview_statusId === interview_status.id
        );
      },
    },
  }),
});

const Interview = new GraphQLObjectType({
  id: 5,
  name: "Interview",
  description: "Interview",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    intervieweeId: { type: GraphQLNonNull(GraphQLInt) },
    interviewerId: { type: GraphQLNonNull(GraphQLInt) },
    interview_typeId: { type: GraphQLNonNull(GraphQLInt) },
    interview_statusId: { type: GraphQLNonNull(GraphQLInt) },
    interviewee: {
      type: Interviewee,
      resolve: (interview) => {
        return interviewees.find(
          (interviewee) => interviewee.id === interview.intervieweeId
        );
      },
    },
    interviewer: {
        type: Interviewer,
        resolve: (interview) => {
          return interviewers.find(
            (interviewers) => interviewers.id === interview.interviewerId
          );
        },
      },
    interview_type: {
      type: InterviewType,
      resolve: (interview) => {
        return interview_types.find(
          (interview_type) => interview_type.id === interview.interview_typeId
        );
      },
    },
    interview_status: {
      type: InterviewStatus,
      resolve: (interview) => {
        return interview_status.find(
          (interview_status) =>
            interview_status.id === interview.interview_statusId
        );
      },
    },
    date: { type: GraphQLNonNull(GraphQLString) },
  }),
});



const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    interviews: {
      type: new GraphQLList(Interview),
      description: "List of All Interviews",
      resolve: () => interviews,
    },
    interviewees: {
      type: new GraphQLList(Interviewee),
      description: "List of All Interviewees",
      resolve: () => interviewees,
    },
    interviewers: {
        type: new GraphQLList(Interviewer),
        description: "List of All Interviewers",
        resolve: () => interviewers,
    },
    interview_status: {
        type: new GraphQLList(InterviewStatus),
        description: "List of All interview status",
        resolve: () => interview_status,
    },
    interview_type: {
        type: new GraphQLList(InterviewType),
        description: "List of All interview type",
        resolve: () => interview_types,
    }
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, () => console.log("EPI-USE_GraphQL server running"));

