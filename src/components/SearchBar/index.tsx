import React, { useState, useEffect, useRef } from 'react';
import MiniSearch from 'minisearch';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import './styles.css';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  score: number;
}

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = '搜索文档...' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [miniSearch, setMiniSearch] = useState<MiniSearch | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const searchDataUrl = useBaseUrl('/search-data.json');

  // 初始化搜索索引
  useEffect(() => {
    const initializeSearch = async () => {
      try {
        setIsLoading(true);
        
        // 创建 MiniSearch 实例
        const ms = new MiniSearch({
          fields: ['title', 'content', 'keywords'], // 搜索字段
          storeFields: ['title', 'content', 'url'], // 存储字段
          searchOptions: {
            boost: { title: 3, keywords: 2 }, // 标题和关键词权重更高
            fuzzy: 0.1, // 降低模糊搜索阈值，提高精确度
            prefix: true, // 前缀匹配
          },
        });

        // 获取搜索数据
        const searchData = await loadSearchData();
        ms.addAll(searchData);
        
        setMiniSearch(ms);
      } catch (error) {
        console.error('Failed to initialize search:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSearch();
  }, [searchDataUrl]);

  // 加载搜索数据
  const loadSearchData = async () => {
    try {
      console.log('Loading search data from:', searchDataUrl);
      const response = await fetch(searchDataUrl);
      if (!response.ok) {
        throw new Error('Failed to load search data');
      }
      const data = await response.json();
      console.log('Search data loaded:', data.length, 'items');
      return data;
    } catch (error) {
      console.error('Error loading search data:', error);
      // 返回空数组作为后备
      return [];
    }
  };

  // 执行搜索
  const performSearch = (searchQuery: string) => {
    if (!miniSearch || !searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      // 根据查询长度调整搜索策略
      const searchOptions = searchQuery.length <= 2
        ? {
            // 短查询：只使用前缀匹配，不使用模糊搜索
            limit: 8,
            prefix: true,
            fuzzy: false,
          }
        : {
            // 长查询：使用更严格的模糊搜索
            limit: 10,
            fuzzy: 0.1, // 降低模糊搜索阈值
            prefix: true,
          };

      const searchResults = miniSearch.search(searchQuery, searchOptions);

      // 过滤和排序结果
      const filteredResults = searchResults
        .filter((result: any) => {
          // 过滤掉评分过低的结果
          return result.score > 0.5;
        })
        .sort((a: any, b: any) => {
          // 优先显示标题完全匹配的结果
          const aExactTitle = a.title.toLowerCase().includes(searchQuery.toLowerCase());
          const bExactTitle = b.title.toLowerCase().includes(searchQuery.toLowerCase());

          if (aExactTitle && !bExactTitle) return -1;
          if (!aExactTitle && bExactTitle) return 1;

          // 其次按评分排序
          return b.score - a.score;
        });

      const formattedResults: SearchResult[] = filteredResults.map((result: any) => ({
        id: result.id,
        title: result.title,
        content: result.content,
        url: result.url,
        score: result.score,
      }));

      setResults(formattedResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
    setIsOpen(value.length > 0);
  };

  // 处理结果点击
  const handleResultClick = (url: string) => {
    // URL 已经在生成时包含了正确的 baseUrl
    history.push(url);
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-bar" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className="search-input"
          disabled={isLoading}
        />
        <div className="search-icon">
          {isLoading ? (
            <div className="search-loading">⏳</div>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="search-results">
          {results.length > 0 ? (
            <ul className="search-results-list">
              {results.map((result) => (
                <li
                  key={result.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(result.url)}
                >
                  <div className="search-result-title">{result.title}</div>
                  <div className="search-result-content">
                    {result.content.substring(0, 100)}...
                  </div>
                </li>
              ))}
            </ul>
          ) : query ? (
            <div className="search-no-results">
              没有找到相关结果
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
