import MiniSearch from 'minisearch';

// 搜索索引接口定义
export interface SearchDocument {
  id: string;
  docId: string;
  title: string;
  url: string;
  anchor: string;
  content: string;
  headings: Array<{
    level: number;
    text: string;
    anchor: string;
  }>;
  tokens: string[];
  chineseTokens: string[];
  englishTokens: string[];
  sidebar_position: number;
  tags: string[];
  lastModified: number;
}

export interface SearchIndex {
  version: number;
  timestamp: string;
  documentsCount: number;
  chunksCount: number;
  buildTime: string;
  documents: SearchDocument[];
}

export interface SearchResult {
  id: string;
  docId: string;
  title: string;
  url: string;
  anchor: string;
  content: string;
  score: number;
  highlights: string[];
  matchedTerms: string[];
}

// 搜索服务类
export class LocalSearchService {
  private miniSearch: MiniSearch<SearchDocument> | null = null;
  private searchIndex: SearchIndex | null = null;
  private isLoading = false;

  constructor() {
    this.initializeMiniSearch();
  }

  /**
   * 初始化MiniSearch实例
   */
  private initializeMiniSearch() {
    console.log('🔧 初始化MiniSearch实例...');
    try {
      this.miniSearch = new MiniSearch({
        fields: ['title', 'content', 'chineseTokens', 'englishTokens', 'tags'],
        storeFields: ['docId', 'title', 'url', 'anchor', 'content', 'headings'],
        searchOptions: {
          boost: {
            title: 3,        // 标题权重最高
            chineseTokens: 2, // 中文分词权重
            englishTokens: 2, // 英文分词权重
            content: 1,      // 内容权重
            tags: 1.5,       // 标签权重
          },
          fuzzy: 0.2,        // 模糊匹配
          prefix: true,      // 前缀匹配
          combineWith: 'AND', // 多词组合方式
        },
      });
      console.log('✅ MiniSearch实例初始化成功');
    } catch (error) {
      console.error('❌ MiniSearch实例初始化失败:', error);
      throw error;
    }
  }

