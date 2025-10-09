import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownlod from '../../components/AppDownlod/AppDownlod'
import './Home.css'

const Home = () => {
  const [category, setCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className='home'>
      <Header />

      <div className="home-search">
        <input
          type="text"
          placeholder="Search for food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="food-search"
        />
      </div>

      <ExploreMenu category={category} setCategory={setCategory} />

      <FoodDisplay category={category} searchQuery={searchQuery} />

      <AppDownlod />
    </div>
  )
}

export default Home
