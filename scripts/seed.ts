import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import mongoose from "mongoose"
import {User} from '../models/User'
import {Post} from '../models/Post'

import { cryptPassword } from "../lib/password";
import connectDb from '@/db/connectDB'
import { Comment } from "@/models/Comment"

const seed = async () => {
  await connectDb();

  // delete table dates
  await User.deleteMany({})
  await Post.deleteMany({})
  await Comment.deleteMany({})


  const user1 = await User.create({name: 'Test',email: 'test@mail.com',password: await cryptPassword('secret'), role: 'user', active: true, img: '/img/profile/default.jpg'});
  const user2 = await User.create({name: 'Admin',email: 'admin@mail.com',password: await cryptPassword('secret'), role: 'admin', active: true, img: '/img/profile/milos.jpg'});

  // insert posts
  await Post.insertMany([
    {
        title: 'Post One',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae augue vel dui dignissim scelerisque ac nec lectus. Nam sodales tristique accumsan. Aliquam interdum quam efficitur, aliquam tortor eu, dapibus felis. Nullam porta augue tincidunt orci tincidunt dignissim. Sed ut sem porttitor, sodales urna ut, sodales erat. Sed convallis nulla non nunc egestas interdum. Duis metus dolor, mattis eu nisl quis, sollicitudin vulputate tellus. Sed euismod mollis metus et ultricies. Duis in justo non nisl scelerisque congue.',
        img: '/img/posts/img_2.png', 
        status: true,
        wrote: user1._id
    },
    {
        title: 'Post Two',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae augue vel dui dignissim scelerisque ac nec lectus. Nam sodales tristique accumsan. Aliquam interdum quam efficitur, aliquam tortor eu, dapibus felis. Nullam porta augue tincidunt orci tincidunt dignissim. Sed ut sem porttitor, sodales urna ut, sodales erat. Sed convallis nulla non nunc egestas interdum. Duis metus dolor, mattis eu nisl quis, sollicitudin vulputate tellus. Sed euismod mollis metus et ultricies. Duis in justo non nisl scelerisque congue.',
        img: '/img/posts/img_3.png', 
        status: true,
        wrote: user2._id
    }
  ])


  console.log("Seeding done")

  await mongoose.connection.close()
}

seed()
  .then(() => {
    console.log("Process finished")
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })