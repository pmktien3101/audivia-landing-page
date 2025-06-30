import { TopPlaceList } from '../../../components/TopPlaceList/TopPlaceList'
import './style.css'
import "../../../components/TopPlaceList/style.css";
import GoogleMapComponent from '../../../components/GoogleMap/index.jsx';
import SearchBar from '../../../components/SearchBar/index.jsx';
import { TourList } from '../../../components/Tour/index.jsx';
import { useCallback, useEffect, useState } from 'react';
import Category from '../../../components/Category/index.jsx';
import tourService from '../../../services/tour.js';
import TourTypeService from '../../../services/tourType.js';
import { Tittle } from '../../LandingPage/sections/Tittle';
import '../../LandingPage/sections/Tittle/style.css';
import SuggestedTourList from '../../../components/Tour/SuggestedTourList/SuggestedTourList.jsx';


const Home = () => {
    const [tours, setTours] = useState([])
    const [activeCategory, setActiveCategory] = useState("all")
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({
        pageIndex: 1,
        pageSize: 3,
        totalPages: 1,
        count: 0
    })
    const [searchQuery, setSearchQuery] = useState("")
    const [categories, setCategories] = useState([])

    const fetchCategories = async () => {
        try {
            const response = await TourTypeService.getTourTypes()

            setCategories([{ id: 'all', name: 'Tất cả' }, ...response])
        } catch (error) {
            console.log("Error fetching tour types in home", error);

        }
    }


    const fetchTours = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            let result;
            const queryParams = {
                pageIndex: page,
                title: searchQuery || undefined // Sử dụng searchTerm trực tiếp
            };

            if (activeCategory === 'all') {
                result = await tourService.getAllToursPaginated(queryParams);
            } else {
                result = await tourService.getToursByCategory(activeCategory, queryParams);
            }
            setTours(result.data)
            // console.log(result.data)
            setPagination(result.pagination)

        } catch (error) {
            console.log("Error fetching tours", error);

        } finally {
            setLoading(false)
        }

    }, [activeCategory, searchQuery]);


    useEffect(() => {
        fetchCategories()
    }, [])
    // Initial load and when category changes
    useEffect(() => {
        fetchTours(1);
    }, [activeCategory]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchTours(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);



    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchTours(newPage)
        }
    }


    return (
        <>
            <div className="home-banner-modern">
                <div className="ellipse-9" />
                <Tittle hideActions={true} />
                <div className="ellipse-10" />
            </div>
            <div className="home-searchbar-modern">
                <div className="home-searchbar-content">
                    <div className="home-searchbar-title">AUDIO TOUR NỔI BẬT</div>
                    <div className="home-searchbar-subtitle">Khám phá ngay các tour</div>
                </div>
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="home-category-scroll">
                <Category
                    categories={categories}
                    activeCategory={activeCategory}
                    onChange={(categoryId) => {
                        setActiveCategory(categoryId)
                        setPagination(prev => ({ ...prev, pageIndex: 1 }))
                    }}
                />
            </div>
            <div className="home-tourlist-section">
                {
                    loading ? (
                        <div className="home-loading">Đang tải...</div>
                    ) : (
                        <>
                            <div className="home-tourlist-grid">
                                <TourList tours={tours} />
                            </div>
                            <div className="home-pagination">
                                <button
                                    disabled={pagination.pageIndex <= 1}
                                    onClick={() => handlePageChange(pagination.pageIndex - 1)}
                                >
                                    &lt; Trước
                                </button>
                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (pagination.totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (pagination.pageIndex <= 3) {
                                        pageNum = i + 1;
                                    } else if (pagination.pageIndex >= pagination.totalPages - 2) {
                                        pageNum = pagination.totalPages - 4 + i;
                                    } else {
                                        pageNum = pagination.pageIndex - 2 + i;
                                    }
                                    return (
                                        <button
                                            key={pageNum}
                                            className={pagination.pageIndex === pageNum ? 'active' : ''}
                                            onClick={() => handlePageChange(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    disabled={pagination.pageIndex >= pagination.totalPages}
                                    onClick={() => handlePageChange(pagination.pageIndex + 1)}
                                >
                                    Sau &gt;
                                </button>
                            </div>
                            <div className="home-suggested-tour-slider">
                                <SuggestedTourList />
                            </div>
                        </>
                    )
                }
            </div>
            {/* <GoogleMapComponent /> Ẩn map khỏi Home */}
        </>
    )
}

export default Home