import React, { FC, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import styles from './SearchBar.module.css';

const SearchBar: FC = () => {
    const { searchQuery, setSearchQuery } = useProducts();
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchInner}>
                <Search size={18} className={styles.searchIcon} />
                <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск товаров..."
                    className={styles.searchInput}
                />
                {searchQuery && (
                    <button 
                        className={styles.clearBtn} 
                        onClick={() => {
                            setSearchQuery('');
                            inputRef.current?.focus();
                        }}
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
