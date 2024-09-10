// The code defines a Mongoose schema for videos, which includes fields for storing video file URLs, thumbnails, titles, descriptions, durations, view counts, and ownership.

import mongoose from "mongoose";//Mongoose is imported to define schemas and models for MongoDB.
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";//This is a plugin that allows pagination for MongoDB aggregation queries, making it easier to handle large datasets.

const videoSchema = new mongoose.Schema(
    {
        videoFile: {
            type: String, //Cloudinary url
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number, //Cloudinary url
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {
        timestamps:true
    }
);

videoSchema.plugin(mongooseAggregatePaginate)//This plugin is added to the schema, enabling aggregation queries with pagination. Aggregation is often used to perform complex data queries and calculations in MongoDB. This plugin makes it easy to paginate the results of those queries.

export const Video = mongoose.model("Video",videoSchema)