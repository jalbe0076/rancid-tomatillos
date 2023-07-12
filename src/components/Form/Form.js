import { useEffect, useState } from "react"

const Form = ({resetMovies, filterMovies}) => {
  const [searchData, setSearchData] = useState('')
  const [selectData, setSelectData] = useState(0)

  const clearSearch = (e) => {
    e.preventDefault()
    resetMovies()
    setSearchData('')
    setSelectData(0)
  }

  const searchMovies = (e) => {
    setSearchData(e.target.value)
  }

  useEffect(() => {
    filterMovies(searchData, selectData)
  }, [searchData, selectData])


  return (
    <form onSubmit={clearSearch}>
      <input type='text' onChange={searchMovies} value={searchData}/>
      <select  onChange={(e) => setSelectData(e.target.value)} value={selectData}>
        <option value='0'>Any</option>
        <option value='10'>10 stars</option>
        <option value='8'>Over 8 stars</option>
        <option value='5'>Over 5 stars</option>
        <option value='3'>Over 3 stars</option>
      </select>
      <button>Clear Search</button>
    </form>
  )
}

export default Form