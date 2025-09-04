import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { searchService, SearchResult } from '../utils/searchService';
import LocalSearch from '../components/LocalSearch';
import './search.css';

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState(searchService.getStats());

  useEffect(() => {
    const initializePage = async () => {
      console.log('🚀 搜索页面初始化...');

      // 确保搜索索引已加载
      if (!searchService.getStats().isLoaded) {
        console.log('📥 搜索索引未加载，开始加载...');
        await searchService.loadIndex();
      }

      // 更新统计信息
      setStats(searchService.getStats());

      // 从URL参数获取搜索查询
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      if (q) {
        console.log('🔍 从URL参数获取查询:', q);
        setQuery(q);
        performSearch(q);
      }
    };

    initializePage();

    // 定期更新统计信息
    const interval = setInterval(() => {
      setStats(searchService.getStats());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const performSearch = (searchQuery: string) => {
    console.log('🔍 执行搜索:', searchQuery);

    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = searchService.search(searchQuery, { maxResults: 20 });
      console.log('📋 搜索结果:', searchResults.length, '个');
      setResults(searchResults);

      // 更新URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('q', searchQuery);
      window.history.replaceState({}, '', newUrl.toString());
    } catch (error) {
      console.error('❌ 搜索失败:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchResult = (result: SearchResult) => {
    // 记录搜索点击事件
    console.log('搜索结果点击:', result);
  };

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

  const clearCache = () => {
    searchService.clearCache();
    window.location.reload();
  };

  return (
    <Layout
      title="搜索文档"
      description="搜索SBIM开发者文档内容"
    >
      <div className="search-page">
        <div className="search-page__header">
          <div className="container">
            <h1 className="search-page__title">搜索文档</h1>
            <div className="search-page__search-box">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  performSearch(e.target.value);
                }}
                placeholder="输入关键词搜索文档..."
                className="search-page__input"
                disabled={!stats.isLoaded}
              />
            </div>
          </div>
        </div>

        <div className="search-page__content">
          <div className="container">
            {/* 搜索统计信息 */}
            <div className="search-page__stats">
              <div className="search-stats">
                <div className="search-stats__item">
                  <span className="search-stats__label">索引状态:</span>
                  <span className={`search-stats__value ${stats.isLoaded ? 'loaded' : 'not-loaded'}`}>
                    {stats.isLoaded ? '✅ 已加载' : '❌ 未加载'}
                  </span>
                </div>
                {stats.isLoaded && (
                  <>
                    <div className="search-stats__item">
                      <span className="search-stats__label">文档数量:</span>
                      <span className="search-stats__value">{stats.documentsCount}</span>
                    </div>
                    <div className="search-stats__item">
                      <span className="search-stats__label">索引版本:</span>
                      <span className="search-stats__value">{stats.version}</span>
                    </div>
                    <div className="search-stats__item">
                      <span className="search-stats__label">构建时间:</span>
                      <span className="search-stats__value">
                        {stats.buildTime ? new Date(stats.buildTime).toLocaleString() : '未知'}
                      </span>
                    </div>
                  </>
                )}
                <button 
                  className="search-stats__clear-cache"
                  onClick={clearCache}
                  title="清除搜索缓存并重新加载"
                >
                  🗑️ 清除缓存
                </button>
              </div>
            </div>

            {/* 搜索结果 */}
            {query && (
              <div className="search-page__results">
                <div className="search-results__header">
                  <h2>
                    搜索 "{query}" 的结果
                    {!isLoading && (
                      <span className="search-results__count">
                        ({results.length} 个结果)
                      </span>
                    )}
                  </h2>
                  {isLoading && (
                    <div className="search-results__loading">
                      <span className="spinner"></span>
                      搜索中...
                    </div>
                  )}
                </div>

                {!isLoading && results.length === 0 && query && (
                  <div className="search-results__empty">
                    <div className="empty-state">
                      <div className="empty-state__icon">🔍</div>
                      <div className="empty-state__title">没有找到相关结果</div>
                      <div className="empty-state__description">
                        尝试使用不同的关键词或检查拼写
                      </div>
                      <div className="empty-state__suggestions">
                        <h4>搜索建议:</h4>
                        <ul>
                          <li>使用更通用的关键词</li>
                          <li>检查拼写是否正确</li>
                          <li>尝试使用同义词</li>
                          <li>减少搜索词的数量</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {!isLoading && results.length > 0 && (
                  <div className="search-results__list">
                    {results.map((result, index) => (
                      <div key={result.id} className="search-result">
                        <div className="search-result__header">
                          <h3 className="search-result__title">
                            <a 
                              href={result.anchor ? `${result.url}#${result.anchor}` : result.url}
                              dangerouslySetInnerHTML={{
                                __html: highlightText(result.title, query)
                              }}
                            />
                          </h3>
                          <div className="search-result__meta">
                            <span className="search-result__url">{result.url}</span>
                            <span className="search-result__score">
                              相关度: {Math.round(result.score * 100) / 100}
                            </span>
                          </div>
                        </div>
                        
                        <div className="search-result__content">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: highlightText(
                                result.content.length > 200 
                                  ? result.content.slice(0, 200) + '...'
                                  : result.content,
                                query
                              )
                            }}
                          />
                        </div>

                        {result.highlights.length > 0 && (
                          <div className="search-result__highlights">
                            <h4>相关片段:</h4>
                            {result.highlights.slice(0, 3).map((highlight, idx) => (
                              <div
                                key={idx}
                                className="search-result__highlight"
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(highlight, query)
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 搜索帮助 */}
            {!query && (
              <div className="search-page__help">
                <div className="search-help">
                  <h2>搜索帮助</h2>
                  <div className="search-help__content">
                    <div className="search-help__section">
                      <h3>🔍 如何搜索</h3>
                      <ul>
                        <li>输入关键词进行搜索</li>
                        <li>支持中文和英文搜索</li>
                        <li>使用空格分隔多个关键词</li>
                        <li>搜索结果按相关度排序</li>
                      </ul>
                    </div>
                    
                    <div className="search-help__section">
                      <h3>💡 搜索技巧</h3>
                      <ul>
                        <li>使用具体的技术术语获得更精确的结果</li>
                        <li>尝试使用同义词或相关词汇</li>
                        <li>可以搜索API名称、功能描述等</li>
                        <li>支持模糊匹配和前缀匹配</li>
                      </ul>
                    </div>

                    <div className="search-help__section">
                      <h3>⚡ 功能特点</h3>
                      <ul>
                        <li>本地搜索，响应速度快</li>
                        <li>支持离线使用</li>
                        <li>智能缓存，减少加载时间</li>
                        <li>中文分词优化</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
