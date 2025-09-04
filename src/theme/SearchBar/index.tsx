import React, { useState, useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import LocalSearch from '../../components/LocalSearch';
import { searchService } from '../../utils/searchService';
import './styles.css';

export default function SearchBar() {
  const [isLocalSearchEnabled, setIsLocalSearchEnabled] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // 检查是否启用本地搜索
    const checkLocalSearch = async () => {
      try {
        const success = await searchService.loadIndex();
        setIsLocalSearchEnabled(success);
        
        // 如果本地搜索失败，显示备选方案
        if (!success) {
          setShowFallback(true);
        }
      } catch (error) {
        console.warn('本地搜索初始化失败，将使用Algolia搜索:', error);
        setShowFallback(true);
      }
    };

    checkLocalSearch();
  }, []);

  const handleSearchResult = (result) => {
    // 导航到搜索结果
    const url = result.anchor ? `${result.url}#${result.anchor}` : result.url;
    history.push(url);
  };

  const handleSearchPageRedirect = () => {
    history.push('/search');
  };

  // 如果本地搜索可用，使用本地搜索
  if (isLocalSearchEnabled) {
    return (
      <div className="navbar-search-wrapper">
        <LocalSearch
          placeholder="搜索文档..."
          maxResults={6}
          onResultClick={handleSearchResult}
        />
        <button
          className="navbar-search-page-link"
          onClick={handleSearchPageRedirect}
          title="打开搜索页面"
        >
          🔍
        </button>
      </div>
    );
  }

  // 如果本地搜索不可用，显示简单的搜索入口
  if (showFallback) {
    return (
      <div className="navbar-search-wrapper">
        <button
          className="navbar-search-fallback"
          onClick={handleSearchPageRedirect}
        >
          🔍 搜索文档
        </button>
      </div>
    );
  }

  // 加载中状态
  return (
    <div className="navbar-search-wrapper">
      <div className="navbar-search-loading">
        <span className="navbar-search-spinner"></span>
        <span>加载中...</span>
      </div>
    </div>
  );
}