  /**
   * 加载搜索索引
   */
  async loadIndex(): Promise<boolean> {
    if (this.isLoading) {
      return false;
    }

    this.isLoading = true;

    try {
      // 检查缓存版本
      const cachedIndex = this.getCachedIndex();
      const serverVersion = await this.getServerVersion();

      if (cachedIndex && cachedIndex.version === serverVersion.version) {
        console.log('🔍 使用缓存的搜索索引');
        this.searchIndex = cachedIndex;
        this.addDocumentsToMiniSearch(cachedIndex.documents);
        return true;
      }

      // 下载新索引
      console.log('🔍 下载新的搜索索引...');
      const newIndex = await this.downloadIndex();
      
      if (newIndex) {
        this.searchIndex = newIndex;
        this.cacheIndex(newIndex);
        this.addDocumentsToMiniSearch(newIndex.documents);
        console.log(`🎉 搜索索引加载完成 (版本: ${newIndex.version})`);
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ 搜索索引加载失败:', error);
      
      // 尝试使用缓存的索引
      const cachedIndex = this.getCachedIndex();
      if (cachedIndex) {
        console.log('🔄 使用缓存的搜索索引作为备选');
        this.searchIndex = cachedIndex;
        this.addDocumentsToMiniSearch(cachedIndex.documents);
        return true;
      }
      
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * 获取服务器版本信息
   */
  private async getServerVersion(): Promise<{ version: number; timestamp: string }> {
    console.log('🔍 正在获取服务器版本信息...');
    const response = await fetch('/search-version.json');
    console.log('📡 版本请求响应:', response.status, response.statusText);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const version = await response.json();
    console.log('📋 服务器版本:', version);
    return version;
  }

  /**
   * 下载搜索索引
   */
  private async downloadIndex(): Promise<SearchIndex | null> {
    console.log('📥 正在下载搜索索引...');
    const response = await fetch('/search-index.json');
    console.log('📡 索引请求响应:', response.status, response.statusText);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const index = await response.json();
    console.log('📋 索引下载完成, 文档数:', index.documentsCount);
    return index;
  }

  /**
   * 获取缓存的索引
   */
  private getCachedIndex(): SearchIndex | null {
    try {
      const cached = localStorage.getItem('sbim-search-index');
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.warn('缓存索引解析失败:', error);
      return null;
    }
  }

  /**
   * 缓存索引到本地存储
   */
  private cacheIndex(index: SearchIndex) {
    try {
      localStorage.setItem('sbim-search-index', JSON.stringify(index));
      localStorage.setItem('sbim-search-version', index.version.toString());
    } catch (error) {
      console.warn('缓存索引失败:', error);
    }
  }

  /**
   * 添加文档到MiniSearch
   */
  private addDocumentsToMiniSearch(documents: SearchDocument[]) {
    console.log('📚 添加文档到MiniSearch, 文档数量:', documents.length);

    if (!this.miniSearch) {
      console.log('🔧 MiniSearch实例不存在，重新初始化...');
      this.initializeMiniSearch();
    }

    if (!this.miniSearch) {
      console.error('❌ MiniSearch实例初始化失败');
      return;
    }

    try {
      // 清空现有索引
      this.miniSearch.removeAll();

      // 添加所有文档
      this.miniSearch.addAll(documents);
      console.log('✅ 文档添加到MiniSearch成功');
    } catch (error) {
      console.error('❌ 添加文档到MiniSearch失败:', error);
      throw error;
    }
  }

  /**
   * 中文分词处理
   */
  private segmentChineseQuery(query: string): string[] {
    // 检测是否包含中文字符
    const chineseRegex = /[\u4e00-\u9fff]/;
    if (!chineseRegex.test(query)) {
      // 如果不包含中文，直接按空格分割
      return query.trim().split(/\s+/).filter(term => term.length > 0);
    }

    // 对于包含中文的查询，我们需要进行更智能的处理
    // 由于浏览器端无法使用nodejieba，我们使用简单的策略
    const terms: string[] = [];

    // 提取英文单词
    const englishWords = query.match(/[a-zA-Z]+/g) || [];
    terms.push(...englishWords);

    // 对中文部分进行简单处理
    const chineseText = query.replace(/[a-zA-Z\s]+/g, '');
    if (chineseText) {
      // 添加整个中文短语
      terms.push(chineseText);

      // 添加单个中文字符（用于部分匹配）
      const chineseChars = chineseText.split('').filter(char => chineseRegex.test(char));
      terms.push(...chineseChars);

      // 添加双字组合（常见的中文词汇模式）
      for (let i = 0; i < chineseChars.length - 1; i++) {
        terms.push(chineseChars[i] + chineseChars[i + 1]);
      }
    }

    return [...new Set(terms)]; // 去重
  }

  /**
   * 执行搜索
   */
  search(query: string, options: { maxResults?: number } = {}): SearchResult[] {
    if (!this.miniSearch || !this.searchIndex) {
      console.warn('搜索索引未加载');
      return [];
    }

    if (!query.trim()) {
      return [];
    }

    const { maxResults = 10 } = options;

    try {
      // 确保MiniSearch实例存在
      if (!this.miniSearch) {
        console.error('MiniSearch实例不存在，重新初始化...');
        this.initializeMiniSearch();
        if (!this.searchIndex) {
          return [];
        }
        this.addDocumentsToMiniSearch(this.searchIndex.documents);
      }

      // 对查询进行中文分词处理
      const queryTerms = this.segmentChineseQuery(query);
      const searchQuery = queryTerms.join(' ');

      console.log('原始查询:', query);
      console.log('分词结果:', queryTerms);
      console.log('搜索查询:', searchQuery);

      // 执行搜索 - 使用OR组合以提高召回率
      const results = this.miniSearch.search(searchQuery, {
        boost: {
          title: 3,
          chineseTokens: 2,
          englishTokens: 2,
          content: 1,
          tags: 1.5,
        },
        fuzzy: 0.2,
        prefix: true,
        combineWith: 'OR', // 改为OR以提高中文搜索的召回率
        limit: maxResults * 3, // 获取更多结果用于去重和重新排序
      });

      // 处理搜索结果
      const processedResults = this.processSearchResults(results, query);

      // 去重并限制结果数量
      const uniqueResults = this.deduplicateResults(processedResults);

      // 对结果进行重新排序，优先显示完全匹配的结果
      const rerankedResults = this.rerankResults(uniqueResults, query, queryTerms);

      return rerankedResults.slice(0, maxResults);
    } catch (error) {
      console.error('搜索执行失败:', error);
      return [];
    }
  }

  /**
   * 重新排序搜索结果
   */
  private rerankResults(results: SearchResult[], originalQuery: string, queryTerms: string[]): SearchResult[] {
    return results.map(result => {
      let bonusScore = 0;
      const lowerTitle = result.title.toLowerCase();
      const lowerContent = result.content.toLowerCase();
      const lowerQuery = originalQuery.toLowerCase();

      // 完全匹配原始查询的结果获得最高分
      if (lowerTitle.includes(lowerQuery) || lowerContent.includes(lowerQuery)) {
        bonusScore += 10;
      }

      // 标题中包含查询词的结果获得额外分数
      queryTerms.forEach(term => {
        if (lowerTitle.includes(term.toLowerCase())) {
          bonusScore += 5;
        }
        if (lowerContent.includes(term.toLowerCase())) {
          bonusScore += 1;
        }
      });

      return {
        ...result,
        score: result.score + bonusScore
      };
    }).sort((a, b) => b.score - a.score);
  }

  /**
   * 处理搜索结果
   */
  private processSearchResults(results: any[], query: string): SearchResult[] {
    return results.map(result => ({
      id: result.id,
      docId: result.docId,
      title: result.title,
      url: result.url,
      anchor: result.anchor,
      content: result.content,
      score: result.score,
      highlights: this.generateHighlights(result.content, query),
      matchedTerms: result.terms || [],
    }));
  }

  /**
   * 生成高亮片段
   */
  private generateHighlights(content: string, query: string): string[] {
    const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    const highlights: string[] = [];
    
    for (const term of queryTerms) {
      const regex = new RegExp(`(.{0,50})(${term})(.{0,50})`, 'gi');
      const matches = content.match(regex);
      
      if (matches) {
        highlights.push(...matches.slice(0, 2)); // 最多2个高亮片段
      }
    }
    
    return highlights.slice(0, 3); // 最多3个高亮片段
  }

  /**
   * 去重搜索结果（同一文档的多个块）
   */
  private deduplicateResults(results: SearchResult[]): SearchResult[] {
    const docMap = new Map<string, SearchResult>();
    
    for (const result of results) {
      const existing = docMap.get(result.docId);
      
      if (!existing || result.score > existing.score) {
        docMap.set(result.docId, result);
      }
    }
    
    return Array.from(docMap.values()).sort((a, b) => b.score - a.score);
  }

  /**
   * 获取搜索统计信息
   */
  getStats() {
    return {
      isLoaded: !!this.searchIndex,
      version: this.searchIndex?.version,
      documentsCount: this.searchIndex?.documentsCount,
      chunksCount: this.searchIndex?.chunksCount,
      buildTime: this.searchIndex?.buildTime,
    };
  }

  /**
   * 清除缓存
   */
  clearCache() {
    localStorage.removeItem('sbim-search-index');
    localStorage.removeItem('sbim-search-version');
    console.log('🗑️ 搜索缓存已清除');
  }
}

// 创建全局搜索服务实例
export const searchService = new LocalSearchService();
