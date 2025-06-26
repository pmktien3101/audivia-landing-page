import { FiSearch } from 'react-icons/fi';
import './styles.css'

const SearchBar = ({ value, onChange }) => (
  <div className="search-bar-wrapper">
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Tìm kiếm tour..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button><FiSearch/></button>
    </div>
  </div>
);

export default SearchBar