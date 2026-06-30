import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import MiniSearch from 'minisearch';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';
import { useHistory } from '@docusaurus/router';
import './search.css';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  score: number;
  category?: string;
  description?: string;
}

export default function SearchPage(): React.ReactElement {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [miniSearch, setMiniSearch] = useState<MiniSearch | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const { i18n } = useDocusaurusContext();

  // 在组件顶层调用 useBaseUrl（英文站使用独立的搜索索引）
  const searchDataUrl = useBaseUrl(
    i18n.currentLocale === 'en' ? '/search-data.en.json' : '/search-data.json',
  );

  // 热门搜索标签：显示文案与查询词均按语言本地化
  const popularTags = [
    { label: 'API', query: 'API' },
    { label: 'SuperDock', query: 'SuperDock' },
    {
      label: translate({
        id: 'search.tag.errorCode.label',
        message: '错误码',
        description: 'Popular search tag label',
      }),
      query: translate({
        id: 'search.tag.errorCode.query',
        message: '错误码',
        description: 'Popular search tag query term (should match indexed content)',
      }),
    },
    {
      label: translate({
        id: 'search.tag.commandFlight.label',
        message: '指令飞行',
        description: 'Popular search tag label',
      }),
      query: translate({
        id: 'search.tag.commandFlight.query',
        message: '指令飞行',
        description: 'Popular search tag query term (should match indexed content)',
      }),
    },
  ];

  // 加载搜索数据
  const loadSearchData = async () => {
    try {
      console.log('Loading search data from:', searchDataUrl);
      const response = await fetch(searchDataUrl);
      if (!response.ok) {
        throw new Error(`Failed to load search data: ${response.status}`);
      }
      const data = await response.json();
      console.log('Search data loaded:', data.length, 'items');
      return data;
    } catch (error) {
      console.error('Error loading search data:', error);
      return [];
    }
  };

  // 初始化搜索引擎
  useEffect(() => {
    const initializeSearch = async () => {
      try {
        console.log('Initializing search...');
        // 创建 MiniSearch 实例
        const ms = new MiniSearch({
          fields: ['title', 'content', 'keywords'],
          storeFields: ['title', 'content', 'url', 'category', 'description'],
          searchOptions: {
            boost: { title: 3, keywords: 2 },
            fuzzy: 0.1,
            prefix: true,
          },
        });

        // 获取搜索数据
        const searchData = await loadSearchData();
        console.log('Search data received:', searchData);
        if (searchData.length > 0) {
          ms.addAll(searchData);
          setMiniSearch(ms);
          console.log('MiniSearch initialized with', searchData.length, 'documents');
        } else {
          console.warn('No search data available');
        }
      } catch (error) {
        console.error('Error initializing search:', error);
      }
    };

    initializeSearch();
  }, [searchDataUrl]);

  // 自动聚焦搜索框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 执行搜索
  const performSearch = (searchQuery: string) => {
    console.log('Performing search for:', searchQuery);
    console.log('MiniSearch instance:', miniSearch);

    if (!miniSearch || !searchQuery.trim()) {
      setResults([]);
      setTotalResults(0);
      return;
    }

    setIsLoading(true);

    try {
      // 根据查询长度调整搜索策略
      const searchOptions = searchQuery.length <= 2
        ? {
            limit: 20,
            prefix: true,
            fuzzy: false,
          }
        : {
            limit: 50,
            fuzzy: 0.1,
            prefix: true,
          };

      const searchResults = miniSearch.search(searchQuery, searchOptions);

      // 过滤和排序结果
      const filteredResults = searchResults
        .filter((result: any) => result.score > 0.3)
        .sort((a: any, b: any) => {
          // 优先显示标题完全匹配的结果
          const aExactTitle = a.title.toLowerCase().includes(searchQuery.toLowerCase());
          const bExactTitle = b.title.toLowerCase().includes(searchQuery.toLowerCase());

          if (aExactTitle && !bExactTitle) return -1;
          if (!aExactTitle && bExactTitle) return 1;

          return b.score - a.score;
        });

      const formattedResults: SearchResult[] = filteredResults.map((result: any) => ({
        id: result.id,
        title: result.title,
        content: result.content,
        url: result.url,
        score: result.score,
        category: result.category,
        description: result.description,
      }));

      setResults(formattedResults);
      setTotalResults(formattedResults.length);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理搜索输入
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    performSearch(newQuery);
  };

  // 处理结果点击
  const handleResultClick = (url: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      history.push(url);
      return;
    }

    const [pathWithQuery, hash] = url.split('#', 2);
    const separator = pathWithQuery.includes('?') ? '&' : '?';
    const urlWithHighlight = `${pathWithQuery}${separator}highlight=${encodeURIComponent(trimmedQuery)}${hash ? `#${hash}` : ''}`;
    history.push(urlWithHighlight);
  };

  // 高亮搜索关键词
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="search-highlight">{part}</mark>
      ) : (
        part
      )
    );
  };

  // 截取内容预览
  const getContentPreview = (content: string, query: string, maxLength: number = 200) => {
    if (!query.trim()) return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');

    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);

    if (index === -1) {
      return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + query.length + 150);
    const preview = content.substring(start, end);

    return (start > 0 ? '...' : '') + preview + (end < content.length ? '...' : '');
  };

  return (
    <Layout
      title={translate({
        id: 'searchPage.meta.title',
        message: '搜索文档',
        description: 'Search page browser tab title',
      })}
      description={translate({
        id: 'searchPage.meta.description',
        message: '搜索 SBIM 文档内容',
        description: 'Search page meta description',
      })}
    >
      <div className="search-page">
        <div className="search-page-header">
          <div className="container">
            <h1>
              <Translate id="searchPage.heading" description="Search page heading">
                搜索文档
              </Translate>
            </h1>
            <p>
              <Translate id="searchPage.subheading" description="Search page subheading">
                在 SBIM 文档中搜索您需要的内容
              </Translate>
            </p>
          </div>
        </div>

        <div className="search-page-content">
          <div className="container">
            <div className="search-page-input-container">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder={translate({
                  id: 'searchPage.input.placeholder',
                  message: '输入关键词搜索文档...',
                  description: 'Search page input placeholder',
                })}
                className="search-page-input"
              />
              {isLoading && (
                <div className="search-page-loading">
                  <Translate id="searchPage.loading" description="Loading indicator">
                    搜索中...
                  </Translate>
                </div>
              )}
            </div>

            {query && (
              <div className="search-page-stats">
                <Translate
                  id="searchPage.stats"
                  description="Result count line"
                  values={{ count: totalResults }}
                >
                  {'找到 {count} 个结果'}
                </Translate>
              </div>
            )}

            <div className="search-page-results">
              {results.length > 0 ? (
                results.map((result) => (
                  <div
                    key={result.id}
                    className="search-page-result-item"
                    onClick={() => handleResultClick(result.url)}
                  >
                    <div className="search-page-result-header">
                      <h3 className="search-page-result-title">
                        {highlightText(result.title, query)}
                      </h3>
                      {result.category && (
                        <span className="search-page-result-category">
                          {result.category}
                        </span>
                      )}
                    </div>
                    <div className="search-page-result-content">
                      {highlightText(getContentPreview(result.content, query), query)}
                    </div>
                    <div className="search-page-result-url">
                      {result.url}
                    </div>
                  </div>
                ))
              ) : query && !isLoading ? (
                <div className="search-page-no-results">
                  <h3>
                    <Translate id="searchPage.noResults.title" description="No results title">
                      未找到相关结果
                    </Translate>
                  </h3>
                  <p>
                    <Translate id="searchPage.noResults.desc" description="No results hint">
                      请尝试使用不同的关键词或检查拼写
                    </Translate>
                  </p>
                  <div className="search-page-suggestions">
                    <h4>
                      <Translate id="searchPage.suggestions.title" description="Suggestions heading">
                        搜索建议：
                      </Translate>
                    </h4>
                    <ul>
                      <li>
                        <Translate id="searchPage.suggestions.item1" description="Search suggestion">
                          使用更简单的关键词
                        </Translate>
                      </li>
                      <li>
                        <Translate id="searchPage.suggestions.item2" description="Search suggestion">
                          检查拼写是否正确
                        </Translate>
                      </li>
                      <li>
                        <Translate id="searchPage.suggestions.item3" description="Search suggestion">
                          尝试使用同义词
                        </Translate>
                      </li>
                      <li>
                        <Translate id="searchPage.suggestions.item4" description="Search suggestion">
                          使用更通用的术语
                        </Translate>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : !query ? (
                <div className="search-page-welcome">
                  <h3>
                    <Translate id="searchPage.welcome.title" description="Welcome heading">
                      开始搜索
                    </Translate>
                  </h3>
                  <p>
                    <Translate id="searchPage.welcome.desc" description="Welcome hint">
                      在上方输入框中输入关键词开始搜索文档内容
                    </Translate>
                  </p>
                  <div className="search-page-popular">
                    <h4>
                      <Translate id="searchPage.popular.title" description="Popular searches heading">
                        热门搜索：
                      </Translate>
                    </h4>
                    <div className="search-page-tags">
                      {popularTags.map((tag) => (
                        <span
                          key={tag.label}
                          className="search-page-tag"
                          onClick={() => {
                            setQuery(tag.query);
                            performSearch(tag.query);
                          }}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
