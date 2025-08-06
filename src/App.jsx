import React, { useState } from 'react'
import { tweetsData as initialTweets } from './data'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'
import { FaHeart, FaRetweet, FaComment } from 'react-icons/fa'

export default function App() {
  const [tweetText, setTweetText] = useState('')
  const [tweets, setTweets] = useState(
    initialTweets.map(t => ({ ...t, showReplies: false }))
  )

  const handleLike = id => {
    setTweets(prev =>
      prev.map(t =>
        t.uuid === id
          ? { ...t, isLiked: !t.isLiked, likes: t.likes + (t.isLiked ? -1 : 1) }
          : t
      )
    )
  }

  const handleRetweet = id => {
    setTweets(prev =>
      prev.map(t =>
        t.uuid === id
          ? {
              ...t,
              isRetweeted: !t.isRetweeted,
              retweets: t.retweets + (t.isRetweeted ? -1 : 1),
            }
          : t
      )
    )
  }

  const handleReply = id => {
    setTweets(prev =>
      prev.map(t =>
        t.uuid === id ? { ...t, showReplies: !t.showReplies } : t
      )
    )
  }

  const handleTweet = () => {
    if (!tweetText.trim()) return
    const newTweet = {
      handle: '@You',
      profilePic: '/public/images/frenki.jpg',
      likes: 0,
      retweets: 0,
      tweetText: tweetText.trim(),
      replies: [],
      isLiked: false,
      isRetweeted: false,
      showReplies: false,
      uuid: uuidv4(),
    }
    setTweets([newTweet, ...tweets])
    setTweetText('')
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-blue-500">Twitt</h1>
      </header>

      <div className="flex items-start mb-4 space-x-3">
        <img
          src="/images/frenki.jpg"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <textarea
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="What's happening?"
          value={tweetText}
          onChange={e => setTweetText(e.target.value)}
        />
      </div>

      <button
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={handleTweet}
      >
        Tweet
      </button>

      <div className="space-y-4">
        {tweets.map(tweet => (
          <motion.div
            key={tweet.uuid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img
                  src={tweet.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold">{tweet.handle}</span>
              </div>
            </div>
            <p className="mb-3 whitespace-pre-wrap">{tweet.tweetText}</p>

            <div className="flex items-center space-x-6">
              <motion.button
                className={`flex items-center space-x-1 focus:outline-none ${
                  tweet.isLiked ? 'text-red-500' : 'text-gray-500'
                }`}
                onClick={() => handleLike(tweet.uuid)}
                whileTap={{ scale: 0.9 }}
              >
                <FaHeart size={18} />
                <span>{tweet.likes}</span>
              </motion.button>

              <motion.button
                className={`flex items-center space-x-1 focus:outline-none ${
                  tweet.isRetweeted ? 'text-green-500' : 'text-gray-500'
                }`}
                onClick={() => handleRetweet(tweet.uuid)}
                whileTap={{ scale: 0.9 }}
              >
                <FaRetweet size={18} />
                <span>{tweet.retweets}</span>
              </motion.button>

              <button
                className="flex items-center space-x-1 text-gray-500 focus:outline-none"
                onClick={() => handleReply(tweet.uuid)}
              >
                <FaComment size={18} />
                <span>{tweet.replies.length}</span>
              </button>
            </div>

            {tweet.showReplies && (
              <div className="mt-4 space-y-3">
                {tweet.replies.map((reply, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start space-x-3"
                  >
                    <img
                      src={reply.profilePic}
                      alt="Reply"
                      className="w-8 h-8 rounded-full"
                    />
                    <p>
                      <span className="font-semibold">{reply.handle}</span>{' '}
                      {reply.tweetText}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
