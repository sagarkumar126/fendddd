import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category, searchQuery }) => {  // Added searchQuery
  const { food_list } = useContext(StoreContext)

  // Filter by category AND search query
  const filteredFood = food_list.filter(item => {
    const matchesCategory = category === "All" || item.category === category
    const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>

      <div className="food-display-list">
        {filteredFood.length > 0 ? (
          filteredFood.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="no-food">No food items found!</p>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
