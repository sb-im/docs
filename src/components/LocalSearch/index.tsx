import React, { useState, useEffect, useRef, useCallback } from 'react';
import { searchService, SearchResult } from '../../utils/searchService';
import './styles.css';

interface LocalSearchProps {
  placeholder?: string;
  maxResults?: number;
  onResultClick?: (result: SearchResult) => void;
}

export default function LocalSearch({
  placeholder = '搜索文档内容...',
  maxResults = 8,
  onResultClick,
}: LocalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isIndexLoaded, setIsIndexLoaded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // 初始化搜索索引
  useEffect(() => {
    const loadIndex = async () => {
      console.log('🚀 LocalSearch组件开始初始化搜索索引...');
      setIsLoading(true);
      try {
        const success = await searchService.loadIndex();
        console.log('📋 搜索索引加载结果:', success);
        setIsIndexLoaded(success);
        if (!success) {
          console.warn('❌ 搜索索引加载失败，本地搜索功能不可用');
        } else {
          console.log('✅ 搜索索引加载成功，本地搜索功能可用');
        }
      } catch (error) {
        console.error('💥 搜索索引初始化失败:', error);
        setIsIndexLoaded(false);
      } finally {
        setIsLoading(false);
        console.log('🏁 搜索索引初始化完成, isLoading:', false);
      }
    };

    loadIndex();
  }, []);

  // 执行搜索
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim() || !isIndexLoaded) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      const searchResults = searchService.search(searchQuery, { maxResults });
      setResults(searchResults);
      // 如果有搜索结果或者查询不为空，显示结果框
      setShowResults(true);
    } catch (error) {
      console.error('搜索执行失败:', error);
      setResults([]);
      setShowResults(false);
    }
  }, [isIndexLoaded, maxResults]);

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    // 清除之前的搜索定时器
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // 防抖搜索
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // 处理结果点击
  const handleResultClick = (result: SearchResult) => {
    const url = result.anchor ? `${result.url}#${result.anchor}` : result.url;
    
    // 调用外部回调
    if (onResultClick) {
      onResultClick(result);
    }
    
    // 导航到结果页面
    window.location.href = url;
    
    // 隐藏结果
    setShowResults(false);
    setQuery('');
    setResults([]);
  };

  // 处理焦点事件
  const handleFocus = () => {
    if (query.trim()) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    // 延迟隐藏，允许点击结果
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  // 高亮搜索词
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    let highlightedText = text;
    
    queryTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    
    return highlightedText;
  };

  // 截断文本
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="local-search">
      <div className="local-search__input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isLoading ? '正在加载搜索索引...' : placeholder}
          disabled={isLoading || !isIndexLoaded}
          className="local-search__input"
        />
        
        {isLoading && (
          <div className="local-search__loading">
            <span className="local-search__spinner"></span>
          </div>
        )}
        
        {!isIndexLoaded && !isLoading && (
          <div className="local-search__error">
            <span title="搜索索引加载失败">⚠️</span>
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div ref={resultsRef} className="local-search__results">
          {results.map((result, index) => (
            <div
              key={result.id}
              className={`local-search__result ${
                index === selectedIndex ? 'local-search__result--selected' : ''
              }`}
              onClick={() => handleResultClick(result)}
            >
              <div className="local-search__result-title">
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(result.title, query)
                  }}
                />
              </div>
              
              <div className="local-search__result-content">
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(truncateText(result.content), query)
                  }}
                />
              </div>
              
              {result.highlights.length > 0 && (
                <div className="local-search__result-highlights">
                  {result.highlights.slice(0, 2).map((highlight, idx) => (
                    <div
                      key={idx}
                      className="local-search__highlight"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(truncateText(highlight, 80), query)
                      }}
                    />
                  ))}
                </div>
              )}
              
              <div className="local-search__result-meta">
                <span className="local-search__result-url">{result.url}</span>
                <span className="local-search__result-score">
                  {Math.round(result.score * 100) / 100}
                </span>
              </div>
            </div>
          ))}
          
          <div className="local-search__footer">
            <span className="local-search__stats">
              找到 {results.length} 个结果
            </span>
            <span className="local-search__powered">
              本地搜索 v{searchService.getStats().version}
            </span>
          </div>
        </div>
      )}

      {showResults && query.trim() && results.length === 0 && isIndexLoaded && (
        <div className="local-search__results">
          <div className="local-search__no-results">
            <div className="local-search__no-results-text">
              没有找到相关结果
            </div>
            <div className="local-search__no-results-suggestion">
              尝试使用不同的关键词或检查拼写
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
